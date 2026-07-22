import { NextResponse } from "next/server";
import { requireAdminApi } from "@/server/auth/requireAdminApi";
import {
  createAdmin,
  deleteAdmin,
  listAdmins,
  resetAdminPassword,
  ServiceError,
  updateAdmin,
} from "@/server/services/adminService";
import {
  adminCreateSchema,
  adminResetPasswordSchema,
  adminUpdateSchema,
} from "@/server/validators";
import { getRequestContext } from "@/server/security/requestContext";

export async function GET() {
  const authz = await requireAdminApi("admins:read");
  if (authz.error) return authz.error;
  const items = await listAdmins();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const authz = await requireAdminApi("admins:write");
  if (authz.error) return authz.error;
  try {
    const body = await request.json();
    const parsed = adminCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid" },
        { status: 400 },
      );
    }
    const ctx = await getRequestContext();
    const admin = await createAdmin(authz.user!, parsed.data, ctx);
    return NextResponse.json({
      item: {
        id: admin.id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
        status: admin.status,
        createdAt: admin.createdAt,
        lastLoginAt: admin.lastLoginAt,
      },
    });
  } catch (e) {
    if (e instanceof ServiceError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const authz = await requireAdminApi("admins:write");
  if (authz.error) return authz.error;
  try {
    const body = await request.json();
    const id = String(body.id || "");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    if (body.action === "resetPassword") {
      const parsed = adminResetPasswordSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message || "Invalid" },
          { status: 400 },
        );
      }
      const ctx = await getRequestContext();
      await resetAdminPassword(authz.user!, id, parsed.data.password, ctx);
      return NextResponse.json({ ok: true });
    }

    const parsed = adminUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid" },
        { status: 400 },
      );
    }
    const ctx = await getRequestContext();
    const item = await updateAdmin(authz.user!, id, parsed.data, ctx);
    return NextResponse.json({ item });
  } catch (e) {
    if (e instanceof ServiceError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authz = await requireAdminApi("admins:delete");
  if (authz.error) return authz.error;
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const ctx = await getRequestContext();
    await deleteAdmin(authz.user!, id, ctx);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof ServiceError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
