"use client";

import Link from "next/link";

/** Risk: heavy corner compression — statement pinned to one corner, rest void. */
export function EdgeClose() {
  const year = new Date().getFullYear();

  return (
    <section
      className="relative -mt-[6vh] min-h-[100svh]"
      aria-labelledby="home-close"
    >
      <div className="relative flex min-h-[100svh] flex-col px-[var(--margin-mobile)] md:px-[var(--margin-desktop)]">
        <div className="flex flex-1 items-end justify-start pb-[clamp(5rem,14vh,8rem)]">
          <h2
            id="home-close"
            className="max-w-[8em] font-black text-[#0A0A0A]"
            style={{
              fontSize: "clamp(3rem, 9vw, 7rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            ادامه،
            <br />
            در آثار
            <br />
            است.
          </h2>
        </div>

        <footer className="mt-auto grid gap-6 border-t border-[#0A0A0A]/10 py-8 md:grid-cols-[1fr_auto] md:items-end">
          <nav
            className="flex flex-wrap gap-x-7 gap-y-2"
            aria-label="پیوندهای پایانی"
          >
            <Link
              href="/work"
              className="text-[0.62rem] tracking-[0.08em] text-[#0A0A0A]/50 transition-opacity hover:opacity-100"
            >
              آثار
            </Link>
            <Link
              href="/process"
              className="text-[0.62rem] tracking-[0.08em] text-[#0A0A0A]/50 transition-opacity hover:opacity-100"
            >
              فرآیند
            </Link>
            <Link
              href="/studio"
              className="text-[0.62rem] tracking-[0.08em] text-[#0A0A0A]/50 transition-opacity hover:opacity-100"
            >
              استودیو
            </Link>
            <Link
              href="mailto:hello@codexify.studio"
              className="font-latin text-[0.62rem] tracking-[0.1em] text-[#0A0A0A]/50 transition-opacity hover:opacity-100"
            >
              hello@codexify.studio
            </Link>
          </nav>
          <p className="text-[0.58rem] text-[#0A0A0A]/32 md:text-end">
            © {year} کدکسیفای
          </p>
        </footer>
      </div>
    </section>
  );
}
