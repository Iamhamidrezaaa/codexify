import { Grid } from "@/components/layout/Grid";

/**
 * Exhibition threshold — quiet, poster-ready.
 */
export function ExhibitionIntro() {
  return (
    <header className="relative overflow-hidden pb-[clamp(4.5rem,14vh,9rem)] pt-publication-chrome">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-[8%] top-[42%] h-px bg-[color:var(--hairline)]" />
        <div className="absolute inset-y-[30%] end-[10%] hidden w-px bg-[color:var(--hairline)] lg:block" />
        <div className="absolute bottom-[8%] start-[8%] h-2 w-2 bg-ink/20" />
      </div>

      <Grid>
        <div className="col-span-4 md:col-span-6 lg:col-span-7">
          <p className="type-overline mb-[var(--space-6)]">آثار</p>
          <h1 className="type-heading text-ink">
            هر پروژه، پاسخ متفاوتی
            <br />
            به یک مسئلهٔ متفاوت است.
          </h1>
        </div>
        <div className="col-span-4 mt-[var(--space-8)] border-s border-[color:var(--hairline)] ps-[var(--space-5)] md:col-span-4 md:col-start-5 md:mt-[var(--space-10)] lg:col-span-3 lg:col-start-10 lg:mt-[var(--space-4)]">
          <p className="type-essay max-w-[var(--measure-narrow)] text-muted">
            شش نمایش. بدون عجله.
          </p>
        </div>
      </Grid>
    </header>
  );
}
