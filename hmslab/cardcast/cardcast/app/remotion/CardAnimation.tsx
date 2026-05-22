import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";

type Card = { index: number; type: string; emoji: string; title: string; body: string; accent: string; template?: string };

interface Props { card: Card; total: number; author: string; }

export function CardAnimation({ card, total, author }: Props) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const pct = Math.round((card.index / total) * 100);
  const tpl = card.template ?? "classic";

  const ease = Easing.out(Easing.cubic);

  // accent bar
  const barHeight = interpolate(frame, [0, 20], [0, height], { extrapolateRight: "clamp", easing: ease });

  // emoji
  const emojiScale = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.5)) });
  const emojiOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // title
  const titleY = interpolate(frame, [30, 55], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const titleOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // divider
  const dividerWidth = interpolate(frame, [55, 75], [0, 80], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

  // body
  const bodyOpacity = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bodyY = interpolate(frame, [70, 100], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

  // progress
  const progressPct = interpolate(frame, [110, 145], [0, pct], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

  // author
  const authorOpacity = interpolate(frame, [120, 145], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const isDark = tpl === "dark";
  const bg = isDark ? "#111" : tpl === "gradient" ? `linear-gradient(145deg, ${card.accent}22 0%, #fff 60%)` : "#fff";
  const titleColor = isDark ? "#fff" : "#111";
  const bodyColor = isDark ? "#bbb" : "#444";
  const numColor = isDark ? "#444" : "#ccc";
  const progressBg = isDark ? "#222" : "#f0f0f0";

  const isQuote = tpl === "quote";

  return (
    <div style={{
      width, height,
      background: bg,
      fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: isQuote ? "80px 100px" : 80,
      position: "relative", boxSizing: "border-box", overflow: "hidden",
    }}>
      {/* accent bar */}
      {tpl !== "gradient" && (
        <div style={{
          position: "absolute", left: 0, top: 0, width: 12,
          height: barHeight, background: card.accent,
        }} />
      )}
      {tpl === "gradient" && (
        <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: Math.min(barHeight / height * 10, 10), background: card.accent }} />
      )}

      {/* card number */}
      <div style={{ position: "absolute", top: 56, right: 72, fontSize: 28, fontWeight: 700, color: numColor, opacity: authorOpacity }}>
        {card.index}/{total}
      </div>

      {/* quote mark */}
      {isQuote && (
        <div style={{
          fontSize: 200, lineHeight: 0.8, color: card.accent, opacity: emojiOpacity * 0.15,
          fontFamily: "Georgia,serif", alignSelf: "flex-start", marginLeft: 20, marginBottom: -40,
        }}>"</div>
      )}

      {/* emoji */}
      {!isQuote && (
        <div style={{
          fontSize: 96, marginBottom: 40, lineHeight: 1,
          transform: `scale(${emojiScale})`, opacity: emojiOpacity,
        }}>{card.emoji}</div>
      )}

      {/* title */}
      <div style={{
        fontSize: isQuote ? 68 : 64, fontWeight: 900, color: titleColor,
        textAlign: "center", lineHeight: 1.2, marginBottom: 36, letterSpacing: "-0.03em",
        transform: `translateY(${titleY}px)`, opacity: titleOpacity,
      }}>{card.title}</div>

      {/* divider */}
      <div style={{ width: dividerWidth, height: 5, background: card.accent, borderRadius: 3, marginBottom: 36 }} />

      {/* body */}
      <div style={{
        fontSize: isQuote ? 36 : 38, color: bodyColor, textAlign: "center",
        lineHeight: 1.65, letterSpacing: "-0.01em", maxWidth: 860,
        transform: `translateY(${bodyY}px)`, opacity: bodyOpacity,
      }}>{card.body}</div>

      {/* quote emoji bottom */}
      {isQuote && (
        <div style={{ marginTop: 56, fontSize: 28, color: card.accent, fontWeight: 700, opacity: authorOpacity }}>{card.emoji}</div>
      )}

      {/* progress bar */}
      <div style={{ position: "absolute", bottom: 0, left: 12, right: 0, height: 7, background: progressBg }}>
        <div style={{ height: "100%", width: `${progressPct}%`, background: card.accent, borderRadius: "0 4px 4px 0" }} />
      </div>

      {/* author */}
      {author && (
        <div style={{
          position: "absolute", bottom: 32, right: 60, fontSize: 26,
          color: isDark ? "#444" : "#bbb", fontWeight: 600, opacity: authorOpacity,
        }}>{author}</div>
      )}
    </div>
  );
}
