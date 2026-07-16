export type ExhibitionReveal = "fade" | "rise" | "mask" | "settle";

export type ExhibitionProject = {
  id: string;
  number: string;
  slug: string;
  name: string;
  industry: string;
  statement: string;
  reveal: ExhibitionReveal;
  visual: {
    ground: string;
    accent: string;
    ink: string;
    motif: "noir" | "plan" | "crop" | "columns" | "mist" | "grain";
  };
};
