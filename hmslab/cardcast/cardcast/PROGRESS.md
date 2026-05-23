# CardCast — 개발 진행 기록

## 2026-05-23

### 완료
- 모바일 레이아웃 수정: Step 1 버튼 잘림, Step 3 카드 미리보기 잘림 해결
- 표 카드 셀 직접 편집 UI: 헤더, 셀 라벨, 배경색, 글자색 피커
- localStorage 자동 저장: 새로고침 후 이어서 편집 가능
- iOS Web Share API: 폰에서 카메라롤 직접 저장
- 동적 scale: 컨테이너 너비 기반 ResizeObserver 적용
- 템플릿 4종 추가: Classic / Dark / Gradient / Quote
- Remotion MP4 애니메이션: 카드 요소 순차 등장
- ROC 곡선 PNG 카드 + MP4 애니메이션: d′ 팽창 효과
- 카드 삽입 위치 개선: 선택한 슬롯 바로 뒤에 삽입

### 결정
- 색상 피커 추가 안 함 — 전문가 평가: 결정 피로 유발, 30초 완성 목표 훼손
- 드래그 기능 보류 — 전문가 평가: Claude가 순서 잡아줌, 지금 불필요
- 이름 변경 안 함 — CarouselMaker 제안 기각, CardCast 브랜드 유지
- ZIP 다운로드 불필요 — 인스타그램은 한 장씩 업로드

### 다음 세션
1. Vercel MP4 렌더링 타임아웃 확인 (배포 환경 검증 필수)
2. ROC 카드 d′ 값 조절 UI
3. 랜딩페이지 초안 (Product Hunt 준비)
