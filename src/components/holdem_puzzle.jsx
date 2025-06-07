import React, { useState, useEffect } from 'react';
import { ArrowLeft, Puzzle, RefreshCw, Trophy, Target, Brain, Zap } from 'lucide-react';

// 🎯 홀덤 퍼즐 게임 컴포넌트 (localStorage 문제 해결)
const HoldemPuzzle = ({ onClose, onChipReward }) => {
  const [gameState, setGameState] = useState({
    myCards: [],
    communityCards: [],
    opponentCards: [],
    gameActive: true,
    result: null,
    showOpponentCards: false
  });
  
  // localStorage 대신 React state 사용
  const [stats, setStats] = useState({ 
    total: 0, 
    correct: 0, 
    streak: 0, 
    bestStreak: 0 
  });

  // 카드 관련 상수
  const SUITS = ['♠', '♥', '♦', '♣'];
  const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const RANK_VALUES = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 
    '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
  };

  // 덱 생성 및 셔플
  const createDeck = () => {
    const deck = [];
    SUITS.forEach(suit => {
      RANKS.forEach(rank => {
        deck.push({ 
          suit, 
          rank, 
          value: RANK_VALUES[rank], 
          id: `${suit}${rank}` 
        });
      });
    });
    return shuffleDeck(deck);
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
    if (!cards || cards.length < 5) {
      return { rank: 0, name: 'Incomplete', highlightedCards: [], strength: 0 };
    }
    
    const sorted = [...cards].sort((a, b) => b.value - a.value);
    const suits = {};
    const ranks = {};
    const suitCards = {};
    const rankCards = {};
    
    // 카드 분석
    sorted.forEach((card) => {
      if (!card || !card.suit || !card.value) return;
      
      suits[card.suit] = (suits[card.suit] || 0) + 1;
      ranks[card.value] = (ranks[card.value] || 0) + 1;
      
      if (!suitCards[card.suit]) suitCards[card.suit] = [];
      if (!rankCards[card.value]) rankCards[card.value] = [];
      
      suitCards[card.suit].push({card, originalIndex: cards.indexOf(card)});
      rankCards[card.value].push({card, originalIndex: cards.indexOf(card)});
    });
    
    const suitCounts = Object.values(suits);
    const rankCounts = Object.values(ranks).sort((a, b) => b - a);
    const isFlush = suitCounts.some(count => count >= 5);
    
    // 플러시 카드들 찾기
    let flushCards = [];
    if (isFlush) {
      for (let suit in suitCards) {
        if (suitCards[suit].length >= 5) {
          flushCards = suitCards[suit].slice(0, 5).map(item => item.originalIndex);
          break;
        }
      }
    }
    
    // 스트레이트 체크
    const uniqueRanks = [...new Set(sorted.map(card => card.value))].sort((a, b) => b - a);
    let isStraight = false;
    let straightCards = [];
    
    for (let i = 0; i <= uniqueRanks.length - 5; i++) {
      if (uniqueRanks[i] - uniqueRanks[i + 4] === 4) {
        isStraight = true;
        for (let j = i; j < i + 5; j++) {
          const rank = uniqueRanks[j];
          const cardIndex = cards.findIndex(card => card && card.value === rank);
          if (cardIndex !== -1) straightCards.push(cardIndex);
        }
        break;
      }
    }
    
    // A-2-3-4-5 스트레이트 (휠)
    if (!isStraight && uniqueRanks.includes(14) && uniqueRanks.includes(2) && 
        uniqueRanks.includes(3) && uniqueRanks.includes(4) && uniqueRanks.includes(5)) {
      isStraight = true;
      straightCards = [];
      [14, 5, 4, 3, 2].forEach(rank => {
        const cardIndex = cards.findIndex(card => card && card.value === rank);
        if (cardIndex !== -1) straightCards.push(cardIndex);
      });
    }
    
    // 같은 랭크 카드들 찾기
    let pairCards = [];
    let tripCards = [];
    let quadCards = [];
    
    for (let rank in rankCards) {
      const count = rankCards[rank].length;
      const indices = rankCards[rank].map(item => item.originalIndex);
      
      if (count === 4) {
        quadCards = indices;
      } else if (count === 3) {
        tripCards = indices;
      } else if (count === 2) {
        pairCards.push(...indices);
      }
    }
    
    // 핸드 랭킹 결정
    let highlightedCards = [];
    
    if (isStraight && isFlush) {
      highlightedCards = flushCards.filter(index => straightCards.includes(index));
      if (uniqueRanks[0] === 14 && uniqueRanks[1] === 13) {
        return {rank: 10, name: '로열 플러시', highlightedCards, strength: 100};
      }
      return {rank: 9, name: '스트레이트 플러시', highlightedCards, strength: 95};
    }
    
    if (rankCounts[0] === 4) {
      highlightedCards = quadCards;
      return {rank: 8, name: '포카드', highlightedCards, strength: 90};
    }
    
    if (rankCounts[0] === 3 && rankCounts[1] === 2) {
      highlightedCards = [...tripCards, ...pairCards.slice(0, 2)];
      return {rank: 7, name: '풀하우스', highlightedCards, strength: 85};
    }
    
    if (isFlush) {
      highlightedCards = flushCards;
      return {rank: 6, name: '플러시', highlightedCards, strength: 80};
    }
    
    if (isStraight) {
      highlightedCards = straightCards;
      return {rank: 5, name: '스트레이트', highlightedCards, strength: 75};
    }
    
    if (rankCounts[0] === 3) {
      highlightedCards = tripCards;
      return {rank: 4, name: '트리플', highlightedCards, strength: 60};
    }
    
    if (rankCounts[0] === 2 && rankCounts[1] === 2) {
      highlightedCards = pairCards;
      return {rank: 3, name: '투페어', highlightedCards, strength: 45};
    }
    
    if (rankCounts[0] === 2) {
      highlightedCards = pairCards.slice(0, 2);
      return {rank: 2, name: '원페어', highlightedCards, strength: 25};
    }
    
    highlightedCards = [0]; // 하이카드는 가장 높은 카드만
    return {rank: 1, name: '하이카드', highlightedCards, strength: 10};
  };

  // 핸드 비교
  const compareHands = (myCards, opponentCards, communityCards) => {
    if (!myCards || !opponentCards || !communityCards) return 0;
    
    const myAllCards = [...myCards, ...communityCards];
    const opponentAllCards = [...opponentCards, ...communityCards];
    
    const myHand = evaluateHand(myAllCards);
    const opponentHand = evaluateHand(opponentAllCards);
    
    if (myHand.rank > opponentHand.rank) return 1;
    if (myHand.rank < opponentHand.rank) return -1;
    return 0;
  };

  // 카드 렌더링
  const renderCard = (card, isHidden = false, isHighlighted = false) => {
    if (!card && !isHidden) {
      return (
        <div className="w-16 h-24 border-2 border-dashed border-gray-400 rounded-lg bg-gray-100"></div>
      );
    }
    
    if (isHidden) {
      return (
        <div className="w-16 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg border-2 border-blue-400 flex items-center justify-center text-white text-2xl font-bold shadow-lg transform transition-all duration-300 hover:scale-105">
          ?
        </div>
      );
    }
    
    const isRed = card?.suit === '♥' || card?.suit === '♦';
    
    return (
      <div className={`w-16 h-24 bg-white rounded-lg border-2 flex flex-col items-center justify-center font-bold shadow-lg transform transition-all duration-300 hover:scale-105 ${
        isHighlighted 
          ? 'border-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-yellow-400/50 scale-110 z-10' 
          : 'border-gray-300'
      }`}>
        <div className={`text-lg ${isRed ? 'text-red-600' : 'text-black'}`}>
          {card?.rank || '?'}
        </div>
        <div className={`text-xl ${isRed ? 'text-red-600' : 'text-black'}`}>
          {card?.suit || '?'}
        </div>
      </div>
    );
  };

  // 새 게임 시작
  const startNewGame = () => {
    try {
      const deck = createDeck();
      if (deck.length >= 9) {
        setGameState({
          myCards: [deck[0], deck[1]],
          communityCards: [deck[2], deck[3], deck[4], deck[5], deck[6]],
          opponentCards: [deck[7], deck[8]],
          gameActive: true,
          result: null,
          showOpponentCards: false
        });
      }
    } catch (error) {
      console.error('게임 시작 중 오류:', error);
    }
  };

  // 결정 처리
  const makeDecision = (decision) => {
    if (!gameState.gameActive) return;
    
    try {
      const handResult = compareHands(
        gameState.myCards, 
        gameState.opponentCards, 
        gameState.communityCards
      );
      
      let isCorrect = false;
      let resultText = '';
      let resultClass = '';
      
      if (handResult > 0) {
        isCorrect = (decision === 'allin');
        resultText = isCorrect ? 
          '🎉 정답! 당신이 이겼고 올인이 정답이었습니다!' : 
          '❌ 아쉽네요. 당신이 이겼는데 폴드하셨네요.';
        resultClass = isCorrect ? 'win' : 'lose';
      } else if (handResult < 0) {
        isCorrect = (decision === 'fold');
        resultText = isCorrect ? 
          '🎉 정답! 당신이 졌지만 폴드로 손실을 줄였습니다!' : 
          '❌ 아쉽네요. 당신이 졌는데 올인하셨네요.';
        resultClass = isCorrect ? 'win' : 'lose';
      } else {
        isCorrect = true;
        resultText = '🤝 무승부! 어떤 선택이든 정답이었습니다.';
        resultClass = 'win';
      }
      
      // 통계 업데이트 (메모리에만 저장)
      const newStats = {
        total: stats.total + 1,
        correct: stats.correct + (isCorrect ? 1 : 0),
        streak: isCorrect ? stats.streak + 1 : 0,
        bestStreak: Math.max(stats.bestStreak, isCorrect ? stats.streak + 1 : stats.streak)
      };
      
      setStats(newStats);
      
      // 보상 계산
      let reward = 0;
      if (isCorrect) {
        reward = 500; // 기본 보상
        if (newStats.streak >= 5) reward += 1000; // 5연속 보너스
        if (newStats.streak >= 10) reward += 2000; // 10연속 보너스
        
        // 부모 컴포넌트에 보상 전달
        if (onChipReward && typeof onChipReward === 'function') {
          onChipReward(reward);
        }
      }
      
      // 핸드 분석
      const myHand = evaluateHand([...gameState.myCards, ...gameState.communityCards]);
      const opponentHand = evaluateHand([...gameState.opponentCards, ...gameState.communityCards]);
      
      setGameState(prev => ({
        ...prev,
        gameActive: false,
        showOpponentCards: true,
        result: {
          isCorrect,
          text: resultText,
          class: resultClass,
          myHand,
          opponentHand,
          reward
        }
      }));
    } catch (error) {
      console.error('결정 처리 중 오류:', error);
    }
  };

  // 컴포넌트 마운트 시 게임 시작
  useEffect(() => {
    startNewGame();
  }, []);

  // 닫기 버튼 핸들러
  const handleClose = () => {
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto">
        
        {/* 헤더 */}
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 mb-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={handleClose}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                돌아가기
              </button>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Puzzle className="w-8 h-8 text-purple-400" />
                홀덤 퍼즐 마스터
              </h1>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-yellow-400">올인 vs 폴드</div>
              <div className="text-sm opacity-80">당신의 판단력을 테스트하세요!</div>
            </div>
          </div>
        </div>

        {/* 통계 대시보드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
            <div className="text-sm text-white opacity-80">총 게임</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-green-400">
              {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
            </div>
            <div className="text-sm text-white opacity-80">정답률</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-yellow-400">{stats.streak}</div>
            <div className="text-sm text-white opacity-80">연속 정답</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-purple-400">{stats.bestStreak}</div>
            <div className="text-sm text-white opacity-80">최고 연속</div>
          </div>
        </div>

        {/* 게임 보드 */}
        <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-2xl p-8 shadow-2xl border-4 border-yellow-600/30">
          
          {/* 내 카드 */}
          <div className="text-center mb-8">
            <h3 className="text-white text-xl font-bold mb-4 flex items-center justify-center gap-2">
              🎯 내 카드
            </h3>
            <div className="flex justify-center gap-4">
              {gameState.myCards.map((card, idx) => {
                const myHand = evaluateHand([...gameState.myCards, ...gameState.communityCards]);
                const isHighlighted = myHand.highlightedCards && myHand.highlightedCards.includes(idx);
                return (
                  <div key={`my-card-${idx}`}>
                    {renderCard(card, false, isHighlighted)}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 커뮤니티 카드 */}
          <div className="text-center mb-8">
            <h3 className="text-white text-xl font-bold mb-4 flex items-center justify-center gap-2">
              🃏 커뮤니티 카드
            </h3>
            <div className="flex justify-center gap-3">
              {gameState.communityCards.map((card, idx) => {
                const myHand = evaluateHand([...gameState.myCards, ...gameState.communityCards]);
                const cardIndex = idx + 2; // 내 카드 2장 다음 인덱스
                const isHighlighted = myHand.highlightedCards && myHand.highlightedCards.includes(cardIndex);
                return (
                  <div key={`community-card-${idx}`}>
                    {renderCard(card, false, isHighlighted)}
                  </div>
                );
              })}
            </div>
            
            {/* 내 핸드 강도 표시 */}
            {gameState.myCards.length > 0 && gameState.communityCards.length > 0 && (
              <div className="mt-4">
                <div className="bg-black/30 rounded-lg p-3 inline-block">
                  <div className="text-yellow-400 font-bold text-lg">
                    🎯 {evaluateHand([...gameState.myCards, ...gameState.communityCards]).name}
                  </div>
                  <div className="w-48 bg-gray-600 rounded-full h-3 mt-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${evaluateHand([...gameState.myCards, ...gameState.communityCards]).strength}%` 
                      }}
                    ></div>
                  </div>
                  <div className="text-white text-sm mt-1">
                    강도: {evaluateHand([...gameState.myCards, ...gameState.communityCards]).strength}%
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 상대방 카드 */}
          <div className="text-center mb-8">
            <h3 className="text-white text-xl font-bold mb-4 flex items-center justify-center gap-2">
              🤖 상대방 카드
            </h3>
            <div className="flex justify-center gap-4">
              {gameState.showOpponentCards ? (
                gameState.opponentCards.map((card, idx) => {
                  const opponentHand = evaluateHand([...gameState.opponentCards, ...gameState.communityCards]);
                  const isHighlighted = opponentHand.highlightedCards && opponentHand.highlightedCards.includes(idx);
                  return (
                    <div key={`opponent-card-${idx}`}>
                      {renderCard(card, false, isHighlighted)}
                    </div>
                  );
                })
              ) : (
                gameState.opponentCards.map((_, idx) => (
                  <div key={`opponent-hidden-${idx}`}>
                    {renderCard(null, true, false)}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 액션 버튼 */}
          {gameState.gameActive && (
            <div className="flex justify-center gap-8 mb-6">
              <button
                onClick={() => makeDecision('fold')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-xl font-bold text-xl transition-all duration-200 transform hover:scale-105 shadow-xl flex items-center gap-3"
              >
                🛡️ 폴드
              </button>
              <button
                onClick={() => makeDecision('allin')}
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-xl font-bold text-xl transition-all duration-200 transform hover:scale-105 shadow-xl flex items-center gap-3"
              >
                🔥 올인
              </button>
            </div>
          )}

          {/* 결과 표시 */}
          {gameState.result && (
            <div className="text-center">
              <div className={`inline-block p-6 rounded-xl mb-6 text-xl font-bold shadow-xl ${
                gameState.result.class === 'win' 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                  : 'bg-gradient-to-r from-red-600 to-rose-600'
              } text-white`}>
                {gameState.result.text}
                {gameState.result.reward > 0 && (
                  <div className="text-yellow-300 text-lg mt-2">
                    💰 +{gameState.result.reward.toLocaleString()} 칩 획득!
                  </div>
                )}
              </div>
              
              <div className="bg-black/40 rounded-xl p-6 mb-6 backdrop-blur-sm">
                <h4 className="text-white text-lg font-bold mb-4">🔍 핸드 분석</h4>
                <div className="grid md:grid-cols-2 gap-6 text-white">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h5 className="font-bold mb-3 text-blue-300">내 핸드</h5>
                    <div className="text-yellow-400 text-lg font-bold">
                      {gameState.result.myHand?.name || '알 수 없음'}
                    </div>
                    <div className="text-sm opacity-80">
                      강도: {gameState.result.myHand?.strength || 0}%
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h5 className="font-bold mb-3 text-red-300">상대 핸드</h5>
                    <div className="text-yellow-400 text-lg font-bold">
                      {gameState.result.opponentHand?.name || '알 수 없음'}
                    </div>
                    <div className="text-sm opacity-80">
                      강도: {gameState.result.opponentHand?.strength || 0}%
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={startNewGame}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-xl flex items-center gap-3 mx-auto"
              >
                <RefreshCw className="w-5 h-5" />
                다음 퍼즐
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HoldemPuzzle;