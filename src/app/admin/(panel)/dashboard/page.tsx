import { prisma } from "@/lib/prisma";
import { getRealtimeVisitors } from "@/server/services/analyticsService";

export default async function AdminDashboardPage() {
  let messagesUnread = 0;
  let admins = 0;
  let realtime = { online: 0, visitors: [] as Awaited<
    ReturnType<typeof getRealtimeVisitors>
  >["visitors"] };
  let dbError = false;

  try {
    const [u, a, r] = await Promise.all([
      prisma.contactMessage.count({ where: { status: "UNREAD" } }),
      prisma.adminUser.count({ where: { status: "ACTIVE" } }),
      getRealtimeVisitors(),
    ]);
    messagesUnread = u;
    admins = a;
    realtime = r;
  } catch (error) {
    console.error("[admin/dashboard] db", error);
    dbError = true;
  }

  const cards = [
    { label: "Unread Messages", value: messagesUnread },
    { label: "Active Admins", value: admins },
    { label: "Online Now", value: realtime.online },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-muted">
          خلاصه وضعیت سایت و صندوق پیام‌ها
        </p>
      </div>

      {dbError ? (
        <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-3 text-sm text-amber-200">
          اتصال به دیتابیس برقرار نیست. در سرور{" "}
          <span dir="ltr">DATABASE_URL</span> را تنظیم کنید و{" "}
          <span dir="ltr">npx prisma migrate deploy && npm run db:seed</span> را
          اجرا کنید.
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-line bg-card p-5"
          >
            <p className="text-xs text-muted">{c.label}</p>
            <p className="mt-2 text-3xl font-extrabold text-lime">{c.value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="font-bold">Realtime snapshot</h2>
        {realtime.visitors.length === 0 ? (
          <p className="mt-3 text-sm text-muted">کسی آنلاین نیست.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {realtime.visitors.slice(0, 8).map((v) => (
              <li
                key={v.sessionId}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line px-3 py-2 text-sm"
              >
                <span dir="ltr">{v.path || "/"}</span>
                <span className="text-muted">
                  {v.country || "—"} · {v.device || "—"} · {v.browser || "—"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
