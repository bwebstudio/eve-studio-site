"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Header height in px used to compute scroll offset for hash anchors.
// Matches scroll-padding-top in globals.css.
const HEADER_OFFSET_DESKTOP = 88;
const HEADER_OFFSET_MOBILE = 72;

function headerOffset() {
  if (typeof window === "undefined") return HEADER_OFFSET_DESKTOP;
  return window.matchMedia("(max-width: 768px)").matches
    ? HEADER_OFFSET_MOBILE
    : HEADER_OFFSET_DESKTOP;
}

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Expose so other components (mobile menu, nav anchors) can drive
    // programmatic scroll with the right header offset, instead of
    // letting native scrollIntoView fight with Lenis's RAF loop.
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Intercept anchor clicks across the document so every same-page
    // hash link routes through Lenis with the negative header offset.
    // Cross-page links (different pathname) are left alone — they hand
    // off to Next.js's router.
    const onAnchorClick = (e) => {
      // Only plain left-clicks without modifiers.
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      const anchor = e.target.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      let target = null;

      if (href.startsWith("#")) {
        target = href.slice(1);
      } else if (href.startsWith("/#") && window.location.pathname === "/") {
        target = href.slice(2);
      } else {
        return;
      }

      const el = target ? document.getElementById(target) : null;
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el, { offset: -headerOffset(), duration: 1.0 });
      // Update URL hash without triggering scroll.
      if (target) {
        history.replaceState(null, "", `#${target}`);
      }
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      if (window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, []);

  return null;
}
