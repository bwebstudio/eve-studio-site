/**
 * Route map for the three MAIT Studio pillars.
 *
 *   01 Events              → /work/events        (work archive)
 *   02 Brand Experiences   → /services/brand-experiences  (service page)
 *   03 Photo & Video       → /work/photo-video   (work archive)
 *
 * Brand Experiences replaced the old "Social Media" pillar. It points at
 * a dedicated service page rather than a work archive because the
 * discipline is presented through its offer and process, not (yet)
 * through a project list. `/work/social-media` 301-redirects here — see
 * next.config.mjs.
 *
 * Single source of truth: the home Services strip, /services, the Work
 * overlay and the case-study breadcrumbs all read from this map so a
 * pillar can be re-routed in one place.
 */
export const BRAND_EXPERIENCES_HREF = "/services/brand-experiences";

export const SERVICE_HREF = {
  events: "/work/events",
  "brand-experiences": BRAND_EXPERIENCES_HREF,
  "photo-video": "/work/photo-video",
};

/** Fallback for keys with no dedicated route yet. */
export const serviceHref = (key) => SERVICE_HREF[key] || "/#services";

export default SERVICE_HREF;
