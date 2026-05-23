"use client";

import { useEffect, useRef } from "react";
import TransitionLink from "./TransitionLink";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";
import { PROJECT_IMAGES } from "@/lib/projects";

/**
 * Project card — simplified. The previous version translated each
 * card up from `window.innerHeight` below its layout position and
 * applied a scroll-linked image scale. Both effects could overlap
 * visually when the user scrolled back up past a card (especially
 * with browser back-forward cache), so we replaced them with a
 * single opacity+small-y reveal via [data-reveal] — no scroll-linked
 * transforms, no per-card scroll listeners.
 */
function ProjectCard({ p, layout }) {
  const images = PROJECT_IMAGES[p.slug];
  const heroImg = images?.hero;

  return (
    <article
      data-cursor="media"
      data-cursor-label="View"
      data-reveal
      className={`group ${layout.span}`}
    >
      <TransitionLink href={`/work/${p.slug}`} className="block">
        <div className={`relative w-full overflow-hidden ${layout.aspect}`}>
          <img
            src={heroImg}
            alt={p.title}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="media-grayscale absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-ink opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-[0.12]"
          />
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div className="flex items-start gap-6">
            <span className="text-[11px] uppercase tracking-[0.22em] text-ink/50">({p.index})</span>
            <div>
              <h3 className="text-2xl text-ink md:text-3xl">{p.title}</h3>
              <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-ink/60">{p.discipline}</p>
            </div>
          </div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-ink/50">{p.year}</span>
        </div>
      </TransitionLink>
    </article>
  );
}

// Compact 2x2 grid — the full archive lives behind the Work overlay
// and the per-category routes, so the home only shows a tight proof
// of recent work rather than the full archive.
const GRID = [
  { span: "col-span-12 md:col-span-6", aspect: "aspect-[4/5]" },                             // Casa Lumen
  { span: "col-span-12 md:col-span-5 md:col-start-8 md:mt-16", aspect: "aspect-[4/5]" },     // Ornela
  { span: "col-span-12 md:col-span-5 md:col-start-2", aspect: "aspect-[4/5]" },              // Amaranta
  { span: "col-span-12 md:col-span-5 md:col-start-8 md:mt-12", aspect: "aspect-[4/5]" },     // Hotel Varela
];

export default function SelectedWork({ onOpenOverlay }) {
  const { t } = useLang();
  const rootRef = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const w = t.work;
  const projects = (w.projects || []).slice(0, 4);

  return (
    <section
      ref={rootRef}
      id="work"
      className="relative w-full overflow-hidden border-t border-ink/10 bg-bg pt-12 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24"
    >
      <div className="mx-auto max-w-frame px-6 md:px-10 lg:px-12">
        {/* Header row — Kaiora pattern: eyebrow left + CTA right */}
        <div data-reveal className="flex items-baseline justify-between gap-6">
          <p
            className="text-[11px] uppercase tracking-[0.24em] text-ink"
            style={{ fontWeight: 500 }}
          >
            {w.eyebrow}
          </p>
          {onOpenOverlay ? (
            <button
              type="button"
              onClick={onOpenOverlay}
              data-cursor="cta"
              data-magnetic="0.2"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink"
            >
              <span className="border-b border-ink pb-1">
                {w.categoriesHeading}
              </span>
              <span
                aria-hidden="true"
                className="text-sm leading-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </button>
          ) : (
            <a
              href="#contact"
              data-cursor="cta"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink"
            >
              <span className="border-b border-ink pb-1">{w.footerCta}</span>
            </a>
          )}
        </div>

        {/* Compact 2x2 archive proof */}
        <div className="mt-8 grid grid-cols-12 gap-6 md:mt-10 md:gap-8">
          {projects.map((p, i) => {
            const layout = GRID[i] || GRID[0];
            return <ProjectCard key={p.index} p={p} layout={layout} />;
          })}
        </div>

        {/* Footer row */}
        <div className="mt-12 flex items-center justify-between border-t border-ink/10 pt-5 text-[11px] uppercase tracking-[0.22em] text-ink/55 md:mt-16 md:pt-6">
          <span>{w.footer}</span>
          <a href="#contact" className="link-underline text-ink">
            {w.footerCta}
          </a>
        </div>
      </div>
    </section>
  );
}
