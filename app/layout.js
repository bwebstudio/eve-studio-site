import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Providers from "@/components/Providers";
import Preloader from "@/components/Preloader";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: `${BRAND.name} — Creative Studio`,
  description: `${BRAND.name} is a creative studio shaping brand identity, brand experiences and visual content for contemporary brands.`,
  // Canonical origin for every relative URL in metadata (OG images,
  // canonicals). Sourced from BRAND.siteUrl — see lib/brand.js.
  metadataBase: new URL(BRAND.siteUrl),
  applicationName: BRAND.name,
  openGraph: {
    siteName: BRAND.name,
    title: `${BRAND.name} — Creative Studio`,
    description:
      "Events, brand experiences, photo & video. Creative direction and production under one roof.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    // `lang` is the default locale; LangProvider keeps document.
    // documentElement.lang in sync when the visitor switches language.
    <html lang="en" className="bg-bg">
      <head>
        {/* General Sans is the primary editorial sans, served from
            Fontshare's free CDN. Preconnect first so the request can
            start while HTML is still parsing. Replace with a self-hosted
            woff2 build before going to production. */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700&display=swap"
        />
      </head>
      <body className="bg-bg text-ink antialiased selection:bg-ink selection:text-bg">
        <Providers>
          <SmoothScroll />
          <Cursor />
          {children}
          <Preloader />
        </Providers>
      </body>
    </html>
  );
}
