import { NextRequest, NextResponse } from "next/server";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import os from "os";
import fs from "fs";

export const maxDuration = 60;
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const entryPoint = path.join(process.cwd(), "app/remotion/index.ts");
  const bundled = await bundle({ entryPoint, onProgress: () => {} });

  // ROC 애니메이션
  if (body.type === "roc") {
    const inputProps = {
      accent: body.accent ?? "#e53e3e",
      title: body.title ?? "수신자조작특성 곡선",
      targetDPrime: body.targetDPrime ?? 2.0,
    };
    const composition = await selectComposition({ serveUrl: bundled, id: "RocAnim", inputProps });
    const outPath = path.join(os.tmpdir(), `roc_${Date.now()}.mp4`);
    await renderMedia({ composition, serveUrl: bundled, codec: "h264", outputLocation: outPath, inputProps });
    const buf = fs.readFileSync(outPath);
    fs.unlinkSync(outPath);
    return new NextResponse(buf, {
      headers: { "Content-Type": "video/mp4", "Content-Disposition": `attachment; filename="roc.mp4"` },
    });
  }

  // 일반 카드 애니메이션
  const { card, total, author } = body;
  const inputProps = { card, total, author };
  const composition = await selectComposition({ serveUrl: bundled, id: "CardAnim", inputProps });
  const outPath = path.join(os.tmpdir(), `card_${card.index}_${Date.now()}.mp4`);
  await renderMedia({ composition, serveUrl: bundled, codec: "h264", outputLocation: outPath, inputProps });
  const buf = fs.readFileSync(outPath);
  fs.unlinkSync(outPath);
  return new NextResponse(buf, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment; filename="card_${String(card.index).padStart(2, "0")}.mp4"`,
    },
  });
}
