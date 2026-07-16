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
};

export type CaseStudyInteraction = {
  title: string;
  why: string;
};

export type CaseStudyContent = {
  meta: CaseStudyMeta;
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
  next?: { slug: string; name: string };
  prev?: { slug: string; name: string };
};
