"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";
import MaskReveal from "./MaskReveal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const { t } = useLang();
  const rootRef = useRef(null);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const n = t.newsletter;

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "submitting") return;

    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setErrorMsg(n.errors.invalid);
      setStatus("error");
      return;
    }
    if (!consent) {
      setErrorMsg(n.errors.consent);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, consent }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const code = data?.error;
        const msg =
          code === "invalid_email"
            ? n.errors.invalid
            : code === "missing_consent"
            ? n.errors.consent
            : n.errors.generic;
        setErrorMsg(msg);
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
      setConsent(false);
    } catch {
      setErrorMsg(n.errors.generic);
      setStatus("error");
    }
  }

  const isLocked = status === "submitting" || status === "success";

  return (
    <section
      ref={rootRef}
      id="newsletter"
      className="relative w-full bg-bg py-[100px] md:py-[160px]"
    >
      <div className="mx-auto max-w-frame px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Section header */}
          <div className="col-span-12 flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
            <span>{n.sectionLabel}</span>
            <span>{n.sectionIndex}</span>
          </div>

          {/* Eyebrow + headline */}
          <div className="col-span-12 mt-12 md:mt-16">
            <p
              data-reveal
              className="text-[12px] uppercase tracking-[0.22em] text-ink/60"
            >
              {n.eyebrow}
            </p>
            <MaskReveal
              className="mt-8"
              innerClassName="text-ink"
              innerStyle={{
                fontFamily: "var(--font-editorial)",
                fontWeight: 200,
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
              }}
              duration={1.1}
            >
              {n.headlineA}{" "}
              <em className="font-editorial-italic">{n.headlineItalic}</em>.
            </MaskReveal>
          </div>

          {/* Body + form */}
          <div className="col-span-12 mt-14 grid grid-cols-12 gap-6 md:col-span-10 md:col-start-2 md:mt-20 md:gap-8">
            <p
              data-reveal
              className="col-span-12 text-base text-ink/80 md:col-span-5 md:text-lg"
              style={{ lineHeight: 1.6 }}
            >
              {n.body}
            </p>

            <form
              data-reveal
              onSubmit={handleSubmit}
              noValidate
              className="col-span-12 md:col-span-6 md:col-start-7"
            >
              <div className="flex items-baseline gap-4 border-b border-ink/30 pb-3 transition-colors duration-300 focus-within:border-ink">
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={n.placeholder}
                  disabled={isLocked}
                  required
                  className="w-full bg-transparent text-lg text-ink placeholder:text-ink/40 outline-none disabled:opacity-60"
                  style={{ fontFamily: "var(--font-neue)" }}
                />
                <button
                  type="submit"
                  disabled={isLocked}
                  data-cursor="cta"
                  data-magnetic="0.25"
                  className="link-underline whitespace-nowrap text-[11px] uppercase tracking-[0.22em] text-ink transition-opacity duration-300 disabled:opacity-50"
                >
                  {status === "submitting" ? "…" : n.cta}
                </button>
              </div>

              {/* Consent + privacy */}
              <div className="mt-5 flex items-start gap-3">
                <input
                  id="newsletter-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={isLocked}
                  className="mt-[3px] h-3 w-3 flex-shrink-0 cursor-pointer accent-ink"
                />
                <label
                  htmlFor="newsletter-consent"
                  className="cursor-pointer text-[11px] leading-relaxed text-ink/55"
                >
                  {n.consent}{" "}
                  <a
                    href={n.privacyHref}
                    className="link-underline text-ink/75"
                  >
                    {n.privacy}
                  </a>
                </label>
              </div>

              {/* Status line — fixed height to avoid layout shift */}
              <div className="mt-5 min-h-[1.25rem] text-[11px] uppercase tracking-[0.22em]">
                {status === "success" && (
                  <span className="text-ink/75">{n.success}</span>
                )}
                {status === "error" && errorMsg && (
                  <span className="text-ink/75">{errorMsg}</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
