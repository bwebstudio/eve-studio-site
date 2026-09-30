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
 * navigation (desktop, mobile menu, mobile fallback) lands in the
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

    // `rescueStuckReveals` is declared below, so go through a wrapper
    // rather than passing it straight to Lenis.
    let sweepPending = 0;
    const onLenisScroll = () => {
      ScrollTrigger.update();
      if (sweepPending) return;
      sweepPending = requestAnimationFrame(() => {
        sweepPending = 0;
        rescueStuckReveals();
      });
    };
    lenis.on("scroll", onLenisScroll);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // ── Keep ScrollTrigger's measurements honest ──────────────────────
    //
    // ScrollTrigger caches every trigger's start/end position at the
    // moment it is created. Nothing here used to refresh them, so any
    // reflow after that point left the cache stale, and a reveal whose
    // stale start sits past the real one never fires, leaving the copy
    // permanently at opacity 0. That is the "text sometimes shows,
    // sometimes doesn't" the client reported: it reproduces on a
    // language switch, on a client-side route change and on resize.
    //
    // The page reflows for reasons no single event covers (the Fontshare
    // webfont swapping, project imagery decoding, the locale switch
    // re-rendering every string, a route transition), so rather than
    // guess at them we watch the document height and refresh whenever it
    // actually moves. `requestAnimationFrame` collapses bursts into one
    // refresh and keeps us out of a ResizeObserver feedback loop.
    let pending = 0;
    let lastHeight = document.documentElement.scrollHeight;

    // Copy is hidden by CSS (`[data-reveal] { opacity: 0 }`) and only
    // ever brought back by JS, so anything the reveal pass misses stays
    // unreadable. Each section binds its triggers once, on mount, with
    // no dependency on the locale, so a language switch that remounts a
    // node, or a trigger built against stale geometry, leaves real text
    // at zero opacity. This sweep is the backstop: it looks only for
    // elements that are already past the reveal line yet still
    // invisible, and fades those in. An element the normal animation
    // handled is already at opacity 1 and never matches.
    const rescueStuckReveals = () => {
      const line = window.innerHeight * 0.85;
      const stuck = [];
      document
        .querySelectorAll("[data-reveal], [data-reveal-media]")
        .forEach((el) => {
          const box = el.getBoundingClientRect();
          if (box.height === 0 || box.top > line) return;
          if (parseFloat(getComputedStyle(el).opacity) > 0.01) return;
          stuck.push(el);
        });
      if (stuck.length) {
        gsap.to(stuck, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    };

    const refresh = () => {
      pending = 0;
      ScrollTrigger.refresh();
      rescueStuckReveals();
    };
    const scheduleRefresh = () => {
      if (pending) cancelAnimationFrame(pending);
      pending = requestAnimationFrame(refresh);
    };

    const onBodyResize = () => {
      const height = document.documentElement.scrollHeight;
      if (height === lastHeight) return;
      lastHeight = height;
      scheduleRefresh();
    };

    const observer = new ResizeObserver(onBodyResize);
    observer.observe(document.body);

    // A locale switch swaps text in place and need not change the page
    // height at all, so the height watcher above can miss it entirely.
    // Watching the tree catches it, and any other late-mounted node.
    // Mutations fire constantly during animation, so this only schedules
    // the cheap sweep, never a full ScrollTrigger refresh.
    const scheduleSweep = () => {
      if (sweepPending) return;
      sweepPending = requestAnimationFrame(() => {
        sweepPending = 0;
        rescueStuckReveals();
      });
    };
    const mutations = new MutationObserver(scheduleSweep);
    mutations.observe(document.body, { childList: true, subtree: true, characterData: true });

    // Webfonts and images land after first paint and both shift layout.
    if (document.fonts?.ready) document.fonts.ready.then(scheduleRefresh).catch(() => {});
    window.addEventListener("load", scheduleRefresh);

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
      window.removeEventListener("load", scheduleRefresh);
      observer.disconnect();
      mutations.disconnect();
      if (pending) cancelAnimationFrame(pending);
      if (sweepPending) cancelAnimationFrame(sweepPending);
      gsap.ticker.remove(raf);
      lenis.destroy();
      if (window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, []);

  return null;
}
