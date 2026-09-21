import { ImageResponse } from "next/og";

import { gleamMark } from "@/lib/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon. Same Gleam as app/icon.tsx, but the tile runs
 * full-bleed: iOS applies its own corner mask, and any transparent corner we
 * leave behind is filled with black.
 */
export default function AppleIcon() {
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
            tileRadius: 0,
            primary: "#17C3B2",
          })}
        />
      </div>
    ),
    size,
  );
}
