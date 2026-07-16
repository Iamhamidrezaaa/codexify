import { cn } from "@/design/utilities/cn";
import { Grid } from "@/components/layout/Grid";
import { Reveal } from "@/components/ui/Reveal";
import type {
  CaseStudyMeta,
  PublicationAtmosphere,
  PublicationTheme,
} from "../types";

type CaseStudyHeroProps = {
  meta: CaseStudyMeta;
  theme: PublicationTheme;
  atmosphere?: PublicationAtmosphere;
  className?: string;
};

/**
 * Quiet monumental opening — no CTA.
 * Framing shifts with atmosphere: night salon vs daylight plan.
 */
export function CaseStudyHero({
  meta,
  theme,
  atmosphere = "dark",
  className,
}: CaseStudyHeroProps) {
  const light = atmosphere === "light";

  return (
    <header
      id="chapter-hero"
      className={cn(
        "relative overflow-hidden scroll-mt-header pt-publication-chrome pb-[clamp(5rem,16vh,10rem)]",
        light && "md:pb-[clamp(7rem,22vh,14rem)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundColor: theme.ground }}
        aria-hidden
      />

      {light ? (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 top-[32%] -z-10 h-px opacity-30"
            style={{ backgroundColor: theme.ink }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-[18%] start-[12%] -z-10 w-px opacity-20"
            style={{ backgroundColor: theme.ink }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-[28%] end-[18%] top-auto bottom-[24%] -z-10 w-[min(28%,220px)] border opacity-40"
            style={{ borderColor: theme.accent }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-[18%] bottom-[16%] -z-10 h-[18%] opacity-50"
            style={{ backgroundColor: "#D9E0E4" }}
            aria-hidden
          />
        </>
      ) : (
        <>
          <div
            className="pointer-events-none absolute inset-x-[10%] top-[38%] bottom-[22%] -z-10 border opacity-30"
            style={{ borderColor: theme.accent }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-[50%] h-px w-[26%] -translate-x-1/2 -z-10"
            style={{ backgroundColor: theme.accent }}
            aria-hidden
          />
        </>
      )}

      <Grid>
        <div
          className={cn(
            "col-span-4",
            light
              ? "md:col-span-6 lg:col-span-7"
              : "md:col-span-7 lg:col-span-8",
          )}
        >
          <Reveal>
            <p
              className="type-number mb-[var(--space-5)]"
              style={{ color: theme.accent }}
            >
              {meta.number}
            </p>
            <p
              className="type-overline mb-[var(--space-7)]"
              style={{ color: theme.accent }}
            >
              {meta.industry}
              <span className="mx-3 opacity-40">·</span>
              {meta.year}
            </p>
            <h1
              className={cn(
                "type-display font-latin tracking-tight",
                light && "tracking-[0.02em]",
              )}
              style={{ color: theme.ink }}
            >
              {meta.name}
            </h1>
            <p
              className={cn(
                "type-statement mt-[var(--space-9)]",
                light
                  ? "max-w-[var(--measure)]"
                  : "max-w-[var(--measure-wide)]",
              )}
              style={{ color: theme.ink, opacity: light ? 0.55 : 0.7 }}
            >
              {meta.statement}
            </p>
          </Reveal>
        </div>
      </Grid>
    </header>
  );
}
