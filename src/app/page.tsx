import { Header } from "@/components/Header";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Insights } from "@/components/home/Insights";
import { Pricing } from "@/components/home/Pricing";
import { ScrollScene } from "@/components/home/ScrollScene";
import { ServicesReveal } from "@/components/home/ServicesReveal";
import { Work } from "@/components/home/Work";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <ScrollScene />
      <ServicesReveal />
      <Work />
      <About />
      <Pricing />
      <Insights />
      <Contact />
      <footer className="border-t border-line px-5 py-8 text-center text-sm text-muted md:px-16">
        © {new Date().getFullYear()} Codexify — طراحی وبسایت
      </footer>
    </main>
  );
}
