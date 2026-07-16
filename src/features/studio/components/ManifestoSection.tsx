import { cn } from "@/design/utilities/cn";
import { Grid } from "@/components/layout/Grid";
import { Reveal } from "@/components/ui/Reveal";
import { editorialDissolve } from "@/design/motion";

type ManifestoSectionProps = {
  id: string;
  index?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  spine?: "chapter" | "essay";
};

/**
 * Manifesto chapter — book-essay rhythm.
 * Sticky index stays quiet (unlike Process monumental numbers).
 */
export function ManifestoSection({
  id,
  index,
  title,
  children,
  className,
  spine = "chapter",
}: ManifestoSectionProps) {
  const showSpine = spine === "chapter" && (index || title);

  return (
    <section
      id={`chapter-${id}`}
      className={cn("py-section-expansive scroll-mt-header", className)}
      aria-labelledby={title ? `manifesto-heading-${id}` : undefined}
    >
      <Grid>
        {showSpine ? (
          <div className="col-span-4 md:col-span-3 lg:col-span-3">
            <Reveal variants={editorialDissolve}>
              <div className="flex items-center gap-[var(--space-3)] lg:sticky lg:top-[32vh]">
                {index ? <span className="type-number">{index}</span> : null}
                {index && title ? (
                  <span className="h-px w-5 bg-border" aria-hidden />
                ) : null}
                {title ? (
                  <h2
                    id={`manifesto-heading-${id}`}
                    className="type-overline text-ink"
                  >
                    {title}
                  </h2>
                ) : null}
              </div>
            </Reveal>
          </div>
        ) : null}

        <div
          className={cn(
            "relative col-span-4",
            showSpine
              ? "mt-[var(--space-9)] md:col-span-5 md:col-start-4 md:mt-0 lg:col-span-7 lg:col-start-5"
              : "md:col-span-8 md:col-start-3 lg:col-span-8 lg:col-start-3",
          )}
        >
          {children}
        </div>
      </Grid>
    </section>
  );
}
