"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

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
      if (!res.ok) throw new Error(data.error || "خطا");
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
      setError(data.error || "ثبت ناموفق");
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
      setError(data.error || "عملیات ناموفق");
      return;
    }
    setToast("ذخیره شد.");
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm("حذف این ادمین قطعی است. ادامه؟")) return;
    const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "حذف ناموفق");
      return;
    }
    setToast("حذف شد.");
    await load();
  };

  const rows = useMemo(() => items, [items]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Admins</h1>
        <p className="mt-2 text-sm text-muted">مدیریت کاربران ادمین</p>
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
        <h2 className="md:col-span-2 font-bold">Add Admin</h2>
        <input
          className="rounded-xl bg-[#1a1b1a] px-3 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-lime/40"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
          required
        />
        <input
          className="rounded-xl bg-[#1a1b1a] px-3 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-lime/40"
          placeholder="Email"
          type="email"
          dir="ltr"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          required
        />
        <input
          className="rounded-xl bg-[#1a1b1a] px-3 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-lime/40"
          placeholder="Password"
          type="password"
          dir="ltr"
          value={form.password}
          onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
          required
        />
        <input
          className="rounded-xl bg-[#1a1b1a] px-3 py-2.5 text-sm outline-none ring-1 ring-transparent focus:ring-lime/40"
          placeholder="Confirm Password"
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
          <option value="ADMIN">ADMIN</option>
          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
        </select>
        <button className="rounded-full bg-lime px-4 py-2.5 text-sm font-bold text-lime-ink">
          Create
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="min-w-full text-sm">
          <thead className="bg-card text-muted">
            <tr>
              <th className="px-3 py-3 text-right font-medium">Name</th>
              <th className="px-3 py-3 text-right font-medium">Email</th>
              <th className="px-3 py-3 text-right font-medium">Role</th>
              <th className="px-3 py-3 text-right font-medium">Status</th>
              <th className="px-3 py-3 text-right font-medium">Created</th>
              <th className="px-3 py-3 text-right font-medium">Last Login</th>
              <th className="px-3 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-muted">
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-muted">
                  No admins
                </td>
              </tr>
            ) : (
              rows.map((a) => (
                <tr key={a.id} className="border-t border-line">
                  <td className="px-3 py-3">{a.fullName}</td>
                  <td className="px-3 py-3" dir="ltr">
                    {a.email}
                  </td>
                  <td className="px-3 py-3">{a.role}</td>
                  <td className="px-3 py-3">{a.status}</td>
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
                          const fullName = prompt("Full name", a.fullName);
                          if (!fullName) return;
                          const email = prompt("Email", a.email);
                          if (!email) return;
                          void patch({ id: a.id, fullName, email });
                        }}
                      >
                        Edit
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
                        {a.status === "ACTIVE" ? "Disable" : "Enable"}
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-line px-2 py-1 text-xs"
                        onClick={() => {
                          const password = prompt("New password");
                          if (!password) return;
                          void patch({
                            id: a.id,
                            action: "resetPassword",
                            password,
                            confirmPassword: password,
                          });
                        }}
                      >
                        Reset Pass
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-line px-2 py-1 text-xs text-red-300"
                        onClick={() => void remove(a.id)}
                      >
                        Delete
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
