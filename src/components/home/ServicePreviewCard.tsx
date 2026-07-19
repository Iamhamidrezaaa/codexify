import type { ServiceItem } from "@/lib/constants";

const CARD_BG: Record<ServiceItem["card"], string> = {
  lime: "linear-gradient(145deg, #c8f02d 0%, #dfff55 55%, #b8e020 100%)",
  blue: "linear-gradient(145deg, #2f6bff 0%, #1e4fd6 100%)",
  cyan: "linear-gradient(145deg, #2de0d2 0%, #14b8c4 55%, #0ea5b5 100%)",
  violet: "linear-gradient(145deg, #8b5cf6 0%, #6d28d9 100%)",
};

function CardMark({ variant }: { variant: ServiceItem["card"] }) {
  if (variant === "lime") {
    return (
      <svg viewBox="0 0 48 48" className="size-12 opacity-35" aria-hidden>
        <path
          d="M12 10h14c6 0 10 3.5 10 8.8 0 3.6-2 6.2-5.2 7.5L38 38h-7.2L22.5 28H18v10h-6V10Zm6 5.2v7.4h6.4c2.8 0 4.4-1.3 4.4-3.7s-1.6-3.7-4.4-3.7H18Z"
          fill="#0a3d14"
        />
      </svg>
    );
  }

  if (variant === "blue") {
    return (
      <div className="relative size-14" aria-hidden>
        <span className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c8f02d]" />
        <span className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0a0b0a]" />
        <svg
          viewBox="0 0 40 40"
          className="absolute -right-1 bottom-0 size-10 opacity-40"
        >
          <path
            d="M20 4c2 6 6 10 12 12-6 2-10 6-12 12-2-6-6-10-12-12 6-2 10-6 12-12Z"
            fill="#0b1f66"
          />
        </svg>
      </div>
    );
  }

  if (variant === "cyan") {
    return (
      <svg viewBox="0 0 48 48" className="size-12 opacity-40" aria-hidden>
        <circle cx="24" cy="24" r="14" fill="none" stroke="#06363a" strokeWidth="3" />
        <circle cx="24" cy="24" r="5" fill="#06363a" />
        <path
          d="M24 6v6M24 36v6M6 24h6M36 24h6"
          stroke="#06363a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className="size-12 opacity-40" aria-hidden>
      <path
        d="M10 34 24 8l14 26H10Zm8.5-6h11L24 16 18.5 28Z"
        fill="#2e1065"
      />
      <circle cx="36" cy="14" r="5" fill="#2e1065" opacity="0.7" />
    </svg>
  );
}

export function ServicePreviewCard({ item }: { item: ServiceItem }) {
  const ink =
    item.card === "lime" || item.card === "cyan" ? "text-[#0a0b0a]" : "text-white";
  const mute =
    item.card === "lime" || item.card === "cyan"
      ? "text-[#0a0b0a]/70"
      : "text-white/75";

  return (
    <div
      dir="ltr"
      className="relative flex h-[132px] w-[210px] flex-col justify-between overflow-hidden rounded-2xl p-4 shadow-[0_18px_40px_rgba(0,0,0,0.35)] md:h-[150px] md:w-[240px] md:p-5"
      style={{ background: CARD_BG[item.card] }}
    >
      <p className={`text-[11px] font-semibold tracking-wide ${mute}`}>
        {item.num} / SERVICE
      </p>
      <div className="flex items-end justify-between gap-3">
        <p
          className={`max-w-[9.5rem] text-base font-extrabold leading-snug md:text-lg ${ink}`}
        >
          {item.title}
        </p>
        <CardMark variant={item.card} />
      </div>
    </div>
  );
}
