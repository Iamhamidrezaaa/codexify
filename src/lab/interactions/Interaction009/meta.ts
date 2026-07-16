import type { InteractionMeta } from "@/lab/types";

export const meta009: InteractionMeta = {
  id: "Interaction009",
  name: "Noise Fade",
  nameFa: "محو نویز",
  purpose:
    "Cinematic grain dissolve via low-resolution canvas — avoids CSS filter cost.",
  category: "Canvas",
  tags: ["Canvas", "Reveal", "Motion"],
  accessibility: {
    status: "pass",
    notes: "Decorative canvas aria-hidden. Reduced motion skips grain entirely.",
  },
  performance: {
    score: "B",
    notes:
      "Runs a short rAF burst at low resolution. Cell size tunable. Cap DPR at 1.5.",
  },
  compatibility: "Canvas 2D.",
  codeStatus: "experimental",
  whenToUse: ["Chapter transitions", "Intro covers"],
  whenNotToUse: ["Continuous background loops", "Low-end mobile heroes"],
  limitations: ["Creates temporary canvas each paint step", "Not for infinite loops"],
  future: ["OffscreenCanvas", "Shared noise atlas"],
};
