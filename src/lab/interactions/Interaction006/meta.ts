import type { InteractionMeta } from "@/lab/types";

export const meta006: InteractionMeta = {
  id: "Interaction006",
  name: "Smooth Number Counter",
  nameFa: "شمارنده نرم",
  purpose: "Ease-out count-up when the figure enters view — editorial stats without flash.",
  category: "Motion",
  tags: ["Typography", "Scroll", "Motion"],
  accessibility: {
    status: "pass",
    notes: "aria-label exposes final value. Reduced motion jumps to end.",
  },
  performance: {
    score: "A",
    notes: "Single rAF loop; stops at completion.",
  },
  compatibility: "All modern browsers.",
  codeStatus: "stable",
  whenToUse: ["Indexes", "Year marks", "Sparse metrics"],
  whenNotToUse: ["Dashboards with dozens of live counters"],
  limitations: ["Re-triggers only once per mount"],
  future: ["Formatters", "Replay API"],
};
