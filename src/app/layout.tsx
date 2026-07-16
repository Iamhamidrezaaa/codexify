import type { Metadata, Viewport } from "next";
import { geist, peyda } from "@/fonts";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "کدکسیفای — استودیوی طراحی دیجیتال",
    template: "%s — کدکسیفای",
  },
  description:
    "کدکسیفای استودیوی طراحی دیجیتال است؛ وب‌سایت، سامانهٔ هویت و تجربه‌های تعاملی با دقت ادیتوریال.",
  keywords: [
    "استودیوی طراحی دیجیتال",
    "طراحی وب‌سایت",
    "توسعه وب",
    "رابط کاربری",
    "برندینگ",
    "طراحی موشن",
  ],
  authors: [{ name: "Codexify Studio" }],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "کدکسیفای",
    title: "کدکسیفای — استودیوی طراحی دیجیتال",
    description:
      "تجربه‌هایی می‌سازیم که انگار همیشه همین‌طور بوده‌اند.",
  },
  twitter: {
    card: "summary_large_image",
    title: "کدکسیفای — استودیوی طراحی دیجیتال",
    description:
      "تجربه‌هایی می‌سازیم که انگار همیشه همین‌طور بوده‌اند.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F6F2",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${peyda.variable} ${geist.variable} h-full`}
    >
      <body className={`${peyda.className} min-h-full bg-canvas text-ink antialiased`}>
        <SmoothScroll>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
          >
            پرش به محتوا
          </a>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
