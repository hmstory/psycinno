import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { rocPoints, rocKeyPoints } from "./rocMath";

interface Props {
  accent: string;
  title: string;
  targetDPrime: number;
}

export function RocAnimation({ accent, title, targetDPrime }: Props) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const ease = Easing.inOut(Easing.cubic);

  // d'가 0 → targetDPrime으로 증가 (프레임 20~160)
  const dPrime = interpolate(frame, [20, 160], [0, targetDPrime], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  // 제목/축 페이드인
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dotsOpacity  = interpolate(frame, [120, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const labelOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const S = 680;
  const pad = 90;
  const toX = (fa: number)  => pad + fa * S;
  const toY = (hit: number) => pad + (1 - hit) * S;

  const pts = rocPoints(dPrime);
  const pathD = pts.map(([fa, hit], i) => `${i === 0 ? "M" : "L"}${toX(fa).toFixed(1)},${toY(hit).toFixed(1)}`).join(" ");
  const diagD = `M${pad},${pad+S} L${pad+S},${pad}`;

  const { conservative, liberal, optimal } = rocKeyPoints(Math.max(dPrime, 0.01));

  const Dot = ({ fa, hit, label, color, opacity }: { fa: number; hit: number; label: string; color: string; opacity: number }) => (
    <g opacity={opacity}>
      <circle cx={toX(fa)} cy={toY(hit)} r={16} fill={color} stroke="white" strokeWidth={5} />
      <text x={toX(fa)+22} y={toY(hit)+6} fontSize={26} fill={color} fontWeight={700}>{label}</text>
      <text x={toX(fa)+22} y={toY(hit)+34} fontSize={20} fill="#888">{`FA=${(fa*100).toFixed(0)}%  Hit=${(hit*100).toFixed(0)}%`}</text>
    </g>
  );

  return (
    <div style={{
      width, height, background: "#fff",
      fontFamily: "'Noto Sans KR','Apple SD Gothic Neo',sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "50px 50px 30px", position: "relative", boxSizing: "border-box",
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 12, background: accent }} />

      <div style={{ opacity: titleOpacity, fontSize: 52, fontWeight: 900, color: "#111", textAlign: "center", marginBottom: 12, letterSpacing: "-0.03em" }}>
        📈 {title}
      </div>

      <svg width={S + pad*2} height={S + pad*2} style={{ overflow: "visible" }}>
        <path d={diagD} stroke="#e0e0e0" strokeWidth={2} strokeDasharray="8,6" fill="none" />
        <path d={pathD} stroke={accent} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1={pad} y1={pad} x2={pad} y2={pad+S} stroke="#333" strokeWidth={3} />
        <line x1={pad} y1={pad+S} x2={pad+S} y2={pad+S} stroke="#333" strokeWidth={3} />
        <text x={pad+S/2} y={pad+S+58} textAnchor="middle" fontSize={26} fill="#555" fontWeight={600}>오경보율 (False Alarm Rate)</text>
        <text x={pad-65} y={pad+S/2} textAnchor="middle" fontSize={26} fill="#555" fontWeight={600} transform={`rotate(-90,${pad-65},${pad+S/2})`}>탐지율 (Hit Rate)</text>
        {[0, 0.25, 0.5, 0.75, 1].map(v => (
          <g key={v}>
            <text x={toX(v)} y={pad+S+36} textAnchor="middle" fontSize={20} fill="#bbb">{v}</text>
            <text x={pad-14} y={toY(v)+7} textAnchor="end" fontSize={20} fill="#bbb">{v}</text>
          </g>
        ))}
        {/* d' 값 실시간 표시 */}
        <text x={pad+S-10} y={pad+44} textAnchor="end" fontSize={36} fill={accent} fontWeight={900}>
          d′ = {dPrime.toFixed(2)}
        </text>
        <Dot {...conservative} opacity={dotsOpacity} />
        <Dot {...liberal}      opacity={dotsOpacity} />
        <Dot {...optimal}      opacity={dotsOpacity} />
        {/* 최적점 라벨 강조 */}
        <g opacity={labelOpacity}>
          <text x={toX(optimal.fa)-20} y={toY(optimal.hit)-24} textAnchor="end" fontSize={24} fill="#10b981" fontWeight={700}>
            ← 최적 판단 기준
          </text>
        </g>
      </svg>
    </div>
  );
}
