/**
 * MAIT Studio — brand constants.
 *
 * Single source of truth for the studio name, the typographic wordmark
 * and the logo asset. Everything that used to hardcode the old brand
 * name now reads from here, so a future naming/asset change is a
 * one-file edit.
 *
 * ── The logo asset ────────────────────────────────────────────────────
 * The definitive logo is now wired up. Both files were derived from the
 * supplied master (`/public/MAIT LOGO.png`, 1774×887) without altering
 * the artwork: the flat #FEFEFE background was cropped back to the mark
 * (plus an even margin) and turned into real transparency, so the
 * lockup sits cleanly on the site's warm ground instead of carrying a
 * white box. `logo.srcLight` is the same mark in white, for the dark
 * mobile-menu overlay.
 *
 * <Logo> renders the asset at `heights.*` tall with width:auto, so the
 * supplied proportions hold at every breakpoint, and passes the
 * intrinsic width/height through so the browser reserves the right box
 * while it loads (no layout shift).
 *
 * Setting `logo.src` back to null restores the typographic wordmark
 * fallback below — the studio name in the site's own type, never a
 * reconstruction of the logo.
 */
export const BRAND = {
  /** Official studio name — metadata, aria labels, legal lines. */
  name: "MAIT Studio",
  /** Short form, used where the full name would crowd the layout. */
  shortName: "MAIT",
  /**
   * Typographic fallback wordmark. Lowercase so it keeps the editorial
   * signature the site was built around (the "." is set in Editorial
   * New italic — see <Logo> and <SiteFooter>).
   */
  wordmark: "mait.studio",

  /**
   * Live studio inbox and canonical origin. The domain is registered and
   * served through Cloudflare; `siteUrl` is the apex (www redirects to
   * it), and feeds `metadataBase` in app/layout.js.
   *
   * `email` is the address the site links to (mailto in the footer and
   * contact section) and the default for CONTACT_FROM / CONTACT_TO when
   * those env vars are unset — but Resend can only send *from* it once
   * the sending domain is verified there. See .env.local.example.
   */
  email: "hello@maitstudio.com",
  siteUrl: "https://maitstudio.com",

  logo: {
    src: "/brand/mait-studio-logo.png",
    /** White version of the same mark, for dark surfaces. */
    srcLight: "/brand/mait-studio-logo-light.png",
    alt: "MAIT Studio",
    /** Intrinsic size of the delivered asset — reserves the box (CLS). */
    width: 1128,
    height: 419,
    /**
     * Rendered heights in px. The mark is a stacked lockup (MAIT over
     * STUDIO, ratio 2.69:1), so it needs more height than a single-line
     * wordmark for the lower line to stay readable — hence 40px rather
     * than the 22px the old text wordmark used.
     */
    heights: { settled: 40, compact: 32 },
  },
};

export default BRAND;
