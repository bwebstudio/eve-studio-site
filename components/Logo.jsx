"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import useAppReady from "@/lib/useAppReady";
import TransitionLink from "./TransitionLink";

/**
 * Signature easing used across hero + logo so both feel authored by the
 * same hand (equivalent to GSAP's power3.out).
 */
const EASE = [0.22, 1, 0.36, 1];

/**
 * Three design states:
 *  - hidden  : pre-mount, nothing rendered on screen
 *  - intro   : logo lands with hero presence (slight scale, open tracking)
 *  - settled : micro-settle, tracking closes, scale normalises
 *  - compact : scroll-triggered header state, quietly condensed
 *
 * Amplitudes are deliberately small — this is identity, not a headline.
 */
const wordVariants = {
  hidden: {
    opacity: 0,
    y: 6,
    scale: 1.05,
    letterSpacing: "0.08em",
  },
  intro: {
    opacity: 1,
    y: 0,
    scale: 1.04,
    letterSpacing: "0.02em",
    transition: {
      duration: 1.1,
      ease: EASE,
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  },
  settled: {
    opacity: 1,
    y: 0,
    scale: 1.0,
    letterSpacing: "-0.01em",
    transition: { duration: 0.85, ease: EASE },
  },
  compact: {
    opacity: 1,
    y: -1,
    scale: 0.88,
    letterSpacing: "-0.018em",
    transition: { duration: 0.55, ease: EASE },
  },
};

/**
 * Letters only carry a micro y-offset during intro. No opacity animation at
 * the letter level — the container fade owns the reveal so the eye reads
 * "the word appears" instead of "letters appear".
 */
const letterVariants = {
  hidden: { y: 3 },
  intro: { y: 0, transition: { duration: 0.6, ease: EASE } },
  settled: { y: 0 },
  compact: { y: 0 },
};

const INTRO_MS = 1100;
const SETTLE_HOLD_MS = 220;

export default function Logo({
  text = "eve.studio",
  href = "/",
  ariaLabel = "EVE Studio — Home",
  className = "",
  /** Reacts to window scroll, swapping settled ↔ compact. */
  compactOnScroll = true,
  /** Skip the intro and land directly in settled (used in MobileMenu). */
  immediate = false,
  /** Delay before intro fires, lets the hero start breathing first. */
  introDelay = 0.05,
  onClick,
}) {
  const reduce = useReducedMotion();
  const { ready } = useAppReady();
  const shouldSkipIntro = immediate || reduce;

  const [phase, setPhase] = useState(shouldSkipIntro ? "settled" : "hidden");
  const [scrolled, setScrolled] = useState(false);

  // Intro → settled flow. If we mount already scrolled, jump straight to compact.
  // Waits for the app to be ready (preloader done) before starting intro.
  useEffect(() => {
    if (shouldSkipIntro) return;
    if (!ready) return;

    const alreadyScrolled =
      typeof window !== "undefined" && window.scrollY > 40 && compactOnScroll;
    if (alreadyScrolled) {
      setPhase("compact");
      return;
    }

    const toIntro = setTimeout(() => setPhase("intro"), introDelay * 1000);
    const toSettled = setTimeout(
      () => setPhase((p) => (p === "intro" ? "settled" : p)),
      introDelay * 1000 + INTRO_MS + SETTLE_HOLD_MS
    );

    return () => {
      clearTimeout(toIntro);
      clearTimeout(toSettled);
    };
  }, [shouldSkipIntro, compactOnScroll, introDelay, ready]);

  // Scroll listener — single source of truth, independent of Navigation's.
  useEffect(() => {
    if (!compactOnScroll) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [compactOnScroll]);

  // Once past intro, reconcile phase with scroll. During intro the scroll
  // state is held — the intro always completes so the brand feels deliberate,
  // but if the user has already scrolled we never entered intro anyway.
  useEffect(() => {
    if (!compactOnScroll) return;
    if (phase === "hidden" || phase === "intro") return;
    setPhase(scrolled ? "compact" : "settled");
  }, [scrolled, phase, compactOnScroll]);

  const chars = text.split("");

  return (
    <TransitionLink
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`flex-shrink-0 cursor-pointer text-[22px] leading-none ${className}`}
      style={{ fontFamily: "var(--font-editorial)" }}
    >
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial={shouldSkipIntro ? false : "hidden"}
        animate={phase}
        variants={wordVariants}
        style={{
          display: "inline-flex",
          transformOrigin: "left center",
          willChange: "transform, letter-spacing, opacity",
        }}
      >
        {chars.map((ch, i) => (
          <motion.span
            key={`${ch}-${i}`}
            variants={letterVariants}
            className={ch === "." ? "italic" : undefined}
            style={{ display: "inline-block" }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        ))}
      </motion.span>
    </TransitionLink>
  );
}
