import { NextResponse } from "next/server";
import { encode } from "next-auth/jwt";
import { AdminRole, AdminStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/crypto";
import { rateLimit } from "@/server/security/rateLimit";
import { getRequestContext } from "@/server/security/requestContext";
import { writeAuditLog } from "@/server/services/auditService";

type SessionUser = {
  id: string;
  email: string;
  role: AdminRole;
  fullName: string;
};

function authSecret() {
  return (
    process.env.AUTH_SECRET?.trim() ||
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    ""
  );
}

function sessionCookieName() {
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

function matchesEnv(email: string, password: string) {
  const env = envBootstrap();
  return Boolean(
    env.email &&
      env.password &&
      email === env.email &&
      password === env.password,
  );
}

async function issueSession(user: SessionUser) {
  const secret = authSecret();
  if (!secret) {
    return NextResponse.json(
      {
        error:
          "AUTH_SECRET یا ADMIN_SESSION_SECRET در .env.local تنظیم نشده است.",
      },
      { status: 500 },
    );
  }

  const cookieName = sessionCookieName();
  const maxAge = 60 * 60 * 12;
  const token = await encode({
    token: {
      id: user.id,
      sub: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
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
}

async function tryDbLogin(
  email: string,
  password: string,
): Promise<SessionUser | null> {
  try {
    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (
      existing &&
      existing.status === AdminStatus.ACTIVE &&
      (await verifyPassword(password, existing.passwordHash))
    ) {
      return {
        id: existing.id,
        email: existing.email,
        role: existing.role,
        fullName: existing.fullName,
      };
    }

    if (!matchesEnv(email, password)) return null;

    const env = envBootstrap();
    const passwordHash = await hashPassword(password);
    const admin = await prisma.adminUser.upsert({
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
    return {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      fullName: admin.fullName,
    };
  } catch (error) {
    console.error("[admin/login] db unavailable", error);
    return null;
  }
}

export async function POST(request: Request) {
  let ip: string | undefined;
  let userAgent: string | undefined;
  let ipHash = "unknown";

  try {
    const ctx = await getRequestContext();
    ip = ctx.ip;
    userAgent = ctx.userAgent;
    ipHash = ctx.ipHash;
  } catch (error) {
    console.warn("[admin/login] request context skipped", error);
  }

  const limited = rateLimit(`admin-login:${ipHash}`, 20, 15 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "تعداد تلاش‌ها زیاد است. کمی بعد دوباره تلاش کنید." },
      { status: 429 },
    );
  }

  let email = "";
  let password = "";
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };
    email = String(body.email || "")
      .trim()
      .toLowerCase();
    password = String(body.password || "");
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر است." }, { status: 400 });
  }

  if (!email || !password) {
    return NextResponse.json(
      { error: "ایمیل و رمز عبور الزامی است." },
      { status: 400 },
    );
  }

  // 1) Prefer DB user / upsert
  const fromDb = await tryDbLogin(email, password);
  if (fromDb) {
    try {
      await prisma.adminUser.update({
        where: { id: fromDb.id },
        data: { lastLoginAt: new Date() },
      });
      await prisma.analyticsEvent.create({
        data: { type: "ADMIN_LOGIN", label: fromDb.id },
      });
      await writeAuditLog({
        adminId: fromDb.id,
        action: "auth.login",
        entity: "AdminUser",
        entityId: fromDb.id,
        ip,
        userAgent,
      });
    } catch {
      /* side-effects optional */
    }
    return issueSession(fromDb);
  }

  // 2) Env fallback when Postgres is down / not migrated yet
  if (matchesEnv(email, password)) {
    const env = envBootstrap();
    console.warn(
      "[admin/login] DB unavailable — signed in with env credentials only",
    );
    return issueSession({
      id: "env-bootstrap",
      email: env.email,
      role: AdminRole.SUPER_ADMIN,
      fullName: env.fullName,
    });
  }

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
