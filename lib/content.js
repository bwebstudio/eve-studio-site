const content = {
  en: {
    meta: {
      title: "EVE — Creative Studio",
      description:
        "EVE is a Madrid-based creative studio building brand experiences, content and events that connect brands with people.",
    },

    nav: {
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/#about" },
        { label: "Services", href: "/#services" },
        { label: "Work", href: "/#work", kind: "work-overlay" },
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
        { label: "Work", href: "/#work", kind: "work-overlay" },
        { label: "Blog", href: "/#blog" },
        { label: "Contact", href: "/#contact" },
      ],
      footer: ["Brand experiences", "Content & events", "Visual direction"],
    },

    hero: {
      scenes: [
        { word: "EVENTS", italic: false },
        { word: "CONTENT", italic: true },
        { word: "CONNECT", italic: false },
      ],
      meta: "Est. 2026 — Madrid",
      tagline: "Events — Social Media — Photo & Video",
      kicker: "EVE Studio",
      // Principal commercial line — the brief asks for this verbatim
      // (with the grammatically correct plural verb "connect").
      titleA: "We create",
      titleAccent: "experiences",
      titleItalic: "that connect",
      titleB: "brands & people.",
      supporting:
        "A Madrid-based creative studio specialised in events, social media and photo & video. We combine creativity, culture and strategy to build brand experiences people remember.",
      ctaDiscover: "Discover more",
      ctaWork: "Selected work",
      ctaContact: "Start a project",
      scroll: "(S) Scroll",
    },

    clients: {
      label: "Trusted by",
      list: [
        "CASA LUMEN",
        "ORNELA",
        "AMARANTA",
        "HOTEL VARELA",
        "VELVET ROOM",
        "ATELIER NORTE",
      ],
    },

    about: {
      sectionLabel: "(About)",
      sectionIndex: "Index / 02",
      eyebrow: "Who we are",
      srOnly:
        "Eve is a creative studio that connects brands with people through experiences, content and visual direction.",
      title: "A creative studio",
      titleItalic: "for contemporary brands.",
      lede:
        "Eve is a Madrid-based creative studio. We connect brands with people through experiences, content and visual direction — built with intention, produced in-house, scaled with strategy.",
      readMore: "Read more",
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
          key: "social-media",
          index: "02",
          name: "Social Media",
          tagline: "Strategy, social media and campaigns that drive results.",
          note: "We run social as a continuous creative practice — strategy, content and direction every month.",
          image: "/images/amaranta.png",
          list: [
            "Social management",
            "Strategy",
            "Content",
            "Digital branding",
          ],
        },
        {
          key: "photo-video",
          index: "03",
          name: "Photo & Video",
          tagline: "Visual content that captures, inspires and converts.",
          note: "Photography, video and drone filming produced in-house. Campaign suites, reels, brand films and sport documentary as a complete visual system.",
          image: "/images/work/backyard-franciacorta-edited/backyard-franciacorta-04-group-trail.png",
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
      marquee:"Events · Social Media · Photo & Video · ",
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
          key: "social-media",
          index: "02",
          label: "Social Media",
          href: "/work/social-media",
          note: "Strategy, content systems & monthly direction.",
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
          "Eve didn’t launch a product. They built Xerí a room, a rhythm and",
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
          quote: "Eve captured the mood of the night before we could even name it.",
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
          quote: "Eve shot the night exactly as it felt, not just how it looked.",
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
      "social-media": {
        title: "Social Media",
        eyebrow: "Work / Social Media",
        intro:
          "Strategy, content systems and monthly direction for brands that want presence.",
        cta: "Talk about social",
        empty:
          "Selected social retainers will live here. Copy and case examples to follow.",
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
      email: "hello@eve.studio",
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
        consent: "I agree to be contacted by Eve about this enquiry.",
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
        { value: "social-media", label: "Social Media" },
        { value: "photo-video", label: "Photo & Video" },
        { value: "brand-experience", label: "Brand Experience" },
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
            { label: "Work", href: "/#work" },
            { label: "Blog", href: "/blog" },
          ],
        },
      },
      copyright: "© Eve Studio — 2026",
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
      consent: "I agree to receive emails from Eve.",
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
      title: "EVE — Estudio Creativo",
      description:
        "EVE es un estudio creativo con base en Madrid que construye experiencias, contenido y eventos que conectan marcas con personas.",
    },

    nav: {
      links: [
        { label: "Inicio", href: "/" },
        { label: "Estudio", href: "/#about" },
        { label: "Servicios", href: "/#services" },
        { label: "Trabajo", href: "/#work", kind: "work-overlay" },
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
        { label: "Trabajo", href: "/#work", kind: "work-overlay" },
        { label: "Blog", href: "/#blog" },
        { label: "Contacto", href: "/#contact" },
      ],
      footer: ["Experiencias de marca", "Contenido y eventos", "Dirección visual"],
    },

    hero: {
      scenes: [
        { word: "EVENTOS", italic: false },
        { word: "CONTENIDO", italic: true },
        { word: "CONECTAR", italic: false },
      ],
      meta: "Est. 2026 — Madrid",
      tagline: "Eventos — Redes Sociales — Foto y Vídeo",
      kicker: "EVE Studio",
      titleA: "Creamos",
      titleAccent: "experiencias",
      titleItalic: "que conectan",
      titleB: "marcas y personas.",
      supporting:
        "Estudio creativo en Madrid especializado en eventos, redes sociales y producción audiovisual. Combinamos creatividad, cultura y estrategia para construir experiencias de marca que se recuerdan.",
      ctaDiscover: "Descubre más",
      ctaWork: "Proyectos",
      ctaContact: "Empezar un proyecto",
      scroll: "(S) Scroll",
    },

    clients: {
      label: "Han confiado en nosotros",
      list: [
        "CASA LUMEN",
        "ORNELA",
        "AMARANTA",
        "HOTEL VARELA",
        "VELVET ROOM",
        "ATELIER NORTE",
      ],
    },

    about: {
      sectionLabel: "(Estudio)",
      sectionIndex: "Index / 02",
      eyebrow: "Quiénes somos",
      srOnly:
        "Eve es un estudio creativo que conecta marcas con personas a través de experiencias, contenido y dirección visual.",
      title: "Un estudio creativo",
      titleItalic: "para marcas contemporáneas.",
      lede:
        "Eve es un estudio creativo con base en Madrid. Conectamos marcas con personas a través de experiencias, contenido y dirección visual — pensado con intención, producido dentro del estudio, escalado con estrategia.",
      readMore: "Leer más",
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
          key: "social-media",
          index: "02",
          name: "Redes Sociales",
          tagline: "Estrategia, redes y campañas que generan resultados.",
          note: "Gestionamos redes como una práctica creativa continua — estrategia, contenido y dirección cada mes.",
          image: "/images/amaranta.png",
          list: [
            "Gestión de redes",
            "Estrategia",
            "Contenido",
            "Branding digital",
          ],
        },
        {
          key: "photo-video",
          index: "03",
          name: "Foto y Vídeo",
          tagline: "Contenido visual que captura, inspira y convierte.",
          note: "Fotografía, vídeo y drone filming producidos dentro del estudio. Suites de campaña, reels, películas de marca y documental deportivo como un sistema visual completo.",
          image: "/images/work/backyard-franciacorta-edited/backyard-franciacorta-04-group-trail.png",
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
      marquee:"Eventos · Redes Sociales · Foto y Vídeo · ",
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
          key: "social-media",
          index: "02",
          label: "Redes Sociales",
          href: "/work/social-media",
          note: "Estrategia, sistemas y dirección mensual.",
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
          "Eve no lanzó un producto. Le construyó a Xerí una sala, un ritmo y",
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
            "Eve capturó la atmósfera de la noche antes de que pudiéramos nombrarla.",
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
          quote: "Eve fotografió la noche tal como se sentía, no solo como se veía.",
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
      "social-media": {
        title: "Redes Sociales",
        eyebrow: "Trabajo / Redes Sociales",
        intro:
          "Estrategia, sistemas de contenido y dirección mensual para marcas que quieren presencia.",
        cta: "Hablar de redes",
        empty:
          "Aquí vivirán los retainers seleccionados. Copy y casos próximamente.",
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
      email: "hello@eve.studio",
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
        consent: "Acepto ser contactado por Eve sobre esta consulta.",
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
        { value: "social-media", label: "Redes Sociales" },
        { value: "photo-video", label: "Foto y Vídeo" },
        { value: "brand-experience", label: "Experiencia de marca" },
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
            { label: "Trabajo", href: "/#work" },
            { label: "Blog", href: "/blog" },
          ],
        },
      },
      copyright: "© Eve Studio — 2026",
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
      consent: "Acepto recibir emails de Eve.",
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

export default content;
