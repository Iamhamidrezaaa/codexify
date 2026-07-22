"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { roleLabel } from "@/lib/adminLabels";

const NAV = [
  { href: "/admin/dashboard", label: "داشبورد" },
  { href: "/admin/analytics", label: "آمار" },
  { href: "/admin/realtime", label: "آنلاین الان" },
  { href: "/admin/messages", label: "پیام‌ها" },
  { href: "/admin/admins", label: "ادمین‌ها" },
  { href: "/admin/audit", label: "گزارش اقدامات" },
  { href: "/admin/settings", label: "تنظیمات" },
] as const;

export function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { fullName: string; email: string; role: string };
}) {
  const pathname = usePathname();

  return (
    <div className="admin-native-cursor min-h-dvh bg-bg font-sans text-fg antialiased">
      <div className="mx-auto flex min-h-dvh max-w-7xl flex-col md:flex-row">
        <aside className="border-b border-line md:w-60 md:shrink-0 md:border-b-0 md:border-l md:border-line">
          <div className="flex items-center justify-between gap-3 px-4 py-4 md:block">
            <Link href="/admin/dashboard" className="inline-flex items-center">
              <Image
                src="/Logo-main-navbar-v2.png"
                alt="Codexify"
                width={140}
                height={36}
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="mt-0 text-xs text-muted md:mt-3">
              {user.fullName === "Super Admin" ? "سوپرادمین" : user.fullName}
              <span className="mt-0.5 block" dir="ltr">
                {user.email}
              </span>
              <span className="mt-1 inline-block rounded-full border border-line px-2 py-0.5 text-[10px]">
                {roleLabel(user.role)}
              </span>
            </p>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-2 pb-3 md:flex-col md:overflow-visible md:px-3 md:pb-6">
            {NAV.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm transition ${
                    active
                      ? "bg-lime text-lime-ink font-bold"
                      : "text-muted hover:bg-card hover:text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => {
                void fetch("/api/admin/logout", { method: "POST" }).finally(
                  () => {
                    window.location.assign("/adminha");
                  },
                );
              }}
              className="mt-1 rounded-xl px-3 py-2 text-right text-sm text-muted transition hover:bg-card hover:text-fg md:mt-4"
            >
              خروج
            </button>
          </nav>
        </aside>
        <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
