"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import useLang from "@/lib/useLang";
import TransitionLink from "./TransitionLink";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Elegant Work overlay — opens when the user clicks "Work" in the nav
 * or "Choose a category" in the home Work section. Lists the three
 * disciplines (Events / Social Media / Photo & Video) and routes the
 * user to the relevant /work/[category] page.
 *
 * Design notes:
 *  - Translucent dark panel (not full-screen drawer) so the overlay
 *    feels editorial and premium, not invasive.
 *  - Esc closes; click outside closes; first focusable element gets
 *    focus on open.
 *  - Body scroll is locked while open.
 *  - Mobile: panel grows to fill more of the viewport but keeps margin.
 */
export default function WorkOverlay({ isOpen, onClose }) {
  const { t } = useLang();
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);
  const scrollYRef = useRef(0);
  const [portalTarget, setPortalTarget] = useState(null);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  // Scroll-lock + focus management.
  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement;
    scrollYRef.current = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";

    const t1 = window.setTimeout(() => {
      panelRef.current?.querySelector("a, button")?.focus();
    }, 80);

    return () => {
      window.clearTimeout(t1);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollYRef.current || 0);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  // Esc to close + tab trap.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusables = panelRef.current?.querySelectorAll(
          "a[href], button:not([disabled])"
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!portalTarget) return null;

  const o = t.work.overlay;
  const categories = t.work.categories;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label={o.title}
          className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-10 md:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
          }}
        >
          {/* Backdrop */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-ink/85 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            initial={{ y: 24, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative z-10 flex w-full max-w-3xl flex-col gap-8 border border-bg/15 bg-ink p-6 text-bg shadow-2xl md:gap-10 md:p-10 lg:p-12"
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-bg/50 md:text-[11px]">
                  {o.title}
                </p>
                <h2
                  className="mt-3 text-bg"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {o.subtitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={o.close}
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-bg/70 transition-opacity hover:text-bg md:text-[12px]"
              >
                <span>{o.close}</span>
                <span aria-hidden="true" className="text-[20px] leading-none">
                  ×
                </span>
              </button>
            </div>

            {/* Categories — three rows of premium link cards. */}
            <ul className="flex flex-col">
              {categories.map((cat, i) => (
                <li
                  key={cat.key}
                  className={i === 0 ? "border-t border-bg/15" : ""}
                >
                  <TransitionLink
                    href={cat.href}
                    onClick={onClose}
                    data-cursor="cta"
                    className="group flex items-center justify-between gap-6 border-b border-bg/15 py-6 transition-colors duration-300 hover:bg-bg/[0.04] md:py-8"
                  >
                    <div className="flex items-baseline gap-5 md:gap-7">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-bg/45 md:text-[11px]">
                        0{i + 1}
                      </span>
                      <div>
                        <span
                          className="block text-bg"
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontWeight: 500,
                            fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)",
                            lineHeight: 1.05,
                            letterSpacing: "-0.025em",
                          }}
                        >
                          {cat.label}
                        </span>
                        <span className="mt-1.5 block text-[12px] text-bg/55 md:text-[13px]">
                          {cat.note}
                        </span>
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="text-base leading-none text-bg/55 transition-transform duration-500 group-hover:translate-x-1.5 md:text-lg"
                    >
                      →
                    </span>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    portalTarget
  );
}
