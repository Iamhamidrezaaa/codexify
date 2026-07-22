import { Header } from "@/components/Header";
import { ScrollHint } from "@/components/ScrollHint";
import { ScrollToTop } from "@/components/ScrollToTop";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { ScrollScene } from "@/components/home/ScrollScene";
import { ServicesReveal } from "@/components/home/ServicesReveal";
import { Work } from "@/components/home/Work";

export default function HomePage() {
  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "";

  return (
    <main>
      <Header />
      <ScrollHint />
      <ScrollToTop />
      <Hero />
      <ScrollScene />
      <ServicesReveal />
      <Work />
      <About />
      {/* موبایل: یک قاب کامل روی About می‌آید تا مرحلهٔ ۰۴ نماند */}
      <div className="relative z-30 bg-bg max-md:flex max-md:min-h-dvh max-md:flex-col">
        <Contact turnstileSiteKey={turnstileSiteKey} />
        <footer className="shrink-0 border-t border-line px-5 py-3 text-center text-xs text-muted md:px-16 md:py-8 md:text-sm">
          © کدکسیفای {new Date().getFullYear()}. تمامی حقوق محفوظ است.
        </footer>
      </div>
    </main>
  );
}
