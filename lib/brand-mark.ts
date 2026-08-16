/**
 * Concept A's Gleam, encoded as a data URI for use inside `next/og`.
 *
 * Satori renders SVG reliably through `<img src="data:image/svg+xml;...">`, but
 * passing `<svg>` with `<path>` children as JSX throws "Input buffer contains
 * unsupported image format" at the resvg stage. Hence the encode — the geometry
 * is the same as components/logo-concepts.tsx.
 *
 * Note the raw-SVG attribute names are kebab-case, not the camelCase JSX
 * spelling, and that `Buffer` is fine here because this only runs server-side
 * during image generation.
 */

/** The four-point gleam, centred at 24 with a half-extent of 21. */
const SPARKLE =
  "M24 3C25.8 14.4 33.6 22.2 45 24C33.6 25.8 25.8 33.6 24 45C22.2 33.6 14.4 25.8 3 24C14.4 22.2 22.2 14.4 24 3Z";

/** Places a sparkle by its centre: translate(centre - 24 x scale) scale(s). */
function place(cx: number, cy: number, scale: number) {
  const round = (n: number) => Number(n.toFixed(2));
  return `translate(${round(cx - 24 * scale)} ${round(cy - 24 * scale)}) scale(${scale})`;
}

export function gleamMark({
  size,
  primary,
  accent = "#C6F24E",
  tile,
}: {
  size: number;
  /** Fill for the large sparkle. */
  primary: string;
  /** Fill for the small sparkle. */
  accent?: string;
  /** Rounded background tile, or omit for the bare mark. */
  tile?: string;
}) {
  // Tiled, the pair is inset so it does not crowd the corner radius; bare, it
  // uses the same composition as the header logo.
  const g = tile
    ? { big: [19.5, 19.5, 0.68], small: [33.5, 32.5, 0.32] }
    : { big: [19, 19, 0.82], small: [36, 35, 0.38] };

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="${size}" height="${size}">`,
    tile ? `<rect width="48" height="48" rx="12" fill="${tile}"/>` : "",
    `<path d="${SPARKLE}" fill="${primary}" transform="${place(g.big[0], g.big[1], g.big[2])}"/>`,
    `<path d="${SPARKLE}" fill="${accent}" transform="${place(g.small[0], g.small[1], g.small[2])}"/>`,
    `</svg>`,
  ].join("");

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
