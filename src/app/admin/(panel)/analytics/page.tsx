"use client";

import { useEffect, useState } from "react";

type Summary = {
  visitors: number;
  uniqueVisitors: number;
  sessions: number;
  pageViews: number;
  conversions: number;
  conversionRate: number;
  avgDurationMs: number;
  bounceRate: number;
  newUsers: number;
  returningUsers: number;
  topPages: Array<{ path: string; count: number }>;
  topReferrers: Array<{ referrer: string; count: number }>;
  topCountries: Array<{ country: string; count: number }>;
  topBrowsers: Array<{ browser: string; count: number }>;
  topDevices: Array<{ device: string; count: number }>;
  topOs: Array<{ os: string; count: number }>;
  topScreenSizes: Array<{ screenSize: string; count: number }>;
  utmCampaigns: Array<{ campaign: string; count: number }>;
  trafficSources: Array<{ source: string; count: number }>;
  daily: Array<{ day: string; views: number }>;
  hourly: Array<{ hour: string; views: number }>;
};

const RANGES = [
  ["today", "Today"],
  ["yesterday", "Yesterday"],
  ["7d", "Last 7 Days"],
  ["30d", "Last 30 Days"],
  ["90d", "Last 90 Days"],
  ["180d", "Last 180 Days"],
  ["365d", "Last Year"],
  ["custom", "Custom"],
] as const;

export default function AnalyticsPage() {
  const [range, setRange] = useState("7d");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (range === "custom" && (!from || !to)) return;
    setLoading(true);
    const params = new URLSearchParams({ range });
    if (range === "custom") {
      params.set("from", from);
      params.set("to", to);
    }
    void fetch(`/api/admin/analytics/summary?${params}`)
      .then((r) => r.json())
      .then((d) => setSummary(d.summary))
      .finally(() => setLoading(false));
  }, [range, from, to]);

  const cards = summary
    ? [
        ["Visitors", summary.visitors],
        ["Unique Visitors", summary.uniqueVisitors],
        ["Sessions", summary.sessions],
        ["Page Views", summary.pageViews],
        ["Conversions", summary.conversions],
        ["Conv. Rate", `${(summary.conversionRate * 100).toFixed(1)}%`],
        ["Avg Duration", `${Math.round(summary.avgDurationMs / 1000)}s`],
        ["Bounce Rate", `${(summary.bounceRate * 100).toFixed(1)}%`],
        ["New Users", summary.newUsers],
        ["Returning Users", summary.returningUsers],
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Analytics</h1>
        <p className="mt-2 text-sm text-muted">آمار داخلی سایت</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {RANGES.map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setRange(id)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              range === id ? "bg-lime text-lime-ink" : "border border-line text-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {range === "custom" ? (
        <div className="flex flex-wrap gap-2">
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="rounded-xl bg-card px-3 py-2 text-sm ring-1 ring-line"
          />
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="rounded-xl bg-card px-3 py-2 text-sm ring-1 ring-line"
          />
        </div>
      ) : null}

      {loading || !summary ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {cards.map(([label, value]) => (
              <div key={String(label)} className="rounded-2xl border border-line bg-card p-4">
                <p className="text-xs text-muted">{label}</p>
                <p className="mt-2 text-2xl font-extrabold">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <ListCard title="Top Pages" rows={summary.topPages.map((x) => [x.path, x.count])} />
            <ListCard title="Top Referrers" rows={summary.topReferrers.map((x) => [x.referrer, x.count])} />
            <ListCard title="Top Countries" rows={summary.topCountries.map((x) => [x.country, x.count])} />
            <ListCard title="Top Browsers" rows={summary.topBrowsers.map((x) => [x.browser, x.count])} />
            <ListCard title="Top Devices" rows={summary.topDevices.map((x) => [x.device, x.count])} />
            <ListCard title="Top OS" rows={summary.topOs.map((x) => [x.os, x.count])} />
            <ListCard
              title="Screen Sizes"
              rows={summary.topScreenSizes.map((x) => [x.screenSize, x.count])}
            />
            <ListCard
              title="Traffic Sources"
              rows={summary.trafficSources.map((x) => [x.source, x.count])}
            />
            <ListCard
              title="UTM Campaigns"
              rows={summary.utmCampaigns.map((x) => [x.campaign, x.count])}
            />
          </div>

          <BarChart title="Daily Page Views" points={summary.daily.map((d) => d.views)} />
          <BarChart title="Hourly Page Views" points={summary.hourly.map((d) => d.views)} />
        </>
      )}
    </div>
  );
}

function ListCard({
  title,
  rows,
}: {
  title: string;
  rows: Array<[string, number]>;
}) {
  return (
    <section className="rounded-2xl border border-line bg-card p-4">
      <h2 className="font-bold">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-muted">No data</p>
      ) : (
        <ul className="mt-3 space-y-2 text-sm">
          {rows.map(([label, count]) => (
            <li key={label} className="flex items-center justify-between gap-3">
              <span className="truncate" dir="ltr">
                {label}
              </span>
              <span className="text-lime">{count}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function BarChart({ title, points }: { title: string; points: number[] }) {
  const max = Math.max(...points, 1);
  return (
    <section className="rounded-2xl border border-line bg-card p-5">
      <h2 className="font-bold">{title}</h2>
      <div className="mt-4 flex h-40 items-end gap-1">
        {points.length === 0 ? (
          <p className="text-sm text-muted">No data</p>
        ) : (
          points.map((v, i) => {
            const h = Math.max(4, Math.round((v / max) * 100));
            return (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-lime/80"
                  style={{ height: `${h}%` }}
                  title={`${v}`}
                />
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
