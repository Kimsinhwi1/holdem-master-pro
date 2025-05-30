// 게임 관련 상수들
export const SUITS = ['♠', '♥', '♦', '♣'];
export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

// 수트별 색상 매핑
export const SUIT_COLORS = { 
  '♠': '#000', 
  '♣': '#000', 
  '♥': '#e53e3e', 
  '♦': '#e53e3e' 
};

export const BLINDS = { small: 10, big: 20 };

export const INITIAL_CHIPS = {
  player: 5000,
  computer: 100000
};

// 핸드 타입별 강도
export const HAND_STRENGTHS = {
  '로얄 플러시': 100,
  '스트레이트 플러시': 95,
  '포카드': 90,
  '풀하우스': 85,
  '플러시': 75,
  '스트레이트': 65,
  '트리플': 55,
  '투페어': 45,
  '원페어': 35,
  '하이카드': 25
};

// 핸드 랭킹 정보
export const HAND_RANKINGS = [
  { name: '로얄 플러시', desc: '10-J-Q-K-A (같은 무늬)', odds: '0.000154%', emoji: '👑', color: 'from-purple-500 to-purple-600' },
  { name: '스트레이트 플러시', desc: '연속된 5장 (같은 무늬)', odds: '0.00139%', emoji: '🌟', color: 'from-blue-500 to-blue-600' },
  { name: '포카드', desc: '같은 숫자 4장', odds: '0.024%', emoji: '💎', color: 'from-green-500 to-green-600' },
  { name: '풀하우스', desc: '트리플 + 원페어', odds: '0.144%', emoji: '🏠', color: 'from-yellow-500 to-yellow-600' },
  { name: '플러시', desc: '같은 무늬 5장', odds: '0.197%', emoji: '🌊', color: 'from-cyan-500 to-cyan-600' },
  { name: '스트레이트', desc: '연속된 5장', odds: '0.392%', emoji: '📏', color: 'from-orange-500 to-orange-600' },
  { name: '트리플', desc: '같은 숫자 3장', odds: '2.11%', emoji: '🎯', color: 'from-red-500 to-red-600' },
  { name: '투페어', desc: '페어 2개', odds: '4.75%', emoji: '👥', color: 'from-pink-500 to-pink-600' },
  { name: '원페어', desc: '같은 숫자 2장', odds: '42.3%', emoji: '👫', color: 'from-indigo-500 to-indigo-600' },
  { name: '하이카드', desc: '아무것도 없을 때', odds: '50.1%', emoji: '🃏', color: 'from-gray-500 to-gray-600' }
];

// AI 플레이어 스타일 설정
export const AI_STYLES = {
  tight: { 
    name: '타이트', 
    color: 'bg-blue-500',
    aggression: 0.3, 
    bluffFreq: 0.1, 
    callRange: [35, 100], 
    foldThreshold: 25,
    description: '강한 핸드만 플레이하는 보수적 스타일'
  },
  loose: { 
    name: '루즈', 
    color: 'bg-green-500',
    aggression: 0.7, 
    bluffFreq: 0.3, 
    callRange: [20, 100], 
    foldThreshold: 15,
    description: '많은 핸드로 참여하는 적극적 스타일'
  },
  aggressive: { 
    name: '공격적', 
    color: 'bg-red-500',
    aggression: 0.8, 
    bluffFreq: 0.4, 
    callRange: [25, 100], 
    foldThreshold: 20,
    description: '자주 레이즈하고 압박하는 스타일'
  },
  passive: { 
    name: '수동적', 
    color: 'bg-gray-500',
    aggression: 0.2, 
    bluffFreq: 0.05, 
    callRange: [45, 100], 
    foldThreshold: 35,
    description: '콜 위주의 소극적 스타일'
  },
  balanced: { 
    name: '밸런스드', 
    color: 'bg-purple-500',
    aggression: 0.5, 
    bluffFreq: 0.2, 
    callRange: [30, 100], 
    foldThreshold: 25,
    description: '균형잡힌 플레이 스타일'
  },
  pro: { 
    name: '프로', 
    color: 'bg-yellow-500',
    aggression: 0.6, 
    bluffFreq: 0.25, 
    callRange: [32, 100], 
    foldThreshold: 27,
    description: '최고 수준의 정교한 플레이'
  }
};

// 학습 모드 설정
export const LEARNING_MODES = {
  probability: { 
    name: '확률 훈련', 
    icon: 'Calculator', 
    color: 'bg-blue-500',
    description: '팟 오즈, 아웃츠, 승률 계산을 마스터하세요',
    tips: ['아웃츠를 정확히 세는 연습을 하세요', '팟 오즈와 승률을 비교하는 습관을 기르세요'],
    theory: 'intermediate'
  },
  bluffing: { 
    name: '블러프 훈련', 
    icon: 'Eye', 
    color: 'bg-purple-500',
    description: '언제, 어떻게 블러프할지 배우세요',
    tips: ['상대방의 레인지를 고려하세요', '보드 텍스처에 따라 블러프 빈도를 조절하세요'],
    theory: 'advanced'
  },
  position: { 
    name: '포지션 훈련', 
    icon: 'Target', 
    color: 'bg-green-500',
    description: '포지션의 힘을 활용하는 법을 배우세요',
    tips: ['늦은 포지션에서 더 많은 핸드를 플레이하세요', '일찍 포지션에서는 강한 핸드만 플레이하세요'],
    theory: 'beginner'
  },
  reading: { 
    name: '상대 읽기', 
    icon: 'Brain', 
    color: 'bg-orange-500',
    description: '상대방의 패턴과 텔을 파악하세요',
    tips: ['베팅 패턴을 주의깊게 관찰하세요', '상대방의 행동 변화를 감지하세요'],
    theory: 'intermediate'
  },
  advanced: {
    name: 'GTO 훈련',
    icon: 'Database',
    color: 'bg-indigo-500',
    description: '게임 이론적 최적 전략을 학습하세요',
    tips: ['밸런싱의 중요성을 이해하세요', '상대방의 실수를 익스플로잇하세요'],
    theory: 'master'
  }
};

// 프리플롭 핸드 레인지
export const PREFLOP_RANGES = {
  premium: ['AA', 'KK', 'QQ', 'JJ', 'AKs', 'AKo'],
  strong: ['TT', '99', 'AQs', 'AQo', 'AJs', 'KQs', 'KQo'],
  playable: ['88', '77', '66', 'ATs', 'A9s', 'KJs', 'KTs', 'QJs', 'QTs', 'JTs'],
  marginal: ['55', '44', '33', '22', 'A8s', 'A7s', 'A6s', 'A5s', 'K9s', 'Q9s', 'J9s', 'T9s', '98s', '87s', '76s', '65s'],
  trash: []
};

// 학습 이론 및 전략
export const POKER_THEORY = {
  beginner: {
    name: '초보자',
    theories: [
      {
        title: '핸드 선택 (Starting Hands)',
        content: '포커에서 가장 중요한 것은 어떤 핸드로 플레이할지 결정하는 것입니다.',
        details: [
          'AA, KK, QQ, JJ는 프리미엄 핸드로 항상 레이즈하세요',
          'AK, AQ는 강한 핸드이지만 언페어드이므로 주의하세요',
          '포지션이 늦을수록 더 많은 핸드를 플레이할 수 있습니다',
          '초보자는 타이트하게 플레이하는 것이 좋습니다'
        ]
      },
      {
        title: '포지션의 중요성',
        content: '포지션은 포커에서 가장 중요한 요소 중 하나입니다.',
        details: [
          '버튼(딜러) 포지션이 가장 유리합니다',
          '늦은 포지션에서는 상대방의 액션을 본 후 결정할 수 있습니다',
          '일찍 포지션에서는 강한 핸드만 플레이하세요',
          '포지션이 좋을 때는 블러프 기회가 많아집니다'
        ]
      }
    ]
  },
  intermediate: {
    name: '중급자',
    theories: [
      {
        title: '팟 오즈와 임플라이드 오즈',
        content: '수학적 계산을 통해 올바른 결정을 내리는 방법입니다.',
        details: [
          '팟 오즈 = 콜 금액 / (팟 + 콜 금액)',
          '승률이 팟 오즈보다 높으면 수익적입니다',
          '임플라이드 오즈는 미래 베팅까지 고려한 개념입니다',
          '드로우 핸드에서는 아웃츠를 정확히 계산하세요'
        ]
      }
    ]
  },
  advanced: {
    name: '상급자',
    theories: [
      {
        title: '밸런싱과 블러프',
        content: '벨류 핸드와 블러프 핸드의 균형을 맞추는 것입니다.',
        details: [
          '같은 액션을 벨류 핸드와 블러프 핸드 모두로 해야 합니다',
          '블러프 빈도는 상대방의 폴드 빈도와 팟 오즈에 따라 결정됩니다'
        ]
      }
    ]
  },
  master: {
    name: '마스터',
    theories: [
      {
        title: 'GTO (Game Theory Optimal)',
        content: '게임 이론적으로 최적화된 플레이 방식입니다.',
        details: [
          'GTO 전략은 상대방이 어떻게 플레이하든 최소 손실을 보장합니다',
          '솔버를 이용해 각 상황별 최적 전략을 학습하세요'
        ]
      }
    ]
  }
};