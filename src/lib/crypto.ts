import { createHash, randomBytes, timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function createSecureToken(bytes = 32) {
  return randomBytes(bytes).toString("hex");
}

export function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SECRET || process.env.AUTH_SECRET || "codexify";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function safeEqualString(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export const PASSWORD_POLICY =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/;

export function validatePasswordPolicy(password: string) {
  if (!PASSWORD_POLICY.test(password)) {
    return "رمز باید حداقل ۱۰ کاراکتر و شامل حرف بزرگ، کوچک، عدد و نماد باشد.";
  }
  return null;
}
