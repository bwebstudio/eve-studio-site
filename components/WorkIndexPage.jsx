"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";
import { ALL_PROJECTS } from "@/lib/projects";
import TransitionLink from "./TransitionLink";
import WorkCard from "./WorkCard";

const EASE = [0.22, 1, 0.36, 1];

/**
 * /work — the portfolio index.
 *
 * "Work" was taken out of the main menu and "Selected work" out of the
 * home, which left the archives reachable only by guessing that a
 * service card led to one. This page gives the work a single, crawlable
 * address again; the footer links to it.
 *
 * Every project in one grid rather than a category chooser: with the
 * placeholder projects gone the real archive is small enough that
 * splitting it would read as emptier than it is. The per-category
 * archives (/work/events, /work/photo-video) stay exactly as they were.
 *
 * Copy comes from the existing `work` block in content.js — no new
 * strings — and the chrome mirrors WorkCategoryPage so the route feels
 * part of the same system.
 */
export default function WorkIndexPage() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -5% 0px",
  });

  const w = t.work;

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
      className="relative w-full bg-bg pt-[120px] md:pt-[152px] lg:pt-[176px]"
    >
      <div className="mx-auto max-w-frame px-6 pb-[80px] md:px-10 md:pb-[112px] lg:px-12 lg:pb-[128px]">
        {/* Eyebrow + back link */}
        <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
          <span>{w.eyebrow}</span>
          <TransitionLink href="/" className="link-underline text-ink">
            {t.ui.index}
          </TransitionLink>
        </div>

        {/* Headline */}
        <motion.h1
          ref={headingRef}
          initial={reduce ? false : { opacity: 0, y: 56 }}
          animate={
            reduce || headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }
          }
          transition={{ duration: 1.05, ease: EASE }}
          className="mt-8 text-ink md:mt-10"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            // A step smaller than the category pages': their titles are
            // one short word ("Events"), this one is a full phrase whose
            // longest word ("collaborations." / "Colaboraciones") can't
            // break, and at their size it pushed past a 320px viewport.
            fontSize: "clamp(2.125rem, 10vw, 6rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            willChange: "transform, opacity",
          }}
        >
          {w.title} {w.titleItalic}
        </motion.h1>

        {/* No intro paragraph: the existing `work.lede` ends in "choose a
            category to enter the relevant work", which describes the old
            category chooser, not this grid. Rather than write new copy —
            that sits with the client's copywriter — the row carries the
            CTA alone until an intro for this page is approved. */}
        <div className="mt-6 grid grid-cols-12 gap-6 md:mt-8 md:gap-8">
          <div className="col-span-12 mt-4 flex md:col-span-12 md:mt-0 md:justify-end">
            <a
              href="/#contact"
              data-cursor="cta"
              data-magnetic="0.2"
              className="link-underline text-[11px] uppercase tracking-[0.22em] text-ink"
            >
              {t.ui.startProject} ↗
            </a>
          </div>
        </div>

        {/* All projects */}
        <div className="mt-16 grid grid-cols-12 gap-6 md:mt-20 md:gap-8">
          {ALL_PROJECTS.map((p, i) => {
            const span =
              i % 3 === 0
                ? "md:col-span-7"
                : i % 3 === 1
                ? "md:col-span-5 md:mt-12"
                : "md:col-span-6 md:col-start-4";
            return <WorkCard key={p.slug} project={p} className={span} />;
          })}
        </div>

        {/* Footer row */}
        <div className="mt-16 flex items-center justify-between border-t border-ink/10 pt-6 text-[11px] uppercase tracking-[0.22em] text-ink/60 md:mt-24 md:pt-7">
          <TransitionLink href="/" className="link-underline text-ink">
            {t.ui.backToStudio}
          </TransitionLink>
          <span>{w.sectionIndex}</span>
        </div>
      </div>
    </section>
  );
}
