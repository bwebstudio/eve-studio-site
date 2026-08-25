"use client";

import projects from "@/lib/projects";
import TransitionLink from "./TransitionLink";

/**
 * One project card in a work grid — used by the /work index and by the
 * per-category archives, so the two stay identical.
 *
 * A card only becomes a link when a case study actually exists for its
 * slug. Newly added material (Ramón Freixa, Downhillitalia) has its
 * images but not its written copy yet, so those render as plain figures
 * instead of pointing at a "Project not found" page. They turn into
 * links the moment the case study lands in lib/projects.js.
 */
export default function WorkCard({ project: p, className = "" }) {
  const hasCaseStudy = Boolean(projects.en?.[p.slug]);
  const Card = hasCaseStudy ? TransitionLink : "div";
  const cardProps = hasCaseStudy
    ? { href: `/work/${p.slug}`, className: "block" }
    : { className: "block" };

  return (
    <article
      className={`group col-span-12 ${className}`}
      data-cursor={hasCaseStudy ? "media" : undefined}
      data-cursor-label={hasCaseStudy ? "View" : undefined}
      data-reveal
    >
      <Card {...cardProps}>
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <img
            src={p.cover}
            alt={p.title}
            loading="lazy"
            decoding="async"
            draggable="false"
            className={`media-grayscale absolute inset-0 h-full w-full object-cover ${
              p.tilt
                ? "card-tilt-correct"
                : "transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            }`}
          />
        </div>
        <div className="mt-4 flex items-start justify-between gap-6">
          <div>
            <h2 className="text-2xl text-ink md:text-3xl">{p.title}</h2>
            {p.discipline && (
              <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-ink/60">
                {p.discipline}
              </p>
            )}
          </div>
          {p.year && (
            <span className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
              {p.year}
            </span>
          )}
        </div>
      </Card>
    </article>
  );
}
