import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { can, type Permission } from "@/server/auth/permissions";
import { AdminRole } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";
import { permissionsFor } from "@/server/auth/permissions";

function authSecret() {
  return (
    process.env.AUTH_SECRET?.trim() ||
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    ""
  );
}

async function readJwtUser() {
  const secret = authSecret();
  if (!secret) return null;
  const h = await headers();
  const req = { headers: h };
  const secure = await getToken({ req, secret, secureCookie: true });
  const token =
    secure?.id || secure?.sub
      ? secure
      : await getToken({ req, secret, secureCookie: false });
  const id = (token?.id || token?.sub) as string | undefined;
  const role = token?.role as AdminRole | undefined;
  const fullName = token?.fullName as string | undefined;
  const email = (token?.email as string | undefined) || "";
  if (!id || !role || !fullName) return null;
  return {
    id,
    email,
    role,
    fullName,
    permissions: permissionsFor(role),
  };
}

export async function requireAdminApi(permission?: Permission) {
  const session = await auth();
  let user =
    session?.user?.id && session.user.role
      ? (session.user as {
          id: string;
          email: string;
          role: AdminRole;
          fullName: string;
          permissions: Permission[];
        })
      : null;

  if (!user) {
    user = await readJwtUser();
  }

  if (!user?.id || !user.role) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (permission && !can(user.role, permission)) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return { user };
}
