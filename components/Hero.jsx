"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useLang from "@/lib/useLang";
import useAppReady from "@/lib/useAppReady";
import MaskReveal from "./MaskReveal";

const VIDEOS = ["/video/video1.mp4", "/video/video2.mp4", "/video/video3.mp4"];
const CYCLE_MS = 5200;
const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const { t } = useLang();
  const { ready } = useAppReady();
  const videoRefs = useRef([]);
  const stripRef = useRef(null);

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

  // Scroll-linked dark overlay on the cinematic strip.
  // Bell curve: the strip enters light, darkens to near-black as it
  // centers in the viewport, then releases back to light as it exits.
  const { scrollYProgress } = useScroll({
    target: stripRef,
    offset: ["start end", "end start"],
  });
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.92, 1],
    [0, 0, 0.95, 0.9, 0.25, 0],
    { clamp: true }
  );
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1], { clamp: true });

  const activeWord = t.hero.scenes[idx]?.word || "";

  return (
    <section id="top" className="relative w-full bg-bg text-ink">
      {/* Fixed viewport-wide dark overlay. Scroll-driven: dims the
          entire screen as the cinematic strip crosses the viewport,
          then releases back to light. z-40 keeps it under the nav
          (z-50) so the menu remains readable. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 bg-ink"
        style={{ opacity: overlayOpacity, willChange: "opacity" }}
      />

      {/* ============================================================
         Editorial top zone — minimal, centered, on light bg.
         min-h-[100svh] on mobile guarantees the zone fills the small
         viewports, so the video strip stays below the fold at
         scroll=0 and the dark overlay can't darken the header on
         first paint. Desktop lets the content define its own height.
         ============================================================ */}
      <div className="relative flex min-h-[100svh] flex-col pt-28 md:min-h-0 md:pt-36">
        {/* Top meta row — 3 cols on desktop, center hidden on mobile
            to avoid three crammed strings sharing a narrow row. */}
        <div className="mx-auto grid max-w-frame grid-cols-12 items-baseline gap-4 px-6 text-[10px] uppercase tracking-[0.22em] text-ink/55 md:gap-8 md:px-12 md:text-[11px]">
          <div className="col-span-6 md:col-span-4">
            <MaskReveal onMount delay={0.35} duration={0.9}>{t.hero.meta}</MaskReveal>
          </div>
          <div className="hidden md:col-span-4 md:block md:text-center">
            <MaskReveal onMount delay={0.45} duration={0.9}>{t.hero.tagline}</MaskReveal>
          </div>
          <div className="col-span-6 text-right tabular-nums md:col-span-4">
            <MaskReveal onMount delay={0.55} duration={0.9}>
              {`Reel ${String(idx + 1).padStart(2, "0")} / ${String(VIDEOS.length).padStart(2, "0")}`}
            </MaskReveal>
          </div>
        </div>

        {/* Centered editorial title block */}
        <div className="mx-auto mt-24 flex max-w-frame flex-col items-center px-6 text-center md:mt-36 md:px-12">
          <MaskReveal
            onMount
            delay={0.65}
            duration={0.9}
            innerClassName="text-ink/65"
            innerStyle={{
              fontFamily: "var(--font-neue)",
              fontSize: "11px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            {t.hero.kicker}
          </MaskReveal>
          <h1 className="mt-5 md:mt-7">
            <MaskReveal
              onMount
              delay={0.85}
              duration={1.25}
              innerClassName="italic text-ink"
              innerStyle={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 200,
                fontSize: "clamp(2.75rem, 9vw, 8.5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                display: "inline-block",
              }}
            >
              {t.hero.title}
            </MaskReveal>
          </h1>
        </div>

        {/* Utility bar — "Fullscreen +" style. mt-auto pins it to
            the bottom of the 100svh flex column on mobile, keeping
            the layout balanced instead of clumping at the top. */}
        <div className="mx-auto mt-auto w-full max-w-frame px-6 pb-8 md:mt-28 md:px-12 md:pb-0">
          <motion.div
            className="flex items-center justify-between border-t border-ink/15 pt-5 text-[10px] uppercase tracking-[0.24em] text-ink/55 md:pt-6 md:text-[11px]"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
          >
            <span>{t.hero.ctaWork}</span>
            <motion.span
              key={activeWord}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="hidden tracking-[0.28em] text-ink/70 md:block"
            >
              ({activeWord.toLowerCase()})
            </motion.span>
            <span aria-hidden="true" className="text-base leading-none">+</span>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
         Cinematic strip — full-bleed, dark. Scroll-linked overlay
         creates the color handoff into the next section.
         ============================================================ */}
      <div
        ref={stripRef}
        data-cursor="hero"
        className="relative z-[45] mt-10 w-full overflow-hidden bg-ink md:mt-14"
        style={{ height: "clamp(60vh, 85vh, 100svh)" }}
      >
        {/* Video layer — subtle scale from scroll for parallax-like drift */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale, willChange: "transform" }}
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
        </motion.div>

        {/* Bottom navigator */}
        <a
          href="#work"
          data-cursor="cta"
          data-magnetic="0.3"
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-bg/85 transition-opacity duration-500 hover:text-bg md:bottom-14 md:text-[11px]"
        >
          <span>{t.hero.ctaWork}</span>
          <span className="h-6 w-px bg-bg/40" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
