export type InteractionCategory =
  | "Typography"
  | "Cursor"
  | "Hover"
  | "Image"
  | "Scroll"
  | "Reveal"
  | "Mask"
  | "Navigation"
  | "Physics"
  | "Canvas"
  | "Motion";

export type PerformanceScore = "A" | "B" | "C";
export type AccessibilityStatus = "pass" | "partial" | "fail";
export type CodeStatus = "stable" | "experimental" | "draft";

export type InteractionMeta = {
  id: string;
  name: string;
  nameFa: string;
  purpose: string;
  category: InteractionCategory;
  tags: string[];
  accessibility: {
    status: AccessibilityStatus;
    notes: string;
  };
  performance: {
    score: PerformanceScore;
    notes: string;
  };
  compatibility: string;
  codeStatus: CodeStatus;
  whenToUse: string[];
  whenNotToUse: string[];
  limitations: string[];
  future: string[];
};
