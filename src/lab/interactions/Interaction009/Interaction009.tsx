"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/design/utilities/cn";

export type NoiseFadeProps = {
  className?: string;
  duration?: number;
  cell?: number;
};

/**
 * Interaction009 — Noise Fade
 * Low-res canvas grain that fades out once.
 */
export function Interaction009({
  className,
  duration = 1.8,
  cell = 4,
}: NoiseFadeProps) {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const buffer = document.createElement("canvas");
    const bctx = buffer.getContext("2d");
    if (!bctx) return;

    let raf = 0;
    let start = 0;
    let running = true;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      buffer.width = Math.max(1, Math.ceil(canvas.width / cell));
      buffer.height = Math.max(1, Math.ceil(canvas.height / cell));
    };

    const paintNoise = (alpha: number) => {
      const { width: bw, height: bh } = buffer;
      const image = bctx.createImageData(bw, bh);
      const data = image.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = (alpha * 255) | 0;
      }
      bctx.putImageData(image, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(buffer, 0, 0, canvas.width, canvas.height);
    };

    const frame = (now: number) => {
      if (!running) return;
      if (!start) start = now;
      const t = Math.min(1, (now - start) / (duration * 1000));
      paintNoise(0.35 * (1 - t));
      if (t < 1) raf = requestAnimationFrame(frame);
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [cell, duration, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "relative aspect-[16/9] w-full max-w-xl bg-canvas-subtle",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[16/9] w-full max-w-xl overflow-hidden bg-ink",
        className,
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="type-title text-canvas">کدکسیفای</p>
      </div>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      />
    </div>
  );
}
