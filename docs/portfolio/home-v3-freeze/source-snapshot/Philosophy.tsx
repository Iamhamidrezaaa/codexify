/**
 * Philosophy — Home manifesto spread
 * Directive 02 · L3 Monumental Type · L1 · L2
 * Type is the mass. No Object. No service list.
 */
export function Philosophy() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-center bg-canvas py-[clamp(5rem,14vh,9rem)]"
      aria-labelledby="philosophy-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-[var(--margin-mobile)] top-[22%] h-px bg-ink/[0.08] md:inset-x-[var(--margin-desktop)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[var(--container-wide)] px-[var(--margin-mobile)] md:px-[var(--margin-desktop)]">
        <p className="type-overline mb-[var(--space-9)] tracking-[0.14em] text-ink/40">
          فلسفه
        </p>

        <h2
          id="philosophy-heading"
          className="type-display max-w-[14em] text-ink"
        >
          خودِ وب‌سایت پورتفولیو است.
        </h2>

        <p className="type-statement mt-[var(--space-9)] max-w-[22em] text-ink/55">
          هر ترکیب باید پیش از اولین اثر ثابت کند که طراحی را می‌شناسیم.
        </p>
      </div>
    </section>
  );
}
