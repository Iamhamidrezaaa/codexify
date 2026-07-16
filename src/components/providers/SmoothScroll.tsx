"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

type SmoothScrollProps = {
  children: React.ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.07,
        duration: 1.5,
        smoothWheel: true,
        wheelMultiplier: 0.75,
      }}
    >
      {children}
    </ReactLenis>
  );
}
