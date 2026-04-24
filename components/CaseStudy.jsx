"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import TransitionLink from "./TransitionLink";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";
import projects, { PROJECT_ORDER, PROJECT_IMAGES } from "@/lib/projects";
import MaskReveal from "./MaskReveal";
import ImageReveal from "./ImageReveal";

const SECTION_EASE = [0.33, 1, 0.68, 1];
const SECTION_DURATION = 1.8;

// A single row (text column + image column) for the project body. Both
// columns share one useInView observer and both translate in from y: travel
// with the same duration/ease — so the text lands WITH its image instead
// of firing on its own GSAP trigger.
function ProjectSection({ index, section, src, projectTitle, headingStyle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const [travel, setTravel] = useState(900);
  useEffect(() => {
    const update = () => setTravel(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // No image — text-only row still enters as a block, travelling in
  // with the same duration/ease as the image sections so the rhythm
  // feels consistent across the page.
  if (!src) {
    return (
      <section ref={ref} className="bg-bg py-[60px] md:py-[100px]">
        <motion.div
          className="mx-auto grid max-w-frame grid-cols-12 gap-6 px-6 md:gap-8 md:px-12"
          initial={{ y: travel }}
          animate={inView ? { y: 0 } : { y: travel }}
          transition={{ duration: SECTION_DURATION, ease: SECTION_EASE }}
          style={{ willChange: "transform" }}
        >
          <div className="col-span-12 md:col-span-4 md:col-start-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
              ({String(index + 1).padStart(2, "0")})
            </p>
            <h2 className="mt-3 text-ink" style={headingStyle}>
              {section.label}
            </h2>
          </div>
          <p
            className="col-span-12 mt-6 text-base text-ink/80 md:col-span-6 md:col-start-7 md:mt-0 md:text-lg"
            style={{ lineHeight: 1.7 }}
          >
            {section.body}
          </p>
        </motion.div>
      </section>
    );
  }

  const imageLeft = index % 2 === 1;

  return (
    <section ref={ref} className="bg-bg py-[60px] md:py-[100px]">
      <div
        className={`mx-auto grid max-w-frame grid-cols-1 gap-12 px-6 md:items-start md:gap-20 md:px-12 ${
          imageLeft ? "md:grid-cols-[1.5fr_1fr]" : "md:grid-cols-[1fr_1.5fr]"
        }`}
      >
        <motion.div
          className={`flex flex-col ${imageLeft ? "md:order-2" : ""}`}
          initial={{ y: travel }}
          animate={inView ? { y: 0 } : { y: travel }}
          transition={{ duration: SECTION_DURATION, ease: SECTION_EASE }}
          style={{ willChange: "transform" }}
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
              ({String(index + 1).padStart(2, "0")})
            </p>
            <h2 className="mt-3 text-ink" style={headingStyle}>
              {section.label}
            </h2>
          </div>
          <p
            className="mt-8 max-w-[42ch] text-base text-ink/80 md:text-lg"
            style={{ lineHeight: 1.7 }}
          >
            {section.body}
          </p>
        </motion.div>

        <ImageReveal
          src={src}
          alt={`${projectTitle} — ${section.label}`}
          className={`aspect-[3/4] w-full ${imageLeft ? "md:order-1" : ""}`}
          externalInView={inView}
        />
      </div>
    </section>
  );
}

export default function CaseStudy({ slug }) {
  const { lang, t } = useLang();
  const rootRef = useRef(null);
  const heroRef = useRef(null);

  const project = projects[lang]?.[slug];
  const images = PROJECT_IMAGES[slug];

  const currentIdx = PROJECT_ORDER.indexOf(slug);
  const nextSlug = PROJECT_ORDER[(currentIdx + 1) % PROJECT_ORDER.length];
  const nextProject = projects[lang]?.[nextSlug];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);

      if (heroRef.current) {
        gsap.to(heroRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
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

  const backLabel = lang === "es" ? "Volver" : "Back";
  const servicesLabel = lang === "es" ? "Servicios" : "Services";
  const nextLabel = lang === "es" ? "Siguiente proyecto" : "Next project";

  return (
    <div ref={rootRef} className="bg-bg text-ink">
      {/* Hero */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-ink md:h-[85vh]">
        {/* GSAP parallax owns transform on this wrapper; framer-motion owns
            transform on the img inside. No single element is written by both. */}
        <div ref={heroRef} className="absolute inset-0">
          <motion.img
            src={images?.hero}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              objectPosition: "center 25%",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.6) 100%)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.15 }}
        />
        <motion.div
          className="relative mx-auto flex h-full max-w-frame flex-col justify-end px-6 pb-12 md:px-12 md:pb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
        >
          <div className="text-[11px] uppercase tracking-[0.22em] text-bg/70">
            {project.discipline}
          </div>
          <h1
            className="mt-4 text-bg"
            style={{
              fontFamily: "var(--font-editorial)",
              fontWeight: 200,
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </h1>
          <p
            className="mt-4 font-editorial italic text-xl text-bg/80 md:text-2xl"
            style={{ lineHeight: 1.2, letterSpacing: "-0.01em" }}
          >
            {project.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Meta bar */}
      <section className="bg-bg py-10 md:py-14">
        <div className="mx-auto grid max-w-frame grid-cols-12 gap-6 px-6 text-[12px] uppercase tracking-[0.22em] text-ink/60 md:gap-8 md:px-12">
          <div data-reveal className="col-span-6 md:col-span-3">
            <p className="text-ink/40">{lang === "es" ? "Cliente" : "Client"}</p>
            <p className="mt-1 text-ink">{project.client}</p>
          </div>
          <div data-reveal className="col-span-6 md:col-span-3">
            <p className="text-ink/40">{lang === "es" ? "Ubicación" : "Location"}</p>
            <p className="mt-1 text-ink">{project.location}</p>
          </div>
          <div data-reveal className="col-span-6 md:col-span-3">
            <p className="text-ink/40">{lang === "es" ? "Año" : "Year"}</p>
            <p className="mt-1 text-ink">{project.year}</p>
          </div>
          <div data-reveal className="col-span-6 md:col-span-3">
            <p className="text-ink/40">{servicesLabel}</p>
            <p className="mt-1 text-ink">{project.services.slice(0, 3).join(", ")}</p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-bg py-[60px] md:py-[100px]">
        <div className="mx-auto grid max-w-frame grid-cols-12 gap-6 px-6 md:gap-8 md:px-12">
          <p
            data-reveal
            className="col-span-12 text-xl text-ink/85 md:col-span-8 md:col-start-3 md:text-2xl"
            style={{ lineHeight: 1.55, fontFamily: "var(--font-neue)" }}
          >
            {project.intro}
          </p>
        </div>
      </section>

      {/* Content sections + gallery */}
      {project.sections.map((section, i) => {
        const src = images?.gallery[i];
        const headingStyle = {
          fontFamily: "var(--font-editorial)",
          fontWeight: 300,
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        };

        return (
          <ProjectSection
            key={i}
            index={i}
            section={section}
            src={src}
            projectTitle={project.title}
            headingStyle={headingStyle}
          />
        );
      })}

      {/* Services list */}
      <section className="bg-bg py-[60px] md:py-[80px]">
        <div className="mx-auto grid max-w-frame grid-cols-12 gap-6 border-t border-ink/10 px-6 pt-10 md:gap-8 md:px-12">
          <div data-reveal className="col-span-12 md:col-span-3 md:col-start-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50">{servicesLabel}</p>
          </div>
          <ul data-reveal className="col-span-12 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-ink/70 md:col-span-7 md:col-start-6">
            {project.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next project */}
      {nextProject && (
        <section className="bg-ink py-[80px] text-bg md:py-[120px]">
          <div className="mx-auto max-w-frame px-6 md:px-12">
            <p className="text-[11px] uppercase tracking-[0.22em] text-bg/60">{nextLabel}</p>
            <TransitionLink
              href={`/work/${nextSlug}`}
              className="group mt-6 block"
              data-cursor="cta"
              data-magnetic="0.2"
            >
              <h3
                className="text-bg transition-opacity duration-500 group-hover:opacity-80"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontWeight: 200,
                  fontSize: "clamp(3rem, 9vw, 8rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                {nextProject.title}
              </h3>
              <p className="mt-3 text-[12px] uppercase tracking-[0.22em] text-bg/60">
                {nextProject.discipline} — {nextProject.year}
              </p>
            </TransitionLink>
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="bg-bg py-10 md:py-14">
        <div className="mx-auto max-w-frame px-6 md:px-12">
          <TransitionLink
            href="/#work"
            className="link-underline text-[12px] uppercase tracking-[0.22em] text-ink/60"
          >
            ← {backLabel}
          </TransitionLink>
        </div>
      </section>
    </div>
  );
}
