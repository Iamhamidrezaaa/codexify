"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Grid } from "@/components/layout/Grid";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { discoverySettle, indexCrossfade } from "@/design/motion";
import { cn } from "@/design/utilities/cn";
import { useActiveIndex } from "@/lib/useActiveIndex";

const SERVICES = [
  {
    index: "۰۱",
    title: "طراحی وب‌سایت",
    description: "چیدمان ادیتوریال، ترکیب اختصاصی، زیبایی ماندگار.",
  },
  {
    index: "۰۲",
    title: "توسعه وب",
    description: "مهندسی با اولویت عملکرد و دقت در جزئیات.",
  },
  {
    index: "۰۳",
    title: "رابط و تجربه کاربری",
    description: "رابط‌هایی روشن، مبتنی بر رفتار واقعی کاربر.",
  },
  {
    index: "۰۴",
    title: "برندینگ",
    description: "سامانهٔ هویت که در صفحه هم خوانا بماند.",
  },
  {
    index: "۰۵",
    title: "طراحی موشن",
    description: "حرکت آرام که معنا می‌افزاید — نه حواس‌پرتی.",
  },
  {
    index: "۰۶",
    title: "تجربه‌های تعاملی",
    description: "تعامل‌هایی که کنجکاوی را پاداش می‌دهند، نه هیجان کاذب.",
  },
] as const;

/**
 * Services identity: interactive · curiosity · discovery
 *
 * ONE memorable interaction: sticky gallery index —
 * a large numeral morphs as each service enters the optical center.
 */
export function Services() {
  const prefersReducedMotion = useReducedMotion();
  const { activeIndex, setItemRef } = useActiveIndex(
    SERVICES.length,
    !prefersReducedMotion,
  );
  const active = SERVICES[activeIndex] ?? SERVICES[0];

  return (
    <section className="py-section-compact" aria-labelledby="services-heading">
      <Grid className="mb-[var(--space-9)] items-end gap-y-[var(--space-6)]">
        <div className="col-span-4 md:col-span-5 lg:col-span-5">
          <Reveal variants={discoverySettle}>
            <SectionLabel index="۰۳" label="خدمات" />
          </Reveal>
          <Reveal variants={discoverySettle} delay={0.08} className="mt-[var(--space-7)]">
            <h2 id="services-heading" className="type-heading text-ink">
              چه می‌کنیم
            </h2>
          </Reveal>
        </div>

        <div className="col-span-4 md:col-span-3 md:col-start-6 lg:col-span-3 lg:col-start-10 lg:pb-[0.35em]">
          <Reveal variants={discoverySettle} delay={0.12}>
            <LinkArrow href="mailto:hello@codexify.studio">
              گفتگو درباره پروژه
            </LinkArrow>
          </Reveal>
        </div>
      </Grid>

      <div className="relative">
        {/* Memorable sticky index — desktop gallery watermark */}
        <div
          className="pointer-events-none absolute inset-y-0 end-0 z-0 hidden w-[min(28vw,18rem)] items-center justify-center lg:flex"
          aria-hidden
        >
          <div className="sticky top-[42vh] select-none">
            {prefersReducedMotion ? (
              <span className="block text-[clamp(5rem,12vw,9rem)] font-bold leading-none text-ink/[0.06]">
                {active.index}
              </span>
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={active.index}
                  variants={indexCrossfade}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="block text-[clamp(5rem,12vw,9rem)] font-bold leading-none text-ink/[0.07]"
                >
                  {active.index}
                </motion.span>
              </AnimatePresence>
            )}
          </div>
        </div>

        <Grid as="ul" className="relative z-10 border-t border-border">
          {SERVICES.map((service, i) => {
            const isActive = prefersReducedMotion || i === activeIndex;

            return (
              <li
                key={service.index}
                ref={setItemRef(i)}
                className={cn(
                  "group col-span-4 grid grid-cols-4 gap-x-[var(--gutter-mobile)] border-b border-border py-[var(--space-7)] transition-[opacity,color] duration-base ease-out md:col-span-8 md:grid-cols-8 md:gap-x-[var(--gutter-tablet)] md:py-[var(--space-8)] lg:col-span-12 lg:grid-cols-12 lg:gap-x-[var(--gutter-desktop)]",
                  isActive ? "opacity-100" : "opacity-40",
                )}
              >
                <span
                  className={cn(
                    "type-number col-span-1 pt-[0.35em] transition-colors duration-base ease-out",
                    isActive ? "text-accent" : "text-subtle",
                  )}
                >
                  {service.index}
                </span>
                <h3
                  className={cn(
                    "type-title col-span-3 transition-colors duration-base ease-out md:col-span-3 lg:col-span-4",
                    isActive ? "text-ink" : "text-muted",
                  )}
                >
                  {service.title}
                </h3>
                <p
                  className={cn(
                    "type-body col-span-4 mt-[var(--space-4)] max-w-[var(--measure)] transition-opacity duration-base ease-out md:col-span-4 md:col-start-5 md:mt-0 lg:col-span-5 lg:col-start-6",
                    isActive ? "text-muted opacity-100" : "text-muted opacity-70",
                  )}
                >
                  {service.description}
                </p>
              </li>
            );
          })}
        </Grid>
      </div>
    </section>
  );
}
