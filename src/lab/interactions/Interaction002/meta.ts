import type { InteractionMeta } from "@/lab/types";

export const meta002: InteractionMeta = {
  id: "Interaction002",
  name: "Weight Pulse",
  nameFa: "تپش وزن تایپ",
  purpose:
    "Animate type weight on hover/focus to suggest a variable-font feel with static Peyda masters.",
  category: "Typography",
  tags: ["Hover", "Typography", "Motion"],
  accessibility: {
    status: "pass",
    notes: "Keyboard focus triggers the same weight shift. Reduced motion keeps static weight.",
  },
  performance: {
    score: "A",
    notes: "Single element. Font-weight transitions are inexpensive.",
  },
  compatibility: "All modern browsers.",
  codeStatus: "stable",
  whenToUse: ["Nav labels", "Short CTAs", "Section titles"],
  whenNotToUse: ["Large blocks of running text"],
  limitations: [
    "Peyda is not a true variable font — interpolation is browser-dependent",
  ],
  future: ["True VF face when studio licenses one", "Scroll-linked weight axes"],
};
