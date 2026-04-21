"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";

export default function Contact() {
  const { t } = useLang();
  const rootRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => { revealOnScroll(rootRef.current); }, rootRef);
    return () => ctx.revert();
  }, []);

  const c = t.contact;

  return (
    <section ref={rootRef} id="contact" className="relative w-full bg-bg pb-16 pt-[100px] md:pb-20 md:pt-[160px]">
      <div className="mx-auto max-w-frame px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
            <span>{c.sectionLabel}</span>
            <span>{c.sectionIndex}</span>
          </div>

          <div className="col-span-12 mt-12 md:mt-16">
            <p data-reveal className="text-[12px] uppercase tracking-[0.22em] text-ink/60">
              {c.intro}
            </p>
            <h2 data-reveal className="mt-8 text-display-xl text-ink">
              {c.headlineA} <em className="font-editorial-italic">{c.headlineItalic}</em>.
            </h2>
          </div>

          <div className="col-span-12 mt-12 flex flex-col gap-10 md:col-span-10 md:col-start-2 md:mt-16 md:flex-row md:items-end md:justify-between">
            <a
              data-reveal
              data-cursor="cta"
              data-magnetic="0.25"
              href={`mailto:${c.email}`}
              className="group inline-flex items-baseline gap-5 text-4xl text-ink md:text-6xl"
              style={{ fontFamily: "var(--font-editorial)", lineHeight: 1.1, letterSpacing: "-0.01em" }}
            >
              <span className="link-underline">{c.email}</span>
              <span className="font-sans text-sm tracking-tight transition-transform duration-500 group-hover:translate-x-2">→</span>
            </a>
            <div data-reveal className="flex flex-col gap-1 text-[12px] uppercase tracking-[0.22em] text-ink/60">
              {c.info.map((line, i) => (
                <span key={i}>{line}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-12 gap-6 border-t border-ink/15 pt-10 text-[12px] uppercase tracking-[0.22em] text-ink/60 md:gap-8">
          <div className="col-span-6 md:col-span-3">
            <p className="text-ink/40">{c.footer.studio.label}</p>
            <p className="mt-2 text-ink">{c.footer.studio.value}</p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="text-ink/40">{c.footer.contact.label}</p>
            <a href={`mailto:${c.email}`} className="link-underline mt-2 block text-ink">{c.email}</a>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="text-ink/40">{c.footer.follow.label}</p>
            <div className="mt-2 flex flex-col gap-1 text-ink">
              {c.footer.follow.links.map((name) => (
                <a key={name} href="#" className="link-underline w-fit">{name}</a>
              ))}
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <p className="text-ink/40">{c.footer.index.label}</p>
            <div className="mt-2 flex flex-col gap-1 text-ink">
              {c.footer.index.links.map((link) => (
                <a key={link.href} href={link.href} className="link-underline w-fit">{link.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/50 md:flex-row md:items-center">
          <span>{c.copyright}</span>
          <span className="text-base normal-case tracking-normal text-ink/70" style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic" }}>
            {c.tagline}
          </span>
          <span>{c.crafted}</span>
        </div>
      </div>
    </section>
  );
}
