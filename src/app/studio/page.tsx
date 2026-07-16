import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StudioView } from "@/features/studio";

export const metadata: Metadata = {
  title: "استودیو",
  description:
    "بیانیهٔ کدکسیفای — آنچه باور داریم دربارهٔ طراحی، نه شرح شرکت.",
  openGraph: {
    title: "استودیو — کدکسیفای",
    description:
      "بیانیهٔ کدکسیفای — آنچه باور داریم دربارهٔ طراحی، نه شرح شرکت.",
  },
};

export default function StudioPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <StudioView />
      </main>
      <Footer />
    </>
  );
}
