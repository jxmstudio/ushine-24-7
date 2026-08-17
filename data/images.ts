/**
 * Every photograph on the site, in one map.
 *
 * The design is photo-led — the photograph is the layout — so this file is the
 * single lever that swaps the whole look. Replace a `src` here and the
 * component that renders it never changes.
 *
 * Current sources are free Unsplash stock served from their CDN and optimised
 * by next/image (see `images.remotePatterns` in next.config.ts). They are
 * PLACEHOLDERS. Every one of them should be replaced with the client's own
 * work before launch — real photos of real jobs outperform the best stock,
 * because they are his.
 *
 * To move to local photos: drop files in `public/photos/` and change each
 * image to `{ src: "/photos/whatever.jpg", alt: "…" }`. The remotePatterns
 * entry can then be deleted; `blurDataURL` is optional and can be dropped.
 *
 * GRADE: every URL carries the same slight desaturation, lift and softened
 * contrast so stock from different photographers reads as one brand. Mixed
 * grading is the fastest way to make a site look cheap. Drop the GRADE
 * constant when real photography lands — real jobs shot on one phone will
 * already match.
 *
 * Blur placeholders are generated — run `node scripts/generate-blurs.mjs`
 * after changing any image ID and commit the refreshed data/blur-placeholders.ts.
 */
import { blurs } from "./blur-placeholders";

export type SiteImage = {
  src: string;
  alt: string;
  blurDataURL?: string;
};

const GRADE = "sat=-12&bri=4&con=-3";

/**
 * Spread into a next/image that renders a SiteImage, e.g.
 * `<Image src={photo.src} alt={photo.alt} {...blurProps(photo)} fill />`.
 * Local photos without a generated placeholder degrade to no blur.
 */
export function blurProps(image: SiteImage) {
  return image.blurDataURL
    ? { placeholder: "blur" as const, blurDataURL: image.blurDataURL }
    : {};
}

function img(id: string, alt: string, width = 1600): SiteImage {
  return {
    src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70&${GRADE}`,
    alt,
    blurDataURL: blurs[id],
  };
}

export const images = {
  /**
   * Full-bleed hero poster. Wants a wide, bright frame with a person
   * mid-clean — it is the LCP element and what reduced-motion visitors and
   * slow connections keep, so it has to stand on its own without the video.
   */
  hero: img(
    "photo-1758273705627-937374bfa978",
    "A cleaner vacuuming the floor of a bright, sunlit living room",
    2000,
  ),
  /** Weekly contract band. */
  contract: img(
    "photo-1758272421516-9593de0fb5bf",
    "A cleaner working through the floor of a modern living room",
  ),
  /** Trust band — hands and gloves, close to the work. */
  trust: img(
    "photo-1758273705723-26ef454252ce",
    "A cleaner in yellow gloves wiping down a timber table",
  ),
  /** Service areas band. */
  areas: img(
    "photo-1772325482422-55bc8dd65662",
    "Aerial view of a Sydney suburban street lined with houses",
  ),
  /** Closing call-to-action band. */
  cta: img(
    "photo-1563453392212-326f5e854473",
    "A gloved hand holding a spray bottle of cleaning solution",
    2000,
  ),
} satisfies Record<string, SiteImage>;

/**
 * Homepage hero video — a cleaner working through a bright home, looped.
 *
 * Free Mixkit stock served from their CDN, ~9MB at 720p, which is the right
 * weight for a muted background loop (the 1080 cut is 100MB+ — do not "upgrade"
 * it). A PLACEHOLDER like every photograph here: replace with the client's own
 * footage before launch. To go local, drop a file in `public/` and point `src`
 * at it; keep it under ~10MB and 720p.
 *
 * The poster is the hero photograph above — it renders first via next/image,
 * stays up for reduced-motion visitors, and the video fades in over it once
 * it can actually play.
 */
export const heroVideo = {
  src: "https://assets.mixkit.co/videos/43376/43376-720.mp4",
  poster: images.hero,
};

/** Per-service hero photography, keyed by service slug. */
export const serviceImages: Record<string, SiteImage> = {
  "residential-cleaning": img(
    "photo-1769063238167-d00e112147c0",
    "A bright, freshly cleaned living room with a white sofa and large window",
  ),
  "weekly-cleaning-contracts": img(
    "photo-1682888813913-e13f18692019",
    "A spotless modern kitchen with a marble island and white cabinetry",
  ),
  "end-of-lease-cleaning": img(
    "photo-1630699376289-b62375a35505",
    "An empty apartment with clean parquet floors and bare white walls",
  ),
  "airbnb-short-stay-cleaning": img(
    "photo-1549638441-b787d2e11f14",
    "A freshly made bed with crisp white linen beside a sunlit window",
  ),
  "commercial-cleaning": img(
    "photo-1762008312967-beaf3f59984e",
    "A modern office interior lit up after hours",
  ),
};

/**
 * Per-service galleries — four working shots per service, shown as a
 * full-bleed photo band on the service page. Same rule as everywhere else:
 * hands, rooms and equipment, never a handshake or a headset.
 */
export const serviceGalleries: Record<string, SiteImage[]> = {
  "residential-cleaning": [
    img(
      "photo-1686178827149-6d55c72d81df",
      "A cleaner in gloves vacuuming upholstery in a bright living room",
      1200,
    ),
    img(
      "photo-1581578949510-fa7315c4c350",
      "A cleaner damp-mopping the entryway floor of a home",
      1200,
    ),
    img(
      "photo-1556910638-6cdac31d44dc",
      "A cleaner working at a white kitchen sink",
      1200,
    ),
    img(
      "photo-1583847268964-b28dc8f51f92",
      "A tidy, light-filled living room after a clean",
      1200,
    ),
  ],
  "weekly-cleaning-contracts": [
    img(
      "photo-1758272422189-b10f36fd4ddd",
      "A regular cleaner mopping the living room floor on a scheduled visit",
      1200,
    ),
    img(
      "photo-1759846866217-e627e4478f82",
      "Cleaning supplies and tools laid out on a kitchen counter",
      1200,
    ),
    img(
      "photo-1580256081112-e49377338b7f",
      "A cleaning kit ready to start in an apartment hallway",
      1200,
    ),
    img(
      "photo-1556912173-3bb406ef7e77",
      "A maintained family kitchen, clean and reset",
      1200,
    ),
  ],
  "end-of-lease-cleaning": [
    img(
      "photo-1757742690834-aa581b9f53b2",
      "An empty rental room cleaned and ready for inspection",
      1200,
    ),
    img(
      "photo-1762810951632-68c9f197cf33",
      "An empty white apartment with a wall of windows over the city",
      1200,
    ),
    img(
      "photo-1623114112815-74a4b9fe505d",
      "A white gas range and oven cleaned for the exit inspection",
      1200,
    ),
    img(
      "photo-1552321554-5fefe8c9ef14",
      "A white pedestal basin detailed to bond-clean standard",
      1200,
    ),
  ],
  "airbnb-short-stay-cleaning": [
    img(
      "photo-1597308451192-d17c89701ef5",
      "Crisp white linen made up for the next guest",
      1200,
    ),
    img(
      "photo-1616663717839-2fea42e1a1f6",
      "A fresh white towel folded over the edge of the bathtub",
      1200,
    ),
    img(
      "photo-1639690222869-1e608aa51f82",
      "Sunlight falling across freshly laundered linen",
      1200,
    ),
    img(
      "photo-1596683705523-eb49540c3934",
      "A clean white towel hung on the rail before check-in",
      1200,
    ),
  ],
  "commercial-cleaning": [
    img(
      "photo-1497366754035-f200968a6e72",
      "An office hallway, cleaned after hours",
      1200,
    ),
    img(
      "photo-1437326300822-01d8f13c024f",
      "A cleaner working along the wall of a commercial space",
      1200,
    ),
    img(
      "photo-1549637642-90187f64f420",
      "Empty workstations ready for the morning after an overnight clean",
      1200,
    ),
    img(
      "photo-1601160458000-2b11f9fa1a0e",
      "Cleaning in progress across an office floor",
      1200,
    ),
  ],
};

/**
 * The three process steps. Photographs, not icons — a picture of someone
 * actually mopping earns more trust than a tick in a circle.
 */
export const stepImages: SiteImage[] = [
  img(
    "photo-1759903553690-88a7a0574953",
    "A person on the phone beside a sunlit window, booking a clean",
    1200,
  ),
  img(
    "photo-1758273238415-01ec03d9ef27",
    "A cleaner mopping the floor of a bright modern living room",
    1200,
  ),
  img(
    "photo-1618221195710-dd6b41faaea6",
    "A finished living room, tidy and bright, ready to walk back into",
    1200,
  ),
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
    before: img(
      "photo-1706486540578-1913e17f374d",
      "Before: a kitchen sink stacked with unwashed dishes",
      1200,
    ),
    after: img(
      "photo-1610276173132-c47d148ab626",
      "After: a clear white kitchen bench and empty sink",
      1200,
    ),
  },
  {
    caption: "Living room reset — Parramatta",
    before: img(
      "photo-1760914939645-ee0c5efa5c1e",
      "Before: a living room with throws and clutter across the couch and table",
      1200,
    ),
    after: img(
      "photo-1673563932832-a0c9e0ed26f8",
      "After: the same style of living room, tidied and vacuumed",
      1200,
    ),
  },
  {
    caption: "Bathroom detail — Blacktown",
    before: img(
      "photo-1737372805905-be0b91ec86fb",
      "Before: gloves and a sponge sitting on the edge of a bath mid-clean",
      1200,
    ),
    after: img(
      "photo-1771929662486-f793e08f0f16",
      "After: a spotless bathroom with a clear glass shower screen",
      1200,
    ),
  },
];

/**
 * Page hero photography, keyed by route. Every inner page opens on an image —
 * a bare heading on a flat colour is the template look this rebuild exists to
 * get away from.
 */
export const pageImages: Record<string, SiteImage> = {
  services: img(
    "photo-1758523670739-0d26a3ee976d",
    "A cleaner vacuuming a bright, modern living room",
    2000,
  ),
  areas: img(
    "photo-1698032122497-38d6b8a8f353",
    "Aerial view of Sydney, the city meeting the water",
    2000,
  ),
  about: img(
    "photo-1740657254989-42fe9c3b8cce",
    "A cleaner in protective gloves washing a tiled floor",
    2000,
  ),
  contact: img(
    "photo-1758520144864-fb42371d9e60",
    "Someone taking a phone call at a desk",
    2000,
  ),
  quote: img(
    "photo-1749214317455-efbdd57df844",
    "Cleaning solution being measured into a mop bucket",
    2000,
  ),
  brand: img(
    "photo-1592506119503-c0b18879bd5a",
    "A bright kitchen with pale timber and white cabinetry",
    2000,
  ),
};
