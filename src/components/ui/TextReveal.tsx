"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, textReveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  splitBy?: "words" | "lines";
  id?: string;
};

export function TextReveal({
  text,
  className,
  as: Tag = "h2",
  splitBy = "words",
  id,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const units =
    splitBy === "lines" ? text.split("\n") : text.split(" ");

  if (prefersReducedMotion) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={cn("flex flex-wrap", className)} aria-label={text}>
      <motion.span
        className="flex flex-wrap"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {units.map((unit, index) => (
          <span key={`${unit}-${index}`} className="overflow-hidden">
            <motion.span
              className="inline-block"
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
