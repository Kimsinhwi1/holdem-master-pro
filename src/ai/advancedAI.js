// 🤖 고급 포커 AI 시스템 - 완전히 새로운 설계

import { calculateHandStrength } from '../utils/handAnalysis.js';
import { findBestHand } from '../utils/cardUtils.js';

// 프리플롭 핸드 레인지 (실제 포커 전략 기반)
const PREFLOP_RANGES = {
  premium: ['AA', 'KK', 'QQ', 'JJ', 'AKs', 'AKo'],
  strong: ['TT', '99', 'AQs', 'AQo', 'AJs', 'AJo', 'KQs', 'KQo'],
  playable: ['88', '77', '66', 'ATs', 'A9s', 'KJs', 'KTs', 'QJs', 'QTs', 'JTs', 'T9s'],
  marginal: ['55', '44', '33', '22', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s', 'K9s', 'Q9s'],
  trash: [] // 나머지 모든 핸드
};

// AI 스타일별 특성 정의 (더 공격적으로 조정)
const AI_PERSONALITIES = {
  tight: {
    name: '타이트',
    preflopVPIP: 40, // AI Rock가 더 많이 플레이
    aggression: 3.0, // 더 공격적
    bluffFreq: 0.15, // 더 많은 블러프
    description: '강한 핸드 위주의 보수적 스타일'
  },
  loose: {
    name: '루즈',
    preflopVPIP: 45, // 매우 많이 플레이
    aggression: 2.0,
    bluffFreq: 0.20,
    description: '많은 핸드로 참여하는 적극적 스타일'
  },
  aggressive: {
    name: '공격적',
    preflopVPIP: 35,
    aggression: 4.0, // 매우 공격적
    bluffFreq: 0.30,
    description: '자주 레이즈하고 압박하는 스타일'
  },
  passive: {
    name: '수동적',
    preflopVPIP: 30, // 더 많이 플레이
    aggression: 1.2, // 덜 수동적
    bluffFreq: 0.05,
    description: '콜 위주의 소극적 스타일'
  },
  balanced: {
    name: '밸런스드',
    preflopVPIP: 32, // 더 많이 플레이
    aggression: 2.8, // 더 공격적
    bluffFreq: 0.15,
    description: '균형잡힌 플레이 스타일'
  },
  pro: {
    name: '프로',
    preflopVPIP: 30, // 더 많이 플레이
    aggression: 3.2, // 더 공격적
    bluffFreq: 0.22,
    description: '최고 수준의 정교한 플레이'
  }
};

// 핸드 강도 계산 (실제 포커 로직)
const getHandStrength = (playerCards, communityCards) => {
  if (!playerCards || playerCards.length !== 2) return 0;
  
  const allCards = [...playerCards, ...communityCards];
  
  if (communityCards.length === 0) {
    // 프리플롭: 핸드 레인지 기반 평가
    return getPreflopStrength(playerCards);
  } else {
    // 포스트플롭: 실제 핸드 강도 평가
    const bestHand = findBestHand(allCards);
    const handTypeStrengths = {
      '로얄 플러시': 100, '스트레이트 플러시': 95, '포카드': 90, '풀하우스': 85,
      '플러시': 80, '스트레이트': 75, '트리플': 70, '투페어': 65, '원페어': 60, '하이카드': 50
    };
    return handTypeStrengths[bestHand.type] || 50;
  }
};

// 프리플롭 핸드 강도 계산 (더 관대하게)
const getPreflopStrength = (cards) => {
  const [card1, card2] = cards;
  const handString = getHandString(card1, card2);
  
  console.log(`📋 핸드 분석: ${card1.rank}${card1.suit} ${card2.rank}${card2.suit} → ${handString}`);
  
  if (PREFLOP_RANGES.premium.includes(handString)) {
    const strength = 85 + Math.random() * 15;
    console.log(`💎 프리미엄 핸드! 강도: ${strength.toFixed(1)}`);
    return strength;
  }
  if (PREFLOP_RANGES.strong.includes(handString)) {
    const strength = 65 + Math.random() * 20; // 65-85
    console.log(`💪 강한 핸드! 강도: ${strength.toFixed(1)}`);
    return strength;
  }
  if (PREFLOP_RANGES.playable.includes(handString)) {
    const strength = 45 + Math.random() * 25; // 45-70
    console.log(`✅ 플레이 가능한 핸드! 강도: ${strength.toFixed(1)}`);
    return strength;
  }
  if (PREFLOP_RANGES.marginal.includes(handString)) {
    const strength = 25 + Math.random() * 25; // 25-50
    console.log(`⚠️ 마지널 핸드! 강도: ${strength.toFixed(1)}`);
    return strength;
  }
  
  const strength = 10 + Math.random() * 25; // 10-35 (더 관대하게)
  console.log(`❌ 약한 핸드! 강도: ${strength.toFixed(1)}`);
  return strength;
};

// 핸드를 문자열로 변환
const getHandString = (card1, card2) => {
  const rank1 = card1.rank === 'T' ? '10' : card1.rank;
  const rank2 = card2.rank === 'T' ? '10' : card2.rank;
  
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const val1 = ranks.indexOf(rank1);
  const val2 = ranks.indexOf(rank2);
  
  const suited = card1.suit === card2.suit ? 's' : 'o';
  
  if (val1 === val2) {
    return rank1 + rank2; // 페어
  } else if (val1 > val2) {
    return rank1 + rank2 + suited;
  } else {
    return rank2 + rank1 + suited;
  }
};

// 🎯 메인 AI 결정 함수
export const getAdvancedAIAction = (aiPlayer, gameState, communityCards) => {
  try {
    const personality = AI_PERSONALITIES[aiPlayer.aiStyle] || AI_PERSONALITIES.balanced;
    const handStrength = getHandStrength(aiPlayer.cards, communityCards);
    const position = getPosition(aiPlayer.id, gameState.players.length);
    const potSize = gameState.pot;
    const currentBet = gameState.currentBet || 0;
    const toCall = Math.max(0, currentBet - aiPlayer.currentBet);
    
    console.log(`🤖 ${aiPlayer.name} AI 고급 분석:`, {
      handStrength: handStrength.toFixed(1),
      position,
      personality: personality.name,
      toCall,
      potSize,
      gamePhase: gameState.gamePhase
    });
    
    // 올인 상황 체크
    if (toCall >= aiPlayer.chips) {
      return handStrength >= 65 ? { action: 'call', amount: aiPlayer.chips } : { action: 'fold', amount: 0 };
    }
    
    // 게임 단계별 결정
    if (gameState.gamePhase === 'preflop') {
      return getPreflopAction(aiPlayer, handStrength, personality, toCall, position);
    } else {
      return getPostflopAction(aiPlayer, handStrength, personality, toCall, potSize, gameState);
    }
    
  } catch (error) {
    console.error('AI 결정 오류:', error);
    return { action: 'fold', amount: 0 };
  }
};

// 프리플롭 액션 결정 (더 공격적으로 수정)
const getPreflopAction = (aiPlayer, handStrength, personality, toCall, position) => {
  const random = Math.random() * 100;
  
  console.log(`🎯 ${aiPlayer.name} 프리플롭 결정:`, {
    handStrength: handStrength.toFixed(1),
    toCall,
    personality: personality.name,
    chips: aiPlayer.chips
  });
  
  // 매우 강한 핸드 (80+) - 임계값 낮춤
  if (handStrength >= 80) {
    if (toCall === 0) {
      return { action: 'raise', amount: Math.min(aiPlayer.chips, 50 + random * 30) };
    } else {
      return { action: 'call', amount: toCall };
    }
  }
  
  // 강한 핸드 (60-79) - 임계값 낮춤
  if (handStrength >= 60) {
    if (toCall === 0) {
      return random < 80 ? 
        { action: 'raise', amount: Math.min(aiPlayer.chips, 30 + random * 20) } : 
        { action: 'check', amount: 0 };
    } else {
      return toCall <= aiPlayer.chips * 0.3 ? 
        { action: 'call', amount: toCall } : 
        { action: 'fold', amount: 0 };
    }
  }
  
  // 플레이 가능한 핸드 (40-59) - 임계값 낮춤
  if (handStrength >= 40) {
    if (toCall === 0) {
      return random < 50 ? 
        { action: 'raise', amount: Math.min(aiPlayer.chips, 25 + random * 15) } : 
        { action: 'check', amount: 0 };
    } else {
      return toCall <= aiPlayer.chips * 0.15 && random < 80 ? 
        { action: 'call', amount: toCall } : 
        { action: 'fold', amount: 0 };
    }
  }
  
  // 마지널 핸드 (20-39) - 임계값 더 낮춤
  if (handStrength >= 20) {
    if (toCall === 0) {
      return random < 35 ? 
        { action: 'raise', amount: Math.min(aiPlayer.chips, 20 + random * 10) } : 
        { action: 'check', amount: 0 };
    } else {
      return toCall <= 25 && random < 75 ? 
        { action: 'call', amount: toCall } : 
        { action: 'fold', amount: 0 };
    }
  }
  
  // 약한 핸드 (0-19)
  if (toCall === 0) {
    return random < 25 ? 
      { action: 'raise', amount: Math.min(aiPlayer.chips, 15 + random * 10) } : 
      { action: 'check', amount: 0 };
  } else {
    // 블라인드에서는 더 자주 콜
    return toCall <= 20 && random < 50 ? 
      { action: 'call', amount: toCall } : 
      { action: 'fold', amount: 0 };
  }
};

// 포스트플롭 액션 결정
const getPostflopAction = (aiPlayer, handStrength, personality, toCall, potSize, gameState) => {
  const random = Math.random() * 100;
  const potOdds = toCall / (potSize + toCall);
  
  // 매우 강한 핸드 (80+)
  if (handStrength >= 80) {
    if (toCall === 0) {
      const betSize = Math.min(aiPlayer.chips, potSize * (0.6 + random * 0.4));
      return { action: 'raise', amount: betSize };
    } else {
      return toCall <= aiPlayer.chips * 0.4 ? 
        { action: 'raise', amount: Math.min(aiPlayer.chips, toCall * 2.5) } : 
        { action: 'call', amount: toCall };
    }
  }
  
  // 강한 핸드 (65-79)
  if (handStrength >= 65) {
    if (toCall === 0) {
      return random < 75 ? 
        { action: 'raise', amount: Math.min(aiPlayer.chips, potSize * (0.4 + random * 0.3)) } : 
        { action: 'check', amount: 0 };
    } else {
      return toCall <= aiPlayer.chips * 0.25 ? 
        { action: 'call', amount: toCall } : 
        { action: 'fold', amount: 0 };
    }
  }
  
  // 중간 핸드 (45-64)
  if (handStrength >= 45) {
    if (toCall === 0) {
      return random < 25 ? 
        { action: 'raise', amount: Math.min(aiPlayer.chips, potSize * (0.3 + random * 0.2)) } : 
        { action: 'check', amount: 0 };
    } else {
      return toCall <= aiPlayer.chips * 0.15 && potOdds < 0.3 ? 
        { action: 'call', amount: toCall } : 
        { action: 'fold', amount: 0 };
    }
  }
  
  // 약한 핸드 / 블러프
  if (toCall === 0) {
    return random < personality.bluffFreq * 100 ? 
      { action: 'raise', amount: Math.min(aiPlayer.chips, potSize * (0.5 + random * 0.3)) } : 
      { action: 'check', amount: 0 };
  } else {
    return { action: 'fold', amount: 0 };
  }
};

// 포지션 계산
const getPosition = (playerId, totalPlayers) => {
  const positions = ['BTN', 'SB', 'BB', 'UTG', 'MP', 'CO'];
  return positions[playerId] || 'MP';
};

// 학습 피드백 생성
export const getSmartFeedback = (playerAction, aiAction, handStrength, gameState) => {
  const feedback = [];
  
  if (gameState.gamePhase === 'preflop') {
    if (handStrength >= 85 && playerAction === 'fold') {
      feedback.push('💪 프리미엄 핸드를 폴드했습니다. AA, KK, QQ, JJ, AK는 거의 항상 플레이해야 합니다!');
    }
    
    if (handStrength < 30 && playerAction === 'raise') {
      feedback.push('🎭 약한 핸드로 레이즈했습니다. 블러프는 좋지만 타이밍이 중요해요!');
    }
  }
  
  if (playerAction !== aiAction.action) {
    feedback.push(`🤖 AI는 ${getActionName(aiAction.action)}을 추천했습니다. 당신의 선택과 비교해보세요!`);
  }
  
  return feedback;
};

const getActionName = (action) => {
  const names = {
    'fold': '폴드',
    'check': '체크',
    'call': '콜',
    'raise': '레이즈'
  };
  return names[action] || action;
};