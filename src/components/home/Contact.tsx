"use client";

import { FormEvent, useState } from "react";
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/constants";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();
    const text = encodeURIComponent(
      `سلام، من ${name} هستم.\nشماره: ${phone}\n\n${message}`,
    );
    window.open(`${WHATSAPP_URL}?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="contact" className="bg-bg px-5 py-24 md:px-16 lg:px-20">
      <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="flex flex-col justify-center text-right">
          <h2 className="text-3xl font-extrabold tracking-tight text-fg md:text-5xl">
            بیا درباره پروژه‌ات حرف بزنیم.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-muted">
            واتساپ سریع‌ترین راه است. اگر ترجیح می‌دهی، فرم درخواست را هم پر کن.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full bg-lime px-6 py-3.5 text-sm font-bold text-lime-ink transition hover:brightness-110"
          >
            واتساپ: {WHATSAPP_DISPLAY}
          </a>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-[20px] border border-line bg-card p-6"
        >
          <label className="mb-3 block">
            <span className="sr-only">نام</span>
            <input
              name="name"
              required
              placeholder="نام"
              className="w-full rounded-xl border-0 bg-[#1a1b1a] px-4 py-3.5 text-right text-sm text-fg outline-none ring-1 ring-transparent placeholder:text-muted focus:ring-lime/50"
            />
          </label>
          <label className="mb-3 block">
            <span className="sr-only">شماره تماس</span>
            <input
              name="phone"
              required
              placeholder="شماره تماس"
              className="w-full rounded-xl border-0 bg-[#1a1b1a] px-4 py-3.5 text-right text-sm text-fg outline-none ring-1 ring-transparent placeholder:text-muted focus:ring-lime/50"
            />
          </label>
          <label className="mb-4 block">
            <span className="sr-only">توضیح کوتاه پروژه</span>
            <textarea
              name="message"
              required
              rows={3}
              placeholder="توضیح کوتاه پروژه"
              className="w-full resize-none rounded-xl border-0 bg-[#1a1b1a] px-4 py-3.5 text-right text-sm text-fg outline-none ring-1 ring-transparent placeholder:text-muted focus:ring-lime/50"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-xl bg-lime py-3.5 text-sm font-bold text-lime-ink transition hover:brightness-110"
          >
            {sent ? "در واتساپ باز شد" : "ارسال درخواست"}
          </button>
        </form>
      </div>
    </section>
  );
}
