import { cn } from "@/design/utilities/cn";
import { Grid } from "@/components/layout/Grid";
import { Reveal } from "@/components/ui/Reveal";
import { processSettle } from "@/design/motion";

type ProcessHeroProps = {
  overline: string;
  title: string;
  statement: string;
  intro: string[];
  className?: string;
};

/**
 * Process opening — quiet poster with editorial datum lines.
 */
export function ProcessHero({
  overline,
  title,
  statement,
  intro,
  className,
}: ProcessHeroProps) {
  return (
    <header
      id="chapter-intro"
      className={cn(
        "relative scroll-mt-header overflow-hidden border-b border-[color:var(--hairline)] pt-publication-chrome pb-[clamp(4.5rem,14vh,9rem)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-y-[22%] end-[9%] hidden w-px bg-[color:var(--hairline)] lg:block" />
        <div className="absolute inset-x-[8%] top-[30%] h-px bg-[color:var(--hairline)]" />
        <div className="absolute bottom-[18%] start-[8%] end-[40%] h-[12%] bg-ink-wash" />
        <div className="absolute top-[30%] start-[8%] h-2 w-2 bg-ink/20" />
      </div>

      <Grid>
        <div className="col-span-4 md:col-span-7 lg:col-span-8">
          <Reveal variants={processSettle}>
            <p className="type-overline mb-[var(--space-7)] text-muted">
              {overline}
            </p>
            <h1 className="type-display text-ink">{title}</h1>
            <p className="type-statement mt-[var(--space-9)] max-w-[var(--measure-wide)] text-ink/70">
              {statement}
            </p>
          </Reveal>
        </div>

        <div className="col-span-4 mt-[var(--space-10)] md:col-span-5 md:col-start-4 lg:col-span-6 lg:col-start-5">
          <Reveal variants={processSettle} delay={0.08}>
            <div className="space-y-[var(--space-6)] border-s border-[color:var(--hairline)] ps-[var(--space-5)]">
              {intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="type-essay max-w-[var(--measure)] text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Grid>
    </header>
  );
}
