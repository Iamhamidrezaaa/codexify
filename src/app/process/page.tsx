import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ProcessView } from "@/features/process";

export const metadata: Metadata = {
  title: "فرآیند",
  description:
    "روش کار کدکسیفای — از فهم مسئله تا انتشار و تداوم، در شش مرحلهٔ برابر.",
  openGraph: {
    title: "فرآیند — کدکسیفای",
    description:
      "روش کار کدکسیفای — از فهم مسئله تا انتشار و تداوم، در شش مرحلهٔ برابر.",
  },
};

export default function ProcessPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <ProcessView />
      </main>
      <Footer />
    </>
  );
}
