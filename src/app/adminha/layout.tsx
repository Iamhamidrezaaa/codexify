import type { Metadata } from "next";
import { AdminNativeCursor } from "@/components/admin/AdminNativeCursor";
import { SessionProvider } from "@/components/admin/SessionProvider";

export const metadata: Metadata = {
  title: "ورود ادمین | Codexify",
  robots: { index: false, follow: false },
};

export default function AdminhaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <AdminNativeCursor />
      {children}
    </SessionProvider>
  );
}
