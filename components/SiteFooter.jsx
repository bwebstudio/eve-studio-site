"use client";

import useLang from "@/lib/useLang";
import TransitionLink from "./TransitionLink";

/**
 * Site-wide footer on the SAME light background as the rest of the
 * site — matches the Kaiora reference, which avoids the dark band
 * entirely so the home reads as one continuous editorial surface.
 *
 * Layout: big "eve.studio" wordmark + italic tagline on the left,
 * INFO + SOCIAL columns on the right, and a compact bottom rail
 * with copyright + nav links + "Crafted in Madrid".
 */
export default function SiteFooter() {
  const { t } = useLang();
  const c = t.contact;

  return (
    <footer className="relative w-full border-t border-ink/10 bg-bg text-ink">
      <div className="mx-auto max-w-frame px-6 pt-12 pb-7 md:px-10 md:pt-16 md:pb-8 lg:px-12">
        {/* Top — wordmark + info cols */}
        <div className="grid grid-cols-12 gap-8 md:gap-10">
          {/* Wordmark + tagline */}
          <div className="col-span-12 md:col-span-7">
            <span
              className="block text-ink"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: "clamp(2.75rem, 7.5vw, 6rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              eve<span className="font-editorial-italic">.</span>studio
            </span>
            <p
              className="mt-3 max-w-[36ch] text-ink/65 md:mt-4"
              style={{
                fontFamily: "var(--font-editorial)",
                fontStyle: "italic",
                fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)",
                lineHeight: 1.35,
              }}
            >
              {c.tagline}
            </p>
          </div>

          {/* INFO column */}
          <div className="col-span-6 md:col-span-3 md:col-start-8">
            <p className="text-[10px] uppercase tracking-[0.24em] text-ink/40">
              Info
            </p>
            <div className="mt-3 flex flex-col gap-1.5 text-[13px] text-ink md:text-[14px]">
              <a href={`mailto:${c.email}`} className="link-underline w-fit">
                {c.email}
              </a>
              <span className="text-ink/70">{c.footer.studio.value}</span>
              {c.info?.[1] && <span className="text-ink/55">{c.info[1]}</span>}
            </div>
          </div>

          {/* SOCIAL column */}
          <div className="col-span-6 md:col-span-2 md:col-start-11">
            <p className="text-[10px] uppercase tracking-[0.24em] text-ink/40">
              {c.footer.follow.label}
            </p>
            <div className="mt-3 flex flex-col gap-1.5 text-[13px] text-ink md:text-[14px]">
              {c.footer.follow.links.map((name) => (
                <a key={name} href="#" className="link-underline w-fit">
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom rail */}
        <div className="mt-10 flex flex-col gap-4 border-t border-ink/10 pt-5 text-[11px] uppercase tracking-[0.22em] text-ink/55 md:mt-14 md:flex-row md:items-center md:justify-between">
          <span>{c.copyright}</span>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-ink/75">
            {c.footer.index.links.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="link-underline"
              >
                {link.label}
              </TransitionLink>
            ))}
            <TransitionLink href="/#contact" className="link-underline">
              {t.nav.cta}
            </TransitionLink>
          </nav>
          <span className="text-ink/40">{c.crafted}</span>
        </div>
      </div>
    </footer>
  );
}
