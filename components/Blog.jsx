"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/animations";
import useLang from "@/lib/useLang";
import TransitionLink from "./TransitionLink";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Blog index — used both as the home teaser (with `limit`) and the
 * standalone /blog page (no limit, full grid). When the user clicks
 * a post card we route to /blog/[slug] — the page is created with a
 * fallback layout in case the post hasn't been written yet.
 */
export default function Blog({ limit, asSection = false }) {
  const { t } = useLang();
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, {
    once: true,
    amount: 0.25,
    margin: "0px 0px -5% 0px",
  });

  const b = t.blog;
  const posts = limit ? b.posts.slice(0, limit) : b.posts;

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      revealOnScroll(rootRef.current);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const Wrapper = asSection ? "section" : "div";
  const wrapperProps = asSection
    ? {
        id: "blog",
        className:
          "relative w-full scroll-mt-24 border-t border-ink/10 bg-bg pt-12 pb-14 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24",
      }
    : { className: "relative w-full bg-bg pt-[120px] pb-[80px] md:pt-[152px] md:pb-[112px] lg:pt-[176px] lg:pb-[128px]" };

  return (
    <Wrapper ref={rootRef} {...wrapperProps}>
      <div className="mx-auto max-w-frame px-6 md:px-10 lg:px-12">
        {asSection ? (
          // Home teaser — Kaiora compact pattern (eyebrow row + cards)
          <div data-reveal className="flex items-baseline justify-between gap-6">
            <p
              className="text-[11px] uppercase tracking-[0.24em] text-ink"
              style={{ fontWeight: 500 }}
            >
              {b.eyebrow}
            </p>
            <TransitionLink
              href="/blog"
              data-cursor="cta"
              className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink"
            >
              <span className="border-b border-ink pb-1">{b.cta}</span>
              <span
                aria-hidden="true"
                className="text-sm leading-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </TransitionLink>
          </div>
        ) : (
          // /blog page — keep the bigger editorial header
          <>
            <div className="flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-ink/60">
              <span>{b.sectionLabel}</span>
              <TransitionLink href="/" className="link-underline text-ink">
                ← Index
              </TransitionLink>
            </div>
            <div className="mt-8 grid grid-cols-12 gap-6 md:mt-10 md:gap-8">
              <div className="col-span-12 md:col-span-8">
                <p
                  data-reveal
                  className="text-[11px] uppercase tracking-[0.22em] text-ink/55"
                >
                  {b.eyebrow}
                </p>
                <motion.h2
                  ref={headingRef}
                  initial={{ opacity: 0, y: 56 }}
                  animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
                  transition={{ duration: 1.05, ease: EASE }}
                  className="mt-4 text-ink md:mt-5"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    fontSize: "clamp(2.25rem, 6.5vw, 5.25rem)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.03em",
                    willChange: "transform, opacity",
                  }}
                >
                  <span>{b.title} </span>
                  <em
                    className="font-editorial-italic text-ink/85"
                    style={{ fontWeight: 300 }}
                  >
                    {b.titleItalic}
                  </em>
                </motion.h2>
              </div>
              <p
                data-reveal
                className="col-span-12 mt-3 max-w-[40ch] text-[15px] text-ink/75 md:col-span-4 md:mt-0 md:pl-2 md:text-base"
                style={{ lineHeight: 1.6 }}
              >
                {b.lede}
              </p>
            </div>
          </>
        )}

        {/* Grid */}
        {posts.length > 0 ? (
          <div className={`grid grid-cols-1 gap-x-6 gap-y-10 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8 ${asSection ? "mt-8 md:mt-10 md:grid-cols-3" : "mt-12 border-t border-ink/10 pt-10 md:mt-16 md:grid-cols-2 md:gap-y-14 md:pt-12 lg:gap-y-16"}`}>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} backToBlog={b.backToBlog} />
            ))}
          </div>
        ) : (
          <div
            data-reveal
            className="mt-16 border-t border-ink/10 pt-12 text-center md:mt-20 md:pt-16"
          >
            <p
              className="mx-auto max-w-[40ch] text-[15px] text-ink/65 md:text-base"
              style={{ lineHeight: 1.55 }}
            >
              {b.empty}
            </p>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

function BlogCard({ post }) {
  return (
    <article data-reveal className="group flex flex-col">
      <TransitionLink
        href={`/blog/${post.slug}`}
        data-cursor="media"
        data-cursor-label="Read"
        className="block"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink/5 md:aspect-[5/4]">
          <img
            src={post.cover}
            alt={post.title}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="media-grayscale absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-3 text-[10px] uppercase tracking-[0.22em] text-ink/55 md:text-[11px]">
          <span>{post.category}</span>
          <span>{post.date}</span>
        </div>
        <h3
          className="mt-2 text-ink"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.015em",
          }}
        >
          {post.title}
        </h3>
        <p
          className="mt-2 text-[13px] text-ink/65 md:text-[14px]"
          style={{ lineHeight: 1.5 }}
        >
          {post.excerpt}
        </p>
      </TransitionLink>
    </article>
  );
}
