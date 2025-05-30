import { SUITS, RANKS } from '../constants/gameConstants.js';

// 랭크 값 계산
export const getRankValue = (rank) => {
  if (rank === 'A') return 14;
  if (rank === 'K') return 13;
  if (rank === 'Q') return 12;
  if (rank === 'J') return 11;
  if (rank === 'T') return 10;
  return parseInt(rank);
};

// 덱 생성
export const createDeck = () => {
  const newDeck = [];
  SUITS.forEach(suit => {
    RANKS.forEach((rank, index) => {
      newDeck.push({ 
        suit, 
        rank, 
        value: index + 2,
        id: `${suit}${rank}`
      });
    });
  });
  return newDeck;
};

// 덱 셔플
export const shuffleDeck = (deck) => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};


// 베스트 핸드 찾기
export const findBestHand = (cards) => {
  const sortedCards = cards.sort((a, b) => b.value - a.value);
  
  // 플러시 체크
  const suitCounts = {};
  cards.forEach(card => {
    suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
  });
  const flushSuit = Object.keys(suitCounts).find(suit => suitCounts[suit] >= 5);
  
  // 스트레이트 체크
  const uniqueValues = [...new Set(sortedCards.map(card => card.value))];
  let isStraight = false;
  let straightHigh = 0;
  
  for (let i = 0; i <= uniqueValues.length - 5; i++) {
    let consecutive = 1;
    for (let j = 1; j < 5; j++) {
      if (uniqueValues[i] - uniqueValues[i + j] === j) {
        consecutive++;
      } else {
        break;
      }
    }
    if (consecutive === 5) {
      isStraight = true;
      straightHigh = uniqueValues[i];
      break;
    }
  }
  
  // A-2-3-4-5 스트레이트 (로우 스트레이트) 체크
  if (!isStraight && uniqueValues.includes(14) && uniqueValues.includes(2) && 
      uniqueValues.includes(3) && uniqueValues.includes(4) && uniqueValues.includes(5)) {
    isStraight = true;
    straightHigh = 5;
  }
  
  // 페어 체크
  const rankCounts = {};
  sortedCards.forEach(card => {
    rankCounts[card.value] = (rankCounts[card.value] || 0) + 1;
  });
  const pairs = Object.entries(rankCounts)
    .filter(([rank, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1] || b[0] - a[0]);

  // 핸드 타입 결정 (하이라이트 카드 정보 포함)
  if (flushSuit && isStraight) {
    const flushCards = sortedCards.filter(card => card.suit === flushSuit);
    const handCards = flushCards.slice(0, 5);
    if (straightHigh === 14 && flushCards.some(card => card.value === 14)) {
      return { type: '로얄 플러시', cards: handCards, highlightCards: handCards.map(c => c.id) };
    } else {
      return { type: '스트레이트 플러시', cards: handCards, highlightCards: handCards.map(c => c.id) };
    }
  } else if (pairs.length > 0 && pairs[0][1] === 4) {
    const quadValue = parseInt(pairs[0][0]);
    const quadCards = sortedCards.filter(card => card.value === quadValue);
    const handCards = sortedCards.slice(0, 5);
    return { type: '포카드', cards: handCards, highlightCards: quadCards.map(c => c.id) };
  } else if (pairs.length >= 2 && pairs[0][1] === 3 && pairs[1][1] >= 2) {
    const tripleValue = parseInt(pairs[0][0]);
    const pairValue = parseInt(pairs[1][0]);
    const tripleCards = sortedCards.filter(card => card.value === tripleValue);
    const pairCards = sortedCards.filter(card => card.value === pairValue).slice(0, 2);
    const handCards = sortedCards.slice(0, 5);
    return { type: '풀하우스', cards: handCards, highlightCards: [...tripleCards, ...pairCards].map(c => c.id) };
  } else if (flushSuit) {
    const flushCards = sortedCards.filter(card => card.suit === flushSuit);
    const handCards = flushCards.slice(0, 5);
    return { type: '플러시', cards: handCards, highlightCards: handCards.map(c => c.id) };
  } else if (isStraight) {
    const straightCards = [];
    const usedValues = new Set();
    for (let i = straightHigh; i > straightHigh - 5; i--) {
      const targetValue = i === 0 ? 14 : i; // A-2-3-4-5 처리
      const card = sortedCards.find(c => c.value === targetValue && !usedValues.has(c.id));
      if (card) {
        straightCards.push(card);
        usedValues.add(card.id);
      }
    }
    const handCards = sortedCards.slice(0, 5);
    return { type: '스트레이트', cards: handCards, highlightCards: straightCards.map(c => c.id) };
  } else if (pairs.length > 0 && pairs[0][1] === 3) {
    const tripleValue = parseInt(pairs[0][0]);
    const tripleCards = sortedCards.filter(card => card.value === tripleValue);
    const handCards = sortedCards.slice(0, 5);
    return { type: '트리플', cards: handCards, highlightCards: tripleCards.map(c => c.id) };
  } else if (pairs.length >= 2) {
    const firstPairValue = parseInt(pairs[0][0]);
    const secondPairValue = parseInt(pairs[1][0]);
    const firstPairCards = sortedCards.filter(card => card.value === firstPairValue);
    const secondPairCards = sortedCards.filter(card => card.value === secondPairValue);
    const handCards = sortedCards.slice(0, 5);
    return { type: '투페어', cards: handCards, highlightCards: [...firstPairCards, ...secondPairCards].map(c => c.id) };
  } else if (pairs.length === 1) {
    const pairValue = parseInt(pairs[0][0]);
    const pairCards = sortedCards.filter(card => card.value === pairValue);
    const handCards = sortedCards.slice(0, 5);
    return { type: '원페어', cards: handCards, highlightCards: pairCards.map(c => c.id) };
  } else {
    const handCards = sortedCards.slice(0, 5);
    return { type: '하이카드', cards: handCards, highlightCards: [handCards[0].id] }; // 하이카드만 하이라이트
  }
};

// 핸드 비교
export const compareHands = (playerHand, computerHand) => {
  const handRanks = {
    '로얄 플러시': 10, '스트레이트 플러시': 9, '포카드': 8, '풀하우스': 7,
    '플러시': 6, '스트레이트': 5, '트리플': 4, '투페어': 3, '원페어': 2, '하이카드': 1
  };
  
  const playerRank = handRanks[playerHand.type];
  const computerRank = handRanks[computerHand.type];
  
  if (playerRank > computerRank) return 'player';
  if (computerRank > playerRank) return 'computer';
  
  // 같은 핸드 타입일 때 키커 비교
  for (let i = 0; i < 5; i++) {
    if (playerHand.cards[i]?.value > computerHand.cards[i]?.value) return 'player';
    if (computerHand.cards[i]?.value > playerHand.cards[i]?.value) return 'computer';
  }
  
  return 'tie';
};