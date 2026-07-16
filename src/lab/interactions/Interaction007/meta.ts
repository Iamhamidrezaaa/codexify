import type { InteractionMeta } from "@/lab/types";

export const meta007: InteractionMeta = {
  id: "Interaction007",
  name: "Sticky Story Section",
  nameFa: "بخش داستان چسبان",
  purpose:
    "Sticky editorial spine beside scrolling chapters — magazine reading, not cards.",
  category: "Scroll",
  tags: ["Scroll", "Navigation", "Typography"],
  accessibility: {
    status: "pass",
    notes: "Semantic articles. Sticky disabled under reduced motion preference (CSS sticky still ok; we keep sticky for layout).",
  },
  performance: {
    score: "A",
    notes: "Pure CSS sticky. No JS scroll listeners.",
  },
  compatibility: "Browsers with position:sticky.",
  codeStatus: "stable",
  whenToUse: ["Manifesto", "Process narratives", "Longform chapters"],
  whenNotToUse: ["Short single-block pages"],
  limitations: ["Needs enough chapter height to feel sticky"],
  future: ["Active chapter indicator", "Scroll-linked opacity"],
};
