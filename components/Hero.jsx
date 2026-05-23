"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useLang from "@/lib/useLang";
import useAppReady from "@/lib/useAppReady";

const VIDEOS = ["/video/video1.mp4", "/video/video2.mp4", "/video/video3.mp4"];
const CYCLE_MS = 5200;
const EASE = [0.22, 1, 0.36, 1];

/**
 * Asymmetric commercial hero — text on the left, contained video on
 * the right. Matches the Kaiora reference the client signed off on:
 * left column with eyebrow + 3-line headline + supporting copy +
 * "Discover more ↗" CTA, right column with the cycling reel.
 *
 * Compared with the previous centred-text hero, this layout reads as
 * direct and commercial rather than purely cinematic, which is the
 * brief.
 */
export default function Hero() {
  const { t } = useLang();
  const { ready } = useAppReady();
  const videoRefs = useRef([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === idx) {
        try { v.currentTime = 0; } catch {}
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [idx]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % VIDEOS.length), CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const h = t.hero;

  return (
    // The hero + the Clients band below should fit together in one
    // viewport so the brand strip is visible without scrolling. We
    // give the section min-h sized to (viewport − Clients band height)
    // on desktop; mobile stacks naturally with no height constraint.
    <section
      id="top"
      className="relative flex w-full flex-col bg-bg pt-24 text-ink md:min-h-[calc(100svh-80px)] md:pt-28 lg:pt-32"
    >
      <div className="mx-auto flex w-full max-w-frame flex-1 flex-col px-6 pb-10 md:px-10 md:pb-14 lg:px-12 lg:pb-16">
        {/* Top meta row — tight 3-col rail, kept from the previous hero
            for the editorial signature. */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="grid grid-cols-12 items-baseline gap-4 text-[10px] uppercase tracking-[0.22em] text-ink/55 md:gap-8 md:text-[11px]"
        >
          <span className="col-span-6 md:col-span-4">{h.meta}</span>
          <span className="hidden md:col-span-4 md:block md:text-center">{h.tagline}</span>
          <span className="col-span-6 text-right tabular-nums md:col-span-4">
            {`Reel ${String(idx + 1).padStart(2, "0")} / ${String(VIDEOS.length).padStart(2, "0")}`}
          </span>
        </motion.div>

        {/* Main 2-col block — text left, video right. Flex layout so
            both columns stretch to the same height as the container
            grows; the CTA sits at the bottom of the left column,
            leaving clean breathing room above the Clients band. */}
        <div className="mt-8 flex flex-1 flex-col gap-6 md:mt-10 md:flex-row md:gap-10 lg:gap-12">
          {/* LEFT — text column */}
          <div className="flex flex-col justify-between md:flex-1">
            <div>
              {/* All-sans headline (no editorial italic accent) — matches
                  the Kaiora reference where the type is the focal point
                  without flourishes. The italic signature lives in the
                  footer wordmark and the logo ".", not in the headline. */}
              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{ duration: 0.95, ease: EASE, delay: 0.25 }}
                className="text-ink"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.035em",
                  willChange: "transform, opacity",
                }}
              >
                <span className="block">{h.titleA}</span>
                <span className="block">{h.titleAccent}</span>
                <span className="block">{h.titleItalic}</span>
                <span className="block">{h.titleB}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
                className="mt-6 max-w-[44ch] text-base text-ink/70 md:mt-8 md:text-[17px]"
                style={{ lineHeight: 1.55 }}
              >
                {h.supporting}
              </motion.p>
            </div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
              className="mt-8 flex items-center gap-6 md:mt-12"
            >
              <a
                href="#about"
                data-cursor="cta"
                data-magnetic="0.2"
                className="group inline-flex items-center gap-3 border-b border-ink pb-2 text-[11px] uppercase tracking-[0.22em] text-ink"
              >
                <span>{h.ctaDiscover}</span>
                <span
                  aria-hidden="true"
                  className="text-sm leading-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT — cycling reel, contained. */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
            data-cursor="media"
            data-cursor-label="Reel"
            className="relative aspect-[4/5] w-full overflow-hidden bg-ink md:aspect-auto md:flex-1 md:self-stretch"
          >
            {VIDEOS.map((src, i) => (
              <video
                key={src}
                ref={(el) => { videoRefs.current[i] = el; }}
                src={src}
                autoPlay={i === 0}
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out ${i === idx ? "opacity-100" : "opacity-0"}`}
              />
            ))}

            {/* Subtle bottom-left reel marker */}
            <div className="pointer-events-none absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.28em] text-bg/85 md:bottom-5 md:left-5">
              <span>(reel)</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
