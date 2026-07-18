import { WHATSAPP_URL } from "@/lib/constants";

const PLANS = [
  {
    name: "لندینگ",
    desc: "یک صفحهٔ پرقدرت برای معرفی محصول یا خدمت",
    note: "شروع از توافق پروژه",
  },
  {
    name: "شرکتی / پورتفolio",
    desc: "چند صفحه با هویت منسجم و تجربهٔ یکپارچه",
    note: "شروع از توافق پروژه",
  },
  {
    name: "فروشگاهی",
    desc: "فروش آنلاین با مسیر خرید واضح و UI دقیق",
    note: "شروع از توافق پروژه",
  },
] as const;

export function Pricing() {
  return (
    <section id="pricing" className="bg-bg px-5 py-24 md:px-16 lg:px-20">
      <div className="mx-auto max-w-[1360px]">
        <p className="text-sm text-muted">( Pricing )</p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg md:text-5xl">
          شفاف، بدون پکیج قلابی
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted">
          قیمت نهایی بعد از دیدن نیاز پروژه مشخص می‌شود. این سه مسیر رایج‌ترین
          شروع‌ها هستند.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className="rounded-[20px] border border-line bg-card p-6 text-right"
            >
              <h3 className="text-2xl font-bold text-fg">{plan.name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{plan.desc}</p>
              <p className="mt-6 text-sm font-semibold text-lime">{plan.note}</p>
            </article>
          ))}
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex rounded-full border border-line px-5 py-3 text-sm font-medium text-fg transition hover:border-lime hover:text-lime"
        >
          برآورد رایگان در واتساپ
        </a>
      </div>
    </section>
  );
}
