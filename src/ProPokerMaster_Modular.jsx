import React, { useState, useEffect } from 'react';
import { Shuffle, RefreshCw, HelpCircle, BarChart3, Book, History, TrendingUp, User, Bot, Coins, Play, Gift, Zap, GraduationCap, Target, Brain, Trophy, Crown, Star, Edit, AlertTriangle, CheckCircle, Award, Lightbulb, MessageSquare, Settings, Calculator, Eye, Shield, Flame, Clock, Gamepad2, Medal, ChevronUp, ChevronDown, Activity, PieChart, LineChart } from 'lucide-react';

// 모듈화된 imports
import { SUITS, RANKS, BLINDS, INITIAL_CHIPS, HAND_RANKINGS, LEARNING_MODES } from './constants/gameConstants.js';
import { createDeck, findBestHand, compareHands } from './utils/cardUtils.js';
import { calculateHandStrength, calculateOuts } from './utils/handAnalysis.js';
import { getAIAction, getTrainingFeedback } from './ai/aiLogic.js';
import { checkAchievements, saveStats, createGameResult } from './game/gameLogic.js';

// 컴포넌트 imports
import Card from './components/Card.jsx';
import NicknameModal from './components/NicknameModal.jsx';
import GameControls from './components/GameControls.jsx';

const ProPokerMaster = () => {
  // 기본 게임 상태
  const [deck, setDeck] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [communityCards, setCommunityCards] = useState([]);
  const [gameStage, setGameStage] = useState('preflop');
  const [playerBestHand, setPlayerBestHand] = useState(null);
  const [computerBestHand, setComputerBestHand] = useState(null);
  const [winner, setWinner] = useState(null);
  
  // 고급 분석 시스템
  const [currentOuts, setCurrentOuts] = useState([]);
  const [drawOdds, setDrawOdds] = useState({});
  const [handStrength, setHandStrength] = useState(0);
  const [highlightedCards, setHighlightedCards] = useState([]);
  const [potOdds, setPotOdds] = useState(0);
  
  // 학습 모드 시스템
  const [learningMode, setLearningMode] = useState('normal');
  const [aiPersonality, setAiPersonality] = useState('balanced');
  
  // 플레이어 시스템
  const [playerLevel, setPlayerLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  
  // UI 상태
  const [showHelp, setShowHelp] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showNicknameModal, setShowNicknameModal] = useState(false);
  
  // 자동 진행 시스템
  const [autoPlay, setAutoPlay] = useState(false);
  const [nextGameTimer, setNextGameTimer] = useState(null);
  const [timeToNextGame, setTimeToNextGame] = useState(0);
  
  // 게임 데이터
  const [gameHistory, setGameHistory] = useState([]);
  const [preflopWinRate, setPreflopWinRate] = useState(null);
  const [currentWinRate, setCurrentWinRate] = useState(null);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  
  // 학습 진행도
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
  
  // 베팅 시스템
  const [playerChips, setPlayerChips] = useState(INITIAL_CHIPS.player);
  const [computerChips, setComputerChips] = useState(INITIAL_CHIPS.computer);
  const [pot, setPot] = useState(0);
  const [currentBet, setCurrentBet] = useState(0);
  const [playerBet, setPlayerBet] = useState(0);
  const [computerBet, setComputerBet] = useState(0);
  const [customBetAmount, setCustomBetAmount] = useState(0);
  const [showBetSlider, setShowBetSlider] = useState(false);
  const [canBet, setCanBet] = useState(true);
  const [aiThinking, setAiThinking] = useState('');
  
  // 플레이어 정보
  const [playerNickname, setPlayerNickname] = useState('');
  const [tempNickname, setTempNickname] = useState('');
  const [totalChipsWon, setTotalChipsWon] = useState(0);
  const [lastWinAmount, setLastWinAmount] = useState(0);

  // 닉네임 저장 함수
  const saveNickname = () => {
    if (tempNickname.trim().length >= 2) {
      setPlayerNickname(tempNickname.trim());
      setShowNicknameModal(false);
      setTimeout(() => {
        startNewGame();
      }, 500);
    }
  };

  // 초기 로드
  useEffect(() => {
    if (!playerNickname) {
      setShowNicknameModal(true);
    } else {
      startNewGame();
    }
    
    return () => {
      if (nextGameTimer) {
        clearTimeout(nextGameTimer);
      }
    };
  }, []);
  
  // 게임 업데이트 시 분석 수행
  useEffect(() => {
    if (playerCards.length > 0 && communityCards.length >= 0) {
      const strength = calculateHandStrength(playerCards, communityCards);
      setHandStrength(strength);
      
      // 실시간 베스트 핸드 계산 및 카드 강조
      if (communityCards.length >= 3) {
        const allCards = [...playerCards, ...communityCards];
        const currentBestHand = findBestHand(allCards);
        setPlayerBestHand(currentBestHand);
        
        // 베스트 핸드를 구성하는 카드들의 ID 추출
        const bestHandCardIds = currentBestHand.cards.map(card => card.id);
        setHighlightedCards(bestHandCardIds);
        
        const outsData = calculateOuts(playerCards, communityCards, gameStage);
        setCurrentOuts(outsData.outs);
        setDrawOdds(outsData);
        
        // 팟 오즈 계산
        if (currentBet > 0) {
          const potOddsValue = (currentBet / (pot + currentBet)) * 100;
          setPotOdds(potOddsValue);
        }
      } else {
        setHighlightedCards([]);
        setPlayerBestHand(null);
      }
    }
  }, [playerCards, communityCards, currentBet, pot, gameStage]);

  const startNewGame = () => {
    if (!playerNickname) {
      setShowNicknameModal(true);
      return;
    }

    if (playerChips < BLINDS.big) {
      alert('칩이 부족합니다! 새로운 게임을 위해 칩을 보충합니다.');
      setPlayerChips(INITIAL_CHIPS.player);
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
    setCustomBetAmount(BLINDS.big * 2);
    setCurrentOuts([]);
    setDrawOdds({});
    
    // 블라인드 설정
    setPlayerBet(BLINDS.big);
    setComputerBet(BLINDS.small);
    setCurrentBet(BLINDS.big);
    setPot(BLINDS.small + BLINDS.big);
    setPlayerChips(prev => Math.max(prev - BLINDS.big, 0));
    setComputerChips(prev => prev - BLINDS.small);
    
    const preflopRate = calculateHandStrength(newPlayerCards, []);
    setPreflopWinRate(preflopRate);
    setCurrentWinRate(preflopRate);

    setLearningProgress(prev => ({
      ...prev,
      handsPlayed: prev.handsPlayed + 1
    }));
  };

  // 자동 게임 진행
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

  // 나머지 핵심 함수들 (handlePlayerAction, handleComputerAction, endGame 등)은
  // 기존 로직을 그대로 유지하되 모듈화된 함수들을 사용

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <header className="text-center mb-6">
          <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            🏆 프로 텍사스 홀덤 마스터 (모듈화 버전)
          </h1>
          <p className="text-green-200 text-xl mb-4">AI 분석 + 실시간 확률 + 프로 전략 학습</p>
        </header>

        {/* 팟 정보 */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-6 mb-6 shadow-2xl">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-900 mb-3">
              💰 팟: {pot.toLocaleString()} 칩
            </div>
          </div>
        </div>

        {/* 플레이어 카드 */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 shadow-xl border-2 border-green-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <User className="text-green-600" size={32} />
              <div>
                <span className="font-bold text-xl text-green-800">{playerNickname}</span>
                <div className="text-sm text-green-600">레벨 {playerLevel}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
              <Coins size={20} />
              <span className="font-semibold">{playerChips.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mb-6">
            {playerCards.map((card, i) => (
              <Card 
                key={i} 
                card={card} 
                isHighlighted={highlightedCards.includes(card.id)}
              />
            ))}
          </div>
          
          {playerBestHand && communityCards.length >= 3 && (
            <div className="text-center mb-4 p-4 rounded-lg bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-300">
              <p className="text-green-800 font-bold text-2xl mb-2">
                🏆 현재 최고 핸드: {playerBestHand.type}
              </p>
              <div className="text-sm text-green-700">
                핸드 강도: {handStrength.toFixed(1)}/100
              </div>
              <div className="text-xs text-green-600 mt-2">
                ✨ 황색으로 강조된 카드들이 최고 핸드를 구성합니다
              </div>
            </div>
          )}
        </div>

        {/* 커뮤니티 카드 */}
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
                    isHighlighted={highlightedCards.includes(card.id)}
                  />
                ))}
                {Array(5 - communityCards.length).fill().map((_, i) => (
                  <Card key={i + communityCards.length} card={{}} isHidden={true} />
                ))}
              </>
            )}
          </div>
          
          <GameControls 
            autoPlay={autoPlay}
            startNewGame={startNewGame}
            startAutoPlay={startAutoPlay}
            stopAutoPlay={stopAutoPlay}
            timeToNextGame={timeToNextGame}
            playerChips={playerChips}
            blinds={BLINDS}
          />
        </div>

        <NicknameModal
          showNicknameModal={showNicknameModal}
          tempNickname={tempNickname}
          setTempNickname={setTempNickname}
          saveNickname={saveNickname}
        />
      </div>
    </div>
  );
};

export default ProPokerMaster;