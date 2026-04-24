"use client";

import { useEffect, useRef, useState } from "react";
import {
  cubicBezier,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import TransitionLink from "./TransitionLink";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";
import useResponsiveScale from "@/lib/useResponsiveScale";
import { PROJECT_IMAGES } from "@/lib/projects";

const EASE = [0.22, 1, 0.36, 1];
// Shared with Studio / ImageReveal — same travel ease so every card
// across the site enters with the identical editorial curve.
const CELL_EASE = [0.33, 1, 0.68, 1];
const CELL_DURATION = 1.8;
// Ease-out for the scroll-linked zoom so the scale lands on 1
// gradually instead of hitting the clamp with a hard corner.
const ZOOM_EASE = cubicBezier(0.22, 1, 0.36, 1);

function ProjectCard({ p, layout }) {
  const images = PROJECT_IMAGES[p.slug];
  const heroImg = images?.hero;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // Cell travels from a full viewport height below into its final
  // position — same mechanic the Studio / case-study gallery use.
  const [travel, setTravel] = useState(900);
  useEffect(() => {
    const update = () => setTravel(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Scroll-linked zoom-out on the image: starts zoomed in and settles
  // to scale 1 around the midpoint so the frame sits at its natural
  // crop for most of its time on screen.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleStart = useResponsiveScale();
  const imageScale = useTransform(
    scrollYProgress,
    [0.15, 0.85],
    [scaleStart, 1],
    { clamp: true, ease: ZOOM_EASE }
  );

  return (
    <article
      data-cursor="media"
      data-cursor-label="View"
      className={`group ${layout.span}`}
    >
      <TransitionLink href={`/work/${p.slug}`} className="block">
        {/* Tracker — drives both the inView entry and the scroll
            progress for the zoom-out. */}
        <div ref={ref}>
          {/* Cell translate — frame + labels move together as one. */}
          <motion.div
            initial={{ y: travel }}
            animate={inView ? { y: 0 } : { y: travel }}
            transition={{ duration: CELL_DURATION, ease: CELL_EASE }}
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <div className={`relative w-full overflow-hidden ${layout.aspect}`}>
              {/* Hover wrapper — CSS scale on group-hover, layered
                  separately from the scroll-linked scale so they
                  compose without fighting. */}
              <div className="absolute inset-0 transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
                <motion.img
                  src={heroImg}
                  alt={p.title}
                  loading="eager"
                  decoding="async"
                  draggable="false"
                  className="media-grayscale absolute inset-0 h-full w-full object-cover"
                  style={{
                    scale: imageScale,
                    willChange: "transform, filter",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                />
              </div>
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
          </motion.div>
        </div>
      </TransitionLink>
    </article>
  );
}

const GRID = [
  { span: "col-span-12 md:col-span-7", aspect: "aspect-[4/5]" },                               // Casa Lumen
  { span: "col-span-12 md:col-span-5 md:col-start-8 md:mt-32", aspect: "aspect-[4/5]" },       // Ornela
  { span: "col-span-12 md:col-span-5 md:col-start-2", aspect: "aspect-[4/5]" },                // Amaranta
  { span: "col-span-12 md:col-span-4 md:col-start-9 md:mt-20", aspect: "aspect-[4/5]" },       // Hotel Varela
  { span: "col-span-12 md:col-span-6 md:col-start-3", aspect: "aspect-[4/5]" },                // Velvet Room
  { span: "col-span-12 md:col-span-5 md:col-start-2 md:mt-12", aspect: "aspect-[4/5]" },       // Atelier Norte
];

const LINE_STYLES = {
  huge: { fontSize: "clamp(5rem, 16vw, 14rem)", lineHeight: 0.9, letterSpacing: "-0.035em", whiteSpace: "nowrap", maxWidth: "88vw" },
  small: { fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" },
  large: { fontSize: "clamp(3rem, 7.5vw, 6.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em" },
};

const LINE_GRID = [
  "col-span-12",
  "col-span-12 md:col-span-9 mt-1",
  "col-span-12 md:col-span-6 md:col-start-7 mt-14 md:mt-24",
  "col-span-12 md:col-span-6 md:col-start-7",
];

export default function SelectedWork() {
  const { t } = useLang();
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.2, margin: "0px 0px -5% 0px" });
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="work" className="relative w-full overflow-hidden bg-bg py-[100px] md:py-[160px]">
      <div className="mx-auto max-w-frame px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
            <span>{t.work.sectionLabel}</span>
            <span>{t.work.sectionIndex}</span>
          </div>

          <motion.h2
            ref={headingRef}
            className="col-span-12 mt-12 grid grid-cols-12 gap-x-6 md:mt-20 md:gap-x-8"
            initial={{ opacity: 0, y: 80 }}
            animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 1.4, ease: EASE }}
            style={{ willChange: "transform, opacity" }}
          >
            <span className="sr-only">{t.work.srOnly}</span>
            {t.work.lines.map((line, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={`font-editorial text-ink ${line.italic ? "italic text-ink/85" : ""} ${LINE_GRID[i] || "col-span-12"}`}
                style={LINE_STYLES[line.size] || LINE_STYLES.large}
              >
                {line.text}
              </span>
            ))}
          </motion.h2>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6 md:mt-24 md:gap-8">
          {t.work.projects.map((p, i) => {
            const layout = GRID[i] || GRID[0];
            return <ProjectCard key={p.index} p={p} layout={layout} />;
          })}
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-ink/10 pt-8 text-[12px] uppercase tracking-[0.18em] text-ink/60 md:mt-28">
          <span>{t.work.footer}</span>
          <a href="#contact" className="link-underline text-ink">{t.work.footerCta}</a>
        </div>
      </div>
    </section>
  );
}
