"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { roleLabel, statusLabel } from "@/lib/adminLabels";

type AdminItem = {
  id: string;
  fullName: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN";
  status: "ACTIVE" | "DISABLED";
  createdAt: string;
  lastLoginAt: string | null;
};

export default function AdminsPage() {
  const [items, setItems] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "ADMIN",
  });

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "خطا در دریافت لیست");
      setItems(data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطا");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    setToast("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "ثبت ناموفق بود");
      return;
    }
    setForm({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "ADMIN",
    });
    setToast("ادمین جدید ساخته شد.");
    await load();
  };

  const patch = async (body: Record<string, unknown>) => {
    setError("");
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "عملیات ناموفق بود");
      return;
    }
    setToast("ذخیره شد.");
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm("حذف این ادمین قطعی است. ادامه می‌دهید؟")) return;
    const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "حذف ناموفق بود");
      return;
    }
    setToast("حذف شد.");
    await load();
  };

  const rows = useMemo(() => items, [items]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">ادمین‌ها</h1>
        <p className="mt-2 text-sm text-muted">مدیریت کاربران پنل</p>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      ) : null}
      {toast ? (
        <p className="rounded-xl border border-lime/30 bg-lime/10 px-3 py-2 text-sm text-lime">
          {toast}
        </p>
      ) : null}

      <form
        onSubmit={onCreate}
        className="grid gap-3 rounded-2xl border border-line bg-card p-4 md:grid-cols-2"
      >
        <h2 className="md:col-span-2 font-bold">افزودن ادمین</h2>
        <input
          className="rounded-xl bg-[#1a1b1a] px-3 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-lime/40"
          placeholder="نام کامل"
          value={form.fullName}
          onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
          required
        />
        <input
          className="rounded-xl bg-[#1a1b1a] px-3 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-lime/40"
          placeholder="ایمیل"
          type="email"
          dir="ltr"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          required
        />
        <input
          className="rounded-xl bg-[#1a1b1a] px-3 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-lime/40"
          placeholder="رمز عبور"
          type="password"
          dir="ltr"
          value={form.password}
          onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
          required
        />
        <input
          className="rounded-xl bg-[#1a1b1a] px-3 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-lime/40"
          placeholder="تکرار رمز عبور"
          type="password"
          dir="ltr"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm((s) => ({ ...s, confirmPassword: e.target.value }))
          }
          required
        />
        <select
          className="rounded-xl bg-[#1a1b1a] px-3 py-2.5 text-sm"
          value={form.role}
          onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}
        >
          <option value="ADMIN">ادمین</option>
          <option value="SUPER_ADMIN">سوپرادمین</option>
        </select>
        <button className="rounded-full bg-lime px-4 py-2.5 text-sm font-bold text-lime-ink">
          ایجاد
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="min-w-full text-sm">
          <thead className="bg-card text-muted">
            <tr>
              <th className="px-3 py-3 text-right font-medium">نام</th>
              <th className="px-3 py-3 text-right font-medium">ایمیل</th>
              <th className="px-3 py-3 text-right font-medium">نقش</th>
              <th className="px-3 py-3 text-right font-medium">وضعیت</th>
              <th className="px-3 py-3 text-right font-medium">تاریخ ایجاد</th>
              <th className="px-3 py-3 text-right font-medium">آخرین ورود</th>
              <th className="px-3 py-3 text-right font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-muted">
                  در حال بارگذاری…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-muted">
                  ادمینی ثبت نشده است
                </td>
              </tr>
            ) : (
              rows.map((a) => (
                <tr key={a.id} className="border-t border-line">
                  <td className="px-3 py-3">{a.fullName}</td>
                  <td className="px-3 py-3" dir="ltr">
                    {a.email}
                  </td>
                  <td className="px-3 py-3">{roleLabel(a.role)}</td>
                  <td className="px-3 py-3">{statusLabel(a.status)}</td>
                  <td className="px-3 py-3">
                    {new Date(a.createdAt).toLocaleDateString("fa-IR")}
                  </td>
                  <td className="px-3 py-3">
                    {a.lastLoginAt
                      ? new Date(a.lastLoginAt).toLocaleString("fa-IR")
                      : "—"}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="rounded-full border border-line px-2 py-1 text-xs"
                        onClick={() => {
                          const fullName = prompt("نام کامل", a.fullName);
                          if (!fullName) return;
                          const email = prompt("ایمیل", a.email);
                          if (!email) return;
                          void patch({ id: a.id, fullName, email });
                        }}
                      >
                        ویرایش
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-line px-2 py-1 text-xs"
                        onClick={() =>
                          patch({
                            id: a.id,
                            status:
                              a.status === "ACTIVE" ? "DISABLED" : "ACTIVE",
                          })
                        }
                      >
                        {a.status === "ACTIVE" ? "غیرفعال" : "فعال‌سازی"}
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-line px-2 py-1 text-xs"
                        onClick={() => {
                          const password = prompt("رمز عبور جدید");
                          if (!password) return;
                          void patch({
                            id: a.id,
                            action: "resetPassword",
                            password,
                            confirmPassword: password,
                          });
                        }}
                      >
                        ریست رمز
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-line px-2 py-1 text-xs text-red-300"
                        onClick={() => void remove(a.id)}
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
    </div>
  );
}
