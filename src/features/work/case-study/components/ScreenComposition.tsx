"use client";

import { cn } from "@/design/utilities/cn";
import { Reveal } from "@/components/ui/Reveal";
import { Figure } from "./Figure";
import type { CaseStudyScreen, PublicationTheme } from "../types";

type ScreenCompositionProps = {
  screens: CaseStudyScreen[];
  theme?: PublicationTheme;
  className?: string;
};

/**
 * Selected frames as immersive panels — no browser chrome.
 * Figure numbers when provided on screen data.
 */
export function ScreenComposition({
  screens,
  theme,
  className,
}: ScreenCompositionProps) {
  const ground = theme?.ground ?? "#0B0B0C";
  const accent = theme?.accent ?? "#8A9199";
  const ink = theme?.ink ?? "#EDEAE4";

  return (
    <div className={cn("space-y-[var(--space-10)]", className)}>
      {screens.map((screen, i) => {
        const plate = (
          <div
            className={cn(
              "relative w-full overflow-hidden border border-border",
              screen.breakpoint === "desktop" && "aspect-[16/10]",
              screen.breakpoint === "tablet" && "aspect-[4/3] max-w-2xl",
              screen.breakpoint === "mobile" && "aspect-[9/16] max-w-xs",
            )}
            style={{ backgroundColor: ground }}
            role="img"
            aria-label={screen.label}
          >
            <ScreenMotif motif={screen.motif} accent={accent} ink={ink} />
            <span
              className="absolute bottom-4 start-4 type-caption"
              style={{ color: accent }}
            >
              {screen.breakpoint}
            </span>
          </div>
        );

        return (
          <Reveal key={screen.id} delay={i * 0.05}>
            {screen.figure ? (
              <Figure
                figure={screen.figure}
                caption={`${screen.label} — ${screen.caption}`}
              >
                {plate}
              </Figure>
            ) : (
              <figure>
                {plate}
                <figcaption className="mt-[var(--space-4)] flex flex-wrap items-baseline gap-x-[var(--space-4)] gap-y-2">
                  <span className="type-nav text-ink">{screen.label}</span>
                  <span className="type-caption">{screen.caption}</span>
                </figcaption>
              </figure>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}

function ScreenMotif({
  motif,
  accent,
  ink,
}: {
  motif: CaseStudyScreen["motif"];
  accent: string;
  ink: string;
}) {
  if (motif === "hero-stage") {
    return (
      <>
        <div
          className="absolute left-1/2 top-[42%] h-[38%] w-[28%] max-w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{ borderColor: accent }}
        />
        <div
          className="absolute inset-x-[12%] bottom-[18%] h-px"
          style={{ backgroundColor: `${ink}33` }}
        />
      </>
    );
  }

  if (motif === "archive") {
    return (
      <>
        {[0, 1, 2, 3].map((row) => (
          <div
            key={row}
            className="absolute inset-x-[10%] h-px"
            style={{ top: `${28 + row * 14}%`, backgroundColor: `${accent}44` }}
          />
        ))}
        <div
          className="absolute end-[12%] top-[28%] bottom-[22%] w-[22%] border"
          style={{ borderColor: `${accent}66` }}
        />
      </>
    );
  }

  if (motif === "detail") {
    return (
      <>
        <div
          className="absolute inset-y-[16%] start-[10%] w-[40%] rounded-full border"
          style={{ borderColor: accent, opacity: 0.8 }}
        />
        <div className="absolute inset-y-[20%] end-[10%] start-[58%] space-y-3 pt-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-px w-full"
              style={{ backgroundColor: `${ink}22` }}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="absolute inset-x-[14%] top-[22%] h-px"
        style={{ backgroundColor: `${accent}66` }}
      />
      <div
        className="absolute inset-x-[14%] top-[38%] bottom-[24%] border"
        style={{ borderColor: `${ink}18` }}
      />
      <div
        className="absolute inset-x-[14%] bottom-[14%] h-8"
        style={{ backgroundColor: accent }}
      />
    </>
  );
}
