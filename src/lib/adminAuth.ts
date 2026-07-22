import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "codexify_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set");
  }
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function encodePayload(data: object) {
  return Buffer.from(JSON.stringify(data), "utf8").toString("base64url");
}

function decodePayload(raw: string) {
  try {
    const json = Buffer.from(raw, "base64url").toString("utf8");
    return JSON.parse(json) as { email?: string; exp?: number };
  } catch {
    return null;
  }
}

export function verifyCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL ?? "";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedEmail || !expectedPassword) return false;

  const emailOk = safeEqual(
    email.trim().toLowerCase(),
    expectedEmail.trim().toLowerCase(),
  );
  const passOk = safeEqual(password, expectedPassword);
  return emailOk && passOk;
}

export function createSessionToken(email: string) {
  const payload = encodePayload({
    email: email.trim().toLowerCase(),
    exp: Date.now() + SESSION_TTL_MS,
  });
  return `${payload}.${sign(payload)}`;
}

export function readSessionToken(token: string | undefined) {
  if (!token) return null;
  const i = token.lastIndexOf(".");
  if (i <= 0) return null;

  const payload = token.slice(0, i);
  const signature = token.slice(i + 1);
  if (!payload || !signature) return null;

  const expected = sign(payload);
  if (!safeEqual(signature, expected)) return null;

  const data = decodePayload(payload);
  if (!data?.email || !data.exp) return null;
  if (!Number.isFinite(data.exp) || Date.now() > data.exp) return null;

  return { email: data.email, exp: data.exp };
}

export async function getAdminSession() {
  const jar = await cookies();
  return readSessionToken(jar.get(ADMIN_COOKIE)?.value);
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
