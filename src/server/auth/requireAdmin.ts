import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { can, type Permission } from "@/server/auth/permissions";
import { AdminRole } from "@prisma/client";

export async function requireAdmin(permission?: Permission) {
  const session = await auth();
  if (!session?.user?.id || !session.user.role) {
    redirect("/adminha");
  }
  if (permission && !can(session.user.role as AdminRole, permission)) {
    redirect("/admin/dashboard");
  }
  return session.user as {
    id: string;
    email: string;
    role: AdminRole;
    fullName: string;
    permissions: Permission[];
  };
}
