/**
 * Experience language — section choreography presets.
 * Prefer unique entrances per section; avoid identical reveals.
 */
import type { Variants } from "framer-motion";
import { duration, easing } from "@/design/tokens/motion";

/** Hero — calm presence, almost still */
export const heroPresence: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.slower, ease: easing.out },
  },
};

/** Philosophy / manifesto — slow editorial dissolve */
export const editorialDissolve: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.8, ease: easing.out },
  },
};

/** Process chapters — staged lateral settle (distinct from manifesto) */
export const processSettle: Variants = {
  hidden: { opacity: 0, x: 12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.out },
  },
};

/** Case study chapters — quiet vertical arrival */
export const chapterArrive: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: easing.out },
  },
};

/** Services row — soft lateral settle (RTL: from start) */
export const discoverySettle: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.out },
  },
};

/** Footer — quiet arrival */
export const quietArrive: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: easing.out },
  },
};

/** Sticky index digit crossfade */
export const indexCrossfade: Variants = {
  enter: {
    opacity: 0,
    y: 12,
    filter: "blur(4px)",
  },
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.base, ease: easing.out },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(4px)",
    transition: { duration: duration.fast, ease: easing.inOut },
  },
};
