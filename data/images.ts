/**
 * Every photograph on the site, in one map.
 *
 * The design is photo-led — sections are anchored by images rather than by icon
 * cards — so this file is the single lever that swaps the whole look. Replace a
 * `src` here and the component that renders it never changes.
 *
 * Current sources are free Unsplash stock served from their CDN and optimised
 * by next/image (see `images.remotePatterns` in next.config.ts). They are
 * PLACEHOLDERS. Every one of them should be replaced with the client's own
 * work before launch — real photos of real jobs outperform the best stock,
 * because they are his.
 *
 * To move to local photos: drop files in `public/photos/` and change each src
 * to "/photos/whatever.jpg". The remotePatterns entry can then be deleted.
 *
 * Grading note: the set is picked for one consistent look — cool daylight,
 * white and pale-timber interiors, no yellow cast. Mixed grading is the fastest
 * way to make a site look cheap, so match that when swapping images in.
 */
export type SiteImage = {
  src: string;
  alt: string;
};

function unsplash(id: string, width = 1600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70`;
}

export const images = {
  /** Full-bleed hero. Wants a wide, bright frame with a person mid-clean. */
  hero: {
    src: unsplash("photo-1758273705627-937374bfa978", 2000),
    alt: "A cleaner vacuuming the floor of a bright, sunlit living room",
  },
  /** Weekly contract band. */
  contract: {
    src: unsplash("photo-1758272421516-9593de0fb5bf"),
    alt: "A cleaner working through the floor of a modern living room",
  },
  /** Trust band — hands and gloves, close to the work. */
  trust: {
    src: unsplash("photo-1758273705723-26ef454252ce"),
    alt: "A cleaner in yellow gloves wiping down a timber table",
  },
  /** Service areas band. */
  areas: {
    src: unsplash("photo-1772325482422-55bc8dd65662"),
    alt: "Aerial view of a Sydney suburban street lined with houses",
  },
  /** Closing call-to-action band. */
  cta: {
    src: unsplash("photo-1563453392212-326f5e854473", 2000),
    alt: "A gloved hand holding a spray bottle of cleaning solution",
  },
} satisfies Record<string, SiteImage>;

/** Per-service photography, keyed by service slug. */
export const serviceImages: Record<string, SiteImage> = {
  "residential-cleaning": {
    src: unsplash("photo-1769063238167-d00e112147c0"),
    alt: "A bright, freshly cleaned living room with a white sofa and large window",
  },
  "weekly-cleaning-contracts": {
    src: unsplash("photo-1682888813913-e13f18692019"),
    alt: "A spotless modern kitchen with a marble island and white cabinetry",
  },
  "end-of-lease-cleaning": {
    src: unsplash("photo-1630699376289-b62375a35505"),
    alt: "An empty apartment with clean parquet floors and bare white walls",
  },
  "airbnb-short-stay-cleaning": {
    src: unsplash("photo-1549638441-b787d2e11f14"),
    alt: "A freshly made bed with crisp white linen beside a sunlit window",
  },
  "commercial-cleaning": {
    src: unsplash("photo-1762008312967-beaf3f59984e"),
    alt: "A modern office interior lit up after hours",
  },
};

/**
 * The three process steps. Photographs, not icons — a picture of someone
 * actually mopping earns more trust than a tick in a circle.
 */
export const stepImages: SiteImage[] = [
  {
    src: unsplash("photo-1759903553690-88a7a0574953", 1200),
    alt: "A person on the phone beside a sunlit window, booking a clean",
  },
  {
    src: unsplash("photo-1758273238415-01ec03d9ef27", 1200),
    alt: "A cleaner mopping the floor of a bright modern living room",
  },
  {
    src: unsplash("photo-1618221195710-dd6b41faaea6", 1200),
    alt: "A finished living room, tidy and bright, ready to walk back into",
  },
];

/**
 * Before / after comparisons.
 *
 * IMPORTANT — these are not genuine pairs. Stock libraries do not carry the
 * same room shot twice from the same position, so each pair is two different
 * rooms of the same type, matched as closely as the set allows. They show the
 * client what the component does; they must be replaced with real matched pairs
 * before this section goes live, or it is a claim the photos do not support.
 *
 * Shot list for the client: stand in one spot, photograph the room before the
 * clean, then photograph it again from the exact same spot afterwards. Three
 * rooms minimum. Do not move between the two shots.
 */
export type Comparison = {
  caption: string;
  before: SiteImage;
  after: SiteImage;
};

export const comparisons: Comparison[] = [
  {
    caption: "Kitchen deep clean — Penrith",
    before: {
      src: unsplash("photo-1706486540578-1913e17f374d", 1200),
      alt: "Before: a kitchen sink stacked with unwashed dishes",
    },
    after: {
      src: unsplash("photo-1610276173132-c47d148ab626", 1200),
      alt: "After: a clear white kitchen bench and empty sink",
    },
  },
  {
    caption: "Living room reset — Parramatta",
    before: {
      src: unsplash("photo-1760914939645-ee0c5efa5c1e", 1200),
      alt: "Before: a living room with throws and clutter across the couch and table",
    },
    after: {
      src: unsplash("photo-1673563932832-a0c9e0ed26f8", 1200),
      alt: "After: the same style of living room, tidied and vacuumed",
    },
  },
  {
    caption: "Bathroom detail — Blacktown",
    before: {
      src: unsplash("photo-1737372805905-be0b91ec86fb", 1200),
      alt: "Before: gloves and a sponge sitting on the edge of a bath mid-clean",
    },
    after: {
      src: unsplash("photo-1771929662486-f793e08f0f16", 1200),
      alt: "After: a spotless bathroom with a clear glass shower screen",
    },
  },
];

/**
 * Page hero photography, keyed by route. Every inner page opens on an image —
 * a bare heading on a flat colour is the template look this rebuild exists to
 * get away from.
 */
export const pageImages: Record<string, SiteImage> = {
  services: {
    src: unsplash("photo-1758523670739-0d26a3ee976d", 2000),
    alt: "A cleaner vacuuming a bright, modern living room",
  },
  areas: {
    src: unsplash("photo-1698032122497-38d6b8a8f353", 2000),
    alt: "Aerial view of Sydney, the city meeting the water",
  },
  about: {
    src: unsplash("photo-1740657254989-42fe9c3b8cce", 2000),
    alt: "A cleaner in protective gloves washing a tiled floor",
  },
  contact: {
    src: unsplash("photo-1758520144864-fb42371d9e60", 2000),
    alt: "Someone taking a phone call at a desk",
  },
  quote: {
    src: unsplash("photo-1749214317455-efbdd57df844", 2000),
    alt: "Cleaning solution being measured into a mop bucket",
  },
  brand: {
    src: unsplash("photo-1592506119503-c0b18879bd5a", 2000),
    alt: "A bright kitchen with pale timber and white cabinetry",
  },
};
