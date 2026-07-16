import type { InteractionMeta } from "@/lab/types";

export const meta008: InteractionMeta = {
  id: "Interaction008",
  name: "Horizontal Gallery",
  nameFa: "گالری افقی",
  purpose: "Snap-scrolling horizontal strip — native overflow, no hijacked wheel.",
  category: "Navigation",
  tags: ["Scroll", "Image", "Navigation"],
  accessibility: {
    status: "pass",
    notes: "Focusable scroller with visible focus ring. Labels on each figure.",
  },
  performance: {
    score: "A",
    notes: "Native scrolling. No JS animation loop.",
  },
  compatibility: "All modern browsers with scroll-snap.",
  codeStatus: "stable",
  whenToUse: ["Process strips", "Mood boards", "Archive peeks"],
  whenNotToUse: ["Primary content that must not be missed"],
  limitations: ["Does not remap vertical wheel to horizontal by default"],
  future: ["Optional drag", "Progress indicator"],
};
