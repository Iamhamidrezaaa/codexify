import { auth } from "@/auth";
import { can, type Permission } from "@/server/auth/permissions";
import { AdminRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function requireAdminApi(permission?: Permission) {
  const session = await auth();
  if (!session?.user?.id || !session.user.role) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (permission && !can(session.user.role as AdminRole, permission)) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return {
    user: session.user as {
      id: string;
      email: string;
      role: AdminRole;
      fullName: string;
      permissions: Permission[];
    },
  };
}
