"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import useAppReady from "@/lib/useAppReady";
import { BRAND } from "@/lib/brand";

// Editorial preloader — black stage with discreet film grain, crop
// marks at the four corners, meta rails at top and bottom, and a
// centred wordmark that reveals as outline-then-fill, capped with an
// italic tagline. Closes with a horizontal split curtain: the black
// parts along the wordmark's own axis, top panel rises and bottom
// panel falls, revealing the home from the middle outward.

// Counter tween — kept short so the preloader feels immediate.
// Original was 2.5s, which read as slow for repeat visitors.
const COUNT_DURATION = 1.0;

const CROP_POSITIONS = [
  { top: "20px", left: "20px" },
  { top: "20px", right: "20px" },
  { bottom: "20px", left: "20px" },
  { bottom: "20px", right: "20px" },
];

export default function Preloader() {
  const { setReady } = useAppReady();
  const [shouldRun, setShouldRun] = useState(null);
  const [removed, setRemoved] = useState(false);
  const [progress, setProgress] = useState(0);

  const rootRef = useRef(null);
  const grainRef = useRef(null);
  const cropMarksRef = useRef([]);
  const topMetaRef = useRef(null);
  const bottomMetaRef = useRef(null);
  const wordmarkOutlineRef = useRef(null);
  const wordmarkFillRef = useRef(null);
  const wordmarkWrapRef = useRef(null);
  const subtitleRef = useRef(null);
  const progressBarRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const seamRef = useRef(null);

  // Session gate — same policy as before.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forceShow = params.has("preload");
    const reset = params.get("preload") === "reset";
    const skip = params.has("skip-preload");
    const isDev = process.env.NODE_ENV === "development";

    let show = true;
    try {
      if (reset) sessionStorage.removeItem("eve_preload_shown");
      if (skip) {
        show = false;
      } else if (forceShow || isDev) {
        show = true;
        sessionStorage.setItem("eve_preload_shown", "1");
      } else if (sessionStorage.getItem("eve_preload_shown")) {
        show = false;
      } else {
        show = true;
        sessionStorage.setItem("eve_preload_shown", "1");
      }
    } catch {}

    if (!show) {
      setShouldRun(false);
      setReady(true);
    } else {
      setShouldRun(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shouldRun !== true) return;

    // Initial states are inlined on each element's `style` (see the
    // JSX below) so the first paint is already hidden — no flash of
    // unstyled content before this effect runs. We only need to
    // confirm transformOrigin here for the progress bar.
    gsap.set(progressBarRef.current, { transformOrigin: "0 50%" });

    const tl = gsap.timeline({
      onComplete: () => setRemoved(true),
    });

    // Preloader timing — rewritten to be faster and more efficient.
    // Target total runtime ~2.4s (was ~6s). Atmosphere, mark, counter
    // and split now overlap aggressively instead of running in series.

    // 1. Atmosphere — grain + crop marks snap in together at t=0.
    tl.to(
      grainRef.current,
      { opacity: 0.08, duration: 0.55, ease: "power2.out" },
      0
    );
    tl.to(
      cropMarksRef.current,
      {
        opacity: 0.45,
        scale: 1,
        duration: 0.45,
        ease: "expo.out",
        stagger: { each: 0.03, from: "random" },
      },
      0.05
    );

    // 2. Rails — fast fade with a short stagger.
    tl.to(
      topMetaRef.current,
      { opacity: 0.72, y: 0, duration: 0.5, ease: "power3.out" },
      0.1
    );
    tl.to(
      bottomMetaRef.current,
      { opacity: 0.72, y: 0, duration: 0.5, ease: "power3.out" },
      0.15
    );

    // 3. Wordmark outline — center-out reveal, brisker.
    tl.to(
      wordmarkOutlineRef.current,
      {
        clipPath: "inset(-0.2em 0% -0.2em 0%)",
        WebkitClipPath: "inset(-0.2em 0% -0.2em 0%)",
        duration: 0.8,
        ease: "expo.out",
      },
      0.2
    );

    // 4. Counter + hairline — run alongside the outline draw.
    const counterObj = { v: 0 };
    tl.to(
      counterObj,
      {
        v: 100,
        duration: COUNT_DURATION,
        ease: "power2.inOut",
        onUpdate: () => setProgress(Math.floor(counterObj.v)),
      },
      0.2
    );
    tl.to(
      progressBarRef.current,
      {
        scaleX: 1,
        duration: COUNT_DURATION,
        ease: "power2.inOut",
      },
      0.2
    );

    // 5. Fill crossfades over the outline — mark solidifies.
    tl.to(
      wordmarkFillRef.current,
      { opacity: 1, duration: 0.4, ease: "power3.inOut" },
      0.9
    );
    tl.to(
      wordmarkOutlineRef.current,
      { opacity: 0, duration: 0.35, ease: "power3.inOut" },
      1.0
    );

    // 6. Tagline appears underneath.
    tl.to(
      subtitleRef.current,
      {
        opacity: 0.7,
        y: 0,
        clipPath: "inset(-0.25em 0% -0.25em 0%)",
        WebkitClipPath: "inset(-0.25em 0% -0.25em 0%)",
        duration: 0.5,
        ease: "expo.out",
      },
      1.1
    );

    // 7. Short hold so the mark is legible.
    tl.to({}, { duration: 0.2 });

    // 8. Fade secondary elements.
    tl.to(
      [
        topMetaRef.current,
        bottomMetaRef.current,
        subtitleRef.current,
        progressBarRef.current,
        grainRef.current,
        ...cropMarksRef.current,
      ],
      {
        opacity: 0,
        duration: 0.35,
        ease: "power3.inOut",
      }
    );

    // 9. Hand off to the app behind.
    tl.call(() => setReady(true));

    // 10. Wordmark collapses to centre.
    tl.to(
      wordmarkWrapRef.current,
      {
        clipPath: "inset(-0.4em 50% -0.4em 50%)",
        WebkitClipPath: "inset(-0.4em 50% -0.4em 50%)",
        opacity: 0,
        duration: 0.5,
        ease: "expo.inOut",
      }
    );

    // 11. Seam grows out of the same centre.
    tl.to(
      seamRef.current,
      { scaleX: 1, opacity: 0.85, duration: 0.5, ease: "expo.inOut" },
      "<"
    );

    // 12. Horizontal split — quicker, still cinematic.
    tl.to(
      topPanelRef.current,
      { y: "-100%", duration: 0.75, ease: "expo.inOut" },
      "+=0.05"
    );
    tl.to(
      bottomPanelRef.current,
      { y: "100%", duration: 0.75, ease: "expo.inOut" },
      "<"
    );
    tl.to(
      seamRef.current,
      { opacity: 0, duration: 0.3, ease: "power2.out" },
      "<0.1"
    );

    tl.to(rootRef.current, { opacity: 0, duration: 0.1 });

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRun]);

  if (shouldRun === false) return null;
  if (removed) return null;

  const wordmarkStyle = {
    fontFamily: "var(--font-sans, var(--font-neue, system-ui, sans-serif))",
    fontWeight: 500,
    fontSize: "clamp(3.25rem, 10vw, 8.75rem)",
    lineHeight: 0.95,
    letterSpacing: "-0.045em",
    whiteSpace: "nowrap",
    userSelect: "none",
  };

  const metaRail = {
    fontFamily: "var(--font-sans, var(--font-neue, system-ui, sans-serif))",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.3em",
  };

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        overflow: "hidden",
      }}
    >
      {/* Black stage as two panels that split along the horizontal
          centre. Each panel covers a hair more than 50% so there's
          no subpixel gap where they meet. */}
      <div
        ref={topPanelRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "calc(50% + 1px)",
          background: "#0B0B0B",
          willChange: "transform",
        }}
      />
      <div
        ref={bottomPanelRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "calc(50% + 1px)",
          background: "#0B0B0B",
          willChange: "transform",
        }}
      />

      {/* Seam hairline — draws along the split axis just before the
          panels part, like an editorial rule marking the tear line. */}
      <div
        ref={seamRef}
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "1px",
          background: "#faf8f5",
          opacity: 0,
          transform: "scaleX(0)",
          transformOrigin: "50% 50%",
          pointerEvents: "none",
        }}
      />

      {/* Film grain overlay — fractal noise, overlay blend. */}
      <div
        ref={grainRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      {/* Corner crop marks — tiny editorial signatures. */}
      {CROP_POSITIONS.map((pos, i) => (
        <div
          key={i}
          ref={(el) => {
            cropMarksRef.current[i] = el;
          }}
          style={{
            position: "absolute",
            ...pos,
            width: "12px",
            height: "12px",
            pointerEvents: "none",
            opacity: 0,
            transform: "scale(0.5)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <line x1="0" y1="6" x2="12" y2="6" stroke="#faf8f5" strokeWidth="1" />
            <line x1="6" y1="0" x2="6" y2="12" stroke="#faf8f5" strokeWidth="1" />
          </svg>
        </div>
      ))}

      {/* Frame content — meta rails + wordmark + tagline. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          color: "#faf8f5",
          pointerEvents: "none",
        }}
      >
        {/* Top rail */}
        <div
          ref={topMetaRef}
          style={{
            ...metaRail,
            position: "absolute",
            top: "clamp(1.5rem, 3vw, 2.25rem)",
            left: "clamp(2.25rem, 4vw, 3.25rem)",
            right: "clamp(2.25rem, 4vw, 3.25rem)",
            display: "flex",
            justifyContent: "space-between",
            opacity: 0,
            transform: "translateY(14px)",
          }}
        >
          <span>{BRAND.name} — Creative Studio</span>
          <span>Madrid · 2026</span>
        </div>

        {/* Wordmark + tagline, both centred. */}
        <div
          ref={wordmarkWrapRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {/* Outline + fill stacked on the same origin. */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <span
              ref={wordmarkOutlineRef}
              style={{
                ...wordmarkStyle,
                display: "block",
                color: "transparent",
                WebkitTextStroke: "1px #faf8f5",
                clipPath: "inset(-0.2em 50% -0.2em 50%)",
                WebkitClipPath: "inset(-0.2em 50% -0.2em 50%)",
              }}
            >
              {BRAND.wordmark}
            </span>
            <span
              ref={wordmarkFillRef}
              style={{
                ...wordmarkStyle,
                position: "absolute",
                top: 0,
                left: 0,
                color: "#faf8f5",
                opacity: 0,
              }}
            >
              {BRAND.wordmark}
            </span>
          </div>

          {/* Tagline — kept editorial italic as accent over General Sans. */}
          <div
            ref={subtitleRef}
            style={{
              marginTop: "clamp(0.9rem, 1.6vw, 1.4rem)",
              fontFamily: "var(--font-editorial, serif)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(0.78rem, 1vw, 1rem)",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              opacity: 0,
              transform: "translateY(10px)",
              clipPath: "inset(-0.25em 50% -0.25em 50%)",
              WebkitClipPath: "inset(-0.25em 50% -0.25em 50%)",
            }}
          >
            Brands &amp; People
          </div>
        </div>

        {/* Bottom rail */}
        <div
          ref={bottomMetaRef}
          style={{
            ...metaRail,
            position: "absolute",
            bottom: "clamp(1.75rem, 3vw, 2.5rem)",
            left: "clamp(2.25rem, 4vw, 3.25rem)",
            right: "clamp(2.25rem, 4vw, 3.25rem)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            opacity: 0,
            transform: "translateY(14px)",
          }}
        >
          <span>Loading experience</span>
          <span
            style={{
              fontFamily: "var(--font-editorial, serif)",
              fontWeight: 300,
              fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              fontVariantNumeric: "tabular-nums",
              textTransform: "none",
            }}
          >
            {progress}
            <span
              style={{
                opacity: 0.4,
                marginLeft: "0.18em",
                fontSize: "0.55em",
              }}
            >
              %
            </span>
          </span>
        </div>

        {/* Hairline progress bar along the bottom edge. */}
        <div
          ref={progressBarRef}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "1px",
            background: "rgba(250, 248, 245, 0.85)",
            transform: "scaleX(0)",
            transformOrigin: "0 50%",
          }}
        />
      </div>
    </div>
  );
}
