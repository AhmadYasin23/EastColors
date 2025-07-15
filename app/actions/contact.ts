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

  // initialize Mailjet client
  const mj = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY!,
    process.env.MAILJET_SECRET_KEY!
  );

  // build payload
  const mailData = {
    Messages: [
      {
        From: {
          Email: process.env.MAILJET_FROM_EMAIL!,
          Name: "No‑Reply",
        },
        To: [
          {
            Email: process.env.MAILJET_TO_EMAIL!,
            Name:
              process.env.MAILJET_TO_NAME || process.env.MAILJET_TO_EMAIL!,
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
          <h3>${
            language === "ar" ? "تفاصيل الرسالة" : "Message Details"
          }</h3>
          <ul>
            <li><strong>${
              language === "ar" ? "الاسم" : "Name"
            }:</strong> ${name}</li>
            <li><strong>${
              language === "ar" ? "البريد الإلكتروني" : "Email"
            }:</strong> ${email}</li>
            ${
              phone
                ? `<li><strong>${
                    language === "ar" ? "رقم الهاتف" : "Phone"
                  }:</strong> ${phone}</li>`
                : ""
            }
            ${
              company
                ? `<li><strong>${
                    language === "ar" ? "اسم الشركة" : "Company"
                  }:</strong> ${company}</li>`
                : ""
            }
            ${
              serviceType
                ? `<li><strong>${
                    language === "ar" ? "نوع الخدمة" : "Service"
                  }:</strong> ${serviceType}</li>`
                : ""
            }
          </ul>
          <h4>${
            language === "ar" ? "الرسالة" : "Message"
          }</h4>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        `,
      },
    ],
  };

  try {
    // cast to any to satisfy TS
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
