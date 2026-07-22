/** برچسب‌های مشترک پنل ادمین (فارسی) */

export const ROLE_LABEL: Record<string, string> = {
  SUPER_ADMIN: "سوپرادمین",
  ADMIN: "ادمین",
};

export const STATUS_LABEL: Record<string, string> = {
  ACTIVE: "فعال",
  DISABLED: "غیرفعال",
  UNREAD: "خوانده‌نشده",
  READ: "خوانده‌شده",
  ARCHIVED: "آرشیو",
};

export function roleLabel(role: string) {
  return ROLE_LABEL[role] || role;
}

export function statusLabel(status: string) {
  return STATUS_LABEL[status] || status;
}
