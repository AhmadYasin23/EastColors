"use server";

import { createJobApplication, type JobApplicationData } from "@/lib/database";
import {
  escapeHtml,
  getLanguage,
  getText,
  isEmail,
  verifyTurnstile,
} from "@/lib/form-security";
import {
  getMailjetConfig,
  sendMailjet,
  type MailjetAttachment,
  type MailjetMessage,
} from "@/lib/mailjet";

interface JobResponse {
  success: boolean;
  message: string;
  id?: string;
}

const MAX_CV_SIZE = 5 * 1024 * 1024;
const I18N = {
  en: {
    fillAll: "Please fill in all required fields",
    invalidEmail: "Please enter a valid email address",
    invalidFile: "Please upload a valid PDF, DOC, or DOCX file up to 5 MB",
    verification: "We could not verify your request. Please try again.",
    unavailable: "Applications are temporarily unavailable. Please try again later.",
    dbError: "An error occurred while submitting your application. Please try again.",
    success: "Your application has been submitted successfully. We will contact you soon.",
    hrSubject: "New Job Application: {{job_title}}",
    applicantSubject: "Your Application for {{job_title}}",
  },
  ar: {
    fillAll: "يرجى ملء جميع الحقول المطلوبة",
    invalidEmail: "يرجى إدخال بريد إلكتروني صحيح",
    invalidFile: "يرجى رفع ملف PDF أو DOC أو DOCX صالح بحجم لا يتجاوز 5 ميجابايت",
    verification: "تعذر التحقق من الطلب. يرجى المحاولة مرة أخرى.",
    unavailable: "خدمة التقديم غير متاحة مؤقتًا. يرجى المحاولة لاحقًا.",
    dbError: "حدث خطأ أثناء إرسال طلبك. حاول مرة أخرى لاحقًا.",
    success: "تم إرسال طلبك بنجاح. سنتواصل معك قريبًا.",
    hrSubject: "طلب توظيف جديد: {{job_title}}",
    applicantSubject: "طلبك لوظيفة {{job_title}}",
  },
};

function hasPrefix(bytes: Uint8Array, prefix: number[]): boolean {
  return prefix.every((value, index) => bytes[index] === value);
}

async function prepareAttachment(file: File): Promise<MailjetAttachment | null> {
  if (!file.size) return null;
  if (file.size > MAX_CV_SIZE) throw new Error("invalid-cv");

  const extension = file.name.toLowerCase().match(/\.(pdf|doc|docx)$/)?.[1];
  if (!extension) throw new Error("invalid-cv");

  const bytes = new Uint8Array(await file.arrayBuffer());
  const valid =
    (extension === "pdf" && hasPrefix(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d])) ||
    (extension === "doc" &&
      hasPrefix(bytes, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) ||
    (extension === "docx" &&
      (hasPrefix(bytes, [0x50, 0x4b, 0x03, 0x04]) ||
        hasPrefix(bytes, [0x50, 0x4b, 0x05, 0x06]) ||
        hasPrefix(bytes, [0x50, 0x4b, 0x07, 0x08])));

  if (!valid) throw new Error("invalid-cv");

  const contentTypes = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  } as const;
  const safeFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120);

  return {
    ContentType: contentTypes[extension],
    Filename: safeFilename || `resume.${extension}`,
    Base64Content: Buffer.from(bytes).toString("base64"),
  };
}

export async function submitJobApplication(
  formData: FormData,
): Promise<JobResponse> {
  const language = getLanguage(formData);
  const t = I18N[language];

  if (!(await verifyTurnstile(formData, "job_application"))) {
    return { success: false, message: t.verification };
  }

  const data: JobApplicationData = {
    job_id: getText(formData, "job_id", 128),
    job_title: getText(formData, "job_title", 120),
    applicant_name: getText(formData, "applicant_name", 100),
    email: getText(formData, "email", 254),
    phone: getText(formData, "phone", 50),
    experience_years: Math.min(
      50,
      Math.max(0, Number.parseInt(getText(formData, "experience_years", 2)) || 0),
    ),
    current_position: getText(formData, "current_position", 120),
    cover_letter: getText(formData, "cover_letter", 5000),
    language,
  };

  if (!data.applicant_name || !data.email || !data.job_title) {
    return { success: false, message: t.fillAll };
  }
  if (!isEmail(data.email)) {
    return { success: false, message: t.invalidEmail };
  }

  const mailjet = getMailjetConfig();
  if (!mailjet || !process.env.DATABASE_URL) {
    console.error(JSON.stringify({ message: "Job applications are not configured" }));
    return { success: false, message: t.unavailable };
  }

  let attachment: MailjetAttachment | null = null;
  try {
    const cvFile = formData.get("cv_file");
    if (cvFile instanceof File) attachment = await prepareAttachment(cvFile);
  } catch {
    return { success: false, message: t.invalidFile };
  }

  const safe = {
    jobTitle: escapeHtml(data.job_title),
    applicantName: escapeHtml(data.applicant_name),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone || ""),
    currentPosition: escapeHtml(data.current_position || ""),
    coverLetter: escapeHtml(data.cover_letter || ""),
  };
  const subjectJobTitle = data.job_title.replace(/[\r\n]+/g, " ");
  const fontFamily =
    language === "ar"
      ? "'Tajawal', Cairo, 'Noto Kufi Arabic', sans-serif"
      : "Inter, Poppins, Montserrat, 'Open Sans', sans-serif";
  const dir = language === "ar" ? "rtl" : "ltr";

  const hrMessage: MailjetMessage = {
    From: { Email: mailjet.fromEmail, Name: "Job Application" },
    To: [{ Email: mailjet.toEmail, Name: mailjet.toName }],
    Subject: t.hrSubject.replace("{{job_title}}", subjectJobTitle),
    TextPart: `New application for ${data.job_title}\n\nName: ${data.applicant_name}\nEmail: ${data.email}\nPhone: ${data.phone || ""}\nExperience: ${data.experience_years ?? 0} years\nCurrent Position: ${data.current_position || ""}\n\nCover Letter:\n${data.cover_letter || ""}`,
    HTMLPart: `
<div style="font-family:${fontFamily};direction:${dir};color:#1f2937">
  <h2>New Job Application: ${safe.jobTitle}</h2>
  <ul>
    <li><strong>Name:</strong> ${safe.applicantName}</li>
    <li><strong>Email:</strong> ${safe.email}</li>
    <li><strong>Phone:</strong> ${safe.phone}</li>
    <li><strong>Experience:</strong> ${data.experience_years ?? 0} years</li>
    <li><strong>Current Position:</strong> ${safe.currentPosition}</li>
  </ul>
  <h3>Cover Letter</h3>
  <p style="white-space:pre-wrap">${safe.coverLetter}</p>
</div>`.trim(),
    ...(attachment ? { Attachments: [attachment] } : {}),
  };

  const applicantMessage: MailjetMessage = {
    From: { Email: mailjet.fromEmail, Name: "Job Application at East Colors" },
    To: [{ Email: data.email, Name: data.applicant_name.replace(/[\r\n]+/g, " ") }],
    Subject: t.applicantSubject.replace("{{job_title}}", subjectJobTitle),
    TextPart: `Thanks ${data.applicant_name},\n\n${t.success}`,
    HTMLPart: `<div style="font-family:${fontFamily};direction:${dir};color:#000"><p>Thanks <strong>${safe.applicantName}</strong>,</p><p>${t.success}</p></div>`,
  };

  try {
    const result = await createJobApplication(data);
    await sendMailjet(mailjet.apiKey, mailjet.secretKey, [
      hrMessage,
      applicantMessage,
    ]);
    return { success: true, message: t.success, id: result.id };
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "Job application submission failed",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return { success: false, message: t.dbError };
  }
}
