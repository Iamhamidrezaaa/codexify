import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Codexify — Premium Digital Design Studio",
    template: "%s — Codexify",
  },
  description:
    "Codexify is a premium digital design studio crafting exceptional websites, brands, and interactive experiences for founders, startups, and luxury brands.",
  keywords: [
    "digital design studio",
    "web design",
    "web development",
    "UI/UX",
    "branding",
    "motion design",
    "premium websites",
  ],
  authors: [{ name: "Codexify Studio" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Codexify",
    title: "Codexify — Premium Digital Design Studio",
    description:
      "We craft digital experiences that feel inevitable. Website design, development, branding, and motion for exceptional brands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codexify — Premium Digital Design Studio",
    description:
      "We craft digital experiences that feel inevitable.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#F8F7F4",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full bg-canvas font-sans text-ink antialiased">
        <SmoothScroll>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
          >
            Skip to content
          </a>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
