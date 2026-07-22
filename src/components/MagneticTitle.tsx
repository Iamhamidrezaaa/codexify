"use client";

import { useCallback, useRef, useState } from "react";

type Line = {
  text: string;
  className?: string;
};

const TATWEEL = "ـ";
const ZWNJ = "\u200c";

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

function isStickyLetter(ch: string) {
  return NO_JOIN_AFTER.has(ch) && isLetter(ch);
}

/**
 * کشدیه فقط بین دو حرفی که واقعاً به هم می‌چسبند:
 * می → مـی
 * ا+ل (مثل دیجیتال) → هیچ ـای قبل از ل نگذار (ـل غلط است)
 */
function withKashida(word: string, index: number): string {
  const chars = [...word];
  if (index < 0 || index >= chars.length || !isLetter(chars[index])) return word;
  if (isStickyLetter(chars[index])) return word;

  const ch = chars[index]!;
  const next = chars[index + 1];
  const prev = index > 0 ? chars[index - 1] : undefined;

  /* ترجیح: کشش به سمت حرف بعدی اگر به آن می‌چسبد */
  if (next && isLetter(next) && joinsToNext(ch, next)) {
    chars.splice(index + 1, 0, TATWEEL);
    return chars.join("");
  }

  /* وگرنه: کشش از حرف قبلی اگر قبلی به این حرف می‌چسبد */
  if (prev && isLetter(prev) && joinsToNext(prev, ch)) {
    chars.splice(index, 0, TATWEEL);
    return chars.join("");
  }

  /* جفتی مثل ا+ل: جای معتبر برای ـ نیست */
  return word;
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

type Stretch = {
  line: number;
  word: number;
  char: number;
  dir: number;
  open: boolean;
};

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DUR = "760ms";

export function MagneticTitle({
  lines,
  className = "",
}: {
  lines: Line[];
  className?: string;
}) {
  const [stretch, setStretch] = useState<Stretch | null>(null);
  const rootRef = useRef<HTMLHeadingElement>(null);
  const lastX = useRef(0);
  const leaveTimer = useRef<number | null>(null);

  const onLeave = useCallback(() => {
    setStretch((s) => (s ? { ...s, open: false } : null));
    if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(() => setStretch(null), 760);
  }, []);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (leaveTimer.current) {
      window.clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }

    const dir = e.movementX || e.clientX - lastX.current;
    lastX.current = e.clientX;

    const el = document.elementFromPoint(e.clientX, e.clientY);
    const wordEl = el?.closest("[data-hero-word]") as HTMLElement | null;
    if (!wordEl || !rootRef.current?.contains(wordEl)) return;

    const line = Number(wordEl.dataset.line);
    const word = Number(wordEl.dataset.wi);
    const original = wordEl.dataset.original ?? "";
    const chars = [...original];
    if (!chars.length) return;

    const rect = wordEl.getBoundingClientRect();
    const rel = Math.min(
      1,
      Math.max(0, (e.clientX - rect.left) / Math.max(rect.width, 1)),
    );
    const rtlRel = 1 - rel;
    let char = Math.min(
      chars.length - 1,
      Math.max(0, Math.floor(rtlRel * chars.length)),
    );
    while (char < chars.length - 1 && !isLetter(chars[char]!)) char++;
    while (char > 0 && !isLetter(chars[char]!)) char--;

    setStretch({ line, word, char, dir, open: true });
  }, []);

  return (
    <h1
      ref={rootRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`flex w-full flex-col items-start gap-2 text-right max-md:gap-[4em] md:gap-10 lg:gap-14 ${className}`}
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
              const hot =
                stretch?.line === li && stretch.word === wi ? stretch : null;
              const hoverCh = hot ? [...token][hot.char] : null;
              const stickyHover = !!(hoverCh && isStickyLetter(hoverCh));
              const kashidaForm =
                hot && hot.open ? withKashida(token, hot.char) : token;
              const canKashida = !!(hot?.open && kashidaForm !== token);
              /* مثل ل بعد از ا: ـ نمی‌خورد، ولی باید از حرف پشتش فاصله بگیرد */
              const gapFromPrev =
                !!(hot?.open && !canKashida && !stickyHover && hot.char > 0);

              /* حروف متصل با جای معتبر برای کشدیه */
              if (!hot || (canKashida && !stickyHover && !gapFromPrev)) {
                return (
                  <span
                    key={`${li}-w-${ti}`}
                    data-hero-word
                    data-line={li}
                    data-wi={wi}
                    data-original={token}
                    className="inline-block whitespace-nowrap"
                    style={{
                      letterSpacing: hot?.open && canKashida ? "0.012em" : "0em",
                      transition: `letter-spacing ${DUR} ${EASE}`,
                    }}
                  >
                    <span
                      className="inline-block"
                      style={{
                        transform:
                          hot?.open && canKashida ? "scaleX(1.008)" : "scaleX(1)",
                        transformOrigin: "center",
                        transition: `transform ${DUR} ${EASE}`,
                      }}
                    >
                      {hot?.open && canKashida ? kashidaForm : token}
                    </span>
                  </span>
                );
              }

              /* حروف جدا، یا جفت ا+ل: بدون ـ — گروه هاور از قبلی فاصله می‌گیرد */
              const groups = joinGroups(token);
              const pullDir = -Math.sign(hot.dir || -1);
              const pull = pullDir * (stickyHover ? 4 : 6);

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
                      hot.char >= g.start &&
                      hot.char < g.start + [...g.text].length;
                    const shouldMove =
                      hot.open &&
                      inGroup &&
                      (stickyHover ? g.sticky : gapFromPrev || g.sticky);
                    const move = shouldMove ? pull : 0;
                    return (
                      <span
                        key={gi}
                        className="inline-block will-change-transform"
                        style={{
                          transform: move
                            ? `translate3d(${move}px, 0, 0)`
                            : "translate3d(0, 0, 0)",
                          transition: `transform ${DUR} ${EASE}`,
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
