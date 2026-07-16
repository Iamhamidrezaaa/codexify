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
  motif:
    | "hero-stage"
    | "archive"
    | "detail"
    | "inquiry"
    | "corridor"
    | "monograph"
    | "section-cut"
    | "threshold";
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

/** Hero chrome: dark inverts the site header; light keeps ink on paper. */
export type PublicationAtmosphere = "light" | "dark";

/**
 * Per-study editorial dials — same engine, different rhythm.
 * Omit freely; defaults preserve Atelier-era assembly.
 */
export type PublicationEditorial = {
  /** Challenge margin annotation (xl+); omit to hide */
  marginNote?: string;
  reflectionTone?: "default" | "inverse";
  /** Which theme field paints inverse reflection */
  reflectionField?: "ground" | "surface";
  screensTitle?: string;
  proseMeasure?: "narrow" | "default" | "wide";
  /** `open` inserts longer visual pauses between chapters */
  breath?: "compact" | "open";
};

export type PublicationFigure = {
  motif: string;
  caption: string;
  figure: string;
  /** Override study-dominant family for this plate */
  family?: ImageFamily;
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
    atmosphere: PublicationAtmosphere;
    chapters: PublicationChapter[];
    editorial?: PublicationEditorial;
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
    afterHero: PublicationFigure;
    afterDirection: PublicationFigure;
    closing: PublicationFigure;
  };
  next?: { slug: string; name: string };
  prev?: { slug: string; name: string };
};
