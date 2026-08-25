"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { gsap } from "gsap";
import useLang from "@/lib/useLang";
import { BRAND } from "@/lib/brand";
import Logo from "./Logo";

export default function MobileMenu({ isOpen, onClose, onOpenWorkOverlay }) {
  const { t } = useLang();
  const overlayRef = useRef(null);
  const backgroundRef = useRef(null);
  const navRef = useRef(null);
  const footerRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previousFocusRef = useRef(null);
  const scrollLockYRef = useRef(0);
  const wasOpenRef = useRef(false);
  const pendingHashRef = useRef(null);
  // When the menu link triggers a cross-route navigation (e.g. About
  // clicked from /blog → router.push("/#about")), the close-animation
  // onComplete fires AFTER Next.js has already navigated. We must not
  // restore the old page's scroll Y onto the new page — that's what
  // was producing the "briefly scrolls to the section then jumps to
  // home" bug. Setting this flag tells onComplete to skip the restore.
  const skipScrollRestoreRef = useRef(false);

  const [portalTarget, setPortalTarget] = useState(null);
  useEffect(() => { setPortalTarget(document.body); }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const background = backgroundRef.current;
    const nav = navRef.current;
    const footer = footerRef.current;
    if (!overlay || !background || !nav || !footer) return;

    const navChildren = Array.from(nav.children);
    const footerChildren = Array.from(footer.children);

    if (isOpen) {
      wasOpenRef.current = true;
      previousFocusRef.current = document.activeElement;
      scrollLockYRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollLockYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";

      gsap.set(overlay, { display: "flex", opacity: 0, pointerEvents: "auto" });
      gsap.set(background, { opacity: 0, scale: 1.06 });
      gsap.set(navChildren, { opacity: 0, y: 28, filter: "blur(8px)" });
      gsap.set(footerChildren, { opacity: 0, y: 14 });

      const tl = gsap.timeline();
      tl.to(overlay, { opacity: 1, duration: 0.3, ease: "power3.out" });
      tl.to(background, { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" }, 0.1);
      tl.to(navChildren, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5, ease: "power3.out", stagger: 0.07 }, 0.15);
      tl.to(footerChildren, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.05 }, 0.45);
      window.setTimeout(() => closeBtnRef.current?.focus(), 60);
    } else if (wasOpenRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { display: "none", pointerEvents: "none" });

          // Release body scroll lock. The scroll-restore is gated by
          // skipScrollRestoreRef so that cross-route navigations
          // (which already left this page) don't have the old page's
          // scrollY re-applied on top of the new page.
          document.body.style.position = "";
          document.body.style.top = "";
          document.body.style.left = "";
          document.body.style.right = "";

          const skipRestore = skipScrollRestoreRef.current;
          skipScrollRestoreRef.current = false;
          if (!skipRestore) {
            window.scrollTo(0, scrollLockYRef.current || 0);
          }

          const hash = pendingHashRef.current;
          pendingHashRef.current = null;
          const target = hash ? document.getElementById(hash) : null;

          if (!target) {
            if (!skipRestore) previousFocusRef.current?.focus?.();
            return;
          }

          // Two requestAnimationFrames:
          //   1st — let the browser apply our scrollTo restore so the
          //         layout sees the restored scroll position
          //   2nd — measure target with that scroll, then perform the
          //         jump. Without the second RAF, measurement can run
          //         before Lenis's scroll-listener has synced its
          //         internal state, and the jump lands at the wrong Y.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const NAV_OFFSET = 56;
              const rect = target.getBoundingClientRect();
              const scrollY = Math.max(
                0,
                rect.top + window.scrollY - NAV_OFFSET
              );

              // Lenis's RAF writes its internal `animatedScroll` to the
              // document on every frame. If we just call window.scrollTo,
              // Lenis's next tick can overwrite it with a stale value —
              // that's how navigation was silently snapping the user
              // back to the top. To prevent the race:
              //   1. stop Lenis (pauses its RAF)
              //   2. native scrollTo to the target
              //   3. tell Lenis the new scroll is the new resting point
              //   4. restart Lenis so the user can scroll normally
              const lenis = window.__lenis;
              if (lenis && typeof lenis.stop === "function") {
                lenis.stop();
              }
              window.scrollTo(0, scrollY);
              if (lenis) {
                if (typeof lenis.scrollTo === "function") {
                  lenis.scrollTo(scrollY, { immediate: true });
                }
                if (typeof lenis.start === "function") {
                  lenis.start();
                }
              }
            });
          });
        },
      });
      tl.to([...navChildren, ...footerChildren], { opacity: 0, y: -8, filter: "blur(4px)", duration: 0.22, ease: "power3.in", stagger: 0.02 });
      tl.to(background, { opacity: 0, scale: 1.04, duration: 0.22, ease: "power3.in" }, 0);
      tl.to(overlay, { opacity: 0, duration: 0.25, ease: "power3.in" }, 0.1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "Tab") {
        const focusables = overlayRef.current?.querySelectorAll("a[href], button:not([disabled])");
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const resetBodyScrollLock = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
  };

  const handleLinkClick = (item) => (e) => {
    // Work item opens the editorial overlay rather than navigating.
    if (item?.kind === "work-overlay" && onOpenWorkOverlay) {
      e.preventDefault();
      resetBodyScrollLock();
      onOpenWorkOverlay();
      return;
    }

    const href = e.currentTarget.getAttribute("href") || "";
    const onHome =
      typeof window !== "undefined" && window.location.pathname === "/";

    // Same-page anchor flow: covers both #hash links AND clicking
    // "Home" while already on home (Next.js's router.push("/")
    // becomes a no-op on the same URL — without this branch the user
    // would close the menu and stay scrolled at the previous section).
    if (onHome) {
      let hash = null;
      if (href === "/" || href === "") {
        // Home → scroll back to the hero (which has id="top").
        hash = "top";
      } else if (href.startsWith("/#")) {
        hash = href.slice(2);
      } else if (href.startsWith("#")) {
        hash = href.slice(1);
      }
      if (hash !== null) {
        e.preventDefault();
        pendingHashRef.current = hash;
        // Don't release body lock here — keep the page visually
        // anchored while the menu fades out. The onComplete handler
        // releases the lock, restores the scroll, and hands off to
        // Lenis in a single tick to avoid the "page jumps to top"
        // flash that used to happen between unlock and scroll-restore.
        onClose();
        return;
      }
    }

    // Cross-route link: let Next.js's Link navigate. Release the body
    // lock immediately AND mark the next onComplete to skip the
    // scroll-restore — otherwise the old page's scrollY would be
    // applied to the new page 300ms later, snapping the user away
    // from wherever Next.js had already scrolled.
    skipScrollRestoreRef.current = true;
    resetBodyScrollLock();
    onClose();
  };

  if (!portalTarget) return null;

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Main navigation"
      id="mobile-menu"
      aria-hidden={!isOpen}
      className="fixed inset-0 z-[70] flex flex-col overflow-hidden text-bg md:hidden"
      style={{ display: "none", backgroundColor: "#0B0B0B" }}
    >
      <div ref={backgroundRef} aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="font-editorial italic" style={{ color: "rgba(250, 248, 245, 0.055)", fontSize: "clamp(20rem, 140vw, 54rem)", lineHeight: 0.85, letterSpacing: "-0.05em", whiteSpace: "nowrap" }}>
          {BRAND.shortName.toLowerCase()}
        </span>
      </div>
      <div aria-hidden="true" className="hero-grain pointer-events-none absolute inset-0" style={{ opacity: 0.22 }} />

      <div className="relative z-10 flex items-center justify-between px-6 py-6">
        <Logo
          href="/"
          compactOnScroll={false}
          immediate
          onDark
          onClick={() => {
            resetBodyScrollLock();
            onClose();
          }}
        />
        <button ref={closeBtnRef} type="button" onClick={onClose} aria-label="Close menu" className="flex items-center gap-3 text-[12px] uppercase tracking-[0.2em]">
          <span>{t.nav.close}</span>
          <span aria-hidden="true" className="text-[20px] leading-none">×</span>
        </button>
      </div>

      {/* Larger tap targets + vertical breathing room — the previous
          gap-1 + line-height:1 made adjacent items (Services / Work /
          Contact) bleed into each other on touch, so accidental taps
          opened the wrong route or the Work overlay. py-3 +
          min-h-[56px] guarantees a comfortable 56px target per row. */}
      <nav ref={navRef} aria-label="Primary" className="relative z-10 flex flex-1 flex-col justify-center gap-2 px-6">
        {t.mobileMenu.links.map((item, i) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            onClick={handleLinkClick(item)}
            className="group flex min-h-[56px] items-baseline gap-4 py-3"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "clamp(2.25rem, 8vw, 4.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              whiteSpace: "nowrap",
            }}
          >
            <span aria-hidden="true" className="relative top-[-0.8em] font-sans text-[10px] uppercase tracking-[0.24em] text-bg/40">0{i + 1}</span>
            <span className="relative inline-block transition-transform duration-500 ease-out group-hover:translate-x-3 group-focus-visible:translate-x-3 group-active:translate-x-2">{item.label}</span>
            <span aria-hidden="true" className="relative top-[-0.28em] -translate-x-2 font-sans text-[0.38em] text-bg/80 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">→</span>
          </Link>
        ))}
      </nav>

      <div ref={footerRef} className="relative z-10 grid grid-cols-3 gap-3 border-t border-bg/10 px-6 py-6 text-[10px] uppercase tracking-[0.22em] text-bg/60">
        {t.mobileMenu.footer.map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>,
    portalTarget
  );
}
