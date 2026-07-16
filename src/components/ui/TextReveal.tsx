"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, textReveal } from "@/design/motion";
import { cn } from "@/design/utilities/cn";

type TextRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitBy?: "words" | "lines";
  id?: string;
};

/**
 * Editorial text reveal — word/line stagger with mask.
 */
export function TextReveal({
  text,
  className,
  as: Tag = "h2",
  splitBy = "words",
  id,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const units = splitBy === "lines" ? text.split("\n") : text.split(" ");

  if (prefersReducedMotion) {
    return (
      <Tag id={id} className={cn(className, splitBy === "lines" && "whitespace-pre-line")}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={cn(className)} aria-label={text.replace(/\n/g, " ")}>
      <motion.span
        className={cn(
          splitBy === "lines" ? "flex flex-col" : "flex flex-wrap",
        )}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        {units.map((unit, index) => (
          <span key={`${unit}-${index}`} className="overflow-hidden">
            <motion.span
              className="inline-block will-change-transform"
              variants={textReveal}
              aria-hidden
            >
              {unit}
              {splitBy === "words" && index < units.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
