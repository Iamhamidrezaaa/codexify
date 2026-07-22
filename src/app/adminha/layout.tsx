import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ورود ادمین | Codexify",
  robots: { index: false, follow: false },
};

export default function AdminhaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
