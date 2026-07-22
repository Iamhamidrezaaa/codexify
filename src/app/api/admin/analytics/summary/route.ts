import { NextResponse } from "next/server";
import { requireAdminApi } from "@/server/auth/requireAdminApi";
import { getAnalyticsSummary } from "@/server/services/analyticsService";

function rangeFromPreset(preset: string, from?: string, to?: string) {
  const now = new Date();
  const end = to ? new Date(to) : now;
  const start = new Date(end);

  switch (preset) {
    case "today":
      start.setHours(0, 0, 0, 0);
      break;
    case "yesterday":
      start.setDate(start.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() - (to ? 0 : 1));
      end.setHours(23, 59, 59, 999);
      break;
    case "7d":
      start.setDate(start.getDate() - 7);
      break;
    case "30d":
      start.setDate(start.getDate() - 30);
      break;
    case "90d":
      start.setDate(start.getDate() - 90);
      break;
    case "180d":
      start.setDate(start.getDate() - 180);
      break;
    case "365d":
      start.setDate(start.getDate() - 365);
      break;
    case "custom":
      if (from) return { from: new Date(from), to: end };
      start.setDate(start.getDate() - 7);
      break;
    default:
      start.setDate(start.getDate() - 7);
  }
  return { from: start, to: end };
}

export async function GET(request: Request) {
  const authz = await requireAdminApi("analytics:read");
  if (authz.error) return authz.error;

  const { searchParams } = new URL(request.url);
  const preset = searchParams.get("range") || "7d";
  const range = rangeFromPreset(
    preset,
    searchParams.get("from") || undefined,
    searchParams.get("to") || undefined,
  );
  const summary = await getAnalyticsSummary(range);
  return NextResponse.json({ range, summary });
}
