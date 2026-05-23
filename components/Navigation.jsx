"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import useLang from "@/lib/useLang";
import useAppReady from "@/lib/useAppReady";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import WorkOverlay from "./WorkOverlay";

export default function Navigation() {
  const { t, lang, toggle, setLang } = useLang();
  const { ready } = useAppReady();
  const [time, setTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const now = new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Madrid",
      });
      setTime(now);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    if (!ready) {
      gsap.set(navRef.current, { y: -24, opacity: 0 });
      return;
    }
    gsap.fromTo(
      navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 0.1, ease: "power3.out" }
    );
  }, [ready]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Show every nav item except Home (the logo handles that) — matches
  // the Kaiora reference where Contact lives inline with the rest of
  // the nav rather than as a separate CTA on the right.
  const primaryLinks = t.nav.links.filter((link) => link.href !== "/");

  const handleNavClick = (link) => (e) => {
    // "Work" intercepts to open the overlay instead of jumping to #work.
    if (link.kind === "work-overlay") {
      e.preventDefault();
      setIsWorkOpen(true);
    }
  };

  return (
    <header
      ref={navRef}
      // Always-light bar to match the Kaiora reference — the home is
      // light bg throughout, no dark cinematic strip to compensate for.
      // A subtle backdrop blur appears on scroll.
      className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
        scrolled
          ? "border-b border-ink/5 bg-bg/85 backdrop-blur-xl backdrop-saturate-150"
          : "bg-bg/0"
      }`}
    >
      <div className="mx-auto flex max-w-frame items-center justify-between gap-8 px-6 py-5 text-ink md:px-10 md:py-5 lg:px-12">
        <Logo href="/" />

        {/* Center nav — all primary items including Contact */}
        <nav className="hidden items-center gap-7 text-[12px] uppercase tracking-[0.18em] lg:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              onClick={handleNavClick(link)}
              className="link-underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right rail — language + clock, subtle */}
        <div className="hidden items-center gap-5 text-[11px] uppercase tracking-[0.18em] md:flex">
          <span className="hidden text-ink/45 xl:inline">
            Madrid · {time}
          </span>
          <div
            role="group"
            aria-label="Language selector"
            className="flex items-center gap-1.5 text-ink/40"
          >
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`transition-colors ${
                lang === "en" ? "text-ink" : "hover:text-ink/70"
              }`}
            >
              EN
            </button>
            <span aria-hidden="true" className="text-ink/30">·</span>
            <button
              type="button"
              onClick={() => setLang("es")}
              aria-pressed={lang === "es"}
              className={`transition-colors ${
                lang === "es" ? "text-ink" : "hover:text-ink/70"
              }`}
            >
              ES
            </button>
          </div>
        </div>

        {/* Mobile right cluster */}
        <div className="flex items-center gap-5 md:hidden">
          <button
            type="button"
            onClick={toggle}
            className="text-[11px] uppercase tracking-[0.18em] text-ink/70"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="text-[11px] uppercase tracking-[0.18em] text-ink"
          >
            {t.nav.menu}
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenWorkOverlay={() => {
          setIsMenuOpen(false);
          // Wait one frame so the mobile menu's exit animation can begin
          // before the overlay slides in — keeps the layering clean.
          window.setTimeout(() => setIsWorkOpen(true), 60);
        }}
      />
      <WorkOverlay isOpen={isWorkOpen} onClose={() => setIsWorkOpen(false)} />
    </header>
  );
}
