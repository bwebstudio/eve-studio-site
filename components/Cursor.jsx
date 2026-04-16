"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/*
 * Two-layer editorial cursor.
 *
 * Interaction model (driven by data-attributes, not per-element listeners):
 *   - default                   → small dot + thin 36px ring
 *   - a / button               → "hover" (56px ring, dot dims)
 *   - [data-cursor="cta"]      → soft filled disc, dot hidden
 *   - [data-cursor="media"]    → large ring with contextual label text
 *   - [data-cursor="hero"]     → persistent subtle chromatic shift
 *   - [data-magnetic="0.25"]   → target element magnetically pulled
 *   - window "hero:glitch" evt → 160ms RGB-split reaction on cursor
 *
 * Coupling:
 *   - `body.cursor-active` hides the native cursor globally.
 *     Only applied when (hover: hover) so touch devices keep native UX.
 *   - `mix-blend-mode: difference` on the root auto-inverts tone on
 *     light vs dark sections — one cursor, both palettes.
 */

const STATES = ["default", "hover", "cta", "media", "hero"];

export default function Cursor() {
  const rootRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const labelRef = useRef(null);
  const magneticRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia?.("(hover: hover)").matches) return;

    const root = rootRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!root || !ring || !dot) return;

    document.body.classList.add("cursor-active");

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const ringY = gsap.quickTo(ring, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    let visible = false;
    let currentState = "default";
    let lastMoveX = 0;
    let lastMoveY = 0;

    const setState = (next, el) => {
      if (next === currentState) {
        if (next === "media" && el) {
          label.textContent =
            el.getAttribute("data-cursor-label") || "View";
        }
        return;
      }
      STATES.forEach((s) => root.classList.remove(`is-${s}`));
      root.classList.add(`is-${next}`);
      currentState = next;
      if (next === "media" && el) {
        label.textContent = el.getAttribute("data-cursor-label") || "View";
      }
    };

    const attachMagnetic = (el) => {
      if (!el || magneticRef.current?.el === el) return;
      if (magneticRef.current) {
        gsap.to(magneticRef.current.el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      }
      const strength = parseFloat(el.getAttribute("data-magnetic")) || 0.25;
      magneticRef.current = { el, strength };
    };

    const releaseMagnetic = () => {
      if (!magneticRef.current) return;
      gsap.to(magneticRef.current.el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
      magneticRef.current = null;
    };

    const onMove = (e) => {
      lastMoveX = e.clientX;
      lastMoveY = e.clientY;

      if (!visible) {
        visible = true;
        gsap.to([ring, dot], {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const m = magneticRef.current;
      if (m) {
        const r = m.el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const maxX = r.width * 0.18;
        const maxY = r.height * 0.28;
        const dx = Math.max(
          -maxX,
          Math.min(maxX, (e.clientX - cx) * m.strength)
        );
        const dy = Math.max(
          -maxY,
          Math.min(maxY, (e.clientY - cy) * m.strength)
        );
        gsap.to(m.el, { x: dx, y: dy, duration: 0.4, ease: "power3.out" });
      }
    };

    const onOver = (e) => {
      const target = e.target;
      if (!target.closest) return;

      const cursorEl = target.closest("[data-cursor]");
      const magneticEl = target.closest("[data-magnetic]");
      const interactive = target.closest("a, button, [role='button']");

      if (cursorEl) {
        setState(cursorEl.getAttribute("data-cursor") || "hover", cursorEl);
      } else if (interactive) {
        setState("hover");
      } else {
        setState("default");
      }

      if (magneticEl) {
        attachMagnetic(magneticEl);
      } else if (magneticRef.current) {
        releaseMagnetic();
      }
    };

    const onWindowLeave = () => {
      visible = false;
      gsap.to([ring, dot], { opacity: 0, duration: 0.25 });
    };

    const onGlitch = () => {
      root.classList.remove("is-glitch");
      // Force reflow so the animation restarts even on rapid re-fires.
      // eslint-disable-next-line no-unused-expressions
      void root.offsetWidth;
      root.classList.add("is-glitch");
      window.setTimeout(() => root.classList.remove("is-glitch"), 180);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onWindowLeave);
    window.addEventListener("hero:glitch", onGlitch);

    return () => {
      document.body.classList.remove("cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener(
        "mouseleave",
        onWindowLeave
      );
      window.removeEventListener("hero:glitch", onGlitch);
      releaseMagnetic();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="cursor-root is-default"
      aria-hidden="true"
    >
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label">
          View
        </span>
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
