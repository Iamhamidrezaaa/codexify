import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <MarqueeBand />
        <Philosophy />
        <Services />
      </main>
      <Footer />
    </>
  );
}
