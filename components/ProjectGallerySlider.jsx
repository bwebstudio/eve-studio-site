"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Editorial gallery slider used inside case studies that prefer a
 * single immersive frame over a stacked grid. The viewport keeps a
 * fixed aspect ratio so portrait and landscape source frames sit on
 * the same rhythm (object-cover unifies the crop). Counter, segmented
 * progress and minimal arrows match the rest of the site's editorial
 * controls — thin lines, uppercase tracking, no chrome.
 */
export default function ProjectGallerySlider({ items, projectTitle }) {
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -5% 0px",
  });

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const total = items.length;
  const current = items[index];

  const goTo = useCallback(
    (next) => {
      const wrapped = ((next % total) + total) % total;
      setDirection(wrapped > index || (index === total - 1 && wrapped === 0) ? 1 : -1);
      setIndex(wrapped);
    },
    [index, total]
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  // Keyboard navigation — only when the slider is visible on screen,
  // so it doesn't steal arrow keys from the page when scrolled away.
  useEffect(() => {
    if (!inView) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, prev, next]);

  const counter = useMemo(
    () => ({
      current: String(index + 1).padStart(2, "0"),
      total: String(total).padStart(2, "0"),
    }),
    [index, total]
  );

  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? "8%" : "-8%",
      scale: 1.04,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 1.0, ease: EASE },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? "-6%" : "6%",
      scale: 1.02,
      transition: { duration: 0.7, ease: EASE },
    }),
  };

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 1.0, ease: EASE }}
      className="mt-12 md:mt-16"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${projectTitle} — editorial gallery`}
    >
      {/* Viewport */}
      <div
        className="relative w-full overflow-hidden bg-ink/5 aspect-[4/3] md:aspect-[16/10]"
        data-cursor="media"
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              const threshold = 80;
              if (info.offset.x < -threshold || info.velocity.x < -500) next();
              else if (info.offset.x > threshold || info.velocity.x > 500) prev();
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <img
              src={current.src}
              alt={current.alt || `${projectTitle} — ${index + 1}`}
              loading="lazy"
              decoding="async"
              draggable="false"
              className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Edge click zones — hover-only invitation, kept invisible
            so the image itself stays the hero. Desktop niceity. */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-0 top-0 hidden h-full w-[18%] cursor-w-resize md:block"
        />
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-0 top-0 hidden h-full w-[18%] cursor-e-resize md:block"
        />
      </div>

      {/* Controls strip */}
      <div className="mt-5 grid grid-cols-12 items-center gap-4 md:mt-6 md:gap-6">
        {/* Counter */}
        <div className="col-span-4 flex items-baseline gap-2 text-[11px] uppercase tracking-[0.24em] text-ink/55 md:col-span-3">
          <span className="text-ink" style={{ fontWeight: 500 }}>
            {counter.current}
          </span>
          <span className="h-px w-4 bg-ink/30" aria-hidden="true" />
          <span>{counter.total}</span>
        </div>

        {/* Progress segments — clickable to jump directly to any slide */}
        <div
          className="col-span-4 flex items-center gap-1.5 md:col-span-6 md:gap-2"
          role="tablist"
          aria-label="Gallery progress"
        >
          {items.map((it, i) => {
            const active = i === index;
            return (
              <button
                key={it.src || i}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className="group relative h-4 flex-1"
              >
                <span className="absolute left-0 right-0 top-1/2 block h-px -translate-y-1/2 bg-ink/20 transition-colors group-hover:bg-ink/40" />
                <span
                  className={`absolute left-0 top-1/2 block h-px -translate-y-1/2 bg-ink transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Prev / Next */}
        <div className="col-span-4 flex items-center justify-end gap-2 md:col-span-3 md:gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            data-cursor="cta"
            data-magnetic="0.2"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:-translate-x-0.5"
            >
              <path
                d="M8.5 2.5L4 7l4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            data-cursor="cta"
            data-magnetic="0.2"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:translate-x-0.5"
            >
              <path
                d="M5.5 2.5L10 7l-4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Caption — quiet, optional */}
      {current.alt && (
        <p
          key={`caption-${index}`}
          className="mt-4 max-w-[60ch] text-[12px] text-ink/55 md:mt-5 md:text-[13px]"
          style={{ lineHeight: 1.5 }}
        >
          {current.alt}
        </p>
      )}
    </motion.div>
  );
}
