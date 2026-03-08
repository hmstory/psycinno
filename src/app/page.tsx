"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Analysis {
  summary: string;
  presenting_problem: string;
  phq9_scores: number[];
  phq9_total: number;
  gad7_scores: number[];
  gad7_total: number;
  severity_band: string;
  risk_flag: boolean;
  exclusion_flags: {
    substance: boolean;
    antisocial: boolean;
    psychotic: boolean;
  };
  group_readiness: string;
  recommended_group: string;
  reasoning: string;
}

const NUDGE_MESSAGES: Message[] = [
  { role: "assistant", content: "안녕하세요! 편하게 이야기 나눠볼 수 있는 공간이에요." },
  { role: "assistant", content: "이 대화는 검증된 심리 평가 도구를 기반으로 진행됩니다." },
  { role: "assistant", content: "요즘 어떻게 지내고 계세요?" },
];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>(NUDGE_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function extractAnalysis(text: string): Analysis | null {
    const match = text.match(/```json\s*(\{[\s\S]*?\})\s*```/);
    if (!match) return null;
    try {
      const parsed = JSON.parse(match[1]);
      return parsed.analysis || null;
    } catch {
      return null;
    }
  }

  function removeJsonBlock(text: string): string {
    return text.replace(/```json\s*\{[\s\S]*?\}\s*```/, "").trim();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // API에는 넛지를 제외한 실제 대화만 전송
    const apiMessages = newMessages.filter(
      (_, i) => i >= NUDGE_MESSAGES.length
    );

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: "오류가 발생했습니다. 다시 시도해주세요." },
        ]);
      } else {
        const analysisResult = extractAnalysis(data.text);
        if (analysisResult) {
          setAnalysis(analysisResult);
          setShowAnalysis(true);
        }

        setMessages([
          ...newMessages,
          { role: "assistant", content: removeJsonBlock(data.text) },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "네트워크 오류가 발생했습니다." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  const severityBandLabel: Record<string, string> = {
    A: "경도 (정서 지원)",
    B: "중등도 (핵심 타깃)",
    C: "중등도~중증 (주의 관찰)",
    D: "중증 (전문 상담 연계 필요)",
  };

  const analysisPanel = analysis && (
    <div className="space-y-4">
      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase">요약</h3>
        <p className="text-sm text-gray-800 mt-1">{analysis.summary}</p>
      </div>

      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase">호소문제</h3>
        <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
          {analysis.presenting_problem}
        </span>
      </div>

      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase">심각도</h3>
        <div className="mt-1">
          <span className={`inline-block px-3 py-1 text-sm rounded-full ${
            analysis.severity_band === "A" ? "bg-green-100 text-green-800" :
            analysis.severity_band === "B" ? "bg-yellow-100 text-yellow-800" :
            analysis.severity_band === "C" ? "bg-orange-100 text-orange-800" :
            "bg-red-100 text-red-800"
          }`}>
            밴드 {analysis.severity_band}: {severityBandLabel[analysis.severity_band] || ""}
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          <p>PHQ-9: {analysis.phq9_total}/27</p>
          <p>GAD-7: {analysis.gad7_total}/21</p>
        </div>
      </div>

      {analysis.risk_flag && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-800 font-medium">위험 신호 감지</p>
          <p className="text-xs text-red-600 mt-1">전문 상담 연계 필요</p>
        </div>
      )}

      {(analysis.exclusion_flags.substance ||
        analysis.exclusion_flags.antisocial ||
        analysis.exclusion_flags.psychotic) && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-sm text-amber-800 font-medium">제외 기준 플래그</p>
          <ul className="text-xs text-amber-700 mt-1 space-y-1">
            {analysis.exclusion_flags.substance && <li>- 물질 의존 패턴</li>}
            {analysis.exclusion_flags.antisocial && <li>- 반사회적 대인 패턴</li>}
            {analysis.exclusion_flags.psychotic && <li>- 현실 검증력 저하</li>}
          </ul>
        </div>
      )}

      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase">그룹 준비도</h3>
        <span className={`inline-block mt-1 px-3 py-1 text-sm rounded-full ${
          analysis.group_readiness === "high" ? "bg-green-100 text-green-800" :
          analysis.group_readiness === "medium" ? "bg-yellow-100 text-yellow-800" :
          "bg-gray-100 text-gray-800"
        }`}>
          {analysis.group_readiness === "high" ? "높음" :
           analysis.group_readiness === "medium" ? "보통" : "낮음"}
        </span>
      </div>

      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase">추천 그룹</h3>
        <p className="text-sm text-gray-800 mt-1">{analysis.recommended_group}</p>
      </div>

      <div>
        <h3 className="text-xs font-medium text-gray-500 uppercase">매칭 근거</h3>
        <p className="text-sm text-gray-600 mt-1">{analysis.reasoning}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          그룹 카운슬링 매칭 챗봇
        </h1>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          편하게 이야기를 나눠보세요. 대화를 마치고 싶으시면 &quot;마무리&quot;라고 말씀해주세요.
        </p>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 md:px-6 md:space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Mobile: Analysis Result Button */}
          {analysis && (
            <div className="md:hidden px-4 py-2">
              <button
                onClick={() => setShowAnalysis(true)}
                className="w-full py-2.5 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium border border-blue-200"
              >
                분석 결과 보기
              </button>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 bg-white px-4 py-3 md:px-6 md:py-4">
            <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="메시지를 입력하세요..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2.5 md:px-4 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-2.5 md:px-6 md:py-3 bg-blue-500 text-white rounded-xl text-sm font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                전송
              </button>
            </form>
          </div>

          {/* Crisis Hotline Banner */}
          <div className="bg-gray-100 border-t border-gray-200 px-4 py-2 text-center">
            <span className="text-xs text-gray-500">
              힘든 순간엔{" "}
              <a href="tel:1393" className="text-blue-600 font-medium hover:underline">
                1393
              </a>
              {" "}(자살예방상담전화)이 24시간 함께합니다
            </span>
          </div>
        </div>

        {/* Desktop: Analysis Panel */}
        {analysis && (
          <div className="hidden md:block w-80 border-l border-gray-200 bg-white overflow-y-auto p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              분석 결과
            </h2>
            {analysisPanel}
          </div>
        )}
      </div>

      {/* Mobile: Analysis Slide-up Panel */}
      {analysis && showAnalysis && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowAnalysis(false)}
          />
          {/* Panel */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-100 px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">분석 결과</h2>
              <button
                onClick={() => setShowAnalysis(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              {analysisPanel}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
