import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonial from "@/components/Testimonial";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="relative bg-bg text-ink">
      <Navigation />
      <Hero />
      <Clients />
      <About />
      <Services />
      {/*
        "Selected work" (<SelectedWork />) is intentionally NOT rendered
        here: the portfolio is being rebuilt and the client does not want
        projects on the home page that no longer represent the studio's
        direction.

        The component is untouched and still fully functional — dropping
        <SelectedWork /> back between <Services /> and <Testimonial />
        restores the section exactly as it was, along with the `#work`
        anchor it owns (the matching nav/footer links were removed with
        the "Work" menu entry and would need restoring in content.js).

        Every section brings its own vertical padding and top hairline, so
        removing it leaves no gap — the page simply moves from Services
        into the pull-quote pause.
      */}
      {/* Large editorial pull-quote — cinematic pause after the services */}
      <Testimonial />
      {/* Blog teaser — full archive lives at /blog */}
      <Blog limit={3} asSection />
      {/* Quiet testimonials set near the contact area */}
      <Testimonials />
      <Contact />
      <SiteFooter />
    </main>
  );
}
