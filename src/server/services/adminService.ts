import { AdminRole, AdminStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { hashPassword, validatePasswordPolicy } from "@/lib/crypto";
import { can } from "@/server/auth/permissions";
import { writeAuditLog } from "@/server/services/auditService";

export class ServiceError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

export async function listAdmins() {
  return prisma.adminUser.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      lastLoginAt: true,
    },
  });
}

export async function createAdmin(
  actor: { id: string; role: AdminRole },
  input: {
    fullName: string;
    email: string;
    password: string;
    role: AdminRole;
  },
  ctx?: { ip?: string; userAgent?: string },
) {
  if (!can(actor.role, "admins:write")) {
    throw new ServiceError("دسترسی غیرمجاز.", 403);
  }
  if (input.role === "SUPER_ADMIN" && actor.role !== "SUPER_ADMIN") {
    throw new ServiceError("فقط سوپرادمین می‌تواند سوپرادمین بسازد.", 403);
  }
  const policyError = validatePasswordPolicy(input.password);
  if (policyError) throw new ServiceError(policyError);

  const exists = await prisma.adminUser.findUnique({
    where: { email: input.email.toLowerCase() },
  });
  if (exists) throw new ServiceError("این ایمیل قبلاً ثبت شده است.", 409);

  const passwordHash = await hashPassword(input.password);
  const admin = await prisma.adminUser.create({
    data: {
      fullName: input.fullName,
      email: input.email.toLowerCase(),
      passwordHash,
      role: input.role,
    },
  });

  await writeAuditLog({
    adminId: actor.id,
    action: "admin.create",
    entity: "AdminUser",
    entityId: admin.id,
    ip: ctx?.ip,
    userAgent: ctx?.userAgent,
  });

  return admin;
}

export async function updateAdmin(
  actor: { id: string; role: AdminRole },
  id: string,
  input: {
    fullName?: string;
    email?: string;
    role?: AdminRole;
    status?: AdminStatus;
  },
  ctx?: { ip?: string; userAgent?: string },
) {
  if (!can(actor.role, "admins:write")) {
    throw new ServiceError("دسترسی غیرمجاز.", 403);
  }

  const target = await prisma.adminUser.findUnique({ where: { id } });
  if (!target) throw new ServiceError("ادمین پیدا نشد.", 404);

  if (target.role === "SUPER_ADMIN" && actor.role !== "SUPER_ADMIN") {
    throw new ServiceError("ویرایش سوپرادمین مجاز نیست.", 403);
  }
  if (input.role === "SUPER_ADMIN" && actor.role !== "SUPER_ADMIN") {
    throw new ServiceError("فقط سوپرادمین می‌تواند نقش سوپرادمین بدهد.", 403);
  }

  if (input.email) {
    const clash = await prisma.adminUser.findFirst({
      where: {
        email: input.email.toLowerCase(),
        NOT: { id },
      },
    });
    if (clash) throw new ServiceError("این ایمیل قبلاً ثبت شده است.", 409);
  }

  if (
    input.status === "DISABLED" &&
    target.role === "SUPER_ADMIN" &&
    target.id === actor.id
  ) {
    throw new ServiceError("نمی‌توانید خودتان را غیرفعال کنید.", 400);
  }

  const data: Prisma.AdminUserUpdateInput = {};
  if (input.fullName) data.fullName = input.fullName;
  if (input.email) data.email = input.email.toLowerCase();
  if (input.role) data.role = input.role;
  if (input.status) data.status = input.status;

  const updated = await prisma.adminUser.update({ where: { id }, data });
  await writeAuditLog({
    adminId: actor.id,
    action: "admin.update",
    entity: "AdminUser",
    entityId: id,
    meta: input,
    ip: ctx?.ip,
    userAgent: ctx?.userAgent,
  });
  return updated;
}

export async function deleteAdmin(
  actor: { id: string; role: AdminRole },
  id: string,
  ctx?: { ip?: string; userAgent?: string },
) {
  if (!can(actor.role, "admins:delete")) {
    throw new ServiceError("دسترسی غیرمجاز.", 403);
  }
  if (actor.id === id) {
    throw new ServiceError("حذف حساب خودتان مجاز نیست.", 400);
  }
  const target = await prisma.adminUser.findUnique({ where: { id } });
  if (!target) throw new ServiceError("ادمین پیدا نشد.", 404);
  if (target.role === "SUPER_ADMIN" && actor.role !== "SUPER_ADMIN") {
    throw new ServiceError("حذف سوپرادمین مجاز نیست.", 403);
  }

  await prisma.adminUser.delete({ where: { id } });
  await writeAuditLog({
    adminId: actor.id,
    action: "admin.delete",
    entity: "AdminUser",
    entityId: id,
    ip: ctx?.ip,
    userAgent: ctx?.userAgent,
  });
}

export async function resetAdminPassword(
  actor: { id: string; role: AdminRole },
  id: string,
  password: string,
  ctx?: { ip?: string; userAgent?: string },
) {
  if (!can(actor.role, "admins:write")) {
    throw new ServiceError("دسترسی غیرمجاز.", 403);
  }
  const policyError = validatePasswordPolicy(password);
  if (policyError) throw new ServiceError(policyError);

  const target = await prisma.adminUser.findUnique({ where: { id } });
  if (!target) throw new ServiceError("ادمین پیدا نشد.", 404);
  if (target.role === "SUPER_ADMIN" && actor.role !== "SUPER_ADMIN") {
    throw new ServiceError("تغییر رمز سوپرادمین مجاز نیست.", 403);
  }

  const passwordHash = await hashPassword(password);
  await prisma.adminUser.update({
    where: { id },
    data: { passwordHash },
  });
  await writeAuditLog({
    adminId: actor.id,
    action: "admin.reset_password",
    entity: "AdminUser",
    entityId: id,
    ip: ctx?.ip,
    userAgent: ctx?.userAgent,
  });
}
