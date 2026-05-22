"use client";

import { forwardRef } from "react";

type Cell = { label: string; desc: string; color: string; text_color: string };
type CardData = { col_headers?: string[]; row_headers?: string[]; cells?: Cell[] };
type Card = { index: number; type: string; emoji: string; title: string; body: string; accent: string; data?: CardData };

interface Props { card: Card; total: number; author: string; }

const CardView = forwardRef<HTMLDivElement, Props>(({ card, total, author }, ref) => {
  const pct = Math.round((card.index / total) * 100);

  if (card.type === "table" && card.data) {
    const { col_headers = ["", ""], row_headers = ["", ""], cells = [] } = card.data;
    return (
      <div ref={ref} style={{
        width: 1080, height: 1080, background: "#fff", fontFamily: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "72px 80px", position: "relative", boxSizing: "border-box",
      }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 12, background: card.accent }} />
        <div style={{ position: "absolute", top: 52, right: 68, fontSize: 26, fontWeight: 700, color: "#ccc" }}>{card.index}/{total}</div>
        <div style={{ fontSize: 52, fontWeight: 900, color: "#111", textAlign: "center", marginBottom: 16, letterSpacing: "-0.03em" }}>
          {card.emoji} {card.title}
        </div>
        <div style={{ fontSize: 28, color: "#888", marginBottom: 32, textAlign: "center" }}>{card.body}</div>
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gridTemplateRows: "auto 1fr 1fr", width: "100%", border: "2px solid #e0ddd8", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ background: "#f9f7f4", padding: 16 }} />
          {col_headers.map((h, i) => (
            <div key={i} style={{ background: "#f0ede8", fontWeight: 700, fontSize: 26, color: "#555", padding: "18px 14px", textAlign: "center", borderLeft: "1px solid #e0ddd8", display: "flex", alignItems: "center", justifyContent: "center" }}>{h}</div>
          ))}
          {[0, 1].map((row) => (
            <>
              <div key={`rh-${row}`} style={{ background: "#f0ede8", fontWeight: 700, fontSize: 24, color: "#555", padding: "18px 16px", textAlign: "center", borderTop: "1px solid #e0ddd8", display: "flex", alignItems: "center", justifyContent: "center" }}>{row_headers[row]}</div>
              {[0, 1].map((col) => {
                const c = cells[row * 2 + col] ?? { label: "", desc: "", color: "#f5f5f5", text_color: "#333" };
                return (
                  <div key={`c-${row}-${col}`} style={{ background: c.color, padding: "24px 18px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", borderLeft: "1px solid #e0ddd8", borderTop: "1px solid #e0ddd8" }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: c.text_color, marginBottom: 8 }}>{c.label}</div>
                    <div style={{ fontSize: 22, color: "#666", lineHeight: 1.4 }}>{c.desc}</div>
                  </div>
                );
              })}
            </>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 12, right: 0, height: 7, background: "#f0f0f0" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: card.accent, borderRadius: "0 4px 4px 0" }} />
        </div>
        {author && <div style={{ position: "absolute", bottom: 28, right: 56, fontSize: 24, color: "#bbb", fontWeight: 600 }}>{author}</div>}
      </div>
    );
  }

  return (
    <div ref={ref} style={{
      width: 1080, height: 1080, background: "#fff", fontFamily: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 80, position: "relative", boxSizing: "border-box",
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 12, background: card.accent }} />
      <div style={{ position: "absolute", top: 56, right: 72, fontSize: 28, fontWeight: 700, color: "#ccc" }}>{card.index}/{total}</div>
      <div style={{ fontSize: 96, marginBottom: 40, lineHeight: 1 }}>{card.emoji}</div>
      <div style={{ fontSize: 64, fontWeight: 900, color: "#111", textAlign: "center", lineHeight: 1.2, marginBottom: 36, letterSpacing: "-0.03em" }}>{card.title}</div>
      <div style={{ width: 80, height: 5, background: card.accent, borderRadius: 3, marginBottom: 36 }} />
      <div style={{ fontSize: 38, color: "#444", textAlign: "center", lineHeight: 1.65, letterSpacing: "-0.01em", maxWidth: 860 }}
        dangerouslySetInnerHTML={{ __html: card.body.replace(/\n/g, "<br>") }} />
      <div style={{ position: "absolute", bottom: 0, left: 12, right: 0, height: 7, background: "#f0f0f0" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: card.accent, borderRadius: "0 4px 4px 0" }} />
      </div>
      {author && <div style={{ position: "absolute", bottom: 32, right: 60, fontSize: 26, color: "#bbb", fontWeight: 600 }}>{author}</div>}
    </div>
  );
});

CardView.displayName = "CardView";
export default CardView;
