"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";

/**
 * About / WHO WE ARE — Kaiora-style compact block. Image left, eyebrow
 * + body + READ MORE on the right. The big decorative title that used
 * to sit above the body has been removed: in this layout the eyebrow
 * IS the title, and the brand's editorial moment happens at the hero.
 *
 * The pillars (Vision / Philosophy / Creative identity / Brand approach)
 * still live in content.js — we render them as an optional compact
 * 4-up row below the main block, separated by a hairline.
 */
export default function About() {
  const { t } = useLang();
  const rootRef = useRef(null);
  const a = t.about;

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative w-full border-t border-ink/10 bg-bg pt-12 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24"
    >
      <div className="mx-auto max-w-frame px-6 md:px-10 lg:px-12">
        {/* 2-column main block — image left, text right (Kaiora order) */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 lg:gap-14">
          {/* LEFT — editorial image */}
          <div className="order-2 col-span-12 md:order-1 md:col-span-6">
            <div
              data-reveal-media
              className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5 md:aspect-[4/3] lg:aspect-[5/4]"
            >
              <img
                src="/images/studio_portrait.png"
                alt="Eve studio portrait"
                className="absolute inset-0 h-full w-full object-cover"
                draggable="false"
              />
            </div>
          </div>

          {/* RIGHT — eyebrow + body + READ MORE */}
          <div className="order-1 col-span-12 flex flex-col justify-center md:order-2 md:col-span-6">
            <p
              data-reveal
              className="text-[11px] uppercase tracking-[0.24em] text-ink"
              style={{ fontWeight: 500 }}
            >
              {a.eyebrow}
            </p>
            <p
              data-reveal
              className="mt-5 max-w-[44ch] text-base text-ink/75 md:mt-6 md:text-[17px]"
              style={{ lineHeight: 1.55 }}
            >
              {a.lede}
            </p>
            <div data-reveal className="mt-7 md:mt-8">
              <a
                href="#services"
                data-cursor="cta"
                className="group inline-flex items-center gap-3 border-b border-ink pb-2 text-[11px] uppercase tracking-[0.22em] text-ink"
              >
                <span>{a.readMore}</span>
                <span
                  aria-hidden="true"
                  className="text-sm leading-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Compact pillars row — preserved from Eve's own content,
            kept as a quiet editorial signature below the main block. */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/10 pt-8 md:mt-16 md:grid-cols-4 md:gap-x-8 md:pt-10">
          {a.pillars.map((p) => (
            <article key={p.label} data-reveal>
              <p className="text-[10px] uppercase tracking-[0.24em] text-ink/45">
                {p.label}
              </p>
              <p
                className="mt-2 text-[13px] text-ink/85 md:text-[14px]"
                style={{ lineHeight: 1.5 }}
              >
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
