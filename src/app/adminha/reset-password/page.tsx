"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function ResetForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!token) {
      setError("توکن نامعتبر است.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "بازنشانی ناموفق بود.");
        return;
      }
      setDone(true);
    } catch {
      setError("خطای شبکه.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-native-cursor relative grid min-h-dvh place-items-center overflow-hidden bg-bg px-5 py-10 font-sans text-fg antialiased">
      <div className="relative z-10 w-full max-w-[440px] rounded-[1.25rem] border border-line bg-card/95 px-6 py-8">
        <div className="mb-6 flex justify-center">
          <Image
            src="/Logo-main-navbar-v2.png"
            alt="Codexify"
            width={160}
            height={40}
            className="h-9 w-auto object-contain"
          />
        </div>
        <h1 className="text-center text-xl font-extrabold">Reset Password</h1>
        <p className="mt-2 text-center text-sm text-muted">
          رمز جدید را وارد کنید (حداقل ۱۰ کاراکتر، حرف بزرگ/کوچک، عدد و نماد).
        </p>

        {done ? (
          <div className="mt-6 space-y-4 text-center">
            <p className="rounded-xl border border-lime/30 bg-lime/10 px-3 py-3 text-sm text-lime">
              رمز با موفقیت تغییر کرد.
            </p>
            <Link href="/adminha" className="text-sm text-lime">
              ورود به پنل
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-3.5">
            {error ? (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            ) : null}
            <input
              type="password"
              required
              dir="ltr"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full rounded-xl bg-[#1a1b1a] px-4 py-3.5 text-sm outline-none focus:ring-1 focus:ring-lime/50"
            />
            <input
              type="password"
              required
              dir="ltr"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full rounded-xl bg-[#1a1b1a] px-4 py-3.5 text-sm outline-none focus:ring-1 focus:ring-lime/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-lime py-3.5 text-sm font-extrabold text-lime-ink disabled:opacity-65"
            >
              {loading ? "…" : "ذخیره رمز جدید"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-dvh place-items-center bg-bg text-muted">
          Loading…
        </main>
      }
    >
      <ResetForm />
    </Suspense>
  );
}
