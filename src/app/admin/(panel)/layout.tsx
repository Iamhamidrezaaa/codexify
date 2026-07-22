import { requireAdmin } from "@/server/auth/requireAdmin";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminNativeCursor } from "@/components/admin/AdminNativeCursor";
import { SessionProvider } from "@/components/admin/SessionProvider";

export default async function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireAdmin();

  return (
    <SessionProvider>
      <AdminNativeCursor />
      <AdminShell user={user}>{children}</AdminShell>
    </SessionProvider>
  );
}
