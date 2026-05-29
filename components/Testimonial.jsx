"use client";

import { motion, useReducedMotion } from "framer-motion";
import useLang from "@/lib/useLang";

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/**
 * Featured testimonial — a single, large editorial pull-quote that acts
 * as a cinematic pause between the work grid and the blog.
 *
 * Art direction: deliberately asymmetric. An eyebrow rail sits on the
 * far-left column (aligned to the same left edge as Selected Work's
 * header, with a short vertical tick descending from the section rule to
 * carry the eye across the seam), while the quote is offset to the right
 * and set left-aligned — never centred. An oversized PP Editorial glyph
 * hangs off the top-left of the quote, and the key phrase carries the
 * italic accent at a slightly larger size. A faint film-grain layer adds
 * printed-paper atmosphere. No card, stars, avatar or box.
 *
 * Reveal is Framer Motion whileInView (self-contained, can't get stuck
 * at opacity:0) and respects prefers-reduced-motion.
 */
export default function Testimonial() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const data = t.testimonials?.featured;

  if (!data) return null;

  // Primary credit line is the speaker when named, otherwise the brand
  // itself (these placeholders attribute to the project, not a person).
  const primary = data.author || data.brand;
  const secondary = data.author
    ? data.role
      ? `${data.brand}, ${data.role}`
      : data.brand
    : data.role || null;

  return (
    <section
      aria-label={data.eyebrow}
      className="relative w-full overflow-hidden border-t border-ink/10 bg-bg py-16 md:py-20 lg:py-28"
    >
      {/* Atmosphere — single ultra-subtle grain layer */}
      <div aria-hidden="true" className="grain-soft pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-frame px-6 md:px-10 lg:px-12">
        <motion.figure
          variants={container}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-12 gap-y-8 md:gap-y-0"
        >
          {/* LEFT RAIL — eyebrow + vertical connector tick */}
          <motion.div
            variants={item}
            className="col-span-12 md:col-span-3 md:pt-1"
          >
            <span
              aria-hidden="true"
              className="mb-5 hidden h-12 w-px bg-ink/15 md:block"
            />
            <p
              className="text-[11px] uppercase tracking-[0.24em] text-ink/50"
              style={{ fontWeight: 500 }}
            >
              {data.eyebrow}
            </p>
          </motion.div>

          {/* QUOTE — offset right, left-aligned, with a hanging glyph */}
          <motion.div
            variants={group}
            className="relative col-span-12 md:col-span-9 md:col-start-4 lg:col-span-8 lg:col-start-5"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute z-0 hidden select-none font-editorial leading-none text-ink/[0.06] md:-left-6 md:-top-14 md:block"
              style={{ fontSize: "clamp(6rem, 12vw, 12rem)" }}
            >
              “
            </span>

            <motion.blockquote variants={item} className="relative z-10">
              <p
                className="max-w-[14em] font-editorial text-ink text-balance"
                style={{
                  fontWeight: 200,
                  fontSize: "clamp(1.9rem, 4.6vw, 4rem)",
                  lineHeight: 1.14,
                  letterSpacing: "-0.02em",
                }}
              >
                {data.lead}{" "}
                <span
                  className="font-editorial-italic"
                  style={{ fontSize: "1.05em" }}
                >
                  {data.accent}
                </span>
              </p>
            </motion.blockquote>

            <motion.figcaption
              variants={item}
              className="relative z-10 mt-8 md:mt-10"
            >
              <span className="block text-[12px] uppercase tracking-[0.22em] text-ink">
                {primary}
              </span>
              {secondary ? (
                <span className="mt-2 block text-[11px] uppercase tracking-[0.22em] text-ink/45">
                  {secondary}
                </span>
              ) : null}
            </motion.figcaption>
          </motion.div>
        </motion.figure>
      </div>
    </section>
  );
}
