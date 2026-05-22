import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

const SPLIT_PROMPT = `당신은 칼럼을 인스타그램 카드뉴스로 변환하는 전문가입니다.

아래 칼럼을 읽고 카드뉴스로 분할해주세요.

규칙:
- 첫 카드: 훅 (왜 읽어야 하는지, 핵심 질문)
- 중간 카드: 개념 하나씩, 핵심만
- 마지막 카드: 핵심 요약 + 한 줄 결론
- 카드당 본문 60자 이내
- 총 카드 수: 6~12장

[표 감지 규칙 — 매우 중요]
2×2 매트릭스 또는 4개 항목이 2행×2열로 대응되는 개념이 나오면
반드시 type="table"로 하고 data 필드를 채우세요.
절대 4장의 개별 text 카드로 쪼개지 마세요.

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
          {"label": "Hit ✓",         "desc": "정확히 알아챔",  "color": "#e8f5e9", "text_color": "#2e7d32"},
          {"label": "False Alarm ✗", "desc": "혼자 착각",      "color": "#fff3e0", "text_color": "#e65100"},
          {"label": "Miss ✗",        "desc": "기회를 날림",    "color": "#fce4ec", "text_color": "#c62828"},
          {"label": "정기각 ✓",      "desc": "현실 파악 완료", "color": "#e3f2fd", "text_color": "#1565c0"}
        ]
      }
    }
  ]
}

type 종류: text / table / chart
accent: 카드 포인트 색상 (hex). 감정/주제에 맞게 자유롭게.
cells 순서: [행1열1, 행1열2, 행2열1, 행2열2]`;

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  if (!text?.trim()) {
    return NextResponse.json({ error: "텍스트가 없습니다" }, { status: 400 });
  }

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    messages: [{ role: "user", content: `${SPLIT_PROMPT}\n\n---\n${text}` }],
  });

  const raw = (message.content[0] as { text: string }).text.trim();
  const match = raw.match(/\{[\s\S]*\}/);
  const data = JSON.parse(match ? match[0] : raw);

  return NextResponse.json(data);
}
