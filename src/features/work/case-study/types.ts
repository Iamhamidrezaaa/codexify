export type CaseStudyMeta = {
  slug: string;
  number: string;
  name: string;
  industry: string;
  year: string;
  statement: string;
};

export type CaseStudyPaletteColor = {
  name: string;
  hex: string;
  role: string;
};

export type CaseStudyScreen = {
  id: string;
  label: string;
  breakpoint: "desktop" | "tablet" | "mobile";
  caption: string;
  motif: "hero-stage" | "archive" | "detail" | "inquiry";
  figure?: string;
};

export type CaseStudyInteraction = {
  title: string;
  why: string;
};

/** Dominant visual language for ImageComposition across a study */
export type ImageFamily =
  | "material"
  | "geometry"
  | "typography"
  | "architecture"
  | "macro"
  | "texture"
  | "negative-space";

export type PublicationTheme = {
  /** Immersive hero / inverse chapter ground */
  ground: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  signal?: string;
};

export type PublicationChapter = {
  id: string;
  index: string;
  title: string;
};

/**
 * Publication Engine v2 — content contract.
 * Story fields unchanged from Sprint 3; `publication` unlocks the engine.
 */
export type CaseStudyContent = {
  meta: CaseStudyMeta;
  publication: {
    theme: PublicationTheme;
    imageFamily: ImageFamily;
    chapters: PublicationChapter[];
  };
  challenge: {
    title: string;
    body: string[];
  };
  discovery: {
    title: string;
    items: { label: string; text: string }[];
  };
  direction: {
    title: string;
    mood: string[];
    body: string[];
    quote: string;
  };
  system: {
    title: string;
    grid: string;
    spacing: string;
    components: string[];
    interaction: string[];
    colors: CaseStudyPaletteColor[];
    typeRoles: { role: string; sample: string; note: string }[];
  };
  screens: CaseStudyScreen[];
  interactions: CaseStudyInteraction[];
  reflection: {
    title: string;
    body: string[];
  };
  outcome: {
    title: string;
    items: { label: string; text: string }[];
  };
  figures?: {
    afterHero: { motif: string; caption: string; figure: string };
    afterDirection: { motif: string; caption: string; figure: string };
    closing: { motif: string; caption: string; figure: string };
  };
  next?: { slug: string; name: string };
  prev?: { slug: string; name: string };
};
