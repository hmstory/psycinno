---
source: Engineering Psychology & Human Performance (Wickens et al.) Chapter 7
title: Memory and Training
pages: 197-244
created: 2026-04-16
---

# Ch7. Memory and Training

## 0. Argument Spine (논증의 뼈대)

> **이 챕터의 한 줄 주장**: 인간의 작업기억은 용량이 작고 간섭에 취약하므로, 시스템은 이 한계를 디스플레이 설계와 훈련(training)으로 우회해야 한다 — 청킹·숙련·LT-WM·CLT는 모두 이 한계를 피하거나 넘어서려는 공학적 대응이다.

**왜 이 순서로 개념을 배치했나**
1. 먼저 **작업기억(WM)의 한계**(Baddeley 4요소, 7±2→3-4 다운그레이드, decay, S-C-R 호환성)를 깔아서 "왜 문제가 생기는지"를 성립.
2. 그 위에 **간섭(PI/RI)**을 얹어 WM 문제가 디스플레이/인터페이스 상황에서 어떻게 성능 저하로 이어지는지 보여준 뒤
3. **숙련(expertise)과 LT-WM**으로 "경험 많은 사람은 어떻게 이 한계를 넘는가"를 설명 — 청킹과 장기기억 포인터가 탈출구.
4. 이 모든 WM 메커니즘을 실세계로 끌어 올려 **상황인식(SA)·계획·문제해결**에 적용.
5. 그리고 **훈련(Training)**을 주 개입 수단으로 제시: CLT로 부하를 분해하고, scaffolding·part-task·active learning 같은 구체 기법이 germane load를 늘린다.
6. 마지막으로 훈련이 목표로 하는 **장기기억(LTM) 표상·조직·인출·망각·유지**를 다뤄, 챕터 전체 루프를 닫는다.

**Spine 아래에서 각 주요 개념의 역할**
- **Baddeley 4-component WM**: 한계의 정체를 해부한 진단 틀 — 이후 모든 설계 원리가 "어느 요소에 부담을 줄이는가"로 평가됨.
- **Interference (PI/RI)**: WM 한계가 실패로 나타나는 주요 통로. 설계 원리 5개(Section 3)의 근거.
- **Expertise effect + LT-WM**: 한계를 *우회*하는 자연적 메커니즘 — 훈련이 지향해야 할 목표 상태.
- **Situation Awareness**: WM+LTM이 실시간으로 결합해 만드는 산출물. Level 1/2/3와 SAGAT/SPAM은 이 산출물의 측정 틀.
- **Cognitive Load Theory (CLT)**: 훈련 전략 전체를 묶는 통합 프레임 — intrinsic/germane/extraneous 3분할이 이후 모든 기법의 평가 잣대.
- **Training techniques**: scaffolding, worked examples, part-task, variable priority, active learning, multimedia, feedback, overlearning, distribution of practice, training-transfer dissociation — 각각 CLT의 어느 부하를 조작하는지로 읽어야 함.
- **LTM representation (mental models, ontology)**: 훈련이 만들어낸 지식의 *형태*와 그 조직. 인터페이스와 mental model의 호환성이 재사용성을 결정.

> 📌 이 챕터는 **논증형 + 모듈형 하이브리드**. WM→Training→LTM 뼈대는 논증형이지만, SA·Planning·Skill Retention은 준독립 모듈이다. 논증의 중심축은 "한계 → 우회/보완 → 영속적 조직"이다.

---

## 1. 챕터 개요

> 한 문장 핵심 메시지: **Working memory is a narrow bottleneck; training and display design are the two primary engineering responses for pushing information past it into durable long-term memory.**

이 챕터는 정보의 **encoding → storage → retrieval** 3단계(Figure 7.1)를 기반으로, 단기 병목인 working memory, 장기 저장소인 long-term memory, 그리고 두 저장소를 연결·강화하는 training을 함께 다룬다. 진단(메모리 한계) → 개입(훈련) → 산출(LTM 표상) 순서로 읽으면 흐름이 보인다.

---

## 2. 섹션별 핵심 요약

### 1. OVERVIEW
메모리는 encoding(부호화)·storage(저장)·retrieval(인출) 3단계로 작동하며, working memory(WM, 단기)와 long-term memory(LTM, 장기)로 나뉜다. Figure 7.1이 전체 흐름을 도식화한다. 이 장의 관심은 WM 한계가 실세계 과제에서 어떻게 병목이 되는가, 그리고 LTM에 어떻게 안정적으로 저장·인출 가능한 형태로 넘기느냐다.

### 2. WORKING MEMORY — Baddeley 모델
Baddeley의 4요소 모델: (1) **phonological store + loop**(음운/언어 정보), (2) **visuo-spatial sketch pad**(시공간 이미지), (3) **central executive**(주의 할당·과제 전환), (4) **episodic buffer**(각 요소 통합 + LTM 연계). 음운·시공간은 독립 채널이라 서로 덜 간섭한다. 이는 멀티모달 디스플레이(시각+청각) 설계의 이론적 근거.

### 2.1 Stimulus-Central-Response Compatibility (S-C-R)
Wickens, Sandry & Vidulich (1983): 입력 모달리티, 중앙처리 코드, 반응 모달리티가 같은 코드(음성 vs. 공간)로 호환되면 성능이 올라간다. 음성 명령→음성 응답 / 시각 공간 정보→손 조작이 자연스러운 매칭. Figure 7.2가 이 호환성을 보여준다.

### 2.2 Duration, Capacity, Chunking
- **Duration**: Brown-Peterson paradigm에서 rehearsal을 막으면 WM 항목은 **수초~20초 안에 decay**. Figure 7.3은 decay 곡선.
- **Capacity**: 고전적 Miller 7±2는 최근 연구에서 **3~4 chunk**로 하향 조정(Cowan 2001). 그러나 chunking을 통해 "단위"가 커지면 실효 용량이 늘어난다.
- **Chunking**: 개별 항목을 의미 단위로 묶어 하나의 chunk로 저장 → 용량 절약. 예: 숫자열 11-22-33-44 를 4개 chunk가 아닌 "두 자리 반복 패턴"으로.
- **Parsing**: 전화번호 하이픈처럼 인위적 경계로 chunk를 돕는다. 디스플레이 설계에서 의미단위를 시각적으로 분리하라는 원리.

### 3. INTERFERENCE AND CONFUSION
- **Proactive Interference (PI)**: 이전 학습이 새 정보 저장을 방해.
- **Retroactive Interference (RI)**: 새 학습이 이전 정보 인출을 방해. Figure 7.4가 두 간섭을 시간축에서 보여준다.
- **5가지 설계 함의**: (a) WM 항목 간 유사성 최소화, (b) 의미적 context 제공, (c) parsing으로 chunk 경계 명시, (d) 시공간 vs 음운 분리, (e) rehearsal 시간 확보. 유사한 무전 호출기호, 유사한 메뉴 레이블이 전형적 PI/RI 함정.

### 4. EXPERTISE AND MEMORY
숙련자는 초보자보다 작은 WM으로도 더 많이 기억한다 — **청킹이 더 굵고, LTM 포인터 접근이 빠르기 때문**.
- **Template theory** (Gobet & Clarkson 2004): 체스 고수는 수만 개의 판 배치 템플릿을 LTM에 보유, 한눈에 여러 말을 하나의 템플릿으로 청킹.
- **Chase & Simon (1973)**: 체스 고수는 *실제 경기 배치*는 잘 기억하지만 *랜덤 배치*는 초보자 수준 — 기억 향상이 지능이 아닌 패턴 친숙성에서 온다는 결정적 증거.
- **Long-Term Working Memory (LT-WM)** (Ericsson & Kintsch 1995): 숙련자는 LTM 안에 작업용 인덱스를 구축, WM이 이를 *포인터*로만 유지해 사실상 용량을 확장. 예: 고수 웨이터 JC는 20명분 주문을 위치·요리별로 조직해 기억.

### 5. EVERYDAY MEMORY

#### 5.1 Prospective Memory (PM)
"미래에 어떤 행동을 하겠다"는 의도를 기억하는 능력. 약 먹기, 회의 참석 등. 방해(interruption) 시 깨지기 쉽다.
- **Implementation intention** (McFarland & Glisky 2011): "X 상황에서 Y 행동"을 구체화하면 PM 성공률 증가.
- **Interruption management**: 중단 후 복귀 지점을 표시(retrieval cue)해 PM 실패 방지.

#### 5.2 Transactive Memory (TM)
그룹이 공유하는 "누가 무엇을 아는가"의 분산 기억 시스템. 팀 SA의 근간(Ch.6과 연결).
- 3차원: **specialization**(역할 분담), **coordination**(연계), **credibility**(신뢰).
- **Collaborative inhibition** (Weldon & Bellinger 1997): 공동 회상 시 타인 전략이 자신의 검색을 방해 → 각 구성원이 자기 영역 전문일 때 완화됨.
- 함의: 급조 팀보다 함께 훈련받은 팀이 TMS 개발로 더 효율적.

### 6. SITUATION AWARENESS (SA)
Endsley 정의: 환경 요소의 **perception(인지)** → **comprehension(이해)** → **projection(예측)**.

#### 6.1 WM and Expertise in SA
SA는 WM 집약적이지만, 숙련자는 LT-WM을 활용해 WM 부담을 줄인다. Sohn & Doane (2003, 2004): 초보 조종사에겐 WM이, 숙련 조종사에겐 memory skill(LT-WM)이 SA와 더 강하게 상관.

#### 6.2 Levels of SA and Anticipation
- Level 3(projection)가 가장 어렵고 연구도 적음 — 행동 선택/결정 이전 단계.
- 예측 달성 메커니즘: (a) leading indicator 주시, (b) mental simulation(pattern-matching), (c) LTM mental model 기반 generative prediction(Endsley 2000), (d) Cognitive Streaming (Banbury et al. 2004) — **transitional probabilities**(어떤 사건 뒤에 어떤 사건이 오는지 확률 지식)로 예측.

#### 6.3 Measuring SA
- **SAGAT** (Endsley 1995b): 시뮬레이션을 freeze, 디스플레이를 가리고 질문 — 3 level 모두 측정. 단점: intrusiveness(과제 중단).
- **SPAM** (Durso & Dattel 2004): 디스플레이를 켜둔 채 프로브 질문 — 반응 시간으로 정보 접근성 측정. distributed cognition 관점.
- **Implicit performance-based measures** (Croft et al. 2004): 비의식적 SA를 포착. 의식적 인식과 무관해도 행동은 SA 좋음을 보여줄 수 있음.

### 7. PLANNING AND PROBLEM SOLVING
둘 다 central executive를 사용하는 WM 집약적 활동. WM 부하가 계획 성능을 저하(Ward & Allport 1997).
- **Satisficing** (Simon 1990): 최적이 아닌 "충분히 괜찮은" 해 선택 — WM 용량 한계의 자연스러운 결과.
- **Opportunistic planning** (Vinze et al. 1993): 한 단계에서 부분 해가 보이면 그대로 진행 — 국소 최적이지만 전역 최적 아님.
- 외부 표상(display)이 WM 부하를 줄여 문제해결 돕는다. 예: Tower of Hanoi, TSP의 convex hull 직관.
- **CECA model** (Bryant 2003): Critique–Explore–Compare–Adapt, 군 지휘관의 계획 정당화 과정.
- **Heterogeneous teams**(다른 훈련을 받은 조): 표준 과제엔 약하지만 새 전이 과제엔 강함 → 다양성이 germane load를 높인다.

### 8. TRAINING

#### 8.1 Transfer of Training (Figure 7.5, 7.6)
- **% transfer = (control time − transfer time) / control time × 100** (식 7.1).
- **TER (Transfer Effectiveness Ratio)** = savings / training program time (식 7.2). TER>1이면 훈련이 실제 과제보다 효율적.
- **TCR (Training Cost Ratio)** = (실제 환경 비용/단위시간) / (훈련 장치 비용/단위시간). TER×TCR>1이면 cost-effective.
- **Training System Fidelity**: 높은 충실도가 항상 최선 아님. Space Fortress 게임이 전투기 조종에 긍정 전이(Gopher, Weil, & Bareket 1994) — 표면 유사성보다 인지 요구 유사성이 중요.

#### 8.1.3 Negative Transfer (Table 7.1)
| Stimulus | Response | Transfer |
|----------|----------|----------|
| Same | Same | ++ (매우 긍정) |
| Same | Different (incompatible) | − (부정) |
| Different | Same | + (긍정) |
| Different | Different | 0 |

자극은 같은데 반응이 다를 때(동일 키보드, 다른 단축키) 부정 전이 최악. 일관된 S-R mapping이 설계 원칙.

#### 8.2 Training Techniques — Cognitive Load Theory (CLT)
Sweller (1999) CLT 3분할:
- **Intrinsic load**: 과제 자체의 고유 복잡성(행동할 자원).
- **Germane load**: 학습을 위한 자원(schema 구축).
- **Extraneous load**: 과제와 무관한 방해(불필요한 UI, 소음).

**전략 목표**: extraneous↓, germane↑, intrinsic은 학습자 수준에 맞춰 점진 증가.

- **8.2.2 Worked examples / Scaffolding**: 초기 학습에서 지원을 많이 주고 점차 거둔다 → extraneous 제거. 약 50% transfer 개선.
- **8.2.3 Task Simplification**: 쉬운 버전부터 시작, adaptive training으로 학습자 수준에 맞춤.
- **8.2.4 Part-task training**: **Fractionation**(과제별 분할)은 동시수행 기술(time-sharing skill) 부재로 부정 전이 위험. **Segmentation**(시간 순서 분할)은 안전. **Variable priority training** (Gopher, Weil, & Siegel 1989): 부분들을 늘 함께 연습하되 강조점을 바꿔가며.
- **8.2.5 Active learning + Generation effect** (Slamecka & Graf 1978): 스스로 답을 만들면 수동 학습보다 깊이 있는 부호화. Generation > deep processing (Craik & Lockhart 1972).
- **8.2.6 Multimedia instruction (Mayer)**: (1) Modality combinations(시각+청각 분산), (2) Temporal contiguity, (3) Spatial contiguity, (4) Highlighting, (5) Filtering irrelevant material.
- **8.2.7 Feedback**: Concurrent(즉시) vs Delayed(지연). Concurrent은 dual-task 간섭 유발 위험 — 스킬이 내재화된 후에는 delayed가 장기기억에 유리.
- **8.2.8 Practice and Overlearning**: error-free 수행 후에도 연습은 *속도*와 *자동성*을 높인다. Emergency response 절차엔 overlearning 필수(Logan & Klapp 1991).
- **8.2.9 Expertise effect**: 초보자용 지원(worked examples, scaffolding)은 숙련자에겐 오히려 해 — 이미 아는 것을 또 줌으로써 germane 자원을 낭비(Aptitude × Treatment Interaction).
- **8.2.10 Distribution of practice**: Massed < Spaced. 블록(AAAAABBBCCC)보다 interleaved(ABCABCABC)가 retention에 강함.
- **8.2.11 Training-transfer dissociation** (Bjork 1992): 훈련 중 학습이 쉽고 빠르다고 *전이*가 좋은 것은 아니다. 어려운 훈련이 오히려 장기 유지에 유리 — "desirable difficulties".

### 9. LONG TERM MEMORY: REPRESENTATION, ORGANIZATION, RETRIEVAL

#### 9.1 Knowledge Representation
- **Procedural vs declarative**: 절차적(자전거 타기) vs 선언적(사실). 선언적은 semantic(개념)과 episodic(특정 사건)로 분화.
- **Grounded cognition** (Barsalou 2008): LTM 인출 시 감각/지각 영역이 재활성 → 기억은 정적 저장소가 아니라 시뮬레이션.

##### 9.1.1 Knowledge Organization
Collins & Quillian (1969) 계층적 조직. 메뉴 시스템은 사용자 mental model과 같은 조직이어야 검색이 빠르다 (Seidler & Wickens 1992).

##### 9.1.2 Mental Model
시스템이 어떻게 반응할지에 대한 기대 구조. Visibility(Norman 1992): 장치 상태를 쉽게 볼 수 있을 때 mental model이 정확해진다. 숙련자는 여러 mental model을 상황에 맞게 전환 가능.

##### 9.1.3 Knowledge Elicitation methods
1. Scaling techniques, 2. Protocol analysis (think-aloud), 3. Interviews, 4. Observation, 5. Structured elicitation, 6. Document analysis. **Conceptual Graph Analysis (CGA)**: 개념 노드+링크로 표상. **Ontology**: 도메인의 형식적 분류체계 — AI 시스템 설계에 유용. Figure 7.7이 Afghanistan 반군 활동 개념의 다차원 표상 예시.

#### 9.2 Memory Retrieval and Forgetting
- **Recall vs Recognition**: Recall(생성)이 Recognition(인지)보다 어렵다. "지식을 머리에 두기" vs "세상에 두기"(Norman 1992). 명령어 기반 인터페이스(recall) vs 메뉴(recognition).
- **Remember-know paradigm** (Gardiner & Richardson-Klavehn 2000): 명시적 기억(remember) vs 친숙성(know/familiarity)의 분리.
- **Retrieval cues & checklists**: 체크리스트가 PM 실패를 막는 공학적 장치.
- **Retrieval-induced forgetting** (Coman, Manier, & Hirst 2009): 일부를 반복 인출하면 관련된 다른 항목은 더 빨리 잊힌다.
- **Event memory & Misinformation effect** (Loftus): 사건 후 정보가 원 기억에 통합되어 "본 적 없는 것을 봤다"고 확신 — 목격자 증언의 근본 문제.

#### 9.3 Skill Retention
- **Skill type**: 지각운동기술(자전거)은 잘 유지, 인지기술(단어처리기 단축키)은 빨리 잊힌다 — **Digital skills**(C2 시스템)이 가장 취약.
- **Sequence of practice**: 복합 과제는 절차적(P-M) 요소 먼저 훈련 후 선언적 요소(Clawson, Healy, et al. 2001).
- **Individual differences**: 큰 WM은 더 효율적인 chunking·피드백 활용 → 빠른 학습자가 더 잘 유지.

### 10. TRANSITION
WM·LTM 한계 → 망각 → Ch.8 Decision Making으로 연결. 의사결정은 WM 부하 → 휴리스틱 사용 → LTM 유사 사례 참조 → 체계적 편향을 낳는다.

---

## 3. 핵심 개념 정의

| 용어 | 정의 | 관련 섹션 |
|------|------|-----------|
| working memory | 정보를 짧게(수초~20초) 유지·조작하는 활성 저장소 | 2 |
| phonological store / loop | 음운 정보를 저장(store)하고 rehearsal로 갱신(loop)하는 WM 하위체계 | 2 |
| visuo-spatial sketch pad | 시각·공간 이미지를 유지하는 WM 하위체계 | 2 |
| central executive | WM 자원을 할당·통제하는 주의 시스템 | 2 |
| episodic buffer | 여러 부호의 정보를 통합해 LTM과 연결하는 WM 요소 | 2 |
| chunking | 개별 항목을 의미 단위로 묶어 한 chunk로 저장 | 2.2 |
| parsing | 디스플레이에서 chunk 경계를 시각/시간적으로 표시 | 2.2 |
| memory span | 즉시 회상 가능한 항목 수(3~4 chunk) | 2.2 |
| iconic memory | 시각 감각 기억 (수백 ms) | 2 |
| echoic memory | 청각 감각 기억 (수 초) | 2 |
| proactive interference | 이전 학습이 새 정보 부호화를 방해 | 3 |
| retroactive interference | 새 학습이 기존 정보 인출을 방해 | 3 |
| stimulus-central-response compatibility | 입력·처리·반응 코드가 같을 때 성능 향상 | 2.1 |
| binding | 특성들을 하나의 객체로 묶는 WM 과정 | 2 |
| expertise effect | 숙련자는 같은 전략이 주는 이득이 다름(초보자용 지원이 역효과) | 8.2.9 |
| template theory | 체스 고수의 판 기억을 설명하는 LTM 템플릿 이론 | 4 |
| long-term working memory (LT-WM) | 숙련자가 WM 포인터로 LTM에 정보를 두는 확장 메커니즘 | 4 |
| prospective memory | 미래 의도된 행동을 기억 | 5.1 |
| implementation intention | "X 상황에서 Y 행동" 형태로 의도를 구체화 | 5.1 |
| transactive memory | 그룹의 "누가 무엇을 아는가" 분산 기억 | 5.2 |
| collaborative inhibition | 공동 회상 시 타인 전략이 내 회상을 방해 | 5.2 |
| situation awareness | 환경 인지·이해·예측의 통합 상태 | 6 |
| situation assessment | SA를 얻기 위한 인지적 과정 | 6 |
| system lag | 시스템 반응 지연, 예측 디스플레이의 존재 이유 | 6.2 |
| cognitive streaming | transitional probability 기반 예측 프레임워크 | 6.2 |
| SAGAT | 시뮬레이션 freeze + 질의로 SA 측정 | 6.3 |
| SPAM | 실시간 프로브로 SA의 접근성 측정 | 6.3 |
| intrusiveness | 측정이 수행에 미치는 방해 | 6.3 |
| implicit performance-based measure | 비의식적 SA를 수행으로 추정 | 6.3 |
| satisfice | 최적이 아닌 "충분히 괜찮은" 해 선택 | 7 |
| opportunistic planning | 부분해가 보이면 즉시 채택하는 국소 계획 | 7 |
| heuristics | 최적 보장 없는 빠른 문제해결 전략 | 7 |
| transfer of training | 훈련에서 배운 것이 타겟 과제에 전이되는 정도 | 8.1 |
| transfer effectiveness ratio (TER) | savings / 훈련 시간 | 8.1 |
| training cost ratio (TCR) | 실제 환경 비용/훈련 장치 비용 | 8.1 |
| training system fidelity | 훈련 환경이 실제와 얼마나 유사한가 | 8.1.2 |
| cognitive load theory (CLT) | 학습 부하를 intrinsic/germane/extraneous로 분해 | 8.2 |
| intrinsic load | 과제 자체의 복잡성 | 8.2 |
| germane load | 스키마 구축에 쓰이는 부하 | 8.2 |
| extraneous load | 학습과 무관한 불필요 부하 | 8.2 |
| worked examples | 해답 과정이 제시된 예시 | 8.2.2 |
| scaffolding | 초기엔 지원, 점차 거두는 훈련 | 8.2.2 |
| fractionation | 부분 과제를 서로 분리해 훈련 (부정 전이 위험) | 8.2.4 |
| segmentation | 시간적 순서로 부분을 나누어 훈련 | 8.2.4 |
| variable priority training | 부분들을 함께 연습하되 강조점을 번갈아 | 8.2.4 |
| active learning / passive learning | 학습자 주도 선택 vs 수동 관찰 | 8.2.5 |
| generation effect | 스스로 만든 답이 주어진 답보다 기억 강화 | 8.2.5 |
| dual coding principle | 시각+언어 병행 제시가 재인·회상 향상 | 8.2.6 |
| aptitude × treatment interaction | 학습자 특성과 훈련 방식의 상호작용 | 8.2.9 |
| training-transfer dissociation | 훈련 중 학습 용이 ≠ 전이 성공 | 8.2.11 |
| long-term memory | 영속적 지식 저장소 | 9 |
| declarative memory | 사실·사건의 의식적 지식 | 9.1 |
| procedural skills | 수행으로 표현되는 절차적 지식 | 9.1 |
| semantic memory | 개념·의미의 LTM | 9.1 |
| episodic memory | 특정 사건·맥락의 LTM | 9.1 |
| implicit memory | 비의식적으로 행동에 영향 주는 기억 | 9.1 |
| grounded cognition | 기억이 감각·지각과 재활성 연결 | 9.1 |
| mental model | 시스템 동작에 대한 내적 기대 구조 | 9.1.2 |
| knowledge elicitation | 전문가 지식을 추출하는 기법들 | 9.1.3 |
| conceptual graph analysis | 개념-링크 그래프로 표상 | 9.1.3 |
| ontology | 도메인 개념과 관계의 형식적 분류 | 9.1.3 |
| recall | 기억에서 항목을 직접 생성 | 9.2.1 |
| recognition | 본 적 있는지 재인식 | 9.2.1 |
| remember-know paradigm | 명시적 회상 vs 친숙성 구분 | 9.2.1 |
| retrieval cues | 인출을 돕는 단서 | 9.2.1 |
| retrieval-induced forgetting | 일부 반복 인출이 타 항목 망각 촉진 | 9.2.1 |
| event memory | 사건에 대한 기억, subsequent info에 취약 | 9.2.2 |
| misinformation effect | 사후 정보가 원 기억을 덮어씀 | 9.2.2 |
| skill type | 지각운동/인지/디지털 스킬별 망각률 차이 | 9.3 |
| digital skills | C2 시스템 등 빠르게 잊히는 인지 스킬 | 9.3 |
| checklist | retrieval cue를 외부화한 장치 | 9.2.1 |

---

## 4. 주요 Figure 해설

### Figure 7.1: Model of memory functions
- **내용**: encoding → working memory ↔ long-term memory → retrieval → response 흐름.
- **의미**: 챕터 전체의 내비게이션 맵 — 모든 하위 개념이 이 그림의 어느 단계에 개입하는지로 위치 지정 가능.
- **시험 포인트**: 어느 단계 실패가 어떤 현상(decay, PI/RI, mis-recall)인지 매핑.

### Figure 7.2: Stimulus-Central-Response Compatibility
- **내용**: 공간 vs 음성 코드 매트릭스, 동일 코드 연결 시 성능 이득.
- **의미**: 멀티모달 디스플레이·음성 UI 설계의 이론 근거. Wickens, Sandry & Vidulich (1983).
- **시험 포인트**: "음성 입력-공간 출력"이 왜 S-C-R 부적합인지 설명.

### Figure 7.3: Decay of working memory
- **내용**: Brown-Peterson paradigm의 유지 시간 vs 회상률.
- **의미**: rehearsal 차단 시 15~20초 내 급격 감소 — decay가 실재함을 보여주는 고전 데이터.
- **시험 포인트**: decay vs 간섭 중 무엇이 WM 상실의 주 원인인지 논쟁.

### Figure 7.4: Proactive vs Retroactive Interference
- **내용**: 시간축 위에서 이전 학습(PI)과 새 학습(RI)이 기억에 영향을 미치는 방향.
- **의미**: 인터페이스 혼동(예: 비슷한 단축키 간 오류)의 이론적 해부.
- **시험 포인트**: 메뉴 개편 후 "이전 버전이 자꾸 떠오르는" 현상은 PI/RI 중 어느 쪽?

### Figure 7.5: Transfer Performance Measurement
- **내용**: 5개 훈련 조건의 학습 곡선과 TER 계산(−0.75 ~ +1.0).
- **의미**: 훈련이 긍정·영·부정 전이를 만들 수 있음을 숫자로 보여줌. 식 7.1(% transfer) + 식 7.2(TER)의 실제 계산 예.
- **시험 포인트**: TER > 1이지만 TER × TCR < 1인 상황은 언제 선택할 수 있는가(안전성 논거)?

### Figure 7.6: Time-in-training vs TER curve
- **내용**: 훈련 시간이 길어질수록 TER이 감소하는 체감 효과(diminishing return).
- **의미**: "언제 시뮬레이터를 접고 실제 과제로 넘어갈지" 결정 기준. TER × TCR = 1이 전이 시작 임계점.
- **시험 포인트**: 왜 초반엔 TER이 크고 후반엔 작은가(이미 학습한 부분은 중복 연습 효과가 작음).

### Figure 7.7: Multidimensional concept representation (Afghanistan insurgency)
- **내용**: 텍스트 corpora에서 공출현 빈도로 계산된 개념 네트워크.
- **의미**: knowledge elicitation을 컴퓨터가 할 수 있음을 보이는 예. 전문가 없이도 semantic space를 구성.
- **시험 포인트**: ontology vs conceptual graph vs semantic space의 차이.

### Table 7.1: Stimulus × Response 전이 매트릭스
- **내용**: Same/Different 조합에 따라 ++, −, −−, +, 0.
- **의미**: 부정 전이 방지의 핵심 원칙 — "자극은 같은데 반응이 다르면 최악". 동일 키보드에 다른 단축키 배치가 전형 실패 사례.

---

## 5. 주요 실험 / 연구 사례

| 연구자 (연도) | 실험 내용 | 결과 | 함의 |
|--------------|-----------|------|------|
| Baddeley & Hitch (1974) | WM 이중과제 분리 | 음운·시공간 독립 채널 | 멀티모달 디스플레이의 이론 근거 |
| Wickens, Sandry & Vidulich (1983) | S-C-R 호환성 | 코드 일치 시 성능↑ | 음성 UI / 공간 UI 매칭 |
| Brown-Peterson paradigm | rehearsal 차단 WM | 15~20s 내 decay | WM은 시간 민감 |
| Cowan (2001) | WM 용량 재추정 | 3~4 chunk | Miller 7±2 하향 |
| Chase & Simon (1973) | 체스 고수 vs 초보, 실제 vs 랜덤 배치 | 실제는 우수, 랜덤은 동일 | 청킹은 경험 기반 |
| Gobet & Clarkson (2004) | 체스 고수의 템플릿 수 추정 | 수만 템플릿 | LTM 기반 청킹 |
| Ericsson & Kintsch (1995) | 웨이터·기억술사 사례 | LT-WM 구축 | 숙련자는 WM 용량을 LTM으로 확장 |
| McFarland & Glisky (2011) | 노인 PM, implementation intention | 성공률↑ | PM 개입 기법 |
| Wegner, Giuliano & Hertel (1985) | 커플의 TM | 영역 분담 | TMS 개념 도입 |
| Michinov & Michinov (2009) | 학생 학습 그룹의 TM | coordination·credibility가 성적 예측 | 팀 훈련의 가치 |
| Weldon & Bellinger (1997) | 공동 회상 실험 | collaborative inhibition | 분산 전문성이 해결책 |
| Endsley (1995b) | SAGAT 개발 | 3 level SA 측정 가능 | 현재까지 표준 |
| Durso & Dattel (2004) | SPAM 개발 | 실시간 접근성 측정 | SAGAT의 대안 |
| Banbury, Croft, et al. (2004) | Cognitive streaming | transitional prob이 anticipation 설명 | Level 3 SA 메커니즘 |
| Sulistyawati, Wickens, Poon (2011) | 전투기 조종사 인지능력 | cognitive reasoning이 Level 3 예측 | 공간 능력은 Level 2 예측 |
| Ward & Allport (1997) | Tower of Hanoi, 적은 제약 | 많은 제약이 계획 쉬움 | 제약 수 ↓ → 난이도 ↑ |
| Layton, Smith & McCoy (1994) | 항공 계획 | opportunistic planning이 국소 최적 | 자동화 설계 주의 |
| Gopher, Weil, Siegel (1989) | variable priority | 비고정 우선순위가 전이 향상 | part-task의 개선안 |
| Gopher, Weil, Bareket (1994) | Space Fortress → 전투기 | 긍정 전이 | 표면 유사성보다 인지 요구 |
| Slamecka & Graf (1978) | generation effect | 자기 생성 > 제공 답 | active learning 근거 |
| Craik & Lockhart (1972) | processing levels | deep > shallow | 의미 처리의 중요성 |
| Bjork (1999) | desirable difficulties | 어려운 훈련 → 좋은 유지 | training-transfer dissociation |
| Cepeda et al. (2006) | spaced vs massed | spaced 우세 | 분산 연습 원칙 |
| Loftus (1979, 2005) | misinformation effect | 사후 정보가 기억 왜곡 | 목격자 증언 위험 |
| Logan & Klapp (1991) | overlearning 효과 | 자동성 유지 | emergency 절차 훈련 |
| Schneider (1985) | 인지기술 잊힘 | consistency가 유지 촉진 | UI 일관성 설계 |

---

## 6. 퀴즈 후보

<!-- K-콘텐츠 앵커 매핑: 재난·안전/일상 앱 중심으로 가능 -->

1. **같은 키보드에 단축키만 다른 두 워드프로세서로 바꿨을 때** 생산성이 오히려 떨어진다. Table 7.1의 어느 조합에 해당하며 왜 최악인가?
   → Stimulus Same + Response Different (incompatible). 기존 S-R 매핑이 자동화되어 있어 PI로 오작동 유발. 설계 원칙: S-R 매핑을 플랫폼 간 일치시키거나, 시각적으로 다른 인터페이스(Stimulus Different)로 만들어야.

2. **카카오T 호출 화면에 이전 기사 이름이 자꾸 떠오른다**면 이는 PI인가 RI인가? 디자인으로 어떻게 완화할 수 있나?
   → PI(이전 학습이 현재 부호화 방해). 완화책: 이전 호출 결과를 화면에서 빠르게 비우기, parsing으로 "이전/현재" 경계 명시, 의미적 context(시간 스탬프) 추가.

3. **비행 훈련 시뮬레이터의 TER = 0.5, TCR = 3**일 때 투자 결정은? 추가로 안전성을 고려하면?
   → TER × TCR = 1.5 > 1 → cost-effective. 더구나 시뮬레이터는 추락 위험이 없어 안전성 보너스. 투자 정당.

4. **체스 고수가 '실제 경기 배치'는 5초만 보고도 재구성하지만 '랜덤 배치'는 초보자와 같은 수준**이다. Chase & Simon (1973) 결과가 말하는 것은?
   → 전문성의 기억 이득은 일반 지능이 아니라 도메인 특화 청킹 템플릿에서 온다. 랜덤 배치에는 적용 가능한 템플릿이 없어 이득 소실. 훈련은 도메인 청킹 패턴을 축적하는 과정.

5. **Space Fortress 게임으로 전투기 조종사를 훈련했더니 긍정 전이가 났다**(Gopher et al. 1994). 이 결과가 training system fidelity 원칙에 어떤 수정을 요구하는가?
   → "표면 유사성이 낮아도 인지 요구(주의 분산, WM 부하)가 유사하면 전이 가능". 고가 고충실도 시뮬레이터가 항상 최선이 아니다. 훈련은 과제의 *인지적 본질*을 노려야.

6. **응급 심폐소생술 같은 emergency 절차 훈련**에서 왜 overlearning이 필수인가?
   → 실전에서는 WM이 스트레스로 급락. 자동성(자극-반응의 무의식적 연결)만이 안정 수행을 보장. error-free 이후에도 연습이 속도·자원 요구를 계속 낮춘다(Logan & Klapp 1991).

7. **NotebookLM으로 교재를 "쉽게 읽었다"고 느꼈지만 시험에서 막혔다**. Bjork (1999)의 training-transfer dissociation 관점에서 무슨 문제가 있었나?
   → 학습 중의 '쉬움'은 장기 전이의 예측 지표가 아니다(오히려 음의 상관 가능). Desirable difficulties — 자가 생성, 인출 연습(test), 분산 학습이 느리지만 강한 전이를 만든다.

8. **항공 체크리스트**는 어떤 기억 메커니즘의 공학적 외부화인가?
   → Retrieval cues + prospective memory 보완. WM 부하와 PM 실패를 피하기 위해 "지식을 세상에 둔다"(Norman). 순서 고정 + 시각적 표시로 PI/RI와 망각을 동시에 방지.

9. **신입 간호사가 투약 절차를 방해받고 다시 돌아올 때** 어떤 기억 메커니즘이 실패하며, 어떤 훈련/설계가 예방하는가?
   → Prospective memory 실패 + retrieval cue 손실. 예방: implementation intention("방해 후 X 위치로 복귀"), 체크리스트로 외부 cue 제공, 방해 최소화 UI 설계.

10. **숙련 파일럿에게 worked examples를 계속 제공**하면 어떤 효과가 날 수 있나?
    → Expertise reversal effect(Aptitude × Treatment Interaction): 초보자에겐 extraneous를 줄이지만, 숙련자에겐 이미 아는 지식을 *중복*해 germane 자원을 낭비, 성능 저하. 훈련은 학습자 숙련도에 맞춰 지원을 거둬야.

11. **Endsley의 SA 3단계 중 Level 3(projection)가 가장 어려운 이유**는?
    → Level 3는 현재 없는 미래 상태를 mental simulation이나 transitional probability로 만들어야 함. WM 집약적이며, LTM mental model이 정확해야만 generative prediction이 가능. 초보자는 Level 1-2에서 이미 자원 고갈.

12. **법정 목격자 증언**이 신뢰할 수 없는 이유를 event memory 관점에서 설명하라.
    → Misinformation effect(Loftus): 사건 후 정보가 원 기억에 통합되어 "본 적 없는 것을 봤다"고 확신. 법정에서 검사/변호사 질문 자체가 post-event information이 될 수 있음. DNA 검증이 왜 필요한지의 이론적 근거.

---

## 7. 챕터 연결고리

- **이전 챕터와 연결**: Ch.6(Language)의 word superiority effect, Shannon-Fano 같은 부호화 효율성이 여기서는 WM chunking·LTM 조직화로 확장. CRM(Ch.6)의 팀 언어 코딩은 Ch.7 transactive memory의 전제.
- **다음 챕터 예고**: Ch.8 Decision Making은 WM 부하 → heuristics → 편향, 그리고 LTM 유사 사례 기반 판단을 다룬다. Ch.7의 memory 한계가 decision의 bias를 설명.
- **반복 등장 원리**:
  - **자원 제한(limited-capacity)**: Ch.3 주의 자원 제한이 Ch.7 WM 용량 제한으로 연속.
  - **코드 호환성(compatibility)**: Ch.2의 SDT 반응 기준, Ch.3의 attention-display 호환, Ch.7의 S-C-R compatibility로 확장.
  - **디스플레이-사고 매핑(proximity/compatibility)**: Ch.4-5의 spatial display 원리가 Ch.7 mental model·ontology로 형식화.
  - **숙련자 효과**: Ch.2(expert SDT), Ch.5(navigation schema), Ch.7(LT-WM, template) — 전문성이 기초 한계를 우회하는 공통 테마.
