import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "wit lof — Amersfoort · bezorgd op de fiets";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#FAF3E7",
          color: "#3D2818",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#60442F",
          }}
        >
          Amersfoort · Kamp 5 · Sinds 2012
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              fontSize: 200,
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              display: "flex",
              gap: 24,
              alignItems: "baseline",
            }}
          >
            <span>WIT</span>
            <span style={{ color: "#C55A3C", fontSize: 140 }}>♥</span>
            <span>LOF</span>
          </div>
          <div
            style={{
              fontSize: 48,
              fontStyle: "italic",
              fontWeight: 900,
              color: "#C55A3C",
              display: "flex",
            }}
          >
            Gezonde gerechten met liefde bereid.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#60442F",
          }}
        >
          <div style={{ display: "flex" }}>Bezorgd op de fiets</div>
          <div style={{ display: "flex", color: "#C55A3C" }}>
            wit-lof.com →
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
