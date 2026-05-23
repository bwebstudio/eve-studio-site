"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Pixel offset of the section's top from the viewport top after a
// hash-link scroll. Sized so the section's border-t sits flush under
// the fixed nav (no slice of the previous section visible). Slightly
// smaller than the nav's actual ~62px so the section's first padding
// pixels tuck behind the nav rather than the previous section.
const NAV_OFFSET = 56;

/**
 * Compute the exact document Y to scroll to for a given element so
 * that its top lands NAV_OFFSET px from the viewport top. Doing the
 * math here (instead of relying on Lenis's `offset` parameter or the
 * browser's scroll-padding/scroll-margin) means every hash-link
 * navigation — desktop, mobile menu, mobile fallback — lands in the
 * exact same place.
 */
export function computeAnchorScrollY(el) {
  if (!el || typeof window === "undefined") return 0;
  const targetTop = el.getBoundingClientRect().top + window.scrollY;
  return Math.max(0, targetTop - NAV_OFFSET);
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

    // Exposed so components that aren't allowed to import this file
    // directly (mobile menu post-close handler) can still drive
    // programmatic scroll with the same engine + offset.
    window.__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Intercept same-page hash clicks so they route through Lenis with
    // a manually-computed target Y. Cross-page links pass through to
    // Next.js's router.
    const onAnchorClick = (e) => {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      const anchor = e.target.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      let targetId = null;

      if (href.startsWith("#")) {
        targetId = href.slice(1);
      } else if (href.startsWith("/#") && window.location.pathname === "/") {
        targetId = href.slice(2);
      } else {
        return;
      }

      const el = targetId ? document.getElementById(targetId) : null;
      if (!el) return;

      e.preventDefault();
      const scrollY = computeAnchorScrollY(el);
      lenis.scrollTo(scrollY, { duration: 1.0 });
      if (targetId) {
        history.replaceState(null, "", `#${targetId}`);
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
