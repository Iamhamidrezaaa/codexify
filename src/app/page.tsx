import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ClosingStatement } from "@/sections/ClosingStatement";
import { Hero } from "@/sections/Hero";
import { Philosophy } from "@/sections/Philosophy";
import { Services } from "@/sections/Services";

/**
 * Home Reconstruction v3 — Phase 7
 * Structure: Hero · Philosophy · Services · Closing · Footer
 * Benchmark page for all remaining routes.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Philosophy />
        <Services />
        <ClosingStatement />
      </main>
      <Footer variant="colophon" />
    </>
  );
}
