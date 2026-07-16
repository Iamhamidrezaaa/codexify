"use client";

import { InteractionCard } from "@/lab/playground/InteractionCard";
import {
  Interaction001,
  Interaction002,
  Interaction003,
  Interaction004,
  Interaction005,
  Interaction006,
  Interaction007,
  Interaction008,
  Interaction009,
  Interaction010,
} from "@/lab";
import {
  meta001,
  meta002,
  meta003,
  meta004,
  meta005,
  meta006,
  meta007,
  meta008,
  meta009,
  meta010,
} from "@/lab/registry-meta";

const STORY = [
  {
    title: "ورود",
    body: "اولین قاب باید سکوت را معرفی کند — نه محصول را.",
  },
  {
    title: "تنش",
    body: "ریتم اسکرول فشرده می‌شود تا کنجکاوی ساخته شود.",
  },
  {
    title: "رهاسازی",
    body: "فضا دوباره باز می‌شود؛ مخاطب نفس می‌کشد.",
  },
];

const GALLERY = [
  { id: "A1", label: "سنگ", tone: "#0a0a0a" },
  { id: "A2", label: "خاک", tone: "#5a5954" },
  { id: "A3", label: "رس", tone: "#b8472a" },
  { id: "A4", label: "کاغذ", tone: "#d0cfc8" },
  { id: "A5", label: "جوهر", tone: "#3d3c38" },
];

export default function LabPage() {
  return (
    <main className="pb-[var(--space-12)] pt-[var(--space-8)]">
      <header className="mb-[var(--space-10)] border-b border-border pb-[var(--space-8)]">
        <p className="type-overline mb-[var(--space-4)]">Sprint 0.9</p>
        <h1 className="type-heading max-w-[var(--measure-wide)] text-ink">
          Interaction Laboratory
        </h1>
        <p className="type-body-lg mt-[var(--space-5)] max-w-[var(--measure)] text-muted">
          آزمایشگاه داخلی کدکسیفای برای اختراع، سنجش و پالایش تعامل‌ها.
          اینجا گالری کامپوننت نیست — میز کار استودیو است.
        </p>
      </header>

      <InteractionCard meta={meta001}>
        <Interaction001
          text="کدکسیفای"
          className="type-display text-ink"
          strength={16}
        />
        <p className="type-caption mt-[var(--space-4)]">
          اشاره‌گر را روی حروف حرکت دهید.
        </p>
      </InteractionCard>

      <InteractionCard meta={meta002}>
        <Interaction002
          text="وزن تایپ زنده است"
          className="type-heading text-ink"
        />
        <p className="type-caption mt-[var(--space-4)]">
          هاور یا فوکوس کیبورد.
        </p>
      </InteractionCard>

      <InteractionCard meta={meta003}>
        <Interaction003
          text="متن از میان ماسک هندسی آشکار می‌شود."
          className="type-heading text-ink"
        />
      </InteractionCard>

      <InteractionCard meta={meta004}>
        <Interaction004 tone="ink" />
      </InteractionCard>

      <InteractionCard meta={meta005}>
        <Interaction005 href="/lab">شروع یک آزمایش</Interaction005>
      </InteractionCard>

      <InteractionCard meta={meta006}>
        <p className="type-display text-ink">
          <Interaction006 value={2026} />
        </p>
      </InteractionCard>

      <InteractionCard meta={meta007}>
        <Interaction007 chapters={STORY} />
      </InteractionCard>

      <InteractionCard meta={meta008}>
        <Interaction008 items={GALLERY} />
      </InteractionCard>

      <InteractionCard meta={meta009}>
        <Interaction009 />
        <p className="type-caption mt-[var(--space-4)]">
          نویز یک‌بار محو می‌شود — رفرش برای تکرار.
        </p>
      </InteractionCard>

      <InteractionCard meta={meta010}>
        <Interaction010>آزمایش کنید</Interaction010>
      </InteractionCard>
    </main>
  );
}
