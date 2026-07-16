import type { CaseStudyContent } from "../types";

/**
 * Sora Residence — architecture monograph (Persian, quiet).
 * Same publication engine as Atelier Noir; opposite atmosphere.
 */
export const soraResidenceCaseStudy: CaseStudyContent = {
  meta: {
    slug: "sora-residence",
    number: "۰۲",
    name: "Sora Residence",
    industry: "استودیوی معماری",
    year: "۲۰۲۵",
    statement: "وب‌سایتی که مثل نقشهٔ معماری رفتار می‌کند — شفاف، آرام، دقیق.",
  },

  publication: {
    atmosphere: "light",
    imageFamily: "architecture",
    theme: {
      ground: "#F3F0EA",
      surface: "#E8E4DC",
      ink: "#1A1A1A",
      muted: "#6B6560",
      accent: "#9C6B4A",
      signal: "#7A8470",
    },
    editorial: {
      breath: "open",
      proseMeasure: "narrow",
      reflectionTone: "inverse",
      reflectionField: "surface",
      screensTitle: "قاب‌های فضایی",
      marginNote: "نور، فضا، سکوت، تناسب — ساختمان در حاشیه می‌ماند.",
    },
    chapters: [
      { id: "hero", index: "۰۱", title: "آغاز" },
      { id: "challenge", index: "۰۲", title: "چالش" },
      { id: "discovery", index: "۰۳", title: "کشف" },
      { id: "direction", index: "۰۴", title: "جهت خلاقانه" },
      { id: "system", index: "۰۵", title: "سامانهٔ طراحی" },
      { id: "screens", index: "۰۶", title: "قاب‌های فضایی" },
      { id: "interactions", index: "۰۷", title: "تعامل‌های مؤثر" },
      { id: "reflection", index: "۰۸", title: "بازاندیشی" },
      { id: "outcome", index: "۰۹", title: "نتیجه" },
    ],
  },

  challenge: {
    title: "چالش",
    body: [
      "سورا یک استودیوی معماری مسکونی است. کارش دربارهٔ نور و تناسب است — نه دربارهٔ نمایش ساختمان به‌عنوان شیء.",
      "سایت قبلی شبیه کاتالوگ پروژه بود: شبکهٔ فشردهٔ عکس، شرح‌های کوتاه، و زبانی که با سکوت فضاهای ساخته‌شده هم‌خوان نبود.",
      "مسئله «به‌روز کردن ظاهر» نبود. مسئله این بود که خواننده بتواند فضا را حس کند — حتی پیش از آن‌که پلان را ببیند.",
    ],
  },

  discovery: {
    title: "کشف",
    items: [
      {
        label: "مخاطب",
        text: "کارفرمایان خصوصی و نهادهای فرهنگی کوچک. کسانی که نقشه را می‌خوانند و از شعارهای پرزرق‌وبرق خسته شده‌اند.",
      },
      {
        label: "جایگاه",
        text: "میان سایت‌های معماری، دو قطب دیده می‌شد: گالری تصویر شلوغ، یا آرشیو خشک PDF. جای «مونوگراف دیجیتال» خالی بود.",
      },
      {
        label: "مشاهده",
        text: "در بازدیدهای واقعی، مکالمه آهسته است. نور از پنجره حرکت می‌کند. یک محور فضایی همه چیز را منظم می‌کند. وب باید همان ریتم را حفظ کند.",
      },
      {
        label: "تصمیم راهبردی",
        text: "پروژه را مثل یک مسیر پیاده روایت کنیم، نه مثل یک شبکه. هر صفحه یک آستانه. فرآیند مرئی بماند؛ هیاهو حذف شود.",
      },
    ],
  },

  direction: {
    title: "جهت خلاقانه",
    mood: ["آرام", "معمارانه", "دقیق", "طبیعی", "کند"],
    body: [
      "فضا باید مثل راهروی روشن باشد: کاغذ گرم، سنگ، چوب، سایهٔ نرم. خالی بودن بخشی از ترکیب است — نه اشتباه.",
      "تایپوگرافی بسیار آرام. حاشیه‌های وسیع. فاصلهٔ سطر بلند. خواندن باید شبیه قدم زدن در اتاق خالی باشد.",
      "تصویر: پلان، برش، قاب پنجره، بافت بتن و چوب. بدون شبیه‌سازی دستگاه. بدون فریم مرورگر.",
    ],
    quote: "معماری دربارهٔ ساختمان نیست. دربارهٔ نور است.",
  },

  system: {
    title: "سامانهٔ طراحی",
    grid: "شبکهٔ دوازده‌ستونه با حاشیهٔ وسیع. محورهای افقی قوی — مثل خطوط ارتفاع در نقشه.",
    spacing: "فاصله‌های بلند و عمدی. فضای خالی به‌اندازهٔ دیوار سفید در گالری — نه پر کردن تصادفی.",
    components: [
      "برچسب‌های دیواری برای عنوان پروژه",
      "قوانین مویی شبیه خط مداد نقشه",
      "شاخص پروژه مثل فهرست مونوگراف",
      "دکمهٔ نادر با خاک رس اکسیدشده — فقط برای تماس جدی",
    ],
    interaction: [
      "حرکت مثل نور در اتاق — آهسته و خطی",
      "آشکار شدن تصویر شبیه بلند کردن کاغذ پوستی",
      "بدون جهش و بدون کشسانی",
      "اسکرول به‌مثابهٔ مسیر پیاده",
    ],
    colors: [
      {
        name: "Paper",
        hex: "#F3F0EA",
        role: "زمینه",
      },
      {
        name: "Stone",
        hex: "#E8E4DC",
        role: "سطح",
      },
      {
        name: "Ink",
        hex: "#1A1A1A",
        role: "متن",
      },
      {
        name: "Clay",
        hex: "#9C6B4A",
        role: "خاک رس / مس اکسید",
      },
      {
        name: "Olive",
        hex: "#7A8470",
        role: "زیتونی خاموش",
      },
      {
        name: "Sky",
        hex: "#D9E0E4",
        role: "خلأ روشن",
      },
    ],
    typeRoles: [
      {
        role: "Display",
        sample: "Sora Residence",
        note: "نام پروژه — آرام، فاصلهٔ باز",
      },
      {
        role: "Body",
        sample: "نور از شرق می‌آید. تناسب حفظ می‌شود.",
        note: "روایت کوتاه فضایی",
      },
      {
        role: "Caption",
        sample: "برش A–A · مقیاس ۱:۱۰۰",
        note: "ارجاع نقشه — کوچک و دقیق",
      },
    ],
  },

  screens: [
    {
      id: "entry-corridor",
      label: "آستانه",
      breakpoint: "desktop",
      caption: "ورود مثل راهرو. یک محور. بدون شبکهٔ پروژه.",
      motif: "corridor",
      figure: "۰۴",
    },
    {
      id: "monograph-index",
      label: "فهرست",
      breakpoint: "desktop",
      caption: "شاخص پروژه شبیه فهرست مونوگراف؛ نه گالری شلوغ.",
      motif: "monograph",
      figure: "۰۵",
    },
    {
      id: "section-tablet",
      label: "برش",
      breakpoint: "tablet",
      caption: "برش و توضیح در دو ستون آرام.",
      motif: "section-cut",
      figure: "۰۶",
    },
    {
      id: "threshold-mobile",
      label: "تماس",
      breakpoint: "mobile",
      caption: "یک آستانه. یک اقدام. بدون فشار.",
      motif: "threshold",
      figure: "۰۷",
    },
  ],

  interactions: [
    {
      title: "اسکرول به‌مثابهٔ مسیر",
      why: "حرکت عمودی باید حس عبور از آستانه‌ها را بدهد — نه پرش بین بخش‌های تبلیغاتی.",
    },
    {
      title: "آشکار شدن کاغذی",
      why: "تصاویر با شفافیت آهسته ظاهر می‌شوند؛ شبیه بلند کردن لایهٔ کاغذ پوستی از روی پلان.",
    },
    {
      title: "متای چسبان، به‌اندازه",
      why: "نام پروژه و مقیاس می‌توانند ثابت بمانند تا تصویر بگذرد — فقط وقتی واقعاً به خواندن کمک کند.",
    },
  ],

  reflection: {
    title: "بازاندیشی",
    body: [
      "اولین پیش‌نویس هنوز بیش از حد «گالری» بود. عکس‌های زیاد، سکوت فضا را می‌کشت.",
      "تصمیم سخت این بود: کمتر نشان دادن. چند قاب عمیق، بهتر از همهٔ پروژه‌ها در یک نگاه است.",
      "آموختیم که در معماری آرام، فضای خالی یک تصمیم طراحی است — نه کمبود محتوا.",
    ],
  },

  outcome: {
    title: "نتیجه",
    items: [
      {
        label: "ادراک برند",
        text: "فضای دیجیتال به مونوگراف نزدیک‌تر شد؛ نه به کاتالوگ فشرده.",
      },
      {
        label: "وضوح",
        text: "سلسله‌مراتب ساده شد: دیدن فضا، فهمیدن فرآیند، درخواست جدی.",
      },
      {
        label: "اعتماد کارفرما",
        text: "مسیر تماس بدون هیاهو باقی ماند — مناسب کسی که عجلهٔ نمایش ندارد.",
      },
      {
        label: "خوانایی",
        text: "پلان و برش به‌عنوان زبان اصلی دیده شدند؛ نه تزئین کنار عکس.",
      },
    ],
  },

  figures: {
    afterHero: {
      family: "architecture",
      motif: "plan",
      caption: "ترکیب پلان — محور و اتاق؛ بدون شبیه‌سازی دستگاه.",
      figure: "۰۱",
    },
    afterDirection: {
      family: "material",
      motif: "timber",
      caption: "بافت چوب و سنگ — پالت لمسی، بدون لوکسِ تاریک.",
      figure: "۰۲",
    },
    closing: {
      family: "negative-space",
      motif: "aperture",
      caption: "نور. فضا. سکوت.",
      figure: "۰۸",
    },
  },

  prev: { slug: "atelier-noir", name: "Atelier Noir" },
  next: { slug: "auren-clinic", name: "Auren Clinic" },
};
