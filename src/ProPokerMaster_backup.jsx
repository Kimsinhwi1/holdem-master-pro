import React, { useState, useEffect } from 'react';
import { Shuffle, RefreshCw, HelpCircle, BarChart3, Book, History, TrendingUp, User, Bot, Coins, Play, Gift, Zap, GraduationCap, Target, Brain, Trophy, Crown, Star, Edit, AlertTriangle, CheckCircle, Award, Lightbulb, MessageSquare, Settings, Calculator, Eye, Shield, Flame, Clock, Gamepad2, Medal, ChevronUp, ChevronDown, Activity, PieChart, LineChart } from 'lucide-react';

const ProPokerMaster = () => {
  // 에러 상태 추가
  const [error, setError] = useState(null);
  
  const suits = ['♠', '♥', '♦', '♣'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  
  // 에러 핸들링 함수
  const handleError = (error, context) => {
    console.error(`Error in ${context}:`, error);
    setError(`${context}에서 오류가 발생했습니다: ${error.message}`);
  };

  // 🗄️ 데이터 저장 시스템
  const STORAGE_KEY = 'poker-master-pro-data';
  
  // 플레이어 데이터 저장
  const savePlayerData = (nickname, data) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      existingData[nickname] = {
        ...data,
        lastPlayed: new Date().toISOString(),
        version: '1.0'
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
      console.log(`데이터 저장됨: ${nickname}`);
    } catch (error) {
      console.error('데이터 저장 실패:', error);
    }
  };
  
  // 플레이어 데이터 로드
  const loadPlayerData = (nickname) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return existingData[nickname] || null;
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      return null;
    }
  };
  
  // 모든 플레이어 목록 가져오기
  const getAllPlayers = () => {
    try {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return Object.keys(existingData).map(nickname => ({
        nickname,
        ...existingData[nickname]
      })).sort((a, b) => new Date(b.lastPlayed) - new Date(a.lastPlayed));
    } catch (error) {
      console.error('플레이어 목록 로드 실패:', error);
      return [];
    }
  };
  
  // 데이터 삭제
  const deletePlayerData = (nickname) => {
    try {
      const existingData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      delete existingData[nickname];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
    } catch (error) {
      console.error('데이터 삭제 실패:', error);
    }
  };
  
  const [deck, setDeck] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);
  const [gameStage, setGameStage] = useState('preflop');
  const [playerBestHand, setPlayerBestHand] = useState(null);
  const [computerBestHand, setComputerBestHand] = useState(null);
  const [winner, setWinner] = useState(null);
  
  // 🎯 고급 분석 시스템
  const [currentOuts, setCurrentOuts] = useState([]);
  const [drawOdds, setDrawOdds] = useState({});
  const [handStrength, setHandStrength] = useState(0);
  const [highlightedCards, setHighlightedCards] = useState([]);
  const [potOdds, setPotOdds] = useState(0);
  const [impliedOdds, setImpliedOdds] = useState(0);
  
  // 학습 모드 시스템
  const [learningMode, setLearningMode] = useState('normal'); // normal, training, bluff, position, sizing
  const [currentLesson, setCurrentLesson] = useState(null);
  const [skillLevel, setSkillLevel] = useState('beginner'); // beginner, intermediate, advanced, pro
  const [aiPersonality, setAiPersonality] = useState('balanced'); // tight, loose, aggressive, passive, balanced, pro
  
  // 프로그레시브 시스템
  const [playerLevel, setPlayerLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  
  // UI 상태
  const [showAdvancedStats, setShowAdvancedStats] = useState(false);
  const [showOutsCalculator, setShowOutsCalculator] = useState(false);
  const [showRangeAnalyzer, setShowRangeAnalyzer] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showPlayerSelector, setShowPlayerSelector] = useState(false);
  const [showCreatePlayer, setShowCreatePlayer] = useState(false);
  
  // 💰 광고 및 수익화 시스템
  const [showAdModal, setShowAdModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [dailyChipsUsed, setDailyChipsUsed] = useState(false);
  const [lastAdTime, setLastAdTime] = useState(0);
  
  // 자동 진행 시스템
  const [autoPlay, setAutoPlay] = useState(false);
  const [nextGameTimer, setNextGameTimer] = useState(null);
  const [timeToNextGame, setTimeToNextGame] = useState(0);
  
  // 기존 상태들
  const [showHelp, setShowHelp] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  const [preflopWinRate, setPreflopWinRate] = useState(null);
  const [currentWinRate, setCurrentWinRate] = useState(null);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  
  // 학습 시스템
  const [learningProgress, setLearningProgress] = useState({
    handsPlayed: 0,
    goodDecisions: 0,
    badDecisions: 0,
    totalAnalyzed: 0,
    skillPoints: {
      preflop: 0,
      postflop: 0,
      bluffing: 0,
      reading: 0,
      math: 0
    }
  });
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  
  // 베팅 시스템
  const [playerChips, setPlayerChips] = useState(5000);
  const [computerChips, setComputerChips] = useState(100000);
  const [pot, setPot] = useState(0);
  const [currentBet, setCurrentBet] = useState(0);
  const [playerBet, setPlayerBet] = useState(0);
  const [computerBet, setComputerBet] = useState(0);
  const [customBetAmount, setCustomBetAmount] = useState(0);
  const [showBetSlider, setShowBetSlider] = useState(false);
  const [canBet, setCanBet] = useState(true);
  const [blinds] = useState({ small: 50, big: 100 });
  const [aiThinking, setAiThinking] = useState('');
  
  // 플레이어 정보
  const [playerNickname, setPlayerNickname] = useState('');
  const [tempNickname, setTempNickname] = useState('');
  const [totalChipsWon, setTotalChipsWon] = useState(0);
  const [maxChipsWon, setMaxChipsWon] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [lastWinAmount, setLastWinAmount] = useState(0);
  const [gameStartChips, setGameStartChips] = useState(0); // 게임 시작 시 플레이어 칩
  
  // 🎯 프로급 프리플롭 핸드 레인지
  const preflopRanges = {
    premium: ['AA', 'KK', 'QQ', 'JJ', 'AKs', 'AKo'],
    strong: ['TT', '99', 'AQs', 'AQo', 'AJs', 'KQs', 'KQo'],
    playable: ['88', '77', '66', 'ATs', 'A9s', 'KJs', 'KTs', 'QJs', 'QTs', 'JTs'],
    marginal: ['55', '44', '33', '22', 'A8s', 'A7s', 'A6s', 'A5s', 'K9s', 'Q9s', 'J9s', 'T9s', '98s', '87s', '76s', '65s'],
    trash: [] // 나머지 모든 핸드
  };
  
  // 🎯 아웃츠 계산 시스템
  const calculateOuts = (playerCards, communityCards) => {
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
  
  // 🎯 핸드 스트렝스 계산
  const calculateHandStrength = (playerCards, communityCards) => {
    try {
      if (!playerCards || !Array.isArray(playerCards) || playerCards.length === 0) return 0;
      if (!Array.isArray(communityCards)) return 0;
      
      if (communityCards.length === 0) {
        return getPreflopStrength(playerCards);
      }
      
      const allCards = [...playerCards, ...communityCards];
      const bestHand = findBestHand(allCards);
      const handTypeStrength = getHandTypeStrength(bestHand.type);
      
      // 키커와 핸드 내 카드 강도 고려
      const kickerStrength = bestHand.cards.reduce((sum, card) => sum + card.value, 0) / bestHand.cards.length;
      
      return Math.min(100, handTypeStrength + (kickerStrength / 14) * 10);
    } catch (error) {
      handleError(error, 'calculateHandStrength');
      return 0;
    }
  };
  
  const getPreflopStrength = (cards) => {
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
  
  const getHandTypeStrength = (handType) => {
    const strengths = {
      '로얄 플러시': 100, '스트레이트 플러시': 95, '포카드': 90, '풀하우스': 85,
      '플러시': 75, '스트레이트': 65, '트리플': 55, '투페어': 45, '원페어': 35, '하이카드': 25
    };
    return strengths[handType] || 25;
  };
  
  // 🎯 AI 플레이어 스타일 시스템
  const getAIAction = (handStrength, gameStage, pot, currentBet) => {
    const styles = {
      tight: { aggression: 0.3, bluffFreq: 0.1, callRange: [35, 100], foldThreshold: 25 },
      loose: { aggression: 0.7, bluffFreq: 0.3, callRange: [20, 100], foldThreshold: 15 },
      aggressive: { aggression: 0.8, bluffFreq: 0.4, callRange: [25, 100], foldThreshold: 20 },
      passive: { aggression: 0.2, bluffFreq: 0.05, callRange: [45, 100], foldThreshold: 35 },
      balanced: { aggression: 0.5, bluffFreq: 0.2, callRange: [30, 100], foldThreshold: 25 },
      pro: { aggression: 0.6, bluffFreq: 0.25, callRange: [32, 100], foldThreshold: 27 }
    };
    
    const style = styles[aiPersonality];
    const random = Math.random();
    
    // 플레이어가 올인했는지 확인
    const isPlayerAllIn = playerChips === 0 && playerBet > 0;
    
    // 프리플롭에서는 더 관대하게 플레이
    const isPreflop = gameStage === 'preflop';
    const adjustedFoldThreshold = isPreflop ? style.foldThreshold - 10 : style.foldThreshold;
    const adjustedCallRange = isPreflop ? style.callRange[0] - 10 : style.callRange[0];
    
    console.log(`AI 분석: 핸드강도=${handStrength}, 게임스테이지=${gameStage}, 현재베팅=${currentBet}, AI베팅=${computerBet}, 스타일=${aiPersonality}, 플레이어올인=${isPlayerAllIn}`);
    
    // 플레이어가 올인한 경우 체크 불가능
    if (isPlayerAllIn && currentBet !== computerBet) {
      // 강한 핸드면 콜, 약한 핸드면 폴드
      if (handStrength >= adjustedCallRange * 0.8) {
        return 'call';
      } else {
        return 'fold';
      }
    }
    
    // 매우 강한 핸드 (70% 이상)
    if (handStrength >= 70) {
      if (currentBet === 0) {
        // 베팅이 없으면 거의 항상 레이즈
        return random < 0.9 ? 'raise' : 'check';
      } else if (currentBet > computerBet) {
        // 플레이어가 베팅한 경우 - 레이즈 또는 콜
        return random < style.aggression ? 'raise' : 'call';
      } else {
        // AI가 이미 매치한 경우 - 체크
        return 'check';
      }
    } 
    // 괜찮은 핸드 (콜 범위 내)
    else if (handStrength >= adjustedCallRange) {
      if (currentBet === 0) {
        // 베팅이 없으면 가끔 레이즈, 대부분 체크
        return random < style.aggression * 0.7 ? 'raise' : 'check';
      } else if (currentBet > computerBet) {
        // 플레이어가 베팅/레이즈한 경우 - 콜 또는 폴드만 가능
        const callProbability = isPreflop ? 0.9 : 0.7;
        return random < callProbability ? 'call' : 'fold';
      } else {
        // AI가 이미 매치한 경우 - 체크 가능
        return 'check';
      }
    } 
    // 보통 핸드 (블러프 가능)
    else if (handStrength >= adjustedFoldThreshold) {
      if (currentBet === 0) {
        // 베팅이 없으면 블러프하거나 체크
        return random < style.bluffFreq ? 'raise' : 'check';
      } else if (currentBet > computerBet) {
        // 플레이어가 베팅한 경우 - 가끔 콜, 대부분 폴드
        const callProbability = isPreflop ? 0.5 : 0.3;
        return random < callProbability ? 'call' : 'fold';
      } else {
        // AI가 이미 매치한 경우 - 체크
        return 'check';
      }
    } 
    // 약한 핸드
    else {
      if (currentBet === 0) {
        // 베팅이 없으면 가끔 블러프, 대부분 체크
        return random < style.bluffFreq * 0.5 ? 'raise' : 'check';
      } else if (currentBet > computerBet) {
        // 플레이어가 베팅한 경우 - 거의 항상 폴드
        const callProbability = isPreflop ? 0.2 : 0.1;
        return random < callProbability ? 'call' : 'fold';
      } else {
        // AI가 이미 매치한 경우 - 체크
        return 'check';
      }
    }
  };
  
  // 🎯 학습 모드별 특별 기능
  const getTrainingFeedback = (action, handStrength, outs, potOdds) => {
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
  
  // 🎯 자동 게임 진행 시스템
  const startAutoPlay = () => {
    setAutoPlay(true);
    if (winner || gameStage === 'preflop') {
      startNewGame();
    }
  };
  
  const stopAutoPlay = () => {
    setAutoPlay(false);
    if (nextGameTimer) {
      clearTimeout(nextGameTimer);
      setNextGameTimer(null);
    }
    setTimeToNextGame(0);
  };

  // 🎮 플레이어 관리 시스템
  const loadPlayer = (nickname) => {
    const playerData = loadPlayerData(nickname);
    if (playerData) {
      // 저장된 데이터 로드
      setPlayerNickname(nickname);
      setPlayerChips(playerData.playerChips || 5000);
      setGamesPlayed(playerData.gamesPlayed || 0);
      setGamesWon(playerData.gamesWon || 0);
      setTotalChipsWon(playerData.totalChipsWon || 0);
      setMaxChipsWon(playerData.maxChipsWon || 0);
      setCurrentStreak(playerData.currentStreak || 0);
      setMaxStreak(playerData.maxStreak || 0);
      setPlayerLevel(playerData.playerLevel || 1);
      setExperience(playerData.experience || 0);
      setAchievements(playerData.achievements || []);
      setLearningProgress(playerData.learningProgress || {
        handsPlayed: 0,
        goodDecisions: 0,
        badDecisions: 0,
        totalAnalyzed: 0,
        skillPoints: {
          preflop: 0,
          postflop: 0,
          bluffing: 0,
          reading: 0,
          math: 0
        }
      });
      setGameHistory(playerData.gameHistory || []);
      setLeaderboard(playerData.leaderboard || []);
      setSkillLevel(playerData.skillLevel || 'beginner');
      setAiPersonality(playerData.aiPersonality || 'balanced');
      setLearningMode(playerData.learningMode || 'normal');
      setIsPremium(playerData.isPremium || false);
      setDailyChipsUsed(playerData.dailyChipsUsed || false);
      setLastAdTime(playerData.lastAdTime || 0);
      
      console.log(`플레이어 ${nickname} 데이터 로드 완료`);
      setShowPlayerSelector(false);
      setShowNicknameModal(false);
    }
  };

  const createNewPlayer = (nickname) => {
    if (!nickname.trim()) return;
    
    // 기본 데이터로 새 플레이어 생성
    const newPlayerData = {
      playerChips: 5000,
      gamesPlayed: 0,
      gamesWon: 0,
      totalChipsWon: 0,
      maxChipsWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      playerLevel: 1,
      experience: 0,
      achievements: [],
      learningProgress: {
        handsPlayed: 0,
        goodDecisions: 0,
        badDecisions: 0,
        totalAnalyzed: 0,
        skillPoints: {
          preflop: 0,
          postflop: 0,
          bluffing: 0,
          reading: 0,
          math: 0
        }
      },
      gameHistory: [],
      leaderboard: [],
      skillLevel: 'beginner',
      aiPersonality: 'balanced',
      learningMode: 'normal',
      isPremium: false,
      dailyChipsUsed: false,
      lastAdTime: 0
    };
    
    savePlayerData(nickname, newPlayerData);
    loadPlayer(nickname);
  };

  // 게임 데이터 자동 저장
  const saveCurrentGameData = () => {
    if (playerNickname) {
      const currentData = {
        playerChips,
        gamesPlayed,
        gamesWon,
        totalChipsWon,
        maxChipsWon,
        currentStreak,
        maxStreak,
        playerLevel,
        experience,
        achievements,
        learningProgress,
        gameHistory,
        leaderboard,
        skillLevel,
        aiPersonality,
        learningMode,
        isPremium,
        dailyChipsUsed,
        lastAdTime
      };
      savePlayerData(playerNickname, currentData);
    }
  };

  // 설정 변경 시 자동 저장
  useEffect(() => {
    if (playerNickname) {
      saveCurrentGameData();
    }
  }, [aiPersonality, learningMode, skillLevel]);

  // 💰 광고 및 수익화 시스템
  const watchAd = () => {
    const now = Date.now();
    if (now - lastAdTime < 30000) {
      alert('광고는 30초마다 볼 수 있습니다.');
      return;
    }
    
    setLastAdTime(now);
    
    /* 
    🔥 여기에 실제 광고 코드를 삽입하세요!
    예시 (Google AdSense):
    
    if (window.adsbygoogle) {
      const adBreak = window.adsbygoogle.adBreak;
      adBreak({
        type: 'reward',
        name: 'chip-reward',
        afterAd: () => {
          setPlayerChips(prev => prev + 800);
          setShowAdModal(false);
          alert('800 칩을 획득했습니다! 🎉');
        }
      });
    }
    */
    
    // 임시 시뮬레이션 (실제 배포시 삭제)
    setTimeout(() => {
      setPlayerChips(prev => prev + 800);
      setShowAdModal(false);
      saveCurrentGameData(); // 즉시 저장
      alert('800 칩을 획득했습니다! 🎉');
    }, 3000);
  };

  const claimDailyChips = () => {
    if (!dailyChipsUsed) {
      /* 
      🔥 여기에 일일 보너스 광고 코드를 삽입하세요!
      예시 (Unity Ads):
      
      if (window.unityAds) {
        unityAds.show('rewardedVideo', {
          onFinish: (result) => {
            if (result === 'completed') {
              setPlayerChips(prev => prev + 2000);
              setDailyChipsUsed(true);
              alert('일일 무료 칩 2000개를 받았습니다! 🎁');
            }
          }
        });
      }
      */
      
      // 임시 시뮬레이션 (실제 배포시 삭제)
      setPlayerChips(prev => prev + 2000);
      setDailyChipsUsed(true);
      saveCurrentGameData(); // 즉시 저장
      alert('일일 무료 칩 2000개를 받았습니다! 🎁');
    }
  };

  const buyPremium = () => {
    /* 
    🔥 여기에 결제 시스템 코드를 삽입하세요!
    예시 (Stripe):
    
    const stripe = window.Stripe('pk_live_...');
    stripe.redirectToCheckout({
      sessionId: 'session_id_from_your_backend'
    });
    
    또는 PayPal:
    window.paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: { value: '4.99' }
          }]
        });
      },
      onApprove: function(data, actions) {
        setIsPremium(true);
        setShowPremiumModal(false);
        saveCurrentGameData();
      }
    }).render('#paypal-button-container');
    */
    
    // 임시 시뮬레이션 (실제 배포시 삭제)
    setIsPremium(true);
    setPlayerChips(prev => prev + 5000);
    setShowPremiumModal(false);
    saveCurrentGameData(); // 즉시 저장
    alert('프리미엄 구독 완료! 보너스 칩 5000개 지급! 🎉');
  };
  
  const scheduleNextGame = () => {
    if (!autoPlay) return;
    
    let countdown = 3; // 3초 후 다음 게임
    setTimeToNextGame(countdown);
    
    const countdownInterval = setInterval(() => {
      countdown--;
      setTimeToNextGame(countdown);
      
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        setTimeToNextGame(0);
      }
    }, 1000);
    
    const timer = setTimeout(() => {
      if (autoPlay && playerChips >= blinds.big) {
        startNewGame();
      } else {
        setAutoPlay(false);
        if (playerChips < blinds.big) {
          alert('칩이 부족하여 자동 진행을 중단합니다.');
        }
      }
    }, 3000);
    
    setNextGameTimer(timer);
  };

  // 🎯 성취 시스템
  const checkAchievements = (gameResult) => {
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
    
    setAchievements(prev => [...prev, ...newAchievements]);
    return newAchievements;
  };
  
  // 닉네임 저장 함수
  const saveNickname = () => {
    if (tempNickname.trim().length >= 2) {
      setPlayerNickname(tempNickname.trim());
      setShowNicknameModal(false);
      // 닉네임 설정 후 게임 시작
      setTimeout(() => {
        startNewGame();
      }, 500);
    }
  };

  // 초기 로드 및 정리
  useEffect(() => {
    // 일일 리셋 체크
    const today = new Date().toDateString();
    const lastResetDate = localStorage.getItem('lastDailyReset');
    if (lastResetDate !== today) {
      setDailyChipsUsed(false);
      localStorage.setItem('lastDailyReset', today);
    }
    
    // 최근 플레이어 자동 로드 시도
    const recentPlayers = getAllPlayers();
    if (recentPlayers.length > 0 && !playerNickname) {
      // 가장 최근 플레이어 자동 로드
      const lastPlayer = recentPlayers[0];
      loadPlayer(lastPlayer.nickname);
    } else if (!playerNickname) {
      // 저장된 플레이어가 없으면 플레이어 선택 모달 표시
      setShowPlayerSelector(true);
    } else {
      // 닉네임이 있으면 게임 시작
      startNewGame();
    }
    
    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (nextGameTimer) {
        clearTimeout(nextGameTimer);
      }
    };
  }, []);
  
  // 모든 가능한 핸드 조합 분석
  const analyzeAllPossibleHands = (playerCards, communityCards) => {
    if (communityCards.length < 3) return { combinations: [], bestHand: null };
    
    const allCards = [...playerCards, ...communityCards];
    const combinations = [];
    
    // 현재 베스트 핸드
    const bestHand = findBestHand(allCards);
    
    // 가능한 모든 조합 체크
    const handTypeColors = {
      '로얄 플러시': { color: 'purple', priority: 10 },
      '스트레이트 플러시': { color: 'indigo', priority: 9 },
      '포카드': { color: 'red', priority: 8 },
      '풀하우스': { color: 'orange', priority: 7 },
      '플러시': { color: 'blue', priority: 6 },
      '스트레이트': { color: 'green', priority: 5 },
      '트리플': { color: 'yellow', priority: 4 },
      '투페어': { color: 'pink', priority: 3 },
      '원페어': { color: 'teal', priority: 2 },
      '하이카드': { color: 'gray', priority: 1 }
    };
    
    // 현재 베스트 핸드 추가
    if (bestHand) {
      combinations.push({
        type: bestHand.type,
        cards: bestHand.cards,
        color: handTypeColors[bestHand.type]?.color || 'yellow',
        priority: handTypeColors[bestHand.type]?.priority || 1,
        isMain: true
      });
    }
    
    // 드로우 가능성 체크
    if (gameStage !== 'river') {
      // 플러시 드로우
      const suitCounts = {};
      allCards.forEach(card => {
        suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
      });
      
      Object.entries(suitCounts).forEach(([suit, count]) => {
        if (count === 4) {
          const flushCards = allCards.filter(card => card.suit === suit);
          combinations.push({
            type: '플러시 드로우',
            cards: flushCards,
            color: 'cyan',
            priority: 0.5,
            isDraw: true
          });
        }
      });
      
      // 스트레이트 드로우 (간단 버전)
      const values = allCards.map(card => card.value).sort((a, b) => a - b);
      const uniqueValues = [...new Set(values)];
      
      for (let i = 0; i <= uniqueValues.length - 4; i++) {
        const sequence = uniqueValues.slice(i, i + 4);
        if (sequence[3] - sequence[0] === 3) {
          const straightCards = allCards.filter(card => 
            sequence.includes(card.value)
          ).slice(0, 4);
          
          combinations.push({
            type: '스트레이트 드로우',
            cards: straightCards,
            color: 'emerald',
            priority: 0.3,
            isDraw: true
          });
        }
      }
    }
    
    return { combinations, bestHand };
  };

  // 게임 업데이트 시 분석 수행
  useEffect(() => {
    if (playerCards.length > 0 && communityCards.length >= 0) {
      const strength = calculateHandStrength(playerCards, communityCards);
      setHandStrength(strength);
      
      // 실시간 베스트 핸드 계산 및 카드 강조
      if (communityCards.length >= 3) {
        const analysis = analyzeAllPossibleHands(playerCards, communityCards);
        setPlayerBestHand(analysis.bestHand);
        
        // 모든 조합의 카드들을 분석하여 강조 정보 생성
        const cardHighlights = {};
        
        analysis.combinations.forEach(combination => {
          combination.cards.forEach(card => {
            if (!cardHighlights[card.id]) {
              cardHighlights[card.id] = [];
            }
            cardHighlights[card.id].push({
              type: combination.type,
              color: combination.color,
              priority: combination.priority,
              isDraw: combination.isDraw || false,
              isMain: combination.isMain || false
            });
          });
        });
        
        setHighlightedCards(cardHighlights);
        
        const outsData = calculateOuts(playerCards, communityCards);
        setCurrentOuts(outsData.outs);
        setDrawOdds(outsData);
        
        // 팟 오즈 계산
        if (currentBet > 0) {
          const potOddsValue = (currentBet / (pot + currentBet)) * 100;
          setPotOdds(potOddsValue);
        }
      } else {
        // 프리플롭에서는 강조 없음
        setHighlightedCards({});
        setPlayerBestHand(null);
      }
    }
  }, [playerCards, communityCards, currentBet, pot, gameStage]);
  
  const createDeck = () => {
    const newDeck = [];
    suits.forEach(suit => {
      ranks.forEach(rank => {
        newDeck.push({ 
          suit, 
          rank, 
          value: getRankValue(rank),
          id: `${rank}${suit}`
        });
      });
    });
    return shuffleDeck(newDeck);
  };

  const shuffleDeck = (deck) => {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getRankValue = (rank) => {
    if (rank === 'A') return 14;
    if (rank === 'K') return 13;
    if (rank === 'Q') return 12;
    if (rank === 'J') return 11;
    return parseInt(rank);
  };

  const startNewGame = () => {
    if (!playerNickname) {
      setShowNicknameModal(true);
      return;
    }

    // 상태 안정성 체크
    if (typeof playerChips !== 'number' || playerChips < 0) {
      console.log('🚨 플레이어 칩 상태 오류 감지, 복구');
      setPlayerChips(5000);
      return;
    }

    if (playerChips < blinds.big) {
      if (isPremium) {
        // 프리미엄 사용자는 자동 칩 보충
        setPlayerChips(5000);
        saveCurrentGameData();
      } else {
        setShowAdModal(true);
        return;
      }
    }

    const newDeck = createDeck();
    setDeck(newDeck);
    const newPlayerCards = [newDeck[0], newDeck[1]];
    const newComputerCards = [newDeck[2], newDeck[3]];
    
    // 상태 초기화
    setPlayerCards(newPlayerCards);
    setComputerCards(newComputerCards);
    setCommunityCards([]);
    setGameStage('preflop');
    setPlayerBestHand(null);
    setComputerBestHand(null);
    setWinner(null);
    setLastWinAmount(0);
    setHighlightedCards([]);
    setCanBet(true);
    setAiThinking('');
    setShowBetSlider(false);
    setCustomBetAmount(blinds.big * 2);
    setCurrentOuts([]);
    setDrawOdds({});
    
    // 올인 플래그 리셋
    window.playerAllInFlag = false;
    
    // 블라인드 설정
    const smallBlind = blinds.small;
    const bigBlind = blinds.big;
    console.log(`🎲 새 게임 시작 - 스몰 블라인드: ${smallBlind}, 빅 블라인드: ${bigBlind}`);
    
    // 게임 시작 시 플레이어 칩 저장
    setGameStartChips(playerChips);
    console.log(`💾 게임 시작 칩 저장: ${playerChips}`);
    
    setPlayerBet(bigBlind);
    setComputerBet(smallBlind);
    setCurrentBet(bigBlind);
    setPot(smallBlind + bigBlind);
    setPlayerChips(prev => {
      const newChips = Math.max(prev - bigBlind, 0);
      console.log(`🎲 플레이어 블라인드 지불: ${prev} - ${bigBlind} = ${newChips}`);
      return newChips;
    });
    setComputerChips(prev => prev - smallBlind);
    
    console.log(`🎲 초기 팟: ${smallBlind + bigBlind}, 플레이어 베팅: ${bigBlind}, AI 베팅: ${smallBlind}`);
    
    const preflopRate = calculateHandStrength(newPlayerCards, []);
    setPreflopWinRate(preflopRate);
    setCurrentWinRate(preflopRate);

    setLearningProgress(prev => ({
      ...prev,
      handsPlayed: prev.handsPlayed + 1
    }));
    
    console.log('새 게임 시작:', { playerCards: newPlayerCards, computerCards: newComputerCards });
  };

  const handlePlayerAction = (action, amount = 0) => {
    try {
      switch (action) {
        case 'call':
        const callAmount = currentBet - playerBet;
        setPlayerBet(currentBet);
        setPlayerChips(prev => prev - callAmount);
        setPot(prev => prev + callAmount);
        break;
      case 'raise':
        const raiseAmount = amount || customBetAmount;
        const actualRaiseAmount = Math.min(raiseAmount, playerChips + playerBet); // 올인 제한
        const chipsToAdd = actualRaiseAmount - playerBet;
        const willBeAllIn = (playerChips - chipsToAdd) <= 0; // 올인 여부 미리 계산
        
        console.log(`🎯 플레이어 레이즈 전: 현재 칩=${playerChips}, 현재 베팅=${playerBet}, 요청 금액=${raiseAmount}, 실제 금액=${actualRaiseAmount}, 추가할 칩=${chipsToAdd}, 현재 팟=${pot}, 올인 여부=${willBeAllIn}`);
        
        setPlayerBet(actualRaiseAmount);
        setCurrentBet(actualRaiseAmount);
        setPlayerChips(prev => {
          const newChips = Math.max(0, prev - chipsToAdd);
          console.log(`🎯 플레이어 칩 변경: ${prev} → ${newChips}`);
          return newChips;
        });
        setPot(prev => {
          const newPot = prev + chipsToAdd;
          console.log(`🎯 팟 변경: ${prev} → ${newPot}`);
          return newPot;
        });
        
        // 올인이면 특별 처리 플래그 설정
        if (willBeAllIn) {
          console.log(`🚨 플레이어 올인 감지! 특별 처리 필요`);
          // 전역 변수로 올인 상태 저장
          window.playerAllInFlag = true;
        }
        break;
      case 'fold':
        endGame('computer', 'fold');
        return;
      case 'check':
        break;
    }
    
    setCanBet(false);
    setShowBetSlider(false);
    
    // 학습 모드별 피드백
    const feedback = getTrainingFeedback(action, handStrength, drawOdds, potOdds);
    if (feedback.length > 0 && learningMode !== 'normal') {
      setTimeout(() => {
        alert(feedback.join('\n'));
      }, 1000);
    }
    
    setTimeout(() => {
      handleComputerAction();
    }, 2000);
    } catch (error) {
      handleError(error, 'handlePlayerAction');
    }
  };

  const handleComputerAction = () => {
    setAiThinking(`${aiPersonality.toUpperCase()} AI가 분석 중...`);
    
    setTimeout(() => {
      const aiHandStrength = calculateHandStrength(computerCards, communityCards);
      const action = getAIAction(aiHandStrength, gameStage, pot, currentBet);
      let amount = 0;
      
      switch (action) {
        case 'raise':
          amount = currentBet + Math.floor(Math.random() * 200) + 100;
          setComputerBet(amount);
          setCurrentBet(amount);
          setComputerChips(prev => prev - (amount - computerBet));
          setPot(prev => prev + (amount - computerBet));
          setCanBet(true);
          setAiThinking(`AI가 ${amount}으로 레이즈했습니다`);
          return;
        case 'call':
          const callAmount = currentBet - computerBet;
          console.log(`🤖 AI 콜 전: AI 칩=${computerChips}, AI 베팅=${computerBet}, 현재 베팅=${currentBet}, 콜 금액=${callAmount}, 현재 팟=${pot}`);
          
          setComputerBet(currentBet);
          setComputerChips(prev => {
            const newChips = prev - callAmount;
            console.log(`🤖 AI 칩 변경: ${prev} → ${newChips}`);
            return newChips;
          });
          setPot(prev => {
            const newPot = prev + callAmount;
            console.log(`🤖 AI 콜 후 팟: ${prev} → ${newPot}`);
            return newPot;
          });
          setAiThinking(`AI가 ${callAmount.toLocaleString()} 칩으로 콜했습니다`);
          break;
        case 'fold':
          endGame('player', 'computer_fold');
          return;
        case 'check':
          setAiThinking(`AI가 체크했습니다`);
          break;
      }
      
      // 올인 상황 체크
      setTimeout(() => {
        const currentPlayerChips = playerChips; // 현재 상태 확인
        const currentComputerChips = computerChips;
        const isPlayerAllIn = currentPlayerChips === 0 || window.playerAllInFlag;
        const isComputerAllIn = currentComputerChips === 0;
        
        console.log(`🔍 올인 체크: 플레이어 칩=${currentPlayerChips}, AI 칩=${currentComputerChips}, 플래그=${window.playerAllInFlag}, 플레이어 올인=${isPlayerAllIn}, AI 올인=${isComputerAllIn}`);
        
        if (isPlayerAllIn || isComputerAllIn) {
          console.log(`🚀 올인 감지! 쇼다운으로 진행`);
          window.playerAllInFlag = false; // 플래그 리셋
          goToShowdown();
        } else {
          console.log(`➡️ 다음 스테이지로 진행`);
          nextStage();
        }
      }, 1500);
    }, 2500);
  };

  // 올인 시 바로 쇼다운으로 진행
  const goToShowdown = () => {
    const currentDeck = [...deck];
    let finalCommunityCards = [...communityCards];
    
    // 남은 커뮤니티 카드들을 모두 공개
    while (finalCommunityCards.length < 5) {
      finalCommunityCards.push(currentDeck[4 + finalCommunityCards.length]);
    }
    
    setCommunityCards(finalCommunityCards);
    setGameStage('showdown');
    setCanBet(false);
    
    setTimeout(() => {
      evaluateShowdown(finalCommunityCards);
    }, 1000);
  };

  const nextStage = () => {
    const currentDeck = [...deck];
    let newCommunityCards = [...communityCards];
    
    console.log(`⏭️ nextStage 호출됨 - 베팅 리셋 전: 플레이어=${playerBet}, AI=${computerBet}, 팟=${pot}`);
    
    setPlayerBet(0);
    setComputerBet(0);
    setCurrentBet(0);
    setCanBet(true);
    setAiThinking('');
    
    console.log(`⏭️ 베팅 리셋 완료`);
    
    switch (gameStage) {
      case 'preflop':
        newCommunityCards = [currentDeck[4], currentDeck[5], currentDeck[6]];
        setCommunityCards(newCommunityCards);
        setGameStage('flop');
        break;
      case 'flop':
        newCommunityCards.push(currentDeck[7]);
        setCommunityCards(newCommunityCards);
        setGameStage('turn');
        break;
      case 'turn':
        newCommunityCards.push(currentDeck[8]);
        setCommunityCards(newCommunityCards);
        setGameStage('river');
        break;
      case 'river':
        setGameStage('showdown');
        evaluateShowdown(newCommunityCards);
        return;
    }
    
    if (newCommunityCards.length > 0) {
      const newWinRate = calculateHandStrength(playerCards, newCommunityCards);
      setCurrentWinRate(newWinRate);
    }
  };

  const evaluateShowdown = (finalCommunityCards) => {
    const playerAllCards = [...playerCards, ...finalCommunityCards];
    const computerAllCards = [...computerCards, ...finalCommunityCards];
    
    const playerHand = findBestHand(playerAllCards);
    const computerHand = findBestHand(computerAllCards);
    
    setPlayerBestHand(playerHand);
    setComputerBestHand(computerHand);
    
    const result = compareHands(playerHand, computerHand);
    endGame(result, 'showdown');
  };

  const endGame = (result, endType = 'showdown') => {
    setWinner(result);
    setCanBet(false);
    setAiThinking('');
    
    let chipsWon = 0;
    
    // 팟을 직접 계산 (React state 업데이트 지연 문제 해결)
    let calculatedPot = playerBet + computerBet;
    
    // 만약 베팅이 리셋되었다면 (nextStage에서), 실제 투입된 칩으로 재계산
    if (calculatedPot <= blinds.small + blinds.big && playerChips === 0) {
      console.log(`🚨 올인 후 베팅이 리셋된 것으로 보임. 실제 투입 칩으로 재계산`);
      
      // 플레이어가 올인 - 초기 칩에서 현재 칩을 뺀 것이 실제 베팅액
      const playerTotalBet = gameStartChips - playerChips; // 시작 칩 - 현재 칩 = 총 베팅액
      
      // AI도 같은 금액을 베팅했을 것 (콜)
      const aiTotalBet = playerTotalBet;
      
      calculatedPot = playerTotalBet + aiTotalBet;
      console.log(`🔄 재계산된 팟: 플레이어 베팅=${playerTotalBet} (${gameStartChips} - ${playerChips}), AI 베팅=${aiTotalBet}, 총합=${calculatedPot}`);
    }
    
    const currentPot = Math.max(pot, calculatedPot); // 더 큰 값 사용
    
    console.log(`🏆 게임 종료 - 결과: ${result}`);
    console.log(`📊 팟 정보:`);
    console.log(`  - React state 팟: ${pot}`);
    console.log(`  - 계산된 팟: ${calculatedPot} (플레이어 베팅: ${playerBet} + AI 베팅: ${computerBet})`);
    console.log(`  - 최종 사용 팟: ${currentPot}`);
    console.log(`  - 플레이어 칩: ${playerChips}, AI 칩: ${computerChips}`);
    
    if (result === 'player') {
      chipsWon = currentPot;
      setLastWinAmount(currentPot); // 승리 금액 저장
      console.log(`🏆 플레이어 승리! 지급할 칩: ${currentPot}`);
      const newPlayerChips = playerChips + currentPot;
      console.log(`💰 플레이어 칩 지급: ${playerChips} + ${currentPot} = ${newPlayerChips}`);
      setPlayerChips(newPlayerChips);
      setGamesWon(prev => prev + 1);
      setCurrentStreak(prev => prev + 1);
      setMaxStreak(prev => Math.max(prev, currentStreak + 1));
    } else if (result === 'computer') {
      setLastWinAmount(0);
      setComputerChips(prev => prev + currentPot);
      setCurrentStreak(0);
    } else {
      const playerShare = Math.floor(currentPot / 2);
      chipsWon = playerShare;
      setLastWinAmount(playerShare);
      const newPlayerChips = playerChips + playerShare;
      setPlayerChips(newPlayerChips);
      setComputerChips(prev => prev + (currentPot - playerShare));
    }
    
    setGamesPlayed(prev => prev + 1);
    setTotalChipsWon(prev => prev + chipsWon);
    
    // 경험치 및 레벨 업데이트
    const expGained = result === 'player' ? 100 : 50;
    setExperience(prev => {
      const newExp = prev + expGained;
      const newLevel = Math.floor(newExp / 1000) + 1;
      if (newLevel > playerLevel) {
        setPlayerLevel(newLevel);
        alert(`🎉 레벨 업! 현재 레벨: ${newLevel}`);
      }
      return newExp;
    });
    
    // 게임 결과 저장
    const gameResult = {
      id: Date.now(),
      playerCards: [...playerCards],
      computerCards: [...computerCards],
      communityCards: [...communityCards],
      playerHand: playerBestHand,
      computerHand: computerBestHand,
      winner: result,
      potSize: currentPot,
      chipsWon: chipsWon,
      preflopWinRate: preflopWinRate,
      finalWinRate: currentWinRate,
      endType: endType,
      gameStage: gameStage,
      outsCount: drawOdds.count || 0,
      learningMode: learningMode
    };
    
    // 성취 확인
    const newAchievements = checkAchievements(gameResult);
    if (newAchievements.length > 0) {
      setTimeout(() => {
        alert('🏆 새로운 성취!\n' + newAchievements.join('\n'));
      }, 2000);
    }
    
    setGameHistory(prev => [gameResult, ...prev.slice(0, 49)]);
    saveStats();
    
    console.log(`🚨 팟 리셋 전 확인: 현재 팟=${pot}, 지급된 칩=${chipsWon}`);
    setPot(0);
    console.log(`🚨 팟이 0으로 리셋되었습니다`);
    
    // 게임 데이터 자동 저장
    setTimeout(() => {
      saveCurrentGameData();
    }, 100);
    
    // 🎯 자동 진행 시스템
    if (autoPlay) {
      setTimeout(() => {
        scheduleNextGame();
      }, 2000); // 결과 확인 시간 2초 후 카운트다운 시작
    }
    
    // 게임이 끝나면 베팅 상태 초기화
    setTimeout(() => {
      if (!autoPlay) {
        setCanBet(false); // 수동 게임에서는 새 게임 시작할 때까지 베팅 비활성화
      }
      // 상태 안정화를 위한 강제 리렌더링
      console.log('🔄 게임 종료 후 상태 안정화 완료');
    }, 1000);
  };

  const saveStats = () => {
    const stats = {
      totalChipsWon,
      gamesPlayed,
      gamesWon,
      currentStreak,
      maxStreak
    };
    localStorage.setItem('pokerStats', JSON.stringify(stats));
    localStorage.setItem('learningProgress', JSON.stringify(learningProgress));
    localStorage.setItem('playerLevel', playerLevel.toString());
    localStorage.setItem('achievements', JSON.stringify(achievements));
  };

  const findBestHand = (cards) => {
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

    // 핸드 타입 결정
    if (flushSuit && isStraight) {
      const flushCards = sortedCards.filter(card => card.suit === flushSuit);
      if (straightHigh === 14 && flushCards.some(card => card.value === 14)) {
        return { type: '로얄 플러시', cards: flushCards.slice(0, 5) };
      } else {
        return { type: '스트레이트 플러시', cards: flushCards.slice(0, 5) };
      }
    } else if (pairs.length > 0 && pairs[0][1] === 4) {
      return { type: '포카드', cards: sortedCards.slice(0, 5) };
    } else if (pairs.length >= 2 && pairs[0][1] === 3 && pairs[1][1] >= 2) {
      return { type: '풀하우스', cards: sortedCards.slice(0, 5) };
    } else if (flushSuit) {
      const flushCards = sortedCards.filter(card => card.suit === flushSuit);
      return { type: '플러시', cards: flushCards.slice(0, 5) };
    } else if (isStraight) {
      return { type: '스트레이트', cards: sortedCards.slice(0, 5) };
    } else if (pairs.length > 0 && pairs[0][1] === 3) {
      return { type: '트리플', cards: sortedCards.slice(0, 5) };
    } else if (pairs.length >= 2) {
      return { type: '투페어', cards: sortedCards.slice(0, 5) };
    } else if (pairs.length === 1) {
      return { type: '원페어', cards: sortedCards.slice(0, 5) };
    } else {
      return { type: '하이카드', cards: sortedCards.slice(0, 5) };
    }
  };

  const compareHands = (playerHand, computerHand) => {
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

  // 색상 매핑
  const getColorClasses = (color, isDraw = false, isMain = false) => {
    const intensity = isMain ? '500' : isDraw ? '300' : '400';
    const bgIntensity = isMain ? '100' : isDraw ? '50' : '75';
    
    const colorMap = {
      purple: {
        border: `border-purple-${intensity}`,
        bg: `bg-gradient-to-br from-purple-${bgIntensity} to-purple-${parseInt(bgIntensity) + 25}`,
        ring: `ring-purple-${intensity}`,
        icon: 'text-purple-800',
        emoji: '👑'
      },
      indigo: {
        border: `border-indigo-${intensity}`,
        bg: `bg-gradient-to-br from-indigo-${bgIntensity} to-indigo-${parseInt(bgIntensity) + 25}`,
        ring: `ring-indigo-${intensity}`,
        icon: 'text-indigo-800',
        emoji: '🌟'
      },
      red: {
        border: `border-red-${intensity}`,
        bg: `bg-gradient-to-br from-red-${bgIntensity} to-red-${parseInt(bgIntensity) + 25}`,
        ring: `ring-red-${intensity}`,
        icon: 'text-red-800',
        emoji: '💎'
      },
      orange: {
        border: `border-orange-${intensity}`,
        bg: `bg-gradient-to-br from-orange-${bgIntensity} to-orange-${parseInt(bgIntensity) + 25}`,
        ring: `ring-orange-${intensity}`,
        icon: 'text-orange-800',
        emoji: '🏠'
      },
      blue: {
        border: `border-blue-${intensity}`,
        bg: `bg-gradient-to-br from-blue-${bgIntensity} to-blue-${parseInt(bgIntensity) + 25}`,
        ring: `ring-blue-${intensity}`,
        icon: 'text-blue-800',
        emoji: '🌊'
      },
      green: {
        border: `border-green-${intensity}`,
        bg: `bg-gradient-to-br from-green-${bgIntensity} to-green-${parseInt(bgIntensity) + 25}`,
        ring: `ring-green-${intensity}`,
        icon: 'text-green-800',
        emoji: '📏'
      },
      yellow: {
        border: `border-yellow-${intensity}`,
        bg: `bg-gradient-to-br from-yellow-${bgIntensity} to-yellow-${parseInt(bgIntensity) + 25}`,
        ring: `ring-yellow-${intensity}`,
        icon: 'text-yellow-800',
        emoji: '🎯'
      },
      pink: {
        border: `border-pink-${intensity}`,
        bg: `bg-gradient-to-br from-pink-${bgIntensity} to-pink-${parseInt(bgIntensity) + 25}`,
        ring: `ring-pink-${intensity}`,
        icon: 'text-pink-800',
        emoji: '👥'
      },
      teal: {
        border: `border-teal-${intensity}`,
        bg: `bg-gradient-to-br from-teal-${bgIntensity} to-teal-${parseInt(bgIntensity) + 25}`,
        ring: `ring-teal-${intensity}`,
        icon: 'text-teal-800',
        emoji: '👫'
      },
      cyan: {
        border: `border-cyan-${intensity}`,
        bg: `bg-gradient-to-br from-cyan-${bgIntensity} to-cyan-${parseInt(bgIntensity) + 25}`,
        ring: `ring-cyan-${intensity}`,
        icon: 'text-cyan-800',
        emoji: '💧'
      },
      emerald: {
        border: `border-emerald-${intensity}`,
        bg: `bg-gradient-to-br from-emerald-${bgIntensity} to-emerald-${parseInt(bgIntensity) + 25}`,
        ring: `ring-emerald-${intensity}`,
        icon: 'text-emerald-800',
        emoji: '🔄'
      },
      gray: {
        border: `border-gray-${intensity}`,
        bg: `bg-gradient-to-br from-gray-${bgIntensity} to-gray-${parseInt(bgIntensity) + 25}`,
        ring: `ring-gray-${intensity}`,
        icon: 'text-gray-800',
        emoji: '🃏'
      }
    };
    
    return colorMap[color] || colorMap.yellow;
  };

  // 🎯 고급 UI 컴포넌트들
  const Card = ({ card, isHidden = false, highlightInfo = null, showProbability = false }) => {
    if (isHidden) {
      return (
        <div className="w-20 h-28 bg-gradient-to-br from-blue-800 to-blue-900 border-2 border-blue-700 rounded-lg flex items-center justify-center shadow-xl">
          <div className="text-white text-lg">🎴</div>
        </div>
      );
    }

    const isRed = card.suit === '♥' || card.suit === '♦';
    const isHighlighted = highlightInfo && highlightInfo.length > 0;
    
    // 가장 높은 우선순위의 하이라이트 선택
    const primaryHighlight = isHighlighted 
      ? highlightInfo.sort((a, b) => b.priority - a.priority)[0]
      : null;
    
    // 여러 조합이 겹치는 경우 그라데이션 처리
    const isMultiple = isHighlighted && highlightInfo.length > 1;
    
    let cardClasses = `w-20 h-28 bg-white border-2 rounded-lg flex flex-col items-center justify-between p-1 shadow-lg transition-all duration-500 relative ${
      isRed ? 'text-red-600' : 'text-black'
    }`;
    
    if (isHighlighted && primaryHighlight) {
      const colorClasses = getColorClasses(primaryHighlight.color, primaryHighlight.isDraw, primaryHighlight.isMain);
      cardClasses = `w-20 h-28 border-4 rounded-lg flex flex-col items-center justify-between p-1 shadow-2xl transition-all duration-500 relative scale-110 z-10 ring-2 ring-opacity-50 ${
        isRed ? 'text-red-600' : 'text-black'
      } ${colorClasses.border} ${colorClasses.bg} ${colorClasses.ring}`;
      
      // 겹치는 조합이 있는 경우 추가 효과
      if (isMultiple) {
        cardClasses += ' animate-pulse';
      }
    } else {
      cardClasses += ' border-gray-300 hover:border-gray-400';
    }
    
    return (
      <div className={cardClasses}>
        <div className="text-xs font-bold">{card.rank}</div>
        <div className="text-xl">{card.suit}</div>
        <div className="text-xs font-bold transform rotate-180">{card.rank}</div>
        
        {/* 하이라이트 표시 */}
        {isHighlighted && primaryHighlight && (
          <div className="absolute -top-2 -right-2 flex flex-col gap-1">
            {/* 메인 아이콘 */}
            <div className={`w-6 h-6 ${getColorClasses(primaryHighlight.color, primaryHighlight.isDraw, primaryHighlight.isMain).border} bg-white rounded-full flex items-center justify-center text-xs`}>
              {getColorClasses(primaryHighlight.color, primaryHighlight.isDraw, primaryHighlight.isMain).emoji}
            </div>
            
            {/* 추가 조합 표시 (최대 2개) */}
            {isMultiple && highlightInfo.slice(1, 3).map((highlight, i) => (
              <div key={i} className={`w-4 h-4 ${getColorClasses(highlight.color, highlight.isDraw, highlight.isMain).border} bg-white rounded-full flex items-center justify-center text-xs opacity-75`}>
                <span className="text-xs">{getColorClasses(highlight.color, highlight.isDraw, highlight.isMain).emoji}</span>
              </div>
            ))}
          </div>
        )}
        
        {/* 조합 타입 표시 (호버 시) */}
        {isHighlighted && primaryHighlight && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20">
            {primaryHighlight.type}
            {isMultiple && (
              <div className="text-xs mt-1">
                +{highlightInfo.length - 1}개 조합
              </div>
            )}
          </div>
        )}
        
        {showProbability && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
            {Math.floor(Math.random() * 20) + 10}%
          </div>
        )}
      </div>
    );
  };

  // 🎯 고급 통계 패널
  const AdvancedStatsPanel = () => (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-purple-800 flex items-center gap-2">
          <Activity size={20} />
          실시간 프로 분석
        </h3>
        <button
          onClick={() => setShowAdvancedStats(!showAdvancedStats)}
          className="text-purple-600 hover:text-purple-800"
        >
          {showAdvancedStats ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {showAdvancedStats && (
        <div className="space-y-3">
          {/* 핸드 스트렝스 바 */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>핸드 강도</span>
              <span className="font-bold">{handStrength.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-500 ${
                  handStrength >= 80 ? 'bg-green-500' :
                  handStrength >= 60 ? 'bg-yellow-500' :
                  handStrength >= 40 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${handStrength}%` }}
              ></div>
            </div>
          </div>
          
          {/* 아웃츠 정보 */}
          {drawOdds.count > 0 && (
            <div className="bg-white rounded p-3 border">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-green-700">드로우 분석</span>
                <span className="text-lg font-bold text-green-600">{drawOdds.count} 아웃츠</span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>완성 확률: <span className="font-bold text-green-600">{drawOdds.odds.toFixed(1)}%</span></div>
                {potOdds > 0 && (
                  <div>팟 오즈: <span className="font-bold">{potOdds.toFixed(1)}%</span></div>
                )}
                <div className="text-xs bg-gray-50 p-2 rounded">
                  {currentOuts.map((out, i) => (
                    <div key={i}>• {out.type}: {out.count}장</div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* AI 읽기 */}
          <div className="bg-white rounded p-3 border">
            <div className="flex items-center gap-2 mb-2">
              <Eye size={16} className="text-blue-600" />
              <span className="font-semibold text-blue-700">AI 상대 분석</span>
            </div>
            <div className="text-sm text-gray-600">
              <div>플레이 스타일: <span className="font-bold capitalize">{aiPersonality}</span></div>
              <div>예상 핸드 레인지: <span className="text-yellow-600 font-bold">중간 이상</span></div>
              <div>어그레션 레벨: <span className="text-red-600 font-bold">높음</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // 🎯 학습 모드 선택기
  const LearningModeSelector = () => (
    <div className="bg-white rounded-lg p-4 border-2 border-indigo-200">
      <h3 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
        <GraduationCap size={20} />
        학습 모드 선택
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {[
          { id: 'normal', name: '일반 게임', icon: Gamepad2, desc: '자유로운 플레이' },
          { id: 'math', name: '확률 훈련', icon: Calculator, desc: '오즈 계산 연습' },
          { id: 'bluff', name: '블러프 훈련', icon: Eye, desc: '심리전 연습' },
          { id: 'position', name: '포지션 훈련', icon: Target, desc: '포지션별 전략' },
          { id: 'reading', name: '상대 읽기', icon: Brain, desc: '텔 분석 훈련' },
          { id: 'tournament', name: '토너먼트', icon: Trophy, desc: '실전 모드' }
        ].map(mode => (
          <button
            key={mode.id}
            onClick={() => setLearningMode(mode.id)}
            className={`p-3 rounded-lg border-2 transition-all text-left ${
              learningMode === mode.id 
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                : 'border-gray-200 hover:border-indigo-300 text-gray-600'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <mode.icon size={16} />
              <span className="font-semibold text-sm">{mode.name}</span>
            </div>
            <div className="text-xs">{mode.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );

  // 🎯 AI 플레이어 설정
  const AIPersonalitySelector = () => (
    <div className="bg-white rounded-lg p-4 border-2 border-red-200">
      <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
        <Bot size={20} />
        AI 상대 설정
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {[
          { id: 'tight', name: '타이트', desc: '보수적', difficulty: 1 },
          { id: 'loose', name: '루즈', desc: '공격적', difficulty: 2 },
          { id: 'aggressive', name: '어그레시브', desc: '압박형', difficulty: 3 },
          { id: 'passive', name: '패시브', desc: '수동적', difficulty: 1 },
          { id: 'balanced', name: '밸런스', desc: '균형형', difficulty: 3 },
          { id: 'pro', name: '프로', desc: '최고수', difficulty: 5 }
        ].map(ai => (
          <button
            key={ai.id}
            onClick={() => setAiPersonality(ai.id)}
            className={`p-3 rounded-lg border-2 transition-all text-left ${
              aiPersonality === ai.id 
                ? 'border-red-500 bg-red-50 text-red-700' 
                : 'border-gray-200 hover:border-red-300 text-gray-600'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm">{ai.name}</span>
              <div className="flex">
                {Array(ai.difficulty).fill().map((_, i) => (
                  <Star key={i} size={12} className="text-yellow-500 fill-current" />
                ))}
              </div>
            </div>
            <div className="text-xs">{ai.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );

  // 에러 상태 체크
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 p-4 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md">
          <div className="text-center">
            <AlertTriangle className="mx-auto mb-4 text-red-600" size={48} />
            <h2 className="text-2xl font-bold text-red-800 mb-4">오류가 발생했습니다</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => { setError(null); window.location.reload(); }}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              새로 고침
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 안전 가드: 기본 상태값들이 undefined가 아님을 보장
  if (typeof playerChips !== 'number' || typeof computerChips !== 'number') {
    console.log('🚨 상태 오류 감지, 기본값으로 복구');
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-4 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-4xl mb-4">🎮</div>
          <div className="text-xl">게임을 다시 시작하는 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 🎯 프로급 헤더 */}
        <header className="text-center mb-6 relative">
          {/* 플레이어 전환 버튼 */}
          {playerNickname && (
            <button
              onClick={() => setShowPlayerSelector(true)}
              className="absolute top-0 right-0 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2 border border-white/20"
            >
              <User size={16} />
              {playerNickname}
              {isPremium && <Crown size={16} className="text-yellow-400" />}
              <Edit size={14} />
            </button>
          )}
          
          <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            🏆 프로 텍사스 홀덤 마스터
          </h1>
          <p className="text-green-200 text-xl mb-4">AI 분석 + 실시간 확률 + 프로 전략 학습</p>
          
          {/* 플레이어 정보 대시보드 */}
          <div className="bg-gradient-to-r from-black/30 to-black/20 rounded-xl p-6 mb-4 border border-white/10">
            <div className="flex justify-center items-center gap-8 text-white mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <User size={32} className="text-blue-400" />
                  {isPremium && <Crown size={16} className="absolute -top-2 -right-2 text-yellow-400" />}
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl">{playerNickname}</div>
                  <div className="text-sm text-blue-300">레벨 {playerLevel} • {experience}/1000 EXP</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-lg">
                <Coins size={24} className="text-yellow-400" />
                <span className="font-bold text-2xl">{playerChips.toLocaleString()}</span>
              </div>
              
              {currentStreak > 0 && (
                <div className="flex items-center gap-2 bg-red-500/20 px-3 py-2 rounded-lg">
                  <Flame size={20} className="text-red-400" />
                  <span className="font-bold">{currentStreak} 연승</span>
                </div>
              )}
            </div>
            
            <div className="flex justify-center gap-6 text-green-200 text-sm">
              <span>🎯 총 게임: {gamesPlayed}</span>
              <span>✅ 승수: {gamesWon}</span>
              <span>📊 승률: {gamesPlayed > 0 ? ((gamesWon / gamesPlayed) * 100).toFixed(1) : 0}%</span>
              <span>💰 총 획득: {totalChipsWon.toLocaleString()}</span>
              <span>🔥 최고 연승: {maxStreak}</span>
            </div>
          </div>
        </header>

        {/* 🎯 학습 시스템 컨트롤 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <LearningModeSelector />
          <AIPersonalitySelector />
        </div>

        {/* 팟 정보 */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 mb-6 shadow-2xl">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-900 mb-3">
              💰 팟: {pot.toLocaleString()} 칩
            </div>
            <div className="flex justify-center gap-6 text-sm text-yellow-800">
              <span className="bg-white/50 px-3 py-1 rounded-full">현재 베팅: {currentBet}</span>
              <span className="bg-white/50 px-3 py-1 rounded-full">내 베팅: {playerBet}</span>
              <span className="bg-white/50 px-3 py-1 rounded-full">상대 베팅: {computerBet}</span>
            </div>
          </div>
        </div>

        {/* 🎯 고급 통계 패널 */}
        <div className="mb-6">
          <AdvancedStatsPanel />
        </div>

        {/* AI 상대 */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-6 mb-6 shadow-xl border-2 border-red-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Bot className="text-red-600" size={32} />
              <div>
                <span className="font-bold text-xl text-red-800">AI {aiPersonality.toUpperCase()}</span>
                <div className="text-sm text-red-600">프로 플레이어 • 난이도: {aiPersonality === 'pro' ? '최고' : '중급'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
              <Coins size={20} />
              <span className="font-semibold">{computerChips.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex justify-center gap-3 mb-4">
            {gameStage === 'showdown' ? (
              computerCards.map((card, i) => (
                <Card key={i} card={card} isHighlighted={highlightedCards.includes(card.id)} />
              ))
            ) : (
              computerCards.map((_, i) => <Card key={i} card={{}} isHidden={true} />)
            )}
          </div>
          
          {computerBestHand && (
            <p className="text-center text-red-700 font-bold text-xl mb-2">
              🎯 {computerBestHand.type}
            </p>
          )}
          
          {aiThinking && (
            <div className="text-center bg-red-100 border border-red-200 p-3 rounded-lg">
              <Brain className="inline mr-2 text-red-600" size={18} />
              <span className="text-red-700 font-semibold">{aiThinking}</span>
            </div>
          )}
        </div>

        {/* 🎯 AI 행동 표시 - 더 잘 보이는 위치 */}
        {aiThinking && (
          <div className="bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300 rounded-xl p-4 mb-6 shadow-lg">
            <div className="text-center">
              <Brain className="inline mr-2 text-red-600" size={20} />
              <span className="text-red-700 font-bold text-lg">{aiThinking}</span>
            </div>
          </div>
        )}

        {/* 🎯 커뮤니티 카드 + 실시간 분석 */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-xl border-2 border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">
            🃏 커뮤니티 카드 • {gameStage.toUpperCase()}
          </h2>
          
          <div className="flex justify-center gap-4 mb-6">
            {gameStage === 'preflop' ? (
              Array(5).fill().map((_, i) => <Card key={i} card={{}} isHidden={true} />)
            ) : (
              <>
                {communityCards.map((card, i) => (
                  <Card 
                    key={i} 
                    card={card} 
                    highlightInfo={highlightedCards[card.id] || null}
                    showProbability={drawOdds.count > 0}
                  />
                ))}
                {Array(5 - communityCards.length).fill().map((_, i) => (
                  <Card key={i + communityCards.length} card={{}} isHidden={true} />
                ))}
              </>
            )}
          </div>
          
          {/* 🎯 카드 강조 범례 */}
          {communityCards.length >= 3 && Object.keys(highlightedCards).length > 0 && (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                🎨 카드 강조 범례
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                {[
                  { color: 'purple', emoji: '👑', name: '로얄 플러시' },
                  { color: 'indigo', emoji: '🌟', name: '스트레이트 플러시' },
                  { color: 'red', emoji: '💎', name: '포카드' },
                  { color: 'orange', emoji: '🏠', name: '풀하우스' },
                  { color: 'blue', emoji: '🌊', name: '플러시' },
                  { color: 'green', emoji: '📏', name: '스트레이트' },
                  { color: 'yellow', emoji: '🎯', name: '트리플' },
                  { color: 'pink', emoji: '👥', name: '투페어' },
                  { color: 'teal', emoji: '👫', name: '원페어' },
                  { color: 'cyan', emoji: '💧', name: '플러시 드로우' },
                  { color: 'emerald', emoji: '🔄', name: '스트레이트 드로우' }
                ].map((item, i) => {
                  const colorClasses = getColorClasses(item.color);
                  return (
                    <div key={i} className={`flex items-center gap-1 p-1 rounded ${colorClasses.bg}`}>
                      <span className="text-sm">{item.emoji}</span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-600 mt-2">
                💡 여러 조합이 가능한 카드는 점멸하며, 호버하면 상세 정보를 확인할 수 있습니다.
              </p>
            </div>
          )}

          {/* 🎯 실시간 가능한 핸드 분석 */}
          {communityCards.length >= 3 && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Target size={20} />
                현재 보드에서 가능한 강한 조합
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {[
                  { name: '플러시 가능성', check: () => {
                    const suits = {};
                    [...playerCards, ...communityCards].forEach(card => {
                      suits[card.suit] = (suits[card.suit] || 0) + 1;
                    });
                    return Math.max(...Object.values(suits)) >= 4;
                  }},
                  { name: '스트레이트 가능성', check: () => {
                    const values = [...playerCards, ...communityCards].map(card => card.value).sort();
                    for (let i = 0; i <= values.length - 4; i++) {
                      if (values[i + 3] - values[i] <= 4) return true;
                    }
                    return false;
                  }},
                  { name: '페어 이상', check: () => {
                    const ranks = {};
                    [...playerCards, ...communityCards].forEach(card => {
                      ranks[card.rank] = (ranks[card.rank] || 0) + 1;
                    });
                    return Math.max(...Object.values(ranks)) >= 2;
                  }},
                  { name: '강한 핸드', check: () => handStrength >= 70 }
                ].map((analysis, i) => (
                  <div key={i} className={`p-2 rounded border-2 ${
                    analysis.check() 
                      ? 'border-green-400 bg-green-50 text-green-700' 
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}>
                    <div className="font-semibold">{analysis.name}</div>
                    <div className="text-xs">
                      {analysis.check() ? '✅ 가능' : '❌ 없음'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 🎯 게임 컨트롤 버튼들 */}
          <div className="mt-6 pt-4 border-t-2 border-green-200">
            {/* 자동 진행 상태 표시 */}
            {autoPlay && (
              <div className="text-center mb-4 p-3 bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-300 rounded-xl">
                <div className="flex items-center justify-center gap-2 text-blue-800 font-bold">
                  <Activity className="animate-pulse" size={20} />
                  <span>🤖 자동 연속 게임 진행 중</span>
                </div>
                {timeToNextGame > 0 && (
                  <div className="text-sm text-blue-600 mt-1">
                    다음 게임까지: <span className="font-bold text-lg">{timeToNextGame}</span>초
                  </div>
                )}
              </div>
            )}
            
            <div className="flex justify-center gap-3 flex-wrap">
              {!autoPlay ? (
                <>
                  <button
                    onClick={startNewGame}
                    className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all duration-300 shadow-xl text-lg font-bold flex items-center gap-3"
                  >
                    <Shuffle size={24} />
                    새 게임 시작
                  </button>
                  
                  <button
                    onClick={startAutoPlay}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-xl font-bold flex items-center gap-2"
                    disabled={playerChips < blinds.big}
                  >
                    <Play size={20} />
                    연속 게임
                  </button>
                </>
              ) : (
                <button
                  onClick={stopAutoPlay}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-xl text-lg font-bold flex items-center gap-3"
                >
                  <RefreshCw size={24} />
                  게임 중단
                </button>
              )}
            </div>
          </div>
        </div>


        {/* 플레이어 영역 */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 shadow-xl border-2 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <User className="text-green-600" size={32} />
              <div>
                <span className="font-bold text-xl text-green-800">{playerNickname}</span>
                <div className="text-sm text-green-600">레벨 {playerLevel} • {learningMode.toUpperCase()} 모드</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
              <Coins size={20} />
              <span className="font-semibold">{playerChips.toLocaleString()}</span>
            </div>
          </div>
          
          {/* 🎯 승률 및 추천 표시 (개선된 버전) */}
          {currentWinRate && (
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-blue-100 to-green-100 border-2 border-blue-300 rounded-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {preflopWinRate && (
                    <div className="text-center">
                      <div className="text-blue-600 font-bold text-lg">
                        <Target size={20} className="inline mr-1" />
                        프리플롭 승률
                      </div>
                      <div className="text-3xl font-bold text-blue-700">{preflopWinRate}%</div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-green-600 font-bold text-lg">
                      <TrendingUp size={20} className="inline mr-1" />
                      현재 승률
                    </div>
                    <div className="text-3xl font-bold text-green-700">{currentWinRate.toFixed(1)}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-600 font-bold text-lg">
                      <Brain size={20} className="inline mr-1" />
                      핸드 강도
                    </div>
                    <div className="text-3xl font-bold text-purple-700">{handStrength.toFixed(0)}/100</div>
                  </div>
                </div>
                
                {learningMode === 'normal' && (
                  <div className="text-sm text-gray-700 bg-white/70 p-3 rounded-lg">
                    💡 스스로 판단해보세요! 게임 후 상세한 AI 분석을 받을 수 있습니다.
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="flex justify-center gap-4 mb-6">
            {playerCards.map((card, i) => (
              <Card 
                key={i} 
                card={card} 
                highlightInfo={highlightedCards[card.id] || null}
              />
            ))}
          </div>
          
          {playerBestHand && communityCards.length >= 3 && (
            <div className="text-center mb-4 p-4 rounded-lg bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-300">
              <p className="text-green-800 font-bold text-2xl mb-2">
                🏆 현재 최고 핸드: {playerBestHand.type}
              </p>
              <div className="text-sm text-green-700">
                핸드 강도: {handStrength.toFixed(1)}/100 • 
                예상 승률: {currentWinRate?.toFixed(1)}%
              </div>
              <div className="text-xs text-green-600 mt-2">
                ✨ 황색으로 강조된 카드들이 최고 핸드를 구성합니다
              </div>
            </div>
          )}
          
          {winner && (
            <div className="text-center mb-4 p-6 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300">
              <p className={`text-4xl font-bold mb-3 ${
                winner === 'player' ? 'text-green-600' : 
                winner === 'computer' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {winner === 'player' ? `🎉 승리! +${lastWinAmount.toLocaleString()} 칩` : 
                 winner === 'computer' ? '😔 패배' : '🤝 무승부'}
              </p>
              {winner === 'player' && currentStreak > 1 && (
                <div className="text-red-600 font-bold text-lg">
                  🔥 {currentStreak} 연승 중!
                </div>
              )}
            </div>
          )}

          {/* 🎯 개선된 베팅 인터페이스 */}
          {canBet && gameStage !== 'showdown' && (
            <div className="space-y-4">
              {showBetSlider && (
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-700">정확한 베팅량 설정</span>
                    <span className="text-2xl font-bold text-green-600">{customBetAmount.toLocaleString()} 칩</span>
                  </div>
                  <input
                    type="range"
                    min={currentBet === playerBet ? blinds.big : Math.max(currentBet - playerBet, blinds.big)}
                    max={Math.min(playerChips + playerBet, pot * 3)}
                    value={customBetAmount}
                    onChange={(e) => setCustomBetAmount(parseInt(e.target.value))}
                    className="w-full h-3 bg-gradient-to-r from-blue-200 to-green-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>최소: {currentBet === playerBet ? blinds.big : Math.max(currentBet - playerBet, blinds.big)}</span>
                    <span>최대: {Math.min(playerChips + playerBet, pot * 3).toLocaleString()}</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-center gap-3 flex-wrap">
                <button
                  onClick={() => handlePlayerAction('fold')}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-red-800 font-bold transition-all shadow-lg"
                >
                  폴드
                </button>
                
                {currentBet === playerBet ? (
                  <button
                    onClick={() => handlePlayerAction('check')}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-6 py-3 rounded-xl hover:from-gray-700 hover:to-gray-800 font-bold transition-all shadow-lg"
                  >
                    체크
                  </button>
                ) : (
                  <button
                    onClick={() => handlePlayerAction('call')}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 font-bold transition-all shadow-lg"
                  >
                    콜 ({(currentBet - playerBet).toLocaleString()})
                  </button>
                )}
                
                <button
                  onClick={() => setShowBetSlider(!showBetSlider)}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 font-bold transition-all shadow-lg flex items-center gap-2"
                >
                  <Calculator size={18} />
                  정밀 베팅
                </button>
                
                <button
                  onClick={() => handlePlayerAction('raise', customBetAmount)}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 font-bold transition-all shadow-lg"
                  disabled={playerChips < (customBetAmount - playerBet)}
                >
                  레이즈 ({customBetAmount.toLocaleString()})
                </button>
                
                <button
                  onClick={() => handlePlayerAction('raise', playerChips + playerBet)}
                  className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-6 py-3 rounded-xl hover:from-yellow-700 hover:to-yellow-800 font-bold transition-all shadow-lg flex items-center gap-2"
                  disabled={playerChips <= 0}
                >
                  <Zap size={18} />
                  올인
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 🎯 하단 컨트롤 패널 */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-xl">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              🎓 프로 포커 학습 도구
            </h3>
            <p className="text-gray-600">
              게임 스테이지: <span className="font-bold text-blue-600">{gameStage.toUpperCase()}</span>
              {gameStage !== 'preflop' && (
                <span className="ml-4">
                  🎯 {communityCards.length}/5 카드 공개
                </span>
              )}
            </p>
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all font-semibold"
            >
              <Trophy size={18} />
              리더보드
            </button>
            
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all font-semibold"
            >
              <HelpCircle size={18} />
              핸드 랭킹
            </button>
            
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-semibold"
            >
              <BarChart3 size={18} />
              상세 분석
            </button>
            
            <button
              onClick={() => setShowOutsCalculator(!showOutsCalculator)}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all font-semibold"
            >
              <Calculator size={18} />
              아웃츠 계산기
            </button>
            
            {/* 💰 광고 및 수익화 버튼들 */}
            <button
              onClick={() => setShowAdModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-semibold animate-pulse"
            >
              <Zap size={18} />
              💰 칩 충전
            </button>
            
            {!isPremium && (
              <button
                onClick={() => setShowPremiumModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all font-semibold border-2 border-yellow-300"
              >
                <Crown size={18} />
                프리미엄
              </button>
            )}
            
            <button
              onClick={() => setShowAchievements(!showAchievements)}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all font-semibold"
            >
              <Medal size={18} />
              성취 ({achievements.length})
            </button>
          </div>
        </div>

        {/* 확장 가능한 정보 패널들 */}
        {showHelp && (
          <div className="mt-6 bg-white rounded-xl p-6 shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">🎯 프로 포커 핸드 랭킹</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: '로얄 플러시', desc: '10-J-Q-K-A (같은 무늬)', odds: '0.000154%', emoji: '👑', color: 'from-purple-500 to-purple-600' },
                { name: '스트레이트 플러시', desc: '연속된 5장 (같은 무늬)', odds: '0.00139%', emoji: '🌟', color: 'from-blue-500 to-blue-600' },
                { name: '포카드', desc: '같은 숫자 4장', odds: '0.024%', emoji: '💎', color: 'from-green-500 to-green-600' },
                { name: '풀하우스', desc: '트리플 + 원페어', odds: '0.144%', emoji: '🏠', color: 'from-yellow-500 to-yellow-600' },
                { name: '플러시', desc: '같은 무늬 5장', odds: '0.197%', emoji: '🌊', color: 'from-cyan-500 to-cyan-600' },
                { name: '스트레이트', desc: '연속된 5장', odds: '0.392%', emoji: '📏', color: 'from-orange-500 to-orange-600' },
                { name: '트리플', desc: '같은 숫자 3장', odds: '2.11%', emoji: '🎯', color: 'from-red-500 to-red-600' },
                { name: '투페어', desc: '페어 2개', odds: '4.75%', emoji: '👥', color: 'from-pink-500 to-pink-600' },
                { name: '원페어', desc: '같은 숫자 2장', odds: '42.3%', emoji: '👫', color: 'from-indigo-500 to-indigo-600' },
                { name: '하이카드', desc: '아무것도 없을 때', odds: '50.1%', emoji: '🃏', color: 'from-gray-500 to-gray-600' }
              ].map((hand, i) => (
                <div key={i} className={`bg-gradient-to-r ${hand.color} text-white rounded-lg p-4 shadow-lg`}>
                  <div className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="text-2xl">{hand.emoji}</span>
                    <span>{i + 1}. {hand.name}</span>
                  </div>
                  <div className="text-sm opacity-90 mb-2">{hand.desc}</div>
                  <div className="text-xs bg-white/20 px-2 py-1 rounded">
                    출현 확률: {hand.odds}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {showHistory && (
          <div className="mt-6 bg-white rounded-xl p-6 shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">📊 프로급 게임 분석</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <History size={20} />
                  최근 게임 상세 리뷰
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {gameHistory.slice(0, 10).map((game, i) => (
                    <div key={game.id} className="border-2 rounded-lg p-4 bg-gradient-to-r from-gray-50 to-gray-100">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold">게임 #{gameHistory.length - i}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                            game.winner === 'player' ? 'bg-green-500 text-white' : 
                            game.winner === 'computer' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                          }`}>
                            {game.winner === 'player' ? '승리' : 
                             game.winner === 'computer' ? '패배' : '무승부'}
                          </span>
                          {game.learningMode !== 'normal' && (
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                              {game.learningMode.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-blue-600 font-bold mb-1">내 패</div>
                          <div className="flex gap-1 mb-1">
                            {game.playerCards.map((card, j) => (
                              <div key={j} className="w-6 h-8 bg-white border rounded text-xs flex items-center justify-center">
                                <span className={card.suit === '♥' || card.suit === '♦' ? 'text-red-600' : 'text-black'}>
                                  {card.rank}{card.suit}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="text-xs text-gray-600">핸드: {game.playerHand?.type}</div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-red-600 font-bold mb-1">상대 패</div>
                          <div className="flex gap-1 mb-1">
                            {game.computerCards.map((card, j) => (
                              <div key={j} className="w-6 h-8 bg-white border rounded text-xs flex items-center justify-center">
                                <span className={card.suit === '♥' || card.suit === '♦' ? 'text-red-600' : 'text-black'}>
                                  {card.rank}{card.suit}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="text-xs text-gray-600">핸드: {game.computerHand?.type}</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>팟: {game.potSize?.toLocaleString()}</span>
                        <span>승률: {game.preflopWinRate}% → {game.finalWinRate?.toFixed(1)}%</span>
                        {game.outsCount > 0 && <span>아웃츠: {game.outsCount}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Brain size={20} />
                  스킬 발전 분석
                </h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-3">📈 종합 성과</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>총 게임</span>
                        <span className="font-bold">{gamesPlayed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>승률</span>
                        <span className="font-bold text-green-600">
                          {gamesPlayed > 0 ? ((gamesWon / gamesPlayed) * 100).toFixed(1) : 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>최고 연승</span>
                        <span className="font-bold text-red-600">{maxStreak}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>총 수익</span>
                        <span className="font-bold text-yellow-600">{totalChipsWon.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-yellow-50 border-2 border-green-200 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 mb-3">🎯 스킬 레벨</h4>
                    <div className="space-y-2">
                      {Object.entries(learningProgress.skillPoints).map(([skill, points]) => (
                        <div key={skill}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="capitalize">{skill}</span>
                            <span>{points}/100</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(points, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAchievements && (
          <div className="mt-6 bg-white rounded-xl p-6 shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">🏆 성취 시스템</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.length > 0 ? achievements.map((achievement, i) => (
                <div key={i} className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="font-bold text-yellow-800">{achievement}</div>
                </div>
              )) : (
                <div className="col-span-full text-center text-gray-500 py-8">
                  아직 획득한 성취가 없습니다. 게임을 플레이해서 성취를 달성해보세요!
                </div>
              )}
            </div>
          </div>
        )}

        {/* 아웃츠 계산기 모달 */}
        {showOutsCalculator && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
                  <Calculator size={28} />
                  🧮 프로 아웃츠 계산기
                </h2>
                <button
                  onClick={() => setShowOutsCalculator(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* 현재 상황 요약 */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4">
                  <h3 className="font-bold text-purple-800 mb-3">📊 현재 상황</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>게임 스테이지: <span className="font-bold uppercase">{gameStage}</span></div>
                    <div>총 아웃츠: <span className="font-bold text-green-600">{drawOdds.count || 0}장</span></div>
                    <div>완성 확률: <span className="font-bold text-blue-600">{drawOdds.odds?.toFixed(1) || 0}%</span></div>
                    {potOdds > 0 && <div>팟 오즈: <span className="font-bold text-orange-600">{potOdds.toFixed(1)}%</span></div>}
                  </div>
                </div>

                {/* 아웃츠 상세 */}
                {currentOuts.length > 0 ? (
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                    <h3 className="font-bold text-gray-800 mb-3">🎯 아웃츠 상세</h3>
                    <div className="space-y-3">
                      {currentOuts.map((out, i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {out.type === '플러시' ? '🌊' : 
                               out.type === '스트레이트' ? '📏' :
                               out.type === '트리플' ? '🎯' : '👥'}
                            </span>
                            <span className="font-semibold">{out.type}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{out.count}장</div>
                            <div className="text-xs text-gray-500">
                              {gameStage === 'turn' ? (out.count * 2).toFixed(1) : (out.count * 4).toFixed(1)}% 확률
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center">
                    <p className="text-gray-600">현재 드로우할 수 있는 핸드가 없습니다.</p>
                    <p className="text-sm text-gray-500 mt-2">커뮤니티 카드가 3장 이상 공개되어야 아웃츠를 계산할 수 있습니다.</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowOutsCalculator(false)}
                className="w-full mt-6 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {/* 상세 분석 모달 */}
        {showAnalysis && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-6xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-orange-800 flex items-center gap-2">
                  <BarChart3 size={28} />
                  📊 프로급 상세 분석
                </h2>
                <button
                  onClick={() => setShowAnalysis(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 현재 핸드 실시간 분석 */}
                {handStrength > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
                    <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                      <Brain size={20} />
                      🧠 현재 핸드 AI 분석
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-white rounded-lg border-l-4 border-blue-500">
                        <p className={`font-medium ${
                          handStrength >= 80 ? 'text-green-600' :
                          handStrength >= 60 ? 'text-blue-600' :
                          handStrength >= 40 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {handStrength >= 80 ? '🔥 매우 강한 핸드입니다! 적극적인 플레이를 고려하세요.' :
                           handStrength >= 60 ? '💪 괜찮은 핸드입니다. 상황에 따라 베팅을 고려하세요.' :
                           handStrength >= 40 ? '⚠️ 보통 핸드입니다. 신중한 플레이가 필요합니다.' :
                           '🚨 약한 핸드입니다. 블러프가 아니라면 폴드를 고려하세요.'}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-1">
                          <Lightbulb size={16} />
                          추천 액션
                        </h4>
                        <p className="text-yellow-700 text-sm">
                          {handStrength >= 70 ? '🟢 적극적인 베팅 또는 레이즈' :
                           handStrength >= 50 ? '🟡 상황에 따라 콜 또는 체크' :
                           handStrength >= 30 ? '🟡 신중한 플레이, 블러프 고려' :
                           '🔴 폴드 고려, 또는 블러프 시도'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 게임 통계 */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                    <TrendingUp size={20} />
                    📈 종합 성과
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-2 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{gamesPlayed}</div>
                      <div className="text-xs text-green-500">총 게임</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {gamesPlayed > 0 ? ((gamesWon / gamesPlayed) * 100).toFixed(1) : 0}%
                      </div>
                      <div className="text-xs text-blue-500">승률</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{maxStreak}</div>
                      <div className="text-xs text-red-500">최고 연승</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{totalChipsWon.toLocaleString()}</div>
                      <div className="text-xs text-yellow-500">총 수익</div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowAnalysis(false)}
                className="w-full mt-6 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                닫기
              </button>
            </div>
          </div>
        )}

        {/* 🎯 푸터 정보 */}
        <footer className="mt-8 text-center text-green-200 text-sm">
          <p>🎓 프로 포커 플레이어의 길을 시작하세요! • AI 분석으로 실력을 빠르게 향상시키세요</p>
          <p className="mt-2">현재 모드: <span className="font-bold capitalize">{learningMode}</span> • AI 상대: <span className="font-bold capitalize">{aiPersonality}</span></p>
        </footer>

        {/* 플레이어 선택 모달 */}
        {showPlayerSelector && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-lg mx-4 shadow-2xl">
              <div className="text-center mb-6">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-blue-600" size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">플레이어 선택</h2>
                <p className="text-gray-600">기존 플레이어를 선택하거나 새 플레이어를 만드세요</p>
              </div>

              {getAllPlayers().length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">저장된 플레이어</h3>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {getAllPlayers().slice(0, 5).map((player, index) => (
                      <div 
                        key={player.nickname}
                        onClick={() => loadPlayer(player.nickname)}
                        className="flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <div>
                            <div className="font-bold">{player.nickname}</div>
                            <div className="text-sm text-gray-600">
                              칩: {(player.playerChips || 5000).toLocaleString()} | 
                              레벨: {player.playerLevel || 1} | 
                              승률: {player.gamesPlayed > 0 ? Math.round((player.gamesWon || 0) / player.gamesPlayed * 100) : 0}%
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(player.lastPlayed).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreatePlayer(true)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <Star size={18} />
                  새 플레이어
                </button>
                {getAllPlayers().length > 0 && (
                  <button
                    onClick={() => loadPlayer(getAllPlayers()[0].nickname)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold"
                  >
                    최근 플레이어로 계속
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 새 플레이어 생성 모달 */}
        {showCreatePlayer && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl">
              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-green-600" size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-2">새 플레이어 만들기</h2>
                <p className="text-gray-600 mb-6">닉네임을 입력하여 새로운 플레이어를 만드세요.</p>
                
                <input
                  type="text"
                  value={tempNickname}
                  onChange={(e) => setTempNickname(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && tempNickname.trim().length >= 2 && createNewPlayer(tempNickname.trim())}
                  placeholder="닉네임 입력 (2글자 이상)"
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 mb-4 text-center text-lg font-semibold focus:border-green-500 focus:outline-none"
                  maxLength={12}
                  autoFocus
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowCreatePlayer(false);
                      setTempNickname('');
                    }}
                    className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => {
                      setTempNickname('포커마스터' + Math.floor(Math.random() * 1000));
                    }}
                    className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                  >
                    랜덤
                  </button>
                  <button
                    onClick={() => {
                      if (tempNickname.trim().length >= 2) {
                        createNewPlayer(tempNickname.trim());
                        setShowCreatePlayer(false);
                        setTempNickname('');
                      }
                    }}
                    disabled={tempNickname.trim().length < 2}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    생성
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 💰 광고 모달 */}
        {showAdModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl">
              <div className="text-center">
                <Coins className="mx-auto text-yellow-500 mb-4" size={48} />
                <h2 className="text-2xl font-bold mb-2 text-gray-800">칩이 부족합니다!</h2>
                <p className="text-gray-600 mb-6">
                  계속 게임하려면 칩이 필요합니다.
                </p>
                
                <div className="space-y-3">
                  {!dailyChipsUsed && (
                    <button
                      onClick={claimDailyChips}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <Gift size={20} />
                      일일 무료 칩 (2,000개)
                    </button>
                  )}
                  
                  <button
                    onClick={watchAd}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <Play size={20} />
                    광고 보고 칩 받기 (800개)
                  </button>
                  
                  {!isPremium && (
                    <button
                      onClick={() => {
                        setShowAdModal(false);
                        setShowPremiumModal(true);
                      }}
                      className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-3 px-4 rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      <Crown size={20} />
                      프리미엄으로 업그레이드
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      setShowAdModal(false);
                      setPlayerChips(5000);
                      saveCurrentGameData();
                    }}
                    className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    무료로 칩 받기 (5,000개)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 💎 프리미엄 모달 */}
        {showPremiumModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-lg mx-4 shadow-2xl">
              <div className="text-center">
                <Crown className="mx-auto text-yellow-500 mb-4" size={48} />
                <h2 className="text-2xl font-bold mb-2 text-gray-800">프리미엄 업그레이드 ✨</h2>
                <p className="text-gray-600 mb-6">
                  더 나은 포커 학습 경험을 만나보세요!
                </p>
                
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-200 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-yellow-800 mb-4 text-lg">프리미엄 혜택</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-yellow-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span>무제한 칩 (광고 없음)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span>고급 AI 분석</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span>상세 통계 및 차트</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span>개인 맞춤 학습</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span>보너스 칩 5,000개</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-600" />
                      <span>프리미엄 배지</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={buyPremium}
                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-white py-4 px-6 rounded-lg hover:from-yellow-700 hover:to-yellow-800 transition-all font-bold text-lg"
                  >
                    월 $4.99로 업그레이드
                  </button>
                  
                  <button
                    onClick={() => setShowPremiumModal(false)}
                    className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors"
                  >
                    나중에
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProPokerMaster;