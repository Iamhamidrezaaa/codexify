import { atelierNoirCaseStudy } from "./content/atelier-noir";
import { soraResidenceCaseStudy } from "./content/sora-residence";
import { aurenClinicCaseStudy } from "./content/auren-clinic";
import type { CaseStudyContent } from "./types";

const studies: Record<string, CaseStudyContent> = {
  "atelier-noir": atelierNoirCaseStudy,
  "sora-residence": soraResidenceCaseStudy,
  "auren-clinic": aurenClinicCaseStudy,
};

export function getCaseStudy(slug: string): CaseStudyContent | undefined {
  return studies[slug];
}

export function getCaseStudySlugs(): string[] {
  return Object.keys(studies);
}

export {
  atelierNoirCaseStudy,
  soraResidenceCaseStudy,
  aurenClinicCaseStudy,
};
