/**
 * Cloudflare Turnstile server-side verification.
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
};

function cleanEnvValue(value: string | undefined) {
  return (value || "")
    .trim()
    .replace(/^[=]+/, "")
    .replace(/^["']|["']$/g, "")
    .trim();
}

export async function verifyTurnstileToken(
  token: string | undefined,
  ip?: string | null,
): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const secret = cleanEnvValue(process.env.TURNSTILE_SECRET_KEY);
  const siteKey = cleanEnvValue(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  // No widget configured → skip
  if (!siteKey) {
    return { ok: true, skipped: true };
  }

  if (!secret) {
    console.error(
      "[turnstile] NEXT_PUBLIC_TURNSTILE_SITE_KEY set but TURNSTILE_SECRET_KEY missing",
    );
    return {
      ok: false,
      error: "پیکربندی امنیتی سرور ناقص است.",
    };
  }

  if (!token?.trim()) {
    return { ok: false, error: "تأیید امنیتی انجام نشد. صفحه را تازه کنید." };
  }

  try {
    const body = new URLSearchParams();
    body.set("secret", secret);
    body.set("response", token.trim());
    if (ip && ip !== "0.0.0.0") body.set("remoteip", ip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      },
    );

    const data = (await res.json()) as TurnstileVerifyResponse;
    if (!data.success) {
      console.warn("[turnstile] verify failed", data["error-codes"]);
      return {
        ok: false,
        error: "تأیید امنیتی ناموفق بود. دوباره تلاش کنید.",
      };
    }
    return { ok: true };
  } catch (error) {
    console.error("[turnstile] verify error", error);
    return {
      ok: false,
      error: "خطا در بررسی امنیتی. کمی بعد تلاش کنید.",
    };
  }
}

export function isTurnstileConfigured() {
  const clean = (v: string | undefined) =>
    (v || "")
      .trim()
      .replace(/^[=]+/, "")
      .replace(/^["']|["']$/g, "")
      .trim();
  return Boolean(
    clean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) &&
      clean(process.env.TURNSTILE_SECRET_KEY),
  );
}
