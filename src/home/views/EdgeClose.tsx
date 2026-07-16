"use client";

import Link from "next/link";

export function EdgeClose() {
  const year = new Date().getFullYear();

  return (
    <section
      className="relative min-h-[100svh] bg-[#F7F6F2]"
      aria-labelledby="home-close"
    >
      <div className="flex min-h-[100svh] flex-col px-[var(--margin-mobile)] md:px-[var(--margin-desktop)]">
        <div className="flex flex-1 items-center justify-center">
          <h2
            id="home-close"
            className="max-w-[14em] text-center font-semibold text-[#0A0A0A]"
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 4.75rem)",
              lineHeight: 1.15,
              textWrap: "balance",
            }}
          >
            ادامه، در آثار است.
          </h2>
        </div>

        <footer className="grid gap-8 border-t border-[#0A0A0A]/10 py-10 md:grid-cols-[1fr_auto] md:items-end">
          <nav
            className="flex flex-wrap gap-x-8 gap-y-3"
            aria-label="پیوندهای پایانی"
          >
            <Link
              href="/work"
              className="text-[0.75rem] tracking-[0.04em] text-[#0A0A0A]/55 transition-opacity hover:opacity-100"
            >
              آثار
            </Link>
            <Link
              href="/process"
              className="text-[0.75rem] tracking-[0.04em] text-[#0A0A0A]/55 transition-opacity hover:opacity-100"
            >
              فرآیند
            </Link>
            <Link
              href="/studio"
              className="text-[0.75rem] tracking-[0.04em] text-[#0A0A0A]/55 transition-opacity hover:opacity-100"
            >
              استودیو
            </Link>
            <Link
              href="mailto:hello@codexify.studio"
              className="font-latin text-[0.75rem] tracking-[0.06em] text-[#0A0A0A]/55 transition-opacity hover:opacity-100"
            >
              hello@codexify.studio
            </Link>
          </nav>
          <p className="text-[0.68rem] text-[#0A0A0A]/35 md:text-end">
            © {year} کدکسیفای
          </p>
        </footer>
      </div>
    </section>
  );
}
