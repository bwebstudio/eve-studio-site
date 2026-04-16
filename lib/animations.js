import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensureGSAP() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

const TEXT_FROM = { opacity: 0, y: 32, filter: "blur(6px)" };
const TEXT_TO = {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
  duration: 0.9,
  ease: "power3.out",
};

const MEDIA_FROM = { opacity: 0, scale: 1.05 };
const MEDIA_TO = {
  opacity: 1,
  scale: 1,
  duration: 1.1,
  ease: "power3.out",
};

/**
 * Animate any descendant `[data-reveal]` on scroll, and any
 * `[data-reveal-media]` image/block on scroll. Called from each section's
 * useEffect inside a gsap.context() for easy cleanup.
 */
export function revealOnScroll(root) {
  ensureGSAP();
  if (!root) return;

  root.querySelectorAll("[data-reveal]").forEach((el) => {
    gsap.fromTo(el, TEXT_FROM, {
      ...TEXT_TO,
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  root.querySelectorAll("[data-reveal-media]").forEach((el) => {
    gsap.fromTo(el, MEDIA_FROM, {
      ...MEDIA_TO,
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });
}

/**
 * Animate all `[data-reveal]` / `[data-reveal-media]` inside `root`
 * immediately on mount. Used by Hero.
 */
export function revealOnMount(root, { delay = 0.25, stagger = 0.1 } = {}) {
  ensureGSAP();
  if (!root) return;

  const text = root.querySelectorAll("[data-reveal]");
  if (text.length) {
    gsap.fromTo(text, TEXT_FROM, {
      ...TEXT_TO,
      delay,
      stagger,
    });
  }

  const media = root.querySelectorAll("[data-reveal-media]");
  if (media.length) {
    gsap.fromTo(media, MEDIA_FROM, {
      ...MEDIA_TO,
      delay,
    });
  }
}
