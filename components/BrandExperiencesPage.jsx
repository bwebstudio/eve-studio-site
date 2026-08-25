"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";
import { BRAND_EXPERIENCE_SUPPORT } from "@/lib/projects";
import TransitionLink from "./TransitionLink";

const EASE = [0.22, 1, 0.36, 1];

/**
 * /services/brand-experiences — pillar 02.
 *
 * Editorial, typography-first: numbering and hairlines instead of icons,
 * one CTA at the top and one at the close, and nothing that reads as a
 * marketing landing page. Motion is limited to the site-wide
 * [data-reveal] fade + small rise (GSAP) and the same heading rise the
 * other inner pages use — both neutralised by prefers-reduced-motion via
 * the global rules in globals.css, so the page is complete without them.
 *
 * Rhythm mirrors WorkCategoryPage / AllServicesPage (eyebrow rail → big
 * h1 → lede → sections) so the route feels part of one system.
 */

/**
 * Visual support — real, authorised project (Alena Angel Art).
 *
 * Deliberately NOT a case study: no title link, no project page, no
 * embedded site, no portfolio grid. Just a couple of frames sitting
 * inside the narrative as evidence of the kind of work described above.
 *
 * Renders nothing at all while `BRAND_EXPERIENCE_SUPPORT` is empty — no
 * placeholder boxes, no stand-in imagery, and no empty gap in the
 * vertical rhythm.
 */
function SupportMedia({ copy }) {
  if (!BRAND_EXPERIENCE_SUPPORT.length) return null;

  return (
    <section className="mt-20 border-t border-ink/10 pt-10 md:mt-28 md:pt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="text-[10px] uppercase tracking-[0.24em] text-ink/60">
          {copy.eyebrow}
        </p>
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink/70">
          {copy.project}
        </p>
      </div>
      <p
        data-reveal
        className="mt-4 max-w-[52ch] text-[13px] text-ink/65 md:text-[14px]"
        style={{ lineHeight: 1.6 }}
      >
        {copy.note}
      </p>
      <div className="mt-8 grid grid-cols-12 gap-5 md:mt-10 md:gap-6 lg:gap-8">
        {BRAND_EXPERIENCE_SUPPORT.map((item) => (
          <div
            key={item.src}
            data-reveal-media
            className={item.span || "col-span-12 md:col-span-6"}
          >
            <div
              className={`relative w-full overflow-hidden bg-ink/5 ${
                item.aspect || "aspect-[4/5]"
              }`}
            >
              <img
                src={item.src}
                alt={item.alt || copy.project}
                loading="lazy"
                decoding="async"
                draggable="false"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function BrandExperiencesPage() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -5% 0px",
  });

  const b = t.brandExperiences;

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
        {/* ── Block 1 — hero ─────────────────────────────────────────── */}
        <div className="flex items-baseline justify-between gap-6 text-[11px] uppercase tracking-[0.22em] text-ink/60">
          <span>{b.eyebrow}</span>
          <TransitionLink href="/" className="link-underline text-ink">
            {t.ui.index}
          </TransitionLink>
        </div>

        <motion.h1
          ref={headingRef}
          // Reduced motion: the title renders in place, no rise, no fade.
          initial={reduce ? false : { opacity: 0, y: 48 }}
          animate={
            reduce || headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }
          }
          transition={{ duration: 1.0, ease: EASE }}
          className="mt-8 uppercase text-ink md:mt-10"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            // Caps run wide: this scales a step below the other inner
            // pages so the two-word title never breaks past 3 lines on a
            // 320px screen.
            fontSize: "clamp(2.5rem, 7.5vw, 6rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            willChange: "transform, opacity",
          }}
        >
          {b.h1}
        </motion.h1>

        <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-6 md:mt-10 md:gap-x-10">
          <p
            data-reveal
            className="col-span-12 max-w-[24ch] text-ink md:col-span-7"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "clamp(1.35rem, 2.6vw, 2.15rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {b.lead}
          </p>
          <div className="col-span-12 flex flex-col justify-end gap-6 md:col-span-5">
            <p
              data-reveal
              className="max-w-[46ch] text-[15px] text-ink/70 md:text-base"
              style={{ lineHeight: 1.6 }}
            >
              {b.sub}
            </p>
            <a
              data-reveal
              href="/#contact"
              data-cursor="cta"
              data-magnetic="0.2"
              className="group -mt-4 inline-flex w-fit items-center gap-3 border-b border-ink pb-2 pt-4 text-[11px] uppercase tracking-[0.22em] text-ink"
            >
              <span>{b.cta}</span>
              <span
                aria-hidden="true"
                className="text-sm leading-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* ── Block 2 — what it means ────────────────────────────────── */}
        <section className="mt-24 border-t border-ink/10 pt-10 md:mt-32 md:pt-14">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6 md:gap-x-10">
            <h2
              data-reveal
              className="col-span-12 max-w-[16ch] text-ink md:col-span-6"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "clamp(1.85rem, 4.2vw, 3.25rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
              }}
            >
              {b.meaning.title}
            </h2>
            <p
              data-reveal
              className="col-span-12 max-w-[50ch] self-end text-[16px] text-ink/75 md:col-span-6 md:text-[18px]"
              style={{ lineHeight: 1.6 }}
            >
              {b.meaning.body}
            </p>
          </div>
        </section>

        {/* ── Block 3 — what we can create ───────────────────────────── */}
        <section className="mt-24 md:mt-32">
          <h2
            data-reveal
            className="text-[11px] uppercase tracking-[0.24em] text-ink"
            style={{ fontWeight: 500 }}
          >
            {b.create.title}
          </h2>
          <ul className="mt-8 border-t border-ink/10 md:mt-10">
            {b.create.items.map((item, i) => (
              <li
                key={item}
                data-reveal
                className="group flex items-baseline gap-5 border-b border-ink/10 py-5 md:gap-8 md:py-6"
              >
                <span
                  aria-hidden="true"
                  className="w-6 flex-shrink-0 text-[10px] uppercase tracking-[0.22em] text-ink/60 md:w-8 md:text-[11px]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "clamp(1.15rem, 2.4vw, 1.85rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Block 4 — the process ──────────────────────────────────── */}
        <section className="mt-24 md:mt-32">
          <h2
            data-reveal
            className="text-[11px] uppercase tracking-[0.24em] text-ink"
            style={{ fontWeight: 500 }}
          >
            {b.process.title}
          </h2>

          {/* Mobile / tablet: vertical timeline — a hairline runs down the
              left of the stack and each step hangs off it.
              Desktop (lg+): five columns, each capped by its own rule. */}
          <ol className="mt-8 border-l border-ink/15 pl-6 md:mt-10 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:border-l-0 lg:pl-0">
            {b.process.steps.map((step, i) => (
              <li
                key={step.n}
                data-reveal
                className={`relative pb-9 last:pb-0 lg:border-t lg:border-ink/15 lg:pb-0 lg:pt-5 ${
                  i === 0 ? "pt-0" : ""
                }`}
              >
                {/* Timeline node — mobile only */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[26px] top-[0.55em] h-px w-4 bg-ink/30 lg:hidden"
                />
                <p className="text-[10px] uppercase tracking-[0.24em] text-ink/60 md:text-[11px]">
                  {step.n}
                </p>
                <h3
                  className="mt-2 text-ink"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "clamp(1.15rem, 1.9vw, 1.5rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {step.label}
                </h3>
                <p
                  className="mt-3 max-w-[44ch] text-[14px] text-ink/70 md:text-[15px] lg:text-[13.5px]"
                  style={{ lineHeight: 1.6 }}
                >
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Visual support (renders only when assets exist) ────────── */}
        <SupportMedia copy={b.support} />

        {/* ── Block 5 — what an experience can include ───────────────── */}
        <section className="mt-24 md:mt-32">
          <h2
            data-reveal
            className="max-w-[18ch] text-ink"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "clamp(1.85rem, 4.2vw, 3.25rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
            }}
          >
            {b.includes.title}
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-x-10 border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {b.includes.items.map((item) => (
              <li
                key={item}
                data-reveal
                className="border-b border-ink/10 py-4 text-[15px] text-ink/85 md:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
          <p
            data-reveal
            className="mt-8 max-w-[46ch] text-ink/60"
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              lineHeight: 1.45,
            }}
          >
            {b.includes.note}
          </p>
        </section>

        {/* ── Block 6 — the result ───────────────────────────────────── */}
        <section className="mt-24 border-t border-ink/10 pt-10 md:mt-32 md:pt-14">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6 md:gap-x-10">
            <h2
              data-reveal
              className="col-span-12 max-w-[16ch] text-ink md:col-span-6"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "clamp(1.85rem, 4.2vw, 3.25rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
              }}
            >
              {b.result.title}
            </h2>
            <p
              data-reveal
              className="col-span-12 max-w-[50ch] self-end text-[16px] text-ink/75 md:col-span-6 md:text-[18px]"
              style={{ lineHeight: 1.6 }}
            >
              {b.result.body}
            </p>
          </div>

          {/* Closing line — the typographic peak of the page. */}
          <p
            data-reveal
            className="mt-16 max-w-[20ch] text-ink md:mt-24"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "clamp(2.1rem, 6vw, 4.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
            }}
          >
            {b.result.closing}
          </p>
        </section>

        {/* ── Block 7 — closing CTA (the page's only other CTA) ──────── */}
        <section className="mt-24 border-t border-ink/10 pt-10 md:mt-32 md:pt-14">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6 md:gap-x-10">
            <h2
              data-reveal
              className="col-span-12 max-w-[14ch] text-ink md:col-span-6"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "clamp(1.85rem, 4.2vw, 3.25rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
              }}
            >
              {b.close.title}
            </h2>
            <div className="col-span-12 flex flex-col justify-end gap-7 md:col-span-6">
              <p
                data-reveal
                className="max-w-[48ch] text-[16px] text-ink/75 md:text-[17px]"
                style={{ lineHeight: 1.6 }}
              >
                {b.close.body}
              </p>
              <a
                data-reveal
                href="/#contact"
                data-cursor="cta"
                data-magnetic="0.2"
                className="group -mt-4 inline-flex w-fit items-center gap-3 border-b border-ink pb-2 pt-4 text-[11px] uppercase tracking-[0.22em] text-ink"
              >
                <span>{b.close.cta}</span>
                <span
                  aria-hidden="true"
                  className="text-sm leading-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
