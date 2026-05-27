"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";
import projects, {
  PROJECT_ORDER,
  PROJECT_IMAGES,
  PROJECTS_BY_CATEGORY,
} from "@/lib/projects";
import TransitionLink from "./TransitionLink";
import ProjectGallerySlider from "./ProjectGallerySlider";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Reverse-lookup which category a slug belongs to, using the same
 * PROJECTS_BY_CATEGORY map that drives /work/[category]. Lets the
 * case study show a proper "Work / Events" breadcrumb and link the
 * back arrow to the right category page.
 */
function findCategoryKey(slug) {
  for (const [key, list] of Object.entries(PROJECTS_BY_CATEGORY)) {
    if (list.some((p) => p.slug === slug)) return key;
  }
  return null;
}

/**
 * A single content section (text + optional image OR video) styled to
 * match the rest of the case study. Each section gallery item can be
 * either a plain string (image URL) or an object describing a richer
 * media — currently { type: "video", src, poster, alt, aspect, grade }.
 * The grade prop maps to a CSS class ("warm-duotone") so individual
 * media can carry the project's chromatic signature without bleeding
 * the treatment into every other case study.
 */
function ProjectSection({ index, section, media, projectTitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -5% 0px" });
  const imageLeft = index % 2 === 1;

  const mediaItem = typeof media === "string" || !media ? { src: media } : media;
  const isVideo = mediaItem.type === "video";
  const aspectClass = mediaItem.aspect || "aspect-[4/5]";
  // Grade-driven chromatic treatment. Each value (e.g. "warm-duotone",
  // "red-duotone") maps to a trio of CSS classes defined in globals.css:
  //   .media-<grade>-wrap  → hover anchor on the container
  //   .media-<grade>       → CSS filter on the image/video element
  //   .media-<grade>__tint → mix-blend gradient overlay
  // Adding a new grade is a CSS-only change.
  const grade = mediaItem.grade;
  const gradeWrapClass = grade ? `media-${grade}-wrap` : "";
  const gradeMediaClass = grade ? `media-${grade}` : "";
  const gradeTintClass = grade ? `media-${grade}__tint` : "";

  return (
    <section
      ref={ref}
      className="mt-12 grid grid-cols-12 gap-6 border-t border-ink/10 pt-10 md:mt-16 md:gap-10 md:pt-12 lg:gap-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.9, ease: EASE }}
        className={`col-span-12 flex flex-col justify-center md:col-span-6 ${
          imageLeft ? "md:order-2" : "md:order-1"
        }`}
      >
        <p
          className="text-[10px] uppercase tracking-[0.24em] text-ink/45"
          style={{ fontWeight: 500 }}
        >
          ({String(index + 1).padStart(2, "0")})
        </p>
        <h2
          className="mt-3 text-ink"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(1.85rem, 4.5vw, 3.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
          }}
        >
          {section.label}
        </h2>
        <p
          className="mt-5 max-w-[52ch] text-[15px] text-ink/75 md:mt-6 md:text-base"
          style={{ lineHeight: 1.6 }}
        >
          {section.body}
        </p>
      </motion.div>

      {mediaItem.src && (
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
          className={`col-span-12 md:col-span-6 ${
            imageLeft ? "md:order-1" : "md:order-2"
          }`}
        >
          <div
            className={`relative w-full overflow-hidden bg-ink/5 ${aspectClass} ${gradeWrapClass}`}
          >
            {isVideo ? (
              <video
                src={mediaItem.src}
                poster={mediaItem.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label={mediaItem.alt || `${projectTitle} — ${section.label}`}
                className={`absolute inset-0 h-full w-full object-cover ${gradeMediaClass}`}
              />
            ) : (
              <img
                src={mediaItem.src}
                alt={mediaItem.alt || `${projectTitle} — ${section.label}`}
                loading="lazy"
                decoding="async"
                draggable="false"
                className={`absolute inset-0 h-full w-full object-cover ${gradeMediaClass}`}
              />
            )}
            {grade && <span aria-hidden="true" className={gradeTintClass} />}
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default function CaseStudy({ slug }) {
  const { lang, t } = useLang();
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -5% 0px",
  });

  const project = projects[lang]?.[slug];
  const images = PROJECT_IMAGES[slug];

  const categoryKey = findCategoryKey(slug);
  const category = categoryKey ? t.workCategories[categoryKey] : null;
  const backHref = categoryKey ? `/work/${categoryKey}` : "/";

  const currentIdx = PROJECT_ORDER.indexOf(slug);
  const nextSlug = PROJECT_ORDER[(currentIdx + 1) % PROJECT_ORDER.length];
  const nextProject = projects[lang]?.[nextSlug];
  const nextCategoryKey = findCategoryKey(nextSlug);
  const nextCategoryLabel = nextCategoryKey
    ? t.workCategories[nextCategoryKey]?.title
    : null;

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);
    }, rootRef);
    return () => ctx.revert();
  }, [slug]);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg text-ink">
        <p>Project not found.</p>
      </div>
    );
  }

  const servicesLabel = lang === "es" ? "Servicios" : "Services";
  const clientLabel = lang === "es" ? "Cliente" : "Client";
  const locationLabel = lang === "es" ? "Ubicación" : "Location";
  const yearLabel = lang === "es" ? "Año" : "Year";
  const nextLabel = lang === "es" ? "Siguiente proyecto" : "Next project";
  const pressLabel = lang === "es" ? "Prensa" : "Press";
  const featuredByLabel = lang === "es" ? "Publicado en" : "Featured by";
  const backToStudioLabel = lang === "es" ? "← Volver al estudio" : "← Back to studio";
  const backToCategoryLabel = category
    ? lang === "es"
      ? `← ${category.title}`
      : `← ${category.title}`
    : null;

  const eyebrow = category
    ? category.eyebrow
    : lang === "es"
    ? "Trabajo"
    : "Work";

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-bg pt-[120px] md:pt-[152px] lg:pt-[176px]"
    >
      <div className="mx-auto max-w-frame px-6 pb-[80px] md:px-10 md:pb-[112px] lg:px-12 lg:pb-[128px]">
        {/* Eyebrow + back link — same pattern as WorkCategoryPage */}
        <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
          <span>{eyebrow}</span>
          <TransitionLink href={backHref} className="link-underline text-ink">
            {category ? backToCategoryLabel : "← Index"}
          </TransitionLink>
        </div>

        {/* Project title */}
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
          {project.title}
        </motion.h1>

        {/* Subtitle + CTA row */}
        <div className="mt-6 grid grid-cols-12 gap-6 md:mt-8 md:gap-8">
          <p
            data-reveal
            className="col-span-12 max-w-[58ch] text-base text-ink/75 md:col-span-7 md:text-[17px]"
            style={{ lineHeight: 1.55 }}
          >
            {project.subtitle}
          </p>
          <div className="col-span-12 mt-4 flex md:col-span-5 md:mt-0 md:justify-end">
            <a
              href="/#contact"
              data-cursor="cta"
              data-magnetic="0.2"
              className="link-underline text-[11px] uppercase tracking-[0.22em] text-ink"
            >
              {lang === "es" ? "Empezar un proyecto" : "Start a project"} ↗
            </a>
          </div>
        </div>

        {/* Hero image */}
        <motion.div
          data-reveal-media
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
          className="relative mt-12 aspect-[16/9] w-full overflow-hidden bg-ink/5 md:mt-16"
        >
          <img
            src={images?.hero}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
            draggable="false"
          />
        </motion.div>

        {/* Meta strip — Client / Location / Year / Services */}
        <div className="mt-12 grid grid-cols-12 gap-6 border-t border-ink/10 pt-8 text-[11px] uppercase tracking-[0.22em] text-ink/60 md:mt-16 md:gap-8 md:pt-10">
          <div data-reveal className="col-span-6 md:col-span-3">
            <p className="text-ink/40">{clientLabel}</p>
            <p className="mt-2 text-ink normal-case tracking-normal">
              {project.client}
            </p>
          </div>
          <div data-reveal className="col-span-6 md:col-span-3">
            <p className="text-ink/40">{locationLabel}</p>
            <p className="mt-2 text-ink normal-case tracking-normal">
              {project.location}
            </p>
          </div>
          <div data-reveal className="col-span-6 md:col-span-3">
            <p className="text-ink/40">{yearLabel}</p>
            <p className="mt-2 text-ink normal-case tracking-normal">
              {project.year}
            </p>
          </div>
          <div data-reveal className="col-span-6 md:col-span-3">
            <p className="text-ink/40">{servicesLabel}</p>
            <p className="mt-2 text-ink normal-case tracking-normal">
              {project.services.slice(0, 3).join(", ")}
            </p>
          </div>
        </div>

        {/* Intro */}
        <div className="mt-12 grid grid-cols-12 gap-6 md:mt-16 md:gap-8">
          <p
            data-reveal
            className="col-span-12 text-lg text-ink md:col-span-9 md:text-xl"
            style={{ fontWeight: 500, lineHeight: 1.4 }}
          >
            {project.intro}
          </p>
        </div>

        {/* Content sections — each section's gallery item can be an
            image URL string or a richer media object (e.g. video). */}
        {project.sections.map((section, i) => {
          const media = images?.gallery?.[i];
          return (
            <ProjectSection
              key={i}
              index={i}
              section={section}
              media={media}
              projectTitle={project.title}
            />
          );
        })}

        {/* Extra editorial gallery — only rendered when the project
            defines additional images beyond the section ones. Each
            item declares its own col-span and aspect, so projects like
            Backyard dello Specchio can breathe with asymmetric pairs
            and full-bleed landscape frames. When extraGalleryMode is
            "slider", the same items feed the editorial slider instead
            of the stacked grid. */}
        {images?.extraGallery?.length > 0 && images.extraGalleryMode === "slider" && (
          <ProjectGallerySlider
            items={images.extraGallery}
            projectTitle={project.title}
          />
        )}

        {images?.extraGallery?.length > 0 && images.extraGalleryMode !== "slider" && (
          <div className="mt-12 grid grid-cols-12 gap-5 md:mt-16 md:gap-6 lg:gap-8">
            {images.extraGallery.map((item, i) => (
              <div
                key={item.src}
                data-reveal-media
                className={item.span || "col-span-12"}
              >
                <div
                  className={`relative w-full overflow-hidden bg-ink/5 ${
                    item.aspect || "aspect-[3/2]"
                  }`}
                >
                  {item.type === "video" ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={item.alt || `${project.title} — ${i + 1}`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt || `${project.title} — ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Full services list */}
        <div
          data-reveal
          className="mt-12 grid grid-cols-12 gap-6 border-t border-ink/10 pt-8 md:mt-16 md:gap-8 md:pt-10"
        >
          <p className="col-span-12 text-[10px] uppercase tracking-[0.24em] text-ink/45 md:col-span-3" style={{ fontWeight: 500 }}>
            {servicesLabel}
          </p>
          <ul className="col-span-12 grid grid-cols-1 gap-y-2 text-[14px] text-ink/80 sm:grid-cols-2 md:col-span-9">
            {project.services.map((s) => (
              <li key={s} className="flex items-baseline gap-2.5">
                <span className="h-px w-3 flex-shrink-0 translate-y-[-3px] bg-ink/40" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Press credit — optional, only if the project was picked up
            by an external publication. Quiet editorial line, no logo,
            no marketing language. */}
        {project.press?.url && (
          <div
            data-reveal
            className="mt-8 flex flex-col gap-2 text-[11px] uppercase tracking-[0.22em] text-ink/55 md:flex-row md:items-baseline md:gap-4"
          >
            <span className="text-ink/40">{pressLabel}</span>
            <span className="text-ink/55 normal-case tracking-normal md:tracking-normal">
              {featuredByLabel}{" "}
              <a
                href={project.press.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-ink"
              >
                {project.press.label}
              </a>{" "}
              ↗
            </span>
          </div>
        )}

        {/* Next project — compact, light, matches the rest */}
        {nextProject && (
          <div className="mt-16 border-t border-ink/10 pt-10 md:mt-24 md:pt-12">
            <div className="flex items-baseline justify-between gap-6">
              <p
                className="text-[10px] uppercase tracking-[0.24em] text-ink/45"
                style={{ fontWeight: 500 }}
              >
                {nextLabel}
              </p>
              {nextCategoryLabel && (
                <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55">
                  {nextCategoryLabel}
                </p>
              )}
            </div>
            <TransitionLink
              href={`/work/${nextSlug}`}
              className="group mt-6 grid grid-cols-12 items-center gap-6 md:mt-8"
              data-cursor="cta"
              data-magnetic="0.2"
            >
              <h3
                className="col-span-12 text-ink transition-opacity duration-500 group-hover:opacity-80 md:col-span-10"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "clamp(2.25rem, 6vw, 5rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.035em",
                }}
              >
                {nextProject.title}
              </h3>
              <span
                aria-hidden="true"
                className="col-span-12 text-sm leading-none text-ink/70 transition-transform duration-500 group-hover:translate-x-1.5 md:col-span-2 md:justify-self-end md:text-base"
              >
                →
              </span>
            </TransitionLink>
            <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-ink/55">
              {nextProject.discipline} — {nextProject.year}
            </p>
          </div>
        )}

        {/* Footer row */}
        <div className="mt-16 flex items-center justify-between border-t border-ink/10 pt-6 text-[11px] uppercase tracking-[0.22em] text-ink/60 md:mt-24 md:pt-7">
          <TransitionLink href="/" className="link-underline text-ink">
            {backToStudioLabel}
          </TransitionLink>
          <span>{t.work.sectionIndex}</span>
        </div>
      </div>
    </section>
  );
}
