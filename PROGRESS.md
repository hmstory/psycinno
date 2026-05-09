# PROGRESS.md

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
