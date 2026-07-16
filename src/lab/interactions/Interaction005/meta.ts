import type { InteractionMeta } from "@/lab/types";

export const meta005: InteractionMeta = {
  id: "Interaction005",
  name: "Progressive Underline",
  nameFa: "زیرخط پیش‌رونده",
  purpose: "Link underline grows from inline-start via scaleX — calm, RTL-native.",
  category: "Hover",
  tags: ["Navigation", "Hover", "Typography"],
  accessibility: {
    status: "pass",
    notes: "Focus-visible expands underline identically to hover.",
  },
  performance: {
    score: "A",
    notes: "Single transform. No layout thrash.",
  },
  compatibility: "All modern browsers.",
  codeStatus: "stable",
  whenToUse: ["Editorial links", "CTAs without filled buttons"],
  whenNotToUse: ["Icon-only controls"],
  limitations: ["Requires enough contrast for the hairline"],
  future: ["Thickness tokens", "Accent variant"],
};
