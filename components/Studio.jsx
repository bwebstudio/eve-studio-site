"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";

const LINE_STYLES = {
  huge: {
    fontSize: "clamp(6rem, 17vw, 15rem)",
    lineHeight: 0.9,
    letterSpacing: "-0.035em",
    whiteSpace: "nowrap",
    maxWidth: "88vw",
  },
  small: {
    fontSize: "clamp(2rem, 5vw, 4rem)",
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
  },
  medium: {
    fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
    lineHeight: 1.05,
    letterSpacing: "-0.02em",
  },
  large: {
    fontSize: "clamp(3rem, 8vw, 7rem)",
    lineHeight: 0.95,
    letterSpacing: "-0.03em",
  },
};

const LINE_GRID = [
  "col-span-12",
  "col-span-12 md:col-span-9 mt-1",
  "col-span-12 md:col-span-9 md:col-start-4 mt-14 md:mt-20",
  "col-span-12 md:col-span-6 md:col-start-6 mt-14 md:mt-20",
  "col-span-12 md:col-span-6 md:col-start-6",
  "col-span-12 md:col-span-6 md:col-start-6",
];

export default function Studio() {
  const { t } = useLang();
  const rootRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);
      gsap.utils.toArray("[data-studio-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="studio" className="relative w-full bg-bg py-[100px] md:py-[160px]">
      <div className="mx-auto grid max-w-frame grid-cols-12 gap-6 px-6 md:gap-8 md:px-12">
        <div className="col-span-12 flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
          <span>{t.studio.sectionLabel}</span>
          <span>{t.studio.sectionIndex}</span>
        </div>

        <h2 className="col-span-12 mt-12 grid grid-cols-12 gap-x-6 md:mt-20 md:gap-x-8">
          <span className="sr-only">{t.studio.srOnly}</span>
          {t.studio.lines.map((line, i) => (
            <span
              key={i}
              aria-hidden="true"
              data-reveal
              className={`font-editorial text-ink ${line.italic ? "italic" : ""} ${line.italic ? "text-ink/85" : ""} ${LINE_GRID[i] || "col-span-12"}`}
              style={LINE_STYLES[line.size] || LINE_STYLES.medium}
            >
              {line.text}
            </span>
          ))}
        </h2>

        <div className="col-span-12 mt-16 grid grid-cols-12 gap-6 md:mt-24 md:gap-8">
          <p data-reveal className="col-span-12 text-[11px] uppercase tracking-[0.22em] text-ink/50 md:col-span-3 md:col-start-2">
            {t.studio.aboutLabel}
          </p>
          <p data-reveal className="col-span-12 mt-4 text-base text-ink/80 md:col-span-6 md:col-start-6 md:mt-0 md:text-lg">
            {t.studio.aboutBody}
          </p>
        </div>

        <div className="col-span-12 mt-20 grid grid-cols-12 gap-6 md:mt-28 md:gap-8">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <div className="overflow-hidden bg-accent">
              <img data-reveal-media data-studio-parallax src="/images/studio_portrait.png" alt="" className="media-grayscale aspect-[4/5] w-full object-cover" />
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-ink/50">
              {t.studio.captions[0]}
            </p>
          </div>
          <div className="col-span-12 mt-10 md:col-span-5 md:col-start-8 md:mt-24">
            <div className="overflow-hidden bg-accent">
              <img data-reveal-media data-studio-parallax src="/images/archive_still_life.png" alt="" className="media-grayscale aspect-[4/5] w-full object-cover" />
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-ink/50">
              {t.studio.captions[1]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
