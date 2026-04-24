"use client";

import { useEffect, useState } from "react";

/**
 * Responsive starting scale for the scroll-linked image zoom-out.
 *
 * On smaller viewports the frames are physically smaller, so the same
 * starting scale (2.5× on desktop) would crop to an unreadable middle
 * 8% of the image. We dial it back on tablet and mobile so the image's
 * composition still reads while it zooms, and the travel doesn't feel
 * like "the image is cut off".
 *
 *   desktop (≥1200):  2.5
 *   tablet  (≥768):   1.8
 *   mobile  (<768):   1.4
 */
export default function useResponsiveScale() {
  const [scaleStart, setScaleStart] = useState(() => {
    if (typeof window === "undefined") return 2.5;
    const w = window.innerWidth;
    if (w >= 1200) return 2.5;
    if (w >= 768) return 1.8;
    return 1.4;
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1200) setScaleStart(2.5);
      else if (w >= 768) setScaleStart(1.8);
      else setScaleStart(1.4);
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return scaleStart;
}
