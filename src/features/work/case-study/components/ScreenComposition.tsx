"use client";

import { cn } from "@/design/utilities/cn";
import { Reveal } from "@/components/ui/Reveal";
import { Figure } from "./Figure";
import type { CaseStudyScreen, PublicationTheme } from "../types";

type ScreenCompositionProps = {
  screens: CaseStudyScreen[];
  theme?: PublicationTheme;
  className?: string;
  /** Wider vertical pauses — architectural monograph rhythm */
  spacing?: "default" | "open";
};

/**
 * Selected frames as immersive panels — no browser chrome.
 * Figure numbers when provided on screen data.
 */
export function ScreenComposition({
  screens,
  theme,
  className,
  spacing = "default",
}: ScreenCompositionProps) {
  const ground = theme?.ground ?? "#0B0B0C";
  const accent = theme?.accent ?? "#8A9199";
  const ink = theme?.ink ?? "#EDEAE4";
  const surface = theme?.surface ?? ground;

  return (
    <div
      className={cn(
        spacing === "open" ? "space-y-[var(--space-12)]" : "space-y-[var(--space-10)]",
        className,
      )}
    >
      {screens.map((screen, i) => {
        const plate = (
          <div
            className={cn(
              "relative w-full overflow-hidden border border-[color:var(--hairline)] shadow-architectural",
              screen.breakpoint === "desktop" && "aspect-[16/10]",
              screen.breakpoint === "tablet" && "aspect-[4/3] max-w-2xl",
              screen.breakpoint === "mobile" && "aspect-[9/16] max-w-xs",
            )}
            style={{ backgroundColor: ground }}
            role="img"
            aria-label={screen.label}
          >
            <ScreenMotif
              motif={screen.motif}
              accent={accent}
              ink={ink}
              surface={surface}
            />
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
  surface,
}: {
  motif: CaseStudyScreen["motif"];
  accent: string;
  ink: string;
  surface: string;
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

  if (motif === "corridor") {
    return (
      <>
        <div
          className="absolute inset-y-[14%] start-[18%] end-[18%] border-x"
          style={{ borderColor: `${ink}18` }}
        />
        <div
          className="absolute inset-x-[18%] top-[36%] bottom-[22%]"
          style={{
            background: `linear-gradient(180deg, ${surface} 0%, transparent 55%)`,
          }}
        />
        <div
          className="absolute inset-x-[28%] bottom-[22%] top-[48%] border"
          style={{ borderColor: `${accent}50` }}
        />
        <div
          className="absolute inset-x-[12%] bottom-[14%] h-px"
          style={{ backgroundColor: `${ink}28` }}
        />
      </>
    );
  }

  if (motif === "monograph") {
    return (
      <>
        {[0, 1, 2, 3, 4].map((row) => (
          <div
            key={row}
            className="absolute start-[12%] end-[40%] h-px"
            style={{
              top: `${24 + row * 12}%`,
              backgroundColor: `${ink}16`,
            }}
          />
        ))}
        <div
          className="absolute end-[12%] top-[24%] bottom-[20%] w-[22%]"
          style={{ backgroundColor: `${accent}22` }}
        />
        <div
          className="absolute end-[12%] top-[24%] w-[22%] h-px"
          style={{ backgroundColor: accent }}
        />
      </>
    );
  }

  if (motif === "section-cut") {
    return (
      <>
        <div
          className="absolute inset-x-[14%] bottom-[16%] top-[26%] border"
          style={{ borderColor: `${ink}20` }}
        />
        <div
          className="absolute inset-x-[14%] top-[40%] h-px"
          style={{ backgroundColor: accent, opacity: 0.55 }}
        />
        <div
          className="absolute inset-y-[26%] start-[42%] w-px"
          style={{ backgroundColor: `${ink}30` }}
        />
        <div
          className="absolute start-[14%] end-[58%] top-[26%] bottom-[50%]"
          style={{
            background: `linear-gradient(90deg, ${accent}14, transparent)`,
          }}
        />
      </>
    );
  }

  if (motif === "threshold") {
    return (
      <>
        <div
          className="absolute inset-y-[16%] start-[50%] w-px"
          style={{ backgroundColor: `${ink}25` }}
        />
        <div
          className="absolute inset-y-[22%] start-[14%] end-[50%] border"
          style={{ borderColor: `${accent}40` }}
        />
        <div
          className="absolute inset-x-[14%] bottom-[18%] h-px"
          style={{ backgroundColor: `${accent}55` }}
        />
        <div
          className="absolute end-[18%] bottom-[22%] start-[56%] h-10"
          style={{ backgroundColor: `${accent}30` }}
        />
      </>
    );
  }

  if (motif === "suite") {
    return (
      <>
        <div
          className="absolute inset-[16%_14%]"
          style={{
            background: `radial-gradient(ellipse at 50% 40%, ${accent}20 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-x-[22%] top-[26%] bottom-[28%] border"
          style={{ borderColor: `${ink}12` }}
        />
        <div
          className="absolute inset-x-[22%] top-[26%] h-px"
          style={{ backgroundColor: `${accent}45` }}
        />
      </>
    );
  }

  if (motif === "consult") {
    return (
      <>
        <div
          className="absolute inset-x-[16%] top-[20%] h-px"
          style={{ backgroundColor: `${ink}16` }}
        />
        <div className="absolute inset-x-[16%] top-[32%] space-y-4" aria-hidden>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-px w-full"
              style={{ backgroundColor: `${ink}14` }}
            />
          ))}
        </div>
        <div
          className="absolute inset-x-[16%] bottom-[18%] h-9"
          style={{ backgroundColor: `${accent}35` }}
        />
      </>
    );
  }

  /* inquiry — default contact frame */
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
