import { ContactMessageStatus, Prisma } from "@prisma/client";
import { after } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactNotifyHtml, sendEmail } from "@/server/email/resend";
import { ServiceError } from "@/server/services/adminService";
import { writeAuditLog } from "@/server/services/auditService";

export async function createContactMessage(input: {
  name: string;
  phone: string;
  projectDescription: string;
  ip?: string | null;
  ipHash?: string | null;
  country?: string | null;
  city?: string | null;
  browser?: string | null;
  os?: string | null;
  device?: string | null;
  referrer?: string | null;
  userAgent?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmTerm?: string | null;
  utmContent?: string | null;
}) {
  const message = await prisma.contactMessage.create({
    data: {
      name: input.name,
      phone: input.phone,
      projectDescription: input.projectDescription,
      ip: input.ip,
      ipHash: input.ipHash,
      country: input.country,
      city: input.city,
      browser: input.browser,
      os: input.os,
      device: input.device,
      referrer: input.referrer,
      userAgent: input.userAgent,
      utmSource: input.utmSource,
      utmMedium: input.utmMedium,
      utmCampaign: input.utmCampaign,
      utmTerm: input.utmTerm,
      utmContent: input.utmContent,
    },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://codexify.ir";
  const link = `${siteUrl}/admin/messages/${message.id}`;

  after(async () => {
    const admins = await prisma.adminUser.findMany({
      where: { status: "ACTIVE" },
      select: { email: true },
    });
    if (!admins.length) return;
    await sendEmail({
      to: admins.map((a) => a.email),
      subject: "New Contact Request",
      html: contactNotifyHtml({
        name: message.name,
        phone: message.phone,
        project: message.projectDescription,
        time: message.createdAt.toISOString(),
        ip: message.ip,
        country: message.country,
        link,
      }),
      text: `New contact from ${message.name} / ${message.phone}`,
    });
  });

  return message;
}

export async function listContactMessages(input: {
  q?: string;
  status?: ContactMessageStatus | "ALL";
  page?: number;
  pageSize?: number;
}) {
  const page = Math.max(1, input.page ?? 1);
  const pageSize = Math.min(50, Math.max(1, input.pageSize ?? 20));
  const where: Prisma.ContactMessageWhereInput = {};

  if (input.status && input.status !== "ALL") {
    where.status = input.status;
  }
  if (input.q?.trim()) {
    const q = input.q.trim();
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { phone: { contains: q, mode: "insensitive" } },
      { projectDescription: { contains: q, mode: "insensitive" } },
      { country: { contains: q, mode: "insensitive" } },
    ];
  }

  const [total, items] = await prisma.$transaction([
    prisma.contactMessage.count({ where }),
    prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
  ]);

  return { total, page, pageSize, items };
}

export async function getContactMessage(id: string) {
  const message = await prisma.contactMessage.findUnique({ where: { id } });
  if (!message) throw new ServiceError("پیام پیدا نشد.", 404);
  return message;
}

export async function updateContactMessageStatus(
  actorId: string | null,
  id: string,
  status: ContactMessageStatus,
) {
  const message = await prisma.contactMessage.update({
    where: { id },
    data: { status },
  });
  await writeAuditLog({
    adminId: actorId,
    action: `message.${status.toLowerCase()}`,
    entity: "ContactMessage",
    entityId: id,
  });
  return message;
}

export async function deleteContactMessage(actorId: string, id: string) {
  await prisma.contactMessage.delete({ where: { id } });
  await writeAuditLog({
    adminId: actorId,
    action: "message.delete",
    entity: "ContactMessage",
    entityId: id,
  });
}

export function contactMessagesToCsv(
  rows: Array<{
    name: string;
    phone: string;
    projectDescription: string;
    status: string;
    country: string | null;
    ip: string | null;
    browser: string | null;
    os: string | null;
    device: string | null;
    referrer: string | null;
    createdAt: Date;
  }>,
) {
  const header = [
    "name",
    "phone",
    "project",
    "status",
    "country",
    "ip",
    "browser",
    "os",
    "device",
    "referrer",
    "createdAt",
  ];
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [
      r.name,
      r.phone,
      r.projectDescription,
      r.status,
      r.country || "",
      r.ip || "",
      r.browser || "",
      r.os || "",
      r.device || "",
      r.referrer || "",
      r.createdAt.toISOString(),
    ]
      .map((x) => escape(String(x)))
      .join(","),
  );
  return [header.join(","), ...lines].join("\n");
}
