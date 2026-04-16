"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";

export default function Contact() {
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
      id="contact"
      className="relative w-full bg-bg pb-16 pt-[100px] md:pb-20 md:pt-[160px]"
    >
      <div className="mx-auto max-w-frame px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
            <span>(Contact)</span>
            <span>Index / 05</span>
          </div>

          <div className="col-span-12 mt-12 md:mt-16">
            <p
              data-reveal
              className="text-[12px] uppercase tracking-[0.22em] text-ink/60"
            >
              Let&apos;s build something together
            </p>

            <h2
              data-reveal
              className="mt-8 text-display-xl text-ink"
            >
              Say <em className="font-editorial-italic">hello</em>.
            </h2>
          </div>

          <div className="col-span-12 mt-12 flex flex-col gap-10 md:col-span-10 md:col-start-2 md:mt-16 md:flex-row md:items-end md:justify-between">
            <a
              data-reveal
              data-cursor="cta"
              data-magnetic="0.25"
              href="mailto:hello@eve.studio"
              className="group inline-flex items-baseline gap-5 text-4xl text-ink md:text-6xl"
              style={{
                fontFamily: "var(--font-editorial)",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              <span className="link-underline">hello@eve.studio</span>
              <span className="font-sans text-sm tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </a>

            <div
              data-reveal
              className="flex flex-col gap-1 text-[12px] uppercase tracking-[0.22em] text-ink/60"
            >
              <span>Madrid — Spain</span>
              <span>Available for new projects · 2026</span>
              <span>By introduction &amp; invitation</span>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-6 border-t border-ink/15 pt-10 text-[12px] uppercase tracking-[0.22em] text-ink/60 md:gap-8">
          <div className="col-span-6 md:col-span-3">
            <p className="text-ink/40">Studio</p>
            <p className="mt-2 text-ink">Calle del Pez — Madrid</p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="text-ink/40">Contact</p>
            <a
              href="mailto:hello@eve.studio"
              className="link-underline mt-2 block text-ink"
            >
              hello@eve.studio
            </a>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="text-ink/40">Follow</p>
            <div className="mt-2 flex flex-col gap-1 text-ink">
              <a href="#" className="link-underline w-fit">
                Instagram
              </a>
              <a href="#" className="link-underline w-fit">
                LinkedIn
              </a>
              <a href="#" className="link-underline w-fit">
                Are.na
              </a>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="text-ink/40">Index</p>
            <div className="mt-2 flex flex-col gap-1 text-ink">
              <a href="#studio" className="link-underline w-fit">
                Studio
              </a>
              <a href="#work" className="link-underline w-fit">
                Work
              </a>
              <a href="#services" className="link-underline w-fit">
                Services
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/50 md:flex-row md:items-center">
          <span>© Eve Studio — 2026</span>
          <span
            className="text-base normal-case tracking-normal text-ink/70"
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
            }}
          >
            I create identity. I connect. I build your brand universe.
          </span>
          <span>Crafted in Madrid</span>
        </div>
      </div>
    </section>
  );
}
