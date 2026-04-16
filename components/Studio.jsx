"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";

export default function Studio() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);

      gsap.utils.toArray("[data-studio-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="studio"
      className="relative w-full bg-bg py-[100px] md:py-[160px]"
    >
      <div className="mx-auto grid max-w-frame grid-cols-12 gap-6 px-6 md:gap-8 md:px-12">
        <div className="col-span-12 flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
          <span>(Studio)</span>
          <span>Index / 02</span>
        </div>

        {/*
          Sculptural typographic composition.
          Each line is a grid cell with its own column span + column-start,
          producing an asymmetric zigzag: EVE flush left, then the statement
          stair-steps across the grid until "of looking." sits bottom-right.
          Accessible heading is carried by the outer <h2>, sub-lines are
          spans with display: block via grid placement.
        */}
        <h2 className="col-span-12 mt-12 grid grid-cols-12 gap-x-6 md:mt-20 md:gap-x-8">
          <span className="sr-only">
            Eve is not an agency. It&apos;s a studio — a way of looking.
          </span>

          <span
            aria-hidden="true"
            data-reveal
            className="col-span-12 font-editorial text-ink"
            style={{
              fontSize: "clamp(6rem, 17vw, 15rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.035em",
              whiteSpace: "nowrap",
              maxWidth: "88vw",
            }}
          >
            EVE
          </span>

          <span
            aria-hidden="true"
            data-reveal
            className="col-span-12 mt-1 font-editorial italic text-ink/85 md:col-span-9"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            is not an agency.
          </span>

          <span
            aria-hidden="true"
            data-reveal
            className="col-span-12 mt-14 font-editorial text-ink md:col-span-9 md:col-start-4 md:mt-20"
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            It&apos;s a studio —
          </span>

          <span
            aria-hidden="true"
            data-reveal
            className="col-span-12 mt-14 font-editorial italic text-ink md:col-span-6 md:col-start-6 md:mt-20"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            a way
          </span>

          <span
            aria-hidden="true"
            data-reveal
            className="col-span-12 font-editorial text-ink md:col-span-6 md:col-start-6"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            of looking.
          </span>
        </h2>

        {/* Condensed supporting block — single sentence, sits below the composition. */}
        <div className="col-span-12 mt-16 grid grid-cols-12 gap-6 md:mt-24 md:gap-8">
          <p
            data-reveal
            className="col-span-12 text-[11px] uppercase tracking-[0.22em] text-ink/50 md:col-span-3 md:col-start-2"
          >
            (About)
          </p>
          <p
            data-reveal
            className="col-span-12 mt-4 text-base text-ink/80 md:col-span-6 md:col-start-6 md:mt-0 md:text-lg"
          >
            We shape brands from the inside out — image, language, and the way
            they move through the world. Direction, photography, film and PR,
            as one considered system.
          </p>
        </div>

        <div className="col-span-12 mt-20 grid grid-cols-12 gap-6 md:mt-28 md:gap-8">
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <div className="overflow-hidden bg-accent">
              <img
                data-reveal-media
                data-studio-parallax
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80"
                alt="Editorial portrait, natural light"
                className="media-grayscale aspect-[4/5] w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-ink/50">
              (01) Studio portrait — Madrid, 2026
            </p>
          </div>

          <div className="col-span-12 mt-10 md:col-span-5 md:col-start-8 md:mt-24">
            <div className="overflow-hidden bg-accent">
              <img
                data-reveal-media
                data-studio-parallax
                src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1600&q=80"
                alt="Archive still life"
                className="media-grayscale aspect-[4/5] w-full object-cover"
              />
            </div>
            <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-ink/50">
              (02) Archive still life
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
