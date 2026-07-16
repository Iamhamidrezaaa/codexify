import type { CaseStudyContent } from "../types";

/**
 * Auren Clinic — care publication (Persian, empathetic).
 * Third atmosphere: soft trust — neither noir luxury nor architectural stone.
 */
export const aurenClinicCaseStudy: CaseStudyContent = {
  meta: {
    slug: "auren-clinic",
    number: "۰۵",
    name: "Auren Clinic",
    industry: "کلینیک زیبایی",
    year: "۲۰۲۵",
    statement: "مراقبت، نه نمایش — فضایی که نبض را پایین می‌آورد.",
  },

  publication: {
    atmosphere: "light",
    imageFamily: "negative-space",
    theme: {
      ground: "#F6F3F0",
      surface: "#EDE8E3",
      ink: "#2A2725",
      muted: "#8E877F",
      accent: "#C4A49A",
      signal: "#A8B5A0",
    },
    editorial: {
      breath: "open",
      proseMeasure: "narrow",
      reflectionTone: "inverse",
      reflectionField: "surface",
      screensTitle: "فضاهای مراقبت",
      marginNote: "اعتماد پیش از رزرو ساخته می‌شود — نه بعد از آن.",
    },
    chapters: [
      { id: "hero", index: "۰۱", title: "آغاز" },
      { id: "challenge", index: "۰۲", title: "چالش" },
      { id: "discovery", index: "۰۳", title: "کشف" },
      { id: "direction", index: "۰۴", title: "جهت خلاقانه" },
      { id: "system", index: "۰۵", title: "سامانهٔ طراحی" },
      { id: "screens", index: "۰۶", title: "فضاهای مراقبت" },
      { id: "interactions", index: "۰۷", title: "تعامل‌های مؤثر" },
      { id: "reflection", index: "۰۸", title: "بازاندیشی" },
      { id: "outcome", index: "۰۹", title: "نتیجه" },
    ],
  },

  challenge: {
    title: "چالش",
    body: [
      "اورن یک کلینیک زیبایی‌پزشکی است. اعتبارش روی دقت بالینی و مراقبت بلندمدت بنا شده — نه روی وعدهٔ تغییر فوری.",
      "حضور آنلاین اما شبیه کاتالوگ اینستاگرامی بود: چهره‌های خندان، قبل/بعد پررنگ، و زبانی که اضطراب را بیشتر می‌کرد تا آرامش.",
      "مسئله «زیباتر کردن سایت» نبود. مسئله این بود که پیش از مشاوره، احساس امنیت شکل بگیرد — بدون فشار فروش و بدون کلیشه‌های زیبایی.",
    ],
  },

  discovery: {
    title: "کشف",
    items: [
      {
        label: "مخاطب",
        text: "بزرگسالانی که مراقبت دقیق می‌خواهند و به تبلیغات تهاجمی حساس‌اند. حریم خصوصی برایشان مهم‌تر از دیده شدن است.",
      },
      {
        label: "جایگاه",
        text: "میان کلینیک‌های آنلاین، دو قطب دیده می‌شد: ویترین پرحاشیه، یا فرم خشک پزشکی. جای «سوئیت آرامِ توضیح‌دهنده» خالی بود.",
      },
      {
        label: "مشاهده",
        text: "در مراجعهٔ واقعی، مکالمه کوتاه و واضح است. نور نرم است. زمان برای پرسش هست. وب باید همان نبض را حفظ کند.",
      },
      {
        label: "تصمیم راهبردی",
        text: "درمان را فصل کنیم، نه شبکهٔ پیشنهاد. هر صفحه یک اتاق آرام. رزرو در حاشیهٔ روشن — نه در مرکز هیاهو.",
      },
    ],
  },

  direction: {
    title: "جهت خلاقانه",
    mood: ["آرام", "مراقب", "دقیق", "انسانی", "نرم"],
    body: [
      "فضا باید مثل سوئیت خصوصی باشد: عاج گرم، سنگ نرم، مریم‌گلی خاموش. خالی بودن، اجازهٔ نفس کشیدن است.",
      "تایپوگرافی هوا‌دار و خوانا. حاشیهٔ وسیع. بلوک‌های کوتاه برای توضیح درمان — بدون شعار انگیزشی.",
      "تصویر: بافت کتان، نور، آب، سایهٔ نرم. بدون مدل خندان، بدون پزشک اشاره‌گر، بدون قبل/بعد.",
    ],
    quote: "مراقبت دیده نمی‌شود — حس می‌شود.",
  },

  system: {
    title: "سامانهٔ طراحی",
    grid: "شبکهٔ دوازده‌ستونه با حاشیهٔ بسیار وسیع. ستون‌های کوتاه برای متن درمان؛ هوا اطراف هر ادعا.",
    spacing: "ریتم عمودی بلند و یکنواخت. فاصله مثل تنفس — نه شکاف تصادفی، نه فشردگی کاتالوگ.",
    components: [
      "برچسب‌های آرام برای نام درمان",
      "جداکننده‌های خاکستری ملایم برای فرم‌ها",
      "دکمهٔ نادر با blush خاموش — فقط برای درخواست مشاوره",
      "افشای تدریجی جزئیات درمان؛ بدون آکاردئون پر سر و صدا",
    ],
    interaction: [
      "حرکت مثل تنفس — آهسته و خطی",
      "شفافیت نرم؛ بدون جهش",
      "تمرکز فرم‌ها روشن و وسیع",
      "هیچ حرکت بازیگوشانه‌ای روی چهره یا بدن",
    ],
    colors: [
      {
        name: "Ivory mist",
        hex: "#F6F3F0",
        role: "زمینه",
      },
      {
        name: "Soft stone",
        hex: "#EDE8E3",
        role: "سطح",
      },
      {
        name: "Charcoal soft",
        hex: "#2A2725",
        role: "متن",
      },
      {
        name: "Dusty rose",
        hex: "#C4A49A",
        role: "تاکید نرم",
      },
      {
        name: "Muted sage",
        hex: "#A8B5A0",
        role: "اشارهٔ طبیعی",
      },
      {
        name: "Sterile line",
        hex: "#D8D4CF",
        role: "خط فرم",
      },
    ],
    typeRoles: [
      {
        role: "Display",
        sample: "Auren Clinic",
        note: "نام — نرم، بدون اسکریپت تزئینی",
      },
      {
        role: "Body",
        sample: "آنچه باید انتظار داشته باشید، گام‌به‌گام.",
        note: "توضیح درمان — کوتاه و روشن",
      },
      {
        role: "Caption",
        sample: "مشاوره · حریم خصوصی",
        note: "برچسب آرام — بدون فریاد",
      },
    ],
  },

  screens: [
    {
      id: "suite-entry",
      label: "ورود",
      breakpoint: "desktop",
      caption: "سوئیت آرام. یک محور. بدون شبکهٔ پیشنهاد.",
      motif: "suite",
      figure: "۰۴",
    },
    {
      id: "care-chapters",
      label: "فصل‌های مراقبت",
      breakpoint: "desktop",
      caption: "فهرست درمان مثل فهرست مونوگراف؛ نه قفسهٔ فروش.",
      motif: "monograph",
      figure: "۰۵",
    },
    {
      id: "expect-tablet",
      label: "چه باید انتظار داشت",
      breakpoint: "tablet",
      caption: "توضیح کوتاه و فضای خالی؛ بدون هیجان کاذب.",
      motif: "detail",
      figure: "۰۶",
    },
    {
      id: "consult-mobile",
      label: "مشاوره",
      breakpoint: "mobile",
      caption: "فرم آرام. یک اقدام. بدون فشار.",
      motif: "consult",
      figure: "۰۷",
    },
  ],

  interactions: [
    {
      title: "افشای تدریجی",
      why: "جزئیات درمان وقتی لازم است باز می‌شود — تا صفحه در نگاه اول سنگین نشود.",
    },
    {
      title: "فرم با نفس",
      why: "فیلدها فاصله‌دار و تمرکزشان روشن است؛ رزرو نباید حس عجله بدهد.",
    },
    {
      title: "محو شدن نرم",
      why: "تصاویر و فصل‌ها با شفافیت آهسته ظاهر می‌شوند — مثل نور در اتاق مراقبت.",
    },
  ],

  reflection: {
    title: "بازاندیشی",
    body: [
      "اولین پیش‌نویس هنوز بیش از حد «کلینیکیِ تبلیغاتی» بود. قبل/بعد، حتی اگر محو، اعتماد را مخدوش می‌کرد.",
      "تصمیم سخت این بود: کمتر وعده دادن. توضیح روشنِ فرآیند، بهتر از تصویرِ نتیجهٔ ایده‌آل است.",
      "آموختیم که در مراقبت دیجیتال، فضای خالی نشانهٔ احترام به اضطراب مخاطب است — نه کمبود محتوا.",
    ],
  },

  outcome: {
    title: "نتیجه",
    items: [
      {
        label: "ادراک برند",
        text: "فضای دیجیتال به سوئیت مشاوره نزدیک‌تر شد؛ نه به ویترین اینستاگرام.",
      },
      {
        label: "وضوح",
        text: "مسیر ساده شد: فهمیدن، پرسیدن، درخواست مشاوره.",
      },
      {
        label: "اعتماد",
        text: "زبان آرام ماند؛ رزرو بدون فشار و بدون شمارش معکوس.",
      },
      {
        label: "خوانایی",
        text: "توضیح درمان کوتاه و قابل‌پیگیری شد؛ جزئیات پشت لایهٔ آرام ماند.",
      },
    ],
  },

  figures: {
    afterHero: {
      family: "negative-space",
      motif: "veil",
      caption: "خلأ نرم — هوا اطراف ادعا؛ بدون چهره و بدون دستگاه.",
      figure: "۰۱",
    },
    afterDirection: {
      family: "material",
      motif: "linen",
      caption: "بافت کتان و سنگ نرم — لمس مراقبت، نه درخشش لوکس.",
      figure: "۰۲",
    },
    closing: {
      family: "typography",
      motif: "letter",
      caption: "خوانایی به‌مثابهٔ مراقبت.",
      figure: "۰۸",
    },
  },

  prev: { slug: "sora-residence", name: "Sora Residence" },
};
