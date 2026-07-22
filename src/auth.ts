import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AdminRole, AdminStatus, type AdminUser } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/crypto";
import { permissionsFor, type Permission } from "@/server/auth/permissions";
import { writeAuditLog } from "@/server/services/auditService";

function envBootstrapCredentials() {
  const email = (
    process.env.ADMIN_EMAIL ||
    process.env.SEED_ADMIN_EMAIL ||
    ""
  )
    .trim()
    .toLowerCase();
  const password =
    process.env.ADMIN_PASSWORD || process.env.SEED_ADMIN_PASSWORD || "";
  const fullName = process.env.SEED_ADMIN_NAME || "سوپرادمین";
  return { email, password, fullName };
}

/** First-deploy / legacy: sync SUPER_ADMIN from env when credentials match. */
async function bootstrapAdminFromEnv(
  email: string,
  password: string,
): Promise<AdminUser | null> {
  const env = envBootstrapCredentials();
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

async function recordLoginSuccess(admin: AdminUser) {
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
    });
  } catch (e) {
    console.warn("[auth] login side-effects skipped", e);
  }
}

async function recordLoginFailure(email: string) {
  try {
    await prisma.analyticsEvent.create({
      data: { type: "ADMIN_LOGIN_FAILED", label: email },
    });
  } catch {
    /* ignore */
  }
}

declare module "next-auth" {
  interface User {
    role: AdminRole;
    fullName: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      role: AdminRole;
      fullName: string;
      permissions: Permission[];
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: AdminRole;
    fullName?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt", maxAge: 60 * 60 * 12 },
  pages: {
    signIn: "/adminha",
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-authjs.session-token"
          : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email || "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password || "");
        if (!email || !password) return null;

        try {
          const existing = await prisma.adminUser.findUnique({
            where: { email },
          });

          if (
            existing &&
            existing.status === AdminStatus.ACTIVE &&
            (await verifyPassword(password, existing.passwordHash))
          ) {
            await recordLoginSuccess(existing);
            return {
              id: existing.id,
              email: existing.email,
              role: existing.role,
              fullName: existing.fullName,
            };
          }

          // DB empty / seed missing / hash mismatch → accept legacy env creds
          const bootstrapped = await bootstrapAdminFromEnv(email, password);
          if (bootstrapped) {
            await recordLoginSuccess(bootstrapped);
            return {
              id: bootstrapped.id,
              email: bootstrapped.email,
              role: bootstrapped.role,
              fullName: bootstrapped.fullName,
            };
          }

          await recordLoginFailure(email);
          return null;
        } catch (error) {
          console.error("[auth] authorize error", error);
          // Last resort if DB is down but env matches
          const env = envBootstrapCredentials();
          if (
            env.email &&
            env.password &&
            email === env.email &&
            password === env.password
          ) {
            return {
              id: "env-bootstrap",
              email: env.email,
              role: AdminRole.SUPER_ADMIN,
              fullName: env.fullName,
            };
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.fullName = user.fullName;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id && token.role && token.fullName && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.fullName = token.fullName;
        session.user.email = token.email || session.user.email;
        session.user.permissions = permissionsFor(token.role);
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET || process.env.ADMIN_SESSION_SECRET,
});
