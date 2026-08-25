"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";
import { serviceHref } from "@/lib/serviceRoutes";
import TransitionLink from "./TransitionLink";

/**
 * "WHAT WE DO" — Kaiora-style services strip.
 *
 * Section header is a single row: eyebrow on the left + "VIEW ALL
 * SERVICES ↗" on the right, divided by a hairline rule. Below, a
 * three-up grid of cards: image on top (no overlay), label and
 * tagline below — clean and commercial.
 */
export default function Services() {
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

  return (
    <section
      ref={rootRef}
      id="services"
      className="relative w-full border-t border-ink/10 bg-bg pt-12 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24"
    >
      <div className="mx-auto max-w-frame px-6 md:px-10 lg:px-12">
        {/* Header row — Kaiora compact pattern: eyebrow left + CTA right
            on one baseline, both at the same small caps size. */}
        <div
          data-reveal
          className="flex items-baseline justify-between gap-6"
        >
          <p
            className="text-[11px] uppercase tracking-[0.24em] text-ink"
            style={{ fontWeight: 500 }}
          >
            {t.services.eyebrow}
          </p>
          <TransitionLink
            href="/services"
            data-cursor="cta"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink"
          >
            <span className="border-b border-ink pb-1">{t.services.viewAll}</span>
            <span
              aria-hidden="true"
              className="text-sm leading-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </TransitionLink>
        </div>

        {/* Three image cards — image on top, label and tagline below */}
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 md:mt-10 md:grid-cols-3 md:gap-x-6 lg:gap-x-8">
          {t.services.items.map((s) => {
            const href = serviceHref(s.key);
            return (
              <TransitionLink
                key={s.key}
                href={href}
                data-cursor="media"
                data-cursor-label="View"
                data-reveal
                className="group block"
              >
                {/* Image — clean, no overlay */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink/5 md:aspect-[5/4]">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>

                {/* Label + tagline below image */}
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3
                      className="text-ink"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                        fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {s.name}
                    </h3>
                    <p
                      className="mt-2 max-w-[34ch] text-[13px] text-ink/65 md:text-[14px]"
                      style={{ lineHeight: 1.5 }}
                    >
                      {s.tagline}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-base leading-none text-ink/70 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    ↗
                  </span>
                </div>
              </TransitionLink>
            );
          })}
        </div>
      </div>
    </section>
  );
}
