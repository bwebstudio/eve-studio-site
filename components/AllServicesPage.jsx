"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";
import TransitionLink from "./TransitionLink";

const EASE = [0.22, 1, 0.36, 1];

const SERVICE_HREF = {
  events: "/work/events",
  "social-media": "/work/social-media",
  "photo-video": "/work/photo-video",
};

/**
 * Dedicated /services page — a deeper, less compressed companion to
 * the home Services strip. Each discipline gets a full editorial
 * block: large image, name, tagline, full bullet list, longer note,
 * and a clear path into the matching /work/[category] route.
 *
 * Layout mirrors the WorkCategoryPage rhythm (eyebrow + back link
 * header, big sans h1, lede, footer row) so navigation feels like
 * one coherent system.
 */
export default function AllServicesPage() {
  const { t, lang } = useLang();
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -5% 0px",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const pageTitle = lang === "es" ? "Servicios" : "Services";
  const pageLede =
    lang === "es"
      ? "Tres disciplinas, un estudio. Cada una se trabaja como un sistema completo — estrategia, dirección y ejecución bajo una misma mirada editorial."
      : "Three disciplines, one studio. Each is treated as a complete system — strategy, direction and execution under one editorial eye.";
  const exploreCta =
    lang === "es" ? "Ver los proyectos" : "Explore the work";
  const startCta =
    lang === "es" ? "Empezar un proyecto" : "Start a project";
  const indexLabel = lang === "es" ? "← Inicio" : "← Index";
  const backLabel = lang === "es" ? "← Volver al estudio" : "← Back to studio";

  return (
    <section
      ref={rootRef}
      className="relative w-full bg-bg pt-[120px] md:pt-[152px] lg:pt-[176px]"
    >
      <div className="mx-auto max-w-frame px-6 pb-[80px] md:px-10 md:pb-[112px] lg:px-12 lg:pb-[128px]">
        {/* Top row */}
        <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
          <span>{t.services.sectionLabel}</span>
          <TransitionLink href="/" className="link-underline text-ink">
            {indexLabel}
          </TransitionLink>
        </div>

        {/* H1 + lede */}
        <motion.h1
          ref={headingRef}
          initial={{ opacity: 0, y: 48 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
          transition={{ duration: 1.0, ease: EASE }}
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
          {pageTitle}
        </motion.h1>

        <div className="mt-6 grid grid-cols-12 gap-6 md:mt-8 md:gap-8">
          <p
            data-reveal
            className="col-span-12 max-w-[58ch] text-base text-ink/75 md:col-span-7 md:text-[17px]"
            style={{ lineHeight: 1.55 }}
          >
            {pageLede}
          </p>
          <div className="col-span-12 mt-4 flex md:col-span-5 md:mt-0 md:justify-end">
            <a
              href="/#contact"
              data-cursor="cta"
              data-magnetic="0.2"
              className="link-underline text-[11px] uppercase tracking-[0.22em] text-ink"
            >
              {startCta} ↗
            </a>
          </div>
        </div>

        {/* Three service blocks — full editorial */}
        <div className="mt-16 flex flex-col md:mt-20">
          {t.services.items.map((s, i) => {
            const href = SERVICE_HREF[s.key] || "/#work";
            const imageLeft = i % 2 === 1;
            return (
              <article
                key={s.key}
                className="grid grid-cols-12 gap-6 border-t border-ink/10 py-12 md:gap-10 md:py-16 lg:gap-14"
              >
                {/* Image column */}
                <div
                  data-reveal-media
                  className={`col-span-12 md:col-span-6 ${
                    imageLeft ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/5 md:aspect-[5/4]">
                    <img
                      src={s.image}
                      alt={s.name}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>

                {/* Text column */}
                <div
                  className={`col-span-12 flex flex-col justify-center md:col-span-6 ${
                    imageLeft ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <p
                    data-reveal
                    className="text-[10px] uppercase tracking-[0.24em] text-ink/45"
                    style={{ fontWeight: 500 }}
                  >
                    ({s.index})
                  </p>
                  <h2
                    data-reveal
                    className="mt-3 text-ink"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {s.name}
                  </h2>
                  <p
                    data-reveal
                    className="mt-3 text-[15px] text-ink/75 md:mt-4 md:text-base"
                    style={{ lineHeight: 1.55 }}
                  >
                    {s.tagline}
                  </p>
                  <ul
                    data-reveal
                    className="mt-6 grid grid-cols-1 gap-y-2 text-[13px] text-ink/80 sm:grid-cols-2 md:text-[14px]"
                  >
                    {s.list.map((item) => (
                      <li key={item} className="flex items-baseline gap-2.5">
                        <span className="h-px w-3 flex-shrink-0 translate-y-[-3px] bg-ink/40" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p
                    data-reveal
                    className="mt-6 max-w-[52ch] text-[13px] text-ink/55 md:text-[14px]"
                    style={{ lineHeight: 1.6 }}
                  >
                    {s.note}
                  </p>
                  <div data-reveal className="mt-6 md:mt-7">
                    <TransitionLink
                      href={href}
                      data-cursor="cta"
                      className="group inline-flex items-center gap-3 border-b border-ink pb-2 text-[11px] uppercase tracking-[0.22em] text-ink"
                    >
                      <span>{exploreCta}</span>
                      <span
                        aria-hidden="true"
                        className="text-sm leading-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                      >
                        ↗
                      </span>
                    </TransitionLink>
                  </div>
                </div>
              </article>
            );
          })}
          <div aria-hidden="true" className="h-px w-full bg-ink/10" />
        </div>

        {/* Footer row */}
        <div className="mt-16 flex items-center justify-between border-t border-ink/10 pt-6 text-[11px] uppercase tracking-[0.22em] text-ink/60 md:mt-24 md:pt-7">
          <TransitionLink href="/" className="link-underline text-ink">
            {backLabel}
          </TransitionLink>
          <span>{t.services.sectionIndex}</span>
        </div>
      </div>
    </section>
  );
}
