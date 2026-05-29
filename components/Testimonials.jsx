"use client";

import { motion, useReducedMotion } from "framer-motion";
import useLang from "@/lib/useLang";

const EASE = [0.22, 1, 0.36, 1];

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

/**
 * Quiet editorial testimonials set — a second, smaller moment placed
 * near the contact area. Mirrors the About 2-col rhythm: eyebrow + lede
 * on the left, a hairline-separated stack of short quotes on the right.
 * Each quote uses the editorial serif with an index marker and a small
 * brand + descriptor line — no cards, ratings, avatars or sliders.
 *
 * Reveal uses Framer Motion's whileInView (self-contained) instead of the
 * global GSAP data-reveal so it can never get stuck invisible.
 */
export default function Testimonials() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const data = t.testimonials;

  if (!data?.list?.length) return null;

  const reveal = (i = 0) => ({
    variants: item,
    initial: reduce ? "show" : "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.4 },
    transition: { delay: reduce ? 0 : i * 0.08 },
  });

  return (
    <section className="relative w-full border-t border-ink/10 bg-bg pt-12 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24">
      <div className="mx-auto max-w-frame px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-12 gap-6 md:gap-10 lg:gap-14">
          {/* LEFT — eyebrow + lede */}
          <div className="col-span-12 md:col-span-4">
            <motion.p
              {...reveal(0)}
              className="text-[11px] uppercase tracking-[0.24em] text-ink"
              style={{ fontWeight: 500 }}
            >
              {data.eyebrow}
            </motion.p>
            <motion.p
              {...reveal(1)}
              className="mt-5 max-w-[30ch] text-base text-ink/60 md:mt-6 md:text-[17px]"
              style={{ lineHeight: 1.5 }}
            >
              {data.lede}
            </motion.p>
          </div>

          {/* RIGHT — hairline-separated quotes */}
          <ul className="col-span-12 md:col-span-7 md:col-start-6">
            {data.list.map((entry, i) => (
              <motion.li
                key={i}
                {...reveal(i)}
                className="border-t border-ink/10 py-8 first:border-t-0 first:pt-0 md:py-10"
              >
                <blockquote
                  className="font-editorial text-ink text-balance"
                  style={{
                    fontWeight: 200,
                    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.015em",
                  }}
                >
                  “{entry.quote}”
                </blockquote>
                <div className="mt-5 flex items-baseline gap-5 md:mt-6">
                  <span className="text-[11px] uppercase tracking-[0.22em] tabular-nums text-ink/40">
                    ({String(i + 1).padStart(2, "0")})
                  </span>
                  <div>
                    <span className="block text-[12px] uppercase tracking-[0.2em] text-ink">
                      {entry.brand}
                    </span>
                    {entry.role ? (
                      <span className="mt-0.5 block text-[11px] uppercase tracking-[0.2em] text-ink/45">
                        {entry.role}
                      </span>
                    ) : null}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
