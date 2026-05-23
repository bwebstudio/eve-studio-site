"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EASE = [0.22, 1, 0.36, 1];

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
};

export default function Contact() {
  const { t, lang } = useLang();
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, {
    once: true,
    amount: 0.25,
    margin: "0px 0px -5% 0px",
  });

  const c = t.contact;
  const f = c.form;

  const [form, setForm] = useState(initialForm);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const setField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "submitting") return;

    const required = ["name", "email", "message"];
    const missing = required.some((k) => !form[k].trim());
    if (missing) {
      setErrorMsg(f.errors.required);
      setStatus("error");
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setErrorMsg(f.errors.email);
      setStatus("error");
      return;
    }
    if (!consent) {
      setErrorMsg(f.errors.consent);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, consent, lang }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const code = data?.error;
        const msg =
          code === "invalid_email"
            ? f.errors.email
            : code === "missing_consent"
            ? f.errors.consent
            : code === "missing_required"
            ? f.errors.required
            : f.errors.generic;
        setErrorMsg(msg);
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(initialForm);
      setConsent(false);
    } catch {
      setErrorMsg(f.errors.generic);
      setStatus("error");
    }
  }

  const isLocked = status === "submitting" || status === "success";

  // Shared input/select classnames so the form reads as a single
  // editorial system rather than a stack of disparate inputs.
  const fieldWrap = "flex flex-col gap-2";
  const labelCls =
    "text-[10px] uppercase tracking-[0.22em] text-ink/55";
  const inputCls =
    "w-full appearance-none border-b border-ink/25 bg-transparent py-3 text-[15px] text-ink placeholder:text-ink/35 outline-none transition-colors duration-300 focus:border-ink disabled:opacity-60";
  const selectCls = `${inputCls} pr-8`;

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative w-full scroll-mt-24 border-t border-ink/10 bg-bg pb-14 pt-12 md:pb-16 md:pt-16 lg:pt-20"
    >
      <div className="mx-auto max-w-frame px-6 md:px-10 lg:px-12">
        {/* Header row — Kaiora compact pattern */}
        <div data-reveal className="flex items-baseline justify-between gap-6">
          <p
            className="text-[11px] uppercase tracking-[0.24em] text-ink"
            style={{ fontWeight: 500 }}
          >
            {c.eyebrow}
          </p>
          <a
            href={`mailto:${c.email}`}
            data-cursor="cta"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink"
          >
            <span className="border-b border-ink pb-1 normal-case tracking-normal">
              {c.email}
            </span>
            <span
              aria-hidden="true"
              className="text-sm leading-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
        </div>

        {/* Lede + side meta */}
        <div className="mt-8 grid grid-cols-12 gap-6 md:mt-10 md:gap-8">
          <div className="col-span-12 md:col-span-8">
            <p
              data-reveal
              ref={headingRef}
              className="text-ink/85"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {c.lede}
            </p>
          </div>
          <div
            data-reveal
            className="col-span-12 flex flex-col gap-1.5 text-[11px] uppercase tracking-[0.22em] text-ink/55 md:col-span-4 md:pl-2"
          >
            {c.info.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </div>
        </div>

        {/* Form — full width. INFO / SOCIAL columns live in SiteFooter so
            we don't duplicate them here. */}
        <div className="mt-10 grid grid-cols-12 gap-6 md:mt-12 md:gap-8">
          <form
            data-reveal
            noValidate
            onSubmit={handleSubmit}
            className="col-span-12 grid grid-cols-1 gap-7 border-t border-ink/10 pt-8 md:grid-cols-2 md:gap-x-8 md:gap-y-8 md:pt-10"
          >
            <div className={fieldWrap}>
              <label htmlFor="contact-name" className={labelCls}>
                {f.nameLabel} *
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                required
                disabled={isLocked}
                value={form.name}
                onChange={setField("name")}
                placeholder={f.namePlaceholder}
                className={inputCls}
              />
            </div>

            <div className={fieldWrap}>
              <label htmlFor="contact-company" className={labelCls}>
                {f.companyLabel}
              </label>
              <input
                id="contact-company"
                type="text"
                autoComplete="organization"
                disabled={isLocked}
                value={form.company}
                onChange={setField("company")}
                placeholder={f.companyPlaceholder}
                className={inputCls}
              />
            </div>

            <div className={fieldWrap}>
              <label htmlFor="contact-email" className={labelCls}>
                {f.emailLabel} *
              </label>
              <input
                id="contact-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                disabled={isLocked}
                value={form.email}
                onChange={setField("email")}
                placeholder={f.emailPlaceholder}
                className={inputCls}
              />
            </div>

            <div className={fieldWrap}>
              <label htmlFor="contact-phone" className={labelCls}>
                {f.phoneLabel}
              </label>
              <input
                id="contact-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                disabled={isLocked}
                value={form.phone}
                onChange={setField("phone")}
                placeholder={f.phonePlaceholder}
                className={inputCls}
              />
            </div>

            <div className={fieldWrap}>
              <label htmlFor="contact-service" className={labelCls}>
                {f.serviceLabel}
              </label>
              <div className="relative">
                <select
                  id="contact-service"
                  disabled={isLocked}
                  value={form.service}
                  onChange={setField("service")}
                  className={`${selectCls} cursor-pointer`}
                >
                  <option value="">{f.servicePlaceholder}</option>
                  {c.services.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-ink/55"
                >
                  ↓
                </span>
              </div>
            </div>

            <div className={fieldWrap}>
              <label htmlFor="contact-budget" className={labelCls}>
                {f.budgetLabel}
              </label>
              <div className="relative">
                <select
                  id="contact-budget"
                  disabled={isLocked}
                  value={form.budget}
                  onChange={setField("budget")}
                  className={`${selectCls} cursor-pointer`}
                >
                  <option value="">{f.budgetPlaceholder}</option>
                  {c.budgets.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-ink/55"
                >
                  ↓
                </span>
              </div>
            </div>

            <div className={`${fieldWrap} md:col-span-2`}>
              <label htmlFor="contact-message" className={labelCls}>
                {f.messageLabel} *
              </label>
              <textarea
                id="contact-message"
                rows={5}
                required
                disabled={isLocked}
                value={form.message}
                onChange={setField("message")}
                placeholder={f.messagePlaceholder}
                className={`${inputCls} resize-none leading-relaxed`}
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <input
                  id="contact-consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={isLocked}
                  className="mt-[3px] h-3 w-3 flex-shrink-0 cursor-pointer accent-ink"
                />
                <label
                  htmlFor="contact-consent"
                  className="cursor-pointer text-[11px] leading-relaxed text-ink/55"
                >
                  {f.consent}{" "}
                  <a
                    href={f.privacyHref}
                    className="link-underline text-ink/75"
                  >
                    {f.privacy}
                  </a>
                </label>
              </div>

              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <button
                  type="submit"
                  disabled={isLocked}
                  data-cursor="cta"
                  data-magnetic="0.25"
                  className="group inline-flex items-center gap-3 border border-ink bg-ink px-7 py-4 text-[11px] uppercase tracking-[0.22em] text-bg transition-colors duration-300 hover:bg-bg hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>{status === "submitting" ? f.submitting : f.submit}</span>
                  <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </button>

                <div className="min-h-[1.25rem] text-[11px] uppercase tracking-[0.22em]">
                  {status === "success" && (
                    <span className="text-ink/75">{f.success}</span>
                  )}
                  {status === "error" && errorMsg && (
                    <span className="text-ink/75">{errorMsg}</span>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
