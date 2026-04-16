"use client";

import { revealOnMount } from "@/lib/animations";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

const SCENES = [
  { src: "/video/video1.mp4", word: "IDENTITY", italic: false },
  { src: "/video/video2.mp4", word: "CONTENT", italic: true },
  { src: "/video/video3.mp4", word: "CONNECT", italic: false },
];

const CYCLE_MS = 3000;
const STAGE_GLITCH_MS = 320;
const TEXT_GLITCH_MS = 200;
const VIDEO_SWAP_AT_MS = 150;

const GLITCH_POOL = "!@#$%^*_-=+/\\|<>?#$01234567890";

function scramble(str, intensity) {
  let out = "";
  for (let i = 0; i < str.length; i += 1) {
    const ch = str[i];
    if (/\s/.test(ch) || Math.random() > intensity) {
      out += ch;
    } else {
      out += GLITCH_POOL[Math.floor(Math.random() * GLITCH_POOL.length)];
    }
  }
  return out;
}

export default function Hero() {
  const rootRef = useRef(null);
  const parallaxRef = useRef(null);
  const videoRefs = useRef([]);

  const [idx, setIdx] = useState(0);
  const [stageGlitch, setStageGlitch] = useState(false);
  const [textGlitch, setTextGlitch] = useState(false);
  const [displayWord, setDisplayWord] = useState(SCENES[0].word);

  // Tell the cursor to react each time a glitch starts.
  useEffect(() => {
    if (stageGlitch && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("hero:glitch"));
    }
  }, [stageGlitch]);

  // Play the active video, pause the rest.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === idx) {
        try {
          v.currentTime = 0;
        } catch { }
        const p = v.play();
        if (p && typeof p.catch === "function") p.catch(() => { });
      } else {
        v.pause();
      }
    });
    setDisplayWord(SCENES[idx].word);
  }, [idx]);

  // 5s cycle: stage glitch → swap → text settles.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timers = [];
    let alive = true;
    let current = 0;

    const run = () => {
      if (!alive) return;

      const next = (current + 1) % SCENES.length;
      const incomingWord = SCENES[next].word;

      setStageGlitch(true);
      setTextGlitch(true);

      // Scramble frames — starts on current word, resolves on next word.
      const frames = [
        { at: 0, intensity: 0.4, source: SCENES[current].word },
        { at: 55, intensity: 0.6, source: SCENES[current].word },
        { at: 110, intensity: 0.5, source: incomingWord },
        { at: 160, intensity: 0.25, source: incomingWord },
      ];
      frames.forEach(({ at, intensity, source }) => {
        timers.push(
          setTimeout(() => {
            if (!alive) return;
            setDisplayWord(scramble(source, intensity));
          }, at)
        );
      });

      timers.push(
        setTimeout(() => {
          if (alive) setDisplayWord(incomingWord);
        }, TEXT_GLITCH_MS)
      );

      // Swap video mid-glitch.
      timers.push(
        setTimeout(() => {
          if (!alive) return;
          current = next;
          setIdx(next);
        }, VIDEO_SWAP_AT_MS)
      );

      timers.push(
        setTimeout(() => {
          if (alive) setTextGlitch(false);
        }, TEXT_GLITCH_MS)
      );

      timers.push(
        setTimeout(() => {
          if (alive) setStageGlitch(false);
        }, STAGE_GLITCH_MS)
      );

      timers.push(setTimeout(run, CYCLE_MS));
    };

    timers.push(setTimeout(run, CYCLE_MS));

    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  // Intro reveal + scroll parallax on the video layer.
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      revealOnMount(rootRef.current, { delay: 0.3, stagger: 0.12 });

      gsap.to(parallaxRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const activeScene = SCENES[idx];

  return (
    <section
      ref={rootRef}
      id="top"
      data-cursor="hero"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-ink text-bg"
    >
      {/* SVG filter defs: true RGB channel split + turbulence tear */}
      <svg
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
        className="pointer-events-none absolute"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <filter
            id="hero-glitch-fx"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.65"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="14"
              xChannelSelector="R"
              yChannelSelector="G"
              result="torn"
            />
            <feColorMatrix
              in="torn"
              type="matrix"
              values="1 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 1 0"
              result="rCh"
            />
            <feOffset in="rCh" dx="7" dy="0" result="rOff" />
            <feColorMatrix
              in="torn"
              type="matrix"
              values="0 0 0 0 0   0 1 0 0 0   0 0 1 0 0   0 0 0 1 0"
              result="bgCh"
            />
            <feOffset in="bgCh" dx="-7" dy="0" result="bgOff" />
            <feBlend in="rOff" in2="bgOff" mode="screen" />
          </filter>
        </defs>
      </svg>

      {/* Video stage + treatment layers (parallaxed as one) */}
      <div ref={parallaxRef} className="absolute inset-0">
        <div
          className={`absolute inset-0 ${stageGlitch ? "hero-glitch-stage" : ""
            }`}
        >
          {SCENES.map((scene, i) => (
            <video
              key={scene.src}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={scene.src}
              autoPlay={i === 0}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[200ms] ease-out ${i === idx ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}
        </div>

        {/* Dark editorial overlay — higher contrast than before */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 38%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Constant grain */}
        <div
          className={`hero-grain pointer-events-none absolute inset-0 ${stageGlitch ? "is-boost" : ""
            }`}
        />

        {/* Scanlines during glitch */}
        <div
          className={`hero-scanlines pointer-events-none absolute inset-0 ${stageGlitch ? "is-active" : ""
            }`}
        />

        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Horizontal displacement bands — only during glitch */}
        {stageGlitch && (
          <>
            <span className="hero-band hero-band-1" />
            <span className="hero-band hero-band-2" />
            <span className="hero-band hero-band-3" />
          </>
        )}
      </div>

      {/* Foreground composition */}
      <div className="relative mx-auto flex w-full max-w-frame flex-1 flex-col px-6 pt-32 md:px-12 md:pt-36">
        {/* Top meta bar */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div
            data-reveal
            className="col-span-6 text-[11px] uppercase tracking-[0.22em] text-bg/70"
          >
            Est. 2026 — Madrid
          </div>
          <div
            data-reveal
            className="col-span-6 text-right text-[11px] uppercase tracking-[0.22em] text-bg/70"
          >
            Reel {String(idx + 1).padStart(2, "0")} / 03
          </div>
        </div>

        {/* Spacer pushes the block to the lower half of the hero */}
        <div className="flex-1 min-h-[12vh]" />

        {/* Giant rotating word + supporting block */}
        <div className="grid grid-cols-12 gap-6 pb-12 md:gap-8 md:pb-16">
          <div className="col-span-12">
            <div
              data-reveal
              className="mb-3 text-[11px] uppercase tracking-[0.22em] text-bg/60"
            >
              (Vol. 01 — {activeScene.word.toLowerCase()})
            </div>

            <h1
              data-reveal
              className="text-bg"
              style={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 200,
                fontStyle: activeScene.italic ? "italic" : "normal",
                /* Conservative clamp — sized so the longest word in the set
                   (IDENTITY, 8 glyphs) still fits inside 88vw on every
                   viewport from 320px to 2560px. */
                fontSize: "clamp(3.5rem, 17vw, 14rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                /* Anti-clipping composition rules */
                whiteSpace: "nowrap",
                maxWidth: "88vw",
                overflow: "visible",
              }}
            >
              <span
                className={textGlitch ? "hero-glitch-text" : undefined}
                aria-live="polite"
              >
                {displayWord}
              </span>
            </h1>
          </div>

          <div className="col-span-12 mt-8 md:col-span-6 md:mt-10">
            <p
              data-reveal
              className="max-w-md text-base text-bg/80 md:text-lg"
            >
              Creative direction, visual content and strategic connections.
            </p>
          </div>

          <div className="col-span-12 mt-6 flex items-end justify-between text-[12px] uppercase tracking-[0.22em] text-bg/70 md:col-span-5 md:col-start-8 md:mt-10">
            <div data-reveal className="flex items-center gap-5">
              <a
                href="#work"
                data-cursor="cta"
                data-magnetic="0.3"
                className="link-underline"
              >
                Selected work
              </a>
              <span className="text-bg/30">/</span>
              <a
                href="#contact"
                data-cursor="cta"
                data-magnetic="0.3"
                className="link-underline"
              >
                Start a project
              </a>
            </div>
            <div
              data-reveal
              className="hidden text-[10px] tracking-[0.3em] text-bg/50 md:block"
            >
              (S) Scroll
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-bg/60 md:hidden">
        (S) Scroll
      </div>
    </section>
  );
}
