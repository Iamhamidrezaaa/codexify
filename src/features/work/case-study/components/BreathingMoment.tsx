import { cn } from "@/design/utilities/cn";

type BreathingMomentProps = {
  className?: string;
  /** Visual weight of the pause */
  size?: "sm" | "md" | "lg";
};

/**
 * Intentional blank — chapter air between ideas.
 */
export function BreathingMoment({
  className,
  size = "md",
}: BreathingMomentProps) {
  const height =
    size === "sm"
      ? "h-[var(--space-8)]"
      : size === "lg"
        ? "h-[clamp(4rem,12vh,8rem)]"
        : "h-[clamp(2.5rem,6vh,4rem)]";

  return (
    <div
      className={cn(height, "w-full", className)}
      aria-hidden
      role="presentation"
    />
  );
}
