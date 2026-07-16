export type ProcessStageId =
  | "understand"
  | "discover"
  | "design"
  | "build"
  | "refine"
  | "launch";

export type EditorialDiagramMotif =
  | "grid"
  | "wireframe"
  | "paper"
  | "typography"
  | "material"
  | "annotation";

export type ProcessStage = {
  id: ProcessStageId;
  index: string;
  title: string;
  /** Quiet keywords — not a checklist UI */
  focuses: string[];
  body: string[];
  note?: string;
  quote?: string;
  diagram?: {
    motif: EditorialDiagramMotif;
    figure: string;
    caption: string;
  };
};

export type ProcessPrinciple = {
  id: string;
  label: string;
  statement: string;
  body?: string;
};

export type ProcessContent = {
  meta: {
    title: string;
    statement: string;
    overline: string;
  };
  intro: string[];
  stages: ProcessStage[];
  principles: ProcessPrinciple[];
  closing: {
    title: string;
    body: string[];
  };
};
