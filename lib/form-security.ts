const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const MAX_TURNSTILE_TOKEN_LENGTH = 2048;

export type SupportedLanguage = "ar" | "en";

export function getLanguage(formData: FormData): SupportedLanguage {
  return formData.get("language") === "ar" ? "ar" : "en";
}

export function getText(
  formData: FormData,
  name: string,
  maxLength: number,
): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function isEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

type TurnstileResponse = {
  success?: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

export async function verifyTurnstile(
  formData: FormData,
  expectedAction: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const token = getText(
    formData,
    "cf-turnstile-response",
    MAX_TURNSTILE_TOKEN_LENGTH + 1,
  );

  if (!secret || !token || token.length > MAX_TURNSTILE_TOKEN_LENGTH) {
    return false;
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        idempotency_key: crypto.randomUUID(),
      }),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) return false;

    const result = (await response.json()) as TurnstileResponse;
    if (!result.success || result.action !== expectedAction) return false;

    const allowedHostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean);

    return (
      allowedHostnames.length === 0 ||
      (typeof result.hostname === "string" &&
        allowedHostnames.includes(result.hostname.toLowerCase()))
    );
  } catch (error) {
    console.error(
      JSON.stringify({
        message: "Turnstile verification failed",
        error: error instanceof Error ? error.message : String(error),
      }),
    );
    return false;
  }
}
