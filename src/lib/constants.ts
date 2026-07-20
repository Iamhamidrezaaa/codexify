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
  { href: "#about", label: "درباره" },
] as const;

export const SERVICES = [
  {
    num: "01",
    title: "طراحی وبسایت",
    desc: "لندینگ، شرکتی، پورتفolio — با هویت و موشن اختصاصی",
    slug: "web-design",
    href: "/services/web-design",
    card: "lime" as const,
  },
  {
    num: "02",
    title: "فروشگاه آنلاین",
    desc: "تجربه خرید روان، صفحه محصول قوی، مسیر تبدیل واضح",
    slug: "ecommerce",
    href: "/services/ecommerce",
    card: "blue" as const,
  },
  {
    num: "03",
    title: "UI / UX",
    desc: "ساختار، جریان کاربر، و جزئیاتی که حس حرفه‌ای می‌دهد",
    slug: "ui-ux",
    href: "/services/ui-ux",
    card: "cyan" as const,
  },
  {
    num: "04",
    title: "ریدیزاین",
    desc: "بازطراحی سایت فعلی برای سرعت، زیبایی و نتیجه بهتر",
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
