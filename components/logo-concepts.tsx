/**
 * Three logo directions for the client to choose from.
 *
 * The previous set was three variations on one idea — a U-arc inside a rounded
 * tile — drawn for the old navy palette. Three versions of the same thing is
 * not a choice, so these deliberately occupy different territories: a symbol,
 * a letterform and a numeral. Whichever wins, the other two should be genuinely
 * rejected rather than merged.
 *
 * Two constraints every mark here respects:
 *
 *  - **Flat fills, no gradients.** A gradient needs an `id`, and these render
 *    several times on the review page, so the ids collide and every instance
 *    picks up the first one's colours. Flat two-tone also prints and embroiders
 *    properly, which a gradient does not.
 *  - **A one-colour variant.** Every mark has to survive a van decal, a rubber
 *    stamp, a fax-quality invoice and a shirt. If it only works in full colour
 *    it is an illustration, not a logo — hence the `mono` prop on each.
 */

type MarkProps = {
  className?: string;
  /** Single-colour version: draws in `currentColor` for print and embroidery. */
  mono?: boolean;
};

/**
 * How a mark colours its dominant shape.
 *
 * `brand` is the reviewed artwork — fixed aqua. `adaptive` swaps that shape to
 * `currentColor` so the mark stays strong on whatever it sits on, which the
 * live lockup needs: the header is light when scrolled and dark while floating
 * over the hero, and the footer is darker still. Aqua measures 2.2:1 against
 * the mist canvas, so a fixed-aqua mark reads washed out in the light header at
 * 44px. The lime accent is constant either way — it is the part carrying the
 * brand.
 */
type Tone = "brand" | "adaptive";

/* ------------------------------------------------------------------ concept A */

/** The four-point gleam, used at two scales. */
const SPARKLE =
  "M24 3C25.8 14.4 33.6 22.2 45 24C33.6 25.8 25.8 33.6 24 45C22.2 33.6 14.4 25.8 3 24C14.4 22.2 22.2 14.4 24 3Z";

/**
 * A — "The Gleam". No letterform at all: two four-point sparkles at different
 * scales, the small one lime. The silhouette alone is the mark. This is the
 * live logo.
 *
 * Geometry: the source path is centred at 24 with a half-extent of 21, so each
 * sparkle's placement is `translate(centre - 24 × scale) scale(...)`. Sized so
 * the pair spans roughly 1.8–44 of the 48-unit box — margin on every edge, no
 * clipping at the top.
 */
export function ConceptGleam({
  className,
  mono,
  tone = "brand",
}: MarkProps & { tone?: Tone }) {
  const primary = mono
    ? "currentColor"
    : tone === "adaptive"
      ? "currentColor"
      : "var(--aqua)";

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Ushine 24/7 — the Gleam mark"
    >
      <g transform="translate(-0.68 -0.68) scale(0.82)">
        <path d={SPARKLE} fill={primary} />
      </g>
      <g transform="translate(26.88 25.88) scale(0.38)">
        <path d={SPARKLE} fill={mono ? "currentColor" : "var(--lime)"} />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ concept B */

/**
 * B — "Day & Night". The U split down the middle: aqua for the daytime half,
 * deep teal for the night half, with a lime tip for the light that never goes
 * off. It says 24/7 without drawing a clock, which every competitor does.
 *
 * Built as two half-strokes rather than a clipped whole, so there is no `id` to
 * collide. The two round end-caps meet at the same point and compose into a
 * single clean curve at the bottom of the bowl.
 */
export function ConceptDayNight({ className, mono }: MarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Ushine 24/7 — the Day and Night mark"
    >
      <g fill="none" strokeWidth="8.5" strokeLinecap="round">
        {/* Left stem sweeping into the bottom of the bowl. */}
        <path
          d="M12 10.5v13a12 12 0 0 0 12 12"
          stroke={mono ? "currentColor" : "var(--aqua)"}
        />
        {/* Right stem, mirrored. */}
        <path
          d="M36 10.5v13a12 12 0 0 1-12 12"
          stroke={mono ? "currentColor" : "var(--deep-teal)"}
        />
      </g>
      {/* The light that stays on. Dropped in mono — a lighter dot inside a
          solid tip is not reproducible in one colour. */}
      {mono ? null : <circle cx="36" cy="10.5" r="3.4" fill="var(--lime)" />}
    </svg>
  );
}

/* ------------------------------------------------------------------ concept C */

/**
 * C — "The Numerals". The availability is the business, so the numerals are the
 * logo. This is the mark that agrees with the site, where an oversized lime
 * 24/7 already recurs as a graphic device.
 *
 * Set in Bricolage. For production it would be converted to outlines so the
 * mark does not depend on a webfont loading — that matters for the favicon and
 * for anything a printer touches.
 */
export function ConceptNumerals({ className, mono }: MarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="Ushine 24/7 — the Numerals mark"
    >
      {/* In one colour the badge inverts: drop the filled tile and draw the
          numerals themselves, so the mark never depends on knowing what colour
          it is sitting on. */}
      {mono ? null : (
        <rect width="48" height="48" rx="13" fill="var(--deep-teal)" />
      )}
      <text
        x="24"
        y="21"
        textAnchor="middle"
        fontSize="17"
        fontWeight="800"
        className="font-heading"
        fill={mono ? "currentColor" : "var(--mist)"}
      >
        24
      </text>
      <path
        d="M12.5 27.5 35.5 22"
        fill="none"
        stroke={mono ? "currentColor" : "var(--lime)"}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text
        x="24"
        y="41"
        textAnchor="middle"
        fontSize="17"
        fontWeight="800"
        className="font-heading"
        fill={mono ? "currentColor" : "var(--lime)"}
      >
        7
      </text>
    </svg>
  );
}

export const logoConcepts = [
  {
    id: "A",
    name: "The Gleam",
    Component: ConceptGleam,
    note: "Two sparkles, no letterform. Reads as 'clean' instantly and survives at 16px better than anything with a letter in it. Chosen — this is live on the site.",
    against:
      "The sparkle is the category cliché — it is also the stock icon every cleaning site uses. Bare and two-tone it reads as a brand mark rather than an icon, but it is the least ownable of the three. Worth registering early if the name is ever trademarked.",
  },
  {
    id: "B",
    name: "Day & Night",
    Component: ConceptDayNight,
    note: "The U split into a light half and a dark half, with a lime tip. Encodes the 24/7 promise without drawing a clock, and it is still a monogram, so it works as an avatar and a favicon.",
    against:
      "The split needs enough size to read — below about 20px it flattens into a plain two-tone U. Its dark half also disappears against the hero photography, which would have needed a second colourway to fix. Not taken.",
  },
  {
    id: "C",
    name: "The Numerals",
    Component: ConceptNumerals,
    note: "The availability is the whole proposition, so the numerals become the mark. Agrees with the site, where an oversized lime 24/7 already recurs as a divider.",
    against:
      "Locks the brand to the '24/7' name — if the business ever drops the numerals from its trading name the logo dies with it. Also the busiest of the three at small sizes.",
  },
];
