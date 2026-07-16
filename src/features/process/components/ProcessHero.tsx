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
 * Quiet opening — publication tone, not landing CTA.
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
        "scroll-mt-header border-b border-border pt-publication-chrome pb-[clamp(4rem,12vh,8rem)]",
        className,
      )}
    >
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
            <div className="space-y-[var(--space-6)]">
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
