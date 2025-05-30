import { HAND_STRENGTHS, PREFLOP_RANGES } from '../constants/gameConstants.js';
import { getRankValue, findBestHand } from './cardUtils.js';

// 핸드 강도 계산
export const calculateHandStrength = (playerCards, communityCards) => {
  if (communityCards.length === 0) {
    return getPreflopStrength(playerCards);
  }
  
  const allCards = [...playerCards, ...communityCards];
  const bestHand = findBestHand(allCards);
  const handTypeStrength = getHandTypeStrength(bestHand.type);
  
  // 키커와 핸드 내 카드 강도 고려
  const kickerStrength = bestHand.cards.reduce((sum, card) => sum + card.value, 0) / bestHand.cards.length;
  
  return Math.min(100, handTypeStrength + (kickerStrength / 14) * 10);
};

// 프리플롭 핸드 강도
export const getPreflopStrength = (cards) => {
  const [card1, card2] = cards;
  const suited = card1.suit === card2.suit ? 's' : 'o';
  const ranks = [card1.rank, card2.rank].sort((a, b) => getRankValue(b) - getRankValue(a));
  
  let handString;
  if (card1.rank === card2.rank) {
    handString = card1.rank + card1.rank;
  } else {
    handString = ranks[0] + ranks[1] + suited;
  }
  
  // 프리미엄 핸드 강도
  const premiumHands = {
    'AA': 95, 'KK': 90, 'QQ': 85, 'JJ': 80, 'TT': 75,
    'AKs': 78, 'AKo': 75, 'AQs': 72, 'AQo': 68, 'AJs': 70,
    'KQs': 65, 'KQo': 62, 'QJs': 63, 'JTs': 60, 'T9s': 58
  };
  
  return premiumHands[handString] || Math.floor(Math.random() * 30) + 25;
};

// 핸드 타입별 강도
export const getHandTypeStrength = (handType) => {
  return HAND_STRENGTHS[handType] || 25;
};

// 아웃츠 계산
export const calculateOuts = (playerCards, communityCards, gameStage) => {
  if (communityCards.length < 3) return { outs: [], count: 0, odds: 0 };
  
  const allCards = [...playerCards, ...communityCards];
  const remainingCards = 52 - allCards.length;
  const cardsTocome = gameStage === 'turn' ? 1 : 2;
  
  let outs = [];
  let outsCount = 0;
  
  // 플러시 드로우 체크
  const suitCounts = {};
  allCards.forEach(card => {
    suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
  });
  
  Object.entries(suitCounts).forEach(([suit, count]) => {
    if (count === 4) {
      const remainingSuit = 13 - count;
      outs.push({ type: '플러시', count: remainingSuit, probability: remainingSuit });
      outsCount += remainingSuit;
    }
  });
  
  // 스트레이트 드로우 체크
  const values = allCards.map(card => card.value).sort((a, b) => a - b);
  const uniqueValues = [...new Set(values)];
  
  // 오픈 엔드 스트레이트 드로우
  for (let i = 0; i < uniqueValues.length - 3; i++) {
    const sequence = uniqueValues.slice(i, i + 4);
    if (sequence[3] - sequence[0] === 3) {
      const lowCard = sequence[0] - 1;
      const highCard = sequence[3] + 1;
      let straightOuts = 0;
      if (lowCard >= 2) straightOuts += 4;
      if (highCard <= 14) straightOuts += 4;
      if (straightOuts > 0) {
        outs.push({ type: '스트레이트', count: straightOuts, probability: straightOuts });
        outsCount += straightOuts;
      }
    }
  }
  
  // 페어 드로우 (원페어 → 투페어, 트리플)
  const rankCounts = {};
  allCards.forEach(card => {
    rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
  });
  
  Object.entries(rankCounts).forEach(([rank, count]) => {
    if (count === 2) {
      outs.push({ type: '트리플', count: 2, probability: 2 });
      outsCount += 2;
    } else if (count === 1 && playerCards.some(card => card.rank === rank)) {
      outs.push({ type: '페어', count: 3, probability: 3 });
      outsCount += 3;
    }
  });
  
  // 확률 계산 (룰 오브 4와 2)
  let probability;
  if (cardsTocome === 2) {
    probability = outsCount * 4; // 룰 오브 4
  } else {
    probability = outsCount * 2; // 룰 오브 2
  }
  
  return { outs, count: outsCount, odds: Math.min(probability, 100) };
};