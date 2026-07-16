import type { InteractionMeta } from "@/lab/types";

export const meta001: InteractionMeta = {
  id: "Interaction001",
  name: "Magnetic Text",
  nameFa: "متن مغناطیسی",
  purpose:
    "Characters gently attract toward the pointer within a soft radius — cursor feedback without a custom cursor.",
  category: "Typography",
  tags: ["Cursor", "Typography", "Motion"],
  accessibility: {
    status: "pass",
    notes:
      "Static under prefers-reduced-motion. Full string exposed via aria-label; glyphs aria-hidden.",
  },
  performance: {
    score: "A",
    notes: "Transform-only per glyph. Pointer events scoped to container.",
  },
  compatibility: "Modern evergreen browsers with Pointer Events.",
  codeStatus: "stable",
  whenToUse: [
    "Hero wordmarks",
    "Editorial titles needing quiet life",
    "Lab / portfolio moments",
  ],
  whenNotToUse: [
    "Long body paragraphs",
    "Dense UI chrome",
    "Touch-primary critical flows",
  ],
  limitations: [
    "Per-character DOM cost grows with string length",
    "Not ideal above ~40 glyphs",
  ],
  future: ["GPU-friendly canvas mode for long strings", "Magnetic strength curves"],
};
