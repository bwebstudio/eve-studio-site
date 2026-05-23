export const PROJECT_ORDER = [
  "ipa-brand-lionna",
  "backyard-franciacorta",
  "casa-lumen",
  "ornela-perfumes",
  "amaranta-studio",
  "hotel-varela",
  "velvet-room",
  "atelier-norte",
];

export const PROJECT_META = [
  { title: "IPA Brand at Li-Onna", slug: "ipa-brand-lionna", category: "Events", cover: "/images/work/ipa-brand-lionna/event-02-dinner-table-editorial.png" },
  { title: "Backyard dello Specchio", slug: "backyard-franciacorta", category: "Sport", cover: "/images/work/backyard-franciacorta-edited/backyard-franciacorta-04-group-trail.png" },
  { title: "Casa Lumen", slug: "casa-lumen", category: "Hospitality", cover: "/images/casa-lumen.png" },
  { title: "Ornela Perfumes", slug: "ornela-perfumes", category: "Beauty", cover: "/images/ornela.png" },
  { title: "Amaranta Studio", slug: "amaranta-studio", category: "Fashion", cover: "/images/amaranta.png" },
  { title: "Hotel Varela", slug: "hotel-varela", category: "Hospitality", cover: "/images/hotel_lisboa.png" },
  { title: "Velvet Room", slug: "velvet-room", category: "Nightlife", cover: "/images/velvet_room.png" },
  { title: "Atelier Norte", slug: "atelier-norte", category: "Editorial", cover: "/images/atelier-norte.png" },
  { title: "Studio Workspace", slug: "studio-workspace", category: "Studio", cover: "/images/studio_portrait.png" },
];

const PROJECT_HERO = {
  "casa-lumen": "/images/casa-lumen.png",
  "ornela-perfumes": "/images/ornela.png",
  "amaranta-studio": "/images/amaranta.png",
  "hotel-varela": "/images/hotel_lisboa.png",
  "velvet-room": "/images/velvet_room.png",
  "atelier-norte": "/images/atelier-norte.png",
};

const PROJECT_GALLERY_SOURCE = {
  "casa-lumen": { folder: "casa-lumen", prefix: "casa-lumen" },
  "ornela-perfumes": { folder: "ornela", prefix: "ornela" },
  "amaranta-studio": { folder: "amaranta", prefix: "amaranta" },
  "hotel-varela": { folder: "hotel-lisboa", prefix: "hotel-varela" },
  "velvet-room": { folder: "velvet-room", prefix: "velvet" },
  "atelier-norte": { folder: "studio-workspace", prefix: "studio" },
};

const buildGallery = ({ folder, prefix }) =>
  [1, 2, 3].map((n) => `/projects/${folder}/${prefix}${n}.png`);

export const PROJECT_IMAGES = Object.fromEntries(
  Object.entries(PROJECT_GALLERY_SOURCE).map(([slug, src]) => [
    slug,
    { hero: PROJECT_HERO[slug], gallery: buildGallery(src) },
  ])
);

// IPA Brand at Li-Onna — manual override because the asset filenames
// are editorial slugs, not the {prefix}{1,2,3}.png pattern the gallery
// builder expects. Hero is the dinner table image; the 3 gallery items
// drive the three body sections in CaseStudy (atmosphere, brand table,
// close detail), in that order.
const IPA_DIR = "/images/work/ipa-brand-lionna";
PROJECT_IMAGES["ipa-brand-lionna"] = {
  hero: `${IPA_DIR}/event-02-dinner-table-editorial.png`,
  gallery: [
    `${IPA_DIR}/event-01-room-atmosphere-editorial.png`,
    `${IPA_DIR}/event-03-brand-table-editorial.png`,
    `${IPA_DIR}/event-04-brand-close-editorial.png`,
  ],
};

// Backyard dello Specchio — sport documentary in Franciacorta.
// Hero is the group on the trail (strongest editorial frame).
// Gallery feeds the three case-study sections (documentary approach,
// motion & rhythm, full event coverage). extraGallery extends the
// case study with an editorial sequence after the body — asymmetric
// pair, two wide motion frames, and the kids high-five as the
// emotional closing image. Each item declares its own span + aspect
// so the gallery can breathe in its natural ratios on desktop.
// Final edited assets live in /public/images/work/backyard-franciacorta-edited/
// Both .jpg and .webp variants exist; we serve .webp (smaller, equal
// quality, supported by every modern browser) and keep .jpg available
// on disk as a fallback for any tooling that needs it.
const BACKYARD_DIR = "/images/work/backyard-franciacorta-edited";
PROJECT_IMAGES["backyard-franciacorta"] = {
  hero: `${BACKYARD_DIR}/backyard-franciacorta-04-group-trail.png`,
  gallery: [
    `${BACKYARD_DIR}/backyard-franciacorta-01-shoes-detail.png`,
    `${BACKYARD_DIR}/backyard-franciacorta-07-motion-runner-bw.png`,
    `${BACKYARD_DIR}/backyard-franciacorta-06-start-line.png`,
  ],
  extraGallery: [
    {
      src: `${BACKYARD_DIR}/backyard-franciacorta-02-runner-portrait.webp`,
      alt: "Backyard runner portrait — Franciacorta",
      aspect: "aspect-[3/4]",
      span: "col-span-12 md:col-span-6",
    },
    {
      src: `${BACKYARD_DIR}/backyard-franciacorta-03-black-white-runner.webp`,
      alt: "Backyard runner — black & white frame",
      aspect: "aspect-[3/4]",
      span: "col-span-12 md:col-span-6",
    },
    {
      src: `${BACKYARD_DIR}/backyard-franciacorta-05-single-runner-forest.webp`,
      alt: "Single runner inside the forest stretch",
      aspect: "aspect-[16/10]",
      span: "col-span-12",
    },
    {
      src: `${BACKYARD_DIR}/backyard-franciacorta-08-motion-trail-group.png`,
      alt: "Trail group in motion",
      aspect: "aspect-[16/9]",
      span: "col-span-12",
    },
    {
      src: `${BACKYARD_DIR}/backyard-franciacorta-09-kids-high-five.webp`,
      alt: "Kids cheering and high-fiving runners on the route",
      aspect: "aspect-[16/10]",
      span: "col-span-12",
    },
  ],
};

// Map each project to one of the three new Work categories
// (events / social-media / photo-video). Drives the /work/[category]
// pages until the real Eve archive is structured. Projects can belong
// to multiple categories.
export const PROJECTS_BY_CATEGORY = {
  events: [
    {
      slug: "ipa-brand-lionna",
      title: "IPA Brand at Li-Onna",
      discipline: "Fashion event · Content capture · Brand experience",
      year: "2026",
      cover: "/images/work/ipa-brand-lionna/event-02-dinner-table-editorial.png",
    },
    {
      slug: "velvet-room",
      title: "Velvet Room",
      discipline: "Brand Launch · Event Concept · Content",
      year: "2019",
      cover: "/images/velvet_room.png",
    },
    {
      slug: "casa-lumen",
      title: "Casa Lumen — Opening night",
      discipline: "Launch · Event · PR",
      year: "2026",
      cover: "/images/casa-lumen.png",
    },
  ],
  "social-media": [
    {
      slug: "amaranta-studio",
      title: "Amaranta Studio",
      discipline: "Content System · Monthly Direction",
      year: "2024",
      cover: "/images/amaranta.png",
    },
    {
      slug: "ornela-perfumes",
      title: "Ornela Perfumes",
      discipline: "Social Strategy · Editorial Content",
      year: "2025",
      cover: "/images/ornela.png",
    },
  ],
  "photo-video": [
    {
      slug: "backyard-franciacorta",
      title: "Backyard dello Specchio",
      discipline: "Photography · Video · Drone Filming",
      year: "2026",
      cover: "/images/work/backyard-franciacorta-edited/backyard-franciacorta-04-group-trail.png",
    },
    {
      slug: "ornela-perfumes",
      title: "Ornela Perfumes",
      discipline: "Campaign · Photography · Film",
      year: "2025",
      cover: "/images/ornela.png",
    },
    {
      slug: "amaranta-studio",
      title: "Amaranta Studio",
      discipline: "Campaign · Fashion Film",
      year: "2024",
      cover: "/images/amaranta.png",
    },
    {
      slug: "atelier-norte",
      title: "Atelier Norte",
      discipline: "Editorial · Photography",
      year: "2017",
      cover: "/images/atelier-norte.png",
    },
    {
      slug: "hotel-varela",
      title: "Hotel Varela",
      discipline: "Editorial · Brand Film",
      year: "2022",
      cover: "/images/hotel_lisboa.png",
    },
  ],
};

const projects = {
  en: {
    "ipa-brand-lionna": {
      title: "IPA Brand at Li-Onna",
      subtitle:
        "A fashion brand event captured through atmosphere, table styling and editorial details inside Li-Onna’s red salon in Madrid.",
      year: "2026",
      client: "IPA Brand",
      location: "Li-Onna, Madrid",
      discipline: "Fashion event · Content capture · Brand experience",
      services: [
        "Event content capture",
        "Brand experience photography",
        "Editorial storytelling",
      ],
      intro:
        "An intimate fashion brand event captured inside Li-Onna’s red salon in Madrid — focusing on atmosphere, detail and the visual language of the night.",
      sections: [
        {
          label: "Atmosphere",
          body: "Red lacquered walls, velvet seating and a mirrored ceiling set the tone for the night. The room itself became the first frame — its colour and reflections carrying the mood before any object entered it.",
        },
        {
          label: "The brand table",
          body: "IPA’s pieces were arranged as part of the dinner: branded bags, printed material and roses staged across the linen — a quiet, considered presence among the place settings.",
        },
        {
          label: "Details",
          body: "Closer in, the visual language reveals itself in the smaller moments — graphic prints against red, the weight of a bag, petals on a tablecloth.",
        },
      ],
    },

    "backyard-franciacorta": {
      title: "Backyard dello Specchio",
      subtitle:
        "An outdoor sport documentary project capturing the rhythm, endurance and community of a Backyard race in Franciacorta Bresciana.",
      year: "2026",
      client: "Backyard dello Specchio",
      location: "Franciacorta Bresciana, Italy",
      discipline: "Photography · Video · Drone Filming",
      services: [
        "Photography",
        "Video",
        "Drone filming",
        "Event coverage",
        "Editorial storytelling",
      ],
      intro:
        "A sport documentary project shot in Franciacorta Bresciana, Italy, following the atmosphere, endurance and human rhythm of a Backyard race. The visual story moves between intimate preparation details, motion-led running sequences and the connection between athletes and spectators.",
      sections: [
        {
          label: "Documentary approach",
          body: "We approached the event as a human story rather than only a sport competition. Details, gestures, faces and movement were captured to communicate the atmosphere of endurance and repetition that defines the Backyard format.",
        },
        {
          label: "Motion & rhythm",
          body: "The visual language uses motion blur, trail sequences and close-up preparation shots to express speed, fatigue, focus and momentum. The result is a raw but polished sport editorial.",
        },
        {
          label: "Full event coverage",
          body: "The project combined photography, video and drone filming into a complete editorial record — from the physical intensity of the race to the quieter moments that define its community.",
        },
      ],
      press: {
        label: "Sport Mediaset",
        url: "https://www.sportmediaset.mediaset.it/running/un-altro-giro-di-giostra-backyard-dello-specchio-fino-all-ultimo-runner_110656477-202602k.shtml",
      },
    },

    "casa-lumen": {
      title: "Casa Lumen",
      subtitle: "A boutique hotel brand born from light.",
      year: "2026",
      client: "Casa Lumen Hospitality",
      location: "Madrid",
      discipline: "Brand Direction · Visual Content · Launch",
      services: [
        "Brand strategy & positioning",
        "Visual identity",
        "Photography direction",
        "Film & motion",
        "Launch event concept",
        "Press & PR",
      ],
      intro:
        "Casa Lumen is a 24-room boutique hotel in the heart of Malasaña, Madrid. We were commissioned to build the brand from the ground up — from naming and visual identity through to the launch campaign and opening night event. The brief was to create a hotel brand that felt both rooted in the neighbourhood and quietly international.",
      sections: [
        {
          label: "Brand Direction",
          body: "We developed a visual identity system built around light and materiality. The wordmark, set in a custom serif, references the architectural language of the building — arched windows, limestone textures, the way afternoon light falls across interior courtyards. The colour system is restrained: warm whites, soft clay, ink. Every touchpoint — from key cards to room directories — was designed as a single, coherent object.",
        },
        {
          label: "Visual Language",
          body: "The photographic direction avoids the clichés of hospitality marketing. No elevated angles, no staged breakfasts. Instead, the campaign captures the hotel as if observed by a guest — fragments of light, textures, quiet moments. The film piece follows a single day from dawn to evening, shot entirely with natural light.",
        },
        {
          label: "Content & Production",
          body: "All photography and film were produced in-house over a five-day shoot. The output system includes a core campaign suite, an editorial series for press, a social content library, and a short film for digital and event use.",
        },
        {
          label: "Launch",
          body: "The opening was conceived as an intimate evening for press, partners and neighbourhood figures — not a standard hotel launch. We handled all PR, press kits and media relations, placing the project in Wallpaper*, AD España and several local publications within the first month.",
        },
      ],
    },

    "ornela-perfumes": {
      title: "Ornela Perfumes",
      subtitle: "Scent as narrative. A campaign for the senses.",
      year: "2025",
      client: "Ornela",
      location: "Madrid · Paris",
      discipline: "Campaign · Photography · Film · PR",
      services: [
        "Campaign concept",
        "Art direction",
        "Photography",
        "Short film",
        "Launch event",
        "Press relations",
      ],
      intro:
        "Ornela is a Madrid-born niche perfume house launching its first three fragrances. We developed the campaign concept, directed all visual content and orchestrated the launch across Madrid and Paris. The challenge: introduce a new brand into one of the most saturated luxury categories — without a celebrity, without volume, without noise.",
      sections: [
        {
          label: "Campaign Concept",
          body: "The campaign is built around the idea of scent as place. Each fragrance corresponds to a specific environment — a courtyard at dusk, a linen market in the Marais, a greenhouse after rain. The visual language translates olfactory into spatial, using photography and film to evoke atmosphere rather than product.",
        },
        {
          label: "Visual Direction",
          body: "The photographic series uses controlled natural light and a muted palette to create stillness. Product is always present but never isolated — it exists within composed environments. The three short films follow the same logic: no voiceover, no text, only place and movement.",
        },
        {
          label: "Production",
          body: "The shoot spanned four days across two cities. All creative direction, photography and film were produced by the studio. The final output includes a hero campaign suite, three fragrance-specific editorial sets, social content assets, and three 45-second films.",
        },
        {
          label: "Launch & PR",
          body: "The Madrid launch was held at a private residence in Chamberí, curated as an olfactory experience rather than a press event. Paris followed two weeks later with a smaller activation at a concept store in Le Marais. Coverage included Vogue España, Numero, and niche fragrance press internationally.",
        },
      ],
    },

    "amaranta-studio": {
      title: "Amaranta Studio",
      subtitle: "Building a fashion label from first principles.",
      year: "2024",
      client: "Amaranta",
      location: "Madrid",
      discipline: "Brand Identity · Campaign · Fashion Film",
      services: [
        "Brand strategy",
        "Visual identity",
        "Art direction",
        "Campaign photography",
        "Fashion film",
        "Social content system",
      ],
      intro:
        "Amaranta is an independent fashion label based in Madrid, producing considered womenswear in small quantities. We built the brand identity and directed the first two seasonal campaigns — positioning the label as a quiet alternative to fast fashion, rooted in craft and intentionality.",
      sections: [
        {
          label: "Brand Identity",
          body: "The identity system is intentionally understated. A clean logotype in a condensed grotesque, a strict monochrome palette, and a typographic system designed for longevity. The brand manual is fewer than 20 pages — every decision is essential, nothing decorative.",
        },
        {
          label: "Visual Direction",
          body: "The campaign photography breaks from fashion convention by placing garments in architectural contexts — a brutalist stairwell, a marble-floored palazzo, a rooftop in late afternoon light. Clothes are worn, not displayed. The mood is observational rather than aspirational.",
        },
        {
          label: "Fashion Film",
          body: "A three-minute film shot on 16mm follows a single model through a sequence of interiors and exteriors in central Madrid. No music — only ambient sound. The film was premiered at a private screening and released online as the centrepiece of the SS24 campaign.",
        },
        {
          label: "Content System",
          body: "We designed a repeatable social content framework that allows the label to produce monthly editorial content without a full campaign shoot each time. The system includes art direction templates, styling guidelines and post-production standards.",
        },
      ],
    },

    "hotel-varela": {
      title: "Hotel Varela",
      subtitle: "A hospitality brand between tradition and the contemporary.",
      year: "2022",
      client: "Grupo Varela",
      location: "Lisbon",
      discipline: "Brand World · Editorial Content · Direction",
      services: [
        "Brand positioning",
        "Art direction",
        "Photography",
        "Editorial content",
        "Tone of voice",
        "Digital content direction",
      ],
      intro:
        "Hotel Varela is a family-owned boutique hotel in the Príncipe Real neighbourhood of Lisbon. The property had existed for decades but lacked a defined brand language. We were brought in to develop a contemporary brand world that would honour the hotel's history while repositioning it for an international audience.",
      sections: [
        {
          label: "Brand Direction",
          body: "Rather than a full rebrand, we worked within the existing identity to build a coherent visual and verbal system around it. The typographic palette was refined, a photography style established, and a tone of voice developed that balances warmth with editorial restraint.",
        },
        {
          label: "Visual Concept",
          body: "The photography direction draws on the light and colour of Lisbon without falling into travel cliché. Portraits of staff sit alongside architectural details and textural close-ups. The series was shot over three days in winter — deliberately avoiding the sun-drenched postcard aesthetic.",
        },
        {
          label: "Content Production",
          body: "Deliverables included a full editorial photography suite, a digital content library for web and social, a brand guidelines document, and a series of templated layouts for seasonal communication.",
        },
        {
          label: "Positioning",
          body: "The repositioning focused on the hotel's character rather than its amenities. The line 'A place that remembers' became the anchoring concept — used across communications without ever becoming a tagline. The hotel was subsequently featured in Monocle and Mr Porter's travel guide.",
        },
      ],
    },

    "velvet-room": {
      title: "Velvet Room",
      subtitle: "A members club where nightlife meets brand culture.",
      year: "2019",
      client: "Velvet Collective",
      location: "Madrid",
      discipline: "Brand Launch · Event Concept · Content",
      services: [
        "Brand strategy & naming",
        "Visual identity",
        "Interior art direction",
        "Photography & film",
        "Launch campaign",
        "Event programming concept",
      ],
      intro:
        "Velvet Room is a private members club and late-night venue in the Chueca neighbourhood of Madrid. We developed the brand from concept to opening night — naming, visual identity, interior art direction, launch campaign and the programming strategy for the first season. The brief: create a nightlife brand that attracts a creative audience without relying on the visual clichés of club culture.",
      sections: [
        {
          label: "Brand Direction",
          body: "The identity system avoids everything expected of a nightlife venue — no neon, no black-and-gold, no bottle-service aesthetics. Instead, the visual language draws from cinema and fashion editorial: a muted palette of deep burgundy, warm ivory and soft black. The logotype is a custom serif set in lowercase — 'velvet room' — designed to feel like a whispered recommendation rather than a shouted invitation.",
        },
        {
          label: "Interior & Atmosphere",
          body: "We directed the interior aesthetic in collaboration with the architecture team — selecting materials, lighting temperature, and art programme. The space is deliberately under-designed: raw plaster walls, velvet banquettes, brass fixtures, and a lighting scheme that shifts through the night from warm amber to deep rose. Every surface photographs well without ever feeling staged.",
        },
        {
          label: "Content & Campaign",
          body: "The launch campaign was built around a series of intimate portrait sessions shot inside the venue before it opened — musicians, DJs, chefs, designers, each photographed in the same corner booth under the same light. No event shots, no crowd photos. The message was clear: the people define the space. A 90-second film followed the same logic — faces, textures, sound, movement.",
        },
        {
          label: "Launch & Programming",
          body: "Opening night was invitation-only — 120 guests, no press, no phones encouraged. The first season's programming mixed DJ sets with supper clubs, listening sessions and private fashion presentations. We designed the event identity system, seasonal collateral and social content strategy for the first year. The venue was featured in TimeOut Madrid, Vogue España and i-D within six months.",
        },
      ],
    },

    "atelier-norte": {
      title: "Atelier Norte",
      subtitle: "An editorial fashion project in collaboration with the North.",
      year: "2017",
      client: "Atelier Norte",
      location: "Bilbao · San Sebastián",
      discipline: "Editorial · Photography · Fashion Film",
      services: [
        "Creative direction",
        "Photography",
        "Fashion film",
        "Art direction",
        "Styling direction",
        "Post-production",
      ],
      intro:
        "Atelier Norte was a self-initiated editorial project and our earliest public work — a long-form fashion story shot across the Basque Country over two weeks. The project was conceived as a visual essay on northern Spanish identity, material culture and landscape. It was subsequently published in several independent fashion and culture publications.",
      sections: [
        {
          label: "Concept",
          body: "The project began as a personal investigation into the visual language of northern Spain — the Basque Country specifically. Industrial harbours, stone farmhouses, rain-soaked hillsides and the interplay between rural tradition and urban modernity. Fashion was the lens, not the subject.",
        },
        {
          label: "Photography",
          body: "Shot on medium format film and digital, the series comprises 48 images across three chapters: Costa (coast), Interior (inland), and Ciudad (city). Each chapter has its own light quality and palette, but the thread is consistent — the garments anchor the viewer in time while the landscape provides context.",
        },
        {
          label: "Fashion Film",
          body: "A companion 8-minute film was shot alongside the stills campaign. Unlike the photographs, the film is entirely observational — no directed movement, no choreography. Subjects are captured in transition: walking, waiting, watching. The score was composed by a Bilbao-based musician using field recordings from the shoot locations.",
        },
        {
          label: "Publication",
          body: "The project was published in three independent titles and exhibited as a print installation at a gallery in San Sebastián. It remains our most personal project and the foundation of the studio's visual language — the attention to light, landscape and material that now defines our client work.",
        },
      ],
    },
  },

  es: {
    "ipa-brand-lionna": {
      title: "IPA Brand en Li-Onna",
      subtitle:
        "Un evento de marca de moda capturado a través de la atmósfera, la mesa y los detalles editoriales dentro del salón rojo de Li-Onna, Madrid.",
      year: "2026",
      client: "IPA Brand",
      location: "Li-Onna, Madrid",
      discipline: "Evento de moda · Captura de contenido · Experiencia de marca",
      services: [
        "Captura de contenido de evento",
        "Fotografía de experiencia de marca",
        "Narrativa editorial",
      ],
      intro:
        "Un evento íntimo de marca de moda capturado en el salón rojo de Li-Onna, Madrid — centrado en la atmósfera, el detalle y el lenguaje visual de la noche.",
      sections: [
        {
          label: "Atmósfera",
          body: "Paredes en laca roja, terciopelo y techo espejado marcan el tono de la noche. La propia sala se vuelve el primer encuadre — su color y sus reflejos llevan el ambiente antes de que entre cualquier objeto.",
        },
        {
          label: "La mesa de marca",
          body: "Las piezas de IPA se disponen como parte de la cena: bolsos, material impreso y rosas dispuestos sobre el lino — una presencia tranquila y cuidada entre los cubiertos.",
        },
        {
          label: "Detalles",
          body: "De cerca, el lenguaje visual aparece en los pequeños momentos — prints gráficos contra el rojo, el peso de un bolso, pétalos sobre la mesa.",
        },
      ],
    },

    "backyard-franciacorta": {
      title: "Backyard dello Specchio",
      subtitle:
        "Un proyecto documental deportivo outdoor que captura el ritmo, la resistencia y la comunidad de una carrera Backyard en Franciacorta Bresciana.",
      year: "2026",
      client: "Backyard dello Specchio",
      location: "Franciacorta Bresciana, Italia",
      discipline: "Fotografía · Vídeo · Drone Filming",
      services: [
        "Fotografía",
        "Vídeo",
        "Drone filming",
        "Cobertura de evento",
        "Narrativa editorial",
      ],
      intro:
        "Un proyecto documental deportivo rodado en Franciacorta Bresciana, Italia, siguiendo la atmósfera, la resistencia y el ritmo humano de una carrera Backyard. La narrativa visual se mueve entre detalles íntimos de preparación, secuencias de carrera con movimiento y la conexión entre atletas y espectadores.",
      sections: [
        {
          label: "Mirada documental",
          body: "Abordamos el evento como una historia humana, no sólo como una competición deportiva. Detalles, gestos, rostros y movimiento se capturaron para comunicar la atmósfera de resistencia y repetición que define el formato Backyard.",
        },
        {
          label: "Movimiento y ritmo",
          body: "El lenguaje visual usa motion blur, secuencias de trail y planos cortos de preparación para expresar velocidad, fatiga, foco e impulso. El resultado es un editorial deportivo crudo y a la vez pulido.",
        },
        {
          label: "Cobertura completa del evento",
          body: "El proyecto combinó fotografía, vídeo y drone filming en un registro editorial completo — desde la intensidad física de la carrera hasta los momentos más tranquilos que definen su comunidad.",
        },
      ],
      press: {
        label: "Sport Mediaset",
        url: "https://www.sportmediaset.mediaset.it/running/un-altro-giro-di-giostra-backyard-dello-specchio-fino-all-ultimo-runner_110656477-202602k.shtml",
      },
    },

    "casa-lumen": {
      title: "Casa Lumen",
      subtitle: "Una marca hotelera nacida de la luz.",
      year: "2026",
      client: "Casa Lumen Hospitality",
      location: "Madrid",
      discipline: "Dirección de marca · Contenido visual · Lanzamiento",
      services: [
        "Estrategia y posicionamiento de marca",
        "Identidad visual",
        "Dirección de fotografía",
        "Vídeo y movimiento",
        "Concepto de evento de lanzamiento",
        "Prensa y PR",
      ],
      intro:
        "Casa Lumen es un hotel boutique de 24 habitaciones en el corazón de Malasaña, Madrid. Se nos encargó construir la marca desde cero — del naming y la identidad visual a la campaña de lanzamiento y la noche de apertura. El objetivo: crear una marca hotelera que se sintiera a la vez arraigada en el barrio y discretamente internacional.",
      sections: [
        {
          label: "Dirección de marca",
          body: "Desarrollamos un sistema de identidad visual construido alrededor de la luz y la materialidad. La marca tipográfica, compuesta en una serif a medida, referencia el lenguaje arquitectónico del edificio — ventanas arqueadas, texturas de piedra caliza, la forma en que la luz de la tarde atraviesa los patios interiores. El sistema cromático es contenido: blancos cálidos, arcilla suave, tinta. Cada punto de contacto — desde las llaves hasta los directorios de habitación — fue diseñado como un único objeto coherente.",
        },
        {
          label: "Lenguaje visual",
          body: "La dirección fotográfica evita los clichés del marketing hotelero. Sin ángulos elevados, sin desayunos escenificados. La campaña captura el hotel como si lo observara un huésped — fragmentos de luz, texturas, momentos silenciosos. La pieza de vídeo sigue un solo día desde el amanecer hasta la tarde, rodada íntegramente con luz natural.",
        },
        {
          label: "Contenido y producción",
          body: "Toda la fotografía y el vídeo se produjeron internamente durante cinco días de rodaje. El sistema incluye una suite de campaña principal, una serie editorial para prensa, una biblioteca de contenido social y un cortometraje para uso digital y eventos.",
        },
        {
          label: "Lanzamiento",
          body: "La apertura se concibió como una velada íntima para prensa, socios y figuras del barrio — no un lanzamiento hotelero convencional. Gestionamos todo el PR, los press kits y las relaciones con medios, logrando presencia en Wallpaper*, AD España y varias publicaciones locales durante el primer mes.",
        },
      ],
    },

    "ornela-perfumes": {
      title: "Ornela Perfumes",
      subtitle: "El aroma como narrativa. Una campaña para los sentidos.",
      year: "2025",
      client: "Ornela",
      location: "Madrid · París",
      discipline: "Campaña · Fotografía · Vídeo · PR",
      services: [
        "Concepto de campaña",
        "Dirección de arte",
        "Fotografía",
        "Cortometraje",
        "Evento de lanzamiento",
        "Relaciones con prensa",
      ],
      intro:
        "Ornela es una casa de perfumes nicho nacida en Madrid que lanza sus tres primeras fragancias. Desarrollamos el concepto de campaña, dirigimos todo el contenido visual y orquestamos el lanzamiento entre Madrid y París. El reto: introducir una marca nueva en una de las categorías de lujo más saturadas — sin celebrities, sin volumen, sin ruido.",
      sections: [
        {
          label: "Concepto de campaña",
          body: "La campaña se construye alrededor de la idea del aroma como lugar. Cada fragancia corresponde a un entorno concreto — un patio al atardecer, un mercado de lino en Le Marais, un invernadero después de la lluvia. El lenguaje visual traduce lo olfativo en espacial, usando fotografía y vídeo para evocar atmósfera en lugar de producto.",
        },
        {
          label: "Dirección visual",
          body: "La serie fotográfica utiliza luz natural controlada y una paleta apagada para crear quietud. El producto siempre está presente pero nunca aislado — existe dentro de entornos compuestos. Los tres cortometrajes siguen la misma lógica: sin voz en off, sin texto, solo lugar y movimiento.",
        },
        {
          label: "Producción",
          body: "El rodaje se extendió durante cuatro días en dos ciudades. Toda la dirección creativa, la fotografía y el vídeo se produjeron dentro del estudio. La entrega final incluye una suite de campaña principal, tres sets editoriales por fragancia, activos de contenido social y tres películas de 45 segundos.",
        },
        {
          label: "Lanzamiento y PR",
          body: "El lanzamiento de Madrid se celebró en una residencia privada en Chamberí, concebido como una experiencia olfativa más que como un evento de prensa. París siguió dos semanas después con una activación más reducida en una concept store del Marais. La cobertura incluyó Vogue España, Numero y prensa de nicho de perfumería internacionalmente.",
        },
      ],
    },

    "amaranta-studio": {
      title: "Amaranta Studio",
      subtitle: "Construir una marca de moda desde los principios.",
      year: "2024",
      client: "Amaranta",
      location: "Madrid",
      discipline: "Identidad de marca · Campaña · Fashion Film",
      services: [
        "Estrategia de marca",
        "Identidad visual",
        "Dirección de arte",
        "Fotografía de campaña",
        "Fashion film",
        "Sistema de contenido social",
      ],
      intro:
        "Amaranta es una marca de moda independiente con base en Madrid que produce ropa de mujer considerada en pequeñas cantidades. Construimos la identidad de marca y dirigimos las dos primeras campañas de temporada — posicionando la marca como una alternativa tranquila al fast fashion, arraigada en el oficio y la intencionalidad.",
      sections: [
        {
          label: "Identidad de marca",
          body: "El sistema de identidad es intencionadamente discreto. Un logotipo limpio en una grotesca condensada, una paleta estrictamente monocromática y un sistema tipográfico diseñado para la longevidad. El manual de marca tiene menos de 20 páginas — cada decisión es esencial, nada es decorativo.",
        },
        {
          label: "Dirección visual",
          body: "La fotografía de campaña rompe con la convención de moda al situar las prendas en contextos arquitectónicos — una escalera brutalista, un palazzo de suelo de mármol, una azotea al final de la tarde. La ropa se lleva, no se exhibe. El tono es observacional, no aspiracional.",
        },
        {
          label: "Fashion film",
          body: "Un film de tres minutos rodado en 16mm sigue a una sola modelo a través de una secuencia de interiores y exteriores en el centro de Madrid. Sin música — solo sonido ambiente. El film se estrenó en una proyección privada y se publicó online como pieza central de la campaña SS24.",
        },
        {
          label: "Sistema de contenido",
          body: "Diseñamos un marco de contenido social replicable que permite a la marca producir contenido editorial mensual sin necesidad de un rodaje de campaña completo cada vez. El sistema incluye plantillas de dirección de arte, guías de estilismo y estándares de postproducción.",
        },
      ],
    },

    "hotel-varela": {
      title: "Hotel Varela",
      subtitle: "Una marca hotelera entre tradición y contemporaneidad.",
      year: "2022",
      client: "Grupo Varela",
      location: "Lisboa",
      discipline: "Universo de marca · Contenido editorial · Dirección",
      services: [
        "Posicionamiento de marca",
        "Dirección de arte",
        "Fotografía",
        "Contenido editorial",
        "Tono de voz",
        "Dirección de contenido digital",
      ],
      intro:
        "Hotel Varela es un hotel boutique familiar en el barrio de Príncipe Real, Lisboa. La propiedad existía desde hacía décadas pero carecía de un lenguaje de marca definido. Se nos encomendó desarrollar un universo de marca contemporáneo que honrase la historia del hotel reposicionándolo para una audiencia internacional.",
      sections: [
        {
          label: "Dirección de marca",
          body: "En lugar de un rebranding completo, trabajamos dentro de la identidad existente para construir un sistema visual y verbal coherente a su alrededor. La paleta tipográfica se refinó, se estableció un estilo fotográfico y se desarrolló un tono de voz que equilibra la calidez con la contención editorial.",
        },
        {
          label: "Concepto visual",
          body: "La dirección fotográfica se nutre de la luz y el color de Lisboa sin caer en el cliché turístico. Retratos del personal conviven con detalles arquitectónicos y primeros planos de texturas. La serie se fotografió durante tres días en invierno — evitando deliberadamente la estética de postal soleada.",
        },
        {
          label: "Producción de contenido",
          body: "Los entregables incluyeron una suite completa de fotografía editorial, una biblioteca de contenido digital para web y redes sociales, un documento de directrices de marca y una serie de layouts plantillados para comunicación estacional.",
        },
        {
          label: "Posicionamiento",
          body: "El reposicionamiento se centró en el carácter del hotel más que en sus servicios. La línea 'Un lugar que recuerda' se convirtió en el concepto ancla — usado en todas las comunicaciones sin llegar a ser un tagline. El hotel fue posteriormente recogido en Monocle y la guía de viajes de Mr Porter.",
        },
      ],
    },

    "velvet-room": {
      title: "Velvet Room",
      subtitle: "Un club privado donde la noche se encuentra con la cultura de marca.",
      year: "2019",
      client: "Velvet Collective",
      location: "Madrid",
      discipline: "Lanzamiento de marca · Concepto de evento · Contenido",
      services: [
        "Estrategia de marca y naming",
        "Identidad visual",
        "Dirección de arte de interiores",
        "Fotografía y vídeo",
        "Campaña de lanzamiento",
        "Concepto de programación de eventos",
      ],
      intro:
        "Velvet Room es un club privado y espacio nocturno en el barrio de Chueca, Madrid. Desarrollamos la marca desde el concepto hasta la noche de apertura — naming, identidad visual, dirección de arte de interiores, campaña de lanzamiento y la estrategia de programación para la primera temporada. El encargo: crear una marca de ocio nocturno que atraiga a una audiencia creativa sin recurrir a los clichés visuales de la cultura de clubs.",
      sections: [
        {
          label: "Dirección de marca",
          body: "El sistema de identidad evita todo lo esperado de un espacio nocturno — ni neón, ni negro y dorado, ni estética de bottle service. En su lugar, el lenguaje visual bebe del cine y la editorial de moda: una paleta apagada de burdeos profundo, marfil cálido y negro suave. El logotipo es una serif a medida en minúsculas — 'velvet room' — diseñada para sentirse como una recomendación susurrada más que como una invitación a gritos.",
        },
        {
          label: "Interior y atmósfera",
          body: "Dirigimos la estética interior en colaboración con el equipo de arquitectura — seleccionando materiales, temperatura de iluminación y programa artístico. El espacio está deliberadamente infradiseñado: paredes de yeso crudo, banquetas de terciopelo, accesorios de latón y un esquema de iluminación que transita durante la noche del ámbar cálido al rosa profundo. Cada superficie fotografía bien sin parecer nunca escenificada.",
        },
        {
          label: "Contenido y campaña",
          body: "La campaña de lanzamiento se construyó alrededor de una serie de sesiones de retrato íntimas dentro del local antes de su apertura — músicos, DJs, chefs, diseñadores, cada uno fotografiado en el mismo rincón del sofá bajo la misma luz. Nada de fotos de eventos, nada de multitudes. El mensaje era claro: las personas definen el espacio. Un film de 90 segundos siguió la misma lógica — rostros, texturas, sonido, movimiento.",
        },
        {
          label: "Lanzamiento y programación",
          body: "La noche de apertura fue solo por invitación — 120 invitados, sin prensa, sin móviles recomendados. La programación de la primera temporada mezcló sesiones de DJ con supper clubs, sesiones de escucha y presentaciones de moda privadas. Diseñamos el sistema de identidad de eventos, el material estacional y la estrategia de contenido social para el primer año. El local fue recogido en TimeOut Madrid, Vogue España e i-D en los primeros seis meses.",
        },
      ],
    },

    "atelier-norte": {
      title: "Atelier Norte",
      subtitle: "Un proyecto editorial de moda en colaboración con el norte.",
      year: "2017",
      client: "Atelier Norte",
      location: "Bilbao · San Sebastián",
      discipline: "Editorial · Fotografía · Fashion Film",
      services: [
        "Dirección creativa",
        "Fotografía",
        "Fashion film",
        "Dirección de arte",
        "Dirección de estilismo",
        "Postproducción",
      ],
      intro:
        "Atelier Norte fue un proyecto editorial autoiniciado y nuestro primer trabajo público — una historia de moda de largo formato fotografiada a lo largo del País Vasco durante dos semanas. El proyecto se concibió como un ensayo visual sobre la identidad del norte de España, su cultura material y su paisaje. Fue publicado posteriormente en varias publicaciones independientes de moda y cultura.",
      sections: [
        {
          label: "Concepto",
          body: "El proyecto comenzó como una investigación personal sobre el lenguaje visual del norte de España — el País Vasco en concreto. Puertos industriales, caseríos de piedra, colinas empapadas de lluvia y la interacción entre tradición rural y modernidad urbana. La moda fue la lente, no el tema.",
        },
        {
          label: "Fotografía",
          body: "Rodada en formato medio analógico y digital, la serie comprende 48 imágenes en tres capítulos: Costa, Interior y Ciudad. Cada capítulo tiene su propia calidad de luz y paleta, pero el hilo es consistente — las prendas anclan al espectador en el tiempo mientras el paisaje proporciona contexto.",
        },
        {
          label: "Fashion film",
          body: "Un film acompañante de 8 minutos se rodó junto con la campaña de fotografía. A diferencia de las fotografías, el film es enteramente observacional — sin movimiento dirigido, sin coreografía. Los sujetos son capturados en tránsito: caminando, esperando, observando. La banda sonora fue compuesta por un músico bilbaíno usando grabaciones de campo de las localizaciones del rodaje.",
        },
        {
          label: "Publicación",
          body: "El proyecto fue publicado en tres títulos independientes y expuesto como una instalación impresa en una galería de San Sebastián. Sigue siendo nuestro proyecto más personal y la base del lenguaje visual del estudio — la atención a la luz, al paisaje y al material que ahora define nuestro trabajo para clientes.",
        },
      ],
    },
  },
};

export default projects;
