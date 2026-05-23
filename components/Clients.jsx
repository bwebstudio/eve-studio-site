"use client";

import useLang from "@/lib/useLang";

/**
 * Client / brand strip on a LIGHT background — matches the Kaiora
 * reference, which keeps a single tonal mood across the home (no
 * dark band). Until Eve hands over real logo SVGs, each brand
 * renders as a sans wordmark inside a CSS marquee. Swap a <span>
 * for an <img src="/logos/*.svg" /> when the real assets exist.
 *
 * Uses the global .marquee rule from globals.css, which expects three
 * identical direct children so the loop is seamless.
 */
export default function Clients() {
  const { t } = useLang();
  const c = t.clients;

  const Row = () => (
    <span className="flex items-center">
      {c.list.map((name, i) => (
        <span key={`${name}-${i}`} className="flex items-center">
          <span className="text-ink/70">{name}</span>
          <span aria-hidden="true" className="mx-10 text-ink/20">
            ·
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <section
      aria-label={c.label}
      className="relative w-full overflow-hidden bg-bg-mute py-6 text-ink md:py-7"
    >
      <span className="sr-only">{c.label}</span>
      <div
        className="marquee"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: "clamp(0.78rem, 0.95vw, 0.95rem)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        <Row />
        <Row />
        <Row />
      </div>
    </section>
  );
}
