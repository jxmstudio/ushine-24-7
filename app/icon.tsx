import { ImageResponse } from "next/og";

import { gleamMark } from "@/lib/brand-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon — Concept A's Gleam on a deep teal tile.
 *
 * The mark runs bare in the header, but a favicon needs a filled tile: browser
 * tab strips and bookmark bars sit on whatever chrome colour the user's theme
 * happens to be, and a transparent two-tone sparkle disappears against half of
 * them. Aqua on deep teal measures 5.9:1, so the large sparkle still reads.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={32}
          height={32}
          alt=""
          src={gleamMark({ size: 32, tile: "#06373C", primary: "#17C3B2" })}
        />
      </div>
    ),
    size,
  );
}
