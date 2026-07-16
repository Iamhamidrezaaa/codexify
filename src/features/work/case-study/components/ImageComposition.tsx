"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";
import { Figure } from "./Figure";
import type { ImageFamily } from "../types";

export type CompositionMotif =
  | "dial"
  | "steel"
  | "void"
  | "bezel"
  | "plan"
  | "crop"
  | "columns"
  | "mist"
  | "letter"
  | "grain";

type ImageCompositionProps = {
  family: ImageFamily;
  motif: CompositionMotif;
  caption?: string;
  figure?: string;
  ground?: string;
  accent?: string;
  ink?: string;
  className?: string;
};

const FAMILY_DEFAULT_MOTIF: Record<ImageFamily, CompositionMotif> = {
  material: "steel",
  geometry: "dial",
  typography: "letter",
  architecture: "plan",
  macro: "bezel",
  texture: "grain",
  "negative-space": "void",
};

/**
 * Publication image system — choose a dominant `family` per study.
 * Motifs are variations within that family. No device mockups.
 */
export function ImageComposition({
  family,
  motif,
  caption,
  figure,
  ground = "#0B0B0C",
  accent = "#8A9199",
  ink = "#EDEAE4",
  className,
}: ImageCompositionProps) {
  const prefersReducedMotion = useReducedMotion();
  const resolved = motif || FAMILY_DEFAULT_MOTIF[family];

  const plate = (
    <motion.div
      className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[2/1]"
      style={{ backgroundColor: ground }}
      initial={prefersReducedMotion ? false : { opacity: 0.35 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      role="img"
      aria-label={caption ?? family}
    >
      <Motif resolved={resolved} accent={accent} ink={ink} />
      <span className="absolute top-4 end-4 type-overline opacity-40" style={{ color: ink }}>
        {family}
      </span>
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
  resolved,
  accent,
  ink,
}: {
  resolved: CompositionMotif;
  accent: string;
  ink: string;
}) {
  switch (resolved) {
    case "dial":
      return (
        <>
          <div
            className="absolute left-1/2 top-1/2 h-[min(52%,280px)] w-[min(52%,280px)] -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{ borderColor: accent }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[min(36%,190px)] w-[min(36%,190px)] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-50"
            style={{ borderColor: ink }}
          />
          <div
            className="absolute left-1/2 top-[28%] h-[22%] w-px origin-bottom -translate-x-1/2"
            style={{ backgroundColor: ink }}
          />
        </>
      );
    case "bezel":
      return (
        <>
          <div
            className="absolute left-1/2 top-1/2 h-[70%] w-[70%] max-h-[340px] max-w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: `conic-gradient(from 0deg, #161618 0deg, ${accent} 40deg, #161618 80deg, ${accent}66 140deg, ${groundFallback(accent)} 200deg, ${accent} 280deg, #161618 360deg)`,
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[48%] w-[48%] max-h-[220px] max-w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: "#0B0B0C" }}
          />
        </>
      );
    case "steel":
      return (
        <>
          <div
            className="absolute inset-y-[18%] start-[12%] end-[42%] border"
            style={{ borderColor: accent, opacity: 0.7 }}
          />
          <div
            className="absolute inset-y-[18%] end-[12%] w-[26%]"
            style={{
              background: `repeating-linear-gradient(90deg, ${accent}22, ${accent}22 1px, transparent 1px, transparent 6px)`,
            }}
          />
        </>
      );
    case "void":
      return (
        <div
          className="absolute inset-[22%_18%]"
          style={{ boxShadow: `inset 0 0 0 1px ${accent}44` }}
        />
      );
    case "plan":
      return (
        <>
          <div
            className="absolute inset-x-[12%] top-[28%] h-px"
            style={{ backgroundColor: ink, opacity: 0.25 }}
          />
          <div
            className="absolute inset-y-[18%] start-[18%] w-px"
            style={{ backgroundColor: ink, opacity: 0.25 }}
          />
          <div
            className="absolute bottom-[22%] end-[16%] top-[34%] w-[38%] border"
            style={{ borderColor: accent }}
          />
        </>
      );
    case "crop":
      return (
        <>
          <div
            className="absolute inset-y-0 end-0 w-[42%]"
            style={{ backgroundColor: accent }}
          />
          <div
            className="absolute inset-y-[12%] start-[10%] w-[36%] border"
            style={{ borderColor: ink, opacity: 0.2 }}
          />
        </>
      );
    case "columns":
      return (
        <>
          {[18, 34, 50, 66].map((left) => (
            <div
              key={left}
              className="absolute bottom-[20%] top-[20%] w-px"
              style={{
                insetInlineStart: `${left}%`,
                backgroundColor: ink,
                opacity: 0.18,
              }}
            />
          ))}
          <div
            className="absolute bottom-[20%] start-[18%] end-[18%] h-px"
            style={{ backgroundColor: accent }}
          />
        </>
      );
    case "mist":
      return (
        <div
          className="absolute inset-[20%] rounded-full opacity-50"
          style={{
            background: `radial-gradient(circle at 40% 40%, ${accent} 0%, transparent 70%)`,
          }}
        />
      );
    case "letter":
      return (
        <p
          className="absolute inset-0 flex items-center justify-center font-latin text-[clamp(4rem,18vw,11rem)] font-bold leading-none"
          style={{ color: ink, opacity: 0.12 }}
        >
          Aa
        </p>
      );
    case "grain":
      return (
        <>
          <div
            className="absolute inset-y-0 start-0 w-[28%]"
            style={{
              background: `repeating-linear-gradient(-12deg, ${accent}22, ${accent}22 2px, transparent 2px, transparent 7px)`,
            }}
          />
          <div
            className="absolute inset-[16%_14%_16%_36%] border"
            style={{ borderColor: ink, opacity: 0.35 }}
          />
        </>
      );
    default:
      return null;
  }
}

function groundFallback(_accent: string) {
  return "#0B0B0C";
}
