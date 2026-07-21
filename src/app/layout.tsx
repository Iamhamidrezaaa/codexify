import type { Metadata } from "next";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codexify | طراحی و توسعه وب",
  description:
    "استودیوی طراحی وبسایت‌های سریع و درآمدزا برای کسب‌وکارها.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased">
      <body className="min-h-full bg-bg font-sans text-fg">
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
