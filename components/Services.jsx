"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";
import MaskReveal from "./MaskReveal";

export default function Services() {
  const { t } = useLang();
  const rootRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => { revealOnScroll(rootRef.current); }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="services" className="relative w-full bg-ink py-[80px] text-bg md:py-[120px] lg:py-[160px]">
      <div className="mx-auto max-w-frame px-6 md:px-10 lg:px-12">
        <div className="flex items-baseline justify-between text-[10px] uppercase tracking-[0.22em] text-bg/60 md:text-[11px]">
          <span>{t.services.sectionLabel}</span>
          <span>{t.services.sectionIndex}</span>
        </div>

        <MaskReveal
          className="mt-10 max-w-[18ch] md:mt-14 lg:mt-16 lg:max-w-[20ch]"
          innerClassName="text-bg"
          innerStyle={{
            fontFamily: "var(--font-editorial)",
            fontWeight: 300,
            fontSize: "clamp(2.25rem, 7vw, 6rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
          }}
          duration={1.15}
          maskColor="#0B0B0B"
        >
          {t.services.headlineA} {t.services.headlineB}{" "}
          <em className="font-editorial-italic">{t.services.headlineItalic}</em>.
        </MaskReveal>

        <div className="mt-14 flex flex-col md:mt-20 lg:mt-24">
          {t.services.items.map((s) => (
            <article
              key={s.index}
              data-reveal
              className="grid grid-cols-1 gap-6 border-t border-bg/15 py-10 md:grid-cols-[1fr_1fr] md:gap-10 md:py-14 lg:gap-20 lg:py-20"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-bg/50 md:text-[11px]">
                  {s.index}
                </p>
                <MaskReveal
                  className="mt-3 md:mt-5"
                  innerClassName="text-bg"
                  innerStyle={{
                    fontFamily: "var(--font-editorial)",
                    fontWeight: 300,
                    fontSize: "clamp(2.25rem, 6.5vw, 5.5rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                  }}
                  duration={1.05}
                  maskColor="#0B0B0B"
                >
                  {s.nameStart}{" "}
                  <em className="font-editorial-italic">{s.nameItalic}</em>
                </MaskReveal>
              </div>

              <div className="flex flex-col gap-8 md:gap-10 md:pt-2 lg:pt-3">
                <ul
                  className="space-y-3 text-[15px] text-bg/85 md:space-y-3.5 md:text-base lg:text-lg"
                  style={{ lineHeight: 1.6 }}
                >
                  {s.list.map((item) => (
                    <li key={item} className="flex items-baseline gap-3">
                      <span className="h-[1px] w-4 flex-shrink-0 translate-y-[-4px] bg-bg/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p
                  className="max-w-[48ch] text-[13px] text-bg/60 md:text-sm"
                  style={{ lineHeight: 1.65 }}
                >
                  {s.note}
                </p>
              </div>
            </article>
          ))}
          <div className="h-[1px] w-full bg-bg/15" />
        </div>

        <div className="mt-14 overflow-hidden py-6 text-bg/80 md:mt-20 md:py-8 lg:mt-24">
          <div
            className="marquee font-editorial italic"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            <span>{t.services.marquee}</span>
            <span>{t.services.marquee}</span>
            <span>{t.services.marquee}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
