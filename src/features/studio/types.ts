export type ManifestoChapterId =
  | "opening"
  | "why"
  | "principles"
  | "work"
  | "beliefs"
  | "closing";

export type ManifestoPrinciple = {
  id: string;
  index: string;
  statement: string;
  body: string;
  /** Quiet counterweight — what we set aside, not a slogan antithesis */
  aside?: string;
};

export type ManifestoBelief = {
  id: string;
  text: string;
};

export type ManifestoContent = {
  meta: {
    title: string;
    overline: string;
  };
  opening: {
    statement: string;
  };
  why: {
    title: string;
    index: string;
    paragraphs: string[];
    note?: string;
  };
  principles: {
    title: string;
    index: string;
    intro: string;
    items: ManifestoPrinciple[];
  };
  work: {
    title: string;
    index: string;
    paragraphs: string[];
    note?: string;
  };
  beliefs: {
    title: string;
    index: string;
    items: ManifestoBelief[];
  };
  closing: {
    thought: string;
  };
};
