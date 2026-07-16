import type { InteractionMeta } from "@/lab/types";

export const meta003: InteractionMeta = {
  id: "Interaction003",
  name: "Text Mask Reveal",
  nameFa: "آشکارسازی ماسک متن",
  purpose: "Editorial wipe reveal using clip-path — text appears through a geometric mask.",
  category: "Mask",
  tags: ["Reveal", "Typography", "Scroll"],
  accessibility: {
    status: "pass",
    notes: "Full text visible immediately under reduced motion.",
  },
  performance: {
    score: "A",
    notes: "Single clip-path animation; compositor-friendly in modern engines.",
  },
  compatibility: "Browsers with CSS clip-path support.",
  codeStatus: "stable",
  whenToUse: ["Section openings", "Pull quotes"],
  whenNotToUse: ["Rapid successive paragraphs (fatigue)"],
  limitations: ["Clip-path can be heavier on very large type blocks"],
  future: ["Directional variants", "Word-level masks"],
};
