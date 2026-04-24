const content = {
  en: {
    meta: {
      title: "EVE — Creative Studio",
      description:
        "EVE is a Madrid-based creative studio shaping brand identity, visual content and strategic connections for contemporary brands.",
    },

    nav: {
      links: [
        { label: "Index", href: "/" },
        { label: "Studio", href: "/#studio" },
        { label: "Work", href: "/#work" },
        { label: "Services", href: "/#services" },
        { label: "Contact", href: "/#contact" },
      ],
      cta: "Let\u2019s talk",
      menu: "Menu",
      close: "Close",
    },

    mobileMenu: {
      links: [
        { label: "Home", href: "/" },
        { label: "Studio", href: "/#studio" },
        { label: "Work", href: "/#work" },
        { label: "Services", href: "/#services" },
        { label: "Contact", href: "/#contact" },
      ],
      footer: [
        "Creative direction",
        "Visual content",
        "Strategic connections",
      ],
    },

    hero: {
      scenes: [
        { word: "IDENTITY", italic: false },
        { word: "CONTENT", italic: true },
        { word: "CONNECT", italic: false },
      ],
      meta: "Est. 2026 — Madrid",
      tagline: "Brand Direction — Visual Content — Strategy",
      kicker: "EVE",
      title: "The Creative Studio",
      supporting:
        "Brand direction, visual content and strategic connections.",
      ctaWork: "Selected work",
      ctaContact: "Start a project",
      scroll: "(S) Scroll",
    },

    studio: {
      sectionLabel: "(Studio)",
      sectionIndex: "Index / 02",
      srOnly:
        "Eve is a creative studio. We direct brands — their image, their voice, their world.",
      lines: [
        { text: "EVE", size: "huge", italic: false },
        { text: "is a creative studio.", size: "small", italic: true },
        { text: "We direct brands —", size: "medium", italic: false },
        { text: "their image,", size: "large", italic: true },
        { text: "their voice,", size: "large", italic: false },
        { text: "their world.", size: "large", italic: true },
      ],
      aboutLabel: "(About)",
      aboutBody:
        "Eve is a Madrid-based creative studio working across brand direction, visual production and communication. We build brand systems that are considered, coherent and quietly distinctive — from strategy through to the final image.",
      captions: [
        "(01) Studio portrait — Madrid, 2026",
        "(02) Archive still life",
      ],
    },

    work: {
      sectionLabel: "(Selected work)",
      sectionIndex: "Index / 03",
      srOnly: "A quiet archive of recent collaborations.",
      lines: [
        { text: "RECENT", size: "huge", italic: false },
        { text: "collaborations.", size: "small", italic: true },
        { text: "A quiet", size: "large", italic: false },
        { text: "archive.", size: "large", italic: true },
      ],
      projects: [
        { index: "01", title: "Casa Lumen", slug: "casa-lumen", discipline: "Brand Direction · Visual Content · Launch", year: "2026" },
        { index: "02", title: "Ornela Perfumes", slug: "ornela-perfumes", discipline: "Campaign · Photography · Film · PR", year: "2025" },
        { index: "03", title: "Amaranta Studio", slug: "amaranta-studio", discipline: "Brand Identity · Campaign · Fashion Film", year: "2024" },
        { index: "04", title: "Hotel Varela", slug: "hotel-varela", discipline: "Brand World · Editorial Content", year: "2022" },
        { index: "05", title: "Velvet Room", slug: "velvet-room", discipline: "Brand Launch · Event Concept · Content", year: "2019" },
        { index: "06", title: "Atelier Norte", slug: "atelier-norte", discipline: "Editorial · Photography · Fashion Film", year: "2017" },
      ],
      footer: "All projects on request",
      footerCta: "Request full portfolio →",
    },

    services: {
      sectionLabel: "(Services)",
      sectionIndex: "Index / 04",
      headlineA: "Three disciplines,",
      headlineB: "one",
      headlineItalic: "point of view",
      items: [
        {
          index: "(01)",
          nameStart: "Brand",
          nameItalic: "Direction",
          note: "We define how a brand looks, speaks and positions itself. From naming to visual identity, we build the foundation that everything else stands on.",
          list: [
            "Brand strategy & positioning",
            "Visual identity & art direction",
            "Brand language & tone of voice",
            "Image consulting & direction",
          ],
        },
        {
          index: "(02)",
          nameStart: "Visual",
          nameItalic: "Content",
          note: "Photography, film and content — produced in-house. Every shoot is an extension of the brand direction, not an afterthought.",
          list: [
            "Photography (campaign, editorial, product)",
            "Film & motion content",
            "Social media content systems",
            "Art direction for shoots",
          ],
        },
        {
          index: "(03)",
          nameStart: "Communication",
          nameItalic: "& Connections",
          note: "We connect brands with the right people, rooms and conversations. PR, partnerships and events as part of a single communication strategy.",
          list: [
            "Press & media relations",
            "Brand partnerships & collaborations",
            "Event concept & production",
            "Network & community building",
          ],
        },
      ],
      marquee: "Identity · Connections · Universes ·\u00a0",
    },

    newsletter: {
      sectionLabel: "(Newsletter)",
      sectionIndex: "Index / 05",
      eyebrow: "From the studio",
      headlineA: "Notes,",
      headlineItalic: "occasionally",
      body: "Quiet dispatches from the studio — new work, behind-the-scenes, and the occasional thought. No noise.",
      placeholder: "your@email.com",
      cta: "Subscribe",
      consent: "I agree to receive emails from Eve.",
      privacy: "Privacy policy",
      privacyHref: "/privacy",
      success: "You're in. Welcome to the room.",
      errors: {
        invalid: "That email doesn't look right.",
        consent: "Please accept the consent checkbox.",
        generic: "Something went wrong. Please try again.",
      },
    },

    contact: {
      sectionLabel: "(Contact)",
      sectionIndex: "Index / 06",
      intro: "Let\u2019s build something together",
      headlineA: "Say",
      headlineItalic: "hello",
      email: "hello@eve.studio",
      info: [
        "Madrid — Spain",
        "Available for new projects · 2026",
        "By introduction & invitation",
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
            { label: "Studio", href: "/#studio" },
            { label: "Work", href: "/#work" },
            { label: "Services", href: "/#services" },
          ],
        },
      },
      copyright: "© Eve Studio — 2026",
      tagline:
        "I create identity. I connect. I build your brand universe.",
      crafted: "Crafted in Madrid",
    },
  },

  es: {
    meta: {
      title: "EVE — Estudio Creativo",
      description:
        "EVE es un estudio creativo en Madrid que construye identidad de marca, contenido visual y conexiones estratégicas para marcas contemporáneas.",
    },

    nav: {
      links: [
        { label: "Inicio", href: "/" },
        { label: "Estudio", href: "/#studio" },
        { label: "Trabajo", href: "/#work" },
        { label: "Servicios", href: "/#services" },
        { label: "Contacto", href: "/#contact" },
      ],
      cta: "Hablemos",
      menu: "Menú",
      close: "Cerrar",
    },

    mobileMenu: {
      links: [
        { label: "Inicio", href: "/" },
        { label: "Estudio", href: "/#studio" },
        { label: "Trabajo", href: "/#work" },
        { label: "Servicios", href: "/#services" },
        { label: "Contacto", href: "/#contact" },
      ],
      footer: [
        "Dirección creativa",
        "Contenido visual",
        "Conexiones estratégicas",
      ],
    },

    hero: {
      scenes: [
        { word: "IDENTIDAD", italic: false },
        { word: "CONTENIDO", italic: true },
        { word: "CONECTAR", italic: false },
      ],
      meta: "Est. 2026 — Madrid",
      tagline: "Dirección de Marca — Contenido Visual — Estrategia",
      kicker: "EVE",
      title: "El estudio creativo",
      supporting:
        "Dirección de marca, contenido visual y conexiones estratégicas.",
      ctaWork: "Proyectos",
      ctaContact: "Empezar un proyecto",
      scroll: "(S) Scroll",
    },

    studio: {
      sectionLabel: "(Estudio)",
      sectionIndex: "Index / 02",
      srOnly:
        "Eve es un estudio creativo. Dirigimos marcas — su imagen, su voz, su universo.",
      lines: [
        { text: "EVE", size: "huge", italic: false },
        { text: "es un estudio creativo.", size: "small", italic: true },
        { text: "Dirigimos marcas —", size: "medium", italic: false },
        { text: "su imagen,", size: "large", italic: true },
        { text: "su voz,", size: "large", italic: false },
        { text: "su universo.", size: "large", italic: true },
      ],
      aboutLabel: "(Sobre nosotros)",
      aboutBody:
        "Eve es un estudio creativo con base en Madrid que trabaja entre la dirección de marca, la producción visual y la comunicación. Construimos sistemas de marca coherentes, considerados y distintivos — desde la estrategia hasta la imagen final.",
      captions: [
        "(01) Retrato de estudio — Madrid, 2026",
        "(02) Bodegón de archivo",
      ],
    },

    work: {
      sectionLabel: "(Trabajo seleccionado)",
      sectionIndex: "Index / 03",
      srOnly: "Un archivo tranquilo de colaboraciones recientes.",
      lines: [
        { text: "RECIENTES", size: "huge", italic: false },
        { text: "colaboraciones.", size: "small", italic: true },
        { text: "Un archivo", size: "large", italic: false },
        { text: "tranquilo.", size: "large", italic: true },
      ],
      projects: [
        { index: "01", title: "Casa Lumen", slug: "casa-lumen", discipline: "Dirección de marca · Contenido visual · Lanzamiento", year: "2026" },
        { index: "02", title: "Ornela Perfumes", slug: "ornela-perfumes", discipline: "Campaña · Fotografía · Vídeo · PR", year: "2025" },
        { index: "03", title: "Amaranta Studio", slug: "amaranta-studio", discipline: "Identidad de marca · Campaña · Fashion Film", year: "2024" },
        { index: "04", title: "Hotel Varela", slug: "hotel-varela", discipline: "Universo de marca · Contenido editorial", year: "2022" },
        { index: "05", title: "Velvet Room", slug: "velvet-room", discipline: "Lanzamiento de marca · Concepto de evento · Contenido", year: "2019" },
        { index: "06", title: "Atelier Norte", slug: "atelier-norte", discipline: "Editorial · Fotografía · Fashion Film", year: "2017" },
      ],
      footer: "Todos los proyectos bajo consulta",
      footerCta: "Solicitar portfolio completo →",
    },

    services: {
      sectionLabel: "(Servicios)",
      sectionIndex: "Index / 04",
      headlineA: "Tres disciplinas,",
      headlineB: "un",
      headlineItalic: "punto de vista",
      items: [
        {
          index: "(01)",
          nameStart: "Dirección de",
          nameItalic: "Marca",
          note: "Definimos cómo una marca se ve, habla y se posiciona. Del naming a la identidad visual, construimos la base sobre la que se sostiene todo lo demás.",
          list: [
            "Estrategia y posicionamiento de marca",
            "Identidad visual y dirección de arte",
            "Lenguaje de marca y tono de voz",
            "Consultoría y dirección de imagen",
          ],
        },
        {
          index: "(02)",
          nameStart: "Contenido",
          nameItalic: "Visual",
          note: "Fotografía, vídeo y contenido — producidos dentro del estudio. Cada sesión es una extensión de la dirección de marca, no un añadido.",
          list: [
            "Fotografía (campaña, editorial, producto)",
            "Vídeo y contenido en movimiento",
            "Sistemas de contenido para redes sociales",
            "Dirección de arte para sesiones",
          ],
        },
        {
          index: "(03)",
          nameStart: "Comunicación",
          nameItalic: "y Conexiones",
          note: "Conectamos marcas con las personas, los espacios y las conversaciones adecuadas. PR, partnerships y eventos como parte de una sola estrategia de comunicación.",
          list: [
            "Prensa y relaciones con medios",
            "Partnerships y colaboraciones de marca",
            "Concepto y producción de eventos",
            "Networking y construcción de comunidad",
          ],
        },
      ],
      marquee: "Identidad · Conexiones · Universos ·\u00a0",
    },

    newsletter: {
      sectionLabel: "(Boletín)",
      sectionIndex: "Index / 05",
      eyebrow: "Desde el estudio",
      headlineA: "Notas,",
      headlineItalic: "ocasionalmente",
      body: "Apuntes discretos desde el estudio — nuevos proyectos, detrás de escena, y algún pensamiento. Sin ruido.",
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

    contact: {
      sectionLabel: "(Contacto)",
      sectionIndex: "Index / 06",
      intro: "Construyamos algo juntos",
      headlineA: "Escríbe",
      headlineItalic: "nos",
      email: "hello@eve.studio",
      info: [
        "Madrid — España",
        "Disponible para nuevos proyectos · 2026",
        "Por introducción e invitación",
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
            { label: "Estudio", href: "/#studio" },
            { label: "Trabajo", href: "/#work" },
            { label: "Servicios", href: "/#services" },
          ],
        },
      },
      copyright: "© Eve Studio — 2026",
      tagline:
        "Creo identidad. Conecto. Construyo tu universo de marca.",
      crafted: "Hecho en Madrid",
    },
  },
};

export default content;
