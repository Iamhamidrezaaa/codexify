import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import {
  ExhibitionIntro,
  ExhibitionLayout,
} from "@/features/work";

export const metadata: Metadata = {
  title: "آثار",
  description:
    "نمایشگاه آثار کدکسیفای — هر پروژه پاسخ متفاوتی به یک مسئلهٔ متفاوت است.",
  openGraph: {
    title: "آثار — کدکسیفای",
    description:
      "نمایشگاه آثار کدکسیفای — هر پروژه پاسخ متفاوتی به یک مسئلهٔ متفاوت است.",
  },
};

export default function WorkPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <ExhibitionLayout intro={<ExhibitionIntro />} />
      </main>
      <Footer />
    </>
  );
}
