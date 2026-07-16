/**
 * Closing Statement — Home
 * One final gravity. No CTA. No sales.
 * Language: L5 Compressed Corner · L3 voice · L2 still
 */
export function ClosingStatement() {
  return (
    <section
      className="relative flex min-h-[85svh] flex-col justify-end bg-canvas pb-[clamp(4rem,12vh,7rem)] pt-[clamp(6rem,18vh,10rem)]"
      aria-labelledby="closing-heading"
    >
      <div className="mx-auto w-full max-w-[var(--container-wide)] px-[var(--margin-mobile)] md:px-[var(--margin-desktop)]">
        <div className="max-w-[min(28rem,92%)] md:max-w-[min(32rem,48%)]">
          <p className="type-overline mb-[var(--space-8)] tracking-[0.14em] text-ink/35">
            پایانِ صفحه
          </p>
          <h2
            id="closing-heading"
            className="type-display max-w-[12em] text-ink"
          >
            ترکیب، تنها امضای ماندگار است.
          </h2>
        </div>
      </div>
    </section>
  );
}
