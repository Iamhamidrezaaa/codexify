"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "درخواست ناموفق بود.");
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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 520px at 85% -5%, rgba(200,240,45,0.1), transparent 55%)",
        }}
      />
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
        <h1 className="text-center text-xl font-extrabold">Forgot Password</h1>
        <p className="mt-2 text-center text-sm text-muted">
          لینک بازنشانی به ایمیل شما ارسال می‌شود.
        </p>

        {done ? (
          <p className="mt-6 rounded-xl border border-lime/30 bg-lime/10 px-3 py-3 text-center text-sm text-lime">
            اگر حساب فعال باشد، ایمیل ارسال شد.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-3.5">
            {error ? (
              <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            ) : null}
            <input
              type="email"
              required
              dir="ltr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full rounded-xl bg-[#1a1b1a] px-4 py-3.5 text-sm outline-none ring-1 ring-transparent focus:ring-lime/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-lime py-3.5 text-sm font-extrabold text-lime-ink disabled:opacity-65"
            >
              {loading ? "…" : "ارسال لینک"}
            </button>
          </form>
        )}

        <Link
          href="/adminha"
          className="mt-5 block text-center text-sm text-muted hover:text-lime"
        >
          بازگشت به ورود
        </Link>
      </div>
    </main>
  );
}
