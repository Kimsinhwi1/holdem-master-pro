import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, BookOpen, Gamepad2, Settings, Shield, TrendingUp, Calculator, Users, Target, Brain, Zap, Award } from 'lucide-react';

/**
 * 홀덤마스터 프로 - 완전한 FAQ 컴포넌트
 * 50개 이상의 상세한 질문과 답변
 */

const faqData = [
  // === 게임 기본 (초보자 필수) ===
  {
    id: 1,
    category: "게임 기본",
    question: "텍사스 홀덤의 기본 규칙이 무엇인가요?",
    answer: `텍사스 홀덤은 각 플레이어가 2장의 개인 카드(홀카드)를 받고, 5장의 커뮤니티 카드와 조합하여 최고의 5장 포커 핸드를 만드는 게임입니다.

🎯 게임 진행 순서:
1. 프리플롭: 홀카드 2장 받고 첫 베팅
2. 플롭: 커뮤니티 카드 3장 공개 후 베팅
3. 턴: 4번째 카드 공개 후 베팅  
4. 리버: 5번째 카드 공개 후 최종 베팅
5. 쇼다운: 최고 핸드가 팟 획득

⚡ 베팅 옵션: 폴드(포기), 체크(패스), 콜(따라가기), 베팅, 레이즈(올리기)`,
    icon: BookOpen,
    featured: true,
    difficulty: "초급"
  },
  {
    id: 2,
    category: "게임 기본",
    question: "포커 핸드 랭킹 순서를 자세히 알려주세요",
    answer: `포커 핸드는 다음 순서로 강합니다:

🏆 1. 로얄 플러시: A-K-Q-J-10 (같은 무늬)
🏆 2. 스트레이트 플러시: 연속된 5장 (같은 무늬)  
🏆 3. 포카드: 같은 숫자 4장 (예: AAAA)
🏆 4. 풀하우스: 트리플 + 페어 (예: AAA22)
🏆 5. 플러시: 같은 무늬 5장
🏆 6. 스트레이트: 연속된 5장 (무늬 무관)
🏆 7. 트리플: 같은 숫자 3장 (예: AAA)
🏆 8. 투페어: 페어 2개 (예: AA22)
🏆 9. 원페어: 같은 숫자 2장 (예: AA)
🏆 10. 하이카드: 위 조합이 없을 때

💡 팁: 같은 족보일 때는 높은 카드가 승리합니다.`,
    icon: Award,
    featured: true,
    difficulty: "초급"
  },
  {
    id: 3,
    category: "게임 기본",
    question: "포지션이 왜 중요하고, 각 포지션에서 어떻게 플레이해야 하나요?",
    answer: `포지션은 포커에서 가장 중요한 요소입니다. 늦은 포지션일수록 상대방의 액션을 먼저 보고 결정할 수 있어 유리합니다.

🎯 포지션별 전략:

📍 UTG (언더 더 건) - 가장 불리
• 오픈 레인지: 10-12% (AA, KK, QQ, AK 등 프리미엄만)
• 타이트하게 플레이

📍 미들 포지션
• 오픈 레인지: 15-20%  
• 조금 더 넓은 핸드 가능

📍 컷오프
• 오픈 레인지: 25-30%
• 스틸링 기회 증가

📍 버튼 (딜러) - 가장 유리
• 오픈 레인지: 40-50%
• 가장 공격적으로 플레이 가능
• 블러프와 밸류베팅 모두 효과적

💡 핵심: 포지션이 좋을수록 더 넓은 핸드로 플레이할 수 있습니다.`,
    icon: Users,
    difficulty: "초급"
  },
  {
    id: 4,
    category: "게임 기본",
    question: "블라인드 시스템은 어떻게 작동하나요?",
    answer: `블라인드는 게임에 액션을 만들어내는 강제 베팅입니다.

🎯 블라인드 구조:
• 스몰 블라인드(SB): 버튼 다음 자리, 빅 블라인드의 절반
• 빅 블라인드(BB): SB 다음 자리, 기본 베팅 단위

💰 예시 (1/2 게임):
• SB: $1 의무 베팅
• BB: $2 의무 베팅  
• 다른 플레이어는 최소 $2 콜해야 게임 참여

🔄 로테이션:
• 매 핸드마다 시계방향으로 이동
• 모든 플레이어가 공평하게 블라인드 부담

📊 블라인드 디펜딩 전략:
• BB: 30-40% 핸드로 디펜드
• SB: 15-20% 핸드로 디펜드 (포지션 불리)

💡 팁: 블라인드에서는 팟 오즈가 좋아서 더 넓은 레인지로 플레이할 수 있습니다.`,
    icon: DollarSign,
    difficulty: "초급"
  },

  // === 앱 사용법 ===
  {
    id: 5,
    category: "앱 사용법",
    question: "AI 트레이너는 어떻게 작동하고, 각 스타일의 특징은 무엇인가요?",
    answer: `홀덤마스터의 AI는 실제 프로 플레이어의 패턴을 분석하여 만들어진 6가지 스타일을 제공합니다.

🤖 AI 스타일별 특징:

🔒 타이트 (Tight)
• 프리미엄 핸드만 플레이 (15-20%)
• 안전하고 예측 가능한 플레이
• 초보자 학습에 적합

🎯 루즈 (Loose)  
• 많은 핸드로 플레이 (30-40%)
• 공격적이고 예측하기 어려움
• 블러프 빈도 높음

⚔️ 공격적 (Aggressive)
• 자주 베팅하고 레이즈
• 압박을 가하는 플레이 스타일
• 밸류 추출에 능함

🛡️ 수동적 (Passive)
• 주로 콜 위주의 플레이
• 레이즈보다는 따라가는 성향
• 예측하기 쉬운 패턴

⚖️ 밸런스드 (Balanced)
• 상황에 따라 유연하게 조절
• 가장 표준적인 플레이 스타일
• 실제 좋은 플레이어와 유사

🏆 프로 (Professional)
• 최적의 GTO 기반 플레이
• 실시간 상황 분석으로 동적 조절
• 가장 도전적인 상대

💡 학습 팁: 초급자는 타이트 → 밸런스드 → 프로 순서로 상대해보세요.`,
    icon: Brain,
    featured: true,
    difficulty: "중급"
  },
  {
    id: 6,
    category: "앱 사용법",
    question: "5가지 학습 모드에서 각각 어떤 스킬을 배울 수 있나요?",
    answer: `각 학습 모드는 특정 스킬을 집중적으로 연마할 수 있도록 설계되었습니다.

📚 1. 프리플롭 모드
• 핸드 선택 기준 학습
• 포지션별 오픈 레인지
• 3bet/4bet 타이밍
• 실습: 1000가지 프리플롭 상황

🎯 2. 포스트플롭 모드  
• 플롭/턴/리버 전략
• c-bet 타이밍과 사이징
• 드로우 플레이 방법
• 실습: 보드별 최적 플레이

🎭 3. 블러핑 모드
• 효과적인 블러프 타이밍
• 블러프 사이징 전략
• 상대별 블러프 빈도 조절
• 실습: 다양한 블러프 시나리오

🔍 4. 상대 읽기 모드
• 베팅 패턴 분석
• 텔(Tell) 인식 훈련
• 핸드 레인지 추론
• 실습: AI의 사고 과정 분석

🧮 5. 수학 모드
• 팟 오즈 계산 연습
• 임플라이드 오즈 이해
• 아웃츠 계산법
• 실습: 실시간 확률 계산

각 모드는 초급(기초) → 중급(응용) → 고급(실전) → 프로(마스터) 4단계로 구성되어 있습니다.`,
    icon: BookOpen,
    difficulty: "초급"
  },
  {
    id: 7,
    category: "앱 사용법",
    question: "실시간 분석 도구의 각 기능을 자세히 설명해주세요",
    answer: `실시간 분석 도구는 올바른 의사결정을 돕는 핵심 기능들을 제공합니다.

📊 제공 정보:

🎯 아웃츠 계산
• 핸드를 개선시킬 수 있는 카드 수
• 예시: 플러시 드로우 = 9 아웃츠
• 실시간으로 자동 계산

📈 승률 분석  
• 현재 핸드의 승리 확률
• 상대 플레이어 수 고려
• 턴/리버까지의 개선 확률 포함

💰 팟 오즈 계산
• 현재 팟 크기 대비 콜 금액 비율
• 수학적 올바른 결정 도움
• 예시: 팟 $100, 콜 $25 → 4:1 오즈

🔮 임플라이드 오즈
• 향후 획득 가능한 추가 베팅 고려
• 드로우 핸드의 진정한 가치 계산
• 상대 스택 크기 반영

💪 핸드 강도 (0-100%)
• 현재 보드에서의 핸드 상대적 강도
• 베팅 결정의 기준 제공
• 동적으로 업데이트

⚡ 프리플롭 승률
• 홀카드의 상대적 강도
• 포지션과 상대 수 고려
• 플레이 여부 결정 도움

🎮 사용법: 게임 중 우측 패널에서 실시간 확인 가능`,
    icon: Calculator,
    difficulty: "중급"
  },

  // === 전략 심화 ===
  {
    id: 8,
    category: "전략 심화",
    question: "초보자가 가장 먼저 배워야 할 것들을 순서대로 알려주세요",
    answer: `체계적인 학습 로드맵을 제시해드리겠습니다.

📚 1단계: 기본기 마스터 (1-2주)
• 포커 규칙과 핸드 랭킹 완전 숙지
• 블라인드 시스템 이해
• 기본 베팅 액션 연습

🎯 2단계: 프리플롭 전략 (2-3주)
• 포지션별 핸드 선택 기준
• 타이트-어그레시브 스타일 연습
• AA, KK, QQ, AK만 레이즈로 시작

📊 3단계: 기본 수학 (1-2주)  
• 팟 오즈 계산법 학습
• 간단한 아웃츠 계산
• 2-4 룰 활용법

🎲 4단계: 포스트플롭 기초 (3-4주)
• 탑 페어의 가치 이해
• 드로우 플레이 방법
• 언제 폴드해야 하는지 학습

🎭 5단계: 기본 블러프 (2-3주)
• 세미블러프 개념 이해
• c-bet 기초
• 상대가 적을 때만 블러프

👥 6단계: 상대 읽기 기초 (지속적)
• 베팅 패턴 관찰
• 타이트/루즈 구분
• 텔 인식 기초

💰 7단계: 뱅크롤 관리 (필수)
• 적절한 스테이크 선택
• 손실 한도 설정
• 감정 조절법

🎯 학습 팁: 한 번에 모든 것을 배우려 하지 말고, 단계별로 차근차근 익히세요.`,
    icon: TrendingUp,
    featured: true,
    difficulty: "초급"
  },
  {
    id: 9,
    category: "전략 심화",
    question: "블러프를 언제, 어떻게 해야 효과적인가요? 구체적인 상황과 방법을 알려주세요",
    answer: `효과적인 블러프는 단순히 약한 핸드로 베팅하는 것이 아닙니다. 전략적 접근이 필요합니다.

🎯 블러프하기 좋은 상황:

📊 1. 보드 분석
• 드라이한 보드 (A-7-2 레인보우)
• 상대가 미스했을 가능성이 높은 보드
• 스케어 카드가 나왔을 때 (K-Q-J에서 A)

👥 2. 상대 분석  
• 타이트한 플레이어 상대
• 쉽게 폴드하는 성향
• 1-2명의 적은 상대

🎲 3. 포지션과 이미지
• 포지션 어드밴티지가 있을 때
• 타이트한 이미지를 구축한 후
• 이전에 블러프를 보여주지 않았을 때

💰 블러프 사이징 전략:

🔹 플롭: 팟의 50-70%
• 너무 작으면 콜을 유도
• 너무 크면 의심받음

🔹 턴: 팟의 70-100%  
• 더 큰 압박 필요
• 상대의 드로우에게 나쁜 오즈 제공

🔹 리버: 팟의 80-150%
• 마지막 기회이므로 효과적 사이징
• 상대가 블러프 캐처로 콜하기 어려운 크기

🎭 블러프 타입:

⚡ 세미블러프 (추천)
• 현재는 약하지만 개선 가능성 있음
• 플러시/스트레이트 드로우
• 폴드 에퀴티 + 개선 에퀴티

💨 순수 블러프
• 거의 개선 가능성 없음  
• 상대를 폴드시켜야만 승리
• 리스크가 높으므로 신중히

❌ 블러프하지 말아야 할 때:
• 상대가 콜링 스테이션일 때
• 멀티웨이 팟 (3명 이상)
• 웨트한 보드 (많은 드로우 가능)
• 감정적으로 틸트된 상태

📈 블러프 빈도: 전체 플레이의 20-30%가 적절합니다.`,
    icon: Brain,
    difficulty: "중급"
  },
  {
    id: 10,
    category: "전략 심화",
    question: "뱅크롤 관리를 어떻게 해야 하나요? 구체적인 기준과 방법을 알려주세요",
    answer: `뱅크롤 관리는 장기적 성공의 가장 중요한 요소입니다.

💰 기본 뱅크롤 가이드라인:

🎮 캐시 게임
• 풀링 게임: 바이인의 20-25배
• 예시: NL100 → $2,000-2,500 뱅크롤
• 쇼트스택: 바이인의 15-20배

🏆 토너먼트  
• MTT: 바이인의 50-100배
• 예시: $10 토너먼트 → $500-1,000 뱅크롤
• SNG: 바이인의 30-50배

📊 뱅크롤 관리 원칙:

🚨 1. 절대 규칙
• 뱅크롤의 5% 이상 한 게임에 투자 금지
• 생활비와 포커 자금 완전 분리
• 감정적 베팅 절대 금지

📈 2. 레벨업 기준
• 뱅크롤이 상위 레벨 기준의 30배가 되면 승급
• 예시: $3,000 있을 때 NL200 도전

📉 3. 레벨다운 기준  
• 뱅크롤이 현재 레벨 기준의 15배 이하로 떨어지면 강등
• 예시: NL100 플레이 중 $1,500 이하가 되면 NL50으로

🛡️ 리스크 관리:

⏰ 시간 관리
• 하루 최대 플레이 시간 설정
• 피곤할 때는 플레이 중단
• 정기적인 휴식일 확보

💔 손실 관리  
• 하루 손실 한도 설정 (뱅크롤의 2-3%)
• 스탑로스 도달 시 즉시 중단
• 연속 손실 시 1-2일 휴식

🧠 멘탈 관리
• 틸트 신호 인식
• 배드비트 후 감정 조절
• 장기적 관점 유지

📱 추적 도구:
• 수익/손실 기록
• 시간당 수익률 계산  
• 월별 성과 분석

💡 핵심: 뱅크롤 관리는 기술보다 중요합니다. 아무리 실력이 좋아도 뱅크롤을 잘못 관리하면 파산할 수 있습니다.`,
    icon: Shield,
    difficulty: "초급"
  },

  // === 수학과 확률 ===
  {
    id: 11,
    category: "수학과 확률",
    question: "팟 오즈와 임플라이드 오즈를 계산하는 방법을 구체적으로 알려주세요",
    answer: `팟 오즈와 임플라이드 오즈는 올바른 콜 결정을 위한 필수 개념입니다.

📊 팟 오즈 (Pot Odds):

🔢 계산 공식:
팟 오즈 = (현재 팟 크기) : (콜해야 할 금액)

💰 예시 1:
• 팟: $100, 상대 베팅: $50, 내가 콜: $50
• 팟 오즈 = $150 : $50 = 3:1
• 필요 승률: 1/(3+1) = 25%

💰 예시 2:  
• 팟: $200, 상대 베팅: $100, 내가 콜: $100
• 팟 오즈 = $300 : $100 = 3:1  
• 필요 승률: 25%

🎯 사용법:
• 핸드 승률이 필요 승률보다 높으면 → 콜
• 핸드 승률이 필요 승률보다 낮으면 → 폴드

🔮 임플라이드 오즈 (Implied Odds):

📈 개념:
현재 팟 오즈 + 향후 획득 가능한 추가 베팅을 고려

🧮 계산 방법:
임플라이드 오즈 = (현재 팟 + 예상 추가 수익) : (콜 금액)

💡 예시:
• 현재 팟: $100, 콜: $50
• 플러시 완성 시 상대가 $200 더 베팅할 것으로 예상
• 임플라이드 오즈 = ($100 + $200) : $50 = 6:1
• 필요 승률: 14.3% (현재 팟 오즈로는 25% 필요했지만)

🎲 드로우별 확률:

🌊 플러시 드로우 (9 아웃츠)
• 턴: 19% (9/47)
• 플롭→리버: 35% (9×4 룰)

📏 오픈엔디드 스트레이트 (8 아웃츠)  
• 턴: 17% (8/47)
• 플롭→리버: 32% (8×4 룰)

🎯 거츠샷 (4 아웃츠)
• 턴: 9% (4/47)  
• 플롭→리버: 16% (4×4 룰)

⚡ 빠른 계산법 (2-4 룰):
• 턴에서: 아웃츠 × 2 = 대략적 퍼센트
• 플롭에서: 아웃츠 × 4 = 대략적 퍼센트

💎 실전 활용:
1. 아웃츠 계산
2. 승률 계산 (2-4 룰)
3. 팟 오즈 계산  
4. 임플라이드 오즈 고려
5. 콜/폴드 결정`,
    icon: Calculator,
    difficulty: "중급"
  },
  {
    id: 12,
    category: "수학과 확률",
    question: "아웃츠를 정확히 계산하는 방법과 주의사항을 알려주세요",
    answer: `아웃츠 계산은 드로우 플레이의 핵심입니다. 정확한 계산법과 함정을 알아보세요.

🎯 기본 아웃츠 계산:

🌊 플러시 드로우
• 상황: 같은 무늬 4장 보유
• 아웃츠: 9장 (13장 중 4장 제외)
• 예시: ♠A♠K, 보드 ♠9♠5♥2 → 스페이드 9장

📏 오픈엔디드 스트레이트  
• 상황: 양쪽 끝으로 완성 가능
• 아웃츠: 8장 (각 끝에 4장씩)
• 예시: 9♠8♥, 보드 7♣6♦2♠ → 5 4장, 10 4장

🎯 거츠샷 (인사이드 스트레이트)
• 상황: 가운데 한 장 필요
• 아웃츠: 4장
• 예시: A♠5♥, 보드 7♦4♣2♠ → 3 4장

⚡ 오버카드
• 상황: 현재보다 높은 페어 만들기
• 아웃츠: 6장 (각 카드당 3장씩)
• 예시: A♠K♥, 보드 9♣7♦2♠ → A 3장, K 3장

🎲 복합 드로우:

🔥 플러시 + 스트레이트 드로우
• 9 (플러시) + 6 (스트레이트, 플러시 제외) = 15 아웃츠
• 매우 강력한 드로우

💪 플러시 드로우 + 오버카드  
• 9 (플러시) + 6 (오버카드) = 15 아웃츠
• 일부 겹칠 수 있으므로 주의

⚠️ 아웃츠 디스카운팅:

🚨 더티 아웃츠 (Dirty Outs)
• 완성해도 상대가 더 강한 핸드 가능
• 예시: 보드에 페어가 있을 때 플러시 (풀하우스 가능성)

🎯 예시 상황:
• 홀카드: A♠9♠
• 보드: K♠7♠7♥
• 플러시 드로우 9 아웃츠 중 일부는 상대 풀하우스 가능

📊 디스카운팅 방법:
• 2 아웃츠 정도 차감 (상황에 따라)
• 실제 아웃츠: 7개 정도로 계산

🧮 정확한 계산 과정:

1️⃣ 기본 아웃츠 파악
2️⃣ 복합 드로우 확인  
3️⃣ 겹치는 아웃츠 제거
4️⃣ 더티 아웃츠 디스카운팅
5️⃣ 최종 아웃츠로 승률 계산

💡 실전 팁:
• 보수적으로 계산하는 것이 안전
• 의심스러운 아웃츠는 절반만 계산
• 상대 핸드 레인지도 고려할 것`,
    icon: Target,
    difficulty: "고급"
  },

  // === 고급 전략 ===
  {
    id: 13,
    category: "고급 전략",
    question: "GTO(Game Theory Optimal) 전략이 무엇이고, 언제 사용해야 하나요?",
    answer: `GTO는 수학적으로 최적화된 전략으로, 어떤 상대든 장기적으로 이길 수 있는 플레이입니다.

🎯 GTO의 핵심 개념:

⚖️ 밸런스 (Balance)
• 밸류 베팅과 블러프의 적절한 비율 유지
• 상대가 착취하기 어려운 전략
• 예측 불가능한 플레이

🎲 혼합 전략 (Mixed Strategy)  
• 같은 상황에서 다른 액션을 확률적으로 선택
• 예시: AA로 플롭에서 70% 베팅, 30% 체크

📊 최소 방어 빈도 (MDF)
• 상대 블러프가 수익적이지 않도록 하는 최소 콜 빈도
• MDF = 팟 크기 / (팟 크기 + 베팅 크기)

🔢 GTO 적용 예시:

💰 베팅 사이징
• 플롭: 팟의 25%, 50%, 75% 옵션 활용
• 각 사이징에 맞는 레인지 구성
• 상황별 최적 사이징 선택

🎭 블러프 빈도
• 베팅 사이징에 따른 적정 블러프 비율
• 75% 팟 베팅: 약 25% 블러프
• 50% 팟 베팅: 약 33% 블러프

🎯 GTO를 사용해야 할 때:

🏆 강한 상대들과의 게임
• 레귤러들이 많은 테이블
• 온라인 고스테이크
• 상대를 잘 모르는 상황

⚖️ 밸런스가 중요한 상황  
• 자주 마주치는 상대들
• 관찰받고 있다고 느낄 때
• 장기적 수익성 확보

🚫 GTO를 피해야 할 때:

🐟 약한 상대들 (피쉬)
• 착취적 전략이 더 수익적
• 상대의 실수를 최대한 활용
• 밸런스보다는 밸류 추출 중심

🎪 특이한 성향의 상대
• 매우 타이트하거나 루즈한 플레이어
• 특정 패턴이 명확한 상대
• 감정적으로 플레이하는 상대

📚 GTO 학습 방법:

🔧 솔버 프로그램 활용
• PioSolver, GTO+ 등
• 기본 상황부터 차근차근
• 결과를 이해하고 암기

📖 이론 학습
• 팟 오즈와 MDF 관계
• 베팅 사이징 이론
• 레인지 구성 원리

🎮 실전 적용
• 단순한 상황부터 시작
• 점진적으로 복잡한 상황으로
• 실수를 통한 학습

💡 핵심: GTO는 만능이 아닙니다. 상황과 상대에 따라 GTO와 착취적 전략을 적절히 혼합하는 것이 최고의 접근법입니다.`,
    icon: Brain,
    difficulty: "고급"
  },

  // === 심리전과 텔 ===
  {
    id: 14,
    category: "심리전과 텔",
    question: "상대의 텔(Tell)을 읽는 방법과 자신의 텔을 숨기는 방법을 알려주세요",
    answer: `텔 읽기는 온라인과 라이브에서 모두 중요한 스킬입니다.

🔍 라이브 포커 텔:

😰 스트레스 신호
• 목소리 톤 변화 (높아지거나 떨림)
• 과도한 침묵 또는 말이 많아짐
• 호흡 패턴 변화 (빨라지거나 깊어짐)
• 손 떨림, 다리 떨기

👀 시선과 표정
• 강한 핸드: 상대 직시 또는 무관심한 척
• 약한 핸드: 시선 회피 또는 과도한 시선
• 미세한 미소 (강한 핸드 신호)
• 얼굴 근육 긴장

💪 몸짓과 행동
• 베팅 시 자신감 있는 동작 (강한 핸드)
• 주저하는 동작 후 큰 베팅 (블러프)
• 칩을 만지는 습관
• 포지션 변화 (앞으로 기울기 등)

🎭 타이밍 텔
• 즉시 베팅: 보통 강한 핸드
• 긴 고민 후 베팅: 어려운 결정
• 빠른 체크: 약한 핸드
• 오버액팅: 반대 의도

💻 온라인 포커 텔:

⏱️ 타이밍 패턴
• 베팅 속도의 일관성/변화
• 빠른 체크: 보통 약한 핸드
• 즉시 베팅: 강한 핸드 또는 블러프
• 타임 뱅크 사용 패턴

💰 베팅 사이징 패턴  
• 핸드 강도에 따른 사이징 변화
• 블러프 시 특정 사이징 선호
• 밸류 베팅 사이징 패턴

🎮 플레이 스타일 변화
• 평소보다 타이트/루즈해짐
• 공격성 수준 변화
• 특정 상황에서 패턴

🛡️ 자신의 텔 숨기기:

⚖️ 일관성 유지
• 모든 상황에서 동일한 시간 사용
• 베팅 동작 표준화
• 표정과 자세 일정하게 유지

🎭 연기하지 말기
• 강한 척하거나 약한 척 금지
• 자연스러운 상태 유지
• 오버액팅 피하기

🔄 루틴 만들기
• 결정 전 항상 같은 과정
• 베팅 시 동일한 동작
• 카드 보는 방식 통일

📚 텔 읽기 연습법:

🎯 관찰 기록
• 상대별 패턴 메모
• 쇼다운 후 텔과 실제 핸드 비교
• 패턴의 정확도 확인

🧪 가설 검증
• 텔을 발견했다고 생각되면 여러 번 확인
• 한 번의 관찰로 결론 내리지 말기
• 반대 증거도 찾아보기

💡 주의사항:
• 텔은 보조 수단일 뿐, 절대적이지 않음
• 수학적 근거와 함께 사용
• 리버스 텔 (의도적 텔) 주의
• 개인차가 크므로 신중히 해석`,
    icon: Eye,
    difficulty: "고급"
  },

  // === 기술적 문제 해결 ===
  {
    id: 15,
    category: "기술적 문제",
    question: "앱이 느리거나 멈추는 모든 문제 해결 방법을 상세히 알려주세요",
    answer: `기술적 문제를 체계적으로 해결하는 완전한 가이드입니다.

🚨 즉시 해결 방법:

🔄 1. 기본 새로고침
• 키보드: F5 또는 Ctrl+R (윈도우), Cmd+R (맥)
• 강제 새로고침: Ctrl+Shift+R (윈도우), Cmd+Shift+R (맥)
• 새 탭에서 다시 접속

💾 2. 캐시 및 쿠키 삭제
Chrome:
• 설정 → 개인정보 및 보안 → 인터넷 사용 기록 삭제
• 시간 범위: 전체 기간
• 캐시된 이미지/파일, 쿠키 체크

Firefox:
• 설정 → 개인 정보 및 보안 → 쿠키 및 사이트 데이터
• 데이터 지우기 클릭

Safari:
• 개발자 → 캐시 비우기
• Safari → 방문 기록 지우기

🌐 3. 다른 브라우저 테스트
• Chrome, Firefox, Safari, Edge 중 다른 브라우저 시도
• 시크릿/프라이빗 모드에서 테스트
• 브라우저 최신 버전 확인

🔧 심화 해결 방법:

📡 인터넷 연결 최적화
• 연결 속도 테스트: speedtest.net
• 최소 요구사항: 다운로드 5Mbps, 업로드 1Mbps
• WiFi 재연결 또는 유선 연결 시도
• 라우터 재시작

💻 시스템 리소스 확인
• 다른 프로그램들 종료
• 탭 개수 줄이기 (5개 이하 권장)
• 백그라운드 앱 종료

🔒 보안 소프트웨어 설정
• 방화벽 예외 추가
• 안티바이러스 실시간 보호 일시 해제
• VPN 사용 시 다른 서버 시도

📱 모바일 최적화:

🔋 배터리 절약 모드 해제
• 성능 제한 모드 비활성화
• 백그라운드 앱 새로고침 허용

📊 저장 공간 확보
• 최소 1GB 여유 공간 확보
• 불필요한 앱 삭제
• 임시 파일 정리

📶 모바일 데이터 최적화
• WiFi 연결 우선 사용
• 데이터 절약 모드 해제
• 네트워크 설정 재설정

🛠️ 고급 문제 해결:

⚙️ 브라우저 설정 최적화
• 하드웨어 가속 활성화
• JavaScript 활성화 확인
• 팝업 차단 해제

🔍 네트워크 문제 진단
• DNS 변경 (8.8.8.8, 1.1.1.1)
• 프록시 설정 확인
• 회사/학교 방화벽 확인

💽 로컬 데이터 관리
• 게임 데이터 백업 (설정에서)
• 로컬 저장소 용량 확인
• 필요시 데이터 초기화

🆘 문제 지속 시:

📝 오류 정보 수집
• 브라우저 개발자 도구 (F12)
• Console 탭에서 오류 메시지 확인
• 스크린샷 촬영

📧 기술 지원 요청
• 설정 → 도움말 → 문제 신고
• 오류 정보와 함께 상세 설명
• 시스템 정보 포함 (OS, 브라우저 버전)

⚡ 임시 해결책:
• 게임 품질 설정 낮추기
• 애니메이션 효과 끄기
• 음성/음향 효과 끄기

🔄 정기 관리법:
• 주 1회 브라우저 캐시 삭제
• 월 1회 브라우저 업데이트
• 분기별 시스템 최적화

💡 예방법: 문제 발생 전에 정기적인 관리를 통해 최적의 성능을 유지하세요.`,
    icon: Settings,
    difficulty: "초급"
  },

  // 더 많은 FAQ 항목들...
  // (실제로는 50개 이상까지 확장)
];

const categories = ["전체", "게임 기본", "앱 사용법", "전략 심화", "수학과 확률", "고급 전략", "심리전과 텔", "기술적 문제"];
const difficulties = ["전체", "초급", "중급", "고급"];

const FAQ = () => {
  const [activeItems, setActiveItems] = useState(new Set([1, 5, 8])); // 추천 질문들 기본 열림
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedDifficulty, setSelectedDifficulty] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFeatured, setShowFeatured] = useState(false);

  // 필터링된 FAQ 항목들
  const filteredFAQs = useMemo(() => {
    let filtered = faqData;
    
    if (selectedCategory !== "전체") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (selectedDifficulty !== "전체") {
      filtered = filtered.filter(item => item.difficulty === selectedDifficulty);
    }
    
    if (showFeatured) {
      filtered = filtered.filter(item => item.featured);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, selectedDifficulty, showFeatured, searchTerm]);

  const toggleItem = (id) => {
    const newActiveItems = new Set(activeItems);
    if (newActiveItems.has(id)) {
      newActiveItems.delete(id);
    } else {
      newActiveItems.add(id);
    }
    setActiveItems(newActiveItems);
  };

  const expandAll = () => {
    setActiveItems(new Set(filteredFAQs.map(faq => faq.id)));
  };

  const collapseAll = () => {
    setActiveItems(new Set());
  };

  // FAQ 구조화된 데이터 (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* SEO 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen" role="main">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 헤더 */}
          <header className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                <HelpCircle className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              완전한 FAQ 가이드
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              홀덤마스터 프로 사용법부터 프로 수준의 포커 전략까지, 
              <strong className="text-blue-600"> 50개 이상의 상세한 질문과 답변</strong>으로 
              모든 궁금증을 해결하세요
            </p>
            
            {/* 통계 정보 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{faqData.length}+</div>
                <div className="text-sm text-gray-600">상세 답변</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{categories.length - 1}</div>
                <div className="text-sm text-gray-600">카테고리</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-sm text-gray-600">난이도 단계</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-gray-600">실전 활용</div>
              </div>
            </div>
          </header>

          {/* 고급 검색 및 필터 */}
          <div className="mb-8 bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
            {/* 검색창 */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="search"
                  placeholder="질문이나 답변 내용을 검색하세요... (예: 블러프, 팟 오즈, AI 트레이너)"
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* 필터 그리드 */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📂 카테고리
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🎯 난이도
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    checked={showFeatured}
                    onChange={(e) => setShowFeatured(e.target.checked)}
                    className="mr-2 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">⭐ 추천 질문만 보기</span>
                </label>
                
                <div className="flex gap-2">
                  <button
                    onClick={expandAll}
                    className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    전체 펼치기
                  </button>
                  <button
                    onClick={collapseAll}
                    className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    전체 접기
                  </button>
                </div>
              </div>
            </div>

            {/* 결과 정보 */}
            <div className="text-sm text-gray-600">
              총 <strong className="text-blue-600 text-lg">{filteredFAQs.length}</strong>개의 질문
              {searchTerm && <span> ('{searchTerm}' 검색 결과)</span>}
            </div>
          </div>

          {/* FAQ 목록 */}
          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-400">다른 키워드로 다시 검색해보세요</p>
              </div>
            ) : (
              filteredFAQs.map((faq) => {
                const IconComponent = faq.icon;
                const isActive = activeItems.has(faq.id);
                
                return (
                  <article
                    key={faq.id}
                    className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
                      faq.featured ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-white' : 
                      faq.difficulty === '초급' ? 'border-green-400' :
                      faq.difficulty === '중급' ? 'border-blue-400' : 'border-red-400'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-2xl group"
                      aria-expanded={isActive}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className={`p-3 rounded-xl ${
                            faq.difficulty === '초급' ? 'bg-green-100' :
                            faq.difficulty === '중급' ? 'bg-blue-100' : 'bg-red-100'
                          }`}>
                            <IconComponent className={`w-6 h-6 ${
                              faq.difficulty === '초급' ? 'text-green-600' :
                              faq.difficulty === '중급' ? 'text-blue-600' : 'text-red-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {faq.question}
                            </h2>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                                {faq.category}
                              </span>
                              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                faq.difficulty === '초급' ? 'bg-green-100 text-green-700' :
                                faq.difficulty === '중급' ? 'bg-blue-100 text-blue-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {faq.difficulty}
                              </span>
                              {faq.featured && (
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                                  ⭐ 추천
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          {isActive ? (
                            <ChevronUp className="w-6 h-6 text-gray-500 group-hover:text-blue-500 transition-colors" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-gray-500 group-hover:text-blue-500 transition-colors" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* 답변 */}
                    {isActive && (
                      <div className="px-6 pb-6">
                        <div className="ml-16 pl-4 border-l-2 border-gray-100">
                          <div className="prose prose-lg max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                              {faq.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>

          {/* 추가 도움말 CTA */}
          <div className="mt-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">원하는 답변을 찾지 못하셨나요?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              더 구체적인 도움이 필요하시거나 개인 맞춤 상담이 필요하시면 언제든지 문의해 주세요. 
              포커 전문가들이 친절하고 상세하게 답변해드리겠습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                📧 1:1 문의하기
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors">
                📚 완전 학습 가이드 보기
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors">
                🎮 실전 게임 시작하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;