// app/actions/job.ts
"use server";

import Mailjet from "node-mailjet";
import { createJobApplication, type JobApplicationData } from "@/lib/database";

interface JobResponse {
  success: boolean;
  message?: string;
  error?: string;
  id?: string;
}

const I18N = {
  en: {
    fillAll: "Please fill in all required fields",
    invalidEmail: "Please enter a valid email address",
    dbError:
      "An error occurred while submitting your application. Please try again.",
    success:
      "Your application has been submitted successfully. We will contact you soon.",
    hrSubject: "New Job Application: {{job_title}}",
    applicantSubject: "Your Application for {{job_title}}",
  },
  ar: {
    fillAll: "يرجى ملء جميع الحقول المطلوبة",
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
    dbError: "حدث خطأ أثناء إرسال طلبك. حاول مرة أخرى لاحقًا.",
    success: "تم إرسال طلبك بنجاح. سنتواصل معك قريبًا.",
    hrSubject: "طلب توظيف جديد: {{job_title}}",
    applicantSubject: "طلبك لوظيفة {{job_title}}",
  },
};

export async function submitJobApplication(
  formData: FormData
): Promise<JobResponse> {
  // 1. Extract & encode CV
  const cvFile = formData.get("cv_file") as File | null;
  let attachment:
    | { ContentType: string; Filename: string; Base64Content: string }
    | undefined;

  if (cvFile && cvFile.size) {
    const buf = Buffer.from(await cvFile.arrayBuffer());
    attachment = {
      ContentType: cvFile.type,
      Filename: cvFile.name,
      Base64Content: buf.toString("base64"),
    };
  }

  // 2. Build data object
  const data: JobApplicationData = {
    job_id: formData.get("job_id") as string,
    job_title: formData.get("job_title") as string,
    applicant_name: formData.get("applicant_name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    experience_years:
      Number.parseInt(formData.get("experience_years") as string) || undefined,
    current_position: formData.get("current_position") as string,
    cover_letter: formData.get("cover_letter") as string,
    language: (formData.get("language") as "ar" | "en") || "ar",
  };
  const t = I18N[data.language] || I18N.en;

  // 3. Validation
  if (!data.applicant_name || !data.email || !data.job_title) {
    return { success: false, error: t.fillAll };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, error: t.invalidEmail };
  }

  const {
    MAILJET_API_KEY,
    MAILJET_SECRET_KEY,
    MAILJET_FROM_EMAIL,
    MAILJET_TO_EMAIL,
  } = process.env;
  if (
    !MAILJET_API_KEY ||
    !MAILJET_SECRET_KEY ||
    !MAILJET_FROM_EMAIL ||
    !MAILJET_TO_EMAIL
  ) {
    console.error(
      "Missing Mailjet config: set API_KEY, SECRET_KEY, FROM_EMAIL & HR_EMAIL"
    );
  }

  // pick font & dir
  const fontFamily =
    data.language === "ar"
      ? "'Tajawal', Cairo, 'Noto Kufi Arabic', sans-serif"
      : "Inter, Poppins, Montserrat, 'Open Sans', sans-serif";
  const dir = data.language === "ar" ? "rtl" : "ltr";

  try {
    // 4. Save to DB
    const result = await createJobApplication(data);

    // 5. Init Mailjet
    const mj = Mailjet.apiConnect(MAILJET_API_KEY!, MAILJET_SECRET_KEY!);

    // 6. HR notification
    // Build the HR notification message
    const hrMessage: any = {
      From: {
        Email: MAILJET_FROM_EMAIL!,
        Name: "Job Application",
      },
      To: [
        {
          Email: MAILJET_TO_EMAIL!,
          Name: "HR Team",
        },
      ],
      Subject: t.hrSubject.replace("{{job_title}}", data.job_title),
      TextPart: `
New application for ${data.job_title}

Name: ${data.applicant_name}
Email: ${data.email}
Phone: ${data.phone}
Experience: ${data.experience_years ?? "N/A"} years
Current Position: ${data.current_position}

Cover Letter:
${data.cover_letter}
  `.trim(),
      HTMLPart: `
<div style="background-color:#ec4899; padding:20px; font-family:${fontFamily}; direction:${dir};">
  <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1); overflow:hidden;">
    <div style="background-color:#ec4899; color:#fff; padding:16px;">
      <h2 style="margin:0; font-size:20px; font-weight:600;">
        New Job Application: ${data.job_title}
      </h2>
    </div>
    <div style="padding:24px; color:#1F2937; line-height:1.5;">
      <p style="margin-top:0;">
        A candidate has applied for the position of <strong>${data.job_title}</strong>:
      </p>
      <ul style="list-style:none; padding:0; margin:0 0 16px;">
        <li><strong>Name:</strong> ${data.applicant_name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> ${data.phone}</li>
        <li><strong>Experience:</strong> ${data.experience_years ?? "N/A"} years</li>
        <li><strong>Current Position:</strong> ${data.current_position}</li>
      </ul>
      <h3 style="margin-bottom:8px; font-size:16px; font-weight:500;">Cover Letter</h3>
      <p style="margin-top:0; white-space:pre-wrap;">
        ${data.cover_letter}
      </p>
    </div>
    ${
      attachment
        ? `
    <div style="padding:0 24px 24px;">
      <p style="margin:0; font-size:14px; color:#4B5563;">
        📎 Attached: <em>${attachment.Filename}</em>
      </p>
    </div>`
        : ""
    }
    <div style="background-color:#F9FAFB; padding:12px; text-align:center; font-size:12px; color:#6B7280;">
      © ${new Date().getFullYear()} Your Company Name
    </div>
  </div>
</div>
  `.trim(),
    };

    if (attachment) {
      hrMessage.Attachments = [attachment];
    }

    if (attachment) hrMessage.Attachments = [attachment];
    await mj
      .post("send", { version: "v3.1" })
      .request({ Messages: [hrMessage] });

    // 7. Applicant confirmation
    const appMessage: any = {
      From: {
        Email: MAILJET_FROM_EMAIL!,
        Name: "Job Application at East Colors",
      },
      To: [{ Email: data.email, Name: data.applicant_name }],
      Subject: t.applicantSubject.replace("{{job_title}}", data.job_title),
      TextPart: `Thanks ${data.applicant_name},\n\n${t.success}`,
      HTMLPart: `
<div style="font-family: ${fontFamily}; direction: ${dir}; color: #000;">
  <p>Thanks <strong>${data.applicant_name}</strong>,</p>
  <p>${t.success}</p>
</div>
      `.trim(),
    };
    await mj
      .post("send", { version: "v3.1" })
      .request({ Messages: [appMessage] });

    return { success: true, message: t.success, id: result.id };
  } catch (err) {
    console.error("Job application submission error:", err);
    return { success: false, error: t.dbError };
  }
}
