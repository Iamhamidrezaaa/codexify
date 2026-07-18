import type { Metadata } from "next";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codexify | طراحی وبسایت",
  description:
    "طراحی وبسایت با تمرکز روی تجربه کاربری، موشن و جزئیاتی که مشتری را متقاعد می‌کند سفارش بدهد.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased">
      <body className="min-h-full bg-bg font-sans text-fg">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
