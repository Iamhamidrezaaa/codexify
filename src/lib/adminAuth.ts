import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "codexify_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function toBase64Url(value: string) {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const padded = value + "=".repeat((4 - (value.length % 4)) % 4);
  const b64 = padded.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(b64, "base64").toString("utf8");
}

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() || "";
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL ?? "";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedEmail || !expectedPassword) return false;

  try {
    const emailOk = safeEqual(
      email.trim().toLowerCase(),
      expectedEmail.trim().toLowerCase(),
    );
    const passOk = safeEqual(password, expectedPassword);
    return emailOk && passOk;
  } catch {
    return false;
  }
}

export function createSessionToken(email: string) {
  const secret = getSecret();
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }
  const payload = toBase64Url(
    JSON.stringify({
      email: email.trim().toLowerCase(),
      exp: Date.now() + SESSION_TTL_MS,
    }),
  );
  return `${payload}.${sign(payload, secret)}`;
}

export function readSessionToken(token: string | undefined) {
  if (!token) return null;
  const secret = getSecret();
  if (!secret) return null;

  try {
    const i = token.lastIndexOf(".");
    if (i <= 0) return null;

    const payload = token.slice(0, i);
    const signature = token.slice(i + 1);
    if (!payload || !signature) return null;

    const expected = sign(payload, secret);
    if (!safeEqual(signature, expected)) return null;

    const data = JSON.parse(fromBase64Url(payload)) as {
      email?: string;
      exp?: number;
    };
    if (!data?.email || !data.exp) return null;
    if (!Number.isFinite(data.exp) || Date.now() > data.exp) return null;

    return { email: data.email, exp: data.exp };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  try {
    const jar = await cookies();
    return readSessionToken(jar.get(ADMIN_COOKIE)?.value);
  } catch {
    return null;
  }
}

export function sessionCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
