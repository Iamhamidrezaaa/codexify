"use client";

import { useEffect, useState } from "react";

type AuditItem = {
  id: string;
  action: string;
  entity: string | null;
  entityId: string | null;
  ip: string | null;
  createdAt: string;
  admin: { fullName: string; email: string } | null;
};

export default function AuditLogsPage() {
  const [items, setItems] = useState<AuditItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void fetch("/api/admin/audit")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">گزارش اقدامات</h1>
        <p className="mt-2 text-sm text-muted">تاریخچه کارهای ادمین‌ها</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="min-w-full text-sm">
          <thead className="bg-card text-muted">
            <tr>
              <th className="px-3 py-3 text-right">زمان</th>
              <th className="px-3 py-3 text-right">ادمین</th>
              <th className="px-3 py-3 text-right">اقدام</th>
              <th className="px-3 py-3 text-right">موجودیت</th>
              <th className="px-3 py-3 text-right">IP</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-muted">
                  در حال بارگذاری…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-muted">
                  گزارشی ثبت نشده
                </td>
              </tr>
            ) : (
              items.map((log) => (
                <tr key={log.id} className="border-t border-line">
                  <td className="px-3 py-3">
                    {new Date(log.createdAt).toLocaleString("fa-IR")}
                  </td>
                  <td className="px-3 py-3">
                    {log.admin?.fullName || "—"}
                    <span className="mt-0.5 block text-xs text-muted" dir="ltr">
                      {log.admin?.email}
                    </span>
                  </td>
                  <td className="px-3 py-3" dir="ltr">
                    {log.action}
                  </td>
                  <td className="px-3 py-3">
                    {log.entity || "—"}
                    {log.entityId ? (
                      <span
                        className="mt-0.5 block text-xs text-muted"
                        dir="ltr"
                      >
                        {log.entityId}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 py-3" dir="ltr">
                    {log.ip || "—"}
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
