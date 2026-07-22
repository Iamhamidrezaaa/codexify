import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/server/auth/requireAdmin";
import { getContactMessage } from "@/server/services/contactService";
import { updateContactMessageStatus } from "@/server/services/contactService";

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
    ["Name", message.name],
    ["Phone", message.phone],
    ["Status", message.status],
    ["Created", message.createdAt.toISOString()],
    ["IP", message.ip || "—"],
    ["Country", message.country || "—"],
    ["City", message.city || "—"],
    ["Browser", message.browser || "—"],
    ["OS", message.os || "—"],
    ["Device", message.device || "—"],
    ["Referrer", message.referrer || "—"],
    ["UTM Source", message.utmSource || "—"],
    ["UTM Medium", message.utmMedium || "—"],
    ["UTM Campaign", message.utmCampaign || "—"],
    ["UTM Term", message.utmTerm || "—"],
    ["UTM Content", message.utmContent || "—"],
    ["User Agent", message.userAgent || "—"],
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Message</h1>
        <Link href="/admin/messages" className="text-sm text-muted hover:text-lime">
          Back
        </Link>
      </div>

      <section className="rounded-2xl border border-line bg-card p-5">
        <h2 className="font-bold">Project</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted">
          {message.projectDescription}
        </p>
      </section>

      <section className="overflow-hidden rounded-2xl border border-line">
        <table className="min-w-full text-sm">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k} className="border-t border-line first:border-t-0">
                <th className="w-40 bg-card px-3 py-2.5 text-right font-medium text-muted">
                  {k}
                </th>
                <td className="px-3 py-2.5" dir={k === "Phone" || k.includes("UTM") || k === "IP" || k === "User Agent" || k === "Referrer" ? "ltr" : undefined}>
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
