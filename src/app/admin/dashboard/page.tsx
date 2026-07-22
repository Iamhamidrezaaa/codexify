import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAdminSession } from "@/lib/adminAuth";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/adminha.html");
  }

  return (
    <main className="relative min-h-dvh overflow-hidden bg-bg px-5 py-8 text-fg md:px-16 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 480px at 90% -10%, rgba(200,240,45,0.08), transparent 55%), radial-gradient(700px 420px at 0% 100%, rgba(0,122,61,0.12), transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-card/80 px-5 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Image
              src="/Logo-main-navbar-v2.png"
              alt="Codexify"
              width={160}
              height={42}
              className="h-9 w-auto object-contain"
              priority
            />
            <div className="hidden h-8 w-px bg-line sm:block" />
            <div>
              <p className="text-xs font-medium text-muted">پنل ادمین</p>
              <h1 className="text-lg font-extrabold tracking-tight md:text-xl">
                داشبورد
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="hidden text-xs text-muted sm:block" dir="ltr">
              {session.email}
            </p>
            <AdminLogoutButton />
          </div>
        </header>

        <section className="rounded-2xl border border-line bg-card p-6 md:p-8">
          <p className="text-sm font-medium text-lime">ورود موفق</p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
            خوش آمدید
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted md:text-[15px] md:leading-8">
            سشن ادمین فعال است. از اینجا در مراحل بعدی می‌توانیم مدیریت محتوا،
            پیام‌ها و تنظیمات سایت را اضافه کنیم.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-line px-4 py-2 text-sm font-semibold text-fg transition hover:border-lime hover:text-lime"
            >
              مشاهده سایت
            </Link>
            <span
              className="inline-flex items-center rounded-full bg-lime px-4 py-2 text-sm font-bold text-lime-ink"
              dir="ltr"
            >
              {session.email}
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
