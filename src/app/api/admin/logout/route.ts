import { NextResponse } from "next/server";
import { ADMIN_COOKIE, sessionCookieOptions } from "@/lib/adminAuth";

/** Clears legacy admin cookie. Prefer client `signOut` from next-auth. */
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
  res.cookies.set("authjs.session-token", "", { path: "/", maxAge: 0 });
  res.cookies.set("__Secure-authjs.session-token", "", {
    path: "/",
    maxAge: 0,
    secure: true,
  });
  return res;
}
