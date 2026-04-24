"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import useLang from "@/lib/useLang";
import useAppReady from "@/lib/useAppReady";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

export default function Navigation() {
  const { t, lang, toggle, setLang } = useLang();
  const { ready } = useAppReady();
  const [time, setTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      { y: 0, opacity: 1, duration: 1, delay: 0.15, ease: "power3.out" }
    );
  }, [ready]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const primaryLinks = t.nav.links.filter(
    (link) => link.href !== "#top" && link.href !== "#contact"
  );

  return (
    <header
      ref={navRef}
      className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
        scrolled
          ? "border-b border-ink/5 bg-bg/60 backdrop-blur-xl backdrop-saturate-150"
          : "mix-blend-difference"
      }`}
    >
      <div
        className={`mx-auto flex max-w-frame items-center justify-between gap-8 px-6 py-6 transition-colors duration-300 md:px-12 ${
          scrolled ? "text-ink" : "text-bg"
        }`}
      >
        <Logo href="/" />

        <nav className="hidden items-center gap-8 text-[12px] uppercase tracking-[0.18em] lg:flex">
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="link-underline">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 text-[12px] uppercase tracking-[0.18em] md:flex">
          <span className={`hidden xl:inline ${scrolled ? "text-ink/50" : "text-bg/50"}`}>
            Madrid · {time}
          </span>

          <div
            role="group"
            aria-label="Language selector"
            className={`flex items-center gap-2 ${scrolled ? "text-ink/40" : "text-bg/40"}`}
          >
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`transition-colors ${
                lang === "en"
                  ? scrolled ? "text-ink" : "text-bg"
                  : scrolled ? "hover:text-ink/70" : "hover:text-bg/70"
              }`}
            >
              EN
            </button>
            <span aria-hidden="true" className={scrolled ? "text-ink/30" : "text-bg/30"}>·</span>
            <button
              type="button"
              onClick={() => setLang("es")}
              aria-pressed={lang === "es"}
              className={`transition-colors ${
                lang === "es"
                  ? scrolled ? "text-ink" : "text-bg"
                  : scrolled ? "hover:text-ink/70" : "hover:text-bg/70"
              }`}
            >
              ES
            </button>
          </div>

          <Link href="/#contact" className="link-underline">
            {t.nav.cta}
          </Link>
        </div>

        <div className="flex items-center gap-6 md:hidden">
          <button
            type="button"
            onClick={toggle}
            className={`text-[12px] uppercase tracking-[0.18em] ${
              scrolled ? "text-ink/70" : "text-bg/70"
            }`}
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="text-[12px] uppercase tracking-[0.18em]"
          >
            {t.nav.menu}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
