"use client";

import { useReducedMotion } from "framer-motion";
import { ArchivalFolio } from "@/sections/hero/ArchivalFolio";

const STATEMENT = "تجربه‌هایی که انگار همیشه همین‌طور بوده‌اند.";
const SUPPORT =
  "طراحی دیجیتال با وزن یک مونوگراف — ماده، تناسب، سکوتِ عمدی.";

/**
 * Home Hero v2 — Phase 3
 * Composition: Object + Empty Space (Atlas P04) — committed, not Split Mass
 * Object: Archival Folio (Paper) — mass on the physical left
 * Type: secondary, nested in shaped silence at RTL start (physical right)
 * No CTA. Poster-complete without motion.
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden"
      style={{ backgroundColor: "#DCD7CE" }}
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, rgba(255,252,247,0.35) 0%, transparent 42%, rgba(42,39,37,0.045) 100%)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-[6%] top-[13%] h-px bg-[#2A2725]/[0.1] md:inset-x-[5%]"
        aria-hidden
      />

      {/*
        Dominant Object — gravity. Physical left mass.
        Right field stays empty for silence + secondary type (P04, not P05).
      */}
      <div
        className="pointer-events-none absolute inset-[11%_8%_44%_6%] sm:inset-[10%_10%_42%_7%] md:inset-[9%_46%_14%_6%] lg:inset-[8%_48%_12%_6%]"
        aria-hidden
      >
        <ArchivalFolio className="h-full w-full" />
      </div>

      {/* Silence pedestal — type only, RTL start / physical right */}
      <div className="absolute inset-x-[var(--margin-mobile)] bottom-0 z-[1] pb-[clamp(3.25rem,9vh,6rem)] pt-[2rem] md:inset-x-auto md:start-[var(--margin-desktop)] md:bottom-[clamp(3.5rem,9vh,6rem)] md:w-[min(26rem,40%)] md:pb-0 md:pt-0 lg:w-[min(28rem,38%)]">
        <p
          className="type-overline mb-[var(--space-7)] tracking-[0.14em] text-[#2A2725]/[0.42]"
          style={{
            transition: prefersReducedMotion ? undefined : "opacity 1.2s ease",
          }}
        >
          کدکسیفای
        </p>

        <h1
          id="hero-heading"
          className="type-statement max-w-[13em] text-[#2A2725]"
        >
          {STATEMENT}
        </h1>

        <p className="type-essay mt-[var(--space-6)] max-w-[22em] text-[#2A2725]/[0.52]">
          {SUPPORT}
        </p>

        <p className="type-caption mt-[var(--space-8)] tracking-[0.06em] text-[#2A2725]/[0.36]">
          ورق آرشیوی · کاغذ
        </p>
      </div>
    </section>
  );
}
