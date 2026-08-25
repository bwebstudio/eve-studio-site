import { BRAND } from "./brand";
import { BRAND_EXPERIENCES_HREF } from "./serviceRoutes";

/**
 * Deep-merge a locale override map onto a complete base locale.
 *
 * Used to build partially-translated locales (currently Italian) on top
 * of a complete one without duplicating the whole tree: any key the
 * override doesn't define falls back to the base locale, so a route can
 * never render `undefined`. Arrays are replaced wholesale — a translated
 * list must be supplied in full.
 */
function mergeLocale(base, overrides) {
  if (Array.isArray(overrides)) return overrides;
  if (
    overrides === null ||
    typeof overrides !== "object" ||
    typeof base !== "object" ||
    base === null ||
    Array.isArray(base)
  ) {
    return overrides === undefined ? base : overrides;
  }
  const out = { ...base };
  for (const [key, value] of Object.entries(overrides)) {
    out[key] = key in base ? mergeLocale(base[key], value) : value;
  }
  return out;
}

const content = {
  en: {
    meta: {
      title: `${BRAND.name} — Creative Studio`,
      description:
        `${BRAND.name} is a creative studio building brand experiences, content and events that connect brands with people.`,
    },

    nav: {
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/#about" },
        { label: "Services", href: "/#services" },
        { label: "Blog", href: "/#blog" },
        { label: "Contact", href: "/#contact" },
      ],
      cta: "Let’s talk",
      menu: "Menu",
      close: "Close",
    },

    mobileMenu: {
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/#about" },
        { label: "Services", href: "/#services" },
        { label: "Blog", href: "/#blog" },
        { label: "Contact", href: "/#contact" },
      ],
      footer: ["Brand experiences", "Content & events", "Visual direction"],
    },

    /**
     * Shared UI chrome — labels that used to be inlined as
     * `lang === "es" ? … : …` ternaries inside components. Centralised
     * here so adding a locale is a content-only change.
     */
    ui: {
      index: "← Index",
      backToStudio: "← Back to studio",
      startProject: "Start a project",
      exploreWork: "Explore the work",
      client: "Client",
      location: "Location",
      year: "Year",
      services: "Services",
      nextProject: "Next project",
      press: "Press",
      featuredBy: "Featured by",
      work: "Work",
      languageSelector: "Language selector",
      draftCopy: "Placeholder copy — pending final text",
    },

    hero: {
      scenes: [
        { word: "EVENTS", italic: false },
        { word: "CONTENT", italic: true },
        { word: "CONNECT", italic: false },
      ],
      meta: "Est. 2026 — Madrid",
      tagline: "Events — Brand Experiences — Photo & Video",
      kicker: `${BRAND.name}`,
      // Principal commercial line — the brief asks for this verbatim
      // (with the grammatically correct plural verb "connect").
      titleA: "We create",
      titleAccent: "experiences",
      titleItalic: "that connect",
      // Studio footprint — sits directly under the headline.
      locations: "MILAN · MADRID · CANARY ISLANDS COMING SOON",
      // Hero CTA — routes to the studio presentation block (#about).
      ctaAbout: `Meet ${BRAND.shortName}`,
      supporting:
        "A creative studio specialised in events, brand experiences and photo & video. We combine creativity, culture and strategy to build brand experiences people remember.",
      ctaDiscover: "Discover more",
      ctaWork: "Selected work",
      ctaContact: "Start a project",
      scroll: "(S) Scroll",
    },

    // Real project / client strip. The marquee repeats this list rather
    // than padding it with invented names — see <Clients>.
    clients: {
      label: "Trusted by",
      list: ["XERÍ GIN", "LI-ONNA", "ALENA ANGEL ART", "DOWNHILLITALIA"],
    },

    about: {
      sectionLabel: "(About)",
      sectionIndex: "Index / 02",
      eyebrow: "Who we are",
      srOnly:
        `${BRAND.name} is a creative studio that connects brands with people through experiences, content and visual direction.`,
      title: "A creative studio",
      titleItalic: "for contemporary brands.",
      lede:
        `${BRAND.name} is a creative studio. We connect brands with people through experiences, content and visual direction — built with intention, produced in-house, scaled with strategy.`,
      readMore: "Discover more",
      // Compact pillars — shown as a single editorial row beneath the
      // 2-col main block. Title + one-line body so the section breathes.
      pillars: [
        { label: "Vision", body: "Brands become real when people feel them — in a room, on a screen, in a frame." },
        { label: "Philosophy", body: "Editorial, considered, contemporary. Long arcs and short loops as one conversation." },
        { label: "Creative identity", body: "Events, social and visual production. The disciplines change; the eye stays the same." },
        { label: "Brand approach", body: "Strategy first, image always. One body of work, not separate deliverables." },
      ],
      captions: [
        "(01) Studio portrait — Madrid, 2026",
        "(02) Archive still life",
      ],
    },

    services: {
      sectionLabel: "(Services)",
      sectionIndex: "Index / 03",
      eyebrow: "What we do",
      title: "Three disciplines,",
      titleItalic: "one studio.",
      items: [
        {
          key: "events",
          index: "01",
          name: "Events",
          tagline: "Atmospheric brand events, dinners and launches designed to be felt in person.",
          note: "Atmospheric brand events, dinners and launches designed to be felt in person — and remembered afterwards through thoughtful content capture.",
          image: "/images/work/ipa-brand-lionna/event-02-dinner-table-editorial.png",
          list: [
            "Event organization",
            "Brand experiences",
            "Activations",
            "Brands",
            "Nightlife",
          ],
        },
        {
          key: "brand-experiences",
          index: "02",
          name: "Brand Experiences",
          tagline:
            "Concept, activation and production of experiences that connect brands and people.",
          note: "Activations, launches, pop-ups and experiences designed from concept through to final production.",
          image: "/images/work/xeri-gin-focaccia-beat/xeri-gin-04-bar-service-editorial.png",
          list: [
            "Brand activations",
            "Product launches",
            "Pop-ups",
            "Press & influencer experiences",
            "Creative direction & production",
          ],
        },
        {
          key: "photo-video",
          index: "03",
          name: "Photo & Video",
          tagline: "Visual content that captures, inspires and converts.",
          note: "Photography, video and drone filming produced in-house. Campaign suites, reels, brand films and sport documentary as a complete visual system.",
          image: "/images/work/downhillitalia/downhillitalia-01-water-splash-bw.webp",
          list: [
            "Shootings",
            "Reels",
            "Campaigns",
            "Drone filming",
            "Visual production",
          ],
        },
      ],
      viewAll: "View all services",
      marquee:"Events · Brand Experiences · Photo & Video · ",
    },

    /**
     * /services/brand-experiences — pillar 02.
     *
     * Spanish is the copy the client signed off on (see brief). The
     * English and Italian versions are faithful translations of that
     * approved copy, NOT new claims — they stay centralised here so the
     * copywriter can swap them in one place.
     */
    brandExperiences: {
      sectionLabel: "(Brand Experiences)",
      sectionIndex: "Index / 03",
      eyebrow: "Services / Brand Experiences",
      h1: "Brand Experiences",
      lead:
        "We create moments that make a brand felt, remembered and shared.",
      sub:
        "Activations, launches, pop-ups and experiences designed from concept through to final production.",
      cta: "Tell us about your project",
      meaning: {
        title: "A brand idea, turned into an experience.",
        body:
          "We turn a brand’s universe into something people can live. We design the concept, the space, the aesthetic, the production and every touchpoint so that everything tells the same story.",
      },
      create: {
        title: "What we can create",
        items: [
          "Brand activations",
          "Product launches",
          "Pop-ups",
          "Press & influencer experiences",
          "Private presentations",
          "Brand events",
          "Experiences for hospitality, fashion, beauty and lifestyle",
        ],
      },
      process: {
        title: "From brief to experience",
        steps: [
          { n: "01", label: "Brief", body: "We get to know the brand, the objective, the audience, the budget and what we want people to feel." },
          { n: "02", label: "Concept", body: "We develop the creative idea, moodboard, narrative, space and activations." },
          { n: "03", label: "Production", body: "We coordinate venue, suppliers, build, hospitality, technical and logistics." },
          { n: "04", label: "Experience", body: "We direct the day itself and look after every point of contact." },
          { n: "05", label: "Content", body: "Where it applies, the project can continue into photography, video and content pieces." },
        ],
      },
      includes: {
        title: "Every experience is built to measure.",
        items: [
          "Creative direction",
          "Concept & narrative",
          "Venue & locations",
          "Production & coordination",
          "Set design & atmosphere",
          "Catering & hospitality",
          "Music & entertainment",
          "Staff & suppliers",
          "Photography & video",
          "Vertical content",
          "Gifting",
          "Guests & guest journey",
        ],
        note:
          "We select only what the project needs. We don’t work with fixed packages.",
      },
      result: {
        title: "One coherent experience, start to finish.",
        body:
          "The client doesn’t only receive an event. They receive a concept, an execution and an experience aligned with their brand, with a single point of contact and one shared creative direction.",
        closing: "You bring the brand. We build the moment.",
      },
      close: {
        title: "Have an idea in mind?",
        body:
          "Tell us what you want to launch, present or bring to life. We’ll help you turn it into an experience.",
        cta: "Let’s talk about your project",
      },
      // Visual support — real, authorised project. Assets come from
      // BRAND_EXPERIENCE_SUPPORT in lib/projects.js; the block renders
      // nothing at all until those assets land.
      support: {
        eyebrow: "In progress",
        project: "Alena Angel Art",
        note:
          "Brand development and positioning, PR, representation and new spaces for exhibitions and events.",
      },
    },

    work: {
      sectionLabel: "(Work)",
      sectionIndex: "Index / 04",
      eyebrow: "Selected work",
      title: "Recent",
      titleItalic: "collaborations.",
      lede:
        "Three disciplines, one archive. Choose a category to enter the relevant work.",
      categoriesHeading: "Choose a category",
      categories: [
        {
          key: "events",
          index: "01",
          label: "Events",
          href: "/work/events",
          note: "Brand activations, launches & nightlife.",
        },
        {
          key: "brand-experiences",
          index: "02",
          label: "Brand Experiences",
          href: BRAND_EXPERIENCES_HREF,
          note: "Activations, launches, pop-ups & brand moments.",
        },
        {
          key: "photo-video",
          index: "03",
          label: "Photo & Video",
          href: "/work/photo-video",
          note: "Shootings, reels & campaigns.",
        },
      ],
      overlay: {
        title: "Work",
        subtitle: "Choose where you want to enter.",
        close: "Close",
      },
      // Legacy in-page card grid — kept as a small visual proof on the
      // home, with the full archive living behind the overlay routes.
      projects: [
        { index: "01", title: "Xerí Gin — Focaccia & Beat", slug: "xeri-gin-focaccia-beat", discipline: "Brand Activation · Event Content · Photography", year: "2026" },
        { index: "02", title: "IPA Brand at Li-Onna", slug: "ipa-brand-lionna", discipline: "Fashion event · Content capture · Brand experience", year: "2026" },
        { index: "03", title: "Backyard dello Specchio", slug: "backyard-franciacorta", discipline: "Photography · Video · Drone Filming", year: "2026" },
        { index: "04", title: "Bossa — Nightlife Stills", slug: "bossa-nightlife-stills", discipline: "Event Photography · Nightlife · Visual Documentation", year: "2026" },
      ],
      footer: "All projects on request",
      footerCta: "Request full portfolio →",
    },

    testimonials: {
      // One large editorial pull-quote — sits between the work grid and
      // the blog as a cinematic pause. Split into lead + accent so the
      // key phrase carries the editorial italic flourish (Hero pattern).
      // Attributed to real projects (no invented people); replace text
      // with verbatim client feedback when available.
      featured: {
        eyebrow: "In their words",
        lead:
          `${BRAND.shortName} didn’t launch a product. They built Xerí a room, a rhythm and`,
        accent: "a world of its own.",
        author: "",
        brand: "Xerí Gin",
        role: "Gin brand",
      },
      // Quiet editorial set near the contact area. Text-first, no cards.
      eyebrow: "Testimonials",
      lede: "A few words from the brands and rooms we’ve helped build.",
      list: [
        {
          quote: `${BRAND.shortName} captured the mood of the night before we could even name it.`,
          brand: "IPA",
          role: "Fashion label",
        },
        {
          quote:
            "From the ground and the air, every frame felt composed, never just captured.",
          brand: "Backyard dello Specchio",
          role: "Lifestyle event",
        },
        {
          quote: `${BRAND.shortName} shot the night exactly as it felt, not just how it looked.`,
          brand: "Bossa",
          role: "Nightlife venue",
        },
      ],
    },

    workCategories: {
      events: {
        title: "Events",
        eyebrow: "Work / Events",
        intro:
          "Brand activations, launches, nightlife and cultural moments — produced and directed in-house.",
        cta: "Start an event with us",
        empty:
          "Selected events will live here. Copy and project list to follow.",
      },
      // Kept for case-study breadcrumbs — the public entry point for this
      // pillar is the /services/brand-experiences page, not a work archive.
      "brand-experiences": {
        title: "Brand Experiences",
        eyebrow: "Work / Brand Experiences",
        intro:
          "Activations, launches, pop-ups and experiences designed from concept through to final production.",
        cta: "Tell us about your project",
        empty:
          "Selected brand experiences will live here. Copy and case examples to follow.",
      },
      "photo-video": {
        title: "Photo & Video",
        eyebrow: "Work / Photo & Video",
        intro:
          "Campaign suites, reels, editorial stories and brand films, produced in-house.",
        cta: "Plan a shoot",
        empty:
          "Selected shoots and films will live here. Copy and reel to follow.",
      },
    },

    blog: {
      sectionLabel: "(Blog)",
      sectionIndex: "Index / 05",
      eyebrow: "From the studio",
      title: "Notes,",
      titleItalic: "weekly.",
      lede:
        "Insights on brand, social, events and visual culture. New entries every week.",
      cta: "Read all notes",
      // Mock editorial posts — replace with CMS data when ready.
      posts: [
        {
          slug: "rooms-people-remember",
          category: "Events",
          title: "Rooms people remember",
          excerpt:
            "Why the next decade of brand-building happens in physical space.",
          date: "May 2026",
          read: "4 min read",
          cover: "https://images.unsplash.com/photo-1752758059740-fd250168138e?w=1400&q=80&auto=format&fit=crop",
        },
        {
          slug: "the-monthly-arc",
          category: "Social Media",
          title: "The monthly arc",
          excerpt:
            "How we plan social as a continuous arc instead of isolated posts.",
          date: "May 2026",
          read: "5 min read",
          cover: "https://images.unsplash.com/photo-1690733546457-029606fbc0e6?w=1400&q=80&auto=format&fit=crop",
        },
        {
          slug: "shooting-with-intention",
          category: "Photo & Video",
          title: "Shooting with intention",
          excerpt:
            "Why the brief is the most important camera on set.",
          date: "April 2026",
          read: "6 min read",
          cover: "https://images.unsplash.com/photo-1432821397715-257962351702?w=1400&q=80&auto=format&fit=crop",
        },
        {
          slug: "behind-casa-lumen",
          category: "Behind the scenes",
          title: "Behind Casa Lumen",
          excerpt:
            "Five days, one hotel, a brand built in light.",
          date: "April 2026",
          read: "7 min read",
          cover: "/images/hotel_lisboa.png",
        },
        {
          slug: "branding-after-the-feed",
          category: "Creative direction",
          title: "Branding after the feed",
          excerpt:
            "What replaces the grid when the grid stops being the brand.",
          date: "March 2026",
          read: "5 min read",
          cover: "/images/ornela.png",
        },
        {
          slug: "cultural-capital",
          category: "Insights",
          title: "Cultural capital",
          excerpt:
            "On the brands that earn their place in the conversation.",
          date: "March 2026",
          read: "4 min read",
          cover: "/images/atelier-norte.png",
        },
      ],
      empty: "Notes coming soon — check back next week.",
      backToBlog: "← Back to blog",
    },

    contact: {
      sectionLabel: "(Contact)",
      sectionIndex: "Index / 06",
      eyebrow: "Let’s build something together",
      title: "Say",
      titleItalic: "hello.",
      lede: "Tell us about your brand, your moment or your idea. We reply within 48 hours.",
      email: BRAND.email,
      info: [
        "Madrid — Spain",
        "Available for new projects · 2026",
        "By introduction & invitation",
      ],
      form: {
        nameLabel: "Name",
        namePlaceholder: "Your full name",
        companyLabel: "Company",
        companyPlaceholder: "Your brand or company",
        emailLabel: "Email",
        emailPlaceholder: "your@email.com",
        phoneLabel: "Phone",
        phonePlaceholder: "+34 600 000 000",
        serviceLabel: "Service needed",
        servicePlaceholder: "Choose a service",
        budgetLabel: "Approximate budget",
        budgetPlaceholder: "Select a range",
        messageLabel: "Message",
        messagePlaceholder: "Tell us a little about your project, your timeline and what success looks like.",
        consent: `I agree to be contacted by ${BRAND.name} about this enquiry.`,
        privacy: "Privacy policy",
        privacyHref: "/privacy",
        submit: "Send enquiry",
        submitting: "Sending…",
        success: "Thank you. We’ll be in touch within 48 hours.",
        errors: {
          required: "Please fill in the required fields.",
          email: "That email doesn’t look right.",
          consent: "Please accept the consent checkbox.",
          generic: "Something went wrong. Please try again.",
        },
      },
      services: [
        { value: "events", label: "Events" },
        { value: "brand-experiences", label: "Brand Experiences" },
        { value: "photo-video", label: "Photo & Video" },
        { value: "other", label: "Other" },
      ],
      budgets: [
        { value: "under-1k", label: "Under €1,000" },
        { value: "1k-3k", label: "€1,000 – €3,000" },
        { value: "3k-5k", label: "€3,000 – €5,000" },
        { value: "5k-plus", label: "€5,000+" },
        { value: "not-sure", label: "Not sure yet" },
      ],
      footer: {
        studio: { label: "Studio", value: "Calle del Pez — Madrid" },
        contact: { label: "Contact" },
        follow: {
          label: "Follow",
          links: ["Instagram", "LinkedIn", "Are.na"],
        },
        index: {
          label: "Index",
          links: [
            { label: "About", href: "/#about" },
            { label: "Services", href: "/#services" },
            { label: "Work", href: "/work" },
            { label: "Blog", href: "/blog" },
          ],
        },
      },
      copyright: `© ${BRAND.name} — 2026`,
      tagline:
        "We create experiences that connect brands & people.",
      crafted: "Crafted in Madrid",
    },

    newsletter: {
      sectionLabel: "(Newsletter)",
      sectionIndex: "Index / 05",
      eyebrow: "From the studio",
      headlineA: "Notes,",
      headlineItalic: "weekly",
      body: "Dispatches from the studio — new work, behind-the-scenes, the occasional thought. No noise.",
      placeholder: "your@email.com",
      cta: "Subscribe",
      consent: `I agree to receive emails from ${BRAND.name}.`,
      privacy: "Privacy policy",
      privacyHref: "/privacy",
      success: "You’re in. Welcome to the room.",
      errors: {
        invalid: "That email doesn’t look right.",
        consent: "Please accept the consent checkbox.",
        generic: "Something went wrong. Please try again.",
      },
    },
  },

  es: {
    meta: {
      title: `${BRAND.name} — Estudio Creativo`,
      description:
        `${BRAND.name} es un estudio creativo que construye experiencias, contenido y eventos que conectan marcas con personas.`,
    },

    nav: {
      links: [
        { label: "Inicio", href: "/" },
        { label: "Estudio", href: "/#about" },
        { label: "Servicios", href: "/#services" },
        { label: "Blog", href: "/#blog" },
        { label: "Contacto", href: "/#contact" },
      ],
      cta: "Hablemos",
      menu: "Menú",
      close: "Cerrar",
    },

    mobileMenu: {
      links: [
        { label: "Inicio", href: "/" },
        { label: "Estudio", href: "/#about" },
        { label: "Servicios", href: "/#services" },
        { label: "Blog", href: "/#blog" },
        { label: "Contacto", href: "/#contact" },
      ],
      footer: ["Experiencias de marca", "Contenido y eventos", "Dirección visual"],
    },

    /** Chrome compartido — ver la nota en el bloque `ui` en inglés. */
    ui: {
      index: "← Inicio",
      backToStudio: "← Volver al estudio",
      startProject: "Empezar un proyecto",
      exploreWork: "Ver los proyectos",
      client: "Cliente",
      location: "Ubicación",
      year: "Año",
      services: "Servicios",
      nextProject: "Siguiente proyecto",
      press: "Prensa",
      featuredBy: "Publicado en",
      work: "Trabajo",
      languageSelector: "Selector de idioma",
      draftCopy: "Texto provisional — pendiente de copy definitivo",
    },

    hero: {
      scenes: [
        { word: "EVENTOS", italic: false },
        { word: "CONTENIDO", italic: true },
        { word: "CONECTAR", italic: false },
      ],
      meta: "Est. 2026 — Madrid",
      tagline: "Eventos — Experiencias de Marca — Foto y Vídeo",
      kicker: `${BRAND.name}`,
      titleA: "Creamos",
      titleAccent: "experiencias",
      titleItalic: "que conectan",
      // Presencia del estudio — va justo debajo del titular.
      locations: "MILÁN · MADRID · PRÓXIMAMENTE ISLAS CANARIAS",
      // CTA del hero — lleva al bloque de presentación del estudio (#about).
      ctaAbout: `CONOCE ${BRAND.shortName}`,
      supporting:
        "Estudio creativo especializado en eventos, experiencias de marca y producción audiovisual. Combinamos creatividad, cultura y estrategia para construir experiencias de marca que se recuerdan.",
      ctaDiscover: "Descubre más",
      ctaWork: "Proyectos",
      ctaContact: "Empezar un proyecto",
      scroll: "(S) Scroll",
    },

    // Franja de proyectos reales. El marquee repite esta lista en lugar
    // de rellenarla con nombres inventados — ver <Clients>.
    clients: {
      label: "Han confiado en nosotros",
      list: ["XERÍ GIN", "LI-ONNA", "ALENA ANGEL ART", "DOWNHILLITALIA"],
    },

    about: {
      sectionLabel: "(Estudio)",
      sectionIndex: "Index / 02",
      eyebrow: "Quiénes somos",
      srOnly:
        `${BRAND.name} es un estudio creativo que conecta marcas con personas a través de experiencias, contenido y dirección visual.`,
      title: "Un estudio creativo",
      titleItalic: "para marcas contemporáneas.",
      lede:
        `${BRAND.name} es un estudio creativo. Conectamos marcas con personas a través de experiencias, contenido y dirección visual — pensado con intención, producido dentro del estudio, escalado con estrategia.`,
      readMore: "Descubre más",
      pillars: [
        { label: "Visión", body: "Las marcas se vuelven reales cuando la gente las siente — en una sala, en una pantalla, en una imagen." },
        { label: "Filosofía", body: "Editorial, cuidada, contemporánea. Arcos largos y ciclos cortos como una sola conversación." },
        { label: "Identidad creativa", body: "Eventos, redes y producción audiovisual. Las disciplinas cambian; la mirada se mantiene." },
        { label: "Enfoque de marca", body: "Estrategia primero, imagen siempre. Un solo cuerpo de trabajo, no entregables sueltos." },
      ],
      captions: [
        "(01) Retrato de estudio — Madrid, 2026",
        "(02) Bodegón de archivo",
      ],
    },

    services: {
      sectionLabel: "(Servicios)",
      sectionIndex: "Index / 03",
      eyebrow: "Qué hacemos",
      title: "Tres disciplinas,",
      titleItalic: "un estudio.",
      items: [
        {
          key: "events",
          index: "01",
          name: "Eventos",
          tagline: "Eventos de marca atmosféricos, cenas y lanzamientos pensados para vivirse en persona.",
          note: "Eventos de marca atmosféricos, cenas y lanzamientos pensados para vivirse en persona — y recordarse después a través de una captura de contenido cuidada.",
          image: "/images/work/ipa-brand-lionna/event-02-dinner-table-editorial.png",
          list: [
            "Organización de eventos",
            "Experiencias",
            "Activaciones",
            "Marcas",
            "Nightlife",
          ],
        },
        {
          key: "brand-experiences",
          index: "02",
          name: "Experiencias de Marca",
          tagline:
            "Concepto, activación y producción de experiencias que conectan marcas y personas.",
          note: "Activaciones, lanzamientos, pop-ups y experiencias diseñadas desde el concepto hasta la producción final.",
          image: "/images/work/xeri-gin-focaccia-beat/xeri-gin-04-bar-service-editorial.png",
          list: [
            "Activaciones de marca",
            "Lanzamientos de producto",
            "Pop-ups",
            "Experiencias para prensa e influencers",
            "Dirección creativa y producción",
          ],
        },
        {
          key: "photo-video",
          index: "03",
          name: "Foto y Vídeo",
          tagline: "Contenido visual que captura, inspira y convierte.",
          note: "Fotografía, vídeo y drone filming producidos dentro del estudio. Suites de campaña, reels, películas de marca y documental deportivo como un sistema visual completo.",
          image: "/images/work/downhillitalia/downhillitalia-01-water-splash-bw.webp",
          list: [
            "Shootings",
            "Reels",
            "Campañas",
            "Drone filming",
            "Producción visual",
          ],
        },
      ],
      viewAll: "Ver todos los servicios",
      marquee:"Eventos · Experiencias de Marca · Foto y Vídeo · ",
    },

    /**
     * /services/brand-experiences — pilar 02. Copy aprobado por la clienta.
     */
    brandExperiences: {
      sectionLabel: "(Experiencias de Marca)",
      sectionIndex: "Index / 03",
      eyebrow: "Servicios / Experiencias de Marca",
      h1: "Experiencias de Marca",
      lead:
        "Creamos momentos que hacen que una marca se viva, se recuerde y se comparta.",
      sub:
        "Activaciones, lanzamientos, pop-ups y experiencias diseñadas desde el concepto hasta la producción final.",
      cta: "Cuéntanos tu proyecto",
      meaning: {
        title: "Una idea de marca, convertida en una experiencia.",
        body:
          "Transformamos el universo de una marca en algo que las personas pueden vivir. Diseñamos el concepto, el espacio, la estética, la producción y cada punto de contacto para que todo cuente la misma historia.",
      },
      create: {
        title: "Qué podemos crear",
        items: [
          "Activaciones de marca",
          "Lanzamientos de producto",
          "Pop-ups",
          "Experiencias para prensa e influencers",
          "Presentaciones privadas",
          "Eventos de marca",
          "Experiencias para hospitality, moda, beauty y lifestyle",
        ],
      },
      process: {
        title: "Del brief a la experiencia",
        steps: [
          { n: "01", label: "Brief", body: "Entendemos la marca, el objetivo, el público, el presupuesto y lo que queremos hacer sentir." },
          { n: "02", label: "Concepto", body: "Desarrollamos la idea creativa, moodboard, narrativa, espacio y activaciones." },
          { n: "03", label: "Producción", body: "Coordinamos venue, proveedores, montaje, hospitality, técnica y logística." },
          { n: "04", label: "Experiencia", body: "Dirigimos el día del proyecto y cuidamos cada punto de contacto." },
          { n: "05", label: "Contenido", body: "Cuando aplica, el proyecto puede continuar en fotografía, vídeo y piezas de contenido." },
        ],
      },
      includes: {
        title: "Cada experiencia se construye a medida.",
        items: [
          "Dirección creativa",
          "Concepto y narrativa",
          "Venue y localizaciones",
          "Producción y coordinación",
          "Escenografía y ambientación",
          "Catering y hospitality",
          "Música y entretenimiento",
          "Personal y proveedores",
          "Fotografía y vídeo",
          "Contenido vertical",
          "Gifting",
          "Invitados y guest journey",
        ],
        note:
          "Seleccionamos únicamente lo que el proyecto necesita. No trabajamos con paquetes cerrados.",
      },
      result: {
        title: "Una experiencia coherente de principio a fin.",
        body:
          "El cliente no recibe únicamente un evento. Recibe un concepto, una ejecución y una experiencia alineada con su marca, con un único interlocutor y una dirección creativa común.",
        closing: "Tú traes la marca. Nosotros construimos el momento.",
      },
      close: {
        title: "¿Tienes una idea en mente?",
        body:
          "Cuéntanos qué quieres lanzar, presentar o hacer vivir. Nosotros te ayudamos a convertirlo en una experiencia.",
        cta: "Hablemos de tu proyecto",
      },
      support: {
        eyebrow: "En curso",
        project: "Alena Angel Art",
        note:
          "Desarrollo y posicionamiento de marca, relaciones públicas, representación y búsqueda de nuevos espacios para eventos y exposiciones.",
      },
    },

    work: {
      sectionLabel: "(Trabajo)",
      sectionIndex: "Index / 04",
      eyebrow: "Trabajo seleccionado",
      title: "Colaboraciones",
      titleItalic: "recientes.",
      lede:
        "Tres disciplinas, un archivo. Elige una categoría para entrar al trabajo relevante.",
      categoriesHeading: "Elige una categoría",
      categories: [
        {
          key: "events",
          index: "01",
          label: "Eventos",
          href: "/work/events",
          note: "Activaciones, lanzamientos y nightlife.",
        },
        {
          key: "brand-experiences",
          index: "02",
          label: "Experiencias de Marca",
          href: BRAND_EXPERIENCES_HREF,
          note: "Activaciones, lanzamientos, pop-ups y momentos de marca.",
        },
        {
          key: "photo-video",
          index: "03",
          label: "Foto y Vídeo",
          href: "/work/photo-video",
          note: "Sesiones, reels y campañas.",
        },
      ],
      overlay: {
        title: "Trabajo",
        subtitle: "Elige por dónde quieres entrar.",
        close: "Cerrar",
      },
      projects: [
        { index: "01", title: "Xerí Gin — Focaccia & Beat", slug: "xeri-gin-focaccia-beat", discipline: "Activación de marca · Contenido de evento · Fotografía", year: "2026" },
        { index: "02", title: "IPA Brand en Li-Onna", slug: "ipa-brand-lionna", discipline: "Evento de moda · Captura de contenido · Experiencia de marca", year: "2026" },
        { index: "03", title: "Backyard dello Specchio", slug: "backyard-franciacorta", discipline: "Fotografía · Vídeo · Drone Filming", year: "2026" },
        { index: "04", title: "Bossa — Nightlife Stills", slug: "bossa-nightlife-stills", discipline: "Fotografía de evento · Nightlife · Documentación visual", year: "2026" },
      ],
      footer: "Todos los proyectos bajo consulta",
      footerCta: "Solicitar portfolio completo →",
    },

    testimonials: {
      featured: {
        eyebrow: "En sus palabras",
        lead:
          `${BRAND.shortName} no lanzó un producto. Le construyó a Xerí una sala, un ritmo y`,
        accent: "un mundo propio.",
        author: "",
        brand: "Xerí Gin",
        role: "Marca de ginebra",
      },
      eyebrow: "Testimonios",
      lede:
        "Algunas palabras de las marcas y los espacios que hemos ayudado a construir.",
      list: [
        {
          quote:
            `${BRAND.shortName} capturó la atmósfera de la noche antes de que pudiéramos nombrarla.`,
          brand: "IPA",
          role: "Marca de moda",
        },
        {
          quote:
            "Desde el suelo y desde el aire, cada plano se sentía compuesto, nunca solo capturado.",
          brand: "Backyard dello Specchio",
          role: "Evento lifestyle",
        },
        {
          quote: `${BRAND.shortName} fotografió la noche tal como se sentía, no solo como se veía.`,
          brand: "Bossa",
          role: "Espacio nocturno",
        },
      ],
    },

    workCategories: {
      events: {
        title: "Eventos",
        eyebrow: "Trabajo / Eventos",
        intro:
          "Activaciones de marca, lanzamientos, nightlife y momentos culturales — producidos y dirigidos dentro del estudio.",
        cta: "Empezar un evento",
        empty:
          "Aquí vivirán los eventos seleccionados. Copy y proyectos próximamente.",
      },
      // Se mantiene para los breadcrumbs de los case studies — la entrada
      // pública de este pilar es /services/brand-experiences.
      "brand-experiences": {
        title: "Experiencias de Marca",
        eyebrow: "Trabajo / Experiencias de Marca",
        intro:
          "Activaciones, lanzamientos, pop-ups y experiencias diseñadas desde el concepto hasta la producción final.",
        cta: "Cuéntanos tu proyecto",
        empty:
          "Aquí vivirán las experiencias de marca seleccionadas. Copy y casos próximamente.",
      },
      "photo-video": {
        title: "Foto y Vídeo",
        eyebrow: "Trabajo / Foto y Vídeo",
        intro:
          "Suites de campaña, reels, historias editoriales y películas de marca, producidos dentro del estudio.",
        cta: "Planificar una sesión",
        empty:
          "Aquí vivirán las sesiones y películas seleccionadas. Copy y reel próximamente.",
      },
    },

    blog: {
      sectionLabel: "(Blog)",
      sectionIndex: "Index / 05",
      eyebrow: "Desde el estudio",
      title: "Notas,",
      titleItalic: "semanales.",
      lede:
        "Insights sobre marca, redes, eventos y cultura visual. Nuevas entradas cada semana.",
      cta: "Leer todas las notas",
      posts: [
        {
          slug: "rooms-people-remember",
          category: "Eventos",
          title: "Salas que se recuerdan",
          excerpt:
            "Por qué la próxima década de construcción de marca pasa por el espacio físico.",
          date: "Mayo 2026",
          read: "4 min de lectura",
          cover: "https://images.unsplash.com/photo-1752758059740-fd250168138e?w=1400&q=80&auto=format&fit=crop",
        },
        {
          slug: "the-monthly-arc",
          category: "Redes Sociales",
          title: "El arco mensual",
          excerpt:
            "Cómo planificamos las redes como un arco continuo y no como posts sueltos.",
          date: "Mayo 2026",
          read: "5 min de lectura",
          cover: "https://images.unsplash.com/photo-1690733546457-029606fbc0e6?w=1400&q=80&auto=format&fit=crop",
        },
        {
          slug: "shooting-with-intention",
          category: "Foto y Vídeo",
          title: "Disparar con intención",
          excerpt:
            "Por qué el brief es la cámara más importante del set.",
          date: "Abril 2026",
          read: "6 min de lectura",
          cover: "https://images.unsplash.com/photo-1432821397715-257962351702?w=1400&q=80&auto=format&fit=crop",
        },
        {
          slug: "behind-casa-lumen",
          category: "Detrás de cámaras",
          title: "Detrás de Casa Lumen",
          excerpt:
            "Cinco días, un hotel, una marca construida en luz.",
          date: "Abril 2026",
          read: "7 min de lectura",
          cover: "/images/hotel_lisboa.png",
        },
        {
          slug: "branding-after-the-feed",
          category: "Dirección creativa",
          title: "Branding después del feed",
          excerpt:
            "Qué reemplaza al grid cuando el grid deja de ser la marca.",
          date: "Marzo 2026",
          read: "5 min de lectura",
          cover: "/images/ornela.png",
        },
        {
          slug: "cultural-capital",
          category: "Insights",
          title: "Capital cultural",
          excerpt:
            "Sobre las marcas que se ganan un lugar en la conversación.",
          date: "Marzo 2026",
          read: "4 min de lectura",
          cover: "/images/atelier-norte.png",
        },
      ],
      empty: "Notas próximamente — vuelve la semana que viene.",
      backToBlog: "← Volver al blog",
    },

    contact: {
      sectionLabel: "(Contacto)",
      sectionIndex: "Index / 06",
      eyebrow: "Construyamos algo juntos",
      title: "Escríbe",
      titleItalic: "nos.",
      lede:
        "Cuéntanos sobre tu marca, tu momento o tu idea. Respondemos en menos de 48 horas.",
      email: BRAND.email,
      info: [
        "Madrid — España",
        "Disponible para nuevos proyectos · 2026",
        "Por introducción e invitación",
      ],
      form: {
        nameLabel: "Nombre",
        namePlaceholder: "Tu nombre completo",
        companyLabel: "Empresa",
        companyPlaceholder: "Tu marca o empresa",
        emailLabel: "Email",
        emailPlaceholder: "tu@email.com",
        phoneLabel: "Teléfono",
        phonePlaceholder: "+34 600 000 000",
        serviceLabel: "Servicio",
        servicePlaceholder: "Elige un servicio",
        budgetLabel: "Presupuesto aproximado",
        budgetPlaceholder: "Elige un rango",
        messageLabel: "Mensaje",
        messagePlaceholder: "Cuéntanos un poco sobre tu proyecto, los tiempos y qué entiendes por éxito.",
        consent: `Acepto ser contactado por ${BRAND.name} sobre esta consulta.`,
        privacy: "Política de privacidad",
        privacyHref: "/privacy",
        submit: "Enviar consulta",
        submitting: "Enviando…",
        success: "Gracias. Te escribiremos en menos de 48 horas.",
        errors: {
          required: "Por favor completa los campos obligatorios.",
          email: "Ese email no parece válido.",
          consent: "Por favor acepta el consentimiento.",
          generic: "Algo salió mal. Inténtalo de nuevo.",
        },
      },
      services: [
        { value: "events", label: "Eventos" },
        { value: "brand-experiences", label: "Experiencias de Marca" },
        { value: "photo-video", label: "Foto y Vídeo" },
        { value: "other", label: "Otro" },
      ],
      budgets: [
        { value: "under-1k", label: "Menos de €1.000" },
        { value: "1k-3k", label: "€1.000 – €3.000" },
        { value: "3k-5k", label: "€3.000 – €5.000" },
        { value: "5k-plus", label: "€5.000+" },
        { value: "not-sure", label: "Aún no lo sé" },
      ],
      footer: {
        studio: { label: "Estudio", value: "Calle del Pez — Madrid" },
        contact: { label: "Contacto" },
        follow: {
          label: "Síguenos",
          links: ["Instagram", "LinkedIn", "Are.na"],
        },
        index: {
          label: "Índice",
          links: [
            { label: "Estudio", href: "/#about" },
            { label: "Servicios", href: "/#services" },
            { label: "Proyectos", href: "/work" },
            { label: "Blog", href: "/blog" },
          ],
        },
      },
      copyright: `© ${BRAND.name} — 2026`,
      tagline:
        "Creamos experiencias que conectan marcas y personas.",
      crafted: "Hecho en Madrid",
    },

    newsletter: {
      sectionLabel: "(Boletín)",
      sectionIndex: "Index / 05",
      eyebrow: "Desde el estudio",
      headlineA: "Notas,",
      headlineItalic: "semanales",
      body: "Apuntes desde el estudio — nuevos proyectos, detrás de escena, algún pensamiento. Sin ruido.",
      placeholder: "tu@email.com",
      cta: "Suscribirme",
      consent: `Acepto recibir emails de ${BRAND.name}.`,
      privacy: "Política de privacidad",
      privacyHref: "/privacy",
      success: "Estás dentro. Bienvenida al estudio.",
      errors: {
        invalid: "Ese email no parece válido.",
        consent: "Por favor acepta el consentimiento.",
        generic: "Algo salió mal. Inténtalo de nuevo.",
      },
    },
  },
};

/* ────────────────────────────────────────────────────────────────────────
 * ITALIAN — provisional
 *
 * The site has no locale routing: `useLang` swaps this content tree
 * client-side. Italian is therefore added as an override map merged onto
 * the complete English locale (see `mergeLocale`), which means:
 *
 *   • every route renders — no missing keys, no broken pages;
 *   • anything NOT listed below intentionally falls back to English
 *     rather than being machine-translated into copy the client has not
 *     approved.
 *
 * TRANSLATED HERE (provisional, pending the copywriter):
 *   meta · nav · mobileMenu · ui · hero · clients.label · about ·
 *   services · brandExperiences · work · workCategories ·
 *   contact (incl. form) · newsletter
 *
 * STILL PENDING FINAL IT TRANSLATION — falls back to English on purpose:
 *   blog.posts (mock editorial content, awaiting the real CMS copy)
 *   testimonials.featured / testimonials.list (client quotes — must not
 *     be translated without approval)
 *   lib/projects.js case studies (see the `it` fallback there)
 * ──────────────────────────────────────────────────────────────────────── */
const IT_OVERRIDES = {
  meta: {
    title: `${BRAND.name} — Studio Creativo`,
    description: `${BRAND.name} è uno studio creativo che costruisce esperienze, contenuti ed eventi che connettono i brand con le persone.`,
  },

  nav: {
    links: [
      { label: "Home", href: "/" },
      { label: "Studio", href: "/#about" },
      { label: "Servizi", href: "/#services" },
      { label: "Blog", href: "/#blog" },
      { label: "Contatti", href: "/#contact" },
    ],
    cta: "Parliamone",
    menu: "Menu",
    close: "Chiudi",
  },

  mobileMenu: {
    links: [
      { label: "Home", href: "/" },
      { label: "Studio", href: "/#about" },
      { label: "Servizi", href: "/#services" },
      { label: "Blog", href: "/#blog" },
      { label: "Contatti", href: "/#contact" },
    ],
    footer: ["Esperienze di marca", "Contenuti ed eventi", "Direzione visiva"],
  },

  ui: {
    index: "← Indice",
    backToStudio: "← Torna allo studio",
    startProject: "Iniziamo un progetto",
    exploreWork: "Scopri i progetti",
    client: "Cliente",
    location: "Luogo",
    year: "Anno",
    services: "Servizi",
    nextProject: "Progetto successivo",
    press: "Stampa",
    featuredBy: "Pubblicato su",
    work: "Progetti",
    languageSelector: "Selettore lingua",
    draftCopy: "Testo provvisorio — in attesa del copy definitivo",
  },

  hero: {
    meta: "Est. 2026 — Madrid",
    tagline: "Eventi — Esperienze di Marca — Foto & Video",
    titleA: "Creiamo",
    titleAccent: "esperienze",
    titleItalic: "che connettono",
    locations: "MILANO · MADRID · PROSSIMAMENTE ISOLE CANARIE",
    ctaAbout: `SCOPRI ${BRAND.shortName}`,
    supporting:
      "Studio creativo specializzato in eventi, esperienze di marca e produzione audiovisiva. Uniamo creatività, cultura e strategia per costruire esperienze di marca che si ricordano.",
    ctaDiscover: "Scopri di più",
  },

  clients: { label: "Hanno scelto noi" },

  about: {
    sectionLabel: "(Studio)",
    eyebrow: "Chi siamo",
    srOnly: `${BRAND.name} è uno studio creativo che connette i brand con le persone attraverso esperienze, contenuti e direzione visiva.`,
    title: "Uno studio creativo",
    titleItalic: "per brand contemporanei.",
    lede: `${BRAND.name} è uno studio creativo. Connettiamo i brand con le persone attraverso esperienze, contenuti e direzione visiva — pensati con intenzione, prodotti internamente, scalati con strategia.`,
    readMore: "Scopri di più",
    pillars: [
      { label: "Visione", body: "I brand diventano reali quando le persone li sentono — in una sala, su uno schermo, in un'immagine." },
      { label: "Filosofia", body: "Editoriale, misurata, contemporanea. Archi lunghi e cicli brevi come un'unica conversazione." },
      { label: "Identità creativa", body: "Eventi, contenuti e produzione visiva. Le discipline cambiano; lo sguardo resta." },
      { label: "Approccio al brand", body: "Prima la strategia, sempre l'immagine. Un unico corpo di lavoro, non consegne separate." },
    ],
    captions: ["(01) Ritratto di studio — Madrid, 2026", "(02) Natura morta d'archivio"],
  },

  services: {
    sectionLabel: "(Servizi)",
    eyebrow: "Cosa facciamo",
    title: "Tre discipline,",
    titleItalic: "un solo studio.",
    items: [
      {
        key: "events",
        index: "01",
        name: "Eventi",
        tagline: "Eventi di marca, cene e lanci pensati per essere vissuti dal vivo.",
        note: "Eventi di marca, cene e lanci pensati per essere vissuti dal vivo — e ricordati dopo grazie a una cura attenta del contenuto.",
        image: "/images/work/ipa-brand-lionna/event-02-dinner-table-editorial.png",
        list: ["Organizzazione eventi", "Esperienze di marca", "Attivazioni", "Brand", "Nightlife"],
      },
      {
        key: "brand-experiences",
        index: "02",
        name: "Esperienze di Marca",
        tagline: "Concept, attivazione e produzione di esperienze che connettono brand e persone.",
        note: "Attivazioni, lanci, pop-up ed esperienze progettate dal concept fino alla produzione finale.",
        image: "/images/work/xeri-gin-focaccia-beat/xeri-gin-04-bar-service-editorial.png",
        list: [
          "Attivazioni di marca",
          "Lanci di prodotto",
          "Pop-up",
          "Esperienze per stampa e influencer",
          "Direzione creativa e produzione",
        ],
      },
      {
        key: "photo-video",
        index: "03",
        name: "Foto & Video",
        tagline: "Contenuti visivi che catturano, ispirano e convertono.",
        note: "Fotografia, video e riprese con drone prodotti internamente. Suite di campagna, reel, brand film e documentario sportivo come un sistema visivo completo.",
        image: "/images/work/downhillitalia/downhillitalia-01-water-splash-bw.webp",
        list: ["Shooting", "Reel", "Campagne", "Riprese con drone", "Produzione visiva"],
      },
    ],
    viewAll: "Tutti i servizi",
    marquee: "Eventi · Esperienze di Marca · Foto & Video · ",
  },

  brandExperiences: {
    sectionLabel: "(Esperienze di Marca)",
    eyebrow: "Servizi / Esperienze di Marca",
    h1: "Esperienze di Marca",
    lead: "Creiamo momenti che fanno vivere, ricordare e condividere un brand.",
    sub: "Attivazioni, lanci, pop-up ed esperienze progettate dal concept fino alla produzione finale.",
    cta: "Raccontaci il tuo progetto",
    meaning: {
      title: "Un'idea di marca, trasformata in esperienza.",
      body: "Trasformiamo l'universo di un brand in qualcosa che le persone possono vivere. Progettiamo il concept, lo spazio, l'estetica, la produzione e ogni punto di contatto perché tutto racconti la stessa storia.",
    },
    create: {
      title: "Cosa possiamo creare",
      items: [
        "Attivazioni di marca",
        "Lanci di prodotto",
        "Pop-up",
        "Esperienze per stampa e influencer",
        "Presentazioni private",
        "Eventi di marca",
        "Esperienze per hospitality, moda, beauty e lifestyle",
      ],
    },
    process: {
      title: "Dal brief all'esperienza",
      steps: [
        { n: "01", label: "Brief", body: "Capiamo il brand, l'obiettivo, il pubblico, il budget e ciò che vogliamo far sentire." },
        { n: "02", label: "Concept", body: "Sviluppiamo l'idea creativa, il moodboard, la narrativa, lo spazio e le attivazioni." },
        { n: "03", label: "Produzione", body: "Coordiniamo venue, fornitori, allestimento, hospitality, tecnica e logistica." },
        { n: "04", label: "Esperienza", body: "Dirigiamo la giornata del progetto e curiamo ogni punto di contatto." },
        { n: "05", label: "Contenuto", body: "Quando serve, il progetto continua in fotografia, video e pezzi di contenuto." },
      ],
    },
    includes: {
      title: "Ogni esperienza si costruisce su misura.",
      items: [
        "Direzione creativa",
        "Concept e narrativa",
        "Venue e location",
        "Produzione e coordinamento",
        "Scenografia e atmosfera",
        "Catering e hospitality",
        "Musica e intrattenimento",
        "Personale e fornitori",
        "Fotografia e video",
        "Contenuto verticale",
        "Gifting",
        "Ospiti e guest journey",
      ],
      note: "Selezioniamo solo ciò di cui il progetto ha bisogno. Non lavoriamo con pacchetti chiusi.",
    },
    result: {
      title: "Un'esperienza coerente dall'inizio alla fine.",
      body: "Il cliente non riceve soltanto un evento. Riceve un concept, un'esecuzione e un'esperienza allineata al suo brand, con un unico interlocutore e una direzione creativa comune.",
      closing: "Tu porti il brand. Noi costruiamo il momento.",
    },
    close: {
      title: "Hai un'idea in mente?",
      body: "Raccontaci cosa vuoi lanciare, presentare o far vivere. Ti aiutiamo a trasformarlo in un'esperienza.",
      cta: "Parliamo del tuo progetto",
    },
    support: {
      eyebrow: "In corso",
      project: "Alena Angel Art",
      note: "Sviluppo e posizionamento di marca, relazioni pubbliche, rappresentanza e ricerca di nuovi spazi per eventi ed esposizioni.",
    },
  },

  work: {
    sectionLabel: "(Progetti)",
    eyebrow: "Progetti selezionati",
    title: "Collaborazioni",
    titleItalic: "recenti.",
    lede: "Tre discipline, un archivio. Scegli una categoria per entrare nei progetti.",
    categoriesHeading: "Scegli una categoria",
    categories: [
      { key: "events", index: "01", label: "Eventi", href: "/work/events", note: "Attivazioni, lanci e nightlife." },
      {
        key: "brand-experiences",
        index: "02",
        label: "Esperienze di Marca",
        href: BRAND_EXPERIENCES_HREF,
        note: "Attivazioni, lanci, pop-up e momenti di marca.",
      },
      { key: "photo-video", index: "03", label: "Foto & Video", href: "/work/photo-video", note: "Shooting, reel e campagne." },
    ],
    overlay: { title: "Progetti", subtitle: "Scegli da dove vuoi entrare.", close: "Chiudi" },
    footer: "Tutti i progetti su richiesta",
    footerCta: "Richiedi il portfolio completo →",
  },

  workCategories: {
    events: {
      title: "Eventi",
      eyebrow: "Progetti / Eventi",
      intro: "Attivazioni di marca, lanci, nightlife e momenti culturali — prodotti e diretti internamente.",
      cta: "Iniziamo un evento",
      empty: "Qui vivranno gli eventi selezionati. Copy e progetti in arrivo.",
    },
    "brand-experiences": {
      title: "Esperienze di Marca",
      eyebrow: "Progetti / Esperienze di Marca",
      intro: "Attivazioni, lanci, pop-up ed esperienze progettate dal concept fino alla produzione finale.",
      cta: "Raccontaci il tuo progetto",
      empty: "Qui vivranno le esperienze di marca selezionate. Copy e casi in arrivo.",
    },
    "photo-video": {
      title: "Foto & Video",
      eyebrow: "Progetti / Foto & Video",
      intro: "Suite di campagna, reel, storie editoriali e brand film, prodotti internamente.",
      cta: "Pianifica uno shooting",
      empty: "Qui vivranno gli shooting e i film selezionati. Copy e reel in arrivo.",
    },
  },

  blog: {
    sectionLabel: "(Blog)",
    eyebrow: "Dallo studio",
    title: "Note,",
    titleItalic: "ogni settimana.",
    lede: "Riflessioni su brand, contenuti, eventi e cultura visiva. Nuove uscite ogni settimana.",
    cta: "Leggi tutte le note",
    empty: "Note in arrivo — torna la settimana prossima.",
    backToBlog: "← Torna al blog",
  },

  contact: {
    sectionLabel: "(Contatti)",
    eyebrow: "Costruiamo qualcosa insieme",
    title: "Scrivi",
    titleItalic: "ci.",
    lede: "Raccontaci il tuo brand, il tuo momento o la tua idea. Rispondiamo entro 48 ore.",
    info: ["Madrid — Spagna", "Disponibili per nuovi progetti · 2026", "Su presentazione e invito"],
    form: {
      nameLabel: "Nome",
      namePlaceholder: "Il tuo nome completo",
      companyLabel: "Azienda",
      companyPlaceholder: "Il tuo brand o azienda",
      emailLabel: "Email",
      emailPlaceholder: "tua@email.com",
      phoneLabel: "Telefono",
      phonePlaceholder: "+34 600 000 000",
      serviceLabel: "Servizio",
      servicePlaceholder: "Scegli un servizio",
      budgetLabel: "Budget approssimativo",
      budgetPlaceholder: "Scegli una fascia",
      messageLabel: "Messaggio",
      messagePlaceholder: "Raccontaci il tuo progetto, i tempi e cosa significa successo per te.",
      consent: `Accetto di essere contattato da ${BRAND.name} in merito a questa richiesta.`,
      privacy: "Privacy policy",
      privacyHref: "/privacy",
      submit: "Invia richiesta",
      submitting: "Invio…",
      success: "Grazie. Ti scriveremo entro 48 ore.",
      errors: {
        required: "Compila i campi obbligatori.",
        email: "Questa email non sembra valida.",
        consent: "Accetta il consenso, per favore.",
        generic: "Qualcosa è andato storto. Riprova.",
      },
    },
    services: [
      { value: "events", label: "Eventi" },
      { value: "brand-experiences", label: "Esperienze di Marca" },
      { value: "photo-video", label: "Foto & Video" },
      { value: "other", label: "Altro" },
    ],
    budgets: [
      { value: "under-1k", label: "Meno di €1.000" },
      { value: "1k-3k", label: "€1.000 – €3.000" },
      { value: "3k-5k", label: "€3.000 – €5.000" },
      { value: "5k-plus", label: "€5.000+" },
      { value: "not-sure", label: "Non lo so ancora" },
    ],
    footer: {
      studio: { label: "Studio", value: "Calle del Pez — Madrid" },
      contact: { label: "Contatti" },
      follow: { label: "Seguici", links: ["Instagram", "LinkedIn", "Are.na"] },
      index: {
        label: "Indice",
        links: [
          { label: "Studio", href: "/#about" },
          { label: "Servizi", href: "/#services" },
          { label: "Progetti", href: "/work" },
          { label: "Blog", href: "/blog" },
        ],
      },
    },
    tagline: "Creiamo esperienze che connettono brand e persone.",
    crafted: "Fatto a Madrid",
  },

  newsletter: {
    sectionLabel: "(Newsletter)",
    eyebrow: "Dallo studio",
    headlineA: "Note,",
    headlineItalic: "ogni settimana",
    body: "Appunti dallo studio — nuovi progetti, dietro le quinte, qualche pensiero. Senza rumore.",
    placeholder: "tua@email.com",
    cta: "Iscrivimi",
    consent: `Accetto di ricevere email da ${BRAND.name}.`,
    privacy: "Privacy policy",
    privacyHref: "/privacy",
    success: "Ci sei. Benvenuta nello studio.",
    errors: {
      invalid: "Questa email non sembra valida.",
      consent: "Accetta il consenso, per favore.",
      generic: "Qualcosa è andato storto. Riprova.",
    },
  },
};

content.it = mergeLocale(content.en, IT_OVERRIDES);

/** Locale order used by the language selector. */
export const LOCALES = ["en", "es", "it"];

/** Two-letter labels shown in the header selector. */
export const LOCALE_LABELS = { en: "EN", es: "ES", it: "IT" };

/** BCP-47 codes for <html lang> — kept in sync by LangProvider. */
export const LOCALE_HTML_LANG = { en: "en", es: "es", it: "it" };

export default content;
