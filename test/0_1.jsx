import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Users, Brain, TrendingUp, Target, Settings, Play, BarChart3, Calculator, Eye, Zap, Trophy, Star, ChevronRight, ChevronLeft, BookOpen, PieChart, Clock, Award, Gift, HelpCircle, Database, Gamepad2, LineChart, Activity, Users2, Lightbulb, FileText, Video, MessageCircle, AlertTriangle, CheckCircle, XCircle, ArrowUp, ArrowDown, X, Menu, Tv, RefreshCw, GraduationCap, Coins, DollarSign } from 'lucide-react';

// 광고 배너 컴포넌트
const AdBanner = () => (
  <div className="w-full bg-gray-100 border border-gray-300 p-4 text-center">
    <div className="text-gray-600 text-sm font-medium">
      광고 배너 영역 - 실제 광고 코드로 교체하세요
    </div>
    <div className="text-xs text-gray-400 mt-1">
      예: Google AdSense, 네이버 애드포스트 등
    </div>
  </div>
);

// 광고 리워드 비디오 컴포넌트
const RewardVideoAd = ({ onReward, onClose }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 max-w-md">
      <h3 className="text-lg font-bold mb-4">광고 시청으로 칩 충전</h3>
      <p className="text-gray-600 mb-4">30초 광고를 시청하면 1000 칩을 받을 수 있습니다.</p>
      <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center mb-4">
        <div className="text-gray-500">광고 영상 영역</div>
      </div>
      <div className="flex gap-2">
        <button onClick={onReward} className="flex-1 bg-green-600 text-white py-2 rounded font-bold">
          광고 시청 완료
        </button>
        <button onClick={onClose} className="px-4 py-2 border rounded">
          닫기
        </button>
      </div>
    </div>
  </div>
);

// 포커 상수
const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const SUIT_COLORS = { '♠': '#000', '♣': '#000', '♥': '#e53e3e', '♦': '#e53e3e' };
const BLINDS = { small: 10, big: 20 };

// 학습 이론 및 전략
const POKER_THEORY = {
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

// 학습 모드 정의
const LEARNING_MODES = {
  probability: { 
    name: '확률 훈련', 
    icon: Calculator, 
    color: 'bg-blue-500',
    description: '팟 오즈, 아웃츠, 승률 계산을 마스터하세요',
    tips: ['아웃츠를 정확히 세는 연습을 하세요', '팟 오즈와 승률을 비교하는 습관을 기르세요'],
    theory: 'intermediate'
  },
  bluffing: { 
    name: '블러프 훈련', 
    icon: Eye, 
    color: 'bg-purple-500',
    description: '언제, 어떻게 블러프할지 배우세요',
    tips: ['상대방의 레인지를 고려하세요', '보드 텍스처에 따라 블러프 빈도를 조절하세요'],
    theory: 'advanced'
  },
  position: { 
    name: '포지션 훈련', 
    icon: Target, 
    color: 'bg-green-500',
    description: '포지션의 힘을 활용하는 법을 배우세요',
    tips: ['늦은 포지션에서 더 많은 핸드를 플레이하세요', '일찍 포지션에서는 강한 핸드만 플레이하세요'],
    theory: 'beginner'
  },
  reading: { 
    name: '상대 읽기', 
    icon: Brain, 
    color: 'bg-orange-500',
    description: '상대방의 패턴과 텔을 파악하세요',
    tips: ['베팅 패턴을 주의깊게 관찰하세요', '상대방의 행동 변화를 감지하세요'],
    theory: 'intermediate'
  },
  advanced: {
    name: 'GTO 훈련',
    icon: Database,
    color: 'bg-indigo-500',
    description: '게임 이론적 최적 전략을 학습하세요',
    tips: ['밸런싱의 중요성을 이해하세요', '상대방의 실수를 익스플로잇하세요'],
    theory: 'master'
  }
};

// 덱 생성 및 셔플
const createDeck = () => {
  const deck = [];
  SUITS.forEach(suit => {
    RANKS.forEach((rank, index) => {
      deck.push({ suit, rank, value: index + 2, id: `${suit}${rank}` });
    });
  });
  return deck;
};

const shuffleDeck = (deck) => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

// 핸드 평가 시스템
const evaluateHand = (cards) => {
  if (cards.length < 5) return { rank: 0, description: 'Incomplete hand', value: 0 };
  
  const allCombinations = getCombinations(cards, 5);
  let bestHand = { rank: 0, description: 'High Card', value: 0 };
  
  allCombinations.forEach(combo => {
    const hand = analyzeHand(combo);
    if (hand.rank > bestHand.rank || (hand.rank === bestHand.rank && hand.value > bestHand.value)) {
      bestHand = hand;
      bestHand.cards = combo;
    }
  });
  
  return bestHand;
};

const getCombinations = (arr, k) => {
  if (k === 1) return arr.map(x => [x]);
  const combinations = [];
  for (let i = 0; i <= arr.length - k; i++) {
    const head = arr[i];
    const tailCombos = getCombinations(arr.slice(i + 1), k - 1);
    tailCombos.forEach(combo => combinations.push([head, ...combo]));
  }
  return combinations;
};

const analyzeHand = (cards) => {
  const sortedCards = [...cards].sort((a, b) => b.value - a.value);
  const suits = cards.map(c => c.suit);
  const values = cards.map(c => c.value);
  
  const isFlush = suits.every(suit => suit === suits[0]);
  const isStraight = checkStraight(values);
  const valueCounts = getValueCounts(values);
  
  if (isStraight && isFlush) {
    if (values.includes(14) && values.includes(13)) 
      return { rank: 9, description: 'Royal Flush', value: 9000000 };
    return { rank: 8, description: 'Straight Flush', value: 8000000 + Math.max(...values) };
  }
  
  if (valueCounts.four) 
    return { rank: 7, description: 'Four of a Kind', value: 7000000 + valueCounts.fourValue * 1000 };
  
  if (valueCounts.three && valueCounts.pair) 
    return { rank: 6, description: 'Full House', value: 6000000 + valueCounts.threeValue * 1000 + valueCounts.pairValue };
  
  if (isFlush) 
    return { rank: 5, description: 'Flush', value: 5000000 + values.reduce((a, b) => a + b, 0) };
  
  if (isStraight) 
    return { rank: 4, description: 'Straight', value: 4000000 + Math.max(...values) };
  
  if (valueCounts.three) 
    return { rank: 3, description: 'Three of a Kind', value: 3000000 + valueCounts.threeValue * 1000 };
  
  if (valueCounts.twoPair) 
    return { rank: 2, description: 'Two Pair', value: 2000000 + valueCounts.pairValues[0] * 100 + valueCounts.pairValues[1] };
  
  if (valueCounts.pair) 
    return { rank: 1, description: 'One Pair', value: 1000000 + valueCounts.pairValue * 1000 };
  
  return { rank: 0, description: 'High Card', value: values.reduce((a, b) => a + b, 0) };
};

const checkStraight = (values) => {
  const sorted = [...new Set(values)].sort((a, b) => a - b);
  if (sorted.length < 5) return false;
  
  for (let i = 0; i <= sorted.length - 5; i++) {
    let consecutive = true;
    for (let j = 1; j < 5; j++) {
      if (sorted[i + j] !== sorted[i] + j) {
        consecutive = false;
        break;
      }
    }
    if (consecutive) return true;
  }
  
  // A-2-3-4-5 straight
  if (sorted.includes(14) && sorted.includes(2) && sorted.includes(3) && sorted.includes(4) && sorted.includes(5)) {
    return true;
  }
  
  return false;
};

const getValueCounts = (values) => {
  const counts = {};
  values.forEach(value => counts[value] = (counts[value] || 0) + 1);
  const countEntries = Object.entries(counts).map(([val, count]) => ({ value: parseInt(val), count }));
  
  const result = {
    four: false, three: false, pair: false, twoPair: false,
    pairValues: [], fourValue: 0, threeValue: 0, pairValue: 0
  };
  
  countEntries.forEach(({ value, count }) => {
    if (count === 4) {
      result.four = true;
      result.fourValue = value;
    } else if (count === 3) {
      result.three = true;
      result.threeValue = value;
    } else if (count === 2) {
      if (result.pair) {
        result.twoPair = true;
        result.pairValues.push(value);
      } else {
        result.pair = true;
        result.pairValue = value;
        result.pairValues.push(value);
      }
    }
  });
  
  result.pairValues.sort((a, b) => b - a);
  return result;
};

// 아웃츠 및 확률 계산
const calculateOuts = (playerCards, communityCards) => {
  const allCards = [...playerCards, ...communityCards];
  const currentHand = evaluateHand(allCards);
  
  let outs = 0;
  const usedCards = new Set(allCards.map(c => c.id));
  const deck = createDeck().filter(c => !usedCards.has(c.id));
  
  deck.forEach(card => {
    const newHand = evaluateHand([...allCards, card]);
    if (newHand.rank > currentHand.rank || 
        (newHand.rank === currentHand.rank && newHand.value > currentHand.value)) {
      outs++;
    }
  });
  
  return Math.min(outs, 47);
};

const calculateWinProbability = (outs, street) => {
  const cardsLeft = street === 'flop' ? 2 : street === 'turn' ? 1 : 0;
  const unknownCards = 47;
  
  if (cardsLeft === 2) {
    return Math.round(((outs / unknownCards) + ((outs - 1) / (unknownCards - 1))) * 100 * 0.8);
  } else if (cardsLeft === 1) {
    return Math.round((outs / unknownCards) * 100);
  }
  
  return 0;
};

// AI 스타일 및 의사결정
const AI_STYLES = {
  tight: { 
    name: '타이트', 
    vpip: 0.18, pfr: 0.14, aggression: 0.35, bluffFreq: 0.15,
    color: 'bg-blue-500'
  },
  loose: { 
    name: '루즈', 
    vpip: 0.45, pfr: 0.28, aggression: 0.55, bluffFreq: 0.4,
    color: 'bg-red-500'
  },
  aggressive: { 
    name: '공격적', 
    vpip: 0.32, pfr: 0.25, aggression: 0.85, bluffFreq: 0.6,
    color: 'bg-orange-500'
  },
  pro: { 
    name: '프로', 
    vpip: 0.25, pfr: 0.18, aggression: 0.65, bluffFreq: 0.35,
    color: 'bg-purple-500'
  }
};

const getHandString = (cards) => {
  if (!cards || cards.length !== 2) return 'XX';
  
  const [c1, c2] = cards.sort((a, b) => b.value - a.value);
  const suited = c1.suit === c2.suit ? 's' : 'o';
  
  if (c1.value === c2.value) {
    return `${c1.rank}${c2.rank}`;
  }
  
  return `${c1.rank}${c2.rank}${suited}`;
};

const getAIAction = (player, gameState, communityCards) => {
  if (!player || !gameState || !player.aiStyle || !AI_STYLES[player.aiStyle]) {
    return { action: 'fold', amount: 0 };
  }

  const style = AI_STYLES[player.aiStyle];
  const handString = getHandString(player.cards);
  const allCards = [...player.cards, ...communityCards];
  const handStrength = allCards.length >= 5 ? evaluateHand(allCards).rank : 0;
  const callAmount = Math.max(0, gameState.currentBet - player.currentBet);
  
  if (player.chips <= 0) {
    return callAmount === 0 ? { action: 'check', amount: 0 } : { action: 'fold', amount: 0 };
  }
  
  // 프리플롭 결정
  if (gameState.gamePhase === 'preflop') {
    const cards = player.cards.sort((a, b) => b.value - a.value);
    const [high, low] = cards;
    const isPair = high.value === low.value;
    const isSuited = high.suit === low.suit;
    
    let handValue = 0;
    
    if (isPair) {
      if (high.value >= 14) handValue = 100; // AA
      else if (high.value >= 13) handValue = 95; // KK
      else if (high.value >= 12) handValue = 90; // QQ
      else if (high.value >= 11) handValue = 85; // JJ
      else if (high.value >= 10) handValue = 75; // TT
      else if (high.value >= 9) handValue = 65; // 99
      else if (high.value >= 8) handValue = 55; // 88
      else if (high.value >= 7) handValue = 45; // 77
      else handValue = 35; // 낮은 페어
    } else {
      if (high.value === 14 && low.value >= 13) handValue = isSuited ? 88 : 82; // AK
      else if (high.value === 14 && low.value >= 12) handValue = isSuited ? 78 : 70; // AQ
      else if (high.value === 14 && low.value >= 11) handValue = isSuited ? 72 : 62; // AJ
      else if (high.value === 14 && low.value >= 10) handValue = isSuited ? 65 : 55; // AT
      else if (high.value === 13 && low.value >= 12) handValue = isSuited ? 68 : 58; // KQ
      else if (high.value === 13 && low.value >= 11) handValue = isSuited ? 60 : 48; // KJ
      else if (high.value === 12 && low.value >= 11) handValue = isSuited ? 58 : 46; // QJ
      else if (isSuited && high.value - low.value <= 4 && low.value >= 6) handValue = 50;
      else if (high.value >= 10 && low.value >= 9) handValue = isSuited ? 45 : 35;
      else handValue = 20;
    }

    const playThreshold = {
      tight: 70,
      loose: 35,
      aggressive: 50,
      pro: 60
    }[player.aiStyle] || 60;

    if (handValue < playThreshold) {
      return { action: 'fold', amount: 0 };
    }

    if (handValue >= 85 || (handValue >= 70 && Math.random() < style.pfr)) {
      const raiseSize = gameState.currentBet === BLINDS.big ? 
        BLINDS.big * 3 : 
        Math.max(gameState.currentBet + BLINDS.big, gameState.currentBet * 1.5);
      
      if (raiseSize <= player.chips + player.currentBet) {
        return { action: 'raise', amount: raiseSize };
      }
    }

    if (callAmount <= player.chips) {
      return { action: 'call', amount: callAmount };
    }
    
    return { action: 'fold', amount: 0 };
  }
  
  // 포스트플롭 결정
  const random = Math.random();
  
  if (handStrength >= 6) {
    if (callAmount === 0) {
      const betSize = Math.min(Math.floor(gameState.pot * 0.8), player.chips + player.currentBet);
      return { action: 'raise', amount: betSize };
    } else {
      return { action: 'call', amount: Math.min(callAmount, player.chips) };
    }
  }
  
  if (handStrength >= 3) {
    if (callAmount <= gameState.pot * 0.5) {
      return { action: 'call', amount: Math.min(callAmount, player.chips) };
    } else if (random < style.aggression * 0.5) {
      const betSize = Math.min(Math.floor(gameState.pot * 0.6), player.chips + player.currentBet);
      return { action: 'raise', amount: betSize };
    }
    return { action: 'fold', amount: 0 };
  }
  
  if (handStrength >= 1) {
    if (callAmount === 0) {
      if (random < 0.7) {
        return { action: 'check', amount: 0 };
      } else {
        const betSize = Math.min(Math.floor(gameState.pot * 0.4), player.chips + player.currentBet);
        return { action: 'raise', amount: betSize };
      }
    } else if (callAmount <= gameState.pot * 0.3) {
      return { action: 'call', amount: Math.min(callAmount, player.chips) };
    }
    return { action: 'fold', amount: 0 };
  }
  
  if (callAmount === 0) {
    if (random < style.bluffFreq * 0.4) {
      const betSize = Math.min(Math.floor(gameState.pot * 0.5), player.chips + player.currentBet);
      return { action: 'raise', amount: betSize };
    }
    return { action: 'check', amount: 0 };
  }
  
  return { action: 'fold', amount: 0 };
};

// 카드 컴포넌트
const PokerCard = ({ card, faceDown = false, small = false, highlight = false }) => {
  if (faceDown) {
    return (
      <div className={
        (small ? 'w-12 h-16' : 'w-16 h-22') + 
        " bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg border-2 border-blue-600 flex items-center justify-center shadow-lg"
      }>
        <div className="text-blue-300 text-lg">🂠</div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className={
        (small ? 'w-12 h-16' : 'w-16 h-22') + 
        " border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-green-600"
      }>
        <div className="text-white/50 text-xl">?</div>
      </div>
    );
  }

  return (
    <div className={
      (small ? 'w-12 h-16' : 'w-16 h-22') + 
      " bg-white rounded-lg border-2 border-gray-300 flex flex-col items-center justify-center shadow-lg" +
      (highlight ? ' ring-4 ring-yellow-400 transform scale-105' : '') +
      " transition-all duration-300"
    }>
      <div className={(small ? 'text-sm' : 'text-lg') + " font-bold"} style={{ color: SUIT_COLORS[card.suit] }}>
        {card.rank}
      </div>
      <div className={(small ? 'text-lg' : 'text-2xl')} style={{ color: SUIT_COLORS[card.suit] }}>
        {card.suit}
      </div>
    </div>
  );
};

// 이론 팝업 컴포넌트
const TheoryPopup = ({ theory, onClose }) => {
  if (!theory) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{theory.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-4 text-lg">{theory.content}</p>
          <div className="space-y-3">
            {theory.details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 학습 피드백 컴포넌트
const LearningFeedback = ({ action, gameState, playerCards, communityCards, mode }) => {
  const [feedback, setFeedback] = useState(null);
  
  useEffect(() => {
    if (!action || !gameState) return;
    
    const outs = calculateOuts(playerCards, communityCards);
    const winProb = calculateWinProbability(outs, gameState.gamePhase);
    const potOdds = gameState.currentBet > 0 ? (gameState.currentBet / (gameState.pot + gameState.currentBet)) * 100 : 0;
    
    let feedbackData = {
      type: 'neutral',
      title: '액션 분석',
      message: '',
      tips: [],
      score: 0
    };
    
    if (mode === 'probability') {
      if (action.action === 'call' && winProb < potOdds - 5) {
        feedbackData = {
          type: 'error',
          title: '확률적으로 불리한 콜',
          message: `승률 ${winProb}%로 팟 오즈 ${potOdds.toFixed(1)}%보다 낮습니다.`,
          tips: ['팟 오즈보다 승률이 낮으면 장기적으로 손해입니다', '아웃츠를 정확히 계산해보세요'],
          score: -10
        };
      } else if (action.action === 'fold' && winProb > potOdds + 10) {
        feedbackData = {
          type: 'warning',
          title: '너무 타이트한 플레이',
          message: `승률 ${winProb}%로 충분히 콜할 수 있었습니다.`,
          tips: ['좋은 팟 오즈일 때는 약간 약한 핸드도 콜할 수 있습니다'],
          score: -5
        };
      } else if (action.action === 'call' && winProb > potOdds + 5) {
        feedbackData = {
          type: 'success',
          title: '좋은 확률적 판단',
          message: `승률 ${winProb}%로 팟 오즈를 충족합니다.`,
          tips: ['올바른 수학적 접근입니다'],
          score: 10
        };
      }
    }
    
    setFeedback(feedbackData);
    setTimeout(() => setFeedback(null), 5000);
  }, [action, gameState, playerCards, communityCards, mode]);
  
  if (!feedback) return null;
  
  return (
    <div className={
      "fixed top-20 right-4 max-w-sm p-4 rounded-lg shadow-lg z-40 transition-all duration-300 " +
      (feedback.type === 'success' ? 'bg-green-600' : 
       feedback.type === 'error' ? 'bg-red-600' : 
       feedback.type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600') +
      " text-white"
    }>
      <div className="flex items-center gap-2 mb-2">
        {feedback.type === 'success' && <CheckCircle className="w-5 h-5" />}
        {feedback.type === 'error' && <XCircle className="w-5 h-5" />}
        {feedback.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
        <div className="font-bold">{feedback.title}</div>
        <div className={
          "ml-auto text-sm px-2 py-1 rounded " +
          (feedback.score > 0 ? 'bg-green-700' : feedback.score < 0 ? 'bg-red-700' : 'bg-gray-700')
        }>
          {feedback.score > 0 ? '+' : ''}{feedback.score}
        </div>
      </div>
      <div className="text-sm mb-2">{feedback.message}</div>
      {feedback.tips.length > 0 && (
        <div className="text-xs">
          <div className="font-semibold mb-1">💡 팁:</div>
          {feedback.tips.map((tip, idx) => (
            <div key={idx} className="opacity-90">• {tip}</div>
          ))}
        </div>
      )}
    </div>
  );
};

// 베팅 컨트롤 컴포넌트
const BettingControls = ({ player, gameState, onAction, mode }) => {
  const [betAmount, setBetAmount] = useState(0);
  const [showBetSlider, setShowBetSlider] = useState(false);

  const callAmount = Math.max(0, gameState.currentBet - player.currentBet);
  const canCheck = callAmount === 0;
  const minRaise = Math.max(gameState.currentBet + BLINDS.big, player.currentBet + BLINDS.big);
  const maxBet = player.chips + player.currentBet;

  useEffect(() => {
    setBetAmount(Math.min(minRaise, maxBet));
  }, [minRaise, maxBet]);

  const handleAction = (action, amount = 0) => {
    setShowBetSlider(false);
    onAction(action, amount);
  };

  return (
    <div className="bg-black/90 backdrop-blur-md rounded-xl p-6 border-2 border-yellow-500/50 shadow-2xl">
      <div className="text-center mb-4">
        <div className="text-white text-xl font-bold mb-2">당신의 턴</div>
        <div className="text-yellow-400 text-sm">
          팟: ${gameState.pot} | 
          {callAmount > 0 ? ` 콜: $${callAmount}` : ' 체크 가능'} | 
          칩: ${player.chips}
        </div>
      </div>

      {mode && LEARNING_MODES[mode] && (
        <div className="mb-4 p-3 bg-blue-900/50 rounded-lg border border-blue-500/30">
          <div className="text-blue-300 text-sm font-semibold mb-1">
            📚 {LEARNING_MODES[mode].name} 모드
          </div>
          <div className="text-blue-200 text-xs">
            {LEARNING_MODES[mode].tips[Math.floor(Math.random() * LEARNING_MODES[mode].tips.length)]}
          </div>
        </div>
      )}

      {showBetSlider && (
        <div className="mb-4 p-4 bg-white/10 rounded-lg border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-sm font-semibold">베팅 금액:</span>
            <span className="text-yellow-400 font-bold text-lg">${betAmount.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={minRaise}
            max={maxBet}
            step={BLINDS.big}
            value={betAmount}
            onChange={(e) => setBetAmount(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>최소: ${minRaise.toLocaleString()}</span>
            <span>팟: ${gameState.pot}</span>
            <span>최대: ${maxBet.toLocaleString()}</span>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setBetAmount(Math.min(Math.floor(gameState.pot * 0.5), maxBet))}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-1 px-2 rounded text-sm transition-colors"
            >
              1/2 팟
            </button>
            <button
              onClick={() => setBetAmount(Math.min(Math.floor(gameState.pot * 0.75), maxBet))}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-1 px-2 rounded text-sm transition-colors"
            >
              3/4 팟
            </button>
            <button
              onClick={() => setBetAmount(Math.min(gameState.pot, maxBet))}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-1 px-2 rounded text-sm transition-colors"
            >
              팟 베팅
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleAction('fold')}
          className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          폴드
        </button>
        
        {canCheck ? (
          <button
            onClick={() => handleAction('check')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            체크
          </button>
        ) : (
          <button
            onClick={() => handleAction('call', callAmount)}
            disabled={callAmount > player.chips}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none"
          >
            콜 ${callAmount}
          </button>
        )}
        
        <button
          onClick={() => setShowBetSlider(!showBetSlider)}
          disabled={minRaise > maxBet}
          className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none"
        >
          {showBetSlider ? '취소' : '레이즈'}
        </button>
        
        <button
          onClick={() => handleAction('allin', player.chips)}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          올인
        </button>
      </div>

      {showBetSlider && (
        <button
          onClick={() => handleAction('raise', betAmount)}
          disabled={betAmount > maxBet}
          className="w-full mt-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          ${betAmount.toLocaleString()} 베팅
        </button>
      )}

      {mode === 'probability' && (
        <div className="mt-4 p-3 bg-green-900/30 rounded-lg border border-green-500/30">
          <div className="text-green-300 text-xs">
            🎯 팟 오즈: {gameState.currentBet > 0 ? ((gameState.currentBet / (gameState.pot + gameState.currentBet)) * 100).toFixed(1) : 0}%
          </div>
        </div>
      )}
    </div>
  );
};

// 플레이어 컴포넌트
const Player = ({ player, isActive, isDealer, isShowdown, position, bestHand }) => {
  return (
    <div className={
      "relative bg-white rounded-xl p-4 shadow-lg border-2 transition-all duration-300 " +
      (isActive ? 'border-yellow-400 shadow-yellow-400/50 scale-105' : 'border-gray-300') +
      (player.folded ? ' opacity-50 grayscale' : '')
    }>
      {isDealer && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
          D
        </div>
      )}

      <div className="text-center mb-3">
        <div className="font-bold text-lg">{player.name}</div>
        <div className="text-sm text-gray-600">{position}</div>
        <div className="text-green-600 font-bold">${player.chips.toLocaleString()}</div>
        {!player.isHuman && player.aiStyle && AI_STYLES[player.aiStyle] && (
          <div className={"inline-block text-xs text-white px-2 py-1 rounded mt-1 " + AI_STYLES[player.aiStyle].color}>
            {AI_STYLES[player.aiStyle].name}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-1 mb-3">
        {player.cards.map((card, idx) => (
          <PokerCard 
            key={idx} 
            card={card} 
            faceDown={!player.isHuman && !isShowdown && !player.folded} 
            small 
            highlight={isShowdown && bestHand && bestHand.cards && bestHand.cards.includes(card)}
          />
        ))}
      </div>

      {player.currentBet > 0 && (
        <div className="text-center mb-2">
          <div className="bg-blue-100 px-3 py-1 rounded-full text-sm font-bold text-blue-800">
            ${player.currentBet.toLocaleString()}
          </div>
        </div>
      )}

      {player.lastAction && (
        <div className="text-center">
          <div className={"inline-block text-xs px-2 py-1 rounded-full font-semibold " + 
            (player.lastAction === 'fold' ? 'bg-red-100 text-red-700' :
             player.lastAction === 'raise' ? 'bg-orange-100 text-orange-700' :
             player.lastAction === 'call' ? 'bg-green-100 text-green-700' :
             player.lastAction === 'allin' ? 'bg-purple-100 text-purple-700' :
             'bg-blue-100 text-blue-700')
          }>
            {player.lastAction === 'allin' ? '올인' :
             player.lastAction === 'fold' ? '폴드' :
             player.lastAction === 'call' ? '콜' :
             player.lastAction === 'raise' ? '레이즈' :
             player.lastAction === 'check' ? '체크' : player.lastAction}
          </div>
        </div>
      )}

      {isShowdown && bestHand && (
        <div className="text-center mt-2">
          <div className="text-xs bg-gray-100 px-2 py-1 rounded font-semibold">
            {bestHand.description}
          </div>
        </div>
      )}
    </div>
  );
};

// 프로 도전 모달
const ProChallengeModal = ({ isOpen, onClose, onAccept, stats }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">프로 포커 플레이어 도전!</h2>
            <p className="text-gray-600">
              축하합니다! 당신의 포커 실력이 프로 수준에 도달했습니다.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-bold mb-3">현재 성과</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>총 수익: <span className="font-bold text-green-600">${stats.totalEarnings.toLocaleString()}</span></div>
              <div>승률: <span className="font-bold">{Math.round((stats.handsWon / stats.handsPlayed) * 100)}%</span></div>
              <div>학습 점수: <span className="font-bold text-blue-600">{stats.learningScore}</span></div>
              <div>연승: <span className="font-bold text-purple-600">{stats.currentStreak}</span></div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
            >
              계속 학습하기
            </button>
            <button
              onClick={onAccept}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              프로 도전하기!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 메인 게임 컴포넌트
const HoldemMaster = () => {
  const [currentView, setCurrentView] = useState('menu');
  const [selectedMode, setSelectedMode] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [gameLog, setGameLog] = useState([]);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const [showTheoryPopup, setShowTheoryPopup] = useState(null);
  const [showRewardAd, setShowRewardAd] = useState(false);
  const [showProChallenge, setShowProChallenge] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false); // 액션 중복 방지
  const [gameWatcherActive, setGameWatcherActive] = useState(false); // 게임 감시 활성화 상태
  
  const [playerStats, setPlayerStats] = useState({
    handsPlayed: 0,
    handsWon: 0,
    totalEarnings: 0,
    currentStreak: 0,
    learningScore: 0,
    mistakesMade: 0,
    goodDecisions: 0,
    totalChips: 1000
  });

  // 🔧 수정된 게임 진행 감시 (무한루프 방지)
  useEffect(() => {
    if (!gameState || currentView !== 'game' || gameState.gamePhase === 'showdown' || actionInProgress) {
      return;
    }
    
    // 이미 감시기가 활성화되어 있으면 새로 생성하지 않음
    if (gameWatcherActive) return;
    
    setGameWatcherActive(true);
    
    const gameWatcher = setInterval(() => {
      // 게임 상태 다시 확인 (클로저 문제 해결)
      setGameState(currentGameState => {
        if (!currentGameState || currentGameState.gamePhase === 'showdown') {
          return currentGameState;
        }
        
        const activePlayer = currentGameState.players[currentGameState.activePlayer];
        
        if (!activePlayer || activePlayer.isHuman || activePlayer.folded || activePlayer.allIn) {
          return currentGameState;
        }
        
        console.log('⏰ 게임 감시기: AI 플레이어 무응답 감지', activePlayer.name);
        
        // 강제 액션 실행 (안전한 액션만)
        const callAmount = Math.max(0, currentGameState.currentBet - activePlayer.currentBet);
        
        if (callAmount === 0) {
          processAIAction(currentGameState, true); // 강제 모드
        } else if (callAmount <= activePlayer.chips * 0.2) {
          processAIAction(currentGameState, true); // 강제 모드
        } else {
          // 너무 비싸면 강제 폴드
          handlePlayerAction('fold', 0, true);
        }
        
        return currentGameState;
      });
    }, 15000); // 15초로 증가 (더 여유롭게)
    
    return () => {
      clearInterval(gameWatcher);
      setGameWatcherActive(false);
    };
  }, [gameState?.activePlayer, currentView, gameState?.gamePhase, actionInProgress]);

  const checkProChallenge = useCallback((stats) => {
    if (stats.totalChips >= 10000 && stats.learningScore >= 500 && stats.currentStreak >= 10) {
      setShowProChallenge(true);
    }
  }, []);

  // 🔧 완전 리셋 함수 (안전장치 강화)
  const resetGameState = () => {
    console.log('🔄 게임 상태 완전 리셋');
    setGameState(null);
    setIsProcessingAction(false);
    setActionInProgress(false);
    setGameWatcherActive(false);
    setGameLog([]);
    setLastAction(null);
    addToLog('🔄 게임이 리셋되었습니다.');
  };

  const getRandomTheory = (level) => {
    const theories = POKER_THEORY[level]?.theories || [];
    return theories[Math.floor(Math.random() * theories.length)];
  };

  // 🔧 수정된 게임 초기화 (더 안전하게)
  const initializeGame = (mode) => {
    if (playerStats.totalChips <= 0) {
      setShowRewardAd(true);
      return;
    }

    // 이전 상태 완전 초기화
    resetGameState();
    
    setTimeout(() => {
      const deck = shuffleDeck(createDeck());
      
      const players = [
        {
          id: 0,
          name: '플레이어',
          chips: Math.min(playerStats.totalChips, 1000),
          cards: [deck[0], deck[1]],
          position: 'Button',
          isHuman: true,
          aiStyle: null,
          folded: false,
          allIn: false,
          currentBet: 0,
          lastAction: null
        },
        {
          id: 1,
          name: 'AI Pro',
          chips: 1000,
          cards: [deck[2], deck[3]],
          position: 'Small Blind',
          isHuman: false,
          aiStyle: 'pro',
          folded: false,
          allIn: false,
          currentBet: BLINDS.small,
          lastAction: 'blind'
        },
        {
          id: 2,
          name: 'AI Shark',
          chips: 1000,
          cards: [deck[4], deck[5]],
          position: 'Big Blind',
          isHuman: false,
          aiStyle: 'aggressive',
          folded: false,
          allIn: false,
          currentBet: BLINDS.big,
          lastAction: 'blind'
        },
        {
          id: 3,
          name: 'AI Rock',
          chips: 1000,
          cards: [deck[6], deck[7]],
          position: 'UTG',
          isHuman: false,
          aiStyle: 'tight',
          folded: false,
          allIn: false,
          currentBet: 0,
          lastAction: null
        }
      ];

      players[1].chips -= BLINDS.small;
      players[2].chips -= BLINDS.big;

      const initialGameState = {
        players,
        communityCards: [],
        pot: BLINDS.small + BLINDS.big,
        currentBet: BLINDS.big,
        gamePhase: 'preflop',
        activePlayer: 3, // UTG (AI Rock) 시작
        dealerPosition: 0,
        deck: deck.slice(8),
        round: 1,
        winners: null,
        showdown: false,
        actionCount: 0,
        lastActionTime: Date.now()
      };

      setGameState(initialGameState);
      setSelectedMode(mode);
      setCurrentView('game');
      setIsProcessingAction(false);
      setActionInProgress(false);
      
      console.log('🎮 게임 초기화 완료', {
        activePlayer: initialGameState.activePlayer,
        playerName: players[3].name
      });
      
      addToLog('🎯 새로운 학습 세션이 시작되었습니다!');
      addToLog(`📚 모드: ${LEARNING_MODES[mode]?.name}`);
      addToLog(`💰 스몰/빅 블라인드: ${BLINDS.small}/${BLINDS.big}`);
      
      setPlayerStats(prev => ({ 
        ...prev, 
        handsPlayed: prev.handsPlayed + 1,
        totalChips: prev.totalChips - Math.min(prev.totalChips, 1000)
      }));

      // 첫 AI 액션 시작
      setTimeout(() => {
        if (players[3] && !players[3].isHuman) {
          processAIAction(initialGameState);
        }
      }, 2000);
    }, 500);
  };

  const addToLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    
    console.log('📝 게임 로그:', logMessage);
    
    setGameLog(prev => [...prev.slice(-8), { 
      message: logMessage, 
      timestamp: Date.now(),
      id: Math.random()
    }]);
  };

  // 🔧 수정된 플레이어 액션 처리 (중복 실행 방지)
  const handlePlayerAction = async (action, amount = 0, isForced = false) => {
    if (actionInProgress || isProcessingAction) {
      console.log('🚫 액션 이미 처리 중, 무시');
      return;
    }
    
    if (!gameState) {
      console.log('🚫 게임 상태 없음');
      return;
    }
    
    setActionInProgress(true);
    setIsProcessingAction(true);
    
    const currentPlayer = gameState.players[gameState.activePlayer];
    
    if (!currentPlayer) {
      console.log('🚫 현재 플레이어 없음');
      setActionInProgress(false);
      setIsProcessingAction(false);
      return;
    }
    
    console.log(`🎮 ${currentPlayer.name} 액션 처리:`, { 
      action, 
      amount, 
      chips: currentPlayer.chips, 
      currentBet: currentPlayer.currentBet,
      isForced 
    });
    
    let newGameState = { ...gameState };
    let actionAmount = amount;
    
    const actionData = { action, amount: actionAmount, player: currentPlayer };
    setLastAction(actionData);
    
    try {
      switch (action) {
        case 'fold':
          newGameState.players[gameState.activePlayer] = {
            ...currentPlayer,
            folded: true,
            lastAction: 'fold'
          };
          addToLog(`${currentPlayer.name}이 폴드했습니다.`);
          break;
          
        case 'check':
          newGameState.players[gameState.activePlayer] = {
            ...currentPlayer,
            lastAction: 'check'
          };
          addToLog(`${currentPlayer.name}이 체크했습니다.`);
          break;
          
        case 'call':
          actionAmount = Math.min(amount, currentPlayer.chips);
          newGameState.players[gameState.activePlayer] = {
            ...currentPlayer,
            chips: currentPlayer.chips - actionAmount,
            currentBet: currentPlayer.currentBet + actionAmount,
            lastAction: 'call'
          };
          newGameState.pot += actionAmount;
          addToLog(`${currentPlayer.name}이 ${actionAmount.toLocaleString()}를 콜했습니다.`);
          break;
          
        case 'raise':
          const betDifference = actionAmount - currentPlayer.currentBet;
          const actualBet = Math.min(betDifference, currentPlayer.chips);
          newGameState.players[gameState.activePlayer] = {
            ...currentPlayer,
            chips: currentPlayer.chips - actualBet,
            currentBet: actionAmount,
            lastAction: 'raise'
          };
          newGameState.pot += actualBet;
          newGameState.currentBet = actionAmount;
          addToLog(`${currentPlayer.name}이 ${actionAmount.toLocaleString()}로 레이즈했습니다.`);
          break;
          
        case 'allin':
          actionAmount = currentPlayer.chips;
          const newTotalBet = currentPlayer.currentBet + actionAmount;
          newGameState.players[gameState.activePlayer] = {
            ...currentPlayer,
            chips: 0,
            currentBet: newTotalBet,
            lastAction: 'allin',
            allIn: true
          };
          newGameState.pot += actionAmount;
          if (newTotalBet > newGameState.currentBet) {
            newGameState.currentBet = newTotalBet;
          }
          addToLog(`🔥 ${currentPlayer.name}이 올인했습니다! (${actionAmount.toLocaleString()})`);
          break;
          
        default:
          console.log('❌ 알 수 없는 액션:', action);
          setActionInProgress(false);
          setIsProcessingAction(false);
          return;
      }

      newGameState.actionCount = (newGameState.actionCount || 0) + 1;
      newGameState.lastActionTime = Date.now();
      setGameState(newGameState);
      
      console.log(`✅ ${currentPlayer.name} 액션 완료`);
      
      // 다음 액션 처리 (지연 시간 추가)
      setTimeout(() => {
        setActionInProgress(false);
        processNextAction(newGameState);
      }, 1500);
      
    } catch (error) {
      console.error('❌ 액션 처리 중 오류:', error);
      setActionInProgress(false);
      setIsProcessingAction(false);
    }
  };

  // 🔧 수정된 다음 액션 처리 (베팅 라운드 완료 조건 개선)
  const processNextAction = (currentGameState) => {
    console.log('🔄 다음 액션 처리 시작');

    const activePlayers = currentGameState.players.filter(p => !p.folded);
    
    // 🏆 게임 종료 조건: 한 명만 남음
    if (activePlayers.length === 1) {
      console.log('🏆 한 명만 남음, 게임 종료');
      endHand(currentGameState, activePlayers[0]);
      return;
    }

    // 🔍 베팅 라운드 완료 체크 (개선된 로직)
    const maxBet = Math.max(...currentGameState.players.map(p => p.folded ? 0 : p.currentBet));
    const playersNeedingAction = activePlayers.filter(p => 
      !p.allIn && 
      p.currentBet < maxBet && 
      p.chips > 0
    );
    
    console.log('📊 베팅 상황 분석:', {
      activePlayers: activePlayers.length,
      maxBet,
      playersNeedingAction: playersNeedingAction.length,
      playerBets: currentGameState.players.map(p => ({ 
        name: p.name, 
        bet: p.currentBet, 
        folded: p.folded, 
        allIn: p.allIn 
      }))
    });

    // ✅ 베팅 라운드 완료: 모든 플레이어가 같은 금액을 베팅했거나 올인
    if (playersNeedingAction.length === 0) {
      console.log('✅ 베팅 라운드 완료, 다음 단계로');
      moveToNextPhase(currentGameState);
      return;
    }

    // 🎯 다음 플레이어 찾기 (개선된 로직)
    let nextPlayerIndex = (currentGameState.activePlayer + 1) % currentGameState.players.length;
    let attempts = 0;
    
    while (attempts < 4) {
      const nextPlayer = currentGameState.players[nextPlayerIndex];
      
      console.log(`🔍 플레이어 ${nextPlayerIndex} (${nextPlayer.name}) 체크:`, {
        folded: nextPlayer.folded,
        allIn: nextPlayer.allIn,
        currentBet: nextPlayer.currentBet,
        maxBet: maxBet,
        chips: nextPlayer.chips,
        needsAction: !nextPlayer.folded && !nextPlayer.allIn && nextPlayer.currentBet < maxBet && nextPlayer.chips > 0
      });
      
      // 이 플레이어가 액션할 수 있는지 확인
      if (!nextPlayer.folded && !nextPlayer.allIn && nextPlayer.currentBet < maxBet && nextPlayer.chips > 0) {
        console.log(`✅ ${nextPlayer.name}이 다음 액션`);
        
        const newGameState = { ...currentGameState, activePlayer: nextPlayerIndex };
        setGameState(newGameState);

        if (!nextPlayer.isHuman) {
          setTimeout(() => {
            processAIAction(newGameState);
          }, 2000);
        } else {
          setIsProcessingAction(false);
        }
        return;
      }
      
      nextPlayerIndex = (nextPlayerIndex + 1) % currentGameState.players.length;
      attempts++;
    }

    // ⚠️ 액션할 플레이어가 없으면 다음 단계로
    console.log('⚠️ 액션할 플레이어가 없음, 다음 단계로 강제 이동');
    moveToNextPhase(currentGameState);
  };

  // 🔧 수정된 AI 액션 처리 (더 안전하게)
  const processAIAction = (currentGameState, isForced = false) => {
    const aiPlayer = currentGameState.players[currentGameState.activePlayer];
    
    console.log(`🤖 ${aiPlayer.name} AI 액션 처리 시작`, {
      chips: aiPlayer.chips,
      currentBet: aiPlayer.currentBet,
      gamePhase: currentGameState.gamePhase,
      isForced
    });
    
    // AI 플레이어 검증
    if (!aiPlayer || aiPlayer.isHuman || aiPlayer.folded || aiPlayer.allIn) {
      console.log('❌ AI 액션 처리 건너뛰기');
      setTimeout(() => {
        setIsProcessingAction(false);
        processNextAction(currentGameState);
      }, 500);
      return;
    }
    
    let finalAction = 'fold';
    let finalAmount = 0;
    
    try {
      const aiDecision = getAIAction(aiPlayer, currentGameState, currentGameState.communityCards);
      console.log(`🤖 ${aiPlayer.name} AI 결정:`, aiDecision);
      
      if (aiDecision && aiDecision.action) {
        const callAmount = Math.max(0, currentGameState.currentBet - aiPlayer.currentBet);
        
        // 액션 타입별 안전한 처리
        switch (aiDecision.action) {
          case 'fold':
            finalAction = 'fold';
            finalAmount = 0;
            break;
            
          case 'check':
            if (callAmount === 0) {
              finalAction = 'check';
              finalAmount = 0;
            } else {
              console.log('⚠️ 체크 불가능, 폴드로 변경');
              finalAction = 'fold';
              finalAmount = 0;
            }
            break;
            
          case 'call':
            if (callAmount === 0) {
              finalAction = 'check';
              finalAmount = 0;
            } else if (callAmount <= aiPlayer.chips) {
              finalAction = 'call';
              finalAmount = callAmount;
            } else {
              finalAction = 'allin';
              finalAmount = aiPlayer.chips;
            }
            break;
            
          case 'raise':
            if (aiDecision.amount > aiPlayer.chips + aiPlayer.currentBet) {
              finalAction = 'allin';
              finalAmount = aiPlayer.chips;
            } else if (aiDecision.amount <= currentGameState.currentBet) {
              if (callAmount <= aiPlayer.chips) {
                finalAction = 'call';
                finalAmount = callAmount;
              } else {
                finalAction = 'fold';
                finalAmount = 0;
              }
            } else {
              finalAction = 'raise';
              finalAmount = aiDecision.amount;
            }
            break;
            
          case 'allin':
            finalAction = 'allin';
            finalAmount = aiPlayer.chips;
            break;
            
          default:
            console.log('❌ 알 수 없는 액션, 폴드로 변경');
            finalAction = 'fold';
            finalAmount = 0;
        }
      } else {
        // 기본 안전 액션
        const callAmount = Math.max(0, currentGameState.currentBet - aiPlayer.currentBet);
        if (callAmount === 0) {
          finalAction = 'check';
          finalAmount = 0;
        } else if (callAmount <= aiPlayer.chips * 0.2) {
          finalAction = 'call';
          finalAmount = callAmount;
        } else {
          finalAction = 'fold';
          finalAmount = 0;
        }
      }
    } catch (error) {
      console.error('❌ AI 액션 처리 중 오류:', error);
      finalAction = 'fold';
      finalAmount = 0;
    }
    
    console.log(`✅ ${aiPlayer.name} 최종 액션:`, { action: finalAction, amount: finalAmount });
    
    // 액션 실행
    setTimeout(() => {
      handlePlayerAction(finalAction, finalAmount, isForced);
    }, 1000);
  };

  // 다음 게임 단계로 이동
  const moveToNextPhase = (currentGameState) => {
    const phases = ['preflop', 'flop', 'turn', 'river', 'showdown'];
    const currentPhaseIndex = phases.indexOf(currentGameState.gamePhase);
    
    if (currentPhaseIndex >= phases.length - 1) {
      showdown(currentGameState);
      return;
    }

    const nextPhase = phases[currentPhaseIndex + 1];
    let newCommunityCards = [...currentGameState.communityCards];
    
    if (nextPhase === 'flop') {
      newCommunityCards = currentGameState.deck.slice(0, 3);
      addToLog(`🃏 플롭: ${newCommunityCards.map(c => c.rank + c.suit).join(' ')}`);
    } else if (nextPhase === 'turn') {
      newCommunityCards.push(currentGameState.deck[3]);
      addToLog(`🃏 턴: ${currentGameState.deck[3].rank + currentGameState.deck[3].suit}`);
    } else if (nextPhase === 'river') {
      newCommunityCards.push(currentGameState.deck[4]);
      addToLog(`🃏 리버: ${currentGameState.deck[4].rank + currentGameState.deck[4].suit}`);
    }

    const resetPlayers = currentGameState.players.map(p => ({
      ...p,
      currentBet: 0,
      lastAction: null
    }));

    const activePlayers = resetPlayers.filter(p => !p.folded && !p.allIn);
    if (activePlayers.length === 0) {
      showdown({ ...currentGameState, players: resetPlayers, communityCards: newCommunityCards });
      return;
    }

    // SB부터 시작 (일반적인 포스트플롭 순서)
    let firstActiveIndex = 1;
    while (firstActiveIndex < resetPlayers.length && (resetPlayers[firstActiveIndex].folded || resetPlayers[firstActiveIndex].allIn)) {
      firstActiveIndex++;
    }

    if (firstActiveIndex >= resetPlayers.length) {
      showdown({ ...currentGameState, players: resetPlayers, communityCards: newCommunityCards });
      return;
    }

    const newGameState = {
      ...currentGameState,
      gamePhase: nextPhase,
      communityCards: newCommunityCards,
      currentBet: 0,
      activePlayer: firstActiveIndex,
      players: resetPlayers,
      actionCount: 0,
      lastActionTime: Date.now()
    };

    setGameState(newGameState);

    // 이론 팝업 표시 (랜덤하게)
    if (Math.random() < 0.3 && selectedMode) {
      const theoryLevel = LEARNING_MODES[selectedMode].theory;
      const randomTheory = getRandomTheory(theoryLevel);
      if (randomTheory) {
        setTimeout(() => setShowTheoryPopup(randomTheory), 2000);
      }
    }

    setTimeout(() => {
      if (!newGameState.players[firstActiveIndex].isHuman) {
        processAIAction(newGameState);
      } else {
        setIsProcessingAction(false);
      }
    }, 2000);
  };

  // 쇼다운 처리
  const showdown = (currentGameState) => {
    const activePlayers = currentGameState.players.filter(p => !p.folded);
    const playerHands = activePlayers.map(player => ({
      player,
      hand: evaluateHand([...player.cards, ...currentGameState.communityCards])
    }));

    playerHands.sort((a, b) => b.hand.value - a.hand.value);
    const winner = playerHands[0];

    addToLog(`🏆 쇼다운!`);
    playerHands.forEach(({ player, hand }) => {
      addToLog(`${player.name}: ${hand.description}`);
    });
    addToLog(`🎉 ${winner.player.name}이 $${currentGameState.pot.toLocaleString()}를 획득했습니다!`);

    // 통계 업데이트
    if (winner.player.isHuman) {
      const newStats = {
        ...playerStats,
        handsWon: playerStats.handsWon + 1,
        totalEarnings: playerStats.totalEarnings + currentGameState.pot,
        currentStreak: playerStats.currentStreak + 1,
        learningScore: playerStats.learningScore + 15,
        totalChips: playerStats.totalChips + currentGameState.pot
      };
      setPlayerStats(newStats);
      checkProChallenge(newStats);
    } else {
      const newStats = {
        ...playerStats,
        totalEarnings: playerStats.totalEarnings - (currentGameState.players[0].currentBet || 0),
        currentStreak: 0
      };
      setPlayerStats(newStats);
    }

    endHand(currentGameState, winner.player, winner.hand);
  };

  // 핸드 종료
  const endHand = (currentGameState, winner, winningHand = null) => {
    const newPlayers = currentGameState.players.map(p => 
      p.id === winner.id 
        ? { ...p, chips: p.chips + currentGameState.pot }
        : p
    );

    const newGameState = {
      ...currentGameState,
      gamePhase: 'showdown',
      winners: [{ player: winner, hand: winningHand }],
      players: newPlayers,
      showdown: true
    };
    
    setGameState(newGameState);
    setIsProcessingAction(false);
    setActionInProgress(false);

    setTimeout(() => {
      startNewHand();
    }, 6000);
  };

  // 새 핸드 시작
  const startNewHand = () => {
    addToLog('🔄 새로운 핸드를 시작합니다...');
    setTimeout(() => {
      initializeGame(selectedMode);
    }, 1000);
  };

  // 칩 리필 (광고 시청)
  const handleRewardAd = () => {
    setPlayerStats(prev => ({
      ...prev,
      totalChips: prev.totalChips + 1000
    }));
    setShowRewardAd(false);
    addToLog('💰 광고 시청으로 1000 칩을 받았습니다!');
  };

  // 이론 화면
  const TheoryView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <BookOpen className="w-10 h-10" />
            포커 이론 & 전략
          </h1>
          <button
            onClick={() => setCurrentView('menu')}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors"
          >
            메뉴로 돌아가기
          </button>
        </div>

        {Object.entries(POKER_THEORY).map(([level, data]) => (
          <div key={level} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <GraduationCap className="w-8 h-8" />
              {data.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.theories.map((theory, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 text-white"
                  onClick={() => setShowTheoryPopup(theory)}
                >
                  <h3 className="text-xl font-bold mb-3">{theory.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {theory.content}
                  </p>
                  <div className="flex items-center text-blue-300 text-sm">
                    <span>자세히 보기</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 메뉴 화면
  const MenuView = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 relative overflow-hidden">
      <div className="sticky top-0 z-30">
        <AdBanner />
      </div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-8xl">♠</div>
        <div className="absolute top-40 right-32 text-6xl">♥</div>
        <div className="absolute bottom-32 left-32 text-7xl">♦</div>
        <div className="absolute bottom-20 right-20 text-9xl">♣</div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-wide">
            🃏 홀덤마스터
          </h1>
          <p className="text-2xl text-emerald-200 mb-4">프로 포커 플레이어 양성 시스템</p>
          <p className="text-emerald-300">실전과 똑같은 환경에서 체계적으로 학습하세요</p>
        </div>

        {/* 상단 버튼들 */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setCurrentView('theory')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            이론 학습
          </button>
          {playerStats.totalChips <= 0 && (
            <button
              onClick={() => setShowRewardAd(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <Tv className="w-5 h-5" />
              칩 충전 (광고시청)
            </button>
          )}
        </div>

        {/* 통계 대시보드 */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <Coins className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold">{playerStats.totalChips.toLocaleString()}</div>
            <div className="text-sm text-emerald-200">보유 칩</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold">{playerStats.handsWon}</div>
            <div className="text-sm text-emerald-200">승리한 핸드</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold">{playerStats.currentStreak}</div>
            <div className="text-sm text-emerald-200">현재 연승</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold">{playerStats.learningScore}</div>
            <div className="text-sm text-emerald-200">학습 점수</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold">{playerStats.handsPlayed}</div>
            <div className="text-sm text-emerald-200">플레이한 핸드</div>
          </div>
        </div>

        {/* 학습 모드 선택 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">학습 모드 선택</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(LEARNING_MODES).map(([key, mode]) => {
              const IconComponent = mode.icon;
              const isDisabled = playerStats.totalChips <= 0;
              return (
                <div
                  key={key}
                  onClick={() => !isDisabled && initializeGame(key)}
                  className={`bg-white/10 backdrop-blur-md rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 text-white group transform hover:scale-105 shadow-xl ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className={`w-16 h-16 ${mode.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg mx-auto`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{mode.name}</h3>
                  <p className="text-emerald-200 mb-4 text-center text-sm leading-relaxed">
                    {mode.description}
                  </p>
                  <div className="text-center">
                    <div className="inline-block bg-gray-600 text-xs px-2 py-1 rounded mb-3">
                      {POKER_THEORY[mode.theory]?.name} 레벨
                    </div>
                  </div>
                  {!isDisabled && (
                    <div className="flex items-center justify-center text-emerald-300 group-hover:text-white transition-colors">
                      <span className="font-semibold">학습 시작</span>
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 성과 및 피드백 */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">학습 성과</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{playerStats.goodDecisions}</div>
              <div className="text-emerald-200">올바른 결정</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">{playerStats.mistakesMade}</div>
              <div className="text-emerald-200">실수 횟수</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${playerStats.totalEarnings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${playerStats.totalEarnings.toLocaleString()}
              </div>
              <div className="text-emerald-200">총 수익</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 게임 화면 (기존 코드와 동일하나 이론 팝업과 광고 추가)
  const GameView = () => {
    if (!gameState) return null;

    const currentPlayer = gameState.players[gameState.activePlayer];
    const isPlayerTurn = currentPlayer?.isHuman && !isProcessingAction && gameState.gamePhase !== 'showdown';
    const humanPlayer = gameState.players.find(p => p.isHuman);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-800 to-emerald-900 p-4">
        <div className="max-w-7xl mx-auto">
          <LearningFeedback
            action={lastAction}
            gameState={gameState}
            playerCards={humanPlayer?.cards || []}
            communityCards={gameState.communityCards}
            mode={selectedMode}
          />

          <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 mb-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentView('menu')}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  학습 종료
                </button>
                <button
                  onClick={() => {
                    resetGameState();
                    setTimeout(() => initializeGame(selectedMode), 500);
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors"
                >
                  🔄 재시작
                </button>
                <div className={"flex items-center gap-2 px-3 py-1 rounded-full " + (LEARNING_MODES[selectedMode] ? LEARNING_MODES[selectedMode].color : 'bg-gray-500')}>
                  {LEARNING_MODES[selectedMode] && (
                    <div className="w-4 h-4">
                      {selectedMode === 'probability' && <Calculator className="w-4 h-4" />}
                      {selectedMode === 'bluffing' && <Eye className="w-4 h-4" />}
                      {selectedMode === 'position' && <Target className="w-4 h-4" />}
                      {selectedMode === 'reading' && <Brain className="w-4 h-4" />}
                      {selectedMode === 'advanced' && <Database className="w-4 h-4" />}
                    </div>
                  )}
                  <span className="text-white text-sm font-semibold">
                    {LEARNING_MODES[selectedMode] ? LEARNING_MODES[selectedMode].name : 'Unknown Mode'}
                  </span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">${gameState.pot.toLocaleString()}</div>
                <div className="text-sm opacity-80">{gameState.gamePhase.toUpperCase()}</div>
              </div>
              
              <div className="text-right">
                <div className="text-lg">현재 베팅: ${gameState.currentBet.toLocaleString()}</div>
                {isPlayerTurn && <div className="text-yellow-400 font-bold animate-pulse">당신의 턴!</div>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3">
              <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-2xl p-8 mb-6 shadow-2xl border-4 border-yellow-600/30">
                <div className="text-center mb-8">
                  <h3 className="text-white text-xl font-bold mb-4">커뮤니티 카드</h3>
                  <div className="flex justify-center gap-4">
                    {[...Array(5)].map((_, idx) => (
                      <PokerCard 
                        key={idx} 
                        card={gameState.communityCards[idx]} 
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {gameState.players.map((player, idx) => (
                    <Player
                      key={player.id}
                      player={player}
                      isActive={idx === gameState.activePlayer}
                      isDealer={idx === gameState.dealerPosition}
                      isShowdown={gameState.showdown}
                      position={player.position}
                      bestHand={gameState.winners?.find(w => w.player.id === player.id)?.hand}
                    />
                  ))}
                </div>
              </div>

              {isPlayerTurn && (
                <BettingControls
                  player={currentPlayer}
                  gameState={gameState}
                  onAction={handlePlayerAction}
                  mode={selectedMode}
                />
              )}
            </div>

            {/* 사이드 패널 (기존과 동일) */}
            <div className="space-y-6">
              {humanPlayer && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    실시간 분석
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-center gap-2 mb-4">
                      {humanPlayer.cards.map((card, idx) => (
                        <PokerCard key={idx} card={card} small />
                      ))}
                    </div>
                    
                    {gameState.communityCards.length > 0 && (
                      <div>
                        <div className="text-sm font-semibold text-blue-300 mb-2">현재 핸드</div>
                        <div className="text-sm bg-black/20 p-2 rounded">
                          {evaluateHand([...humanPlayer.cards, ...gameState.communityCards]).description}
                        </div>
                      </div>
                    )}
                    
                    {gameState.communityCards.length > 0 && gameState.communityCards.length < 5 && (
                      <div className="space-y-2">
                        <div className="text-sm">
                          <div className="flex justify-between">
                            <span>아웃츠:</span>
                            <span className="font-bold">{calculateOuts(humanPlayer.cards, gameState.communityCards)}</span>
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="flex justify-between">
                            <span>승률:</span>
                            <span className="font-bold">{calculateWinProbability(calculateOuts(humanPlayer.cards, gameState.communityCards), gameState.gamePhase)}%</span>
                          </div>
                        </div>
                        {gameState.currentBet > 0 && (
                          <div className="text-sm">
                            <div className="flex justify-between">
                              <span>팟 오즈:</span>
                              <span className="font-bold">{((gameState.currentBet / (gameState.pot + gameState.currentBet)) * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 게임 로그 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                  게임 로그
                </h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {gameLog.map((log) => (
                    <div key={log.id} className="text-sm p-2 bg-black/20 rounded">
                      {log.message}
                    </div>
                  ))}
                </div>
              </div>

              {/* 학습 진행 상황 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  학습 진행
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>이번 세션:</span>
                    <span className="font-bold">{playerStats.handsPlayed} 핸드</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>승률:</span>
                    <span className="font-bold">
                      {playerStats.handsPlayed > 0 ? Math.round((playerStats.handsWon / playerStats.handsPlayed) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>수익:</span>
                    <span className={"font-bold " + (playerStats.totalEarnings >= 0 ? 'text-green-400' : 'text-red-400')}>
                      ${playerStats.totalEarnings.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>학습 점수:</span>
                    <span className="font-bold text-yellow-400">
                      {playerStats.learningScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* 모드별 팁 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  학습 팁
                </h3>
                <div className="text-sm space-y-2">
                  {selectedMode && LEARNING_MODES[selectedMode] && LEARNING_MODES[selectedMode].tips && LEARNING_MODES[selectedMode].tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 이론 빠른 액세스 */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  빠른 이론 학습
                </h3>
                <button
                  onClick={() => {
                    const theoryLevel = LEARNING_MODES[selectedMode]?.theory || 'beginner';
                    const randomTheory = getRandomTheory(theoryLevel);
                    if (randomTheory) setShowTheoryPopup(randomTheory);
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  랜덤 이론 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* 이론 팝업 */}
      {showTheoryPopup && (
        <TheoryPopup 
          theory={showTheoryPopup} 
          onClose={() => setShowTheoryPopup(null)} 
        />
      )}

      {/* 광고 리워드 팝업 */}
      {showRewardAd && (
        <RewardVideoAd 
          onReward={handleRewardAd}
          onClose={() => setShowRewardAd(false)}
        />
      )}

      {/* 프로 도전 모달 */}
      <ProChallengeModal
        isOpen={showProChallenge}
        onClose={() => setShowProChallenge(false)}
        onAccept={() => {
          setShowProChallenge(false);
          alert('축하합니다! 프로 포커 플레이어의 길에 도전하세요!\n\n추천 사이트:\n• PokerStars\n• 888poker\n• partypoker\n• GGPoker\n\n꾸준한 학습과 연습이 성공의 열쇠입니다!');
        }}
        stats={playerStats}
      />

      {/* 메인 컨텐츠 */}
      {currentView === 'menu' && <MenuView />}
      {currentView === 'game' && <GameView />}
      {currentView === 'theory' && <TheoryView />}
    </div>
  );
};

export default HoldemMaster;