"use client";

import {
  AnimatePresence,
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenisProgress } from "@/hooks/useLenisProgress";
import { PROJECTS } from "@/lib/constants";

type Project = (typeof PROJECTS)[number];

function ProjectCard({
  project,
  tall = false,
}: {
  project: Project;
  tall?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-card p-3.5 transition hover:border-lime/40 md:p-4">
      <div
        className={`relative mb-2.5 overflow-hidden rounded-lg bg-[#141614] ${
          tall ? "h-52" : "h-28 md:h-32"
        }`}
      >
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-lime" />
      </div>
      <p className="text-[11px] font-medium text-lime">{project.tag}</p>
      <h3 className="mt-0.5 text-lg font-bold text-white md:text-xl">
        {project.name}
      </h3>
      <p className="mt-0.5 text-xs text-white/70 md:text-sm" dir="ltr">
        {project.host}
      </p>
    </article>
  );
}

function WorkCard({
  project,
  progress,
  index,
}: {
  project: Project;
  progress: MotionValue<number>;
  index: number;
}) {
  const start = 0.01 + index * 0.028;
  const end = Math.min(start + 0.05, 0.24);

  const opacity = useTransform(
    progress,
    [0, start, end],
    [index === 0 ? 0.7 : 0, index === 0 ? 0.85 : 0, 1],
  );
  const y = useTransform(progress, [0, start, end], [28, 28, 0]);

  return (
    <motion.div style={{ opacity, y }} className="h-full">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <ProjectCard project={project} />
      </a>
    </motion.div>
  );
}

const AUTO_MS = 2500;

function WorkMobileCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const pauseUntil = useRef(0);
  const count = PROJECTS.length;

  useEffect(() => {
    const id = window.setInterval(() => {
      if (Date.now() < pauseUntil.current) return;
      setDir(1);
      setIndex((i) => (i + 1) % count);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [count]);

  const goTo = (next: number) => {
    pauseUntil.current = Date.now() + 4000;
    setDir(next > index || (index === count - 1 && next === 0) ? 1 : -1);
    setIndex(next);
  };

  const step = (delta: number) => {
    pauseUntil.current = Date.now() + 4000;
    setDir(delta);
    setIndex((i) => (i + delta + count) % count);
  };

  const project = PROJECTS[index]!;

  return (
    <div className="flex min-h-0 flex-1 flex-col md:hidden">
      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={project.host}
            custom={dir}
            initial={{ opacity: 0, x: dir > 0 ? 48 : -48, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: dir > 0 ? -36 : 36, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <ProjectCard project={project} tall />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex shrink-0 items-center justify-between gap-4">
        <button
          type="button"
          aria-label="قبلی"
          onClick={() => step(-1)}
          className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-lime/50 hover:text-lime"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M9 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="نمونه‌کارها">
          {PROJECTS.map((p, i) => {
            const active = i === index;
            return (
              <button
                key={p.host}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={p.name}
                onClick={() => goTo(i)}
                className="group relative flex h-8 items-center justify-center px-0.5"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    active
                      ? "h-2 w-6 bg-lime shadow-[0_0_12px_var(--lime)]"
                      : "size-2 bg-white/25 group-hover:bg-white/45"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="بعدی"
          onClick={() => step(1)}
          className="grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition hover:border-lime/50 hover:text-lime"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M15 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

/**
 * دسکتاپ: گرید ۶ کارت
 * موبایل: اسلایدر تک‌کارت با اتوپلی ۱ثانیه + نقطه/فلش
 */
export function Work() {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useLenisProgress(ref);

  const titleOp = useTransform(scrollYProgress, [0, 0.04], [0.85, 1]);

  return (
    <section
      ref={ref}
      className="relative z-30 -mt-[50dvh] h-[180vh] bg-bg"
    >
      <div
        id="work"
        className="pointer-events-none absolute inset-x-0 top-[30%] h-px"
        aria-hidden
      />
      <div className="sticky top-0 flex h-dvh flex-col overflow-hidden bg-bg px-5 pt-[5.25rem] pb-10 md:px-16 md:pb-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-[1360px] min-h-0 flex-1 flex-col">
          <div className="flex h-[5.5rem] shrink-0 items-center md:h-[6.25rem]">
            <motion.h2
              style={{ opacity: titleOp }}
              className="text-2xl font-extrabold tracking-tight text-white md:text-4xl"
            >
              نمونه‌کارها
            </motion.h2>
          </div>

          <WorkMobileCarousel />

          <div className="hidden min-h-0 flex-1 grid-rows-2 content-stretch gap-3 sm:grid-cols-2 md:grid md:gap-3.5 lg:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <WorkCard
                key={project.host}
                project={project}
                progress={scrollYProgress}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
