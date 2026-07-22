import { NextResponse } from "next/server";
import { ContactMessageStatus } from "@prisma/client";
import { requireAdminApi } from "@/server/auth/requireAdminApi";
import {
  contactMessagesToCsv,
  deleteContactMessage,
  getContactMessage,
  listContactMessages,
  updateContactMessageStatus,
} from "@/server/services/contactService";
import { ServiceError } from "@/server/services/adminService";

export async function GET(request: Request) {
  const authz = await requireAdminApi("messages:read");
  if (authz.error) return authz.error;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    try {
      const item = await getContactMessage(id);
      return NextResponse.json({ item });
    } catch (e) {
      if (e instanceof ServiceError) {
        return NextResponse.json({ error: e.message }, { status: e.status });
      }
      throw e;
    }
  }

  const exportCsv = searchParams.get("export") === "csv";
  const result = await listContactMessages({
    q: searchParams.get("q") || undefined,
    status: (searchParams.get("status") as ContactMessageStatus | "ALL") || "ALL",
    page: Number(searchParams.get("page") || 1),
    pageSize: exportCsv ? 1000 : Number(searchParams.get("pageSize") || 20),
  });

  if (exportCsv) {
    const csv = contactMessagesToCsv(result.items);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="messages.csv"',
      },
    });
  }

  return NextResponse.json(result);
}

export async function PATCH(request: Request) {
  const authz = await requireAdminApi("messages:write");
  if (authz.error) return authz.error;
  try {
    const body = await request.json();
    const id = String(body.id || "");
    const status = body.status as ContactMessageStatus;
    if (!id || !status) {
      return NextResponse.json({ error: "Invalid" }, { status: 400 });
    }
    const item = await updateContactMessageStatus(authz.user!.id, id, status);
    return NextResponse.json({ item });
  } catch (e) {
    if (e instanceof ServiceError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authz = await requireAdminApi("messages:delete");
  if (authz.error) return authz.error;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await deleteContactMessage(authz.user!.id, id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof ServiceError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
