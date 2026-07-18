export const WHATSAPP_E164 = "989101962026";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_E164}`;
export const WHATSAPP_DISPLAY = "۰۹۱۰۱۹۶۲۰۲۶";

export const NAV_LINKS = [
  { href: "#services", label: "خدمات" },
  { href: "#work", label: "نمونه‌کارها" },
  { href: "#about", label: "درباره" },
  { href: "#pricing", label: "قیمت" },
  { href: "#insights", label: "اینسایت‌ها" },
  { href: "#contact", label: "تماس" },
] as const;

export const SERVICES = [
  {
    num: "01",
    title: "طراحی وبسایت",
    desc: "لندینگ، شرکتی، پورتفolio — با هویت و موشن اختصاصی",
  },
  {
    num: "02",
    title: "فروشگاه آنلاین",
    desc: "تجربه خرید روان، صفحه محصول قوی، مسیر تبدیل واضح",
  },
  {
    num: "03",
    title: "UI / UX",
    desc: "ساختار، جریان کاربر، و جزئیاتی که حس حرفه‌ای می‌دهد",
  },
  {
    num: "04",
    title: "ریدیزاین",
    desc: "بازطراحی سایت فعلی برای سرعت، زیبایی و نتیجه بهتر",
  },
] as const;

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
