"use client";

import { useEffect, useState } from "react";

type Realtime = {
  online: number;
  visitors: Array<{
    sessionId: string;
    path: string | null;
    country: string | null;
    browser: string | null;
    device: string | null;
    durationMs: number;
    lastActivity: string;
  }>;
};

export default function RealtimePage() {
  const [data, setData] = useState<Realtime | null>(null);

  useEffect(() => {
    let alive = true;
    const tick = async () => {
      const res = await fetch("/api/analytics/realtime");
      if (!res.ok) return;
      const json = (await res.json()) as Realtime;
      if (alive) setData(json);
    };
    void tick();
    const id = window.setInterval(tick, 10_000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">آنلاین الان</h1>
        <p className="mt-2 text-sm text-muted">
          بازدیدکنندگان فعال (به‌روزرسانی هر ۱۰ ثانیه)
        </p>
      </div>

      <div className="rounded-2xl border border-line bg-card p-5">
        <p className="text-xs text-muted">تعداد آنلاین</p>
        <p className="mt-2 text-4xl font-extrabold text-lime">
          {data?.online ?? "—"}
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="min-w-full text-sm">
          <thead className="bg-card text-muted">
            <tr>
              <th className="px-3 py-3 text-right">صفحه</th>
              <th className="px-3 py-3 text-right">کشور</th>
              <th className="px-3 py-3 text-right">مرورگر</th>
              <th className="px-3 py-3 text-right">دستگاه</th>
              <th className="px-3 py-3 text-right">مدت</th>
              <th className="px-3 py-3 text-right">آخرین فعالیت</th>
            </tr>
          </thead>
          <tbody>
            {!data ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-muted">
                  در حال بارگذاری…
                </td>
              </tr>
            ) : data.visitors.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-muted">
                  کسی آنلاین نیست
                </td>
              </tr>
            ) : (
              data.visitors.map((v) => (
                <tr key={v.sessionId} className="border-t border-line">
                  <td className="px-3 py-3" dir="ltr">
                    {v.path || "/"}
                  </td>
                  <td className="px-3 py-3">{v.country || "—"}</td>
                  <td className="px-3 py-3">{v.browser || "—"}</td>
                  <td className="px-3 py-3">{v.device || "—"}</td>
                  <td className="px-3 py-3">
                    {Math.round(v.durationMs / 1000)}ث
                  </td>
                  <td className="px-3 py-3">
                    {new Date(v.lastActivity).toLocaleTimeString("fa-IR")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
