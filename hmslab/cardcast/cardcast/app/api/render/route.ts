import { NextRequest, NextResponse } from "next/server";
import { chromium as playwrightChromium } from "playwright-core";
import chromiumMin from "@sparticuz/chromium-min";

const IS_VERCEL = !!process.env.VERCEL;

async function getBrowser() {
  if (IS_VERCEL) {
    const executablePath = await chromiumMin.executablePath(
      "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar"
    );
    return playwrightChromium.launch({
      args: chromiumMin.args,
      executablePath,
      headless: true,
    });
  }
  return playwrightChromium.launch();
}

function buildTableCells(data: Record<string, unknown>, accent: string): string {
  const colHeaders = (data.col_headers as string[]) ?? ["", ""];
  const rowHeaders = (data.row_headers as string[]) ?? ["", ""];
  const cells = (data.cells as Record<string, string>[]) ?? [];

  const cellHtml = (c: Record<string, string>) => `
    <div class="matrix-cell" style="background:${c.color ?? "#f5f5f5"}">
      <div class="cell-label" style="color:${c.text_color ?? "#333"}">${c.label ?? ""}</div>
      <div class="cell-desc">${c.desc ?? ""}</div>
    </div>`;

  return `
  <div class="matrix">
    <div class="matrix-corner"></div>
    <div class="matrix-col-header">${colHeaders[0]}</div>
    <div class="matrix-col-header">${colHeaders[1]}</div>
    <div class="matrix-row-header">${rowHeaders[0]}</div>
    ${cellHtml(cells[0] ?? {})}
    ${cellHtml(cells[1] ?? {})}
    <div class="matrix-row-header">${rowHeaders[1]}</div>
    ${cellHtml(cells[2] ?? {})}
    ${cellHtml(cells[3] ?? {})}
  </div>`;
}

function cardToHtml(card: Record<string, unknown>, total: number, author: string): string {
  const idx = (card.index as number) ?? 1;
  const emoji = (card.emoji as string) ?? "📌";
  const title = (card.title as string) ?? "";
  const body = (card.body as string) ?? "";
  const accent = (card.accent as string) ?? "#1e88e5";
  const type = (card.type as string) ?? "text";
  const data = (card.data as Record<string, unknown>) ?? {};
  const pct = Math.round((idx / total) * 100);
  const authorTag = author ? `<div class="author">${author}</div>` : "";

  if (type === "table" && Object.keys(data).length > 0) {
    return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { width: 1080px; height: 1080px; display: flex; flex-direction: column;
      align-items: center; justify-content: center; background: #fff;
      font-family: 'Apple SD Gothic Neo','Noto Sans KR',sans-serif;
      padding: 72px 80px; position: relative; }
    .side-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 12px; background: ${accent}; }
    .card-num { position: absolute; top: 52px; right: 68px; font-size: 26px; font-weight: 700; color: #ccc; }
    .title { font-size: 52px; font-weight: 900; color: #111; text-align: center; line-height: 1.2; margin-bottom: 16px; letter-spacing: -0.03em; }
    .sub { font-size: 28px; color: #888; margin-bottom: 32px; text-align: center; }
    .matrix { display: grid; grid-template-columns: 160px 1fr 1fr; grid-template-rows: auto 1fr 1fr;
      gap: 0; border-radius: 16px; overflow: hidden; border: 2px solid #e0ddd8; width: 100%; }
    .matrix-corner { background: #f9f7f4; padding: 16px; }
    .matrix-col-header { background: #f0ede8; font-weight: 700; font-size: 26px; color: #555;
      padding: 18px 14px; text-align: center; border-left: 1px solid #e0ddd8;
      display: flex; align-items: center; justify-content: center; }
    .matrix-row-header { background: #f0ede8; font-weight: 700; font-size: 24px; color: #555;
      padding: 18px 16px; text-align: center; border-top: 1px solid #e0ddd8;
      display: flex; align-items: center; justify-content: center; }
    .matrix-cell { padding: 24px 18px; display: flex; flex-direction: column;
      align-items: center; justify-content: center; text-align: center;
      border-left: 1px solid #e0ddd8; border-top: 1px solid #e0ddd8; }
    .cell-label { font-size: 32px; font-weight: 900; margin-bottom: 8px; }
    .cell-desc { font-size: 22px; color: #666; line-height: 1.4; }
    .progress-wrap { position: absolute; bottom: 0; left: 12px; right: 0; height: 7px; background: #f0f0f0; }
    .progress-fill { height: 100%; width: ${pct}%; background: ${accent}; border-radius: 0 4px 4px 0; }
    .author { position: absolute; bottom: 28px; right: 56px; font-size: 24px; color: #bbb; font-weight: 600; }
    </style></head><body>
    <div class="side-bar"></div>
    <div class="card-num">${idx}/${total}</div>
    <div class="title">${emoji} ${title}</div>
    <div class="sub">${body}</div>
    ${buildTableCells(data, accent)}
    <div class="progress-wrap"><div class="progress-fill"></div></div>
    ${authorTag}
    </body></html>`;
  }

  return `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { width: 1080px; height: 1080px; display: flex; flex-direction: column;
    align-items: center; justify-content: center; background: #fff;
    font-family: 'Apple SD Gothic Neo','Noto Sans KR',sans-serif;
    padding: 80px; position: relative; }
  .side-bar { position: absolute; left: 0; top: 0; bottom: 0; width: 12px; background: ${accent}; }
  .card-num { position: absolute; top: 56px; right: 72px; font-size: 28px; font-weight: 700; color: #ccc; }
  .emoji { font-size: 96px; margin-bottom: 40px; line-height: 1; }
  .title { font-size: 64px; font-weight: 900; color: #111; text-align: center; line-height: 1.2; margin-bottom: 36px; letter-spacing: -0.03em; }
  .divider { width: 80px; height: 5px; background: ${accent}; border-radius: 3px; margin-bottom: 36px; }
  .body { font-size: 38px; color: #444; text-align: center; line-height: 1.65; letter-spacing: -0.01em; max-width: 860px; }
  .progress-wrap { position: absolute; bottom: 0; left: 12px; right: 0; height: 7px; background: #f0f0f0; }
  .progress-fill { height: 100%; width: ${pct}%; background: ${accent}; border-radius: 0 4px 4px 0; }
  .author { position: absolute; bottom: 32px; right: 60px; font-size: 26px; color: #bbb; font-weight: 600; }
  </style></head><body>
  <div class="side-bar"></div>
  <div class="card-num">${idx}/${total}</div>
  <div class="emoji">${emoji}</div>
  <div class="title">${title}</div>
  <div class="divider"></div>
  <div class="body">${body.replace(/\n/g, "<br>")}</div>
  <div class="progress-wrap"><div class="progress-fill"></div></div>
  ${authorTag}
  </body></html>`;
}

export async function POST(req: NextRequest) {
  const { cards, author } = await req.json();
  const total = cards.length;
  const results: { index: number; png: string }[] = [];

  const browser = await getBrowser();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1080 } });

  for (const card of cards) {
    const html = cardToHtml(card, total, author ?? "");
    await page.setContent(html, { waitUntil: "networkidle" });
    const buf = await page.screenshot({ type: "png" });
    results.push({ index: card.index, png: buf.toString("base64") });
  }

  await browser.close();
  return NextResponse.json({ images: results });
}
