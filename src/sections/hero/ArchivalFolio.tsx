"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";

type ArchivalFolioProps = {
  className?: string;
};

/**
 * Dominant Hero Object — layered archival architectural paper.
 * Material: Paper. Form explained by planar value (fold faces), not glow.
 */
export function ArchivalFolio({ className }: ArchivalFolioProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative h-full w-full", className)}
      aria-hidden
      initial={prefersReducedMotion ? false : { opacity: 0.9 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Contact shadow — explains lift, not decoration */}
      <div
        className="absolute inset-[16%_8%_4%_10%]"
        style={{
          backgroundColor: "rgba(26, 24, 22, 0.2)",
          filter: "blur(28px)",
          transform: "translate(12px, 18px)",
        }}
      />

      {/* Rear archive sheet */}
      <div
        className="absolute inset-[11%_3%_14%_18%] bg-[#D4CDC1]"
        style={{
          transform: "rotate(-1.8deg)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)",
        }}
      />

      {/* Primary folio plate */}
      <div
        className="absolute inset-[4%_7%_10%_6%] bg-[#F5F1E8]"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -3px 0 rgba(42,39,37,0.06), 0 1px 0 rgba(42,39,37,0.04)",
        }}
      >
        <div className="absolute inset-[4%] border border-[#2A2725]/[0.11]" />

        {/* Folded wing — value shift = physical light */}
        <div className="absolute inset-y-[5.5%] end-0 w-[40%] bg-[#C9BFAF]" />
        <div
          className="absolute inset-y-[5.5%] end-[40%] w-[2px] bg-[#FBF7EF]"
          style={{ boxShadow: "1px 0 0 rgba(42,39,37,0.22)" }}
        />
        {/* Soft falloff on fold face */}
        <div
          className="absolute inset-y-[5.5%] end-0 w-[40%]"
          style={{
            background:
              "linear-gradient(to left, rgba(42,39,37,0.07), transparent 55%)",
          }}
        />

        {/* Blind stamp */}
        <div
          className="absolute start-[8%] top-[11%] h-[27%] w-[28%]"
          style={{
            backgroundColor: "rgba(42,39,37,0.04)",
            boxShadow:
              "inset 0 2px 4px rgba(42,39,37,0.14), inset 0 -1px 0 rgba(255,255,255,0.5)",
          }}
        />

        {/* Plan fragment */}
        <div className="absolute start-[8%] top-[45%] end-[48%] h-px bg-[#2A2725]/[0.15]" />
        <div className="absolute start-[8%] top-[45%] bottom-[22%] w-px bg-[#2A2725]/[0.15]" />
        <div className="absolute start-[8%] top-[55%] h-[21%] w-[26%] border border-[#2A2725]/[0.17]" />
        <div className="absolute start-[8%] top-[55%] h-[9%] w-[11%] border border-dashed border-[#2A2725]/[0.22]" />

        <div className="absolute start-[8%] bottom-[9%] flex items-center gap-3">
          <span className="h-px w-11 bg-[#2A2725]/[0.42]" />
          <span className="font-latin text-[0.55rem] tracking-[0.22em] text-[#2A2725]/[0.48]">
            FOLIO 01
          </span>
        </div>
      </div>

      {/* Forward slip sheet */}
      <div
        className="absolute bottom-[3%] end-[2%] top-[52%] start-[44%] bg-[#E8E1D4]"
        style={{
          transform: "rotate(2deg)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.55), 0 18px 36px -18px rgba(26,24,22,0.45)",
        }}
      >
        <div className="absolute inset-x-[12%] top-[18%] space-y-3 opacity-[0.3]">
          <div className="h-px w-[80%] bg-[#2A2725]" />
          <div className="h-px w-[62%] bg-[#2A2725]" />
          <div className="h-px w-[74%] bg-[#2A2725]" />
          <div className="h-px w-[48%] bg-[#2A2725]" />
        </div>
        <div className="absolute inset-x-[12%] bottom-[16%] h-px bg-[#2A2725]/[0.22]" />
      </div>

      {/* Registration marks */}
      <div className="absolute start-[1.5%] top-[1.5%] h-3.5 w-3.5 border-s border-t border-[#2A2725]/[0.3]" />
      <div className="absolute end-[1%] top-[1.5%] h-3.5 w-3.5 border-e border-t border-[#2A2725]/[0.22]" />
      <div className="absolute bottom-[1%] end-[1%] h-3.5 w-3.5 border-e border-b border-[#2A2725]/[0.3]" />
      <div className="absolute bottom-[1%] start-[1.5%] h-3.5 w-3.5 border-s border-b border-[#2A2725]/[0.22]" />
    </motion.div>
  );
}
