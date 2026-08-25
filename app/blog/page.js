import Navigation from "@/components/Navigation";
import Blog from "@/components/Blog";
import SiteFooter from "@/components/SiteFooter";
import { BRAND } from "@/lib/brand";

export const metadata = {
  title: `Blog — ${BRAND.name}`,
  description:
    "Notes from the studio. Weekly editorial on brand, social, events and visual culture.",
};

export default function BlogPage() {
  return (
    <main className="relative bg-bg text-ink">
      <Navigation />
      <Blog />
      <SiteFooter />
    </main>
  );
}
