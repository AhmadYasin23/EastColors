type MailjetAddress = {
  Email: string;
  Name?: string;
};

export type MailjetAttachment = {
  ContentType: string;
  Filename: string;
  Base64Content: string;
};

export type MailjetMessage = {
  From: MailjetAddress;
  To: MailjetAddress[];
  Subject: string;
  TextPart: string;
  HTMLPart: string;
  Attachments?: MailjetAttachment[];
};

type MailjetResponse = {
  Messages?: Array<{ Status?: string }>;
};

export function getMailjetConfig() {
  const {
    MAILJET_API_KEY,
    MAILJET_SECRET_KEY,
    MAILJET_FROM_EMAIL,
    MAILJET_TO_EMAIL,
    MAILJET_TO_NAME,
  } = process.env;

  if (
    !MAILJET_API_KEY ||
    !MAILJET_SECRET_KEY ||
    !MAILJET_FROM_EMAIL ||
    !MAILJET_TO_EMAIL
  ) {
    return null;
  }

  return {
    apiKey: MAILJET_API_KEY,
    secretKey: MAILJET_SECRET_KEY,
    fromEmail: MAILJET_FROM_EMAIL,
    toEmail: MAILJET_TO_EMAIL,
    toName: MAILJET_TO_NAME || MAILJET_TO_EMAIL,
  };
}

export async function sendMailjet(
  apiKey: string,
  secretKey: string,
  messages: MailjetMessage[],
): Promise<void> {
  const response = await fetch("https://api.mailjet.com/v3.1/send", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:${secretKey}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Messages: messages }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`Mailjet returned HTTP ${response.status}`);
  }

  const result = (await response.json()) as MailjetResponse;
  if (result.Messages?.some((message) => message.Status !== "success")) {
    throw new Error("Mailjet did not accept every message");
  }
}
