"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";
import { PROJECT_IMAGES } from "@/lib/projects";

const GRID = [
  { span: "col-span-12 md:col-span-7", aspect: "aspect-[4/5]" },
  { span: "col-span-12 md:col-span-5 md:col-start-8 md:mt-32", aspect: "aspect-[4/5]" },
  { span: "col-span-12 md:col-span-6 md:col-start-2", aspect: "aspect-[16/11]" },
  { span: "col-span-12 md:col-span-4 md:col-start-9 md:mt-20", aspect: "aspect-[4/5]" },
  { span: "col-span-12 md:col-span-8 md:col-start-3", aspect: "aspect-[16/10]" },
  { span: "col-span-12 md:col-span-5 md:col-start-2 md:mt-12", aspect: "aspect-[4/5]" },
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);
      gsap.utils.toArray("[data-image-parallax]").forEach((el) => {
        gsap.fromTo(el, { yPercent: -6 }, {
          yPercent: 6, ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="work" className="relative w-full bg-bg py-[100px] md:py-[160px]">
      <div className="mx-auto max-w-frame px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
            <span>{t.work.sectionLabel}</span>
            <span>{t.work.sectionIndex}</span>
          </div>

          <h2 className="col-span-12 mt-12 grid grid-cols-12 gap-x-6 md:mt-20 md:gap-x-8">
            <span className="sr-only">{t.work.srOnly}</span>
            {t.work.lines.map((line, i) => (
              <span
                key={i}
                aria-hidden="true"
                data-reveal
                className={`font-editorial text-ink ${line.italic ? "italic text-ink/85" : ""} ${LINE_GRID[i] || "col-span-12"}`}
                style={LINE_STYLES[line.size] || LINE_STYLES.large}
              >
                {line.text}
              </span>
            ))}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6 md:mt-24 md:gap-8">
          {t.work.projects.map((p, i) => {
            const layout = GRID[i] || GRID[0];
            const images = PROJECT_IMAGES[p.slug];
            const heroImg = images?.hero;
            return (
              <article
                key={p.index}
                data-reveal
                data-cursor="media"
                data-cursor-label="View"
                className={`group ${layout.span}`}
              >
                <Link href={`/work/${p.slug}`} className="block">
                  <div className={`relative w-full overflow-hidden bg-accent ${layout.aspect}`}>
                    <div data-image-parallax className="absolute inset-0 -top-[6%] h-[112%]">
                      <img
                        data-reveal-media
                        src={heroImg}
                        alt={p.title}
                        className="media-grayscale h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                      />
                    </div>
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
                </Link>
              </article>
            );
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
