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
  { title: "Downhillitalia", slug: "downhillitalia", category: "Photo & Video", cover: "/images/work/downhillitalia/downhillitalia-01-water-splash-bw.webp" },
];

/**
 * Per-project media. Every entry is declared explicitly below — the old
 * generated map (PROJECT_HERO / PROJECT_GALLERY_SOURCE / buildGallery)
 * only ever fed the placeholder projects that shipped with the template
 * and went with them.
 */
export const PROJECT_IMAGES = {};

// IPA Brand at Li-Onna — manual override because the asset filenames
// are editorial slugs, not the {prefix}{1,2,3}.png pattern the gallery
// builder expects. Hero is the dinner table image; the 3 gallery items
// drive the three body sections in CaseStudy (atmosphere, brand table,
// details), in that order.
//
// The "Details / Closer in" section closes the case study with the
// interior loop instead of the editorial close detail still — same
// red-salon vocabulary but in motion. The clip carries the project's
// chromatic signature via .media-red-duotone (deep crimson grade by
// default, releases to natural footage on hover), mirroring the
// treatment used for the Xerí Gin bartender loop.
//
// ── Asset correction (client review) ──────────────────────────────────
// `event-07-ipa-exterior.png` was removed from this project and has now
// been refiled as
// `/images/work/ramon-freixa/ramon-freixa-01-glass-terrace-table.webp`.
// The frame is a glass-pergola garden terrace in daylight — a different
// venue from Li-Onna's red salon — and the Ramón Freixa material the
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
      alt: "IPA Brand at Li-Onna — interior loop inside the red salon",
      aspect: "aspect-[4/5]",
      grade: "red-duotone",
    },
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
  // Editorial slider replaces the stacked grid for the trailing
  // sequence — viewer drives the rhythm instead of scrolling through
  // five large frames. Order stays the same: runner portrait (with
  // glasses) opens, kids high-five closes.
  extraGalleryMode: "slider",
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
// and the video shows exactly that — narrative integration instead
// of a lone block at the end. It carries the project's chromatic
// signature via the .media-warm-duotone treatment (ruby/amber tint
// over grayscale by default, releases to natural footage on hover).
//
// extraGallery closes the case study with the bottles editorial as
// a centred full-bleed product moment — a beauty shot rather than a
// dangling video.
//
// Note on asset mapping: the brief referenced a separate
// `xeri-gin-02-bottles-editorial.png` for the brand/product slot.
// That file wasn't delivered — `xeri-gin-03-client.png` is the
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
      alt: "Xerí Gin — bartender preparing a cocktail at The Social Hub bar",
      aspect: "aspect-[4/5]",
      grade: "warm-duotone",
    },
    `${XERI_DIR}/xeri-gin-04-bar-service-editorial.png`,
    `${XERI_DIR}/xeri-gin-05-cocktail-preparation-menu.png`,
    `${XERI_DIR}/xeri-gin-03-client.png`,
  ],
};

// Bossa — Nightlife Stills. A short documentary photo series at El Sol,
// Madrid (techno night). MAIT did not organise the event — this entry
// represents photography / nightlife documentation only, so it lives in
// the photo-video category and the copy/discipline avoid any framing
// that would imply event production.
//
// Hero is the red neon sign frame — the strongest identity image. The
// four body sections each pair with one of the remaining four frames,
// closing on the wider DJ-booth-with-smoke landscape for editorial
// rhythm (mostly portrait stack → one horizontal release).
const BOSSA_DIR = "/images/work/bossa-nightlife-stills";
PROJECT_IMAGES["bossa-nightlife-stills"] = {
  hero: `${BOSSA_DIR}/bossa-01-neon-sign-editorial.png`,
  gallery: [
    `${BOSSA_DIR}/bossa-03-red-stage-silhouette.png`,
    `${BOSSA_DIR}/bossa-02-dj-silhouette-editorial.png`,
    // Brand-in-the-room frame — DJ from behind under the Bossa
    // signage. Bridges the booth/crowd moment and the staged
    // performance language by anchoring the identity to the
    // architecture itself.
    {
      src: `${BOSSA_DIR}/bossa-05-dj2.png`,
      alt: "Bossa — artist at the booth under the brand signage",
      aspect: "aspect-[3/2]",
    },
    `${BOSSA_DIR}/bossa-04-underground-performance-editorial.png`,
    {
      src: `${BOSSA_DIR}/bossa-05-dj-booth-smoke-editorial.png`,
      alt: "Bossa — DJ booth, smoke and El Sol signage",
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
      discipline: "Brand Activation · Event Content · Photography",
      year: "2026",
      // Grid cards crop to 4:5 portrait. The wide hero (1672×941) loses
      // too much vertical resolution at that crop and softens visibly;
      // the portrait detail (1086×1448) is native-fit and stays sharp.
      cover: "/images/work/xeri-gin-focaccia-beat/xeri-gin-01-product-detail.png",
    },
    {
      slug: "ipa-brand-lionna",
      title: "IPA Brand at Li-Onna",
      discipline: "Fashion event · Content capture · Brand experience",
      year: "2026",
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
    // frame that had been misfiled under Li-Onna — it lives here now.
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
    // Downhillitalia. Confirmed in-frame: the finish gate carries the
    // "downhill italia" mark alongside the FCI / UCI signage. Same
    // caveat as Ramón Freixa — no discipline/year until the copy exists,
    // so the card renders unlinked.
    {
      slug: "downhillitalia",
      title: "Downhillitalia",
      cover: "/images/work/downhillitalia/downhillitalia-01-water-splash-bw.webp",
    },
    {
      slug: "bossa-nightlife-stills",
      title: "Bossa — Nightlife Stills",
      discipline: "Event Photography · Nightlife · Visual Documentation",
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
      alt: "Ramón Freixa — the dressed table on the glass terrace",
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
      alt: "Downhillitalia — bike detail in the woods before a run",
      aspect: "aspect-[4/5]",
    },
    `${DH_DIR}/downhillitalia-01-water-splash-bw.webp`,
    {
      src: `${DH_DIR}/downhillitalia-03-finish-embrace-bw.webp`,
      alt: "Downhillitalia — riders embracing past the finish line",
      aspect: "aspect-[3/2]",
    },
    {
      src: `${DH_DIR}/downhillitalia-05-finish-gate.webp`,
      alt: "Downhillitalia — a rider crossing under the finish gate",
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
 * Visual support for /services/brand-experiences — Alena Angel Art.
 *
 * A real, client-authorised project (brand development and positioning,
 * PR, representation, new spaces for events/exhibitions). It is used as
 * VISUAL SUPPORT inside the Brand Experiences narrative only: no case
 * study, no embedded site, no portfolio section.
 *
 * Three frames, downloaded from alenaangelart.com with the client's
 * express authorisation and served locally (never hotlinked). Chosen for
 * fit with MAIT's direction — art, presentation, space, experience — and
 * against anything that reads as an ecommerce listing, a screenshot or a
 * 3D render, of which the source site has several.
 *
 * Layout reads as one wide anchor plus a pair: the stage performance
 * full width, then the two portraits side by side.
 *
 * While the array is empty the whole section renders NOTHING — no
 * placeholder boxes, no stand-in imagery, no empty gap.
 */
const ALENA_DIR = "/images/support/alena-angel-art";
export const BRAND_EXPERIENCE_SUPPORT = [
  {
    src: `${ALENA_DIR}/alena-angel-art-01-live-painting-stage.webp`,
    alt: "Alena Angel Art — live painting on stage in front of a seated audience",
    aspect: "aspect-[16/9]",
    span: "col-span-12",
  },
  {
    src: `${ALENA_DIR}/alena-angel-art-02-live-painting-fresco-hall.webp`,
    alt: "Alena Angel Art — painting live inside a frescoed historic hall",
    aspect: "aspect-[4/5]",
    span: "col-span-12 md:col-span-6",
  },
  {
    src: `${ALENA_DIR}/alena-angel-art-03-hand-painted-silk.webp`,
    alt: "Alena Angel Art — hand-painted silk piece worn against a sculpted white wall",
    aspect: "aspect-[4/5]",
    span: "col-span-12 md:col-span-6",
  },
];

/**
 * Every project, de-duplicated, in category order — the flat list behind
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
      subtitle:
        "A boutique gin activation built around craft cocktails, focaccia, music and social atmosphere at The Social Hub Madrid.",
      year: "2026",
      client: "Xerí Gin",
      location: "The Social Hub, Madrid",
      discipline: "Brand Activation · Event Content · Photography",
      services: [
        "Event content",
        "Brand activation",
        "Art direction",
        "Photography",
        "Short-form video",
        "Social content",
      ],
      intro:
        "Focaccia & Beat was a boutique brand activation for Xerí Gin at The Social Hub Madrid, designed around craft cocktails, focaccia, music and a relaxed social rhythm. The event created a natural setting for product discovery, bringing the brand into a warm, social and highly visual environment.",
      sections: [
        {
          label: "Brand in the room",
          body: "Rather than presenting the product in isolation, the activation placed Xerí Gin within a living hospitality context: bar service, conversation, food, music and spontaneous guest interaction. The visual direction focused on making the bottle feel present, desirable and integrated into the atmosphere of the event.",
        },
        {
          label: "Cocktail ritual",
          body: "The content captured the gestures of the bar: pouring, serving, garnishing and preparing the drinks. These small moments gave the project a tactile quality, turning the product into part of a ritual rather than a static object.",
        },
        {
          label: "Editorial event capture",
          body: "The photography approach balanced documentary energy with a polished editorial finish. Warm amber light, ruby tones, marble surfaces and subtle magenta accents created a visual language that felt intimate, premium and social.",
        },
        {
          label: "Social content system",
          body: "The resulting assets can work across a case study, website, social posts and short-form campaign material: product stills, bar details, bartender action, guest atmosphere and branded event moments.",
        },
        {
          label: "Brand impression",
          body: "A warm, image-led activation where product, hospitality and social energy came together in a compact but distinctive brand experience — the kind of moment a brand can keep using long after the night is over.",
        },
      ],
    },

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

    "bossa-nightlife-stills": {
      title: "Bossa — Nightlife Stills",
      subtitle:
        "A red-lit nightlife photography series documenting the underground atmosphere, DJ energy and performance moments of Bossa at El Sol.",
      year: "2026",
      client: "Bossa",
      location: "El Sol, Madrid",
      discipline: "Event Photography · Nightlife · Visual Documentation",
      services: [
        "Event photography",
        "Nightlife documentation",
        "Visual storytelling",
        "Editorial image direction",
        "Atmosphere capture",
      ],
      intro:
        "Bossa was documented as a short nightlife photography series at El Sol, capturing the atmosphere of a techno night through red neon, smoke, silhouettes and fragments of movement. The result is a compact visual record of the event’s underground mood: intense, dark and cinematic.",
      sections: [
        {
          label: "Red light language",
          body: "The visual direction was built around the existing light of the room: red neon, stage beams and deep shadow. Rather than over-lighting the scene, the photography preserves the darkness of the club and uses contrast, haze and signage as part of the composition.",
        },
        {
          label: "DJ, crowd and movement",
          body: "The series focuses on the relationship between the booth and the floor: the DJ seen from behind, the crowd as silhouettes, hands in motion and bodies partially revealed by light. The images keep the energy documentary while giving the event a polished editorial finish.",
        },
        {
          label: "Brand in the room",
          body: "Bossa's identity sits inside the architecture itself — signage framing the booth, the artist working under the mark, the warm red of the room embedding the name of the night into every frame. The brand isn't added on top; it's already part of the space.",
        },
        {
          label: "Performance atmosphere",
          body: "Beyond the music, Bossa carried a strong performance language. The images capture characters, textures and stage gestures that make the night feel specific rather than generic: masks, costumes, smoke, red beams and the visual pressure of the room.",
        },
        {
          label: "Nightlife documentation",
          body: "The final edit works as a focused nightlife archive: a set of atmospheric stills that can live across a portfolio case study, social content or event documentation, preserving the mood without over-explaining it.",
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






    // ⚠ PLACEHOLDER COPY — written by the studio to unblock the layout,
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
        "A private lunch service staged on the glass terrace that opens onto the restaurant's garden courtyard. The brief was quiet: let the house's own language — linen, porcelain, glass and green — carry the room, and record it without rearranging it.",
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

    // ⚠ PLACEHOLDER COPY — see the note above. Downhillitalia is a real
    // championship; none of this is client-supplied.
    "downhillitalia": {
      draft: true,
      title: "Downhillitalia",
      subtitle:
        "Race-day documentary from the Italian downhill championship, shot on the wooded track above Aprica, Valtellina.",
      year: "2026",
      client: "Downhillitalia",
      location: "Aprica, Valtellina — Italy",
      discipline: "Sport documentary · Event photography",
      services: [
        "Event photography",
        "Sport documentary",
        "Race-day coverage",
        "Editorial image direction",
        "Social content",
      ],
      intro:
        "A day on the mountain following the Italian downhill championship — from the pits and the first practice runs to the last rider through the finish gate. The set is built to work as a race archive and as social content in the same edit.",
      sections: [
        {
          label: "Before the run",
          body: "The day starts in the woods above the start hut: mud on the fork stanchions, a race plate zip-tied to the bars, helmets waiting on tailgates. Shot close and shallow, these frames give the day its texture before any speed appears.",
        },
        {
          label: "On the track",
          body: "The track drops through pine and hardpack, crossing water and root sections between the tape. Working from the outside of the turns, the coverage keeps the rider sharp against a moving background so the images read fast without becoming abstract.",
        },
        {
          label: "The finish",
          body: "Past the gate the race becomes people again — the exhale, the embrace, the crowd against the barrier. This part of the edit runs in black and white: it separates the human moments from the colour of the sponsor tape without softening them.",
        },
        {
          label: "The event as a brand",
          body: "The finish structure carries the championship's own identity alongside the federation marks and the valley's sponsors. Framing the arch as architecture rather than signage lets the event look like itself in every frame.",
        },
      ],
    },
  },

  es: {
    "xeri-gin-focaccia-beat": {
      title: "Xerí Gin — Focaccia & Beat",
      subtitle:
        "Una activación boutique de ginebra construida alrededor de cócteles de autor, focaccia, música y atmósfera social en The Social Hub Madrid.",
      year: "2026",
      client: "Xerí Gin",
      location: "The Social Hub, Madrid",
      discipline: "Activación de marca · Contenido de evento · Fotografía",
      services: [
        "Contenido de evento",
        "Activación de marca",
        "Dirección de arte",
        "Fotografía",
        "Vídeo short-form",
        "Contenido social",
      ],
      intro:
        "Focaccia & Beat fue una activación de marca boutique para Xerí Gin en The Social Hub Madrid, diseñada alrededor de cócteles de autor, focaccia, música y un ritmo social relajado. El evento creó un escenario natural para el descubrimiento de producto, llevando la marca a un entorno cálido, social y altamente visual.",
      sections: [
        {
          label: "La marca en la sala",
          body: "En lugar de presentar el producto de forma aislada, la activación situó Xerí Gin dentro de un contexto vivo de hospitalidad: servicio de barra, conversación, comida, música e interacción espontánea entre los invitados. La dirección visual buscó que la botella se sintiera presente, deseable e integrada en la atmósfera del evento.",
        },
        {
          label: "Ritual del cóctel",
          body: "El contenido capturó los gestos de la barra: servir, decorar, preparar y compartir los cócteles. Esos pequeños momentos dieron al proyecto una cualidad táctil, convirtiendo el producto en parte de un ritual más que en un objeto estático.",
        },
        {
          label: "Captura editorial del evento",
          body: "El enfoque fotográfico equilibró energía documental con un acabado editorial pulido. Luz ámbar cálida, tonos rubí, superficies de mármol y sutiles acentos magenta crearon un lenguaje visual íntimo, premium y social.",
        },
        {
          label: "Sistema de contenido social",
          body: "Los activos resultantes funcionan a través de un case study, web, posts sociales y material short-form de campaña: stills de producto, detalles de barra, acción de barman, atmósfera de invitados y momentos de marca dentro del evento.",
        },
        {
          label: "Impresión de marca",
          body: "Una activación cálida y construida desde la imagen, donde producto, hospitalidad y energía social se encontraron en una experiencia de marca compacta y distinta — el tipo de momento que una marca puede seguir usando mucho después de que la noche termine.",
        },
      ],
    },

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

    "bossa-nightlife-stills": {
      title: "Bossa — Nightlife Stills",
      subtitle:
        "Una serie fotográfica nocturna en luz roja que documenta la atmósfera underground, la energía del DJ y los momentos de performance de Bossa en El Sol.",
      year: "2026",
      client: "Bossa",
      location: "El Sol, Madrid",
      discipline: "Fotografía de evento · Nightlife · Documentación visual",
      services: [
        "Fotografía de evento",
        "Documentación de nightlife",
        "Narrativa visual",
        "Dirección de imagen editorial",
        "Captura de atmósfera",
      ],
      intro:
        "Bossa fue documentado como una serie fotográfica nocturna en El Sol, capturando la atmósfera de una noche techno a través del neón rojo, el humo, las siluetas y los fragmentos de movimiento. El resultado es un registro visual compacto del ambiente underground del evento: intenso, oscuro y cinematográfico.",
      sections: [
        {
          label: "Lenguaje de luz roja",
          body: "La dirección visual se construyó a partir de la luz existente en la sala: neón rojo, haces de escenario y sombra profunda. En lugar de sobreiluminar la escena, la fotografía preserva la oscuridad del club y utiliza el contraste, la bruma y la cartelería como parte de la composición.",
        },
        {
          label: "DJ, público y movimiento",
          body: "La serie se centra en la relación entre la cabina y la pista: el DJ visto de espaldas, el público en siluetas, manos en movimiento y cuerpos parcialmente revelados por la luz. Las imágenes mantienen la energía documental dándole al evento un acabado editorial cuidado.",
        },
        {
          label: "La marca en la sala",
          body: "La identidad de Bossa vive dentro de la propia arquitectura — la cartelería enmarcando la cabina, el artista trabajando bajo la marca, el rojo cálido de la sala incrustando el nombre de la noche en cada plano. La marca no se añade encima; ya forma parte del espacio.",
        },
        {
          label: "Atmósfera de performance",
          body: "Más allá de la música, Bossa traía un lenguaje fuerte de performance. Las imágenes capturan personajes, texturas y gestos de escenario que hacen que la noche se sienta específica y no genérica: máscaras, vestuario, humo, haces rojos y la presión visual de la sala.",
        },
        {
          label: "Documentación de nightlife",
          body: "La edición final funciona como un archivo nocturno enfocado: un conjunto de stills atmosféricos que pueden vivir entre un case study de portfolio, contenido social o documentación de evento, preservando el ambiente sin sobreexplicarlo.",
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






    // ⚠ COPY PROVISIONAL — redactado por el estudio para desbloquear el
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
        "Un servicio privado montado en la terraza acristalada que se abre al patio ajardinado del restaurante. El encargo era discreto: dejar que el lenguaje de la casa — lino, porcelana, cristal y verde — sostuviera la sala, y registrarlo sin recolocar nada.",
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

    // ⚠ COPY PROVISIONAL — ver la nota anterior.
    "downhillitalia": {
      draft: true,
      title: "Downhillitalia",
      subtitle:
        "Documental de jornada de carrera en el campeonato italiano de downhill, en el trazado boscoso sobre Aprica, Valtellina.",
      year: "2026",
      client: "Downhillitalia",
      location: "Aprica, Valtellina — Italia",
      discipline: "Documental deportivo · Fotografía de evento",
      services: [
        "Fotografía de evento",
        "Documental deportivo",
        "Cobertura de jornada",
        "Dirección de imagen editorial",
        "Contenido social",
      ],
      intro:
        "Un día en la montaña siguiendo el campeonato italiano de downhill — del box y las primeras bajadas de entrenamiento al último corredor bajo el arco de meta. El conjunto está pensado para funcionar a la vez como archivo de carrera y como contenido social.",
      sections: [
        {
          label: "Antes de bajar",
          body: "El día empieza en el bosque, sobre la cabaña de salida: barro en las botellas de la horquilla, el dorsal atado al manillar, cascos esperando sobre los portones. Fotografiados de cerca y con poca profundidad, estos planos dan textura a la jornada antes de que aparezca la velocidad.",
        },
        {
          label: "En el trazado",
          body: "El trazado cae entre pinos y tierra dura, cruzando tramos de agua y raíces entre las cintas. Trabajando desde el exterior de las curvas, la cobertura mantiene al corredor nítido sobre un fondo en movimiento: las imágenes se leen rápidas sin volverse abstractas.",
        },
        {
          label: "La meta",
          body: "Pasado el arco la carrera vuelve a ser gente — el resoplido, el abrazo, el público contra la valla. Esta parte de la edición va en blanco y negro: separa los momentos humanos del color de las cintas publicitarias sin suavizarlos.",
        },
        {
          label: "El evento como marca",
          body: "La estructura de meta lleva la identidad propia del campeonato junto a las marcas federativas y los patrocinadores del valle. Encuadrar el arco como arquitectura, y no como cartelería, deja que el evento se parezca a sí mismo en cada plano.",
        },
      ],
    },
  },
};

// Italian — case-study long copy has NOT been translated yet (it must be
// signed off before publication), so `it` reads the English set. Add an
// `it` object here, mirroring `en`, when the translations land.
projects.it = projects.en;

export default projects;
