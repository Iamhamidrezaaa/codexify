/**
 * Shared non-visual helpers.
 * Prefer `@/design/utilities/cn` when styling; this re-export stays for convenience.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
