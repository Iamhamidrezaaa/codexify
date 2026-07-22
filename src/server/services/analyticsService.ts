import { AnalyticsEventType, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const ONLINE_WINDOW_MS = 60_000;

export async function trackAnalyticsEvent(input: {
  type: AnalyticsEventType;
  path?: string;
  title?: string;
  label?: string;
  referrer?: string;
  durationMs?: number;
  scrollMax?: number;
  visitorKey: string;
  sessionKey: string;
  screenSize?: string;
  language?: string;
  timezone?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  meta?: Record<string, unknown>;
  ipHash?: string | null;
  country?: string | null;
  city?: string | null;
  browser?: string | null;
  os?: string | null;
  device?: string | null;
}) {
  const now = new Date();

  const visitor = await prisma.visitor.upsert({
    where: { visitorKey: input.visitorKey },
    create: {
      visitorKey: input.visitorKey,
      ipHash: input.ipHash,
      country: input.country,
      city: input.city,
      browser: input.browser,
      os: input.os,
      device: input.device,
      screenSize: input.screenSize,
      language: input.language,
      timezone: input.timezone,
      totalSessions: 1,
      totalPageViews: input.type === "PAGE_VIEW" ? 1 : 0,
      lastSeenAt: now,
    },
    update: {
      ipHash: input.ipHash || undefined,
      country: input.country || undefined,
      city: input.city || undefined,
      browser: input.browser || undefined,
      os: input.os || undefined,
      device: input.device || undefined,
      screenSize: input.screenSize || undefined,
      language: input.language || undefined,
      timezone: input.timezone || undefined,
      lastSeenAt: now,
      totalPageViews:
        input.type === "PAGE_VIEW" ? { increment: 1 } : undefined,
    },
  });

  let session = await prisma.session.findUnique({
    where: { sessionKey: input.sessionKey },
  });

  if (!session) {
    const isNewVisitor = visitor.totalSessions === 0;
    session = await prisma.session.create({
      data: {
        sessionKey: input.sessionKey,
        visitorId: visitor.id,
        landingPage: input.path,
        referrer: input.referrer,
        utmSource: input.utmSource,
        utmMedium: input.utmMedium,
        utmCampaign: input.utmCampaign,
        utmTerm: input.utmTerm,
        utmContent: input.utmContent,
        pageViews: input.type === "PAGE_VIEW" ? 1 : 0,
        isBounce: true,
        lastActivity: now,
      },
    });
    // New visitor already counted session=1 on create; returning visitors increment.
    if (!isNewVisitor) {
      await prisma.visitor.update({
        where: { id: visitor.id },
        data: { totalSessions: { increment: 1 } },
      });
    }
  } else {
    const durationMs = Math.max(
      0,
      now.getTime() - session.startedAt.getTime(),
    );
    session = await prisma.session.update({
      where: { id: session.id },
      data: {
        lastActivity: now,
        exitPage: input.path || session.exitPage,
        pageViews:
          input.type === "PAGE_VIEW" ? { increment: 1 } : undefined,
        isBounce:
          input.type === "PAGE_VIEW" ? session.pageViews + 1 <= 1 : session.isBounce,
        durationMs,
      },
    });
  }

  if (input.type === "PAGE_VIEW" && input.path) {
    await prisma.pageView.create({
      data: {
        sessionId: session.id,
        path: input.path,
        title: input.title,
        referrer: input.referrer,
        durationMs: input.durationMs || 0,
        scrollMax: input.scrollMax || 0,
      },
    });
  }

  await prisma.analyticsEvent.create({
    data: {
      type: input.type,
      path: input.path,
      label: input.label,
      meta: (input.meta as Prisma.InputJsonValue) || undefined,
      visitorId: visitor.id,
      sessionId: session.id,
    },
  });

  return { visitorId: visitor.id, sessionId: session.id };
}

export async function getAnalyticsSummary(range: {
  from: Date;
  to: Date;
}) {
  const { from, to } = range;
  const [
    pageViews,
    sessions,
    uniqueVisitors,
    conversions,
    bounced,
    topPages,
    topReferrers,
    topCountries,
    topBrowsers,
    topDevices,
    topOs,
    topScreenSizes,
    utmCampaigns,
    newUsers,
    returningUsers,
    daily,
    hourly,
  ] = await Promise.all([
    prisma.pageView.count({
      where: { createdAt: { gte: from, lte: to } },
    }),
    prisma.session.findMany({
      where: { startedAt: { gte: from, lte: to } },
      select: {
        durationMs: true,
        isBounce: true,
        visitorId: true,
        referrer: true,
        utmSource: true,
      },
    }),
    prisma.visitor.count({
      where: { lastSeenAt: { gte: from, lte: to } },
    }),
    prisma.analyticsEvent.count({
      where: {
        type: "FORM_SUBMIT",
        createdAt: { gte: from, lte: to },
      },
    }),
    prisma.session.count({
      where: { startedAt: { gte: from, lte: to }, isBounce: true },
    }),
    prisma.pageView.groupBy({
      by: ["path"],
      where: { createdAt: { gte: from, lte: to } },
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 10,
    }),
    prisma.session.groupBy({
      by: ["referrer"],
      where: {
        startedAt: { gte: from, lte: to },
        referrer: { not: null },
      },
      _count: { referrer: true },
      orderBy: { _count: { referrer: "desc" } },
      take: 10,
    }),
    prisma.visitor.groupBy({
      by: ["country"],
      where: { lastSeenAt: { gte: from, lte: to }, country: { not: null } },
      _count: { country: true },
      orderBy: { _count: { country: "desc" } },
      take: 10,
    }),
    prisma.visitor.groupBy({
      by: ["browser"],
      where: { lastSeenAt: { gte: from, lte: to }, browser: { not: null } },
      _count: { browser: true },
      orderBy: { _count: { browser: "desc" } },
      take: 10,
    }),
    prisma.visitor.groupBy({
      by: ["device"],
      where: { lastSeenAt: { gte: from, lte: to }, device: { not: null } },
      _count: { device: true },
      orderBy: { _count: { device: "desc" } },
      take: 10,
    }),
    prisma.visitor.groupBy({
      by: ["os"],
      where: { lastSeenAt: { gte: from, lte: to }, os: { not: null } },
      _count: { os: true },
      orderBy: { _count: { os: "desc" } },
      take: 10,
    }),
    prisma.visitor.groupBy({
      by: ["screenSize"],
      where: {
        lastSeenAt: { gte: from, lte: to },
        screenSize: { not: null },
      },
      _count: { screenSize: true },
      orderBy: { _count: { screenSize: "desc" } },
      take: 10,
    }),
    prisma.session.groupBy({
      by: ["utmCampaign"],
      where: {
        startedAt: { gte: from, lte: to },
        utmCampaign: { not: null },
      },
      _count: { utmCampaign: true },
      orderBy: { _count: { utmCampaign: "desc" } },
      take: 10,
    }),
    prisma.visitor.count({
      where: {
        firstSeenAt: { gte: from, lte: to },
      },
    }),
    prisma.visitor.count({
      where: {
        lastSeenAt: { gte: from, lte: to },
        firstSeenAt: { lt: from },
        totalSessions: { gt: 1 },
      },
    }),
    prisma.$queryRaw<Array<{ day: Date; views: bigint }>>`
      SELECT date_trunc('day', "createdAt") as day, COUNT(*)::bigint as views
      FROM "PageView"
      WHERE "createdAt" >= ${from} AND "createdAt" <= ${to}
      GROUP BY 1
      ORDER BY 1 ASC
    `,
    prisma.$queryRaw<Array<{ hour: Date; views: bigint }>>`
      SELECT date_trunc('hour', "createdAt") as hour, COUNT(*)::bigint as views
      FROM "PageView"
      WHERE "createdAt" >= ${from} AND "createdAt" <= ${to}
      GROUP BY 1
      ORDER BY 1 ASC
    `,
  ]);

  const sessionCount = sessions.length;
  const avgDurationMs =
    sessionCount === 0
      ? 0
      : Math.round(
          sessions.reduce((s, x) => s + x.durationMs, 0) / sessionCount,
        );
  const bounceRate = sessionCount === 0 ? 0 : bounced / sessionCount;
  const conversionRate = pageViews === 0 ? 0 : conversions / pageViews;

  const trafficMap = new Map<string, number>();
  for (const s of sessions) {
    const key = s.utmSource
      ? `utm:${s.utmSource}`
      : s.referrer
        ? "referral"
        : "direct";
    trafficMap.set(key, (trafficMap.get(key) || 0) + 1);
  }

  return {
    visitors: uniqueVisitors,
    uniqueVisitors,
    sessions: sessionCount,
    pageViews,
    conversions,
    conversionRate,
    avgDurationMs,
    bounceRate,
    newUsers,
    returningUsers,
    topPages: topPages.map((p) => ({ path: p.path, count: p._count.path })),
    topReferrers: topReferrers.map((r) => ({
      referrer: r.referrer || "(direct)",
      count: r._count.referrer,
    })),
    topCountries: topCountries.map((c) => ({
      country: c.country || "Unknown",
      count: c._count.country,
    })),
    topBrowsers: topBrowsers.map((b) => ({
      browser: b.browser || "Unknown",
      count: b._count.browser,
    })),
    topDevices: topDevices.map((d) => ({
      device: d.device || "Unknown",
      count: d._count.device,
    })),
    topOs: topOs.map((o) => ({
      os: o.os || "Unknown",
      count: o._count.os,
    })),
    topScreenSizes: topScreenSizes.map((s) => ({
      screenSize: s.screenSize || "Unknown",
      count: s._count.screenSize,
    })),
    utmCampaigns: utmCampaigns.map((u) => ({
      campaign: u.utmCampaign || "Unknown",
      count: u._count.utmCampaign,
    })),
    trafficSources: Array.from(trafficMap.entries())
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count),
    daily: daily.map((d) => ({
      day: d.day,
      views: Number(d.views),
    })),
    hourly: hourly.map((h) => ({
      hour: h.hour,
      views: Number(h.views),
    })),
  };
}

export async function getRealtimeVisitors() {
  const since = new Date(Date.now() - ONLINE_WINDOW_MS);
  const sessions = await prisma.session.findMany({
    where: { lastActivity: { gte: since } },
    orderBy: { lastActivity: "desc" },
    take: 100,
    include: {
      visitor: true,
    },
  });

  return {
    online: sessions.length,
    visitors: sessions.map((s) => ({
      sessionId: s.id,
      path: s.exitPage || s.landingPage,
      country: s.visitor.country,
      browser: s.visitor.browser,
      device: s.visitor.device,
      durationMs: Math.max(0, Date.now() - s.startedAt.getTime()),
      lastActivity: s.lastActivity,
    })),
  };
}
