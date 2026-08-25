"use client";

import useLang from "@/lib/useLang";

/**
 * Project / client strip on a LIGHT background — matches the rest of the
 * home, which keeps a single tonal mood (no dark band). Until MAIT hands
 * over real logo SVGs, each project renders as a sans wordmark inside a
 * CSS marquee. Swap a <span> for an <img src="/logos/*.svg" /> when the
 * real assets exist.
 *
 * Uses the global .marquee rule from globals.css, which expects three
 * identical direct children and translates by exactly one child width,
 * so the loop is seamless.
 *
 * The list holds four REAL projects. Rather than padding it with invented
 * names, each marquee copy repeats the real list `REPEATS` times: that
 * keeps every copy wider than any realistic viewport, which is what the
 * seamless loop needs (a copy narrower than the screen would expose a gap
 * at the end of each cycle on wide displays).
 */
const REPEATS = 2;

export default function Clients() {
  const { t } = useLang();
  const c = t.clients;

  const Row = () => (
    <span className="flex items-center">
      {Array.from({ length: REPEATS }).flatMap((_, pass) =>
        c.list.map((name, i) => (
          <span key={`${name}-${pass}-${i}`} className="flex items-center">
            <span className="text-ink/75">{name}</span>
            <span aria-hidden="true" className="mx-10 text-ink/25">
              ·
            </span>
          </span>
        ))
      )}
    </span>
  );

  return (
    <section
      aria-label={c.label}
      className="relative w-full overflow-hidden bg-bg-mute py-6 text-ink md:py-7"
    >
      <span className="sr-only">
        {c.label}: {c.list.join(", ")}
      </span>
      <div
        aria-hidden="true"
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
