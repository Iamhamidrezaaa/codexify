import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const secure = process.env.NODE_ENV === "production";
  const common = {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
  res.cookies.set("authjs.session-token", "", common);
  res.cookies.set("__Secure-authjs.session-token", "", {
    ...common,
    secure: true,
  });
  res.cookies.set("codexify_admin_session", "", common);
  return res;
}
