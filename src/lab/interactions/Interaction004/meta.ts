import type { InteractionMeta } from "@/lab/types";

export const meta004: InteractionMeta = {
  id: "Interaction004",
  name: "Editorial Image Reveal",
  nameFa: "آشکارسازی تصویر ادیتوریال",
  purpose:
    "Reveal a geometric media panel with clip-path + subtle scale — no stock imagery.",
  category: "Image",
  tags: ["Reveal", "Mask", "Image"],
  accessibility: {
    status: "pass",
    notes: "role=img with label. Instant show under reduced motion.",
  },
  performance: {
    score: "A",
    notes: "No bitmap decode; solid fill panel.",
  },
  compatibility: "Modern browsers with clip-path.",
  codeStatus: "stable",
  whenToUse: ["Case study covers", "Chapter breaks"],
  whenNotToUse: ["Tiny thumbnails", "Critical LCP hero without testing"],
  limitations: ["Demo uses geometry; swap fill for next/image in production"],
  future: ["Wire to Next Image", "Directional wipe presets"],
};
