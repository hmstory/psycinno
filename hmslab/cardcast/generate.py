#!/usr/bin/env python3
"""
CardCast Phase 1 — 칼럼 → 인스타그램 카드뉴스 PNG 생성기
사용법: python3 generate.py <칼럼파일.txt> [--out 출력폴더]
"""

import anthropic
import json
import sys
import os
import re
import argparse
from pathlib import Path

# ── Playwright는 sync_api 사용
from playwright.sync_api import sync_playwright

# ────────────────────────────────────────────────
# 1. Claude API — 카드 분할·요약
# ────────────────────────────────────────────────

SPLIT_PROMPT = """당신은 칼럼을 인스타그램 카드뉴스로 변환하는 전문가입니다.

아래 칼럼을 읽고 카드뉴스로 분할해주세요.

규칙:
- 첫 카드: 훅 (왜 읽어야 하는지, 핵심 질문)
- 중간 카드: 개념 하나씩, 핵심만
- 마지막 카드: 핵심 요약 + 한 줄 결론
- 카드당 본문 60자 이내
- 총 카드 수: 6~12장

[표 감지 규칙 — 매우 중요]
2×2 매트릭스 또는 4개 항목이 2행×2열로 대응되는 개념이 나오면
반드시 type="table"로 하고 data 필드를 아래처럼 채우세요.
절대 4장의 개별 text 카드로 쪼개지 마세요.

예시: Hit/False Alarm/Miss/정기각 → 카드 1장 (table)

반드시 아래 JSON 형식으로만 답하세요. 다른 텍스트 없이 JSON만:

{
  "title": "전체 시리즈 제목",
  "cards": [
    {
      "index": 1,
      "type": "text",
      "emoji": "🎯",
      "title": "카드 제목 (20자 이내)",
      "body": "본문 내용 (60자 이내)",
      "accent": "#e53935"
    },
    {
      "index": 2,
      "type": "table",
      "emoji": "📊",
      "title": "카드 제목 (20자 이내)",
      "body": "표 설명 한 줄",
      "accent": "#1e88e5",
      "data": {
        "col_headers": ["신호 있음", "신호 없음"],
        "row_headers": ["반응 있음", "반응 없음"],
        "cells": [
          {"label": "Hit ✓",         "desc": "정확히 알아챔",   "color": "#e8f5e9", "text_color": "#2e7d32"},
          {"label": "False Alarm ✗", "desc": "혼자 착각",       "color": "#fff3e0", "text_color": "#e65100"},
          {"label": "Miss ✗",        "desc": "기회를 날림",     "color": "#fce4ec", "text_color": "#c62828"},
          {"label": "정기각 ✓",      "desc": "현실 파악 완료",  "color": "#e3f2fd", "text_color": "#1565c0"}
        ]
      }
    }
  ]
}

type 종류: text / table / chart
accent: 카드 포인트 색상 (hex). 감정/주제에 맞게 자유롭게.
cells 순서: [행1열1, 행1열2, 행2열1, 행2열2]
"""

def split_column(text: str) -> dict:
    client = anthropic.Anthropic()
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        messages=[
            {
                "role": "user",
                "content": f"{SPLIT_PROMPT}\n\n---\n{text}"
            }
        ]
    )
    raw = message.content[0].text.strip()
    # JSON 블록만 추출
    match = re.search(r'\{.*\}', raw, re.DOTALL)
    if match:
        return json.loads(match.group())
    return json.loads(raw)


# ────────────────────────────────────────────────
# 2. HTML 카드 템플릿
# ────────────────────────────────────────────────

def _render_table_cells(data: dict, accent: str) -> str:
    col_headers = data.get("col_headers", ["", ""])
    row_headers = data.get("row_headers", ["", ""])
    cells = data.get("cells", [])

    def cell_html(c):
        return f"""
        <div class="matrix-cell" style="background:{c.get('color','#f5f5f5')}">
          <div class="cell-label" style="color:{c.get('text_color','#333')}">{c.get('label','')}</div>
          <div class="cell-desc">{c.get('desc','')}</div>
        </div>"""

    rows_html = ""
    if len(cells) >= 4:
        rows_html = f"""
        <div class="matrix-row-header">{row_headers[0]}</div>
        {cell_html(cells[0])}
        {cell_html(cells[1])}
        <div class="matrix-row-header">{row_headers[1]}</div>
        {cell_html(cells[2])}
        {cell_html(cells[3])}"""

    return f"""
  <div class="matrix">
    <div class="matrix-corner"></div>
    <div class="matrix-col-header">{col_headers[0]}</div>
    <div class="matrix-col-header">{col_headers[1]}</div>
    {rows_html}
  </div>"""


def card_to_html(card: dict, total: int, author: str = "") -> str:
    idx = card.get("index", 1)
    emoji = card.get("emoji", "📌")
    title = card.get("title", "")
    body = card.get("body", "")
    accent = card.get("accent", "#1e88e5")
    card_type = card.get("type", "text")
    data = card.get("data", {})

    progress_pct = int((idx / total) * 100)
    author_tag = f'<div class="author">{author}</div>' if author else ""

    # table 카드는 별도 레이아웃
    if card_type == "table" and data:
        table_html = _render_table_cells(data, accent)
        return f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    width: 1080px; height: 1080px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: #ffffff;
    font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
    padding: 72px 80px;
    position: relative;
  }}
  .side-bar {{ position: absolute; left: 0; top: 0; bottom: 0; width: 12px; background: {accent}; }}
  .card-num {{ position: absolute; top: 52px; right: 68px; font-size: 26px; font-weight: 700; color: #ccc; }}
  .title {{
    font-size: 52px; font-weight: 900; color: #111;
    text-align: center; line-height: 1.2;
    margin-bottom: 20px; letter-spacing: -0.03em;
  }}
  .sub {{ font-size: 30px; color: #888; margin-bottom: 36px; text-align: center; }}

  /* 2×2 매트릭스 */
  .matrix {{
    display: grid;
    grid-template-columns: 160px 1fr 1fr;
    grid-template-rows: auto 1fr 1fr;
    gap: 0;
    border-radius: 16px; overflow: hidden;
    border: 2px solid #e0ddd8;
    width: 100%;
  }}
  .matrix-corner {{ background: #f9f7f4; padding: 16px; }}
  .matrix-col-header {{
    background: #f0ede8; font-weight: 700; font-size: 26px; color: #555;
    padding: 18px 14px; text-align: center;
    border-left: 1px solid #e0ddd8;
    display: flex; align-items: center; justify-content: center;
  }}
  .matrix-row-header {{
    background: #f0ede8; font-weight: 700; font-size: 24px; color: #555;
    padding: 18px 16px; text-align: center;
    border-top: 1px solid #e0ddd8;
    display: flex; align-items: center; justify-content: center;
  }}
  .matrix-cell {{
    padding: 24px 18px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    border-left: 1px solid #e0ddd8;
    border-top: 1px solid #e0ddd8;
  }}
  .cell-label {{ font-size: 32px; font-weight: 900; margin-bottom: 8px; }}
  .cell-desc {{ font-size: 22px; color: #666; line-height: 1.4; }}

  .progress-wrap {{ position: absolute; bottom: 0; left: 12px; right: 0; height: 7px; background: #f0f0f0; }}
  .progress-fill {{ height: 100%; width: {progress_pct}%; background: {accent}; border-radius: 0 4px 4px 0; }}
  .author {{ position: absolute; bottom: 28px; right: 56px; font-size: 24px; color: #bbb; font-weight: 600; }}
</style>
</head>
<body>
  <div class="side-bar"></div>
  <div class="card-num">{idx}/{total}</div>
  <div class="title">{emoji} {title}</div>
  <div class="sub">{body}</div>
  {table_html}
  <div class="progress-wrap"><div class="progress-fill"></div></div>
  {author_tag}
</body>
</html>"""

    # text / chart 기본 레이아웃
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    width: 1080px; height: 1080px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    background: #ffffff;
    font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
    padding: 80px;
    position: relative;
  }}
  .side-bar {{ position: absolute; left: 0; top: 0; bottom: 0; width: 12px; background: {accent}; }}
  .card-num {{ position: absolute; top: 56px; right: 72px; font-size: 28px; font-weight: 700; color: #ccc; letter-spacing: -0.02em; }}
  .emoji {{ font-size: 96px; margin-bottom: 40px; line-height: 1; }}
  .title {{ font-size: 64px; font-weight: 900; color: #111; text-align: center; line-height: 1.2; margin-bottom: 36px; letter-spacing: -0.03em; }}
  .divider {{ width: 80px; height: 5px; background: {accent}; border-radius: 3px; margin-bottom: 36px; }}
  .body {{ font-size: 38px; color: #444; text-align: center; line-height: 1.65; letter-spacing: -0.01em; max-width: 860px; }}
  .progress-wrap {{ position: absolute; bottom: 0; left: 12px; right: 0; height: 7px; background: #f0f0f0; }}
  .progress-fill {{ height: 100%; width: {progress_pct}%; background: {accent}; border-radius: 0 4px 4px 0; }}
  .author {{ position: absolute; bottom: 32px; right: 60px; font-size: 26px; color: #bbb; font-weight: 600; letter-spacing: -0.01em; }}
  .badge {{ position: absolute; top: 56px; left: 40px; background: {accent}22; color: {accent}; font-size: 22px; font-weight: 700; padding: 6px 18px; border-radius: 20px; letter-spacing: 0.05em; }}
</style>
</head>
<body>
  <div class="side-bar"></div>
  <div class="card-num">{idx}/{total}</div>
  {"" if card_type == "text" else f'<div class="badge">{card_type.upper()}</div>'}
  <div class="emoji">{emoji}</div>
  <div class="title">{title}</div>
  <div class="divider"></div>
  <div class="body">{body.replace(chr(10), "<br>")}</div>
  <div class="progress-wrap"><div class="progress-fill"></div></div>
  {author_tag}
</body>
</html>"""


# ────────────────────────────────────────────────
# 3. Playwright → PNG
# ────────────────────────────────────────────────

def render_cards(cards_data: dict, out_dir: Path, author: str = ""):
    cards = cards_data["cards"]
    total = len(cards)
    series_title = cards_data.get("title", "cardnews")

    out_dir.mkdir(parents=True, exist_ok=True)

    print(f"\n📦 시리즈: {series_title}")
    print(f"📇 총 카드 수: {total}장")
    print(f"📁 출력 폴더: {out_dir}\n")

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1080, "height": 1080})

        for card in cards:
            idx = card["index"]
            html = card_to_html(card, total, author)

            # HTML 임시 파일로 저장 후 로드
            tmp_html = out_dir / f"_tmp_{idx}.html"
            tmp_html.write_text(html, encoding="utf-8")

            page.goto(f"file://{tmp_html.absolute()}")
            page.wait_for_timeout(200)

            out_path = out_dir / f"card_{idx:02d}.png"
            page.screenshot(path=str(out_path))
            tmp_html.unlink()

            print(f"  ✅ card_{idx:02d}.png — {card['title']}")

        browser.close()

    print(f"\n🎉 완료! {out_dir} 에 {total}장 저장됨")


# ────────────────────────────────────────────────
# 4. 메인
# ────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="칼럼 → 인스타그램 카드뉴스 PNG 생성기")
    parser.add_argument("input", help="칼럼 텍스트 파일 경로 (.txt / .md)")
    parser.add_argument("--out", default="output", help="출력 폴더 (기본: ./output)")
    parser.add_argument("--author", default="", help="워터마크 작성자명 (예: @kim_hyeong_mo)")
    args = parser.parse_args()

    # API 키 확인
    if not os.environ.get("ANTHROPIC_API_KEY"):
        print("❌ ANTHROPIC_API_KEY 환경변수가 없습니다.")
        print("   export ANTHROPIC_API_KEY='sk-ant-...' 를 실행하세요.")
        sys.exit(1)

    # 칼럼 읽기
    column_path = Path(args.input)
    if not column_path.exists():
        print(f"❌ 파일을 찾을 수 없습니다: {column_path}")
        sys.exit(1)

    text = column_path.read_text(encoding="utf-8")
    print(f"📄 칼럼 로드: {column_path} ({len(text)}자)")

    # Claude API 호출
    print("🤖 Claude API — 카드 분할 중...")
    cards_data = split_column(text)

    # 렌더링
    out_dir = Path(args.out)
    render_cards(cards_data, out_dir, author=args.author)


if __name__ == "__main__":
    main()
