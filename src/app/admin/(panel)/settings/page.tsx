import { requireAdmin } from "@/server/auth/requireAdmin";
import { roleLabel } from "@/lib/adminLabels";

export default async function SettingsPage() {
  const user = await requireAdmin("settings:read");
  const hasDb = Boolean(process.env.DATABASE_URL?.trim());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">تنظیمات</h1>
        <p className="mt-2 text-sm text-muted">حساب کاربری و وضعیت محیط</p>
      </div>

      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="font-bold">پروفایل</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">نام</dt>
            <dd>
              {user.fullName === "Super Admin" ? "سوپرادمین" : user.fullName}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">ایمیل</dt>
            <dd dir="ltr">{user.email}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">نقش</dt>
            <dd>{roleLabel(user.role)}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="font-bold">محیط سرور</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          <li>
            دیتابیس:{" "}
            {hasDb ? (
              <span className="text-lime">DATABASE_URL تنظیم شده</span>
            ) : (
              <span className="text-amber-300">تنظیم نشده</span>
            )}
          </li>
          <li>ایمیل اعلان: Resend</li>
          <li>آمار: داخلی (بدون گوگل آنالیتیکس)</li>
          <li>احراز هویت: JWT امن</li>
          <li>اعتبار لینک بازیابی رمز: ۳۰ دقیقه</li>
        </ul>
      </section>
    </div>
  );
}
