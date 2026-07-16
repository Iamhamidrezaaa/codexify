/**
 * Services — Editorial index
 * Directive 03 · L4 Optical Counterweight · L1 · L2
 * Names matter. Descriptions whisper. No cards. No CTA. No icons.
 */

const SERVICES = [
  { index: "۰۱", title: "طراحی وب‌سایت", whisper: "چیدمان ادیتوریال، ترکیب اختصاصی." },
  { index: "۰۲", title: "توسعه وب", whisper: "عملکرد و دقت در جزئیات." },
  { index: "۰۳", title: "رابط و تجربه", whisper: "رفتار واقعی، نه تزئین." },
  { index: "۰۴", title: "برندینگ", whisper: "هویتی که در صفحه هم می‌ماند." },
  { index: "۰۵", title: "موشن", whisper: "حرکت آرام که معنا می‌افزاید." },
  { index: "۰۶", title: "تعامل", whisper: "کنجکاوی، نه هیجان کاذب." },
] as const;

export function Services() {
  return (
    <section
      className="bg-canvas py-[clamp(5rem,14vh,9rem)]"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto w-full max-w-[var(--container-wide)] px-[var(--margin-mobile)] md:px-[var(--margin-desktop)]">
        {/* L4 — small dense head as counterweight to the long quiet index */}
        <header className="mb-[clamp(3.5rem,10vh,6.5rem)] max-w-[20rem]">
          <p className="type-overline tracking-[0.14em] text-ink/40">فهرست</p>
          <h2
            id="services-heading"
            className="type-heading mt-[var(--space-6)] text-ink"
          >
            کارها
          </h2>
        </header>

        <ol className="border-t border-ink/10">
          {SERVICES.map((service) => (
            <li
              key={service.index}
              className="grid grid-cols-[auto_1fr] gap-x-[var(--space-7)] border-b border-ink/10 py-[clamp(1.75rem,4vh,2.75rem)] md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.1fr)] md:gap-x-[var(--space-9)] md:items-baseline"
            >
              <span className="type-number pt-[0.2em] text-ink/85">
                {service.index}
              </span>
              <h3 className="type-title text-ink md:max-w-[12em]">
                {service.title}
              </h3>
              <p className="type-caption col-span-2 mt-[var(--space-3)] max-w-[28em] text-ink/38 md:col-span-1 md:mt-0 md:justify-self-end md:text-end">
                {service.whisper}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
