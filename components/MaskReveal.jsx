"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Editorial text reveal — minimal controlled motion.
 *
 * The text slides in from a slight offset (x: -24, y: 20) and fades to
 * opacity 1. No clipping, no overflow tricks — just a clean translate +
 * fade. Safer for editorial serif with tight line-height, because glyph
 * ascenders/descenders are never at risk of being cut off.
 */
export default function MaskReveal({
  children,
  className = "",
  innerClassName = "",
  innerStyle,
  delay = 0,
  duration = 0.9,
  amount = 0.25,
  once = true,
  onMount = false,
  display = "block",
  // Kept for compatibility but unused; the reveal no longer clips.
  // eslint-disable-next-line no-unused-vars
  maskColor,
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount, margin: "0px 0px -5% 0px" });

  if (reduce) {
    return (
      <span className={className} style={{ display }}>
        <span className={innerClassName} style={{ display: "inline-block", ...innerStyle }}>
          {children}
        </span>
      </span>
    );
  }

  const show = onMount ? true : inView;

  return (
    <span ref={ref} className={className} style={{ display }}>
      <motion.span
        initial={{ opacity: 0, y: 60 }}
        animate={
          show
            ? {
                opacity: 1,
                y: 0,
                transition: { duration, ease: EASE, delay },
              }
            : { opacity: 0, y: 60 }
        }
        style={{
          display: "inline-block",
          willChange: "transform, opacity",
          ...innerStyle,
        }}
        className={innerClassName}
      >
        {children}
      </motion.span>
    </span>
  );
}
