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
export const getTrainingFeedback = (action, handStrength, outs, potOdds, learningMode, playerPosition, gamePhase) => {
  let feedback = [];
  
  switch (learningMode) {
    case 'probability':
      if (outs.count > 8 && action === 'fold') {
        feedback.push('🧮 강한 드로우를 폴드했습니다. 아웃츠가 ' + outs.count + '개나 있었어요!');
      }
      if (potOdds > 0 && outs.odds > potOdds && action === 'fold') {
        feedback.push('📊 팟 오즈보다 드로우 오즈가 좋았는데 폴드했네요.');
      }
      if (gamePhase === 'preflop' && handStrength > 70) {
        feedback.push('💎 프리미엄 핸드입니다. 승률 계산을 활용하세요!');
      }
      break;
      
    case 'bluffing':
      if (handStrength < 30 && action === 'raise') {
        feedback.push('🎭 좋은 블러프 시도! 약한 핸드로 압박했습니다.');
      }
      if (handStrength > 80 && action === 'call') {
        feedback.push('🃏 강한 핸드로 콜만? 벨류 베팅을 고려해보세요.');
      }
      if (playerPosition === 'Button' && action === 'raise') {
        feedback.push('🎯 좋은 포지션에서의 압박! 블러프하기 좋은 자리입니다.');
      }
      break;
      
    case 'position':
      if (playerPosition === 'UTG' && handStrength < 60 && action === 'call') {
        feedback.push('⚠️ 얼리 포지션에서는 더 강한 핸드만 플레이하세요.');
      }
      if (playerPosition === 'Button' && action === 'fold' && handStrength > 40) {
        feedback.push('🎯 버튼에서는 더 많은 핸드를 플레이할 수 있습니다.');
      }
      if (playerPosition === 'CO' || playerPosition === 'Button') {
        feedback.push('🎪 늦은 포지션의 이점을 활용하세요!');
      }
      break;
      
    case 'reading':
      feedback.push('🧠 AI의 베팅 패턴을 관찰해보세요.');
      if (action === 'call') {
        feedback.push('👁️ 상대의 핸드 레인지를 좁혀나가고 있습니다.');
      }
      break;
      
    case 'advanced':
      if (handStrength > 60 && handStrength < 80) {
        feedback.push('⚖️ 미디엄 스트렝스 핸드 - 밸런싱이 중요합니다.');
      }
      if (gamePhase === 'turn' || gamePhase === 'river') {
        feedback.push('🎯 후반 스트릿에서는 정확한 판단이 승부를 가릅니다.');
      }
      break;
      
    case 'tournament':
      if (handStrength < 50 && action === 'call') {
        feedback.push('🏆 토너먼트에서는 생존이 우선! 마지널 핸드는 조심하세요.');
      }
      break;
      
    case 'multiway':
      if (action === 'call' && handStrength < 70) {
        feedback.push('👥 멀티웨이에서는 더 강한 핸드가 필요합니다.');
      }
      break;
  }
  
  return feedback;
};

// 모드별 교육 콘텐츠 생성
export const generateLearningTips = (learningMode, gamePhase, playerPosition) => {
  const tips = [];
  
  switch (learningMode) {
    case 'probability':
      if (gamePhase === 'preflop') {
        tips.push('💡 프리플롭 승률을 기억하세요: AA(85%), KK(82%), AK(65%)');
      } else if (gamePhase === 'flop') {
        tips.push('🧮 플롭에서 아웃츠 계산: 플러시 드로우 = 9아웃, 스트레이트 드로우 = 8아웃');
      }
      break;
      
    case 'position':
      if (playerPosition === 'UTG') {
        tips.push('🚨 UTG: 가장 불리한 포지션. 프리미엄 핸드만 플레이하세요.');
      } else if (playerPosition === 'Button') {
        tips.push('👑 버튼: 최고의 포지션! 더 많은 핸드를 플레이할 수 있습니다.');
      }
      break;
      
    case 'bluffing':
      if (gamePhase === 'river') {
        tips.push('🎭 리버에서 블러프는 신중하게. 상대가 콜할 확률을 계산하세요.');
      }
      break;
      
    case 'tournament':
      tips.push('🏆 토너먼트: 스택 크기와 블라인드 레벨을 고려한 플레이가 중요합니다.');
      break;
      
    case 'multiway':
      tips.push('👥 멀티웨이: 더 강한 핸드가 필요합니다. 드로우의 가치가 높아집니다.');
      break;
  }
  
  return tips;
};