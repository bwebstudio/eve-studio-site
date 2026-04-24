"use client";

import { useEffect, useRef, useState } from "react";
import {
  cubicBezier,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import useResponsiveScale from "@/lib/useResponsiveScale";

// Gentle ease-out applied to the scroll-linked zoom so the scale
// decelerates as it approaches 1 — no visible snap when the clamp
// kicks in.
const ZOOM_EASE = cubicBezier(0.22, 1, 0.36, 1);

/**
 * Editorial image reveal (studio-onto style).
 *
 *   1. The container (frame + caption if any) translates in from a full viewport
 *      height below, as a single block.
 *   2. Inside the frame (overflow-hidden), the image is scroll-linked: starts
 *      zoomed in at scale 1.3 when the frame enters the viewport and smoothly
 *      zooms out to scale 1.0 when the frame is centred.
 *
 * Usage mirrors the previous API: pass src, alt, className (for the frame
 * aspect/layout), imgClassName (for extra styling on the image).
 */
export default function ImageReveal({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  amount = 0.2,
  once = true,
  delay = 0,
  // When a parent component wants text + image to animate as a single
  // block, it can pass its own inView state via `externalInView`. If
  // provided, it overrides the internal observer for the entry motion.
  externalInView,
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const internalInView = useInView(ref, { once, amount });
  const inView = externalInView !== undefined ? externalInView : internalInView;

  const [travel, setTravel] = useState(900);
  useEffect(() => {
    const update = () => setTravel(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scaleStart = useResponsiveScale();
  // Zoom-out finishes well before the image exits the viewport, so
  // once the frame is properly in view the image sits at its natural
  // size for the rest of the scroll — no more oversized crop while
  // the user is still looking at it.
  const imageScale = useTransform(
    scrollYProgress,
    [0.15, 0.85],
    [scaleStart, 1],
    { clamp: true, ease: ZOOM_EASE }
  );

  if (reduce) {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      </div>
    );
  }

  return (
    <div ref={ref}>
      <motion.div
        initial={{ y: travel }}
        animate={inView ? { y: 0 } : { y: travel }}
        transition={{ duration: 1.8, ease: [0.33, 1, 0.68, 1], delay }}
        style={{ willChange: "transform" }}
      >
        <div className={`relative overflow-hidden ${className}`}>
          <motion.img
            src={src}
            alt={alt}
            className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
            style={{ scale: imageScale, willChange: "transform" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
