import type { InteractionMeta } from "@/lab/types";

export const meta010: InteractionMeta = {
  id: "Interaction010",
  name: "Organic Button Hover",
  nameFa: "هاور ارگانیک دکمه",
  purpose:
    "Button fill rises with scaleY while radius softens — organic, not bounce.",
  category: "Hover",
  tags: ["Hover", "Motion", "Navigation"],
  accessibility: {
    status: "pass",
    notes: "Focus-visible mirrors hover fill. Reduced motion uses simple color swap.",
  },
  performance: {
    score: "A",
    notes: "Transform + radius only.",
  },
  compatibility: "All modern browsers.",
  codeStatus: "stable",
  whenToUse: ["Primary studio CTAs", "Lab actions"],
  whenNotToUse: ["Dense toolbars with many buttons"],
  limitations: ["Radius change can feel odd if overused"],
  future: ["Size variants", "Accent fill mode"],
};
