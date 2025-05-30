import { AI_STYLES } from '../constants/gameConstants.js';

// AI 액션 결정
export const getAIAction = (handStrength, gameStage, pot, currentBet, aiPersonality, computerBet) => {
  const style = AI_STYLES[aiPersonality];
  const random = Math.random();
  
  // 프리플롭에서는 더 관대하게 플레이
  const isPreflop = gameStage === 'preflop';
  const adjustedFoldThreshold = isPreflop ? style.foldThreshold - 10 : style.foldThreshold;
  const adjustedCallRange = isPreflop ? style.callRange[0] - 10 : style.callRange[0];
  
  console.log(`AI 분석: 핸드강도=${handStrength}, 게임스테이지=${gameStage}, 현재베팅=${currentBet}, 스타일=${aiPersonality}`);
  
  // 매우 강한 핸드 (70% 이상)
  if (handStrength >= 70) {
    return random < style.aggression ? 'raise' : 'call';
  } 
  // 괜찮은 핸드 (콜 범위 내)
  else if (handStrength >= adjustedCallRange) {
    if (currentBet === 0 || currentBet === computerBet) {
      return random < style.aggression * 0.7 ? 'raise' : 'check';
    } else {
      // 베팅이 있을 때 - 프리플롭에서는 더 관대하게
      const callProbability = isPreflop ? 0.9 : 0.7;
      return random < callProbability ? 'call' : 'fold';
    }
  } 
  // 보통 핸드 (블러프 가능)
  else if (handStrength >= adjustedFoldThreshold) {
    if (currentBet === 0 || currentBet === computerBet) {
      // 베팅이 없으면 블러프하거나 체크
      return random < style.bluffFreq ? 'raise' : 'check';
    } else {
      // 베팅이 있으면 - 프리플롭에서는 더 콜하기 쉽게
      const callProbability = isPreflop ? 0.5 : 0.3;
      return random < callProbability ? 'call' : 'fold';
    }
  } 
  // 약한 핸드
  else {
    if (currentBet === 0 || currentBet === computerBet) {
      // 베팅이 없으면 가끔 블러프, 대부분 체크
      return random < style.bluffFreq * 0.5 ? 'raise' : 'check';
    } else {
      // 베팅이 있으면 - 프리플롭에서도 가끔 콜
      const callProbability = isPreflop ? 0.2 : 0.1;
      return random < callProbability ? 'call' : 'fold';
    }
  }
};

// 학습 모드별 피드백
export const getTrainingFeedback = (action, handStrength, outs, potOdds, learningMode) => {
  let feedback = [];
  
  switch (learningMode) {
    case 'math':
      if (outs.count > 8 && action === 'fold') {
        feedback.push('🧮 강한 드로우를 폴드했습니다. 아웃츠가 ' + outs.count + '개나 있었어요!');
      }
      if (potOdds > 0 && outs.odds > potOdds && action === 'fold') {
        feedback.push('📊 팟 오즈보다 드로우 오즈가 좋았는데 폴드했네요.');
      }
      break;
    case 'bluff':
      if (handStrength < 30 && action === 'raise') {
        feedback.push('🎭 좋은 블러프 시도! 약한 핸드로 압박했습니다.');
      }
      break;
    case 'position':
      feedback.push('🎯 포지션을 고려한 플레이를 연습 중입니다.');
      break;
  }
  
  return feedback;
};