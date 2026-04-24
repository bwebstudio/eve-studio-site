"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { gsap } from "gsap";
import useLang from "@/lib/useLang";
import Logo from "./Logo";

export default function MobileMenu({ isOpen, onClose }) {
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
          document.body.style.position = "";
          document.body.style.top = "";
          document.body.style.left = "";
          document.body.style.right = "";
          const hash = pendingHashRef.current;
          if (hash) {
            pendingHashRef.current = null;
            const target = document.getElementById(hash);
            if (target) target.scrollIntoView({ behavior: "auto" });
            else window.scrollTo(0, scrollLockYRef.current || 0);
          } else {
            window.scrollTo(0, scrollLockYRef.current || 0);
            previousFocusRef.current?.focus?.();
          }
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

  const handleLinkClick = (e) => {
    const href = e.currentTarget.getAttribute("href") || "";
    if (href.startsWith("#")) {
      e.preventDefault();
      pendingHashRef.current = href.slice(1);
    }
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
        <span className="font-editorial italic" style={{ color: "rgba(247, 245, 242, 0.055)", fontSize: "clamp(20rem, 140vw, 54rem)", lineHeight: 0.85, letterSpacing: "-0.05em", whiteSpace: "nowrap" }}>
          eve
        </span>
      </div>
      <div aria-hidden="true" className="hero-grain pointer-events-none absolute inset-0" style={{ opacity: 0.22 }} />

      <div className="relative z-10 flex items-center justify-between px-6 py-6">
        <Logo
          href="/"
          compactOnScroll={false}
          immediate
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

      <nav ref={navRef} aria-label="Primary" className="relative z-10 flex flex-1 flex-col justify-center gap-1 px-6">
        {t.mobileMenu.links.map((item, i) => (
          <Link key={item.href} href={item.href} onClick={handleLinkClick} className="group flex items-baseline gap-4" style={{ fontFamily: "var(--font-editorial)", fontWeight: 200, fontSize: "clamp(3.25rem, 11vw, 6.5rem)", lineHeight: 1, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>
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
