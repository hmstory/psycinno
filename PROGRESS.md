# PROGRESS.md

## 2026-05-25

### 완료
- /extract-figures 스킬 — Ch.10 멀티태스킹 PDF에서 fig10.1~10.6 추출 (PyMuPDF 벡터 크롭)
- /weekly-report 스킬 — W12 주교재 Ch.10 Decision Making 보고서 배포 (notebooklm 모드)
  - w12-reports/ 폴더 생성, index.html + w12-chapter10.md + 이미지 6개
  - 기존 HTML 14개 페이지 nav 누적 업데이트 후 커밋·푸시 완료
- RAG 7블록 전체 작성 완료 (피해자전담경찰봇 CBT 설계)
- 플랫폼 출력 규칙 확정: 봇 발화만 출력, JSON/분석 텍스트 화면 노출 금지

### 결정 사항
- RAG_4 소크라테스 질문 단순화 백로그로 이관 (현재 너무 길고 학술적 → 15자 이내)
- CBT + RAG 슬라이드 배포 완료, CSE/PACT 척도 교수 자문 예정

### 배포
- W12 인지공학심리학 보고서: https://hmstory.github.io/psycinno/cognitive-engineering/w12-reports/
- CBT + RAG 슬라이드: https://hmstory.github.io/psycinno/psychology-ai/slides/cbt-asis-tobe.html

## 2026-05-13~14 — 연구 프로포절 2차 보강 + 팟미니멀 UI 프로토타입 배포

### 완료한 것
- Polyn(2005) 논문 읽기 (맥락 재활성화 가설, fMRI, MVPA) — 에피소딕 버퍼 이론 근거 확보
- 인지공학심리학 연구 프로포절 2차 작성 완료
  - 독립변수: 영상 포맷(얼굴만 vs 얼굴+자막) × 서술방식(1인칭 vs 3인칭)
  - 매개변수: 개인 연관성 지각 / 이론: CLT + PCP/CTML + 에피소딕 버퍼 + 자기관련성 효과
  - 가상 데이터 CSV + 구글시트 링크 삽입, 실제 팟캐스트 대사·유튜브 링크 포함
  - 서브에이전트 비판적 검토 실행
- 팟미니멀(PodMinimal) UI 프로토타입 4화면 제작 (업로드/처리중/Before-After/원리설명)
  - GitHub Pages 배포: https://hmstory.github.io/psycinno/podminimal/
  - 제출용 zip 파일 생성

### 발견한 문제
- PCP 단독 인용 시 이론 커버리지 부족 → CTML 병기로 보강

### 결정 사항
- 연구 프로포절 0번 섹션(연구 맥락 및 전제) 신설
- 롱폼 정의: 30분 이상 (사용자 직접 확정)
- 팟미니멀 ↔ 프로포절 역할 분담: B안(영상포맷 vs 서술방식) 확정

## 2026-05-09 — 심리통계입문 논문발표 슬라이드 제작 및 배포

### 완료한 것
- `psych-stats/slides/trolling-presentation.html` 신규 생성 (psych-stats 폴더 신설)
- 총 19장 슬라이드 구성 (역할분담 / 서론 / 연구방법 / 결과 / 논의)
- 통계 원리 슬라이드 3개 추가: Cronbach's α / VIF 다중공선성 / 로지스틱 회귀
  - 각 슬라이드: 개념 + 왜필요 + 계산공식 + 이 논문 실제 수치
- 발표자 노트 사이드패널 (슬라이드별, 말할 내용 + 예상질문 + 전환 멘트)
- 슬라이드 renumbering 18→19 (Python 스크립트, 역순 치환)
- 모바일 반응형 CSS (`@media max-width: 820px`) 추가
- GitHub Pages 배포 완료

### 배포 URL
https://hmstory.github.io/psycinno/psych-stats/slides/trolling-presentation.html

### 발견한 문제 / 해결
- renumbering 중 `id="s11"` 중복 발생 → 역순 Python 치환으로 해결
- 발표자 본인이 통계 원리 이해 못함 → 슬라이드에 계산 원리·공식 직접 추가

### 결정 사항
- psych-stats/ 폴더를 psycinno 레포 독립 섹션으로 운영
- 발표자 노트는 HTML 인라인 관리 (단일 파일 배포 유지)

## 2026-04-27
- 인지공학심리학 중간고사 v1.1 문제지 메모리 업데이트 (project_cog_eng_midterm_2026.md)
  - 교재 범위 Ch1-6 → Ch1-7 정정, Q3-2 대학원생 UX 의견 추가, Q4-1 풀이 프로세스 명시
- Ch1-3 완독 기준 문항별 가능 여부 분류 (완전 가능 210점: Q1·Q2·Q3)
- Q1-3 풀이 전략 가이드 작성 + GitHub Pages 배포 (커밋 05c323d)
  - 배포 URL: https://hmstory.github.io/psycinno/cognitive-engineering/midterm-strategy/
  - 문제 전문 + HIPM·SDT·SEEV·PCP 이론 전략 + 심성모형 연결 포함
- 다음: Ch7 읽기(WM·SA·CLT·Automaticity) → Q6 완성 + Q5-2 / 마감 4/28 22:00

## 2026-04-25
- research-proposal/index.html v0.3 모바일 최적화 배포 (커밋 8179845)
- CSS 미디어 쿼리 전면 개선, 테이블 6개 .table-wrap 래핑, 다이어그램 flex-wrap+width calc(50%), body padding 모바일 축소
- 배포 URL: https://hmstory.github.io/psycinno/research-proposal/
- 다음: 연구 내용 보강 또는 피치덱 연동 검토

## 2026-04-17
- W7 주교재 Ch.7 Memory & Training 배포 완료 (knowledge mode 시범)
- weekly-report 스킬 개조: notebooklm / knowledge 듀얼 모드 지원
- 지식파일 → knowledge-blocks.json + prequiz.json → DOM 주입 (Spine/Terms/Figures/Links/Prequiz 5블록)
- Figure 7.1~7.7 + Table 7.1 PDF 추출 (get_text("blocks") 방식, 크로스-레퍼런스 함정 회피)
- Figure/Table 파일명 충돌 해결: fig{num}.png vs tab{num}.png 분기

## 2026-04-16
- W6 Laws of UX Ch5 Postel's Law 배포 완료
- Figure 5-1~5-6 PDF 추출 (6개), 볼드 오류 14건·탭 테이블 1건 자동 수정
- 누적 nav 9개 페이지 + 루트 포털 업데이트, git push 완료
- 모델 분기 확정: weekly-textbook=Opus 4.6 / weekly-report=Sonnet 4.6
