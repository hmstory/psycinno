// 정규분포 CDF (Abramowitz & Stegun 근사)
function erf(x: number): number {
  const t = 1 / (1 + 0.3275911 * Math.abs(x));
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return x >= 0 ? y : -y;
}

export function phi(x: number): number {
  return (1 + erf(x / Math.sqrt(2))) / 2;
}

// 정규분포 역함수 (Rational approximation)
export function phiInv(p: number): number {
  if (p <= 0) return -6;
  if (p >= 1) return 6;
  const a = [0, -3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  const b = [0, -5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
  const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
  const d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
  const pLow = 0.02425, pHigh = 1 - pLow;
  let q: number;
  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) / ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  } else if (p <= pHigh) {
    q = p - 0.5; const r = q*q;
    return (((((a[1]*r+a[2])*r+a[3])*r+a[4])*r+a[5])*r+a[6])*q / (((((b[1]*r+b[2])*r+b[3])*r+b[4])*r+b[5])*r+1);
  } else {
    q = Math.sqrt(-2 * Math.log(1-p));
    return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) / ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  }
}

// d' 값에서 ROC 곡선 포인트 계산 (FA 0→1 파라미터화)
export function rocPoints(dPrime: number, n = 80): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i <= n; i++) {
    const fa = i / n;
    if (fa === 0) { pts.push([0, 0]); continue; }
    if (fa === 1) { pts.push([1, 1]); continue; }
    const hit = Math.min(1, Math.max(0, phi(dPrime + phiInv(fa))));
    pts.push([fa, hit]);
  }
  return pts;
}

// 3개 기준점 계산
export function rocKeyPoints(dPrime: number) {
  const conservative = { fa: 0.08, hit: phi(dPrime + phiInv(0.08)), label: "보수적", color: "#3b82f6" };
  const liberal      = { fa: 0.65, hit: phi(dPrime + phiInv(0.65)), label: "자유적", color: "#f59e0b" };
  const optimal      = { fa: phi(-dPrime/2), hit: phi(dPrime/2), label: "최적(β=1)", color: "#10b981" };
  return { conservative, liberal, optimal };
}
