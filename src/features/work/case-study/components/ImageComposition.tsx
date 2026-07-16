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
  | "grain"
  | "aperture"
  | "elevation"
  | "timber"
  | "shadow-cast"
  | "threshold"
  | "linen"
  | "veil";

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
  material: "timber",
  geometry: "dial",
  typography: "letter",
  architecture: "plan",
  macro: "bezel",
  texture: "grain",
  "negative-space": "veil",
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
  const slow =
    family === "architecture" ||
    family === "negative-space" ||
    family === "material";

  const plate = (
    <motion.div
      className={cn(
        "relative w-full overflow-hidden",
        slow ? "aspect-[3/2] md:aspect-[21/9]" : "aspect-[16/10] md:aspect-[2/1]",
      )}
      style={{ backgroundColor: ground }}
      initial={prefersReducedMotion ? false : { opacity: 0.2 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: slow ? 1.8 : 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      role="img"
      aria-label={caption ?? family}
    >
      <Motif resolved={resolved} accent={accent} ink={ink} />
      <span
        className="absolute top-4 end-4 type-overline opacity-40"
        style={{ color: ink }}
      >
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
              background: `conic-gradient(from 0deg, #161618 0deg, ${accent} 40deg, #161618 80deg, ${accent}66 140deg, #0B0B0C 200deg, ${accent} 280deg, #161618 360deg)`,
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
            className="absolute inset-x-[10%] top-[22%] h-px"
            style={{ backgroundColor: ink, opacity: 0.2 }}
          />
          <div
            className="absolute inset-x-[10%] top-[50%] h-px"
            style={{ backgroundColor: ink, opacity: 0.12 }}
          />
          <div
            className="absolute inset-y-[14%] start-[22%] w-px"
            style={{ backgroundColor: ink, opacity: 0.2 }}
          />
          <div
            className="absolute inset-y-[14%] end-[28%] w-px"
            style={{ backgroundColor: ink, opacity: 0.12 }}
          />
          <div
            className="absolute bottom-[20%] end-[18%] top-[36%] w-[34%] border"
            style={{ borderColor: accent, opacity: 0.85 }}
          />
          <div
            className="absolute bottom-[20%] start-[22%] h-[18%] w-[16%] border border-dashed"
            style={{ borderColor: accent, opacity: 0.45 }}
          />
        </>
      );
    case "aperture":
      return (
        <>
          <div
            className="absolute inset-[18%_22%]"
            style={{
              boxShadow: `inset 0 0 0 1px ${ink}18`,
              background: `linear-gradient(180deg, ${accent}08 0%, transparent 45%, ${ink}06 100%)`,
            }}
          />
          <div
            className="absolute inset-x-[22%] top-[18%] h-px"
            style={{ backgroundColor: accent, opacity: 0.35 }}
          />
          <div
            className="absolute inset-y-[18%] start-[22%] w-px"
            style={{ backgroundColor: accent, opacity: 0.35 }}
          />
        </>
      );
    case "elevation":
      return (
        <>
          <div
            className="absolute inset-x-[16%] bottom-[18%] top-[30%] border"
            style={{ borderColor: `${ink}28` }}
          />
          <div
            className="absolute inset-x-[28%] bottom-[18%] top-[42%] border-x"
            style={{ borderColor: accent, opacity: 0.5 }}
          />
          <div
            className="absolute inset-x-[16%] top-[30%] h-[8%]"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}33, transparent)`,
            }}
          />
          <div
            className="absolute inset-x-[12%] bottom-[14%] h-px"
            style={{ backgroundColor: ink, opacity: 0.35 }}
          />
        </>
      );
    case "timber":
      return (
        <>
          <div
            className="absolute inset-y-[14%] start-[10%] w-[42%]"
            style={{
              background: `repeating-linear-gradient(0deg, ${accent}18, ${accent}18 1px, transparent 1px, transparent 14px)`,
            }}
          />
          <div
            className="absolute inset-y-[20%] end-[12%] start-[58%] border"
            style={{ borderColor: `${ink}22` }}
          />
          <div
            className="absolute bottom-[20%] end-[12%] start-[58%] h-[12%]"
            style={{ backgroundColor: `${accent}28` }}
          />
        </>
      );
    case "shadow-cast":
      return (
        <>
          <div
            className="absolute inset-y-[16%] start-[14%] w-[38%] border"
            style={{ borderColor: `${ink}20` }}
          />
          <div
            className="absolute inset-y-[16%] start-[14%] w-[38%]"
            style={{
              background: `linear-gradient(115deg, transparent 40%, ${ink}10 41%, ${ink}18 100%)`,
            }}
          />
          <div
            className="absolute inset-y-[28%] end-[16%] w-px"
            style={{ backgroundColor: accent, opacity: 0.4 }}
          />
        </>
      );
    case "threshold":
      return (
        <>
          <div
            className="absolute inset-y-[12%] start-[48%] w-px"
            style={{ backgroundColor: ink, opacity: 0.25 }}
          />
          <div
            className="absolute inset-y-[20%] start-[18%] end-[52%] border"
            style={{ borderColor: `${accent}55` }}
          />
          <div
            className="absolute inset-y-[20%] start-[52%] end-[18%]"
            style={{
              background: `linear-gradient(90deg, ${ink}08, transparent 60%)`,
            }}
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
    case "veil":
      return (
        <>
          <div
            className="absolute inset-[12%_10%]"
            style={{
              background: `radial-gradient(ellipse at 50% 42%, ${accent}28 0%, transparent 68%)`,
            }}
          />
          <div
            className="absolute inset-[28%_24%]"
            style={{ boxShadow: `inset 0 0 0 1px ${ink}10` }}
          />
        </>
      );
    case "linen":
      return (
        <>
          <div
            className="absolute inset-y-[16%] start-[12%] end-[12%]"
            style={{
              background: `repeating-linear-gradient(0deg, ${accent}14, ${accent}14 1px, transparent 1px, transparent 18px)`,
            }}
          />
          <div
            className="absolute inset-x-[28%] top-[30%] bottom-[30%] border"
            style={{ borderColor: `${ink}14` }}
          />
          <div
            className="absolute inset-x-[28%] bottom-[30%] h-[14%]"
            style={{
              background: `linear-gradient(180deg, ${accent}18, transparent)`,
            }}
          />
        </>
      );
    case "letter":
      return (
        <p
          className="absolute inset-0 flex items-center justify-center font-latin text-[clamp(4rem,18vw,11rem)] font-medium leading-none"
          style={{ color: ink, opacity: 0.1 }}
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
