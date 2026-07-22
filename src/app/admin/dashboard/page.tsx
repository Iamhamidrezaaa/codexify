import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/adminha.html");
  }

  return (
    <main className="min-h-dvh bg-bg px-5 py-10 text-fg md:px-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="text-sm text-muted">پنل ادمین Codexify</p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight md:text-3xl">
              داشبورد
            </h1>
            <p className="mt-2 text-sm text-muted" dir="ltr">
              {session.email}
            </p>
          </div>
          <AdminLogoutButton />
        </header>

        <section className="rounded-2xl border border-line bg-card p-6">
          <h2 className="text-lg font-bold">خوش آمدید</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            ورود با موفقیت انجام شد. از اینجا می‌توانید در مراحل بعدی مدیریت
            محتوا، پیام‌ها و تنظیمات سایت را اضافه کنیم.
          </p>
        </section>
      </div>
    </main>
  );
}
