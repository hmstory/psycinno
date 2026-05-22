"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { toPng } from "html-to-image";
import CardView from "./CardView";

type Cell = { label: string; desc: string; color: string; text_color: string };
type CardData = {
  col_headers?: string[];
  row_headers?: string[];
  cells?: Cell[];
};
type Card = {
  index: number;
  type: string;
  emoji: string;
  title: string;
  body: string;
  accent: string;
  data?: CardData;
  template?: string;
};

const TEMPLATES = [
  { id: "classic", label: "Classic", bg: "#fff", fg: "#111" },
  { id: "dark",    label: "Dark",    bg: "#111", fg: "#fff" },
  { id: "gradient",label: "Gradient",bg: "linear-gradient(135deg,#e0f0ff,#fff)", fg: "#111" },
  { id: "quote",   label: "Quote",   bg: "#fff", fg: "#111" },
];
type CardsResult = { title: string; cards: Card[] };

const STORAGE_KEY = "cardcast_draft";

function loadDraft() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null"); } catch { return null; }
}

export default function Home() {
  const draft = loadDraft();
  const [step, setStep] = useState(draft ? 2 : 1);
  const [text, setText] = useState(draft?.text ?? "");
  const [author, setAuthor] = useState(draft?.author ?? "kim_hyeong_mo");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CardsResult | null>(draft?.result ?? null);
  const [images, setImages] = useState<{ index: number; png: string }[]>([]);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);
  const [rendering, setRendering] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [cardScale, setCardScale] = useState(0.37);

  useEffect(() => {
    const el = previewContainerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setCardScale(entry.contentRect.width / 1080);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [step]);

  function saveDraft(newResult: CardsResult | null, newText: string, newAuthor: string) {
    if (typeof window === "undefined") return;
    if (newResult) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ result: newResult, text: newText, author: newAuthor }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function clearDraft() {
    localStorage.removeItem(STORAGE_KEY);
    setResult(null);
    setText("");
    setStep(1);
  }

  async function handleSplit() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/split", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      setResult(data);
      saveDraft(data, text, author);
      setSelectedSlot(0);
      setStep(2);
    } finally {
      setLoading(false);
    }
  }

  async function handleRender() {
    if (!result) return;
    setRendering(true);
    setStep(3);
    setCurrentCard(0);
    // 이미지는 Step 3 마운트 후 캡처
    setImages([]);
    setRendering(false);
  }

  const captureCard = useCallback(async (idx: number): Promise<string | null> => {
    const el = cardRefs.current[idx];
    if (!el) return null;
    return toPng(el, { width: 1080, height: 1080, pixelRatio: 1 });
  }, []);

  async function downloadSingle(idx: number) {
    const dataUrl = await captureCard(idx);
    if (!dataUrl) return;
    const filename = `card_${String(idx + 1).padStart(2, "0")}.png`;

    // iOS Safari: Web Share API로 앨범 저장 유도
    if (navigator.canShare) {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], filename, { type: "image/png" });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: filename });
        return;
      }
    }
    // fallback: 일반 다운로드
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    a.click();
  }

  async function renderVideo(idx: number) {
    if (!result) return;
    const card = result.cards[idx];
    const isRoc = card.type === "roc";
    const body = isRoc
      ? { type: "roc", accent: card.accent, title: card.title, targetDPrime: (card.data as unknown as { d_prime?: number })?.d_prime ?? 1.5 }
      : { card, total: result.cards.length, author: `@${author}` };
    const res = await fetch("/api/render-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isRoc ? "roc.mp4" : `card_${String(idx + 1).padStart(2, "0")}.mp4`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function downloadAll() {
    if (!result) return;
    for (let i = 0; i < result.cards.length; i++) {
      setCurrentCard(i);
      await new Promise((r) => setTimeout(r, 300));
      await downloadSingle(i);
    }
  }

  function updateCard(idx: number, field: keyof Card, value: string) {
    if (!result) return;
    const updated = result.cards.map((c, i) =>
      i === idx ? { ...c, [field]: value } : c
    );
    const next = { ...result, cards: updated };
    setResult(next);
    saveDraft(next, text, author);
  }

  function addCard() {
    if (!result) return;
    const newCard: Card = {
      index: result.cards.length + 1,
      type: "text",
      emoji: "✨",
      title: "새 카드",
      body: "내용을 입력하세요",
      accent: "#888888",
    };
    setResult({ ...result, cards: [...result.cards, newCard] });
    setSelectedSlot(result.cards.length);
  }

  function addRocCard() {
    if (!result) return;
    const accent = result.cards[0]?.accent ?? "#e53e3e";
    const newCard: Card = {
      index: result.cards.length + 1,
      type: "roc",
      emoji: "📈",
      title: "수신자조작특성 곡선",
      body: "d′이 클수록 탐지 성능이 높아집니다",
      accent,
      data: { d_prime: 1.5 } as unknown as CardData,
    };
    setResult({ ...result, cards: [...result.cards, newCard] });
    setSelectedSlot(result.cards.length);
  }

  function updateCardData(cardIdx: number, patch: Partial<CardData>) {
    if (!result) return;
    const updated = result.cards.map((c, i) =>
      i === cardIdx ? { ...c, data: { ...c.data, ...patch } } : c
    );
    const next = { ...result, cards: updated };
    setResult(next);
    saveDraft(next, text, author);
  }

  function updateCell(cardIdx: number, cellIdx: number, field: keyof Cell, value: string) {
    if (!result) return;
    const card = result.cards[cardIdx];
    const cells = [...(card.data?.cells ?? [])];
    cells[cellIdx] = { ...cells[cellIdx], [field]: value };
    updateCardData(cardIdx, { cells });
  }

  function deleteCard(idx: number) {
    if (!result || result.cards.length <= 2) return;
    const updated = result.cards
      .filter((_, i) => i !== idx)
      .map((c, i) => ({ ...c, index: i + 1 }));
    setResult({ ...result, cards: updated });
    setSelectedSlot(Math.min(selectedSlot, updated.length - 1));
  }

  return (
    <div className="min-h-screen bg-[#f5f4f0]">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="text-lg font-black tracking-tight">
            Card<span className="text-red-600">Cast</span>
          </div>
          <div className="text-sm text-gray-400 font-semibold">@{author}</div>
        </div>
      </header>

      {/* 스텝 바 */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 flex">
          {[
            { n: 1, label: "글 붙여넣기" },
            { n: 2, label: "카드 구성" },
            { n: 3, label: "다운로드" },
          ].map(({ n, label }, i, arr) => (
            <div key={n} className="flex items-center flex-1 sm:flex-none">
              <button
                onClick={() => n < step && setStep(n)}
                className={`flex items-center gap-1.5 px-2 sm:px-5 h-12 text-xs sm:text-sm font-semibold border-b-2 transition-all w-full justify-center sm:justify-start ${
                  step === n
                    ? "text-red-600 border-red-600"
                    : step > n
                    ? "text-green-600 border-green-500 cursor-pointer"
                    : "text-gray-300 border-transparent cursor-default"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                    step === n
                      ? "bg-red-600 text-white"
                      : step > n
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > n ? "✓" : n}
                </span>
                {label}
              </button>
              {i < arr.length - 1 && (
                <span className="text-gray-200 mx-1">›</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            {loadDraft() && (
              <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
                <div>
                  <div className="text-sm font-bold text-amber-700">이전 작업이 저장돼 있어요</div>
                  <div className="text-xs text-amber-500 mt-0.5">"{loadDraft()?.result?.title}"</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setStep(2)} className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">이어서 편집 →</button>
                  <button onClick={clearDraft} className="text-xs text-amber-400 hover:text-amber-600 px-2">새로 시작</button>
                </div>
              </div>
            )}
            <h1 className="text-2xl font-black tracking-tight mb-1">칼럼을 붙여넣으세요</h1>
            <p className="text-sm text-gray-400 mb-6">AI가 카드 단위로 나눠드릴게요. 이후 직접 편집할 수 있어요.</p>
            <div className="bg-white rounded-2xl p-7 shadow-sm">
              <textarea
                ref={textRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="여기에 칼럼 전문을 붙여넣으세요..."
                className="w-full h-64 border border-gray-200 rounded-xl p-4 text-sm leading-relaxed resize-none outline-none focus:border-red-400 transition-colors"
              />
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
                <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-2 w-full sm:w-auto">
                  <span className="text-sm text-gray-400">@</span>
                  <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="text-sm outline-none flex-1 sm:w-36"
                    placeholder="인스타 아이디"
                  />
                  <span className="text-xs text-gray-300 sm:hidden">{text.length}자</span>
                </div>
                <span className="text-xs text-gray-300 hidden sm:block flex-1">{text.length}자</span>
                <button
                  onClick={handleSplit}
                  disabled={!text.trim() || loading}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-200 text-white font-bold px-7 py-3 rounded-lg text-sm transition-colors w-full sm:w-auto"
                >
                  {loading ? "AI 분석 중..." : "카드뉴스 만들기 →"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && result && (
          <div className="flex gap-7">
            {/* 원문 패널 — 모바일 숨김 */}
            <div className="hidden md:block w-72 flex-shrink-0 bg-white rounded-2xl p-5 shadow-sm self-start sticky top-20">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">원문</div>
              <div className="text-xs leading-relaxed text-gray-500 max-h-[500px] overflow-y-auto whitespace-pre-wrap">
                {text}
              </div>
            </div>

            {/* 슬롯 목록 */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-black tracking-tight">{result.title}</h2>
                  <p className="text-xs text-gray-400">클릭해서 수정 · 카드를 추가하거나 삭제할 수 있어요</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={addCard}
                    className="border border-dashed border-gray-300 hover:border-red-400 hover:text-red-500 text-gray-400 text-sm rounded-lg px-4 py-2 transition-colors"
                  >
                    + 카드 추가
                  </button>
                  <button
                    onClick={addRocCard}
                    className="border border-dashed border-blue-300 hover:border-blue-500 hover:text-blue-600 text-blue-400 text-sm rounded-lg px-4 py-2 transition-colors"
                  >
                    📈 ROC 추가
                  </button>
                </div>
              </div>

              {result.cards.map((card, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-2xl mb-3 shadow-sm border-2 transition-all ${
                    selectedSlot === i ? "border-red-500" : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <div
                    className="flex items-center gap-3 px-5 py-3.5 cursor-pointer"
                    onClick={() => setSelectedSlot(selectedSlot === i ? -1 : i)}
                  >
                    <span className="text-gray-300 text-lg select-none">⠿</span>
                    <span className={`text-xs font-black w-6 ${selectedSlot === i ? "text-red-500" : "text-gray-300"}`}>
                      {String(card.index).padStart(2, "0")}
                    </span>
                    <input
                      value={card.emoji}
                      onChange={(e) => updateCard(i, "emoji", e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xl w-8 bg-transparent border-none outline-none"
                    />
                    <input
                      value={card.title}
                      onChange={(e) => updateCard(i, "title", e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 font-bold text-sm bg-transparent border-none outline-none"
                    />
                    <div
                      className="w-4 h-4 rounded-full border border-gray-200 flex-shrink-0"
                      style={{ background: card.accent }}
                    />
                    <span className="text-xs text-gray-300 bg-gray-50 px-2 py-0.5 rounded-full">{card.type}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteCard(i); }}
                      className="text-gray-300 hover:text-red-500 text-sm transition-colors ml-1"
                    >
                      ✕
                    </button>
                  </div>

                  {selectedSlot === i && (
                    <div className="px-5 pb-4 pl-16">
                      {/* 템플릿 선택 */}
                      <div className="flex gap-2 mb-3">
                        {TEMPLATES.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => updateCard(i, "template" as keyof Card, t.id)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
                              (card.template ?? "classic") === t.id
                                ? "border-red-500 text-red-600"
                                : "border-gray-200 text-gray-400 hover:border-gray-400"
                            }`}
                            style={{ background: t.bg }}
                          >
                            <span style={{ color: t.fg === "#fff" ? "#fff" : undefined }}>{t.label}</span>
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={card.body}
                        onChange={(e) => updateCard(i, "body", e.target.value)}
                        className="w-full text-sm text-gray-600 border border-gray-200 rounded-lg p-3 resize-none h-20 outline-none focus:border-red-400 transition-colors leading-relaxed"
                      />
                      {card.type === "table" && card.data && (
                        <div className="mt-3 space-y-3">
                          {/* 열 헤더 */}
                          <div className="flex gap-2">
                            <div className="w-20 flex-shrink-0" />
                            {[0, 1].map((ci) => (
                              <input
                                key={ci}
                                value={card.data!.col_headers?.[ci] ?? ""}
                                onChange={(e) => {
                                  const h = [...(card.data!.col_headers ?? ["", ""])];
                                  h[ci] = e.target.value;
                                  updateCardData(i, { col_headers: h });
                                }}
                                className="flex-1 text-xs font-bold text-center border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-red-400 bg-gray-50"
                                placeholder={`열 ${ci + 1}`}
                              />
                            ))}
                          </div>
                          {/* 행 */}
                          {[0, 1].map((ri) => (
                            <div key={ri} className="flex gap-2">
                              <input
                                value={card.data!.row_headers?.[ri] ?? ""}
                                onChange={(e) => {
                                  const h = [...(card.data!.row_headers ?? ["", ""])];
                                  h[ri] = e.target.value;
                                  updateCardData(i, { row_headers: h });
                                }}
                                className="w-20 flex-shrink-0 text-xs font-bold text-center border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-red-400 bg-gray-50"
                                placeholder={`행 ${ri + 1}`}
                              />
                              {[0, 1].map((ci) => {
                                const cellIdx = ri * 2 + ci;
                                const cell = card.data!.cells?.[cellIdx] ?? { label: "", desc: "", color: "#f5f5f5", text_color: "#333" };
                                return (
                                  <div key={ci} className="flex-1 border border-gray-200 rounded-lg p-2 space-y-1" style={{ background: cell.color + "33" }}>
                                    <input
                                      value={cell.label}
                                      onChange={(e) => updateCell(i, cellIdx, "label", e.target.value)}
                                      className="w-full text-xs font-black text-center border border-gray-200 rounded px-1 py-0.5 outline-none focus:border-red-400 bg-white"
                                      placeholder="제목"
                                    />
                                    <input
                                      value={cell.desc}
                                      onChange={(e) => updateCell(i, cellIdx, "desc", e.target.value)}
                                      className="w-full text-xs text-center border border-gray-200 rounded px-1 py-0.5 outline-none focus:border-red-400 bg-white"
                                      placeholder="설명"
                                    />
                                    <div className="flex items-center gap-1">
                                      <label className="text-[10px] text-gray-400">배경</label>
                                      <input type="color" value={cell.color} onChange={(e) => updateCell(i, cellIdx, "color", e.target.value)} className="w-6 h-5 cursor-pointer rounded border-none" />
                                      <label className="text-[10px] text-gray-400 ml-1">글자</label>
                                      <input type="color" value={cell.text_color} onChange={(e) => updateCell(i, cellIdx, "text_color", e.target.value)} className="w-6 h-5 cursor-pointer rounded border-none" />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setStep(1)}
                  className="border border-gray-200 bg-white text-gray-500 font-semibold px-5 py-2.5 rounded-lg text-sm hover:border-gray-400 transition-colors"
                >
                  ← 다시 쓰기
                </button>
                <button
                  onClick={handleRender}
                  disabled={rendering}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-200 text-white font-bold px-7 py-2.5 rounded-lg text-sm transition-colors"
                >
                  {rendering ? "PNG 생성 중..." : "미리보기 →"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && result && (
          <div className="flex flex-col md:flex-row gap-5">
            {/* 미니 목록 — 모바일: 가로 스크롤 */}
            <div className="flex md:flex-col gap-2 overflow-x-auto pb-1 md:w-48 md:flex-shrink-0">
              {result.cards.map((card, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentCard(i)}
                  className={`flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border-2 text-left transition-all shadow-sm flex-shrink-0 ${
                    currentCard === i ? "border-red-500" : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <span className={`text-xs font-black w-5 flex-shrink-0 ${currentCard === i ? "text-red-500" : "text-gray-300"}`}>
                    {String(card.index).padStart(2, "0")}
                  </span>
                  <span className="text-base">{card.emoji}</span>
                  <span className="text-xs font-bold text-gray-600 truncate md:max-w-none max-w-[80px]">{card.title}</span>
                </button>
              ))}
            </div>

            {/* 미리보기 */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl p-4 sm:p-7 shadow-sm">
                {/* 미리보기 — 컨테이너 너비 기반 동적 scale */}
                <div ref={previewContainerRef} className="w-full rounded-xl overflow-hidden shadow-lg"
                  style={{ position: "relative", height: 0, paddingBottom: "100%" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden" }}>
                    <div style={{ width: 1080, height: 1080, transform: `scale(${cardScale})`, transformOrigin: "top left" }}>
                      <CardView
                        card={result.cards[currentCard]}
                        total={result.cards.length}
                        author={`@${author}`}
                        ref={(el) => { cardRefs.current[currentCard] = el; }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => setCurrentCard(Math.max(0, currentCard - 1))}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-500 hover:border-gray-400 transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentCard(Math.min(result.cards.length - 1, currentCard + 1))}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-semibold text-gray-500 hover:border-gray-400 transition-colors"
                  >
                    →
                  </button>
                  <span className="text-xs text-gray-400 flex-1 text-center">{currentCard + 1} / {result.cards.length}</span>
                  <button
                    onClick={() => downloadSingle(currentCard)}
                    className="bg-gray-900 text-white font-bold px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors"
                  >
                    ⬇ PNG
                  </button>
                  <button
                    onClick={() => renderVideo(currentCard)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    🎬 MP4
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm mt-5 flex items-center justify-between">
                <div>
                  <div className="font-bold">전체 {result.cards.length}장</div>
                  <div className="text-xs text-gray-400 mt-0.5">편집하려면 카드 구성으로 돌아가세요</div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="border border-gray-200 bg-white text-gray-500 font-semibold px-4 py-2.5 rounded-lg text-sm hover:border-gray-400 transition-colors"
                  >
                    ← 카드 편집
                  </button>
                  <button
                    onClick={downloadAll}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors"
                  >
                    ⬇ 전체 다운로드
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
