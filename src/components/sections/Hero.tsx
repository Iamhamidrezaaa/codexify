"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { TextReveal } from "@/components/ui/TextReveal";
import { lineReveal } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, prefersReducedMotion ? 0 : 64],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.35]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] pb-section pt-[7.5rem] md:pt-[9rem]"
      aria-labelledby="hero-heading"
    >
      <motion.div style={{ y, opacity }}>
        <Grid className="min-h-[68svh] items-end">
          {/* Index column — inline-start in RTL */}
          <div className="col-span-1 hidden lg:block">
            <span className="type-number">۰۱</span>
            <div
              className="mt-[var(--space-4)] h-24 w-px bg-border"
              aria-hidden
            />
          </div>

          <div className="col-span-4 md:col-span-7 lg:col-span-7">
            <p className="type-overline mb-[var(--space-6)]">
              استودیوی طراحی دیجیتال
            </p>

            <TextReveal
              as="h1"
              id="hero-heading"
              text="تجربه‌هایی می‌سازیم که انگار همیشه همین‌طور بوده‌اند."
              className="type-display text-ink"
            />
          </div>

          <div className="col-span-4 mt-[var(--space-8)] md:col-span-5 md:col-start-3 md:mt-[var(--space-9)] lg:col-span-3 lg:col-start-10 lg:mt-0">
            <motion.div
              variants={lineReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-[var(--space-6)] h-px w-14 bg-accent"
              aria-hidden
            />

            <p className="type-body-lg max-w-[18rem] text-muted">
              کدکسیفای برای بنیان‌گذاران، استارتاپ‌ها و برندهایی است که حاضر
              نیستند در وب معمولی به‌نظر برسند.
            </p>

            <div className="mt-[var(--space-8)]">
              <LinkArrow href="/contact">شروع پروژه</LinkArrow>
            </div>
          </div>
        </Grid>
      </motion.div>
    </section>
  );
}
