"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";

const projects = [
  {
    index: "01",
    title: "Casa Lumen",
    discipline: "Brand identity · Art direction",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1800&q=80",
    span: "col-span-12 md:col-span-7",
    aspect: "aspect-[4/5]",
  },
  {
    index: "02",
    title: "Amaranta Studio",
    discipline: "Visual campaign · Film",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
    span: "col-span-12 md:col-span-5 md:col-start-8 md:mt-32",
    aspect: "aspect-[4/5]",
  },
  {
    index: "03",
    title: "Hotel Varela",
    discipline: "Brand world · Editorial",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1800&q=80",
    span: "col-span-12 md:col-span-6 md:col-start-2",
    aspect: "aspect-[16/11]",
  },
  {
    index: "04",
    title: "Ornela Perfumes",
    discipline: "PR · Launch · Content",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1600&q=80",
    span: "col-span-12 md:col-span-4 md:col-start-9 md:mt-20",
    aspect: "aspect-[4/5]",
  },
  {
    index: "05",
    title: "Vera Atelier",
    discipline: "Editorial · Fashion film",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=1800&q=80",
    span: "col-span-12 md:col-span-8 md:col-start-3",
    aspect: "aspect-[16/10]",
  },
];

export default function SelectedWork() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);

      gsap.utils.toArray("[data-image-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="work"
      className="relative w-full bg-bg py-[100px] md:py-[160px]"
    >
      <div className="mx-auto max-w-frame px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
            <span>(Selected work)</span>
            <span>Index / 03</span>
          </div>

          {/*
            Sculptural typographic composition.
            RECENT dominates top-left; "collaborations." sits italic beneath;
            "A quiet / archive." anchors bottom-right for asymmetric tension.
          */}
          <h2 className="col-span-12 mt-12 grid grid-cols-12 gap-x-6 md:mt-20 md:gap-x-8">
            <span className="sr-only">
              A quiet archive of recent collaborations.
            </span>

            <span
              aria-hidden="true"
              data-reveal
              className="col-span-12 font-editorial text-ink"
              style={{
                fontSize: "clamp(5rem, 16vw, 14rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.035em",
                whiteSpace: "nowrap",
                maxWidth: "88vw",
              }}
            >
              RECENT
            </span>

            <span
              aria-hidden="true"
              data-reveal
              className="col-span-12 mt-1 font-editorial italic text-ink/85 md:col-span-9"
              style={{
                fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              collaborations.
            </span>

            <span
              aria-hidden="true"
              data-reveal
              className="col-span-12 mt-14 font-editorial text-ink md:col-span-6 md:col-start-7 md:mt-24"
              style={{
                fontSize: "clamp(3rem, 7.5vw, 6.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
              }}
            >
              A quiet
            </span>

            <span
              aria-hidden="true"
              data-reveal
              className="col-span-12 font-editorial italic text-ink/90 md:col-span-6 md:col-start-7"
              style={{
                fontSize: "clamp(3rem, 7.5vw, 6.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
              }}
            >
              archive.
            </span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6 md:mt-24 md:gap-8">
          {projects.map((p) => (
            <article
              key={p.index}
              data-reveal
              data-cursor="media"
              data-cursor-label="View"
              className={`group ${p.span}`}
            >
              <div
                className={`relative w-full overflow-hidden bg-accent ${p.aspect}`}
              >
                <div
                  data-image-parallax
                  className="absolute inset-0 h-[112%] -top-[6%]"
                >
                  <img
                    data-reveal-media
                    src={p.image}
                    alt={p.title}
                    className="media-grayscale h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-start justify-between gap-6">
                <div className="flex items-start gap-6">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
                    ({p.index})
                  </span>
                  <div>
                    <h3 className="text-2xl text-ink md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-ink/60">
                      {p.discipline}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
                  {p.year}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-ink/10 pt-8 text-[12px] uppercase tracking-[0.18em] text-ink/60 md:mt-28">
          <span>All projects on request</span>
          <a href="#contact" className="link-underline text-ink">
            Request full portfolio →
          </a>
        </div>
      </div>
    </section>
  );
}
