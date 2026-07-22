import { NextResponse } from "next/server";
import { after } from "next/server";
import { contactSchema } from "@/server/validators";
import { rateLimit } from "@/server/security/rateLimit";
import { getRequestContext } from "@/server/security/requestContext";
import { createContactMessage } from "@/server/services/contactService";
import { trackAnalyticsEvent } from "@/server/services/analyticsService";

export async function POST(request: Request) {
  try {
    const ctx = await getRequestContext();
    const limited = rateLimit(`contact:${ctx.ipHash}`, 5, 15 * 60 * 1000);
    if (!limited.ok) {
      return NextResponse.json(
        { error: "تعداد درخواست‌ها زیاد است. کمی بعد تلاش کنید." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "داده نامعتبر است." },
        { status: 400 },
      );
    }

    // honeypot
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const message = await createContactMessage({
      name: parsed.data.name,
      phone: parsed.data.phone,
      projectDescription: parsed.data.projectDescription,
      ip: ctx.ip,
      ipHash: ctx.ipHash,
      country: ctx.country,
      city: ctx.city,
      browser: ctx.browser,
      os: ctx.os,
      device: ctx.device,
      referrer: ctx.referrer,
      userAgent: ctx.userAgent,
      utmSource: parsed.data.utmSource,
      utmMedium: parsed.data.utmMedium,
      utmCampaign: parsed.data.utmCampaign,
      utmTerm: parsed.data.utmTerm,
      utmContent: parsed.data.utmContent,
    });

    after(async () => {
      await trackAnalyticsEvent({
        type: "FORM_SUBMIT",
        path: "/#contact",
        label: "contact_form",
        visitorKey: `anon_${ctx.ipHash.slice(0, 16)}`,
        sessionKey: `contact_${message.id}`,
        ipHash: ctx.ipHash,
        country: ctx.country,
        city: ctx.city,
        browser: ctx.browser,
        os: ctx.os,
        device: ctx.device,
      });
    });

    return NextResponse.json({ ok: true, id: message.id });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json(
      { error: "ثبت پیام ناموفق بود." },
      { status: 500 },
    );
  }
}
