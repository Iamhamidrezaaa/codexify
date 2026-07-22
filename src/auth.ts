import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AdminRole, AdminStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/crypto";
import { permissionsFor, type Permission } from "@/server/auth/permissions";
import { writeAuditLog } from "@/server/services/auditService";

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

        const admin = await prisma.adminUser.findUnique({ where: { email } });
        if (!admin || admin.status !== AdminStatus.ACTIVE) {
          await prisma.analyticsEvent.create({
            data: { type: "ADMIN_LOGIN_FAILED", label: email },
          });
          return null;
        }

        const ok = await verifyPassword(password, admin.passwordHash);
        if (!ok) {
          await prisma.analyticsEvent.create({
            data: { type: "ADMIN_LOGIN_FAILED", label: email },
          });
          return null;
        }

        await prisma.adminUser.update({
          where: { id: admin.id },
          data: { lastLoginAt: new Date() },
        });
        await prisma.analyticsEvent.create({
          data: { type: "ADMIN_LOGIN", label: admin.id },
        });
        await writeAuditLog({
          adminId: admin.id,
          action: "auth.login",
          entity: "AdminUser",
          entityId: admin.id,
        });

        return {
          id: admin.id,
          email: admin.email,
          role: admin.role,
          fullName: admin.fullName,
        };
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
