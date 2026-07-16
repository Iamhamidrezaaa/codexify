"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Home Hero v3 — Phase 7
 * Directive 01 · L1 Mass against Silence · L3 Monumental Type · L2 Poster · L5 Compressed Corner
 * Object not required. Type is the mass. No CTA.
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-end bg-[#DCD7CE]"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,252,247,0.28) 0%, transparent 38%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-[var(--margin-mobile)] top-[18%] h-px bg-[#2A2725]/[0.1] md:inset-x-[var(--margin-desktop)]"
        aria-hidden
      />

      <div className="relative z-[1] w-full self-start px-[var(--margin-mobile)] pb-[clamp(3.25rem,10vh,6.5rem)] pt-[7rem] md:max-w-[min(38rem,50%)] md:px-[var(--margin-desktop)]">
        <p
          className="type-overline mb-[var(--space-6)] tracking-[0.16em] text-[#2A2725]/[0.4]"
          style={{
            transition: prefersReducedMotion ? undefined : "opacity 1.4s ease",
          }}
        >
          کدکسیفای
        </p>

        <h1
          id="hero-heading"
          className="max-w-[14em] font-[family-name:var(--font-peyda)] font-semibold text-[#2A2725]"
          style={{
            fontSize: "clamp(2.35rem, 4.6vw, 4.25rem)",
            lineHeight: 1.15,
            letterSpacing: "var(--tracking-heading)",
            textWrap: "balance",
          }}
        >
          تجربه‌هایی که انگار همیشه همین‌طور بوده‌اند.
        </h1>

        <p className="type-essay mt-[var(--space-6)] max-w-[22em] text-[#2A2725]/[0.5]">
          ترکیب‌بندی با وزن یک مونوگراف — جرم، سکوت، سلسله‌مراتبِ عمدی.
        </p>
      </div>
    </section>
  );
}
