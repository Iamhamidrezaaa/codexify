import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getToken } from "next-auth/jwt";
import { auth } from "@/auth";
import { can, type Permission } from "@/server/auth/permissions";
import { AdminRole } from "@prisma/client";

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

  const secure = await getToken({
    req,
    secret,
    secureCookie: true,
  });
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
    permissions: [] as Permission[],
  };
}

export async function requireAdmin(permission?: Permission) {
  const session = await auth();
  let user =
    session?.user?.id && session.user.role && session.user.fullName
      ? (session.user as {
          id: string;
          email: string;
          role: AdminRole;
          fullName: string;
          permissions: Permission[];
        })
      : null;

  if (!user) {
    const fromJwt = await readJwtUser();
    if (fromJwt) {
      user = {
        ...fromJwt,
        permissions: fromJwt.permissions.length
          ? fromJwt.permissions
          : (
              await import("@/server/auth/permissions")
            ).permissionsFor(fromJwt.role),
      };
    }
  }

  if (!user?.id || !user.role) {
    redirect("/adminha");
  }
  if (permission && !can(user.role, permission)) {
    redirect("/admin/dashboard");
  }
  if (!user.permissions?.length) {
    const { permissionsFor } = await import("@/server/auth/permissions");
    user.permissions = permissionsFor(user.role);
  }
  return user;
}
