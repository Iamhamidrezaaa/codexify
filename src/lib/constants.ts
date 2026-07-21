export const SITE = {
  name: "Codexify",
  nameFa: "کدکسیفای",
} as const;

export const WHATSAPP_E164 = "989101962026";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}`;
export const WHATSAPP_DISPLAY = "۰۹۱۰۱۹۶۲۰۲۶";

export const NAV_LINKS = [
  { href: "#services", label: "خدمات" },
  { href: "#work", label: "نمونه‌کارها" },
  { href: "#about", label: "مسیر اجرا" },
  { href: "#contact", label: "ارتباط با ما" },
] as const;

export const SERVICES = [
  {
    num: "01",
    title: "طراحی وبسایت",
    desc: "لندینگ و سایت شرکتی — تمیز، سریع، با مسیر مشخص تا تماس یا خرید",
    slug: "web-design",
    href: "/services/web-design",
    card: "lime" as const,
  },
  {
    num: "02",
    title: "فروشگاه آنلاین",
    desc: "صفحه محصول قوی، سبد خرید روان، تسویه بدون دردسر",
    slug: "ecommerce",
    href: "/services/ecommerce",
    card: "blue" as const,
  },
  {
    num: "03",
    title: "UI / UX",
    desc: "ساختار و جریان کاربر را قبل از ساخت مشخص می‌کنیم",
    slug: "ui-ux",
    href: "/services/ui-ux",
    card: "cyan" as const,
  },
  {
    num: "04",
    title: "ریدیزاین",
    desc: "سایت فعلی را سریع‌تر، واضح‌تر و قابل‌فروش‌تر می‌کنیم",
    slug: "redesign",
    href: "/services/redesign",
    card: "violet" as const,
  },
] as const;

export type ServiceItem = (typeof SERVICES)[number];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export const PROJECTS = [
  {
    name: "Hamidrezaaa",
    url: "https://www.hamidrezaaa.ir",
    host: "hamidrezaaa.ir",
    tag: "پورتفolio شخصی",
    live: true,
  },
  {
    name: "Cutup",
    url: "https://cutup.shop",
    host: "cutup.shop",
    tag: "فروشگاه",
    live: true,
  },
  {
    name: "Testology",
    url: "https://testology.me",
    host: "testology.me",
    tag: "محصول / برند",
    live: true,
  },
  {
    name: "Heymers",
    url: "https://heymers.com",
    host: "heymers.com",
    tag: "وبسایت برند",
    live: true,
  },
  {
    name: "Gorillo",
    url: "https://gorillo.marketing",
    host: "gorillo.marketing",
    tag: "مارکتینگ",
    live: false,
  },
  {
    name: "Araz Design",
    url: "https://arazdesignco.com",
    host: "arazdesignco.com",
    tag: "طراحی",
    live: false,
  },
] as const;
