import { Grid } from "@/components/layout/Grid";

/**
 * Quiet editorial threshold — no marketing.
 */
export function ExhibitionIntro() {
  return (
    <header className="pb-[clamp(4rem,14vh,9rem)] pt-[8.5rem] md:pt-[10rem]">
      <Grid>
        <div className="col-span-4 md:col-span-6 lg:col-span-7">
          <p className="type-overline mb-[var(--space-6)]">آثار</p>
          <h1 className="type-heading text-ink">
            هر پروژه، پاسخ متفاوتی
            <br />
            به یک مسئلهٔ متفاوت است.
          </h1>
        </div>
        <div className="col-span-4 mt-[var(--space-8)] md:col-span-4 md:col-start-5 md:mt-[var(--space-10)] lg:col-span-3 lg:col-start-10 lg:mt-[var(--space-4)]">
          <p className="type-body-lg max-w-[var(--measure-narrow)] text-muted">
            شش نمایش. بدون عجله.
          </p>
        </div>
      </Grid>
    </header>
  );
}
