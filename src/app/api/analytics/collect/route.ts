import { NextResponse } from "next/server";
import { analyticsCollectSchema } from "@/server/validators";
import { rateLimit } from "@/server/security/rateLimit";
import { getRequestContext } from "@/server/security/requestContext";
import { trackAnalyticsEvent } from "@/server/services/analyticsService";

export async function POST(request: Request) {
  try {
    const ctx = await getRequestContext();
    const limited = rateLimit(`analytics:${ctx.ipHash}`, 120, 60_000);
    if (!limited.ok) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    const body = await request.json();
    const parsed = analyticsCollectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await trackAnalyticsEvent({
      ...parsed.data,
      ipHash: ctx.ipHash,
      country: ctx.country,
      city: ctx.city,
      browser: ctx.browser,
      os: ctx.os,
      device: ctx.device,
      referrer: parsed.data.referrer || ctx.referrer,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[analytics/collect]", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
