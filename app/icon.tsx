import { ImageResponse } from "next/og";

import { gleamMark } from "@/lib/brand-mark";

// 96 rather than 32: Google Search only shows a favicon whose side is a
// multiple of 48px, and a 32px icon is soft on high-density tab strips. The
// small sizes browsers want for tabs live in app/favicon.ico.
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

/**
 * Favicon — Concept A's Gleam on a deep teal tile.
 *
 * The mark runs bare in the header, but a favicon needs a filled tile: browser
 * tab strips and bookmark bars sit on whatever chrome colour the user's theme
 * happens to be, and a transparent two-tone sparkle disappears against half of
 * them. Aqua on deep teal measures 5.9:1, so the large sparkle still reads.
 *
 * app/favicon.ico is the same artwork — regenerate it with
 * `npm run favicon` after changing the mark or these colours.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <img
          width={size.width}
          height={size.height}
          alt=""
          src={gleamMark({
            size: size.width,
            tile: "#06373C",
            primary: "#17C3B2",
          })}
        />
      </div>
    ),
    size,
  );
}
