// 🔧 개선된 다음 액션 처리 (실제 포커 룰 적용)
  const processNextAction = (currentGameState) => {
    console.log('🔄 다음 액션 처리 시작');

    const activePlayers = currentGameState.players.filter(p => !p.folded);
    
    // 🏆 게임 종료 조건: 한 명만 남음
    if (activePlayers.length === 1) {
      console.log('🏆 한 명만 남음, 게임 종료');
      endHand(currentGameState, activePlayers[0]);
      return;
    }

    // 🎯 액션 가능한 플레이어 (올인하지 않고 칩이 있는 플레이어)
    const playersCanAct = activePlayers.filter(p => !p.allIn && p.chips > 0);
    
    // 액션할 수 있는 플레이어가 1명 이하면 쇼다운으로
    if (playersCanAct.length <= 1) {
      console.log('✅ 액션 가능한 플레이어가 1명 이하 - 쇼다운으로');
      showdown(currentGameState);
      return;
    }

    // 현재 최대 베팅 금액
    const maxBet = Math.max(...currentGameState.players.map(p => p.folded ? 0 : p.currentBet));
    
    // 🚨 핵심: 베팅 라운드 완료 조건 (실제 포커 룰)
    // 1. 모든 액션 가능한 플레이어가 같은 금액을 베팅했거나
    // 2. 모든 플레이어가 이번 라운드에서 액션을 완료했어야 함
    
    const isPreflop = currentGameState.gamePhase === 'preflop';
    
    // 베팅 차이가 있는 플레이어들 (콜이 필요한 플레이어들)
    const playersNeedingCall = playersCanAct.filter(p => p.currentBet < maxBet);
    
    // 이번 라운드에서 아직 액션하지 않은 플레이어들
    let playersNeedingFirstAction = [];
    
    if (isPreflop) {
      // 프리플롭: 블라인드 제외하고 액션이 필요한 플레이어
      playersNeedingFirstAction = playersCanAct.filter(p => {
        // 블라인드는 이미 액션한 것으로 간주
        if (p.lastAction === 'blind') return false;
        // 아직 액션하지 않은 플레이어
        return !p.lastAction || p.lastAction === null;
      });
    } else {
      // 포스트플롭: 모든 플레이어가 이번 라운드에서 액션해야 함
      playersNeedingFirstAction = playersCanAct.filter(p => 
        !p.lastAction || p.lastAction === null
      );
    }

    // 🔍 베팅 라운드 완료 조건 체크
    const hasBettingDifferences = playersNeedingCall.length > 0;
    const hasPlayersNeedingAction = playersNeedingFirstAction.length > 0;
    
    console.log('📊 베팅 상황 분석:', {
      gamePhase: currentGameState.gamePhase,
      activePlayers: activePlayers.length,
      playersCanAct: playersCanAct.length,
      maxBet,
      hasBettingDifferences,
      hasPlayersNeedingAction,
      playersNeedingCall: playersNeedingCall.map(p => p.name),
      playersNeedingFirstAction: playersNeedingFirstAction.map(p => p.name),
      playerStatus: currentGameState.players.map(p => ({ 
        name: p.name, 
        bet: p.currentBet, 
        lastAction: p.lastAction,
        folded: p.folded, 
        allIn: p.allIn,
        chips: p.chips
      }))
    });

    // ✅ 베팅 라운드 완료 조건: 베팅 차이도 없고 액션이 필요한 플레이어도 없음
    if (!hasBettingDifferences && !hasPlayersNeedingAction) {
      console.log('✅ 베팅 라운드 완료, 다음 단계로');
      moveToNextPhase(currentGameState);
      return;
    }

    // 🎯 다음 액션할 플레이어 찾기
    let nextPlayerIndex = (currentGameState.activePlayer + 1) % currentGameState.players.length;
    let attempts = 0;
    
    // 액션이 필요한 플레이어 찾기 (최대 4번 순회)
    while (attempts < 4) {
      const nextPlayer = currentGameState.players[nextPlayerIndex];
      
      console.log(`🔍 플레이어 ${nextPlayerIndex} (${nextPlayer.name}) 체크:`, {
        folded: nextPlayer.folded,
        allIn: nextPlayer.allIn,
        currentBet: nextPlayer.currentBet,
        maxBet: maxBet,
        chips: nextPlayer.chips,
        lastAction: nextPlayer.lastAction,
        needsCall: nextPlayer.currentBet < maxBet,
        needsFirstAction: playersNeedingFirstAction.includes(nextPlayer)
      });
      
      // 이 플레이어가 액션할 수 있는지 확인
      if (!nextPlayer.folded && !nextPlayer.allIn && nextPlayer.chips > 0) {
        // 베팅 차이가 있거나 아직 액션하지 않은 경우
        if (nextPlayer.currentBet < maxBet || playersNeedingFirstAction.includes(nextPlayer)) {
          console.log(`✅ ${nextPlayer.name}이 다음 액션`);
          
          const newGameState = { ...currentGameState, activePlayer: nextPlayerIndex };
          setGameState(newGameState);

          if (!nextPlayer.isHuman) {
            setTimeout(() => {
              const gameSnapshot = { ...newGameState };
              processAIAction(gameSnapshot);
            }, 1500);
          } else {
            console.log('👤 인간 플레이어 차례, 액션 대기');
            setIsProcessingAction(false);
          }
          return;
        }
      }
      
      nextPlayerIndex = (nextPlayerIndex + 1) % currentGameState.players.length;
      attempts++;
    }

    // ⚠️ 액션할 플레이어가 없으면 다음 단계로 (안전장치)
    console.log('⚠️ 액션할 플레이어를 찾을 수 없음, 다음 단계로 강제 이동');
    moveToNextPhase(currentGameState);
  };