"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import useLang from "@/lib/useLang";
import useAppReady from "@/lib/useAppReady";

/**
 * Hero reel.
 *
 * `/video/video3.mp4` (crowd dancing under stage lights) was removed from
 * the rotation at the client's request: it read artificial next to the
 * rest of the reel. It stays on disk but must not come back.
 *
 * `video4-aerial.mp4` is the drone plate the client delivered for the
 * homepage. The master (`DJI_…D00000000.mp4`) is a 60 MB, 16 s, 60 fps
 * 1080×1920 vertical clip, so it is not web-usable as shot. The reel
 * version is cropped to 4:3 at y=250 and runs 15.5 s at 30 fps, with no
 * audio. 4:3 is the widest source the narrowest band (mobile) needs, so
 * the default centred `object-cover` serves every breakpoint and neither
 * of the other two clips is touched.
 *
 * Two things about this clip drove those numbers:
 *
 *   The drone pulls back over the 16 s, so the framing cannot be judged
 *   from the opening seconds. Cropping from the top of the frame suits
 *   the first five, then empties to bare water as the boats shrink away.
 *   y=250 is the one window that keeps boats in the wide desktop band
 *   for the whole take.
 *
 *   It runs nearly the full master on purpose: at 5.2 s the pan barely
 *   registered. That is why `hold` is per clip below rather than one
 *   shared interval.
 *
 * It sits last: the first entry is the only one that blocks bandwidth
 * (`preload="auto"`).
 */
const VIDEOS = [
  { src: "/video/video1.mp4", hold: 5200 },
  { src: "/video/video2.mp4", hold: 5200 },
  // Held almost to its full length so the drone move reads.
  { src: "/video/video4-aerial.mp4", hold: 15400 },
];
const EASE = [0.22, 1, 0.36, 1];

/**
 * Cinematic editorial hero: the reel leads.
 *
 * The video used to sit boxed in the right-hand column of a 2-up split.
 * It is now a single wide band across the full editorial frame, cropped
 * cinemascope-wide on desktop, so it is the first thing the eye lands on.
 * Beneath it, in reading order:
 *
 *   H1 (left, 3 short lines) + supporting paragraph (right, bottom-aligned)
 *   hairline
 *   studio locations (left) + "Meet MAIT" CTA (right)
 *
 * Headline BELOW the video rather than overlaid: overlaying type on a
 * cycling reel means the contrast changes under the words from clip to
 * clip, which forces a scrim, and a scrim over a full-width video is
 * exactly the "advertising banner" register the brief rules out. Below
 * the video the type sits on the studio's own ground at full contrast,
 * reads as editorial rather than promotional, and needs no effects.
 */
export default function Hero() {
  const { t } = useLang();
  const { ready } = useAppReady();
  const reduce = useReducedMotion();
  const videoRefs = useRef([]);
  const [idx, setIdx] = useState(0);

  // With reduced motion the hero simply *is*: no entrance offsets, no
  // fades. `false` tells framer-motion to skip the initial state and
  // render the animate target directly. (The reel itself also stops
  // cycling; see the interval effect below.)
  const enter = (target) => (reduce ? false : target);

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

  // Each clip holds for its own duration, so a long plate is not cut off
  // by a shared interval. Re-armed on every change rather than run as one
  // repeating timer, and keyed on `idx` so the pending timeout is cleared
  // whenever the clip changes.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (VIDEOS.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(
      () => setIdx((i) => (i + 1) % VIDEOS.length),
      VIDEOS[idx]?.hold ?? 5200
    );
    return () => clearTimeout(id);
  }, [idx]);

  const h = t.hero;

  return (
    <section
      id="top"
      className="relative flex w-full flex-col bg-bg pt-24 text-ink md:pt-28 lg:pt-32"
    >
      <div className="mx-auto flex w-full max-w-frame flex-1 flex-col px-6 pb-10 md:px-10 md:pb-14 lg:px-12 lg:pb-16">
        {/* Meta rail: editorial signature kept from the previous hero. */}
        <motion.div
          initial={enter({ opacity: 0, y: 12 })}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="grid grid-cols-12 items-baseline gap-4 text-[10px] uppercase tracking-[0.22em] text-ink/60 md:gap-8 md:text-[11px]"
        >
          <span className="col-span-6 md:col-span-4">{h.meta}</span>
          <span className="hidden md:col-span-4 md:block md:text-center">{h.tagline}</span>
          <span className="col-span-6 text-right tabular-nums md:col-span-4">
            {`Reel ${String(idx + 1).padStart(2, "0")} / ${String(VIDEOS.length).padStart(2, "0")}`}
          </span>
        </motion.div>

        {/* THE REEL: wide, full-frame, first thing on screen.
            Aspect widens with the viewport (4/3 phone → 21/9 desktop) so
            it stays present on small screens and cinematic on large ones,
            never letterboxed into a thin banner. */}
        <motion.div
          initial={enter({ opacity: 0, scale: 1.015 })}
          animate={ready || reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.015 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
          data-cursor="media"
          data-cursor-label="Reel"
          // max-h caps the band on short desktop screens (e.g. 1280×720)
          // so the headline still breaks the fold instead of being pushed
          // entirely below it; object-cover simply crops a little wider.
          className="relative mt-6 aspect-[4/3] w-full overflow-hidden bg-ink sm:aspect-[3/2] md:mt-8 md:aspect-[16/9] md:max-h-[62svh] lg:aspect-[21/9]"
        >
          {VIDEOS.map((clip, i) => (
            <video
              key={clip.src}
              ref={(el) => { videoRefs.current[i] = el; }}
              src={clip.src}
              autoPlay={i === 0}
              muted
              loop={VIDEOS.length === 1}
              playsInline
              // Only the first clip is worth blocking bandwidth on; the
              // rest load their metadata and stream in before their turn.
              preload={i === 0 ? "auto" : "metadata"}
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-out ${i === idx ? "opacity-100" : "opacity-0"}`}
            />
          ))}

          {/* Quiet reel marker, bottom-left */}
          <div className="pointer-events-none absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.28em] text-bg/85 md:bottom-5 md:left-5">
            <span>(reel)</span>
          </div>
        </motion.div>

        {/* Headline + supporting copy */}
        <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-6 md:mt-12 md:gap-x-10 lg:mt-14 lg:gap-x-14">
          <motion.h1
            initial={enter({ opacity: 0, y: 28 })}
            animate={ready || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.95, ease: EASE, delay: 0.45 }}
            className="col-span-12 text-ink md:col-span-7"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "clamp(2.35rem, 5.6vw, 5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              willChange: "transform, opacity",
            }}
          >
            <span className="block">{h.titleA}</span>
            <span className="block">{h.titleAccent}</span>
            <span className="block">{h.titleItalic}</span>
          </motion.h1>

          <motion.p
            initial={enter({ opacity: 0, y: 16 })}
            animate={ready || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            className="col-span-12 max-w-[46ch] self-end text-base text-ink/70 md:col-span-5 md:text-[17px]"
            style={{ lineHeight: 1.55 }}
          >
            {h.supporting}
          </motion.p>
        </div>

        {/* Locations + CTA rail */}
        <motion.div
          initial={enter({ opacity: 0, y: 12 })}
          animate={ready || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
          className="mt-8 flex flex-col gap-5 border-t border-ink/10 pt-5 md:mt-12 md:flex-row md:items-center md:justify-between md:pt-6"
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-ink/70 md:text-[11px] md:tracking-[0.26em]">
            {h.locations}
          </p>
          <a
            href="#about"
            data-cursor="cta"
            data-magnetic="0.2"
            className="group -mt-4 inline-flex w-fit items-center gap-3 border-b border-ink pb-2 pt-4 text-[11px] uppercase tracking-[0.22em] text-ink"
          >
            <span>{h.ctaAbout}</span>
            <span
              aria-hidden="true"
              className="text-sm leading-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
