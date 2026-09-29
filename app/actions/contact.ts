"use server";

import { getMailjetConfig, sendMailjet, type MailjetMessage } from "@/lib/mailjet";
import {
  escapeHtml,
  getLanguage,
  getText,
  isEmail,
  verifyTurnstile,
} from "@/lib/form-security";

export async function submitContactForm(formData: FormData) {
  const language = getLanguage(formData);
  const verificationMessage =
    language === "ar"
      ? "تعذر التحقق من الطلب. يرجى المحاولة مرة أخرى."
      : "We could not verify your request. Please try again.";

  if (!(await verifyTurnstile(formData, "contact"))) {
    return { success: false, message: verificationMessage };
  }

  const name = getText(formData, "name", 100);
  const email = getText(formData, "email", 254);
  const phone = getText(formData, "phone", 50);
  const company = getText(formData, "company", 100);
  const serviceType = getText(formData, "service_type", 100);
  const message = getText(formData, "message", 5000);

  if (!name || !isEmail(email) || !message) {
    return {
      success: false,
      message:
        language === "ar"
          ? "يرجى التحقق من الحقول المطلوبة والبريد الإلكتروني"
          : "Please check the required fields and email address",
    };
  }

  const mailjet = getMailjetConfig();
  if (!mailjet) {
    console.error(JSON.stringify({ message: "Contact email is not configured" }));
    return {
      success: false,
      message:
        language === "ar"
          ? "خدمة التواصل غير متاحة مؤقتًا."
          : "The contact service is temporarily unavailable.",
    };
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    company: escapeHtml(company),
    serviceType: escapeHtml(serviceType),
    message: escapeHtml(message),
  };
  const fontFamily =
    language === "ar"
      ? "'Tajawal', Cairo, 'Noto Kufi Arabic', sans-serif"
      : "Inter, Poppins, Montserrat, 'Open Sans', sans-serif";
  const dir = language === "ar" ? "rtl" : "ltr";
  const messagePayload: MailjetMessage = {
        From: {
          Email: mailjet.fromEmail,
          Name: "Contact Message From Website",
        },
        To: [
          {
            Email: mailjet.toEmail,
            Name: mailjet.toName,
          },
        ],
        Subject:
          language === "ar"
            ? "رسالة جديدة من نموذج الاتصال"
            : "New Contact Form Submission",
        TextPart: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nService: ${serviceType}\n\nMessage:\n${message}`,
        HTMLPart: `
<div style="background-color:#4f46e5;padding:20px;font-family:${fontFamily};direction:${dir};color:#000">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden">
    <div style="background-color:#4f46e5;color:#fff;padding:16px">
      <h2 style="margin:0;font-size:20px">${language === "ar" ? "رسالة جديدة من نموذج الاتصال" : "New Contact Form Submission"}</h2>
    </div>
    <div style="padding:24px;color:#1f2937;line-height:1.5">
      <ul style="list-style:none;padding:0">
        <li><strong>${language === "ar" ? "الاسم" : "Name"}:</strong> ${safe.name}</li>
        <li><strong>${language === "ar" ? "البريد الإلكتروني" : "Email"}:</strong> ${safe.email}</li>
        ${phone ? `<li><strong>${language === "ar" ? "رقم الهاتف" : "Phone"}:</strong> ${safe.phone}</li>` : ""}
        ${company ? `<li><strong>${language === "ar" ? "اسم الشركة" : "Company"}:</strong> ${safe.company}</li>` : ""}
        ${serviceType ? `<li><strong>${language === "ar" ? "نوع الخدمة" : "Service"}:</strong> ${safe.serviceType}</li>` : ""}
      </ul>
      <h3>${language === "ar" ? "الرسالة" : "Message"}</h3>
      <p style="white-space:pre-wrap">${safe.message}</p>
    </div>
  </div>
</div>`.trim(),
  };

  try {
    await sendMailjet(mailjet.apiKey, mailjet.secretKey, [messagePayload]);

    return {
      success: true,
      message:
        language === "ar"
          ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا."
          : "Your message was sent successfully! We’ll be in touch shortly.",
    };
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "Contact email failed",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return {
      success: false,
      message:
        language === "ar"
          ? "حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى لاحقًا."
          : "There was an error sending your message. Please try again later.",
    };
  }
}

export async function submitNewsletterSubscription(formData: FormData) {
  const language = getLanguage(formData);

  if (!(await verifyTurnstile(formData, "newsletter"))) {
    return {
      success: false,
      message:
        language === "ar"
          ? "تعذر التحقق من الطلب. يرجى المحاولة مرة أخرى."
          : "We could not verify your request. Please try again.",
    };
  }

  const email = getText(formData, "email", 254);
  if (!isEmail(email)) {
    return {
      success: false,
      message:
        language === "ar"
          ? "يرجى إدخال بريد إلكتروني صحيح"
          : "Please enter a valid email address",
    };
  }

  try {
    const { subscribeToNewsletter } = await import("@/lib/database");
    await subscribeToNewsletter(email, language);
    return {
      success: true,
      message:
        language === "ar"
          ? "تم الاشتراك بنجاح"
          : "You have subscribed successfully",
    };
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "Newsletter subscription failed",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return {
      success: false,
      message:
        language === "ar"
          ? "تعذر الاشتراك حاليًا. حاول لاحقًا."
          : "Subscription is temporarily unavailable. Please try later.",
    };
  }
}
