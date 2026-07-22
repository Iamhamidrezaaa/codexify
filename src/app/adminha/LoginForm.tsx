"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("ایمیل یا رمز عبور نادرست است.");
        return;
      }
      window.location.assign(
        next.startsWith("/admin") ? next : "/admin/dashboard",
      );
    } catch {
      setError("خطای شبکه. اتصال را بررسی کنید.");
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
            "radial-gradient(1000px 520px at 85% -5%, rgba(200,240,45,0.1), transparent 55%), radial-gradient(800px 480px at 5% 105%, rgba(0,122,61,0.14), transparent 50%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[440px]">
        <div className="rounded-[1.25rem] border border-line bg-card/95 px-6 py-8 md:px-7">
          <div className="mb-6 flex justify-center">
            <Image
              src="/Logo-main-navbar-v2.png"
              alt="Codexify"
              width={180}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>

          <h1 className="text-center text-2xl font-extrabold tracking-tight">
            ورود به پنل ادمین
          </h1>
          <p className="mt-2 text-center text-sm font-medium leading-7 text-muted">
            ایمیل و رمز عبور خود را وارد کنید.
          </p>

          {error ? (
            <p
              role="alert"
              className="mt-5 rounded-xl border border-[rgba(219,20,28,0.35)] bg-[rgba(219,20,28,0.1)] px-3.5 py-3 text-center text-sm font-medium leading-6 text-[#ff9ea2]"
            >
              {error}
            </p>
          ) : null}

          <form onSubmit={onSubmit} className="mt-6 space-y-3.5" autoComplete="on">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-muted">
                ایمیل
              </span>
              <input
                type="email"
                name="email"
                required
                dir="ltr"
                autoComplete="username"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border-0 bg-[#1a1b1a] px-4 py-3.5 text-sm text-fg outline-none ring-1 ring-transparent placeholder:text-[#6f6f6f] focus:ring-lime/50"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-muted">
                رمز عبور
              </span>
              <input
                type="password"
                name="password"
                required
                dir="ltr"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border-0 bg-[#1a1b1a] px-4 py-3.5 text-sm text-fg outline-none ring-1 ring-transparent placeholder:text-[#6f6f6f] focus:ring-lime/50"
              />
            </label>

            <div className="flex justify-end">
              <Link
                href="/adminha/forgot-password"
                dir="ltr"
                className="text-xs font-medium text-muted transition hover:text-lime"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-full bg-lime py-3.5 text-sm font-extrabold text-lime-ink transition hover:brightness-110 disabled:cursor-wait disabled:opacity-65"
            >
              {loading ? "در حال ورود…" : "ورود"}
            </button>
          </form>

          <Link
            href="/"
            className="mt-5 block text-center text-[13px] font-medium text-muted transition hover:text-lime"
          >
            بازگشت به سایت
          </Link>
        </div>
      </div>
    </main>
  );
}
