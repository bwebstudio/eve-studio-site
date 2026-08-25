"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import useLang from "@/lib/useLang";
import useAppReady from "@/lib/useAppReady";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import WorkOverlay from "./WorkOverlay";

/**
 * EN · ES · IT switch. One button per locale (rather than a two-state
 * toggle) so the third language is discoverable and every option is
 * reachable in a single tap/keystroke. `compact` drops the tracking a
 * touch for the mobile rail. py-3 gives each button a ~41px tall hit
 * area — comfortably tappable — without changing where the label sits.
 */
function LanguageSelector({ lang, setLang, locales, localeLabels, label, compact = false }) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`flex items-center text-ink/60 ${compact ? "gap-1 text-[11px]" : "gap-1.5"}`}
    >
      {locales.map((code, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && (
            <span aria-hidden="true" className="mr-1 text-ink/35 md:mr-1.5">
              ·
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
            lang={code}
            className={`py-3 uppercase tracking-[0.18em] transition-colors ${
              lang === code ? "text-ink" : "hover:text-ink focus-visible:text-ink"
            }`}
          >
            {localeLabels[code]}
          </button>
        </span>
      ))}
    </div>
  );
}

export default function Navigation() {
  const { t, lang, setLang, locales, localeLabels } = useLang();
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
    // Any nav item declaring kind:"work-overlay" opens the editorial
    // category overlay instead of navigating. No item currently does —
    // the "Work" entry was removed from the menu — but <WorkOverlay> and
    // this hook are kept intact so the entry can be restored from
    // content.js alone once the portfolio is ready.
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
          <span className="hidden text-ink/60 xl:inline">
            Madrid · {time}
          </span>
          <LanguageSelector
            lang={lang}
            setLang={setLang}
            locales={locales}
            localeLabels={localeLabels}
            label={t.ui.languageSelector}
          />
        </div>

        {/* Mobile right cluster */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSelector
            lang={lang}
            setLang={setLang}
            locales={locales}
            localeLabels={localeLabels}
            label={t.ui.languageSelector}
            compact
          />
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
