import { Grid } from "@/components/layout/Grid";
import { FadeIn } from "@/components/ui/FadeIn";
import { LinkArrow } from "@/components/ui/LinkArrow";
import { SectionLabel } from "@/components/ui/SectionLabel";

const SERVICES = [
  {
    index: "۰۱",
    title: "طراحی وب‌سایت",
    description:
      "چیدمان‌های ادیتوریال، ترکیب‌بندی اختصاصی، زیبایی‌شناسی ماندگار.",
  },
  {
    index: "۰۲",
    title: "توسعه وب",
    description:
      "مهندسی با اولویت عملکرد و وسواس نسبت به جزئیات.",
  },
  {
    index: "۰۳",
    title: "رابط و تجربه کاربری",
    description:
      "رابط‌هایی شهودی، ریشه در پژوهش و رفتار انسان.",
  },
  {
    index: "۰۴",
    title: "برندینگ",
    description:
      "سامانه‌های هویت بصری که بی‌درنگ به دیجیتال ترجمه می‌شوند.",
  },
  {
    index: "۰۵",
    title: "طراحی موشن",
    description:
      "حرکت آرام و ظریف که ارتقا می‌دهد — نه منحرف می‌کند.",
  },
  {
    index: "۰۶",
    title: "تجربه‌های تعاملی",
    description:
      "تجربه‌های وب غوطه‌ور که کنجکاوی را پاداش می‌دهند.",
  },
] as const;

export function Services() {
  return (
    <section className="py-section" aria-labelledby="services-heading">
      <Grid className="mb-[var(--space-9)]">
        <div className="col-span-4 md:col-span-5 lg:col-span-4">
          <FadeIn>
            <SectionLabel index="۰۳" label="خدمات" />
          </FadeIn>
          <FadeIn delay={0.1} className="mt-[var(--space-6)]">
            <h2 id="services-heading" className="type-heading text-ink">
              چه می‌کنیم
            </h2>
          </FadeIn>
        </div>

        <div className="col-span-4 mt-[var(--space-5)] md:col-span-3 md:col-start-6 md:mt-0 md:flex md:items-end md:justify-start lg:col-span-3 lg:col-start-10">
          <FadeIn delay={0.15}>
            <LinkArrow href="/contact">درباره پروژه‌تان حرف بزنیم</LinkArrow>
          </FadeIn>
        </div>
      </Grid>

      <Grid as="ul" className="border-t border-border">
        {SERVICES.map((service, i) => (
          <FadeIn
            key={service.index}
            as="li"
            delay={i * 0.05}
            className="group col-span-4 grid grid-cols-4 gap-x-[var(--gutter-mobile)] border-b border-border py-[var(--space-6)] transition-colors duration-base ease-out hover:bg-ink/[0.015] md:col-span-8 md:grid-cols-8 md:gap-x-[var(--gutter-tablet)] lg:col-span-12 lg:grid-cols-12 lg:gap-x-[var(--gutter-desktop)]"
          >
            <span className="type-number col-span-1">{service.index}</span>
            <h3 className="type-title col-span-3 text-ink md:col-span-3 lg:col-span-4">
              {service.title}
            </h3>
            <p className="type-body col-span-4 mt-[var(--space-3)] text-sm text-muted md:col-span-4 md:mt-0 lg:col-span-5">
              {service.description}
            </p>
            <span
              className="col-span-4 mt-[var(--space-4)] type-number text-muted opacity-0 transition-opacity duration-base ease-out group-hover:opacity-100 md:col-span-1 md:mt-0 md:text-start lg:col-span-2"
              aria-hidden
            >
              ←
            </span>
          </FadeIn>
        ))}
      </Grid>
    </section>
  );
}
