"use client";

import { useCallback, useRef, useState } from "react";

type Line = {
  text: string;
  className?: string;
};

const TATWEEL = "ـ";
const ZWNJ = "\u200c";

/** Does not join to the following character */
const NO_JOIN_AFTER = new Set([
  "ا",
  "أ",
  "إ",
  "آ",
  "د",
  "ذ",
  "ر",
  "ز",
  "ژ",
  "و",
  "ؤ",
  "ء",
  "ة",
  "ى",
  " ",
  ZWNJ,
  ".",
  "،",
  ":",
  "!",
  "؟",
]);

function joinsToNext(ch: string, next: string | undefined) {
  if (!next || next === " " || next === ZWNJ) return false;
  if (NO_JOIN_AFTER.has(ch)) return false;
  return true;
}

function isLetter(ch: string) {
  return ch !== " " && ch !== ZWNJ && ch !== TATWEEL;
}

/** Stretch with tatweel: end → before letter; start/middle → after letter */
function withKashida(word: string, index: number): string {
  const chars = [...word];
  if (index < 0 || index >= chars.length || !isLetter(chars[index])) return word;

  const next = chars[index + 1];
  const atEnd = index === chars.length - 1 || next === " ";
  const stretchAfter = !atEnd && joinsToNext(chars[index], next);
  const k = [TATWEEL, TATWEEL];

  if (stretchAfter) chars.splice(index + 1, 0, ...k);
  else chars.splice(index, 0, ...k);

  return chars.join("");
}

function isStickyLetter(ch: string) {
  return NO_JOIN_AFTER.has(ch) && isLetter(ch);
}

type Group = { text: string; start: number; sticky: boolean };

function joinGroups(word: string): Group[] {
  const chars = [...word];
  const groups: Group[] = [];
  let buf = "";
  let start = 0;

  for (let i = 0; i < chars.length; i++) {
    if (!buf) start = i;
    buf += chars[i];
    if (!joinsToNext(chars[i], chars[i + 1])) {
      const letters = [...buf].filter(isLetter);
      groups.push({
        text: buf,
        start,
        sticky: letters.length === 1 && isStickyLetter(letters[0]!),
      });
      buf = "";
    }
  }
  return groups;
}

type Active = {
  line: number;
  word: number;
  char: number;
  dir: number;
} | null;

export function MagneticTitle({
  lines,
  className = "",
}: {
  lines: Line[];
  className?: string;
}) {
  const [active, setActive] = useState<Active>(null);
  const rootRef = useRef<HTMLHeadingElement>(null);
  const lastX = useRef(0);

  const onLeave = useCallback(() => setActive(null), []);

  const onMove = useCallback((e: React.PointerEvent) => {
    const dir = e.movementX || e.clientX - lastX.current;
    lastX.current = e.clientX;

    const doc = document as Document & {
      caretPositionFromPoint?: (
        x: number,
        y: number,
      ) => { offsetNode: Node; offset: number } | null;
      caretRangeFromPoint?: (x: number, y: number) => Range | null;
    };

    let node: Node | null = null;
    let offset = 0;

    if (doc.caretPositionFromPoint) {
      const pos = doc.caretPositionFromPoint(e.clientX, e.clientY);
      if (pos) {
        node = pos.offsetNode;
        offset = pos.offset;
      }
    } else if (doc.caretRangeFromPoint) {
      const range = doc.caretRangeFromPoint(e.clientX, e.clientY);
      if (range) {
        node = range.startContainer;
        offset = range.startOffset;
      }
    }

    if (!node || node.nodeType !== Node.TEXT_NODE) return;

    const wordEl = (node.parentElement as HTMLElement | null)?.closest(
      "[data-hero-word]",
    ) as HTMLElement | null;
    if (!wordEl || !rootRef.current?.contains(wordEl)) return;

    const line = Number(wordEl.dataset.line);
    const word = Number(wordEl.dataset.wi);
    const original = wordEl.dataset.original ?? "";
    const text = node.textContent ?? "";

    // Map caret in (possibly stretched) text → original grapheme index
    let oi = 0;
    let ti = 0;
    const target = Math.min(offset, text.length);
    while (ti < target && oi < original.length) {
      if (text[ti] === TATWEEL) {
        ti++;
        continue;
      }
      ti++;
      oi++;
    }
    const char = Math.max(0, Math.min(original.length - 1, oi > 0 ? oi - 1 : 0));

    setActive({ line, word, char, dir });
  }, []);

  return (
    <h1
      ref={rootRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`flex w-full flex-col items-start gap-10 text-right md:gap-14 ${className}`}
    >
      {lines.map((line, li) => {
        const parts = line.text.split(/(\s+)/);
        let wordCounter = -1;

        return (
          <span key={li} className={`block w-full ${line.className ?? ""}`}>
            {parts.map((token, ti) => {
              if (/^\s+$/.test(token)) {
                return <span key={`${li}-s-${ti}`}>{token}</span>;
              }

              wordCounter += 1;
              const wi = wordCounter;
              const isHot = active?.line === li && active.word === wi;
              const chars = [...token];
              const hoverCh = isHot ? chars[active.char] : null;
              const stickyHover = !!(hoverCh && isStickyLetter(hoverCh));

              // Connecting letters → single text node + kashida (keeps joining)
              if (!isHot || !stickyHover) {
                const shown =
                  isHot && !stickyHover ? withKashida(token, active.char) : token;
                return (
                  <span
                    key={`${li}-w-${ti}`}
                    data-hero-word
                    data-line={li}
                    data-wi={wi}
                    data-original={token}
                    className="inline-block whitespace-nowrap transition-all duration-200 ease-out"
                  >
                    {shown}
                  </span>
                );
              }

              // Non-joining letter (ز، د، …) → stick toward neighbor by mouse dir
              const groups = joinGroups(token);
              // screen-right (+) → toward left neighbor → negative translate in LTR inline
              const pull = -Math.sign(active.dir || 0) * 12;

              return (
                <span
                  key={`${li}-w-${ti}`}
                  data-hero-word
                  data-line={li}
                  data-wi={wi}
                  data-original={token}
                  className="inline-block whitespace-nowrap"
                >
                  {groups.map((g, gi) => {
                    const inGroup =
                      active.char >= g.start &&
                      active.char < g.start + [...g.text].length;
                    const move = g.sticky && inGroup ? pull : 0;
                    return (
                      <span
                        key={gi}
                        className="inline-block transition-transform duration-200 ease-out will-change-transform"
                        style={{
                          transform: move
                            ? `translate3d(${move}px, 0, 0)`
                            : undefined,
                        }}
                      >
                        {g.text}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
