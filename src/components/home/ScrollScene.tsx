"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ScrollScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.35], [-180, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.35], [180, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], [40, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [0.2, 1]);
  const chipFallL = useTransform(scrollYProgress, [0.55, 1], [0, 220]);
  const chipFallR = useTransform(scrollYProgress, [0.55, 1], [0, 260]);
  const chipRotateL = useTransform(scrollYProgress, [0.55, 1], [0, 18]);
  const chipRotateR = useTransform(scrollYProgress, [0.55, 1], [0, -16]);
  const fadeOut = useTransform(scrollYProgress, [0.75, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-[220vh] bg-bg">
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden px-5">
        <p className="absolute top-20 left-1/2 -translate-x-1/2 text-sm text-muted">
          ( Keep scrolling )
        </p>

        <motion.div style={{ opacity: fadeOut }} className="relative text-center">
          <motion.span
            style={{ x: leftX, y: chipFallL, rotate: chipRotateL }}
            className="absolute top-1/2 -left-2 -translate-y-1/2 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-lime md:-left-32"
          >
            طراحی
          </motion.span>
          <motion.span
            style={{ x: rightX, y: chipFallR, rotate: chipRotateR }}
            className="absolute top-1/2 -right-2 -translate-y-1/2 rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-lime md:-right-32"
          >
            تجربه
          </motion.span>

          <motion.h2
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-5xl font-extrabold tracking-tight text-fg md:text-8xl lg:text-9xl"
          >
            بیا بسازیم
          </motion.h2>
          <motion.p
            style={{ opacity: titleOpacity }}
            className="mx-auto mt-6 max-w-xl text-base leading-8 text-muted"
          >
            اسکرول قفل می‌شود؛ تکه‌ها از چپ و راست می‌آیند، بعد خرد می‌شوند و
            می‌ریزند پایین — مثل Navbar، با زبان خودمان.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
