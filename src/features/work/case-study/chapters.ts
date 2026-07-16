import type { PublicationChapter } from "./types";

/** Canonical chapter spine — same IDs for every study */
export const PUBLICATION_CHAPTER_IDS = [
  "hero",
  "challenge",
  "discovery",
  "direction",
  "system",
  "screens",
  "interactions",
  "reflection",
  "outcome",
] as const;

export type PublicationChapterId = (typeof PUBLICATION_CHAPTER_IDS)[number];

export function buildChapters(
  titles: Record<Exclude<PublicationChapterId, "hero">, string>,
): PublicationChapter[] {
  return [
    { id: "hero", index: "۰۱", title: "آغاز" },
    { id: "challenge", index: "۰۲", title: titles.challenge },
    { id: "discovery", index: "۰۳", title: titles.discovery },
    { id: "direction", index: "۰۴", title: titles.direction },
    { id: "system", index: "۰۵", title: titles.system },
    { id: "screens", index: "۰۶", title: titles.screens },
    { id: "interactions", index: "۰۷", title: titles.interactions },
    { id: "reflection", index: "۰۸", title: titles.reflection },
    { id: "outcome", index: "۰۹", title: titles.outcome },
  ];
}
