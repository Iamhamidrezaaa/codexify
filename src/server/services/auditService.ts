import { prisma } from "@/lib/prisma";

export async function writeAuditLog(input: {
  adminId?: string | null;
  action: string;
  entity?: string;
  entityId?: string;
  meta?: Record<string, unknown>;
  ip?: string | null;
  userAgent?: string | null;
}) {
  await prisma.auditLog.create({
    data: {
      adminId: input.adminId || null,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId,
      meta: input.meta ? (input.meta as object) : undefined,
      ip: input.ip || null,
      userAgent: input.userAgent || null,
    },
  });
}
