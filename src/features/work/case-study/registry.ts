import { atelierNoirCaseStudy } from "./content/atelier-noir";
import type { CaseStudyContent } from "./types";

const studies: Record<string, CaseStudyContent> = {
  "atelier-noir": atelierNoirCaseStudy,
};

export function getCaseStudy(slug: string): CaseStudyContent | undefined {
  return studies[slug];
}

export function getCaseStudySlugs(): string[] {
  return Object.keys(studies);
}

export { atelierNoirCaseStudy };
