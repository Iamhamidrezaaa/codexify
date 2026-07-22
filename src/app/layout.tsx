import type { Metadata } from "next";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codexify | طراحی و توسعه وب",
  description:
    "استودیوی طراحی وبسایت‌های سریع و درآمدزا برای کسب‌وکارها.",
  icons: {
    icon: [
      { url: "/codexify-favicon.ico", sizes: "any" },
      { url: "/codexify-favicon.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: "/codexify-favicon.ico",
    apple: [
      {
        url: "/codexify-apple-touch.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
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
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
