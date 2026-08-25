"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";
import TransitionLink from "./TransitionLink";

/**
 * Single blog post layout. The CMS isn't wired yet — body copy is
 * scaffolded with two editorial paragraphs derived from the excerpt
 * so each route paints something sensible, ready to be replaced by
 * real long-form content from a future CMS (Sanity / Hygraph / MD).
 */
export default function BlogPost({ slug }) {
  const { t } = useLang();
  const rootRef = useRef(null);
  const b = t.blog;
  const post = b.posts.find((p) => p.slug === slug);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  if (!post) {
    return (
      <section className="relative w-full bg-bg pt-[160px] pb-24 md:pt-[200px]">
        <div className="mx-auto max-w-frame px-6 md:px-12">
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink/60">
            {b.empty}
          </p>
          <TransitionLink
            href="/blog"
            className="link-underline mt-6 inline-block text-[12px] uppercase tracking-[0.22em] text-ink"
          >
            {b.backToBlog}
          </TransitionLink>
        </div>
      </section>
    );
  }

  return (
    <article
      ref={rootRef}
      className="relative w-full bg-bg pt-[120px] pb-[80px] md:pt-[152px] md:pb-[112px] lg:pt-[176px] lg:pb-[128px]"
    >
      <div className="mx-auto max-w-frame px-6 md:px-10 lg:px-12">
        {/* Top row */}
        <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
          <span>{post.category}</span>
          <TransitionLink href="/blog" className="link-underline text-ink">
            {b.backToBlog}
          </TransitionLink>
        </div>

        {/* Headline */}
        <div className="mt-8 max-w-4xl md:mt-10">
          <h1
            className="text-ink"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            {post.title}
          </h1>
          <p
            className="mt-5 text-base text-ink/75 md:text-[17px]"
            style={{ lineHeight: 1.55 }}
          >
            {post.excerpt}
          </p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-ink/50">
            {post.date} · {post.read}
          </p>
        </div>

        {/* Cover */}
        <div
          data-reveal-media
          className="relative mt-12 aspect-[16/9] w-full overflow-hidden md:mt-16"
        >
          <img
            src={post.cover}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
            draggable="false"
          />
        </div>

        {/* Body — placeholder editorial scaffold. Replace with CMS
            content when the source of truth is ready. */}
        <div className="mt-12 grid grid-cols-12 gap-6 md:mt-16 md:gap-8">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <p
              data-reveal
              className="text-lg text-ink md:text-xl"
              style={{ lineHeight: 1.55, fontWeight: 500 }}
            >
              {post.excerpt}
            </p>
            <p
              data-reveal
              className="mt-8 text-base text-ink/80 md:text-[17px]"
              style={{ lineHeight: 1.65 }}
            >
              This note is a placeholder. The CMS isn’t wired yet — the
              final body of the article will live here once MAIT Studio publishes
              it. Layout, type and rhythm are locked in.
            </p>
            <p
              data-reveal
              className="mt-6 text-base text-ink/80 md:text-[17px]"
              style={{ lineHeight: 1.65 }}
            >
              Each weekly entry follows the same shape: an opening line, a
              short context paragraph, and a single editorial idea worth
              keeping. Notes are read in under five minutes and meant to be
              shared inside the studio first.
            </p>

            {/* Bottom row */}
            <div className="mt-12 flex items-center justify-between border-t border-ink/10 pt-6 text-[11px] uppercase tracking-[0.22em] text-ink/60 md:mt-16">
              <TransitionLink href="/blog" className="link-underline text-ink">
                {b.backToBlog}
              </TransitionLink>
              <TransitionLink
                href="/#contact"
                className="link-underline text-ink"
              >
                Start a project ↗
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
