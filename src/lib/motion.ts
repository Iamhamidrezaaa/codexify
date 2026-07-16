import type { Transition, Variants } from "framer-motion";

/**
 * Motion language — calm, confident, invisible.
 * All timings align with CSS custom properties in globals.css.
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  instant: 0.1,
  fast: 0.28,
  base: 0.48,
  slow: 0.8,
  slower: 1.2,
  reveal: 1.4,
} as const;

export const STAGGER = {
  tight: 0.05,
  base: 0.08,
  loose: 0.12,
} as const;

export const transition: Transition = {
  duration: DURATION.base,
  ease: EASE_OUT,
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.reveal,
      ease: EASE_OUT,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.base,
      delayChildren: 0.08,
    },
  },
};

export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: "110%",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.reveal,
      ease: EASE_OUT,
    },
  },
};

/** Line grows from inline-start (right in RTL) */
export const lineReveal: Variants = {
  hidden: {
    scaleX: 0,
    originX: 1,
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASE_OUT,
    },
  },
};
