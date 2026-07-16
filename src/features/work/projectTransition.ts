import type { Variants } from "framer-motion";
import { duration, easing } from "@/design/tokens/motion";
import type { ExhibitionReveal } from "./types";

/** ProjectTransition — unique entrance per project, not one shared fade. */
export const exhibitionReveals: Record<ExhibitionReveal, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: duration.slower, ease: easing.out },
    },
  },
  rise: {
    hidden: { opacity: 0, y: 48 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.reveal, ease: easing.out },
    },
  },
  mask: {
    hidden: { opacity: 0, clipPath: "inset(12% 0 12% 0)" },
    visible: {
      opacity: 1,
      clipPath: "inset(0% 0 0% 0)",
      transition: { duration: 1.5, ease: easing.out },
    },
  },
  settle: {
    hidden: { opacity: 0, x: 28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: duration.slow, ease: easing.out },
    },
  },
};

export function getExhibitionReveal(type: ExhibitionReveal): Variants {
  return exhibitionReveals[type];
}
