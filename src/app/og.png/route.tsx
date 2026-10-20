import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const dynamic = "force-static";

/** Imagem Open Graph (1200×630) gerada no build → `out/og.png`. */
export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0b57d0 0%, #0a3f98 100%)",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <svg width="120" height="120" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="24" fill="#ffffff" />
          <path d="M10 28A14 14 0 0 1 38 28" fill="none" stroke="#0b57d0" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          <path d="M12.5 28A11.5 11.5 0 0 1 24 16.5" fill="none" stroke="#0b57d0" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 28l8-10" stroke="#0b57d0" strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="28" r="2.6" fill="#0b57d0" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2 }}>{site.name}</div>
          <div style={{ fontSize: 34, opacity: 0.9 }}>Teste de velocidade de internet</div>
        </div>
      </div>
      <div style={{ marginTop: 56, fontSize: 30, opacity: 0.85, display: "flex", gap: 40 }}>
        <span>Download</span>
        <span>Upload</span>
        <span>Ping</span>
        <span>Jitter</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
