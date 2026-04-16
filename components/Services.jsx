"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";

const services = [
  {
    index: "(01)",
    nameStart: "Creative",
    nameItalic: "Direction",
    items: [
      "Brand strategy",
      "Positioning",
      "Visual identity",
      "Art direction",
    ],
    note: "We set the tone — a considered direction your brand can live inside for years.",
  },
  {
    index: "(02)",
    nameStart: "Visual",
    nameItalic: "Content",
    items: [
      "Photography",
      "Film & motion",
      "Editorial content",
      "Social storytelling",
    ],
    note: "In-house production, from concept and casting to the final grade.",
  },
  {
    index: "(03)",
    nameStart: "Brand",
    nameItalic: "Connections",
    items: [
      "Press & communication",
      "Partnerships",
      "Events & activations",
      "Brand community",
    ],
    note: "We open doors — to the right people, rooms and conversations.",
  },
];

export default function Services() {
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
      className="relative w-full bg-ink py-[100px] text-bg md:py-[160px]"
    >
      <div className="mx-auto max-w-frame px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          <div className="col-span-12 flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-bg/60">
            <span>(Services)</span>
            <span>Index / 04</span>
          </div>

          <h2
            data-reveal
            className="col-span-12 mt-10 text-display-md md:mt-16 lg:col-span-11"
          >
            Three disciplines, one{" "}
            <em className="font-editorial-italic">point of view</em>.
          </h2>
        </div>

        <div className="mt-16 flex flex-col md:mt-24">
          {services.map((s) => (
            <div
              key={s.index}
              data-reveal
              className="grid grid-cols-12 gap-6 border-t border-bg/15 py-10 md:gap-8 md:py-14"
            >
              <div className="col-span-12 text-[12px] uppercase tracking-[0.22em] text-bg/50 md:col-span-2">
                {s.index}
              </div>

              <h3 className="col-span-12 text-5xl text-bg md:col-span-5 md:text-7xl">
                {s.nameStart}{" "}
                <em className="font-editorial-italic">{s.nameItalic}</em>
              </h3>

              <ul className="col-span-12 space-y-2 text-base text-bg/80 md:col-span-3">
                {s.items.map((item) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span className="h-[1px] w-4 translate-y-[-4px] bg-bg/40" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="col-span-12 text-[13px] text-bg/60 md:col-span-2">
                {s.note}
              </p>
            </div>
          ))}
          <div className="h-[1px] w-full bg-bg/15" />
        </div>

        <div className="mt-16 overflow-hidden py-8 text-bg/80 md:mt-24">
          <div className="marquee font-editorial text-5xl italic md:text-7xl">
            <span>Identity · Connections · Universes ·&nbsp;</span>
            <span>Identity · Connections · Universes ·&nbsp;</span>
            <span>Identity · Connections · Universes ·&nbsp;</span>
          </div>
        </div>
      </div>
    </section>
  );
}
