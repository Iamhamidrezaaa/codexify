"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Grid } from "@/components/layout/Grid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { editorialDissolve } from "@/design/motion";

/**
 * Philosophy identity: slow · editorial · reading experience
 */
export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const quoteOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.35, 0.65, 0.85],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.35, 1, 1, 0.45],
  );

  return (
    <section
      ref={ref}
      className="py-section-expansive"
      aria-labelledby="philosophy-heading"
    >
      <Grid className="items-start">
        <div className="col-span-4 md:col-span-8 lg:col-span-2 lg:min-h-[70vh]">
          <div className="lg:sticky lg:top-[32vh]">
            <Reveal variants={editorialDissolve}>
              <SectionLabel index="۰۲" label="فلسفه" />
            </Reveal>
          </div>
        </div>

        <div className="col-span-4 mt-[var(--space-10)] md:col-span-7 md:col-start-2 lg:col-span-8 lg:col-start-4 lg:mt-0">
          <motion.div style={{ opacity: quoteOpacity }}>
            <blockquote className="max-w-[var(--measure-wide)]">
              <h2 id="philosophy-heading" className="type-heading text-ink">
                خودِ وب‌سایت
                <br />
                پورتفولیو است.
              </h2>
              <p className="type-statement mt-[var(--space-5)] text-muted">
                هر جزئیات — تایپوگرافی، حرکت، سکوت — باید پیش از بارگذاری اولین
                اثر ثابت کند که طراحی را می‌شناسیم.
              </p>
            </blockquote>
          </motion.div>

          <Reveal
            variants={editorialDissolve}
            delay={0.18}
            className="mt-[clamp(4rem,12vh,8rem)]"
          >
            <p className="type-essay max-w-[var(--measure-narrow)] text-muted">
              با برندهایی کار می‌کنیم که حضور دیجیتال را بخشی از اعتبار می‌دانند
              — نه پوشش تزئینی.
            </p>
          </Reveal>
        </div>
      </Grid>
    </section>
  );
}
