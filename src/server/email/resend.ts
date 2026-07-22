import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendEmail(input: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}) {
  const resend = getResend();
  const from = process.env.EMAIL_FROM || "Codexify <onboarding@resend.dev>";
  if (!resend) {
    console.warn("[email] RESEND_API_KEY missing — skipped", input.subject);
    return { skipped: true as const };
  }

  await resend.emails.send({
    from,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
  return { skipped: false as const };
}

export function contactNotifyHtml(data: {
  name: string;
  phone: string;
  project: string;
  time: string;
  ip?: string | null;
  country?: string | null;
  link: string;
}) {
  return `
  <div style="font-family:Tahoma,sans-serif;line-height:1.7;color:#111">
    <h2>New Contact Request</h2>
    <p><b>Name:</b> ${escapeHtml(data.name)}</p>
    <p><b>Phone:</b> ${escapeHtml(data.phone)}</p>
    <p><b>Project:</b><br/>${escapeHtml(data.project).replace(/\n/g, "<br/>")}</p>
    <p><b>Time:</b> ${escapeHtml(data.time)}</p>
    <p><b>IP:</b> ${escapeHtml(data.ip || "-")}</p>
    <p><b>Country:</b> ${escapeHtml(data.country || "-")}</p>
    <p><a href="${escapeHtml(data.link)}">Open in dashboard</a></p>
  </div>`;
}

export function resetPasswordHtml(link: string) {
  return `
  <div style="font-family:Tahoma,sans-serif;line-height:1.7;color:#111">
    <h2>بازنشانی رمز عبور Codexify</h2>
    <p>برای تعیین رمز جدید روی لینک زیر کلیک کنید (۳۰ دقیقه اعتبار):</p>
    <p><a href="${escapeHtml(link)}">${escapeHtml(link)}</a></p>
    <p>اگر این درخواست از شما نبوده، این ایمیل را نادیده بگیرید.</p>
  </div>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
