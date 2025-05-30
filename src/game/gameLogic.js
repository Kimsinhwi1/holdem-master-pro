// 성취 시스템 체크
export const checkAchievements = (gameResult, autoPlay, gamesPlayed, currentStreak) => {
  const newAchievements = [];
  
  // 연속 게임 성취
  if (autoPlay && gamesPlayed > 0 && gamesPlayed % 10 === 0) {
    newAchievements.push(`🤖 연속 ${gamesPlayed}게임 달성!`);
  }
  
  // 연승 성취
  if (gameResult.winner === 'player') {
    if (currentStreak + 1 === 5) newAchievements.push('🔥 5연승 달성!');
    if (currentStreak + 1 === 10) newAchievements.push('⚡ 10연승 달성!');
  }
  
  // 특별 핸드 성취
  if (gameResult.playerHand?.type === '로얄 플러시') {
    newAchievements.push('👑 로얄 플러시 달성!');
  }
  
  // 블러프 성취
  if (gameResult.playerAction === 'raise' && gameResult.preflopWinRate < 30 && gameResult.winner === 'player') {
    newAchievements.push('🎭 완벽한 블러프!');
  }
  
  // 수학적 플레이 성취
  if (gameResult.outsCount > 12 && gameResult.playerAction === 'call') {
    newAchievements.push('🧮 수학적 콜!');
  }
  
  return newAchievements;
};

// 통계 저장
export const saveStats = (stats, learningProgress, playerLevel, achievements) => {
  localStorage.setItem('pokerStats', JSON.stringify(stats));
  localStorage.setItem('learningProgress', JSON.stringify(learningProgress));
  localStorage.setItem('playerLevel', playerLevel.toString());
  localStorage.setItem('achievements', JSON.stringify(achievements));
};

// 게임 결과 생성
export const createGameResult = (gameData) => {
  const {
    playerCards,
    computerCards,
    communityCards,
    playerBestHand,
    computerBestHand,
    winner,
    pot,
    chipsWon,
    preflopWinRate,
    currentWinRate,
    endType,
    gameStage,
    drawOdds,
    learningMode
  } = gameData;

  return {
    id: Date.now(),
    playerCards: [...playerCards],
    computerCards: [...computerCards],
    communityCards: [...communityCards],
    playerHand: playerBestHand,
    computerHand: computerBestHand,
    winner: winner,
    potSize: pot,
    chipsWon: chipsWon,
    preflopWinRate: preflopWinRate,
    finalWinRate: currentWinRate,
    endType: endType,
    gameStage: gameStage,
    outsCount: drawOdds?.count || 0,
    learningMode: learningMode
  };
};