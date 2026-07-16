import type { ExhibitionProject } from "./types";

/**
 * Exhibition order is fixed — Sprint 1 portfolio strategy.
 * Statements are editorial, one line. No marketing.
 */
export const exhibitionProjects: ExhibitionProject[] = [
  {
    id: "atelier-noir",
    number: "۰۱",
    slug: "atelier-noir",
    name: "Atelier Noir",
    industry: "ساعت لوکس",
    statement: "سالن دیجیتالی برای ساعت‌هایی که فریاد نمی‌زنند.",
    reveal: "fade",
    visual: {
      ground: "#0B0B0C",
      accent: "#8A9199",
      ink: "#EDEAE4",
      motif: "noir",
    },
  },
  {
    id: "sora-residence",
    number: "۰۲",
    slug: "sora-residence",
    name: "Sora Residence",
    industry: "استودیوی معماری",
    statement: "وب‌سایتی که مثل نقشهٔ معماری رفتار می‌کند — شفاف، آرام، دقیق.",
    reveal: "rise",
    visual: {
      ground: "#F3F0EA",
      accent: "#9C6B4A",
      ink: "#1A1A1A",
      motif: "plan",
    },
  },
  {
    id: "velora",
    number: "۰۳",
    slug: "velora",
    name: "Velora",
    industry: "فشن پرمیوم",
    statement: "فشن آنلاین با ریتم یک ادیتوریال — نه یک فید.",
    reveal: "mask",
    visual: {
      ground: "#F7F4EF",
      accent: "#8B1E1E",
      ink: "#121212",
      motif: "crop",
    },
  },
  {
    id: "nexa-capital",
    number: "۰۴",
    slug: "nexa-capital",
    name: "Nexa Capital",
    industry: "سرمایه‌گذاری",
    statement: "وضوح به‌مثابه اعتماد — بدون نمایش آینده‌گرایی.",
    reveal: "settle",
    visual: {
      ground: "#F5F6F7",
      accent: "#1F4D3A",
      ink: "#0E1520",
      motif: "columns",
    },
  },
  {
    id: "auren-clinic",
    number: "۰۵",
    slug: "auren-clinic",
    name: "Auren Clinic",
    industry: "کلینیک زیبایی",
    statement: "مراقبت، نه نمایش — فضایی که نبض را پایین می‌آورد.",
    reveal: "fade",
    visual: {
      ground: "#F6F3F0",
      accent: "#C4A49A",
      ink: "#2A2725",
      motif: "mist",
    },
  },
  {
    id: "forma-studio",
    number: "۰۶",
    slug: "forma-studio",
    name: "Forma Studio",
    industry: "طراحی داخلی",
    statement: "فضا از خلال متریال، تناسب و توالی — نه لوازم سبک زندگی.",
    reveal: "rise",
    visual: {
      ground: "#EFE8DF",
      accent: "#6B6548",
      ink: "#241F1C",
      motif: "grain",
    },
  },
];
