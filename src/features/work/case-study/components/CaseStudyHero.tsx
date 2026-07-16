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
 * Case study opening — iconic poster field per atmosphere.
 * Holds as a still without motion.
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
        "relative overflow-hidden scroll-mt-header pt-publication-chrome pb-[clamp(5.5rem,18vh,11rem)]",
        light && "md:pb-[clamp(7rem,22vh,14rem)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundColor: theme.ground }}
        aria-hidden
      />

      {/* Registration / material field */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-x-[7%] top-[26%] h-px opacity-25"
          style={{ backgroundColor: theme.ink }}
        />
        <div
          className="absolute inset-x-[7%] bottom-[12%] h-px opacity-20"
          style={{ backgroundColor: theme.ink }}
        />
        <div
          className="absolute inset-y-[20%] start-[7%] w-px opacity-20"
          style={{ backgroundColor: theme.ink }}
        />

        {light ? (
          <>
            <div
              className="absolute end-[8%] top-[34%] bottom-[18%] w-[min(26%,260px)] border opacity-45"
              style={{ borderColor: theme.accent }}
            />
            <div
              className="absolute end-[8%] top-[34%] h-px w-[min(26%,260px)]"
              style={{ backgroundColor: theme.accent, opacity: 0.7 }}
            />
            <div
              className="absolute inset-x-[18%] bottom-[12%] h-[16%] opacity-40"
              style={{ backgroundColor: theme.surface }}
            />
            <div
              className="absolute bottom-[12%] start-[7%] h-2 w-2 opacity-40"
              style={{ backgroundColor: theme.accent }}
            />
          </>
        ) : (
          <>
            <div
              className="absolute inset-x-[12%] top-[36%] bottom-[20%] border opacity-30"
              style={{ borderColor: theme.accent }}
            />
            <div
              className="absolute left-1/2 top-[48%] h-px w-[22%] -translate-x-1/2"
              style={{ backgroundColor: theme.accent }}
            />
            <div
              className="absolute left-1/2 top-[46%] h-2 w-2 -translate-x-1/2 rounded-full opacity-80"
              style={{ backgroundColor: theme.ink }}
            />
            <div
              className="absolute end-[12%] top-[36%] h-[18%] w-[14%] opacity-15"
              style={{ backgroundColor: theme.accent }}
            />
          </>
        )}
      </div>

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
              className="type-number mb-[var(--space-5)] tracking-[0.1em]"
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
              style={{ color: theme.ink, opacity: light ? 0.55 : 0.72 }}
            >
              {meta.statement}
            </p>
          </Reveal>
        </div>
      </Grid>
    </header>
  );
}
