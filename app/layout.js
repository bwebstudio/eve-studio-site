import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Providers from "@/components/Providers";
import Preloader from "@/components/Preloader";

export const metadata = {
  title: "EVE — Creative Studio",
  description:
    "EVE is a Madrid-based creative studio shaping brand identity, visual content and strategic connections for contemporary brands.",
  metadataBase: new URL("https://eve.studio"),
  openGraph: {
    title: "EVE — Creative Studio",
    description:
      "Creative direction, visual content and brand connections. A Madrid-based studio.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#EFEAE0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
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
