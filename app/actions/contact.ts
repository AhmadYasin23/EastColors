// app/actions/contact.ts
"use server";
import Mailjet from "node-mailjet";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";
  const company = formData.get("company")?.toString() || "";
  const serviceType = formData.get("service_type")?.toString() || "";
  const message = formData.get("message")?.toString() || "";
  const language = formData.get("language")?.toString() || "en";

  if (!name || !email || !message) {
    return {
      success: false,
      message:
        language === "ar"
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill in all required fields",
    };
  }

  const mj = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY!,
    process.env.MAILJET_SECRET_KEY!
  );

  // pick font & dir based on language
  const fontFamily =
    language === "ar"
      ? "'Tajawal', Cairo, 'Noto Kufi Arabic', sans-serif"
      : "Inter, Poppins, Montserrat, 'Open Sans', sans-serif";
  const dir = language === "ar" ? "rtl" : "ltr";

  const mailData = {
    Messages: [
      {
        From: {
          Email: process.env.MAILJET_FROM_EMAIL!,
          Name: "Contact Message From Website",
        },
        To: [
          {
            Email: process.env.MAILJET_TO_EMAIL!,
            Name: process.env.MAILJET_TO_NAME || process.env.MAILJET_TO_EMAIL!,
          },
        ],
        Subject:
          language === "ar"
            ? "رسالة جديدة من نموذج الاتصال"
            : "New Contact Form Submission",
        TextPart: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}
Service: ${serviceType}

Message:
${message}
      `.trim(),
        HTMLPart: `
<div style="background-color:#4f46e5; padding:20px; font-family:${fontFamily}; direction:${dir}; color:#000;">
  <div style="max-width:600px; margin:0 auto; background-color:#FFFFFF; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    <!-- Header -->
    <div style="background-color:#4f46e5; color:#FFFFFF; padding:16px;">
      <h2 style="margin:0; font-size:20px; font-weight:600;">
        ${language === "ar" ? "رسالة جديدة من نموذج الاتصال" : "New Contact Form Submission"}
      </h2>
    </div>
    <!-- Body -->
    <div style="padding:24px; color:#1F2937; line-height:1.5;">
      <p style="margin-top:0;">
        ${
          language === "ar"
            ? "تلقيت رسالة جديدة عبر نموذج الاتصال الخاص بموقعك:"
            : "You have received a new message via your website contact form:"
        }
      </p>
      <ul style="list-style:none; padding:0; margin:0 0 16px 0;">
        <li><strong>${language === "ar" ? "الاسم" : "Name"}:</strong> ${name}</li>
        <li><strong>${language === "ar" ? "البريد الإلكتروني" : "Email"}:</strong> ${email}</li>
        ${phone ? `<li><strong>${language === "ar" ? "رقم الهاتف" : "Phone"}:</strong> ${phone}</li>` : ""}
        ${company ? `<li><strong>${language === "ar" ? "اسم الشركة" : "Company"}:</strong> ${company}</li>` : ""}
        ${serviceType ? `<li><strong>${language === "ar" ? "نوع الخدمة" : "Service"}:</strong> ${serviceType}</li>` : ""}
      </ul>
      <h3 style="margin-bottom:8px; font-size:16px; font-weight:500;">
        ${language === "ar" ? "الرسالة" : "Message"}
      </h3>
      <p style="margin-top:0; white-space:pre-wrap;">
        ${message}
      </p>
    </div>
    <!-- Footer -->
    <div style="background-color:#F9FAFB; padding:12px; text-align:center; font-size:12px; color:#6B7280;">
      © ${new Date().getFullYear()} Your Company Name
    </div>
  </div>
</div>
      `.trim(),
      },
    ],
  };

  try {
    const response = await mj
      .post("send", { version: "v3.1" })
      .request(mailData as any);

    if (response.body.Messages[0].Status === "success") {
      return {
        success: true,
        message:
          language === "ar"
            ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا."
            : "Your message was sent successfully! We’ll be in touch shortly.",
      };
    } else {
      throw new Error("Mailjet did not return success");
    }
  } catch (err) {
    console.error("Mailjet error:", err);
    return {
      success: false,
      message:
        language === "ar"
          ? "حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى لاحقًا."
          : "There was an error sending your message. Please try again later.",
    };
  }
}
