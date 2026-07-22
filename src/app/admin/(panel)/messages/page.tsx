"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { statusLabel } from "@/lib/adminLabels";

type Message = {
  id: string;
  name: string;
  phone: string;
  projectDescription: string;
  status: "UNREAD" | "READ" | "ARCHIVED";
  country: string | null;
  createdAt: string;
};

export default function MessagesPage() {
  const [items, setItems] = useState<Message[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: "20",
      status,
    });
    if (q.trim()) params.set("q", q.trim());
    const res = await fetch(`/api/admin/messages?${params}`);
    const data = await res.json();
    setItems(data.items || []);
    setTotal(data.total || 0);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, [page, status]);

  const setMsgStatus = async (id: string, next: Message["status"]) => {
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: next }),
    });
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm("این پیام حذف شود؟")) return;
    await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">پیام‌ها</h1>
          <p className="mt-2 text-sm text-muted">صندوق پیام‌های فرم تماس</p>
        </div>
        <a
          href={`/api/admin/messages?export=csv&status=${status}&q=${encodeURIComponent(q)}`}
          className="rounded-full border border-line px-4 py-2 text-sm"
        >
          خروجی CSV
        </a>
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="جستجو…"
          className="rounded-xl bg-card px-3 py-2 text-sm ring-1 ring-line"
        />
        <button
          type="button"
          onClick={() => {
            setPage(1);
            void load();
          }}
          className="rounded-full bg-lime px-4 py-2 text-sm font-bold text-lime-ink"
        >
          جستجو
        </button>
        <select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          className="rounded-xl bg-card px-3 py-2 text-sm ring-1 ring-line"
        >
          <option value="ALL">همه</option>
          <option value="UNREAD">خوانده‌نشده</option>
          <option value="READ">خوانده‌شده</option>
          <option value="ARCHIVED">آرشیو</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="min-w-full text-sm">
          <thead className="bg-card text-muted">
            <tr>
              <th className="px-3 py-3 text-right">نام</th>
              <th className="px-3 py-3 text-right">تلفن</th>
              <th className="px-3 py-3 text-right">وضعیت</th>
              <th className="px-3 py-3 text-right">کشور</th>
              <th className="px-3 py-3 text-right">زمان</th>
              <th className="px-3 py-3 text-right">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-muted">
                  در حال بارگذاری…
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-muted">
                  پیامی نیست
                </td>
              </tr>
            ) : (
              items.map((m) => (
                <tr key={m.id} className="border-t border-line">
                  <td className="px-3 py-3">
                    <Link
                      href={`/admin/messages/${m.id}`}
                      className="font-semibold hover:text-lime"
                    >
                      {m.name}
                    </Link>
                  </td>
                  <td className="px-3 py-3" dir="ltr">
                    {m.phone}
                  </td>
                  <td className="px-3 py-3">{statusLabel(m.status)}</td>
                  <td className="px-3 py-3">{m.country || "—"}</td>
                  <td className="px-3 py-3">
                    {new Date(m.createdAt).toLocaleString("fa-IR")}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="rounded-full border border-line px-2 py-1 text-xs"
                        onClick={() => void setMsgStatus(m.id, "READ")}
                      >
                        خوانده شد
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-line px-2 py-1 text-xs"
                        onClick={() => void setMsgStatus(m.id, "ARCHIVED")}
                      >
                        آرشیو
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-line px-2 py-1 text-xs text-red-300"
                        onClick={() => void remove(m.id)}
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted">
        <span>مجموع: {total}</span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-full border border-line px-3 py-1 disabled:opacity-40"
          >
            قبلی
          </button>
          <span>صفحه {page}</span>
          <button
            type="button"
            disabled={page * 20 >= total}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full border border-line px-3 py-1 disabled:opacity-40"
          >
            بعدی
          </button>
        </div>
      </div>
    </div>
  );
}
