"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";
import { Figure } from "@/features/work/case-study";
import type { EditorialDiagramMotif } from "../types";

type EditorialDiagramProps = {
  motif: EditorialDiagramMotif;
  figure?: string;
  caption?: string;
  className?: string;
  ground?: string;
  ink?: string;
  accent?: string;
};

/**
 * Abstract editorial plate — sketches of thinking, not flowcharts.
 * No arrows. No roadmap. No stock metaphor.
 */
export function EditorialDiagram({
  motif,
  figure,
  caption,
  className,
  ground = "#F4F2EE",
  ink = "#1A1A1A",
  accent = "#6B6560",
}: EditorialDiagramProps) {
  const prefersReducedMotion = useReducedMotion();

  const plate = (
    <motion.div
      className="composition-frame relative aspect-[16/10] w-full overflow-hidden shadow-architectural md:aspect-[2/1]"
      style={{ backgroundColor: ground }}
      initial={prefersReducedMotion ? false : { opacity: 0.25 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      role="img"
      aria-label={caption ?? motif}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: ink, mixBlendMode: "soft-light", opacity: 0.03 }}
        aria-hidden
      />
      <Motif motif={motif} ink={ink} accent={accent} />
    </motion.div>
  );

  if (figure && caption) {
    return (
      <Figure figure={figure} caption={caption} className={className}>
        {plate}
      </Figure>
    );
  }

  return (
    <figure className={cn("w-full", className)}>
      {plate}
      {caption ? (
        <figcaption className="type-caption mt-[var(--space-3)] text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Motif({
  motif,
  ink,
  accent,
}: {
  motif: EditorialDiagramMotif;
  ink: string;
  accent: string;
}) {
  switch (motif) {
    case "grid":
      return (
        <>
          {[20, 35, 50, 65, 80].map((x) => (
            <div
              key={`v-${x}`}
              className="absolute inset-y-[14%] w-px"
              style={{
                insetInlineStart: `${x}%`,
                backgroundColor: ink,
                opacity: 0.12,
              }}
            />
          ))}
          {[28, 50, 72].map((y) => (
            <div
              key={`h-${y}`}
              className="absolute inset-x-[12%] h-px"
              style={{ top: `${y}%`, backgroundColor: ink, opacity: 0.12 }}
            />
          ))}
          <div
            className="absolute inset-[28%_20%_28%_35%] border"
            style={{ borderColor: accent, opacity: 0.55 }}
          />
        </>
      );
    case "wireframe":
      return (
        <>
          <div
            className="absolute inset-x-[12%] top-[18%] h-[12%] border"
            style={{ borderColor: `${ink}28` }}
          />
          <div
            className="absolute inset-x-[12%] top-[36%] bottom-[18%] border"
            style={{ borderColor: `${ink}22` }}
          />
          <div
            className="absolute start-[12%] end-[55%] top-[42%] bottom-[28%] border border-dashed"
            style={{ borderColor: `${accent}66` }}
          />
          <div
            className="absolute end-[12%] start-[52%] top-[42%] h-[10%]"
            style={{ backgroundColor: `${accent}22` }}
          />
          <div
            className="absolute end-[12%] start-[52%] top-[56%] bottom-[28%] space-y-2 px-3 pt-2"
            aria-hidden
          >
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-px w-full"
                style={{ backgroundColor: `${ink}18` }}
              />
            ))}
          </div>
        </>
      );
    case "paper":
      return (
        <>
          <div
            className="absolute inset-[16%_18%_22%_14%] border"
            style={{ borderColor: `${ink}18`, backgroundColor: "#FAF8F4" }}
          />
          <div
            className="absolute inset-[22%_22%_28%_20%] border"
            style={{
              borderColor: `${accent}40`,
              backgroundColor: "#F0EDE6",
              transform: "rotate(-1.5deg)",
            }}
          />
          <div
            className="absolute inset-x-[26%] top-[34%] space-y-3"
            aria-hidden
          >
            {[70, 55, 62].map((w, i) => (
              <div
                key={i}
                className="h-px"
                style={{
                  width: `${w}%`,
                  backgroundColor: `${ink}20`,
                }}
              />
            ))}
          </div>
        </>
      );
    case "typography":
      return (
        <>
          <p
            className="absolute start-[14%] top-[22%] font-latin text-[clamp(2.5rem,8vw,5rem)] font-medium leading-none tracking-tight"
            style={{ color: ink, opacity: 0.14 }}
          >
            Aa
          </p>
          <div
            className="absolute inset-x-[14%] bottom-[22%] top-[48%] space-y-4"
            aria-hidden
          >
            <div
              className="h-px w-[42%]"
              style={{ backgroundColor: accent, opacity: 0.7 }}
            />
            <div
              className="h-px w-[68%]"
              style={{ backgroundColor: `${ink}22` }}
            />
            <div
              className="h-px w-[54%]"
              style={{ backgroundColor: `${ink}18` }}
            />
            <div
              className="h-px w-[30%]"
              style={{ backgroundColor: `${ink}14` }}
            />
          </div>
        </>
      );
    case "material":
      return (
        <>
          <div
            className="absolute inset-y-[18%] start-[12%] w-[28%]"
            style={{ backgroundColor: "#E8E4DC" }}
          />
          <div
            className="absolute inset-y-[18%] start-[42%] w-[22%]"
            style={{ backgroundColor: "#D4CFC5" }}
          />
          <div
            className="absolute inset-y-[18%] start-[66%] w-[22%]"
            style={{
              background: `repeating-linear-gradient(0deg, ${accent}30, ${accent}30 1px, transparent 1px, transparent 12px)`,
            }}
          />
          <div
            className="absolute inset-x-[12%] bottom-[14%] h-px"
            style={{ backgroundColor: `${ink}25` }}
          />
        </>
      );
    case "annotation":
      return (
        <>
          <div
            className="absolute inset-[20%_16%_28%_16%] border"
            style={{ borderColor: `${ink}16` }}
          />
          <div
            className="absolute end-[12%] top-[24%] w-[18%] space-y-2"
            aria-hidden
          >
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-px w-full"
                style={{ backgroundColor: `${accent}55` }}
              />
            ))}
          </div>
          <div
            className="absolute start-[22%] top-[36%] h-px w-[28%]"
            style={{ backgroundColor: accent, opacity: 0.45 }}
          />
          <div
            className="absolute start-[48%] top-[36%] h-3 w-3 rounded-full border"
            style={{ borderColor: accent }}
          />
        </>
      );
    default:
      return null;
  }
}
