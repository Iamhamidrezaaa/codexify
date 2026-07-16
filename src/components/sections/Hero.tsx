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

  const y = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] pt-28 pb-section md:pt-36"
      aria-labelledby="hero-heading"
    >
      <motion.div style={{ y, opacity }}>
        <Grid className="min-h-[70svh] items-end">
          <div className="col-span-1 hidden lg:block">
            <span className="font-mono text-caption text-accent">01</span>
            <div className="mt-4 h-24 w-px bg-border" aria-hidden />
          </div>

          <div className="col-span-4 md:col-span-7 lg:col-span-7">
            <p className="mb-8 font-mono text-caption uppercase tracking-widest text-muted">
              Digital Design Studio
            </p>

            <TextReveal
              as="h1"
              id="hero-heading"
              text="We craft digital experiences that feel inevitable."
              className="font-serif text-display-xl leading-[0.92] tracking-tight text-ink"
            />
          </div>

          <div className="col-span-4 mt-12 md:col-span-6 md:col-start-3 md:mt-16 lg:col-span-4 lg:col-start-9 lg:mt-0">
            <motion.div
              variants={lineReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8 h-px w-16 bg-accent"
              aria-hidden
            />

            <p className="max-w-sm font-sans text-body-lg leading-relaxed text-muted">
              Codexify is a premium studio for founders, startups, and brands
              who refuse to look ordinary on the web.
            </p>

            <div className="mt-10">
              <LinkArrow href="/contact">Start a project</LinkArrow>
            </div>
          </div>
        </Grid>
      </motion.div>
    </section>
  );
}
