"use client";

import { forwardRef } from "react";

type Cell = { label: string; desc: string; color: string; text_color: string };
type CardData = { col_headers?: string[]; row_headers?: string[]; cells?: Cell[] };
type Card = { index: number; type: string; emoji: string; title: string; body: string; accent: string; data?: CardData; template?: string };

interface Props { card: Card; total: number; author: string; }

const CardView = forwardRef<HTMLDivElement, Props>(({ card, total, author }, ref) => {
  const pct = Math.round((card.index / total) * 100);
  const tpl = card.template ?? "classic";

  // ── TABLE (템플릿 무관하게 고정 레이아웃) ──
  if (card.type === "table" && card.data) {
    const { col_headers = ["", ""], row_headers = ["", ""], cells = [] } = card.data;
    const isDark = tpl === "dark";
    const bg = isDark ? "#111" : "#fff";
    const headerBg = isDark ? "#222" : "#f0ede8";
    const cornerBg = isDark ? "#1a1a1a" : "#f9f7f4";
    const borderColor = isDark ? "#333" : "#e0ddd8";
    const titleColor = isDark ? "#fff" : "#111";
    const subColor = isDark ? "#aaa" : "#888";
    const numColor = isDark ? "#555" : "#ccc";

    return (
      <div ref={ref} style={{
        width: 1080, height: 1080, background: bg, fontFamily: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "72px 80px", position: "relative", boxSizing: "border-box",
      }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 12, background: card.accent }} />
        <div style={{ position: "absolute", top: 52, right: 68, fontSize: 26, fontWeight: 700, color: numColor }}>{card.index}/{total}</div>
        <div style={{ fontSize: 52, fontWeight: 900, color: titleColor, textAlign: "center", marginBottom: 16, letterSpacing: "-0.03em" }}>
          {card.emoji} {card.title}
        </div>
        <div style={{ fontSize: 28, color: subColor, marginBottom: 32, textAlign: "center" }}>{card.body}</div>
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gridTemplateRows: "auto 1fr 1fr", width: "100%", border: `2px solid ${borderColor}`, borderRadius: 16, overflow: "hidden" }}>
          <div style={{ background: cornerBg, padding: 16 }} />
          {col_headers.map((h, i) => (
            <div key={i} style={{ background: headerBg, fontWeight: 700, fontSize: 26, color: isDark ? "#ccc" : "#555", padding: "18px 14px", textAlign: "center", borderLeft: `1px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{h}</div>
          ))}
          {[0, 1].map((row) => (
            <>
              <div key={`rh-${row}`} style={{ background: headerBg, fontWeight: 700, fontSize: 24, color: isDark ? "#ccc" : "#555", padding: "18px 16px", textAlign: "center", borderTop: `1px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{row_headers[row]}</div>
              {[0, 1].map((col) => {
                const c = cells[row * 2 + col] ?? { label: "", desc: "", color: isDark ? "#1e1e1e" : "#f5f5f5", text_color: isDark ? "#fff" : "#333" };
                return (
                  <div key={`c-${row}-${col}`} style={{ background: c.color, padding: "24px 18px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", borderLeft: `1px solid ${borderColor}`, borderTop: `1px solid ${borderColor}` }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: c.text_color, marginBottom: 8 }}>{c.label}</div>
                    <div style={{ fontSize: 22, color: isDark ? "#aaa" : "#666", lineHeight: 1.4 }}>{c.desc}</div>
                  </div>
                );
              })}
            </>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 12, right: 0, height: 7, background: isDark ? "#222" : "#f0f0f0" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: card.accent, borderRadius: "0 4px 4px 0" }} />
        </div>
        {author && <div style={{ position: "absolute", bottom: 28, right: 56, fontSize: 24, color: isDark ? "#555" : "#bbb", fontWeight: 600 }}>{author}</div>}
      </div>
    );
  }

  // ── DARK ──
  if (tpl === "dark") {
    return (
      <div ref={ref} style={{
        width: 1080, height: 1080, background: "#111", fontFamily: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: 80, position: "relative", boxSizing: "border-box",
      }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 12, background: card.accent }} />
        <div style={{ position: "absolute", top: 56, right: 72, fontSize: 28, fontWeight: 700, color: "#444" }}>{card.index}/{total}</div>
        <div style={{ fontSize: 96, marginBottom: 40, lineHeight: 1 }}>{card.emoji}</div>
        <div style={{ fontSize: 64, fontWeight: 900, color: "#fff", textAlign: "center", lineHeight: 1.2, marginBottom: 36, letterSpacing: "-0.03em" }}>{card.title}</div>
        <div style={{ width: 80, height: 5, background: card.accent, borderRadius: 3, marginBottom: 36 }} />
        <div style={{ fontSize: 38, color: "#bbb", textAlign: "center", lineHeight: 1.65, letterSpacing: "-0.01em", maxWidth: 860 }}
          dangerouslySetInnerHTML={{ __html: card.body.replace(/\n/g, "<br>") }} />
        <div style={{ position: "absolute", bottom: 0, left: 12, right: 0, height: 7, background: "#222" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: card.accent, borderRadius: "0 4px 4px 0" }} />
        </div>
        {author && <div style={{ position: "absolute", bottom: 32, right: 60, fontSize: 26, color: "#444", fontWeight: 600 }}>{author}</div>}
      </div>
    );
  }

  // ── GRADIENT ──
  if (tpl === "gradient") {
    const hex = card.accent;
    return (
      <div ref={ref} style={{
        width: 1080, height: 1080,
        background: `linear-gradient(145deg, ${hex}22 0%, #fff 60%)`,
        fontFamily: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: 80, position: "relative", boxSizing: "border-box",
      }}>
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 10, background: card.accent }} />
        <div style={{ position: "absolute", top: 60, right: 72, fontSize: 28, fontWeight: 700, color: "#ccc" }}>{card.index}/{total}</div>
        <div style={{ fontSize: 100, marginBottom: 40, lineHeight: 1 }}>{card.emoji}</div>
        <div style={{ fontSize: 64, fontWeight: 900, color: "#111", textAlign: "center", lineHeight: 1.2, marginBottom: 36, letterSpacing: "-0.03em" }}>{card.title}</div>
        <div style={{ width: 80, height: 5, background: card.accent, borderRadius: 3, marginBottom: 36 }} />
        <div style={{ fontSize: 38, color: "#444", textAlign: "center", lineHeight: 1.65, letterSpacing: "-0.01em", maxWidth: 860 }}
          dangerouslySetInnerHTML={{ __html: card.body.replace(/\n/g, "<br>") }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 7, background: "#f0f0f0" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: card.accent, borderRadius: "0 4px 4px 0" }} />
        </div>
        {author && <div style={{ position: "absolute", bottom: 32, right: 60, fontSize: 26, color: "#bbb", fontWeight: 600 }}>{author}</div>}
      </div>
    );
  }

  // ── QUOTE ──
  if (tpl === "quote") {
    return (
      <div ref={ref} style={{
        width: 1080, height: 1080, background: "#fff", fontFamily: "'Apple SD Gothic Neo','Noto Sans KR',sans-serif",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "80px 100px", position: "relative", boxSizing: "border-box",
      }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 12, background: card.accent }} />
        <div style={{ position: "absolute", top: 56, right: 72, fontSize: 28, fontWeight: 700, color: "#ccc" }}>{card.index}/{total}</div>
        <div style={{ fontSize: 200, lineHeight: 0.8, color: card.accent, opacity: 0.15, fontFamily: "Georgia,serif", alignSelf: "flex-start", marginLeft: 20, marginBottom: -40 }}>"</div>
        <div style={{ fontSize: 68, fontWeight: 900, color: "#111", textAlign: "center", lineHeight: 1.25, letterSpacing: "-0.03em", marginBottom: 48 }}>{card.title}</div>
        <div style={{ fontSize: 36, color: "#777", textAlign: "center", lineHeight: 1.7, letterSpacing: "-0.01em", maxWidth: 820 }}
          dangerouslySetInnerHTML={{ __html: card.body.replace(/\n/g, "<br>") }} />
        <div style={{ marginTop: 56, width: 60, height: 4, background: card.accent, borderRadius: 2 }} />
        <div style={{ marginTop: 20, fontSize: 28, color: card.accent, fontWeight: 700 }}>{card.emoji}</div>
        <div style={{ position: "absolute", bottom: 0, left: 12, right: 0, height: 7, background: "#f0f0f0" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: card.accent, borderRadius: "0 4px 4px 0" }} />
        </div>
        {author && <div style={{ position: "absolute", bottom: 32, right: 60, fontSize: 26, color: "#bbb", fontWeight: 600 }}>{author}</div>}
      </div>
    );
  }

  // ── CLASSIC (기본) ──
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
