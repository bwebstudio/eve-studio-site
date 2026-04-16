"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import MobileMenu from "./MobileMenu";

const links = [
  { label: "Index", href: "#top" },
  { label: "Studio", href: "#studio" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [time, setTime] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    gsap.fromTo(
      navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" }
    );
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed left-0 right-0 top-0 z-50 mix-blend-difference"
    >
      <div className="mx-auto flex max-w-frame items-center justify-between px-6 py-6 text-bg md:px-12">
        <a
          href="#top"
          className="text-[22px] leading-none md:text-[24px]"
          style={{
            fontFamily: "var(--font-editorial)",
            letterSpacing: "-0.01em",
          }}
        >
          eve<span className="italic">.</span>studio
        </a>

        <nav className="hidden items-center gap-10 text-[12px] uppercase tracking-[0.18em] md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="link-underline">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-8 text-[12px] uppercase tracking-[0.18em] md:flex">
          <span className="text-bg/70">Madrid · {time}</span>
          <a href="#contact" className="link-underline">
            Let&apos;s talk
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="text-[12px] uppercase tracking-[0.18em] md:hidden"
        >
          Menu
        </button>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
}
