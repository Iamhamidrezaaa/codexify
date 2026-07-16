import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/sections/Hero";
import { MarqueeBand } from "@/sections/MarqueeBand";
import { Philosophy } from "@/sections/Philosophy";
import { Services } from "@/sections/Services";

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
