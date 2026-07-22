import { NextResponse } from "next/server";
import { requireAdminApi } from "@/server/auth/requireAdminApi";
import { getRealtimeVisitors } from "@/server/services/analyticsService";

export async function GET() {
  const authz = await requireAdminApi("analytics:read");
  if (authz.error) return authz.error;
  const data = await getRealtimeVisitors();
  return NextResponse.json(data);
}
