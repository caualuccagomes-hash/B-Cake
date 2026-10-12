import { ImageResponse } from "next/og";
export const alt = "BêCake — Confeitaria Artesanal em Tianguá";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#f8f4eb",
        color: "#493c35",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "24px solid #dfc2bf",
      }}
    >
      <div style={{ fontSize: 115, fontFamily: "serif" }}>BêCake</div>
      <div style={{ fontSize: 25, letterSpacing: 7, marginTop: 24 }}>
        CONFEITARIA ARTESANAL
      </div>
      <div style={{ fontSize: 24, marginTop: 70 }}>
        De Tianguá, com carinho. Desde 2020.
      </div>
    </div>,
    size,
  );
}
