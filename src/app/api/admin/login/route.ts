import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";
import { AdminRole, AdminStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/crypto";
import { rateLimit } from "@/server/security/rateLimit";
import { getRequestContext } from "@/server/security/requestContext";
import { writeAuditLog } from "@/server/services/auditService";

function authSecret() {
  return (
    process.env.AUTH_SECRET?.trim() ||
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    ""
  );
}

function sessionCookieName() {
  // Auth.js v5 naming — must match getToken({ secureCookie })
  return process.env.NODE_ENV === "production"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";
}

function envBootstrap() {
  const email = (
    process.env.ADMIN_EMAIL ||
    process.env.SEED_ADMIN_EMAIL ||
    ""
  )
    .trim()
    .toLowerCase();
  const password =
    process.env.ADMIN_PASSWORD || process.env.SEED_ADMIN_PASSWORD || "";
  const fullName = process.env.SEED_ADMIN_NAME || "Super Admin";
  return { email, password, fullName };
}

async function resolveAdmin(email: string, password: string) {
  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (
    existing &&
    existing.status === AdminStatus.ACTIVE &&
    (await verifyPassword(password, existing.passwordHash))
  ) {
    return existing;
  }

  const env = envBootstrap();
  if (!env.email || !env.password) return null;
  if (email !== env.email || password !== env.password) return null;

  const passwordHash = await hashPassword(password);
  return prisma.adminUser.upsert({
    where: { email: env.email },
    create: {
      email: env.email,
      fullName: env.fullName,
      passwordHash,
      role: AdminRole.SUPER_ADMIN,
      status: AdminStatus.ACTIVE,
    },
    update: {
      passwordHash,
      status: AdminStatus.ACTIVE,
      role: AdminRole.SUPER_ADMIN,
      fullName: env.fullName,
    },
  });
}

export async function POST(request: Request) {
  try {
    const secret = authSecret();
    if (!secret) {
      return NextResponse.json(
        { error: "پیکربندی سرور ناقص است (AUTH_SECRET)." },
        { status: 500 },
      );
    }

    const ctx = await getRequestContext();
    const limited = rateLimit(`admin-login:${ctx.ipHash}`, 20, 15 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "تعداد تلاش‌ها زیاد است. کمی بعد دوباره تلاش کنید." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const password = String(body.password || "");
    if (!email || !password) {
      return NextResponse.json(
        { error: "ایمیل و رمز عبور الزامی است." },
        { status: 400 },
      );
    }

    const admin = await resolveAdmin(email, password);
    if (!admin) {
      try {
        await prisma.analyticsEvent.create({
          data: { type: "ADMIN_LOGIN_FAILED", label: email },
        });
      } catch {
        /* ignore */
      }
      return NextResponse.json(
        { error: "ایمیل یا رمز عبور نادرست است." },
        { status: 401 },
      );
    }

    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });
    try {
      await prisma.analyticsEvent.create({
        data: { type: "ADMIN_LOGIN", label: admin.id },
      });
      await writeAuditLog({
        adminId: admin.id,
        action: "auth.login",
        entity: "AdminUser",
        entityId: admin.id,
        ip: ctx.ip,
        userAgent: ctx.userAgent,
      });
    } catch {
      /* ignore */
    }

    const cookieName = sessionCookieName();
    const maxAge = 60 * 60 * 12;
    const token = await encode({
      token: {
        id: admin.id,
        sub: admin.id,
        email: admin.email,
        role: admin.role,
        fullName: admin.fullName,
      },
      secret,
      salt: cookieName,
      maxAge,
    });

    const res = NextResponse.json({
      ok: true,
      redirectTo: "/admin/dashboard",
    });
    res.cookies.set(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    });
    return res;
  } catch (error) {
    console.error("[admin/login]", error);
    return NextResponse.json(
      { error: "ورود ناموفق بود. اتصال دیتابیس یا پیکربندی را بررسی کنید." },
      { status: 500 },
    );
  }
}
