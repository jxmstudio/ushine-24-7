import { ImageResponse } from "next/og";

import { site } from "@/data/site";

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
            "radial-gradient(60% 60% at 85% 10%, #0e7490 0%, transparent 70%), #111a2e",
          padding: 72,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              background: "linear-gradient(135deg, #1e3a5f, #22d3ee)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            U
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 40, fontWeight: 600 }}>Ushine</span>
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#22d3ee",
                border: "2px solid rgba(34,211,238,0.4)",
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
            Sydney cleaners,
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
              color: "#22d3ee",
            }}
          >
            on call 24/7
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
