// Advanced AI Decision Making System for Poker

// AI 스타일 정의
const AI_STYLES = {
  tight: { 
    vpip: 0.18, pfr: 0.14, aggression: 0.35, bluffFreq: 0.15,
    handThreshold: 70
  },
  loose: { 
    vpip: 0.45, pfr: 0.28, aggression: 0.55, bluffFreq: 0.4,
    handThreshold: 35
  },
  aggressive: { 
    vpip: 0.32, pfr: 0.25, aggression: 0.85, bluffFreq: 0.6,
    handThreshold: 50
  },
  pro: { 
    vpip: 0.25, pfr: 0.18, aggression: 0.65, bluffFreq: 0.35,
    handThreshold: 60
  },
  passive: {
    vpip: 0.30, pfr: 0.12, aggression: 0.25, bluffFreq: 0.15,
    handThreshold: 65
  },
  balanced: {
    vpip: 0.28, pfr: 0.20, aggression: 0.50, bluffFreq: 0.30,
    handThreshold: 55
  },
  headsup_folder: {
    vpip: 0.0, pfr: 0.0, aggression: 0.0, bluffFreq: 0.0,
    handThreshold: 100 // 항상 폴드
  }
};

// 핸드 강도 평가
function evaluateHandStrength(cards) {
  if (!cards || cards.length < 2) return 0;
  
  const [card1, card2] = cards.sort((a, b) => b.value - a.value);
  const isPair = card1.value === card2.value;
  const isSuited = card1.suit === card2.suit;
  const gap = card1.value - card2.value;
  
  let strength = 0;
  
  if (isPair) {
    if (card1.value >= 14) strength = 100; // AA
    else if (card1.value >= 13) strength = 95; // KK
    else if (card1.value >= 12) strength = 90; // QQ
    else if (card1.value >= 11) strength = 85; // JJ
    else if (card1.value >= 10) strength = 75; // TT
    else if (card1.value >= 9) strength = 65; // 99
    else if (card1.value >= 8) strength = 55; // 88
    else if (card1.value >= 7) strength = 45; // 77
    else strength = 35; // 낮은 페어
  } else {
    // 높은 카드 조합
    if (card1.value === 14) { // Ace
      if (card2.value >= 13) strength = isSuited ? 88 : 82; // AK
      else if (card2.value >= 12) strength = isSuited ? 78 : 70; // AQ
      else if (card2.value >= 11) strength = isSuited ? 72 : 62; // AJ
      else if (card2.value >= 10) strength = isSuited ? 65 : 55; // AT
      else if (card2.value >= 9) strength = isSuited ? 58 : 48; // A9
      else if (card2.value >= 8) strength = isSuited ? 52 : 42; // A8
      else if (card2.value >= 7) strength = isSuited ? 48 : 38; // A7
      else if (card2.value >= 6) strength = isSuited ? 45 : 35; // A6
      else if (card2.value >= 5) strength = isSuited ? 42 : 32; // A5
      else if (card2.value >= 4) strength = isSuited ? 40 : 30; // A4
      else if (card2.value >= 3) strength = isSuited ? 38 : 28; // A3
      else strength = isSuited ? 36 : 26; // A2
    } else if (card1.value === 13) { // King
      if (card2.value >= 12) strength = isSuited ? 68 : 58; // KQ
      else if (card2.value >= 11) strength = isSuited ? 60 : 48; // KJ
      else if (card2.value >= 10) strength = isSuited ? 55 : 42; // KT
      else if (card2.value >= 9) strength = isSuited ? 50 : 35; // K9
      else strength = isSuited ? 40 : 25;
    } else if (card1.value === 12) { // Queen
      if (card2.value >= 11) strength = isSuited ? 58 : 46; // QJ
      else if (card2.value >= 10) strength = isSuited ? 52 : 38; // QT
      else if (card2.value >= 9) strength = isSuited ? 48 : 32; // Q9
      else strength = isSuited ? 35 : 20;
    } else if (card1.value === 11) { // Jack
      if (card2.value >= 10) strength = isSuited ? 50 : 36; // JT
      else if (card2.value >= 9) strength = isSuited ? 45 : 30; // J9
      else strength = isSuited ? 30 : 18;
    } else if (card1.value >= 10) { // Ten or higher
      if (card2.value >= 9) strength = isSuited ? 45 : 30;
      else strength = isSuited ? 25 : 15;
    } else {
      // 낮은 카드들
      if (isSuited && gap <= 4 && card2.value >= 6) {
        strength = 35; // 스트레이트 가능성이 있는 수트카드
      } else if (isSuited && gap <= 2) {
        strength = 30; // 연결된 수트카드
      } else if (gap <= 1 && card1.value >= 8) {
        strength = 25; // 연결된 높은 카드
      } else {
        strength = 10; // 낮은 카드들
      }
    }
  }
  
  return Math.max(0, Math.min(100, strength));
}

// 포스트플롭 핸드 강도 평가
function evaluatePostflopHand(playerCards, communityCards) {
  if (!playerCards || !communityCards || playerCards.length < 2) {
    return { strength: 0, type: 'high_card' };
  }
  
  const allCards = [...playerCards, ...communityCards];
  
  // 간단한 핸드 평가 (실제로는 더 복잡한 로직이 필요)
  const suits = {};
  const ranks = {};
  
  allCards.forEach(card => {
    suits[card.suit] = (suits[card.suit] || 0) + 1;
    ranks[card.value] = (ranks[card.value] || 0) + 1;
  });
  
  const maxSuit = Math.max(...Object.values(suits));
  const maxRank = Math.max(...Object.values(ranks));
  const rankCounts = Object.values(ranks).sort((a, b) => b - a);
  
  let strength = 0;
  let type = 'high_card';
  
  // 페어 이상 체크
  if (maxRank >= 4) {
    strength = 90;
    type = 'four_of_kind';
  } else if (maxRank >= 3) {
    if (rankCounts[1] >= 2) {
      strength = 85;
      type = 'full_house';
    } else {
      strength = 70;
      type = 'three_of_kind';
    }
  } else if (maxSuit >= 5) {
    strength = 80;
    type = 'flush';
  } else if (rankCounts[0] >= 2 && rankCounts[1] >= 2) {
    strength = 60;
    type = 'two_pair';
  } else if (maxRank >= 2) {
    // 페어의 강도에 따라 구분
    const pairValue = Object.keys(ranks).find(rank => ranks[rank] === 2);
    if (pairValue >= 11) {
      strength = 55; // 높은 페어
      type = 'high_pair';
    } else if (pairValue >= 8) {
      strength = 45; // 중간 페어
      type = 'middle_pair';
    } else {
      strength = 35; // 낮은 페어
      type = 'low_pair';
    }
  } else {
    // 하이카드
    const highCard = Math.max(...allCards.map(c => c.value));
    if (highCard >= 14) strength = 25;
    else if (highCard >= 12) strength = 20;
    else if (highCard >= 10) strength = 15;
    else strength = 10;
    type = 'high_card';
  }
  
  return { strength, type };
}

// 팟 오즈 계산
function calculatePotOdds(potSize, betSize) {
  if (betSize <= 0) return 0;
  return betSize / (potSize + betSize);
}

// 고급 AI 결정 함수
export function getAdvancedAIAction(player, gameState, communityCards) {
  const style = AI_STYLES[player.aiStyle] || AI_STYLES.balanced;
  
  // 헤즈업 폴더 AI는 항상 폴드
  if (player.aiStyle === 'headsup_folder') {
    return { action: 'fold', amount: 0 };
  }
  
  const callAmount = Math.max(0, gameState.currentBet - player.currentBet);
  const potOdds = calculatePotOdds(gameState.pot, callAmount);
  const isPreflop = gameState.gamePhase === 'preflop';
  
  // 프리플롭 결정
  if (isPreflop) {
    const handStrength = evaluateHandStrength(player.cards);
    
    console.log(`🤖 ${player.name} 프리플롭 분석:`, {
      handStrength,
      threshold: style.handThreshold,
      callAmount,
      chips: player.chips
    });
    
    // 너무 약한 핸드는 폴드
    if (handStrength < style.handThreshold) {
      return { action: 'fold', amount: 0 };
    }
    
    // 매우 강한 핸드는 레이즈
    if (handStrength >= 85) {
      const raiseSize = Math.min(
        gameState.currentBet + Math.max(20, Math.floor(gameState.pot * 0.8)),
        player.chips + player.currentBet
      );
      return { action: 'raise', amount: raiseSize };
    }
    
    // 강한 핸드는 레이즈 또는 콜
    if (handStrength >= 70) {
      if (Math.random() < style.pfr) {
        const raiseSize = Math.min(
          gameState.currentBet + Math.max(20, Math.floor(gameState.pot * 0.6)),
          player.chips + player.currentBet
        );
        return { action: 'raise', amount: raiseSize };
      } else {
        if (callAmount === 0) {
          return { action: 'check', amount: 0 };
        } else if (callAmount <= player.chips) {
          return { action: 'call', amount: callAmount };
        }
      }
    }
    
    // 괜찮은 핸드는 콜
    if (handStrength >= style.handThreshold) {
      if (callAmount === 0) {
        return { action: 'check', amount: 0 };
      } else if (callAmount <= player.chips * 0.2) {
        return { action: 'call', amount: callAmount };
      }
    }
    
    return { action: 'fold', amount: 0 };
  }
  
  // 포스트플롭 결정
  const postflopHand = evaluatePostflopHand(player.cards, communityCards);
  
  console.log(`🤖 ${player.name} 포스트플롭 분석:`, {
    handStrength: postflopHand.strength,
    handType: postflopHand.type,
    callAmount,
    potOdds: (potOdds * 100).toFixed(1) + '%'
  });
  
  // 매우 강한 핸드
  if (postflopHand.strength >= 80) {
    if (callAmount === 0) {
      const betSize = Math.min(
        Math.floor(gameState.pot * 0.7),
        player.chips + player.currentBet
      );
      return { action: 'raise', amount: betSize };
    } else {
      return { action: 'call', amount: Math.min(callAmount, player.chips) };
    }
  }
  
  // 강한 핸드
  if (postflopHand.strength >= 60) {
    if (callAmount === 0) {
      if (Math.random() < 0.7) {
        const betSize = Math.min(
          Math.floor(gameState.pot * 0.5),
          player.chips + player.currentBet
        );
        return { action: 'raise', amount: betSize };
      } else {
        return { action: 'check', amount: 0 };
      }
    } else if (callAmount <= gameState.pot * 0.5) {
      return { action: 'call', amount: Math.min(callAmount, player.chips) };
    } else if (Math.random() < style.aggression * 0.5) {
      const raiseSize = Math.min(
        gameState.currentBet + Math.floor(gameState.pot * 0.6),
        player.chips + player.currentBet
      );
      return { action: 'raise', amount: raiseSize };
    }
  }
  
  // 중간 핸드
  if (postflopHand.strength >= 30) {
    if (callAmount === 0) {
      if (Math.random() < 0.3) {
        const betSize = Math.min(
          Math.floor(gameState.pot * 0.3),
          player.chips + player.currentBet
        );
        return { action: 'raise', amount: betSize };
      } else {
        return { action: 'check', amount: 0 };
      }
    } else if (callAmount <= gameState.pot * 0.3) {
      return { action: 'call', amount: Math.min(callAmount, player.chips) };
    }
  }
  
  // 약한 핸드 - 블러프 고려
  if (callAmount === 0) {
    if (Math.random() < style.bluffFreq * 0.3) {
      const betSize = Math.min(
        Math.floor(gameState.pot * 0.4),
        player.chips + player.currentBet
      );
      return { action: 'raise', amount: betSize };
    }
    return { action: 'check', amount: 0 };
  }
  
  // 기본적으로 폴드
  return { action: 'fold', amount: 0 };
}