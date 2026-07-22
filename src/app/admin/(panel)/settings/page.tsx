import { requireAdmin } from "@/server/auth/requireAdmin";

export default async function SettingsPage() {
  const user = await requireAdmin("settings:read");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Settings</h1>
        <p className="mt-2 text-sm text-muted">تنظیمات حساب و محیط</p>
      </div>

      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="font-bold">Profile</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Full Name</dt>
            <dd>{user.fullName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Email</dt>
            <dd dir="ltr">{user.email}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Role</dt>
            <dd>{user.role}</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="font-bold">Environment</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          <li>Email provider: Resend</li>
          <li>Analytics: Internal (no Google Analytics)</li>
          <li>Auth: NextAuth Credentials + JWT</li>
          <li>Password reset TTL: 30 minutes</li>
        </ul>
      </section>
    </div>
  );
}
