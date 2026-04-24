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
  themeColor: "#F7F5F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-bg">
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
