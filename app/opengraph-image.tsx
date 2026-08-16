import { ImageResponse } from "next/og";

import { site } from "@/data/site";
import { gleamMark } from "@/lib/brand-mark";

export const alt = `${site.name} — Cleaning services across Sydney, available 24/7`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(60% 60% at 85% 10%, #17C3B2 0%, transparent 70%), #06373C",
          padding: 72,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Concept A's Gleam, bare — the card is already deep teal, so it
              needs no tile of its own. Mist for the large sparkle rather than
              aqua: this mark sits next to the wordmark, and the two should read
              as one lockup rather than two competing greens. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={72}
            height={72}
            alt=""
            src={gleamMark({ size: 72, primary: "#F2FBF9" })}
          />
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 40, fontWeight: 600 }}>Ushine</span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#C6F24E",
                border: "2px solid rgba(198,242,78,0.45)",
                borderRadius: 8,
                padding: "4px 10px",
              }}
            >
              24/7
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05 }}>
            Clean, whenever
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
              color: "#C6F24E",
            }}
          >
            you need it.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          <span>Residential · Commercial · Airbnb · End of lease</span>
          <span style={{ color: "white", fontWeight: 600 }}>{site.phone}</span>
        </div>
      </div>
    ),
    size,
  );
}
