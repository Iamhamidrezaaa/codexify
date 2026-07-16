import type { Transition, Variants } from "framer-motion";
import { duration, easing, stagger } from "@/design/tokens/motion";

export const EASE_OUT = easing.out;
export const EASE_IN_OUT = easing.inOut;
export const DURATION = duration;
export const STAGGER = stagger;

export const transition: Transition = {
  duration: duration.base,
  ease: easing.out,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.reveal, ease: easing.out },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: easing.out },
  },
};

/** Alias kept for existing FadeIn usage — identical to fadeUp */
export const fadeInUp = fadeUp;

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: easing.out },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.base,
      delayChildren: 0.08,
    },
  },
};

export const staggerTight: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.tight,
      delayChildren: 0.04,
    },
  },
};

export const textReveal: Variants = {
  hidden: { opacity: 0, y: "110%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: easing.out },
  },
};

export const maskReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: duration.slower, ease: easing.out },
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slower, ease: easing.out },
  },
};

/** Line grows from inline-start (right in RTL) */
export const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 1 },
  visible: {
    scaleX: 1,
    transition: { duration: duration.slow, ease: easing.out },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.out },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: duration.base, ease: easing.inOut },
  },
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: duration.fast, ease: easing.out },
  },
};

export const hoverLift = {
  rest: { y: 0 },
  hover: {
    y: -2,
    transition: { duration: duration.fast, ease: easing.out },
  },
};
