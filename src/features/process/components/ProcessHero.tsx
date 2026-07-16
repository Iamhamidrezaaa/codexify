import { cn } from "@/design/utilities/cn";
import { Grid } from "@/components/layout/Grid";
import { Reveal } from "@/components/ui/Reveal";

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
        "scroll-mt-28 border-b border-border pt-[8.5rem] pb-[clamp(4rem,12vh,8rem)] md:pt-[10rem]",
        className,
      )}
    >
      <Grid>
        <div className="col-span-4 md:col-span-7 lg:col-span-8">
          <Reveal>
            <p className="type-overline mb-[var(--space-7)] text-muted">
              {overline}
            </p>
            <h1 className="type-display text-ink">{title}</h1>
            <p className="type-heading mt-[var(--space-9)] max-w-[var(--measure-wide)] font-medium text-ink/70">
              {statement}
            </p>
          </Reveal>
        </div>

        <div className="col-span-4 mt-[var(--space-10)] md:col-span-5 md:col-start-4 lg:col-span-6 lg:col-start-5">
          <Reveal delay={0.08}>
            <div className="space-y-[var(--space-6)]">
              {intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="type-body-lg max-w-[var(--measure)] text-muted leading-[1.75]"
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
