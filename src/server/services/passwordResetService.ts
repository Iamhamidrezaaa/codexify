import { prisma } from "@/lib/prisma";
import {
  createSecureToken,
  hashPassword,
  hashToken,
  validatePasswordPolicy,
} from "@/lib/crypto";
import { resetPasswordHtml, sendEmail } from "@/server/email/resend";
import { ServiceError } from "@/server/services/adminService";
import { writeAuditLog } from "@/server/services/auditService";
import { AnalyticsEventType } from "@prisma/client";

const RESET_TTL_MS = 30 * 60 * 1000;

export async function requestPasswordReset(email: string, ip?: string) {
  const admin = await prisma.adminUser.findUnique({
    where: { email: email.toLowerCase() },
  });

  // Always succeed outwardly (no email enumeration)
  if (!admin || admin.status !== "ACTIVE") {
    return { ok: true };
  }

  const token = createSecureToken(32);
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + RESET_TTL_MS);

  await prisma.$transaction([
    prisma.passwordResetToken.updateMany({
      where: { adminId: admin.id, usedAt: null },
      data: { usedAt: new Date() },
    }),
    prisma.passwordResetToken.create({
      data: {
        adminId: admin.id,
        tokenHash,
        expiresAt,
      },
    }),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codexify.ir";
  const link = `${siteUrl}/adminha/reset-password?token=${token}`;

  await sendEmail({
    to: admin.email,
    subject: "بازنشانی رمز عبور | Codexify",
    html: resetPasswordHtml(link),
  });

  await prisma.analyticsEvent.create({
    data: { type: AnalyticsEventType.FORGOT_PASSWORD, label: admin.email },
  });
  await writeAuditLog({
    adminId: admin.id,
    action: "auth.forgot_password",
    entity: "AdminUser",
    entityId: admin.id,
    ip,
  });

  return { ok: true };
}

export async function resetPasswordWithToken(
  token: string,
  password: string,
  ip?: string,
) {
  const policyError = validatePasswordPolicy(password);
  if (policyError) throw new ServiceError(policyError);

  const tokenHash = hashToken(token);
  const record = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
  });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    throw new ServiceError("لینک بازنشانی نامعتبر یا منقضی است.", 400);
  }

  const passwordHash = await hashPassword(password);
  await prisma.$transaction([
    prisma.adminUser.update({
      where: { id: record.adminId },
      data: { passwordHash },
    }),
    prisma.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
  ]);

  await prisma.analyticsEvent.create({
    data: {
      type: AnalyticsEventType.RESET_PASSWORD,
      label: record.adminId,
    },
  });
  await writeAuditLog({
    adminId: record.adminId,
    action: "auth.reset_password",
    entity: "AdminUser",
    entityId: record.adminId,
    ip,
  });

  return { ok: true };
}
