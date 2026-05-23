"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";
import TransitionLink from "./TransitionLink";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Shared layout for the three Work category routes (/work/events,
 * /work/social-media, /work/photo-video).
 *
 * Renders the category eyebrow / title / intro, an optional grid of
 * projects (sourced from the parent route), and a CTA back to
 * contact. Designed to mirror the home Work section visually so the
 * brand reads as one continuous editorial system.
 *
 * Projects are passed in by the page; each project = { slug, title,
 * discipline, year, cover }. When `projects` is empty we render the
 * editorial "coming soon" placeholder copy from content.js.
 */
export default function WorkCategoryPage({ categoryKey, projects = [] }) {
  const { t } = useLang();
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -5% 0px",
  });

  const cat = t.workCategories[categoryKey];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  if (!cat) {
    return null;
  }

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-bg pt-[120px] md:pt-[152px] lg:pt-[176px]"
    >
      <div className="mx-auto max-w-frame px-6 pb-[80px] md:px-10 md:pb-[112px] lg:px-12 lg:pb-[128px]">
        {/* Eyebrow + back link */}
        <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
          <span>{cat.eyebrow}</span>
          <TransitionLink href="/" className="link-underline text-ink">
            ← Index
          </TransitionLink>
        </div>

        {/* Headline */}
        <motion.h1
          ref={headingRef}
          initial={{ opacity: 0, y: 56 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
          transition={{ duration: 1.05, ease: EASE }}
          className="mt-8 text-ink md:mt-10"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(3rem, 9vw, 7rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            willChange: "transform, opacity",
          }}
        >
          {cat.title}
        </motion.h1>

        <div className="mt-6 grid grid-cols-12 gap-6 md:mt-8 md:gap-8">
          <p
            data-reveal
            className="col-span-12 max-w-[58ch] text-base text-ink/75 md:col-span-7 md:text-[17px]"
            style={{ lineHeight: 1.55 }}
          >
            {cat.intro}
          </p>
          <div className="col-span-12 mt-4 flex md:col-span-5 md:mt-0 md:justify-end">
            <a
              href="/#contact"
              data-cursor="cta"
              data-magnetic="0.2"
              className="link-underline text-[11px] uppercase tracking-[0.22em] text-ink"
            >
              {cat.cta} ↗
            </a>
          </div>
        </div>

        {/* Projects grid OR empty state */}
        {projects.length > 0 ? (
          <div className="mt-16 grid grid-cols-12 gap-6 md:mt-20 md:gap-8">
            {projects.map((p, i) => {
              const span =
                i % 3 === 0
                  ? "md:col-span-7"
                  : i % 3 === 1
                  ? "md:col-span-5 md:mt-12"
                  : "md:col-span-6 md:col-start-4";
              return (
                <article
                  key={p.slug}
                  className={`group col-span-12 ${span}`}
                  data-cursor="media"
                  data-cursor-label="View"
                  data-reveal
                >
                  <TransitionLink href={`/work/${p.slug}`} className="block">
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <img
                        src={p.cover}
                        alt={p.title}
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                        className="media-grayscale absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-6">
                      <div>
                        <h2 className="text-2xl text-ink md:text-3xl">
                          {p.title}
                        </h2>
                        <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-ink/60">
                          {p.discipline}
                        </p>
                      </div>
                      {p.year && (
                        <span className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
                          {p.year}
                        </span>
                      )}
                    </div>
                  </TransitionLink>
                </article>
              );
            })}
          </div>
        ) : (
          <div
            data-reveal
            className="mt-16 border-t border-ink/10 pt-12 text-center md:mt-20 md:pt-16"
          >
            <p
              className="mx-auto max-w-[40ch] text-[15px] text-ink/65 md:text-base"
              style={{ lineHeight: 1.55 }}
            >
              {cat.empty}
            </p>
            <a
              href="/#contact"
              className="link-underline mt-6 inline-block text-[11px] uppercase tracking-[0.22em] text-ink"
            >
              {cat.cta} ↗
            </a>
          </div>
        )}

        {/* Footer row */}
        <div className="mt-16 flex items-center justify-between border-t border-ink/10 pt-6 text-[11px] uppercase tracking-[0.22em] text-ink/60 md:mt-24 md:pt-7">
          <TransitionLink href="/" className="link-underline text-ink">
            ← Back to studio
          </TransitionLink>
          <span>{t.work.sectionIndex}</span>
        </div>
      </div>
    </section>
  );
}
