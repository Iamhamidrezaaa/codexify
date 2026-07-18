"use client";

import { useMotionValue, type MotionValue } from "framer-motion";
import { useEffect, type RefObject } from "react";
import type Lenis from "lenis";

type LenisWindow = Window & { __lenis?: Lenis };

/**
 * Section scroll progress (0→1) driven by Lenis when available,
 * so sticky scenes stay in sync with smooth scroll.
 */
export function useLenisProgress(
  ref: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const span = el.offsetHeight - window.innerHeight;
      if (span <= 0) {
        progress.set(0);
        return;
      }
      progress.set(Math.min(1, Math.max(0, -rect.top / span)));
    };

    measure();

    let detachLenis: (() => void) | undefined;
    let poll = 0;

    const attachLenis = () => {
      const lenis = (window as LenisWindow).__lenis;
      if (!lenis || detachLenis) return !!detachLenis;
      detachLenis = lenis.on("scroll", measure);
      measure();
      return true;
    };

    if (!attachLenis()) {
      poll = window.setInterval(() => {
        if (attachLenis()) window.clearInterval(poll);
      }, 50);
    }

    /* Native scroll as backup (Lenis still updates window scroll) */
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.clearInterval(poll);
      detachLenis?.();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [ref, progress]);

  return progress;
}
