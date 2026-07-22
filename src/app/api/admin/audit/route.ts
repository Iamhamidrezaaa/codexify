import { NextResponse } from "next/server";
import { requireAdminApi } from "@/server/auth/requireAdminApi";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const authz = await requireAdminApi("audit:read");
  if (authz.error) return authz.error;

  const items = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      admin: { select: { fullName: true, email: true } },
    },
  });

  return NextResponse.json({ items });
}
