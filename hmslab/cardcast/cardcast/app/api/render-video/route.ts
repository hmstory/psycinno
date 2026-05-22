import { NextRequest, NextResponse } from "next/server";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import os from "os";
import fs from "fs";

export const maxDuration = 60;
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { card, total, author } = await req.json();

  const entryPoint = path.join(process.cwd(), "app/remotion/index.ts");
  const bundled = await bundle({ entryPoint, onProgress: () => {} });

  const composition = await selectComposition({
    serveUrl: bundled,
    id: "CardAnim",
    inputProps: { card, total, author },
  });

  const outPath = path.join(os.tmpdir(), `card_${card.index}_${Date.now()}.mp4`);

  await renderMedia({
    composition,
    serveUrl: bundled,
    codec: "h264",
    outputLocation: outPath,
    inputProps: { card, total, author },
  });

  const buf = fs.readFileSync(outPath);
  fs.unlinkSync(outPath);

  return new NextResponse(buf, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment; filename="card_${String(card.index).padStart(2, "0")}.mp4"`,
    },
  });
}
