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
      `سلام، ${name} هستم.\nشماره: ${phone}\n\n${message}`,
    );
    window.open(`${WHATSAPP_URL}?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section id="contact" className="bg-bg px-5 py-24 md:px-16 lg:px-20">
      <div className="mx-auto grid max-w-[1360px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="flex flex-col justify-center">
          <div className="flex w-fit flex-col items-center self-start">
            <h2 className="whitespace-nowrap text-3xl font-extrabold tracking-tight text-fg md:text-5xl">
              آماده‌ای شروع کنیم؟
            </h2>
            <p className="mt-4 w-0 min-w-full text-center text-base leading-8 text-muted">
              در واتساپ پیام بده، یا فرم را پر کن. زود جواب می‌دهیم.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-phone-link mt-8 inline-flex w-fit origin-center cursor-pointer items-center justify-center rounded-full bg-lime px-4 py-2 text-[13px] font-bold text-lime-ink"
            >
              <span className="inline-flex items-center" dir="ltr">
                <svg
                  className="size-[1.05em] shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.85 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {"\u00A0\u00A0"}
                {WHATSAPP_DISPLAY}
              </span>
            </a>
          </div>
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
            <span className="sr-only">درباره پروژه</span>
            <textarea
              name="message"
              required
              rows={3}
              placeholder="درباره پروژه"
              className="w-full resize-none rounded-xl border-0 bg-[#1a1b1a] px-4 py-3.5 text-right text-sm text-fg outline-none ring-1 ring-transparent placeholder:text-muted focus:ring-lime/50"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-xl bg-lime py-3.5 text-sm font-bold text-lime-ink transition hover:brightness-110"
          >
            {sent ? "در واتساپ باز شد" : "ارسال"}
          </button>
        </form>
      </div>
    </section>
  );
}
