import Navigation from "@/components/Navigation";
import Blog from "@/components/Blog";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Blog — EVE Studio",
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
