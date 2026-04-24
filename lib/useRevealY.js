"use client";

import { useEffect, useState } from "react";

/**
 * Responsive reveal travel distance. Returns the y-offset in px that the
 * image should start translated down by, inside its clipping mask.
 *
 *   desktop (≥1200):  140
 *   tablet  (≥768):   100
 *   mobile  (<768):    70
 *
 * Values tuned so the traveling motion is clearly legible relative to
 * typical container heights at each breakpoint.
 */
export default function useRevealY() {
  const [y, setY] = useState(130);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1200) setY(140);
      else if (w >= 768) setY(100);
      else setY(70);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return y;
}
