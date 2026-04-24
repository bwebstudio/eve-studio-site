"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { useTransition } from "./TransitionProvider";

/**
 * Drop-in replacement for next/link. Intercepts plain left-clicks on internal
 * non-hash routes and runs the curtain transition via navigate(). Modifier
 * keys, middle-clicks, hash anchors on the same page, mailto/tel and external
 * URLs bypass the intercept so standard browser behaviour is preserved.
 */
const TransitionLink = forwardRef(function TransitionLink(
  { href, onClick, children, ...rest },
  ref
) {
  const { navigate } = useTransition();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    if (typeof href !== "string") return;
    if (href.startsWith("#")) return;
    if (href.startsWith("http://") || href.startsWith("https://")) return;
    if (href.startsWith("mailto:") || href.startsWith("tel:")) return;

    // Same-route hash navigation: skip curtain, let browser scroll.
    try {
      const url = new URL(href, window.location.origin);
      if (url.pathname === window.location.pathname && url.hash) return;
    } catch {}

    e.preventDefault();
    navigate(href);
  };

  return (
    <Link ref={ref} href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
});

export default TransitionLink;
