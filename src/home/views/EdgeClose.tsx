"use client";

import Link from "next/link";

export function EdgeClose() {
  const year = new Date().getFullYear();

  return (
    <section
      className="relative min-h-[70svh] bg-[#D8D3C9]"
      aria-labelledby="home-close"
    >
      <div className="flex min-h-[70svh] flex-col justify-between px-[var(--margin-mobile)] py-[clamp(3rem,10vh,6rem)] md:px-[var(--margin-desktop)]">
        <h2
          id="home-close"
          className="max-w-[12em] self-end text-end font-semibold text-[#1C1A18] md:self-start md:text-start"
          style={{
            fontSize: "clamp(1.85rem, 3.4vw, 3rem)",
            lineHeight: 1.2,
            textWrap: "balance",
          }}
        >
          ادامه، در آثار است.
        </h2>

        <footer className="flex flex-col gap-8 border-t border-[#1C1A18]/15 pt-8 md:flex-row md:items-end md:justify-between">
          <nav
            className="flex flex-wrap gap-x-7 gap-y-3"
            aria-label="پیوندهای پایانی"
          >
            <Link
              href="/work"
              className="type-nav text-[#1C1A18]/70 transition-opacity hover:opacity-100"
            >
              آثار
            </Link>
            <Link
              href="/process"
              className="type-nav text-[#1C1A18]/70 transition-opacity hover:opacity-100"
            >
              فرآیند
            </Link>
            <Link
              href="/studio"
              className="type-nav text-[#1C1A18]/70 transition-opacity hover:opacity-100"
            >
              استودیو
            </Link>
            <Link
              href="mailto:hello@codexify.studio"
              className="type-nav font-latin text-[#1C1A18]/70 transition-opacity hover:opacity-100"
            >
              hello@codexify.studio
            </Link>
          </nav>
          <p className="type-caption text-[#1C1A18]/40">© {year} کدکسیفای</p>
        </footer>
      </div>
    </section>
  );
}
