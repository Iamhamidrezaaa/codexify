import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createSessionToken,
  sessionCookieOptions,
  verifyCredentials,
} from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };
    const email = String(body.email ?? "");
    const password = String(body.password ?? "");

    if (!email || !password) {
      return NextResponse.json(
        { error: "ایمیل و رمز عبور الزامی است." },
        { status: 400 },
      );
    }

    if (
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD ||
      !process.env.ADMIN_SESSION_SECRET
    ) {
      return NextResponse.json(
        { error: "تنظیمات ورود ادمین کامل نیست. فایل .env.local را روی سرور چک کنید." },
        { status: 500 },
      );
    }

    if (!verifyCredentials(email, password)) {
      return NextResponse.json(
        { error: "ایمیل یا رمز عبور اشتباه است." },
        { status: 401 },
      );
    }

    const token = createSessionToken(email);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions());
    return res;
  } catch (err) {
    console.error("[admin/login]", err);
    return NextResponse.json(
      { error: "خطای سرور. دوباره تلاش کنید." },
      { status: 500 },
    );
  }
}
