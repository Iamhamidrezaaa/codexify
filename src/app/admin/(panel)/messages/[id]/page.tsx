import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/server/auth/requireAdmin";
import {
  getContactMessage,
  updateContactMessageStatus,
} from "@/server/services/contactService";
import { statusLabel } from "@/lib/adminLabels";

export default async function MessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin("messages:read");
  const { id } = await params;
  let message;
  try {
    message = await getContactMessage(id);
  } catch {
    notFound();
  }

  if (message.status === "UNREAD") {
    await updateContactMessageStatus(null, id, "READ");
  }

  const rows = [
    ["نام", message.name, false],
    ["تلفن", message.phone, true],
    ["وضعیت", statusLabel(message.status), false],
    ["زمان", new Date(message.createdAt).toLocaleString("fa-IR"), false],
    ["IP", message.ip || "—", true],
    ["کشور", message.country || "—", false],
    ["شهر", message.city || "—", false],
    ["مرورگر", message.browser || "—", true],
    ["سیستم‌عامل", message.os || "—", true],
    ["دستگاه", message.device || "—", false],
    ["مبدأ (Referrer)", message.referrer || "—", true],
    ["UTM Source", message.utmSource || "—", true],
    ["UTM Medium", message.utmMedium || "—", true],
    ["UTM Campaign", message.utmCampaign || "—", true],
    ["UTM Term", message.utmTerm || "—", true],
    ["UTM Content", message.utmContent || "—", true],
    ["User Agent", message.userAgent || "—", true],
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">جزئیات پیام</h1>
        <Link
          href="/admin/messages"
          className="text-sm text-muted hover:text-lime"
        >
          بازگشت
        </Link>
      </div>

      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="font-bold">توضیح پروژه</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted">
          {message.projectDescription}
        </p>
      </section>

      <section className="overflow-hidden rounded-2xl border border-line">
        <table className="min-w-full text-sm">
          <tbody>
            {rows.map(([k, v, ltr]) => (
              <tr key={k} className="border-t border-line first:border-t-0">
                <th className="w-40 bg-card px-3 py-2.5 text-right font-medium text-muted">
                  {k}
                </th>
                <td className="px-3 py-2.5" dir={ltr ? "ltr" : undefined}>
                  {v}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
