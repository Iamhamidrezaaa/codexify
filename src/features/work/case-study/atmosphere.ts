/**
 * Lightweight atmosphere map for chrome (Header).
 * Avoids pulling the full case-study registry into the global shell.
 */
export type CaseAtmosphere = "light" | "dark";

const atmospheres: Record<string, CaseAtmosphere> = {
  "atelier-noir": "dark",
  "sora-residence": "light",
  "auren-clinic": "light",
};

export function getCaseAtmosphere(
  slug: string | undefined,
): CaseAtmosphere | undefined {
  if (!slug) return undefined;
  return atmospheres[slug];
}
