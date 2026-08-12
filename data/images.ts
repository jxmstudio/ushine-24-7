/**
 * Placeholder photography.
 *
 * These are free stock images from Unsplash, served from their CDN and
 * optimised by next/image (see `images.remotePatterns` in next.config.ts).
 * They exist to show the client what the site looks like with real pictures in
 * it — swap each `src` for a photo of their own team and finished jobs and
 * nothing else needs to change.
 *
 * To move to local photos: drop files in `public/photos/` and change the src to
 * "/photos/whatever.jpg". The remote config can then be deleted.
 */
export type SiteImage = {
  src: string;
  alt: string;
};

function unsplash(id: string, width = 1400) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70`;
}

export const images = {
  hero: {
    src: unsplash("photo-1686178827149-6d55c72d81df", 1200),
    alt: "A cleaner vacuuming an upholstered ottoman in a bright living room",
  },
  about: {
    src: unsplash("photo-1740657254989-42fe9c3b8cce"),
    alt: "A cleaner in protective gloves washing a tiled floor",
  },
  contract: {
    src: unsplash("photo-1647381518264-97ff1835026f"),
    alt: "A cleaner standing in a tidy kitchen holding a broom",
  },
  quote: {
    src: unsplash("photo-1563453392212-326f5e854473", 1000),
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
