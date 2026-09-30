import { SERVICE_HREF } from "./serviceRoutes";

export const PROJECT_ORDER = [
  "xeri-gin-focaccia-beat",
  "ipa-brand-lionna",
  "bossa-nightlife-stills",
  "backyard-franciacorta",
  "ramon-freixa",
  "downhillitalia",
];

export const PROJECT_META = [
  { title: "Xerí Gin — Focaccia & Beat", slug: "xeri-gin-focaccia-beat", category: "Events", cover: "/images/work/xeri-gin-focaccia-beat/xeri-gin-00-hero-product-wide.png" },
  { title: "IPA Brand at Li-Onna", slug: "ipa-brand-lionna", category: "Events", cover: "/images/work/ipa-brand-lionna/event-02-dinner-table-editorial.png" },
  { title: "Bossa — Nightlife Stills", slug: "bossa-nightlife-stills", category: "Photo & Video", cover: "/images/work/bossa-nightlife-stills/bossa-01-neon-sign-editorial.png" },
  { title: "Backyard dello Specchio", slug: "backyard-franciacorta", category: "Sport", cover: "/images/work/backyard-franciacorta-edited/backyard-franciacorta-04-group-trail.png" },
  { title: "Ramón Freixa", slug: "ramon-freixa", category: "Events", cover: "/images/work/ramon-freixa/ramon-freixa-01-glass-terrace-table.webp" },
  { title: "Downhill Italia", slug: "downhillitalia", category: "Photo & Video", cover: "/images/work/downhillitalia/downhillitalia-01-water-splash-bw.webp" },
];

/**
 * Per-project media. Every entry is declared explicitly below, the old
 * generated map (PROJECT_HERO / PROJECT_GALLERY_SOURCE / buildGallery)
 * only ever fed the placeholder projects that shipped with the template
 * and went with them.
 */
export const PROJECT_IMAGES = {};

// IPA Brand at Li-Onna: manual override because the asset filenames
// are editorial slugs, not the {prefix}{1,2,3}.png pattern the gallery
// builder expects. Hero is the dinner table image; the 3 gallery items
// drive the three body sections in CaseStudy (atmosphere, brand table,
// details), in that order.
//
// The "Details / Closer in" section closes the case study with the
// interior loop instead of the editorial close detail still, same
// red-salon vocabulary but in motion. The clip carries the project's
// chromatic signature via .media-red-duotone (deep crimson grade by
// default, releases to natural footage on hover), mirroring the
// treatment used for the Xerí Gin bartender loop.
//
// ── Asset correction (client review) ──────────────────────────────────
// `event-07-ipa-exterior.png` was removed from this project and has now
// been refiled as
// `/images/work/ramon-freixa/ramon-freixa-01-glass-terrace-table.webp`.
// The frame is a glass-pergola garden terrace in daylight, a different
// venue from Li-Onna's red salon, and the Ramón Freixa material the
// client supplied since confirms it: the same linen, striped ceramics
// and amber/purple glassware appear there beside a place card carrying
// the house name and logo. Every frame left here is unmistakably the red
// salon. The "Arrival" section that described that terrace went with it,
// keeping sections and gallery slots aligned 1:1.
const IPA_DIR = "/images/work/ipa-brand-lionna";
PROJECT_IMAGES["ipa-brand-lionna"] = {
  hero: `${IPA_DIR}/event-02-dinner-table-editorial.png`,
  gallery: [
    `${IPA_DIR}/event-01-room-atmosphere-editorial.png`,
    `${IPA_DIR}/event-03-brand-table-editorial.png`,
    {
      type: "video",
      src: `${IPA_DIR}/ipa-interior-loop.mp4`,
      poster: `${IPA_DIR}/ipa-interior-poster.jpg`,
      alt: "IPA Brand at Li-Onna: interior loop inside the red salon",
      aspect: "aspect-[4/5]",
      grade: "red-duotone",
    },
  ],
};

// Backyard dello Specchio: sport documentary in Franciacorta.
// Hero is the group on the trail (strongest editorial frame).
// Gallery feeds the three case-study sections (documentary approach,
// motion & rhythm, full event coverage). extraGallery extends the
// case study with an editorial sequence after the body, asymmetric
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
  // Editorial slider replaces the stacked grid for the trailing
  // sequence: viewer drives the rhythm instead of scrolling through
  // five large frames. Order stays the same: runner portrait (with
  // glasses) opens, kids high-five closes.
  extraGalleryMode: "slider",
  extraGallery: [
    {
      src: `${BACKYARD_DIR}/backyard-franciacorta-02-runner-portrait.webp`,
      alt: "Backyard runner portrait: Franciacorta",
      aspect: "aspect-[3/4]",
      span: "col-span-12 md:col-span-6",
    },
    {
      src: `${BACKYARD_DIR}/backyard-franciacorta-03-black-white-runner.webp`,
      alt: "Backyard runner: black & white frame",
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

// Xerí Gin — Focaccia & Beat. Boutique gin brand activation at
// The Social Hub Madrid. Hero is the wide product/editorial frame.
//
// Gallery slots, in section order:
//   01 Brand in the room       → product detail close
//   02 Cocktail ritual         → bartender video loop (warm-duotone)
//   03 Editorial event capture → bar service atmosphere
//   04 Social content system   → cocktail prep / menu detail
//
// The bartender video sits inside section 02 because that section
// describes the gestures of the bar ("pouring, serving, garnishing")
// and the video shows exactly that: narrative integration instead
// of a lone block at the end. It carries the project's chromatic
// signature via the .media-warm-duotone treatment (ruby/amber tint
// over grayscale by default, releases to natural footage on hover).
//
// extraGallery closes the case study with the bottles editorial as
// a centred full-bleed product moment: a beauty shot rather than a
// dangling video.
//
// Note on asset mapping: the brief referenced a separate
// `xeri-gin-02-bottles-editorial.png` for the brand/product slot.
// That file wasn't delivered: `xeri-gin-03-client.png` is the
// closest available bottle/brand frame and stands in for it here.
const XERI_DIR = "/images/work/xeri-gin-focaccia-beat";
PROJECT_IMAGES["xeri-gin-focaccia-beat"] = {
  hero: `${XERI_DIR}/xeri-gin-00-hero-product-wide.png`,
  gallery: [
    `${XERI_DIR}/xeri-gin-01-product-detail.png`,
    {
      type: "video",
      src: `${XERI_DIR}/barman-xeri-loop.mp4`,
      poster: `${XERI_DIR}/barman-xeri-poster.jpg`,
      alt: "Xerí Gin: bartender preparing a cocktail at The Social Hub bar",
      aspect: "aspect-[4/5]",
      grade: "warm-duotone",
    },
    `${XERI_DIR}/xeri-gin-04-bar-service-editorial.png`,
    `${XERI_DIR}/xeri-gin-05-cocktail-preparation-menu.png`,
    `${XERI_DIR}/xeri-gin-03-client.png`,
  ],
};

// Bossa — Nightlife Stills. A short documentary photo series at El Sol,
// Madrid (techno night). MAIT did not organise the event, this entry
// represents photography / nightlife documentation only, so it lives in
// the photo-video category and the copy/discipline avoid any framing
// that would imply event production.
//
// Hero is the red neon sign frame: the strongest identity image. The
// four body sections each pair with one of the remaining four frames,
// closing on the wider DJ-booth-with-smoke landscape for editorial
// rhythm (mostly portrait stack → one horizontal release).
const BOSSA_DIR = "/images/work/bossa-nightlife-stills";
PROJECT_IMAGES["bossa-nightlife-stills"] = {
  hero: `${BOSSA_DIR}/bossa-01-neon-sign-editorial.png`,
  gallery: [
    `${BOSSA_DIR}/bossa-03-red-stage-silhouette.png`,
    `${BOSSA_DIR}/bossa-02-dj-silhouette-editorial.png`,
    // Brand-in-the-room frame: DJ from behind under the Bossa
    // signage. Bridges the booth/crowd moment and the staged
    // performance language by anchoring the identity to the
    // architecture itself.
    {
      src: `${BOSSA_DIR}/bossa-05-dj2.png`,
      alt: "Bossa: artist at the booth under the brand signage",
      aspect: "aspect-[3/2]",
    },
    `${BOSSA_DIR}/bossa-04-underground-performance-editorial.png`,
    {
      src: `${BOSSA_DIR}/bossa-05-dj-booth-smoke-editorial.png`,
      alt: "Bossa: DJ booth, smoke and El Sol signage",
      aspect: "aspect-[3/2]",
    },
  ],
};

// Map each project to one of the three MAIT Studio pillars
// (events / brand-experiences / photo-video).
//
// `events` and `photo-video` drive the /work/[category] archive pages;
// `brand-experiences` has no archive route of its own (its public entry
// point is /services/brand-experiences) but the key is kept so case
// studies in that pillar still resolve a breadcrumb + back link. Use
// CATEGORY_HREF (below) instead of building `/work/${key}` by hand.
//
// Projects can belong to more than one category.
export const PROJECTS_BY_CATEGORY = {
  events: [
    {
      slug: "xeri-gin-focaccia-beat",
      title: "Xerí Gin — Focaccia & Beat",
      discipline: "Event Production · Brand Activation · Event Photography",
      year: "2026",
      // Grid cards crop to 4:5 portrait. The wide hero (1672×941) loses
      // too much vertical resolution at that crop and softens visibly;
      // the portrait detail (1086×1448) is native-fit and stays sharp.
      cover: "/images/work/xeri-gin-focaccia-beat/xeri-gin-01-product-detail.png",
    },
    {
      slug: "ipa-brand-lionna",
      title: "IPA Brand at Li-Onna",
      discipline: "Event Production · Brand Experience · Photography",
      year: "2025",
      cover: "/images/work/ipa-brand-lionna/event-02-dinner-table-editorial.png",
      // The source frame leans clockwise by ~0.8° (central table seam,
      // ceiling beam and the dart-board on the back wall all confirm
      // it). A subtle counter-clockwise rotation on the card image
      // straightens those lines without touching the file used as the
      // case-study hero.
      tilt: -0.8,
    },
    // Ramón Freixa. Material identified from the client's own folder and
    // confirmed in-frame: the place-setting card carries the house name
    // and logo, and matches the terrace, linen, striped ceramics and
    // amber/purple glassware of the wide shot. That wide shot is the
    // frame that had been misfiled under Li-Onna: it lives here now.
    //
    {
      slug: "ramon-freixa",
      title: "Ramón Freixa",
      discipline: "Private dining · Table styling · Event content",
      year: "2026",
      cover: "/images/work/ramon-freixa/ramon-freixa-01-glass-terrace-table.webp",
    },
  ],
  "brand-experiences": [
  ],
  "photo-video": [
    // Downhill Italia. Confirmed in-frame: the finish gate carries the
    // "downhill italia" mark alongside the FCI / UCI signage. The client
    // has since delivered the final copy, so the card now carries its
    // discipline and year like the rest.
    {
      slug: "downhillitalia",
      title: "Downhill Italia",
      discipline: "Event Photography · Sports Photography · Race Coverage",
      year: "2026",
      cover: "/images/work/downhillitalia/downhillitalia-01-water-splash-bw.webp",
    },
    {
      slug: "bossa-nightlife-stills",
      title: "Bossa — Nightlife Stills",
      discipline: "Photography · Event Content · Nightlife",
      year: "2026",
      cover: "/images/work/bossa-nightlife-stills/bossa-01-neon-sign-editorial.png",
    },
    {
      slug: "backyard-franciacorta",
      title: "Backyard dello Specchio",
      discipline: "Photography · Video · Drone Filming",
      year: "2026",
      cover: "/images/work/backyard-franciacorta-edited/backyard-franciacorta-04-group-trail.png",
    },
  ],
};

// Ramón Freixa. Two stills plus the terrace clip, all of the same
// dressed table on the glass terrace. The vertical loop closes the case
// study in motion, the same way Xerí Gin and Li-Onna close theirs.
const RF_DIR = "/images/work/ramon-freixa";
PROJECT_IMAGES["ramon-freixa"] = {
  hero: `${RF_DIR}/ramon-freixa-01-glass-terrace-table.webp`,
  gallery: [
    `${RF_DIR}/ramon-freixa-03-place-setting-card.webp`,
    {
      type: "video",
      src: `${RF_DIR}/ramon-freixa-terrace-loop.mp4`,
      poster: `${RF_DIR}/ramon-freixa-terrace-poster.jpg`,
      alt: "Ramón Freixa: the dressed table on the glass terrace",
      aspect: "aspect-[4/5]",
    },
  ],
};

// Downhillitalia. Race-day set: the jump opens as hero, then bike
// detail, the water crossing, the finish embrace and the finish gate.
const DH_DIR = "/images/work/downhillitalia";
PROJECT_IMAGES["downhillitalia"] = {
  hero: `${DH_DIR}/downhillitalia-02-forest-jump.webp`,
  gallery: [
    {
      src: `${DH_DIR}/downhillitalia-04-bike-detail.webp`,
      alt: "Downhillitalia: bike detail in the woods before a run",
      aspect: "aspect-[4/5]",
    },
    `${DH_DIR}/downhillitalia-01-water-splash-bw.webp`,
    {
      src: `${DH_DIR}/downhillitalia-03-finish-embrace-bw.webp`,
      alt: "Downhillitalia: riders embracing past the finish line",
      aspect: "aspect-[3/2]",
    },
    {
      src: `${DH_DIR}/downhillitalia-05-finish-gate.webp`,
      alt: "Downhillitalia: a rider crossing under the finish gate",
      aspect: "aspect-[3/2]",
    },
  ],
};

/**
 * Where each pillar's own page lives. `events` / `photo-video` keep their
 * work archives; `brand-experiences` points at the service page.
 */
export const CATEGORY_HREF = SERVICE_HREF;

/**
 * Visual support for /services/brand-experiences, Alena Angel Art.
 *
 * A real, client-authorised project (brand development and positioning,
 * PR, representation, new spaces for events/exhibitions). It is used as
 * VISUAL SUPPORT inside the Brand Experiences narrative only: no case
 * study, no embedded site, no portfolio section.
 *
 * Three frames, downloaded from alenaangelart.com with the client's
 * express authorisation and served locally (never hotlinked). Chosen for
 * fit with MAIT's direction (art, presentation, space, experience) and
 * against anything that reads as an ecommerce listing, a screenshot or a
 * 3D render, of which the source site has several.
 *
 * Layout reads as one wide anchor plus a pair: the stage performance
 * full width, then the two portraits side by side.
 *
 * While the array is empty the whole section renders NOTHING, no
 * placeholder boxes, no stand-in imagery, no empty gap.
 */
const ALENA_DIR = "/images/support/alena-angel-art";
export const BRAND_EXPERIENCE_SUPPORT = [
  {
    src: `${ALENA_DIR}/alena-angel-art-01-live-painting-stage.webp`,
    alt: "Alena Angel Art: live painting on stage in front of a seated audience",
    aspect: "aspect-[16/9]",
    span: "col-span-12",
  },
  {
    src: `${ALENA_DIR}/alena-angel-art-02-live-painting-fresco-hall.webp`,
    alt: "Alena Angel Art: painting live inside a frescoed historic hall",
    aspect: "aspect-[4/5]",
    span: "col-span-12 md:col-span-6",
  },
  {
    src: `${ALENA_DIR}/alena-angel-art-03-hand-painted-silk.webp`,
    alt: "Alena Angel Art: hand-painted silk piece worn against a sculpted white wall",
    aspect: "aspect-[4/5]",
    span: "col-span-12 md:col-span-6",
  },
];

/**
 * Every project, de-duplicated, in category order, the flat list behind
 * the /work index. Derived from PROJECTS_BY_CATEGORY so a project only
 * ever has to be declared once.
 */
export const ALL_PROJECTS = Object.values(PROJECTS_BY_CATEGORY)
  .flat()
  .filter((p, i, all) => all.findIndex((o) => o.slug === p.slug) === i);

const projects = {
  en: {
    "xeri-gin-focaccia-beat": {
      title: "Xerí Gin — Focaccia & Beat",
      subtitle: "Cocktails, music, food and community came together in a brand experience designed to connect Xerí Gin with its audience in a natural, contemporary and memorable way.",
      year: "2026",
      client: "Xerí Gin",
      location: "The Social Hub, Madrid",
      discipline: "Event Production · Brand Activation · Event Photography",
      services: [
        "Event Production",
        "Brand Activation",
        "Creative & Art Direction",
        "Event Photography",
        "Content Creation",
        "PR & Communications",
        "Social Media Content",
        "Branded Content",
      ],
      intro:
        "For Xerí Gin, we created a brand experience at The Social Hub Madrid, combining event production, creative direction, PR, event photography and content creation. The goal was to translate the brand identity into a real-life setting where product, music, food and community could exist within the same experience. Rather than simply presenting a gin, we created a space where people could discover it, share it and connect it with a particular way of enjoying the moment.",
      sections: [
        {
          label: "The brand within the experience",
          body:
            "Instead of presenting Xerí Gin as a standalone product, we integrated the brand throughout the event experience. The bar, service, music, space and guest interactions created an environment where Xerí’s identity remained visible without feeling forced. A brand activation strategy designed to build a meaningful connection between product, audience and context.",
        },
        {
          label: "The cocktail ritual",
          body:
            "Brand experiences are also built through small gestures. Cocktail preparation, service, ice, bottles and movement behind the bar became part of the visual narrative. We turned the cocktail ritual into branded content, capturing details that communicate product, lifestyle and brand personality within the same frame.",
        },
        {
          label: "An editorial approach to event photography",
          body:
            "The event photography was approached with an editorial eye: spontaneous moments captured through a polished visual language. Light, movement, people and details came together to create imagery aligned with Xerí Gin’s identity. The result was a library of event photography and branded content ready for social media, digital communication and future campaigns.",
        },
        {
          label: "The event lives on through content",
          body:
            "A brand experience should continue beyond the event itself. We created a visual narrative designed to extend Focaccia & Beat across digital channels, transforming the event into social media content, brand communication, PR assets and campaign material. Each image works independently while contributing to a consistent and recognisable visual world for Xerí.",
        },
        {
          label: "The brand in the moment",
          body:
            "We wanted Xerí Gin to be present where the experience was actually happening: in conversations, shared drinks, music and spontaneous interactions. The product became part of real social moments, connecting the brand to a way of meeting, sharing and enjoying. Because a successful brand activation does more than showcase a product — it creates a context people want to be part of.",
        },
      ],
    },

    "ipa-brand-lionna": {
      title: "IPA Brand at Li-Onna",
      subtitle: "An intimate brand experience where fashion, atmosphere and storytelling came together inside Li-Onna’s iconic red salon in Madrid.",
      year: "2025",
      client: "IPA Brand",
      location: "Li-Onna, Madrid",
      discipline: "Event Production · Brand Experience · Photography",
      services: [
        "Event Production",
        "Brand Experience",
        "Content Creation",
        "Photography",
      ],
      intro:
        "For IPA Brand, we created an intimate event built around visual identity, atmosphere and connection. From the table styling to the smallest branded details, every element was designed to feel part of the same world.",
      sections: [
        {
          label: "Atmosphere",
          body:
            "The space set the tone from the very first moment. Deep red walls, velvet textures, warm light and mirrored reflections created an immersive setting with a strong visual identity — elegant, bold and unmistakably Madrid.",
        },
        {
          label: "The Brand Table",
          body:
            "The table became part of the brand experience. IPA pieces, printed imagery, red roses and carefully selected details were integrated into the setting, creating a natural dialogue between fashion, space and guests.",
        },
        {
          label: "Details",
          body:
            "The identity lived in the details: a rose against the red, printed imagery across the table, the texture of the packaging, the way every object occupied the space. Small gestures that gave the experience its character.",
        },
      ],
    },

    "bossa-nightlife-stills": {
      title: "Bossa — Nightlife Stills",
      subtitle: "A nightlife photography series capturing the energy, attitude and visual identity of Bossa at El Sol, Madrid.",
      year: "2026",
      client: "Bossa",
      location: "El Sol, Madrid",
      discipline: "Photography · Event Content · Nightlife",
      services: [
        "Photography",
        "Event Content",
        "Nightlife",
        "Visual Storytelling",
      ],
      intro:
        "For Bossa, we documented a night at El Sol through a raw, atmospheric visual language. Red light, movement, smoke and performance became the thread of a series designed to capture not only what happened, but how the night felt.",
      sections: [
        {
          label: "Red Light",
          body:
            "Red became the visual language of the night. Neon, stage lights and deep shadows shaped every frame, creating an atmosphere that felt intense, immersive and unmistakably Bossa.",
        },
        {
          label: "DJ, Crowd & Movement",
          body:
            "The energy lived between the booth and the dance floor. DJs, silhouettes, raised hands and bodies in motion came together in images that feel spontaneous, immediate and alive.",
        },
        {
          label: "Brand in the Room",
          body:
            "Bossa’s identity was already part of the space. The logo, the lighting, the crowd and the architecture worked together naturally, allowing the brand to appear without ever feeling staged.",
        },
        {
          label: "Performance",
          body:
            "Beyond the music, the night had its own visual performance. Costumes, gestures, characters, smoke and light created moments that gave the event a distinctive and memorable identity.",
        },
        {
          label: "Nightlife Documentation",
          body:
            "The final series became a visual archive of the night: atmospheric images created to preserve its energy, communicate its identity and extend the experience beyond the venue.",
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
          body: "The project combined photography, video and drone filming into a complete editorial record, from the physical intensity of the race to the quieter moments that define its community.",
        },
      ],
      press: {
        label: "Sport Mediaset",
        url: "https://www.sportmediaset.mediaset.it/running/un-altro-giro-di-giostra-backyard-dello-specchio-fino-all-ultimo-runner_110656477-202602k.shtml",
      },
    },






    // ⚠ PLACEHOLDER COPY: written by the studio to unblock the layout,
    // NOT supplied or approved by the client. Ramón Freixa is a real
    // restaurant: nothing here should reach production as fact. The
    // `draft: true` flag surfaces a visible note on the page; delete the
    // flag once the copywriter's text lands.
    "ramon-freixa": {
      draft: true,
      title: "Ramón Freixa",
      subtitle:
        "A private table dressed on the glass terrace of the restaurant's garden courtyard in Madrid.",
      year: "2026",
      client: "Ramón Freixa",
      location: "Madrid",
      discipline: "Private dining · Table styling · Event content",
      services: [
        "Event content capture",
        "Table styling direction",
        "Hospitality coordination",
        "Photography",
        "Short-form video",
      ],
      intro:
        "A private lunch service staged on the glass terrace that opens onto the restaurant's garden courtyard. The brief was quiet: let the house's own language (linen, porcelain, glass and green) carry the room, and record it without rearranging it.",
      sections: [
        {
          label: "The setting",
          body: "The terrace works as a room made of glass: a steel-framed pergola, sheer black curtains along its sides and a clipped boxwood hedge closing the garden beyond. Daylight arrives filtered and even, which let the whole service be documented without adding a single light.",
        },
        {
          label: "The table",
          body: "One long table, dressed in white linen and set with the house's striped ceramics, amber and plum glassware and hand-decorated porcelain. Each place carries a printed card. Photographed close, the setting reads as a graphic composition before it reads as a table.",
        },
        {
          label: "In motion",
          body: "A short vertical clip closes the record: the table waiting, the garden behind the glass, the room still. Cut for social use alongside the stills, in the same restrained grade.",
        },
      ],
    },

    // ⚠ PLACEHOLDER COPY: see the note above. Downhillitalia is a real
    // championship; none of this is client-supplied.
    "downhillitalia": {
      title: "Downhill Italia",
      subtitle: "A full race day captured from the inside: preparation, speed, tension and the finish line. A photography project created to document the energy of downhill racing while turning every moment into distinctive visual content.",
      year: "2026",
      client: "Downhill Italia",
      location: "Aprica, Valtellina — Italy",
      discipline: "Event Photography · Sports Photography · Race Coverage",
      services: [
        "Event Photography",
        "Sports Photography",
        "Race Coverage",
        "Social Media Content",
        "Visual Direction",
      ],
      intro:
        "We followed a full day of the Italian Downhill Championship, from the moments before the first descent to the final riders crossing the finish line. The goal was to create a visual narrative that could document the competition while delivering powerful photography for communication, social media and event promotion.",
      sections: [
        {
          label: "Before the Drop",
          body:
            "The tension before the speed. Before the race begins, the story lives in the details. Bikes being prepared, race numbers, helmets, focus and last-minute adjustments before entering the course. Capturing these moments allowed us to reveal the more intimate side of the championship and build the opening chapter of a story that goes far beyond the action.",
        },
        {
          label: "On the Track",
          body:
            "Action in the heart of the mountains. The course runs through forests, roots, dirt, water and steep terrain where every second matters. We worked from different positions along the track to capture speed, movement and technique while keeping the rider at the centre of every frame. Sports photography designed to communicate the true intensity of downhill racing and create images that work both as event documentation and digital content.",
        },
        {
          label: "The Finish Line",
          body:
            "Where competition becomes emotion. After the speed come the reactions, the exhaustion, the embraces and the celebration. Around the finish area, we focused on the moments that complete the story: riders, teams, spectators and everything that happens once the clock stops. Black and white gives these images a more human dimension, visually separating emotion from the colour and intensity of the race.",
        },
        {
          label: "The Event as a Brand",
          body:
            "A competition with a recognisable visual identity. A sporting event is also a brand experience. The finish structure, sponsors, signage and championship identity all become part of the visual language. We incorporated these elements naturally into the photography, allowing the brand to remain present without turning each frame into an advertisement. The result is a consistent, recognisable body of work, ready for press, social media, corporate communication and future editions of the event.",
        },
      ],
    },
  },

  es: {
    "xeri-gin-focaccia-beat": {
      title: "Xerí Gin — Focaccia & Beat",
      subtitle: "Cócteles, música, gastronomía y comunidad en una experiencia de marca creada para conectar Xerí Gin con su público de una forma cercana, contemporánea y memorable.",
      year: "2026",
      client: "Xerí Gin",
      location: "The Social Hub, Madrid",
      discipline: "Producción de eventos · Brand activation · Fotografía de eventos",
      services: [
        "Producción de eventos",
        "Brand activation",
        "Dirección creativa y artística",
        "Fotografía de eventos",
        "Creación de contenido",
        "PR y comunicación",
        "Contenido para redes sociales",
        "Branded content",
      ],
      intro:
        "Para Xerí Gin desarrollamos una experiencia de marca en The Social Hub Madrid, combinando producción de eventos, dirección creativa, PR, fotografía y creación de contenido. El objetivo era trasladar la identidad de la marca a un contexto real: una experiencia social donde producto, música, gastronomía y comunidad convivieran de forma coherente. Más que presentar una ginebra, creamos un espacio donde descubrirla, compartirla y asociarla a una manera concreta de vivir el momento.",
      sections: [
        {
          label: "La marca dentro de la experiencia",
          body:
            "En lugar de presentar Xerí Gin como un elemento aislado, integramos el producto dentro de toda la experiencia. La barra, el servicio, la música, el espacio y la interacción entre los invitados construyeron un entorno en el que la identidad de marca estaba presente de manera constante, pero natural. Una estrategia de brand activation pensada para generar conexión real entre producto, público y contexto.",
        },
        {
          label: "El ritual del cóctel",
          body:
            "La experiencia también se construye en los pequeños gestos. La preparación de los cócteles, el servicio, el hielo, las botellas y el movimiento detrás de la barra formaron parte de la narrativa visual del evento. Convertimos el ritual del cóctel en contenido de marca, capturando detalles capaces de comunicar producto, lifestyle y personalidad en una misma imagen.",
        },
        {
          label: "Una mirada editorial al evento",
          body:
            "La fotografía de evento se planteó desde una perspectiva editorial: imágenes espontáneas, pero visualmente cuidadas. Luz, movimiento, personas y detalles se combinaron para crear una cobertura coherente con el universo de Xerí Gin. El resultado fue una biblioteca de fotografía de eventos y branded content preparada para redes sociales, comunicación digital y futuras campañas.",
        },
        {
          label: "El evento continúa en el contenido",
          body:
            "Una experiencia de marca no termina cuando acaba el evento. Diseñamos una narrativa visual capaz de prolongar Focaccia & Beat en canales digitales, transformando lo ocurrido durante la jornada en contenido para redes sociales, campañas de marca, PR y comunicación. Cada imagen funciona de forma independiente y, al mismo tiempo, contribuye a construir una identidad visual reconocible para Xerí.",
        },
        {
          label: "La marca en el momento",
          body:
            "Queríamos que Xerí Gin estuviera presente allí donde realmente sucedía la experiencia: en los brindis, las conversaciones, la música y los encuentros. La marca se integró dentro de escenas reales y espontáneas, conectando el producto con una forma de socializar, compartir y disfrutar. Porque una buena activación de marca no solo muestra un producto: crea un contexto en el que las personas quieren formar parte de él.",
        },
      ],
    },

    "ipa-brand-lionna": {
      title: "IPA Brand en Li-Onna",
      subtitle: "Una experiencia de marca íntima donde moda, atmósfera y storytelling se encontraron en el icónico salón rojo de Li-Onna, en Madrid.",
      year: "2025",
      client: "IPA Brand",
      location: "Li-Onna, Madrid",
      discipline: "Producción de eventos · Experiencia de marca · Fotografía",
      services: [
        "Producción de eventos",
        "Experiencia de marca",
        "Creación de contenido",
        "Fotografía",
      ],
      intro:
        "Para IPA Brand creamos un evento íntimo construido alrededor de su identidad visual, la atmósfera y la conexión entre los invitados. Desde el estilismo de la mesa hasta los pequeños elementos de marca, cada detalle formaba parte de un mismo universo.",
      sections: [
        {
          label: "Atmósfera",
          body:
            "El espacio marcó el tono desde el primer momento. Paredes rojas, terciopelo, luz cálida y reflejos crearon un escenario envolvente con una identidad visual muy definida: elegante, atrevida y profundamente madrileña.",
        },
        {
          label: "La mesa de marca",
          body:
            "La mesa se convirtió en parte de la experiencia. Piezas de IPA, imágenes impresas, rosas rojas y detalles cuidadosamente seleccionados se integraron en el espacio creando un diálogo natural entre moda, entorno e invitados.",
        },
        {
          label: "Detalles",
          body:
            "La identidad estaba en los pequeños gestos: una rosa sobre el rojo, fotografías extendidas sobre la mesa, la textura del packaging o la disposición de cada objeto. Detalles capaces de dar carácter a toda la experiencia.",
        },
      ],
    },

    "bossa-nightlife-stills": {
      title: "Bossa — Nightlife Stills",
      subtitle: "Una serie fotográfica nocturna que captura la energía, la actitud y la identidad visual de Bossa en El Sol, Madrid.",
      year: "2026",
      client: "Bossa",
      location: "El Sol, Madrid",
      discipline: "Fotografía · Contenido de evento · Nightlife",
      services: [
        "Fotografía",
        "Contenido de evento",
        "Nightlife",
        "Storytelling visual",
      ],
      intro:
        "Para Bossa documentamos una noche en El Sol a través de un lenguaje visual crudo y atmosférico. Luz roja, movimiento, humo y performance se convirtieron en el hilo conductor de una serie pensada para capturar no solo lo que ocurrió, sino cómo se sintió la noche.",
      sections: [
        {
          label: "Luz roja",
          body:
            "El rojo se convirtió en el lenguaje visual de la noche. Neones, luces de escenario y sombras profundas dieron forma a cada imagen, creando una atmósfera intensa, envolvente e inconfundiblemente Bossa.",
        },
        {
          label: "DJ, público y movimiento",
          body:
            "La energía estaba entre la cabina y la pista. DJs, siluetas, manos en alto y cuerpos en movimiento se encontraron en imágenes espontáneas, directas y llenas de vida.",
        },
        {
          label: "La marca dentro del espacio",
          body:
            "La identidad de Bossa ya formaba parte del entorno. El logo, la iluminación, el público y la arquitectura convivían de forma natural, haciendo que la marca estuviera presente sin necesidad de forzarla.",
        },
        {
          label: "Performance",
          body:
            "Más allá de la música, la noche tenía su propio lenguaje escénico. Vestuario, gestos, personajes, humo y luz crearon momentos capaces de dar al evento una identidad reconocible y memorable.",
        },
        {
          label: "Documentación nightlife",
          body:
            "La serie final se convirtió en un archivo visual de la noche: imágenes creadas para conservar su energía, comunicar su identidad y hacer que la experiencia continuara más allá del espacio.",
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
          body: "El proyecto combinó fotografía, vídeo y drone filming en un registro editorial completo, desde la intensidad física de la carrera hasta los momentos más tranquilos que definen su comunidad.",
        },
      ],
      press: {
        label: "Sport Mediaset",
        url: "https://www.sportmediaset.mediaset.it/running/un-altro-giro-di-giostra-backyard-dello-specchio-fino-all-ultimo-runner_110656477-202602k.shtml",
      },
    },






    // ⚠ COPY PROVISIONAL: redactado por el estudio para desbloquear el
    // maquetado, NO facilitado ni aprobado por la clienta. Ver la nota
    // en la versión inglesa.
    "ramon-freixa": {
      draft: true,
      title: "Ramón Freixa",
      subtitle:
        "Una mesa privada dispuesta en la terraza acristalada que abre al patio ajardinado del restaurante, en Madrid.",
      year: "2026",
      client: "Ramón Freixa",
      location: "Madrid",
      discipline: "Comedor privado · Dirección de mesa · Contenido de evento",
      services: [
        "Captura de contenido de evento",
        "Dirección de mesa",
        "Coordinación de hospitality",
        "Fotografía",
        "Vídeo short-form",
      ],
      intro:
        "Un servicio privado montado en la terraza acristalada que se abre al patio ajardinado del restaurante. El encargo era discreto: dejar que el lenguaje de la casa (lino, porcelana, cristal y verde) sostuviera la sala, y registrarlo sin recolocar nada.",
      sections: [
        {
          label: "El espacio",
          body: "La terraza funciona como una sala hecha de cristal: pérgola de acero, cortinas negras de gasa en los laterales y un seto de boj recortado cerrando el jardín al fondo. La luz entra filtrada y uniforme, lo que permitió documentar todo el servicio sin añadir un solo foco.",
        },
        {
          label: "La mesa",
          body: "Una única mesa larga, vestida de lino blanco y puesta con las cerámicas rayadas de la casa, cristalería ámbar y ciruela y porcelana decorada a mano. Cada cubierto lleva su tarjeta impresa. De cerca, el montaje se lee antes como composición gráfica que como mesa.",
        },
        {
          label: "En movimiento",
          body: "Un clip vertical breve cierra el registro: la mesa esperando, el jardín tras el cristal, la sala quieta. Montado para redes junto a las fotografías, con el mismo grado contenido.",
        },
      ],
    },

    // ⚠ COPY PROVISIONAL: ver la nota anterior.
    "downhillitalia": {
      title: "Downhill Italia",
      subtitle: "Una jornada de competición contada desde dentro: preparación, velocidad, tensión y llegada a meta. Una cobertura fotográfica pensada para capturar la energía del downhill y transformar cada momento en contenido visual con identidad.",
      year: "2026",
      client: "Downhill Italia",
      location: "Aprica, Valtellina — Italia",
      discipline: "Fotografía de eventos · Fotografía deportiva · Cobertura de competición",
      services: [
        "Fotografía de eventos",
        "Fotografía deportiva",
        "Cobertura de competición",
        "Contenido para redes sociales",
        "Dirección visual y editorial",
      ],
      intro:
        "Seguimos una jornada completa del Campeonato Italiano de Downhill, desde los momentos previos a la salida hasta las últimas llegadas a meta. El objetivo fue construir una narrativa visual capaz de documentar la competición y, al mismo tiempo, generar contenido fotográfico potente para comunicación, redes sociales y promoción del evento.",
      sections: [
        {
          label: "Antes de la salida",
          body:
            "La tensión antes de la velocidad. Antes de que empiece la carrera, todo sucede en los detalles. Bicicletas preparadas, dorsales, cascos, concentración y los últimos ajustes antes de entrar en el trazado. Fotografiar estos momentos nos permitió mostrar el lado más cercano del campeonato y construir el inicio de una historia que va mucho más allá de la acción.",
        },
        {
          label: "En el trazado",
          body:
            "Acción en plena montaña. El recorrido atraviesa bosques, raíces, tierra, agua y desniveles donde cada segundo cuenta. Trabajamos desde diferentes puntos del circuito para capturar velocidad, movimiento y técnica sin perder de vista al protagonista: el rider. Una cobertura de fotografía deportiva diseñada para transmitir la intensidad real de la competición y crear imágenes capaces de funcionar tanto como archivo del evento como contenido digital.",
        },
        {
          label: "La meta",
          body:
            "Donde la competición vuelve a ser emoción. Después de la velocidad llegan las miradas, los abrazos, el cansancio y la celebración. En la zona de meta buscamos esos momentos que completan la historia: la reacción de los corredores, el equipo, el público y todo lo que ocurre cuando termina el cronómetro. El blanco y negro refuerza esa dimensión más humana y separa visualmente la emoción del ritmo y el color de la competición.",
        },
        {
          label: "El evento como identidad de marca",
          body:
            "Una competición reconocible en cada imagen. Un evento deportivo también construye marca. La arquitectura de la meta, los patrocinadores, la señalética y la identidad visual del campeonato forman parte de la experiencia. Por eso integramos estos elementos dentro de la fotografía de manera natural, haciendo que la marca esté presente sin convertir la imagen en publicidad. El resultado es una cobertura coherente, reconocible y preparada para vivir en prensa, redes sociales, comunicación corporativa y futuras ediciones del evento.",
        },
      ],
    },
  },

  /**
   * Italian case studies.
   *
   * The client delivered Italian copy for four of the six projects.
   * The remaining two are filled in from English below, so switching
   * to IT can never land on a missing-project screen.
   */
  it: {
    "xeri-gin-focaccia-beat": {
      title: "Xerí Gin — Focaccia & Beat",
      subtitle: "Cocktail, musica, gastronomia e community si incontrano in una brand experience pensata per avvicinare Xerí Gin al suo pubblico in modo contemporaneo, spontaneo e memorabile.",
      year: "2026",
      client: "Xerí Gin",
      location: "The Social Hub, Madrid",
      discipline: "Produzione eventi · Brand activation · Fotografia eventi",
      services: [
        "Produzione eventi",
        "Brand activation",
        "Direzione creativa e artistica",
        "Fotografia eventi",
        "Creazione di contenuti",
        "PR e comunicazione",
        "Contenuti social",
        "Branded content",
      ],
      intro:
        "Per Xerí Gin abbiamo realizzato una brand experience presso The Social Hub Madrid, unendo produzione eventi, direzione creativa, PR, fotografia e creazione di contenuti. L’obiettivo era trasformare l’identità del brand in un’esperienza reale, creando un contesto in cui prodotto, musica, gastronomia e community potessero convivere in modo coerente. Più che presentare un gin, abbiamo creato uno spazio in cui scoprirlo, condividerlo e associarlo a un preciso modo di vivere il momento.",
      sections: [
        {
          label: "Il brand dentro l’esperienza",
          body:
            "Invece di presentare Xerí Gin come un prodotto isolato, abbiamo integrato il brand all’interno dell’intera esperienza. Il bancone, il servizio, la musica, lo spazio e le interazioni tra gli ospiti hanno costruito un ambiente in cui l’identità di Xerí era sempre presente, senza risultare forzata. Una strategia di brand activation pensata per creare una connessione autentica tra prodotto, pubblico e contesto.",
        },
        {
          label: "Il rituale del cocktail",
          body:
            "Un’esperienza di marca vive anche nei piccoli gesti. La preparazione dei cocktail, il servizio, il ghiaccio, le bottiglie e il movimento dietro al bancone sono diventati parte della narrazione visiva. Abbiamo trasformato il rituale del cocktail in branded content, raccontando prodotto, lifestyle e personalità del brand attraverso immagini riconoscibili.",
        },
        {
          label: "Uno sguardo editoriale sull’evento",
          body:
            "La fotografia dell’evento è stata sviluppata con un approccio editoriale: momenti spontanei raccontati attraverso un’estetica curata. Luce, movimento, persone e dettagli si sono uniti per creare immagini coerenti con l’identità di Xerí Gin. Il risultato è una raccolta di fotografia eventi e branded content pensata per social media, comunicazione digitale e campagne future.",
        },
        {
          label: "L’evento continua nei contenuti",
          body:
            "Una brand experience non finisce quando termina l’evento. Abbiamo costruito una narrazione visiva capace di portare Focaccia & Beat anche sui canali digitali, trasformando l’esperienza in contenuti social, materiali PR, comunicazione di brand e asset per campagne future. Ogni immagine funziona singolarmente e allo stesso tempo contribuisce a costruire un universo visivo riconoscibile per Xerí.",
        },
        {
          label: "Il brand nel momento",
          body:
            "Volevamo che Xerí Gin fosse presente esattamente dove viveva l’esperienza: nei brindisi, nelle conversazioni, nella musica e negli incontri spontanei. Il prodotto è stato inserito in situazioni reali, collegando il brand a un modo di stare insieme, condividere e godersi il momento. Perché una brand activation efficace non si limita a mostrare un prodotto: crea un contesto di cui le persone vogliono far parte.",
        },
      ],
    },
    "ipa-brand-lionna": {
      title: "IPA Brand da Li-Onna",
      subtitle: "Un’esperienza di brand intima in cui moda, atmosfera e storytelling si incontrano nell’iconico salone rosso di Li-Onna, a Madrid.",
      year: "2025",
      client: "IPA Brand",
      location: "Li-Onna, Madrid",
      discipline: "Produzione eventi · Brand Experience · Fotografia",
      services: [
        "Produzione eventi",
        "Brand Experience",
        "Creazione di contenuti",
        "Fotografia",
      ],
      intro:
        "Per IPA Brand abbiamo creato un evento intimo costruito attorno alla sua identità visiva, all’atmosfera e alla connessione tra gli ospiti. Dallo styling della tavola ai più piccoli elementi di brand, ogni dettaglio faceva parte dello stesso universo.",
      sections: [
        {
          label: "Atmosfera",
          body:
            "Lo spazio ha definito il tono fin dal primo momento. Pareti rosse, velluto, luci calde e riflessi hanno creato un ambiente immersivo dalla forte identità visiva: elegante, audace e profondamente madrileno.",
        },
        {
          label: "La tavola del brand",
          body:
            "La tavola è diventata parte integrante dell’esperienza. Elementi IPA, immagini stampate, rose rosse e dettagli selezionati con cura si sono inseriti nello spazio creando un dialogo naturale tra moda, ambiente e ospiti.",
        },
        {
          label: "Dettagli",
          body:
            "L’identità emergeva nei piccoli gesti: una rosa sul rosso, le immagini distribuite sulla tavola, la texture del packaging, la posizione di ogni elemento. Dettagli capaci di dare carattere all’intera esperienza.",
        },
      ],
    },
    "bossa-nightlife-stills": {
      title: "Bossa — Nightlife Stills",
      subtitle: "Una serie fotografica nightlife che cattura l’energia, l’attitudine e l’identità visiva di Bossa da El Sol, a Madrid.",
      year: "2026",
      client: "Bossa",
      location: "El Sol, Madrid",
      discipline: "Fotografia · Contenuti evento · Nightlife",
      services: [
        "Fotografia",
        "Contenuti evento",
        "Nightlife",
        "Visual storytelling",
      ],
      intro:
        "Per Bossa abbiamo raccontato una notte da El Sol attraverso un linguaggio visivo diretto e atmosferico. Luce rossa, movimento, fumo e performance diventano il filo conduttore di una serie pensata per raccontare non solo ciò che è successo, ma soprattutto come si è vissuta la notte.",
      sections: [
        {
          label: "Luce rossa",
          body:
            "Il rosso diventa il linguaggio visivo della notte. Neon, luci di scena e ombre profonde costruiscono ogni immagine, creando un’atmosfera intensa, immersiva e immediatamente riconoscibile.",
        },
        {
          label: "DJ, pubblico e movimento",
          body:
            "L’energia nasce tra la console e la pista. DJ, silhouette, mani alzate e corpi in movimento si incontrano in immagini spontanee, immediate e vive.",
        },
        {
          label: "Il brand nello spazio",
          body:
            "L’identità di Bossa era già parte dell’ambiente. Logo, luci, pubblico e architettura convivono naturalmente, permettendo al brand di essere presente senza risultare costruito.",
        },
        {
          label: "Performance",
          body:
            "Oltre alla musica, la notte aveva un proprio linguaggio scenico. Costumi, gesti, personaggi, fumo e luce hanno creato momenti capaci di dare all’evento un’identità forte e riconoscibile.",
        },
        {
          label: "Nightlife Documentation",
          body:
            "La serie finale diventa un archivio visivo della notte: immagini pensate per conservarne l’energia, raccontarne l’identità e prolungare l’esperienza oltre il club.",
        },
      ],
    },
    "downhillitalia": {
      title: "Downhill Italia",
      subtitle: "Fotografia sportiva e contenuti visuali dal Campionato Italiano di Downhill, tra velocità, competizione e paesaggio alpino ad Aprica, in Valtellina.",
      year: "2026",
      client: "Downhill Italia",
      location: "Aprica, Valtellina — Italia",
      discipline: "Fotografia sportiva · Fotografia eventi · Social content",
      services: [
        "Fotografia sportiva",
        "Fotografia eventi",
        "Copertura della competizione",
        "Contenuti social",
        "Direzione visuale ed editoriale",
        "Branded content",
      ],
      intro:
        "Una giornata di gara raccontata dall’interno. Abbiamo seguito il Campionato Italiano di Downhill ad Aprica creando un racconto visivo capace di trasmettere velocità, energia e atmosfera della competizione. Fotografia sportiva e contenuti editoriali pensati sia per documentare l’evento sia per rafforzarne la presenza sui social media e sui canali digitali.",
      sections: [
        {
          label: "Prima della discesa",
          body:
            "La gara inizia molto prima del cancelletto di partenza. Biciclette, attrezzatura, preparazione e concentrazione costruiscono la tensione che precede ogni discesa. Uno sguardo ravvicinato ai dettagli e alle persone che definiscono la cultura del downhill.",
        },
        {
          label: "Sul tracciato",
          body:
            "Velocità, terra, radici e movimento. Abbiamo seguito i rider lungo il percorso creando immagini dinamiche capaci di raccontare l’intensità di ogni discesa senza perdere il legame con il paesaggio montano che caratterizza la competizione. Fotografia sportiva pensata per diventare contenuto editoriale, digitale e social.",
        },
        {
          label: "Il traguardo",
          body:
            "Dopo la velocità arriva l’emozione. La fatica, gli abbracci, il pubblico e le reazioni degli atleti completano il racconto della giornata. La fotografia lascia spazio al lato più umano dello sport, catturando i momenti che rendono un evento memorabile.",
        },
        {
          label: "L’evento come brand",
          body:
            "Un evento sportivo è anche un’esperienza di marca. Sponsor, identità del campionato e spazio dell’evento entrano naturalmente nel racconto fotografico, creando contenuti coerenti e riconoscibili per comunicazione, stampa, campagne digitali e social media.",
        },
      ],
    },
  },
};

// Italian. The client has signed off translations for four of the six
// case studies; those live in the `it` block above. The remaining two
// (Ramón Freixa, Backyard dello Specchio) fill in from English here, so
// switching to IT can never land on a missing project. Delete a slug
// from this fallback simply by adding it to `it`.
projects.it = { ...projects.en, ...projects.it };

export default projects;
