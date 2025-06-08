import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Users, Brain, TrendingUp, Target, Settings, Play, BarChart3, Calculator, Eye, Zap, Trophy, Star, ChevronRight, ChevronLeft, BookOpen, PieChart, Clock, Award, Gift, HelpCircle, Database, Gamepad2, LineChart, Activity, Users2, Lightbulb, FileText, Video, MessageCircle, AlertTriangle, CheckCircle, XCircle, ArrowUp, ArrowDown, X, Menu, Tv, RefreshCw, GraduationCap, Coins, Book, Wallet, CreditCard, Banknote, DollarSign, Plus, Minus, ShoppingCart, Lock, Puzzle, Share2, Calendar } from 'lucide-react';

// 🎯 기존 imports 그대로 유지
import { findBestHand } from './utils/cardUtils.js';
import Card from './components/Card.jsx';
import Player from './components/Player.jsx';
import AdSenseAd from './components/AdSenseAd.jsx';
import Announcement from './components/Announcement.jsx';

// 🚀 실제 컴포넌트들 import
import HoldemPuzzle from './components/holdem_puzzle.jsx';
import VaultSystem from './components/VaultSystem.jsx';

// 🚀 SEO 컴포넌트들 (실제 import 사용)
import SEOHead from './components/SEOHead.jsx';
import Navigation from './components/Navigation.jsx';
import BlogSection from './components/BlogSection.jsx';
import FAQ from './components/FAQ.jsx';
import PokerGlossary from './components/PokerGlossary.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import TermsOfService from './components/TermsOfService.jsx';
import ResponsibleGaming from './components/ResponsibleGaming.jsx';

// 🚀 새로운 칩 관련 상수들
const CHIP_DENOMINATIONS = {
  1: { color: '#ffffff', borderColor: '#cccccc', textColor: '#000000' },
  5: { color: '#ff4444', borderColor: '#cc0000', textColor: '#ffffff' },
  10: { color: '#4444ff', borderColor: '#0000cc', textColor: '#ffffff' },
  25: { color: '#44ff44', borderColor: '#00cc00', textColor: '#000000' },
  50: { color: '#ffaa00', borderColor: '#cc7700', textColor: '#000000' },
  100: { color: '#000000', borderColor: '#444444', textColor: '#ffffff' },
  500: { color: '#aa44ff', borderColor: '#7700cc', textColor: '#ffffff' },
  1000: { color: '#ffff44', borderColor: '#cccc00', textColor: '#000000' },
  5000: { color: '#ff44aa', borderColor: '#cc0077', textColor: '#ffffff' },
  10000: { color: '#44ffaa', borderColor: '#00cc77', textColor: '#000000' }
};

const BANK_PACKAGES = [
  { amount: 1000, price: '$0.99', bonus: 0, popular: false },
  { amount: 5000, price: '$4.99', bonus: 500, popular: false },
  { amount: 10000, price: '$9.99', bonus: 2000, popular: true },
  { amount: 25000, price: '$19.99', bonus: 7500, popular: false },
  { amount: 50000, price: '$39.99', bonus: 20000, popular: false },
  { amount: 100000, price: '$79.99', bonus: 50000, popular: false }
];

// 🎯 기존의 모든 상수들 그대로 유지
const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const SUIT_COLORS = { '♠': '#000', '♣': '#000', '♥': '#e53e3e', '♦': '#e53e3e' };
const BLINDS = { small: 10, big: 20 };

// 🎯 학습 모드 정의 (퍼즐 모드 추가) / Learning Modes Definition
const LEARNING_MODES = {
  probability: { 
    name: {
      ko: '확률 훈련',
      en: 'Probability Training'
    },
    icon: Calculator, 
    color: 'bg-blue-500',
    description: {
      ko: '팟 오즈, 아웃츠, 승률 계산을 마스터하세요',
      en: 'Master pot odds, outs, and win rate calculations'
    },
    tips: {
      ko: ['아웃츠를 정확히 세는 연습을 하세요', '팟 오즈와 승률을 비교하는 습관을 기르세요'],
      en: ['Practice counting outs accurately', 'Develop the habit of comparing pot odds and win rates']
    },
    theory: 'intermediate'
  },
  bluffing: { 
    name: {
      ko: '블러프 훈련',
      en: 'Bluff Training'
    },
    icon: Eye, 
    color: 'bg-purple-500',
    description: {
      ko: '언제, 어떻게 블러프할지 배우세요',
      en: 'Learn when and how to bluff effectively'
    },
    tips: {
      ko: ['상대방의 레인지를 고려하세요', '보드 텍스처에 따라 블러프 빈도를 조절하세요'],
      en: ['Consider your opponent\'s range', 'Adjust bluff frequency based on board texture']
    },
    theory: 'advanced'
  },
  position: { 
    name: {
      ko: '포지션 훈련',
      en: 'Position Training'
    },
    icon: Target, 
    color: 'bg-green-500',
    description: {
      ko: '포지션의 힘을 활용하는 법을 배우세요',
      en: 'Learn how to leverage the power of position'
    },
    tips: {
      ko: ['늦은 포지션에서 더 많은 핸드를 플레이하세요', '일찍 포지션에서는 강한 핸드만 플레이하세요'],
      en: ['Play more hands in late position', 'Play only strong hands in early position']
    },
    theory: 'beginner'
  },
  reading: { 
    name: {
      ko: '상대 읽기',
      en: 'Opponent Reading'
    },
    icon: Brain, 
    color: 'bg-orange-500',
    description: {
      ko: '상대방의 패턴과 텔을 파악하세요',
      en: 'Identify opponent patterns and tells'
    },
    tips: {
      ko: ['베팅 패턴을 주의깊게 관찰하세요', '상대방의 행동 변화를 감지하세요'],
      en: ['Carefully observe betting patterns', 'Detect changes in opponent behavior']
    },
    theory: 'intermediate'
  },
  // 🚀 새로운 퍼즐 모드 추가
  puzzle: {
    name: {
      ko: '홀덤 퍼즐',
      en: 'Holdem Puzzle'
    },
    icon: Puzzle,
    color: 'bg-purple-600',
    description: {
      ko: '올인 vs 폴드 - 판단력을 테스트하고 칩을 획득하세요',
      en: 'All-in vs Fold - Test your judgment and earn chips'
    },
    tips: {
      ko: ['핸드 강도를 정확히 판단하세요', '상대방의 가능한 핸드를 고려하세요'],
      en: ['Judge hand strength accurately', 'Consider opponent\'s possible hands']
    },
    theory: 'beginner',
    isSpecial: true
  },
  tournament: {
    name: {
      ko: '토너먼트 전략',
      en: 'Tournament Strategy'
    },
    icon: Trophy,
    color: 'bg-yellow-500',
    description: {
      ko: 'ICM과 스택 사이즈를 고려한 토너먼트 플레이',
      en: 'Tournament play considering ICM and stack sizes'
    },
    tips: {
      ko: ['블라인드 스틸을 적극 활용하세요', '버블 상황에서는 타이트하게 플레이하세요'],
      en: ['Actively utilize blind steals', 'Play tight during bubble situations']
    },
    theory: 'expert'
  },
  headsup: {
    name: {
      ko: '헤즈업',
      en: 'Heads-up'
    },
    icon: Users2,
    color: 'bg-red-500',
    description: {
      ko: '1대1 상황에서의 공격적 플레이',
      en: 'Aggressive play in one-on-one situations'
    },
    tips: {
      ko: ['더 넓은 레인지로 플레이하세요', '포지션을 최대한 활용하세요'],
      en: ['Play with a wider range', 'Maximize position advantage']
    },
    theory: 'expert'
  },
  multiway: {
    name: {
      ko: '멀티웨이 팟',
      en: 'Multiway Pot'
    },
    icon: Users,
    color: 'bg-teal-500',
    description: {
      ko: '3명 이상이 참여하는 복잡한 상황 대처',
      en: 'Handle complex situations with 3+ players'
    },
    tips: {
      ko: ['너트에 가까운 핸드만 플레이하세요', '블러프 빈도를 줄이세요'],
      en: ['Play only near-nuts hands', 'Reduce bluff frequency']
    },
    theory: 'advanced'
  },
  advanced: {
    name: {
      ko: 'GTO 훈련',
      en: 'GTO Training'
    },
    icon: Database,
    color: 'bg-indigo-500',
    description: {
      ko: '게임 이론적 최적 전략을 학습하세요',
      en: 'Learn Game Theory Optimal strategies'
    },
    tips: {
      ko: ['밸런싱의 중요성을 이해하세요', '상대방의 실수를 익스플로잇하세요'],
      en: ['Understand the importance of balancing', 'Exploit opponent mistakes']
    },
    theory: 'master'
  },
  ai_battle: {
    name: {
      ko: 'AI 대전',
      en: 'AI Battle'
    },
    icon: Gamepad2,
    color: 'bg-red-600',
    description: {
      ko: '다양한 AI 스타일과 실전 대결',
      en: 'Real battles against various AI styles'
    },
    tips: {
      ko: ['각 AI의 플레이 패턴을 파악하세요', '상황에 맞는 전략을 사용하세요'],
      en: ['Identify each AI\'s play patterns', 'Use situation-appropriate strategies']
    },
    theory: 'practice',
    isCompetitive: true
  }
};

// 🎯 Educational Loading Tips System - 포커 팁 및 용어 설명
const POKER_LOADING_TIPS = {
  basic: [
    {
      title: "핸드 랭킹 기초",
      tip: "로얄 플러시가 가장 강한 핸드입니다. A-K-Q-J-10 같은 무늬로 구성됩니다.",
      category: "기초",
      icon: "👑"
    },
    {
      title: "팟 오즈란?",
      tip: "팟 오즈는 현재 팟 크기 대비 베팅 금액의 비율입니다. 수학적 결정의 기초가 됩니다.",
      category: "수학",
      icon: "🔢"
    },
    {
      title: "포지션의 힘",
      tip: "늦은 포지션(버튼, 컷오프)에서는 더 많은 정보를 가지고 결정할 수 있어 유리합니다.",
      category: "전략",
      icon: "📍"
    },
    {
      title: "블라인드란?",
      tip: "스몰 블라인드와 빅 블라인드는 강제 베팅으로, 게임에 액션을 만들어냅니다.",
      category: "기초",
      icon: "💰"
    },
    {
      title: "콜과 레이즈",
      tip: "콜은 같은 금액을 베팅하는 것, 레이즈는 더 많은 금액을 베팅하는 공격적인 액션입니다.",
      category: "기초",
      icon: "⚡"
    }
  ],
  intermediate: [
    {
      title: "세미블러프",
      tip: "현재는 약하지만 개선될 가능성이 있는 핸드로 베팅하는 전략입니다. 플러시 드로우가 대표적입니다.",
      category: "고급 전략",
      icon: "🎯"
    },
    {
      title: "임플라이드 오즈",
      tip: "현재 팟 오즈에 향후 획득할 수 있는 추가 베팅을 고려한 확률입니다.",
      category: "수학",
      icon: "📈"
    },
    {
      title: "C-벳이란?",
      tip: "컨티뉴에이션 베팅은 프리플롭 레이저가 플롭에서 계속 베팅하는 것입니다.",
      category: "고급 전략",
      icon: "🔄"
    },
    {
      title: "아웃츠 계산",
      tip: "플러시 드로우는 9개, 오픈엔디드 스트레이트는 8개의 아웃츠를 가집니다.",
      category: "수학",
      icon: "🧮"
    },
    {
      title: "밸류 베팅",
      tip: "더 약한 핸드로부터 콜을 받기 위해 강한 핸드로 베팅하는 것이 밸류 베팅입니다.",
      category: "고급 전략",
      icon: "💎"
    }
  ],
  advanced: [
    {
      title: "GTO vs 익스플로잇",
      tip: "게임 이론적 최적 전략(GTO)은 밸런스된 플레이, 익스플로잇은 상대의 약점을 공략하는 전략입니다.",
      category: "고급 이론",
      icon: "🧠"
    },
    {
      title: "레인지 구성",
      tip: "각 포지션과 상황에 맞는 핸드 레인지를 구성하고 밸런스를 맞추는 것이 중요합니다.",
      category: "고급 이론",
      icon: "📊"
    },
    {
      title: "블러프 캐처",
      tip: "상대의 블러프를 잡을 수 있는 중간 강도의 핸드로, 신중한 판단이 필요합니다.",
      category: "고급 전략",
      icon: "🕵️"
    },
    {
      title: "오버베팅",
      tip: "팟보다 큰 베팅으로, 강한 핸드의 밸류를 극대화하거나 효과적인 블러프에 사용됩니다.",
      category: "고급 전략",
      icon: "🚀"
    },
    {
      title: "ICM 고려사항",
      tip: "토너먼트에서는 Independent Chip Model을 고려해 칩의 가치가 달라짐을 이해해야 합니다.",
      category: "토너먼트",
      icon: "🏆"
    }
  ],
  psychology: [
    {
      title: "틸트 관리",
      tip: "감정적 동요는 판단력을 흐리게 합니다. 냉정함을 유지하는 것이 성공의 열쇠입니다.",
      category: "심리 관리",
      icon: "🧘"
    },
    {
      title: "배드비트 극복",
      tip: "배드비트는 포커의 일부입니다. 장기적 관점에서 올바른 결정에 집중하세요.",
      category: "심리 관리",
      icon: "💪"
    },
    {
      title: "상대 관찰",
      tip: "상대의 베팅 패턴, 타이밍, 바디랭귀지를 주의깊게 관찰하여 정보를 수집하세요.",
      category: "심리 관리",
      icon: "👁️"
    }
  ]
};

// 🎓 Educational terminology explanations during waiting
const POKER_TERMINOLOGY_TIPS = [
  {
    term: "너츠 (Nuts)",
    definition: "주어진 보드에서 가능한 가장 강한 핸드",
    example: "A-K-Q-J-10 보드에서 10을 가지고 있으면 브로드웨이 스트레이트로 너츠입니다.",
    icon: "🥇"
  },
  {
    term: "브로드웨이",
    definition: "A-K-Q-J-10으로 이루어진 가장 높은 스트레이트",
    example: "모든 카드가 10 이상인 카드들을 브로드웨이 카드라고 부릅니다.",
    icon: "🌟"
  },
  {
    term: "휠 (Wheel)",
    definition: "A-2-3-4-5로 이루어진 가장 낮은 스트레이트",
    example: "에이스가 1로 사용되는 유일한 경우입니다.",
    icon: "🎡"
  },
  {
    term: "거츠샷",
    definition: "스트레이트 완성을 위해 가운데 한 장이 필요한 드로우",
    example: "7-9를 가지고 있고 보드에 5-6이 있으면 8이 나와야 스트레이트가 완성됩니다.",
    icon: "🎯"
  },
  {
    term: "셋 마이닝",
    definition: "포켓 페어로 셋을 만들기 위해 저렴하게 플롭을 보는 전략",
    example: "22로 플롭을 저렴하게 본 후 2가 나오면 셋을 만들 수 있습니다.",
    icon: "⛏️"
  }
];

// 학습 이론 및 전략
const POKER_THEORY = {
  beginner: {
    name: '초보자',
    theories: [
      {
        title: '핸드 선택 (Starting Hands)',
        content: '포커에서 가장 중요한 것은 어떤 핸드로 플레이할지 결정하는 것입니다.',
        details: [
          'AA, KK, QQ, JJ는 프리미엄 핸드로 항상 레이즈하세요',
          'AK, AQ는 강한 핸드이지만 언페어드이므로 주의하세요',
          '포지션이 늦을수록 더 많은 핸드를 플레이할 수 있습니다',
          '초보자는 타이트하게 플레이하는 것이 좋습니다'
        ]
      },
      {
        title: '포지션의 중요성',
        content: '포지션은 포커에서 가장 중요한 요소 중 하나입니다.',
        details: [
          '버튼(딜러) 포지션이 가장 유리합니다',
          '늦은 포지션에서는 상대방의 액션을 본 후 결정할 수 있습니다',
          '일찍 포지션에서는 강한 핸드만 플레이하세요',
          '포지션이 좋을 때는 블러프 기회가 많아집니다'
        ]
      }
    ]
  },
  intermediate: {
    name: '중급자',
    theories: [
      {
        title: '팟 오즈와 임플라이드 오즈',
        content: '수학적 계산을 통해 올바른 결정을 내리는 방법입니다.',
        details: [
          '팟 오즈 = 콜 금액 / (팟 + 콜 금액)',
          '승률이 팟 오즈보다 높으면 수익적입니다',
          '임플라이드 오즈는 미래 베팅까지 고려한 개념입니다',
          '드로우 핸드에서는 아웃츠를 정확히 계산하세요'
        ]
      }
    ]
  },
  advanced: {
    name: '상급자',
    theories: [
      {
        title: '밸런싱과 블러프',
        content: '벨류 핸드와 블러프 핸드의 균형을 맞추는 것입니다.',
        details: [
          '같은 액션을 벨류 핸드와 블러프 핸드 모두로 해야 합니다',
          '블러프 빈도는 상대방의 폴드 빈도와 팟 오즈에 따라 결정됩니다'
        ]
      }
    ]
  },
  master: {
    name: '마스터',
    theories: [
      {
        title: 'GTO (Game Theory Optimal)',
        content: '게임 이론적으로 최적화된 플레이 방식입니다.',
        details: [
          'GTO 전략은 상대방이 어떻게 플레이하든 최소 손실을 보장합니다',
          '솔버를 이용해 각 상황별 최적 전략을 학습하세요'
        ]
      }
    ]
  }
};

// 다국어 지원
const LANGUAGES = {
  ko: {
    name: '한국어',
    flag: '🇰🇷',
    ui: {
      // 메뉴
      title: '홀덤마스터',
      subtitle: '프로 포커 플레이어 양성 시스템',
      description: '실전과 똑같은 환경에서 체계적으로 학습하세요',
      feedbackLevel: '피드백 수준 설정',
      feedbackDesc: '학습 경험에 맞는 피드백을 받아보세요',
      theoryStudy: '이론 학습',
      learningModes: '학습 모드 선택',
      language: '언어',
      nickname: '닉네임',
      welcomeMessage: '안녕하세요, {nickname}님!',
      
      // 게임
      communityCards: '커뮤니티 카드',
      gameLog: '게임 로그',
      learningProgress: '학습 진행',
      realTimeAnalysis: '실시간 분석',
      currentHand: '현재 핸드',
      potOdds: '팟 오즈',
      thisSession: '이번 세션',
      winRate: '승률',
      profit: '수익',
      hands: '핸드',
      
      // 액션
      fold: '폴드',
      check: '체크', 
      call: '콜',
      raise: '레이즈',
      allin: '올인',
      cancel: '취소',
      bet: '베팅',
      save: '저장',
      
      // 로그 메시지
      newSessionStarted: '새로운 학습 세션이 시작되었습니다!',
      mode: '모드',
      blinds: '스몰/빅 블라인드',
      feedbackLevelSet: '피드백 수준',
      players: '플레이어',
      handDealt: '당신의 핸드가 배급되었습니다!',
      
      // 유튜브 자료
      youtubeResources: '유튜브 학습 자료',
      pokerBasics: '포커 기초',
      advanced: '고급 전략',
      tournaments: '토너먼트',
      psychology: '심리학',
      
      // 교육 면책조항
      educationalTitle: '📚 교육 목적 전용 플랫폼',
      appPurpose: '✅ 이 앱은 교육용입니다',
      purposeList: [
        '• 포커 이론과 전략 학습',
        '• 확률 계산 연습',
        '• 의사결정 능력 향상',
        '• 수학적 사고력 개발',
        '• 게임 이론 학습'
      ],
      notGambling: '❌ 실제 도박이 아닙니다',
      notGamblingList: [
        '• 실제 돈을 사용하지 않음',
        '• 가상 칩만 사용',
        '• 현금 지급 없음',
        '• 도박 유도 없음',
        '• 순수 학습 목적'
      ],
      learningGoals: '🎓 학습 목표 및 혜택',
      goalDescription: '홀덤마스터 프로는 포커의 수학적 원리와 전략적 사고를 학습할 수 있는 교육 플랫폼입니다. AI 기반 피드백 시스템을 통해 확률 계산, 위험 관리, 의사결정 과정을 체계적으로 학습하여 논리적 사고력과 수학적 분석 능력을 향상시킬 수 있습니다. 모든 칩은 가상이며, 실제 가치가 없는 학습 도구로만 사용됩니다.',
      ageRestriction: '만 18세 이상만 이용 가능 • 책임감 있는 학습 권장 • 실제 도박과 무관',
      
      // 가상 칩 시스템
      virtualChipTitle: '🪙 가상 칩 시스템 - 학습 도구 설명',
      virtualChipDesc: '아래 칩은 모두 가상 화폐로, 실제 가치가 없는 학습 도구입니다. 포커의 베팅 구조와 자금 관리를 연습하기 위한 교육용 시뮬레이션입니다.',
      virtualChipsLabel: '가상 칩 (학습용)',
      learningVault: '학습 금고',
      virtualChipRecharge: '가상 칩 충전 (무료)',
      
      // 게임 통계
      handsWon: '승리한 핸드',
      learningScore: '학습 점수',
      gameMode: '🎮 교육용 게임 모드',
      modeGoals: '🧠 각 모드별 학습 목표',
      puzzleMode: '퍼즐 모드: 빠른 의사결정과 확률 직감 향상',
      basicMode: '기본 모드: 홀덤 룰과 핸드 랭킹 학습',
      advancedMode: '고급 모드: 전략적 사고와 GTO 이론 적용',
      virtualChipEarn: '가상 칩 획득 (학습용)',
      
      // 추가 UI 요소들
      yourTurn: '당신의 턴',
      holdingChips: '보유 칩',
      reset: '초기화',
      selectChipsToBet: '배팅할 칩을 선택하세요',
      cancelSelection: '선택 취소',
      chargeChipsByAd: '광고 시청으로 칩 충전',
      adViewingComplete: '광고 시청 완료',
      close: '닫기',
      insufficientChips: '칩이 부족합니다!',
      chargeFromVault: '무료 금고에서 칩을 충전하거나 퍼즐 게임을 플레이하세요.',
      proChallenge: '프로 포커 플레이어 도전!',
      congratulations: '축하합니다! 당신의 포커 실력이 프로 수준에 도달했습니다.',
      currentPerformance: '현재 성과',
      totalProfit: '총 수익',
      winStreak: '연승',
      continueLeaning: '계속 학습하기',
      challengePro: '프로 도전하기!',
      holdemPuzzleTitle: '홀덤 퍼즐 🔥',
      puzzleDescription: '올인 vs 폴드 - 판단력을 테스트하고 학습용 가상 칩을 획득하세요!'
    }
  },
  en: {
    name: 'English',
    flag: '🇺🇸',
    ui: {
      // 메뉴
      title: 'Holdem Master',
      subtitle: 'Professional Poker Player Training System',
      description: 'Learn systematically in a real-game environment',
      feedbackLevel: 'Feedback Level Settings',
      feedbackDesc: 'Get feedback tailored to your learning experience',
      theoryStudy: 'Theory Study',
      learningModes: 'Learning Mode Selection',
      language: 'Language',
      nickname: 'Nickname',
      welcomeMessage: 'Welcome, {nickname}!',
      
      // 게임
      communityCards: 'Community Cards',
      gameLog: 'Game Log',
      learningProgress: 'Learning Progress',
      realTimeAnalysis: 'Real-time Analysis',
      currentHand: 'Current Hand',
      potOdds: 'Pot Odds',
      thisSession: 'This Session',
      winRate: 'Win Rate',
      profit: 'Profit',
      hands: 'Hands',
      
      // 액션
      fold: 'Fold',
      check: 'Check',
      call: 'Call', 
      raise: 'Raise',
      allin: 'All-in',
      cancel: 'Cancel',
      bet: 'Bet',
      save: 'Save',
      
      // 로그 메시지
      newSessionStarted: 'New learning session started!',
      mode: 'Mode',
      blinds: 'Small/Big Blinds',
      feedbackLevelSet: 'Feedback Level',
      players: 'Players',
      handDealt: 'Your hand has been dealt!',
      
      // 유튜브 자료
      youtubeResources: 'YouTube Learning Resources',
      pokerBasics: 'Poker Basics',
      advanced: 'Advanced Strategy', 
      tournaments: 'Tournaments',
      psychology: 'Psychology',
      
      // 교육 면책조항
      educationalTitle: '📚 Educational Platform Only',
      appPurpose: '✅ This App is Educational',
      purposeList: [
        '• Learn poker theory and strategy',
        '• Practice probability calculations',
        '• Improve decision-making skills',
        '• Develop mathematical thinking',
        '• Study game theory'
      ],
      notGambling: '❌ This is NOT Real Gambling',
      notGamblingList: [
        '• No real money used',
        '• Virtual chips only',
        '• No cash payouts',
        '• No gambling promotion',
        '• Pure educational purpose'
      ],
      learningGoals: '🎓 Learning Goals & Benefits',
      goalDescription: 'Holdem Master Pro is an educational platform where you can learn the mathematical principles and strategic thinking of poker. Through our AI-based feedback system, you can systematically learn probability calculation, risk management, and decision-making processes to improve logical thinking and mathematical analysis skills. All chips are virtual and have no real value - they are educational tools only.',
      ageRestriction: '18+ only • Responsible learning recommended • Not related to real gambling',
      
      // 가상 칩 시스템
      virtualChipTitle: '🪙 Virtual Chip System - Educational Tool Description',
      virtualChipDesc: 'All chips below are virtual currency with no real value, serving as educational tools. They are used for educational simulation to practice poker betting structure and bankroll management.',
      virtualChipsLabel: 'Virtual Chips (Educational)',
      learningVault: 'Learning Vault',
      virtualChipRecharge: 'Virtual Chip Recharge (Free)',
      
      // 게임 통계
      handsWon: 'Hands Won',
      learningScore: 'Learning Score',
      gameMode: '🎮 Educational Game Modes',
      modeGoals: '🧠 Learning Goals by Mode',
      puzzleMode: 'Puzzle Mode: Quick decision-making and probability intuition',
      basicMode: 'Basic Mode: Texas Hold\'em rules and hand rankings',
      advancedMode: 'Advanced Mode: Strategic thinking and GTO theory application',
      virtualChipEarn: 'Virtual Chips Earned (Educational)',
      
      // 추가 UI 요소들
      yourTurn: 'Your Turn',
      holdingChips: 'Holdings',
      reset: 'Reset',
      selectChipsToBet: 'Select chips to bet',
      cancelSelection: 'Cancel Selection',
      chargeChipsByAd: 'Charge chips by watching ads',
      adViewingComplete: 'Ad viewing complete',
      close: 'Close',
      insufficientChips: 'Insufficient chips!',
      chargeFromVault: 'Charge from free vault or play puzzle game.',
      proChallenge: 'Pro Poker Player Challenge!',
      congratulations: 'Congratulations! Your poker skills have reached pro level.',
      currentPerformance: 'Current Performance',
      totalProfit: 'Total Profit',
      winStreak: 'Win Streak',
      continueLeaning: 'Continue Learning',
      challengePro: 'Challenge Pro!',
      holdemPuzzleTitle: 'Holdem Puzzle 🔥',
      puzzleDescription: 'All-in vs Fold - Test your judgment and earn educational virtual chips!'
    }
  }
};

// 피드백 수준 정의 / Feedback Levels Definition
const FEEDBACK_LEVELS = {
  beginner: {
    name: {
      ko: '초보자',
      en: 'Beginner'
    },
    description: {
      ko: '기본적인 핸드 정보와 간단한 조언',
      en: 'Basic hand information and simple advice'
    },
    icon: '🌱',
    tips: {
      fold: {
        ko: '폴드는 나쁜 핸드를 포기하는 것입니다. 손실을 줄이는 현명한 선택이에요!',
        en: 'Folding means giving up a bad hand. It\'s a wise choice to minimize losses!'
      },
      call: {
        ko: '콜은 상대의 베팅에 맞춰 참여하는 것입니다. 괜찮은 핸드가 있을 때 사용하세요.',
        en: 'Calling means matching the opponent\'s bet. Use it when you have a decent hand.'
      },
      raise: {
        ko: '레이즈는 공격적인 플레이입니다. 강한 핸드가 있거나 블러프할 때 사용해보세요!',
        en: 'Raising is aggressive play. Use it when you have a strong hand or want to bluff!'
      },
      check: {
        ko: '체크는 베팅 없이 넘어가는 것입니다. 핸드가 애매할 때 안전한 선택이에요.',
        en: 'Checking means passing without betting. It\'s a safe choice when your hand is uncertain.'
      }
    }
  },
  intermediate: {
    name: {
      ko: '중수',
      en: 'Intermediate'
    },
    description: {
      ko: '포지션과 팟 오즈를 고려한 조언',
      en: 'Advice considering position and pot odds'
    },
    icon: '🎯',
    tips: {
      fold: {
        ko: '현재 팟 오즈와 핸드 강도를 비교해보세요. 수학적으로 맞지 않다면 폴드가 정답입니다.',
        en: 'Compare current pot odds with hand strength. If mathematically incorrect, folding is the right answer.'
      },
      call: {
        ko: '상대의 베팅 패턴과 보드 텍스처를 분석해보세요. 드로우가 있다면 임플라이드 오즈도 고려하세요.',
        en: 'Analyze opponent\'s betting patterns and board texture. Consider implied odds if you have draws.'
      },
      raise: {
        ko: '밸류 베팅인지 블러프인지 명확히 하세요. 상대의 레인지를 좁히는 효과도 있습니다.',
        en: 'Clarify whether it\'s a value bet or bluff. It also narrows opponent\'s range.'
      },
      check: {
        ko: '포지션이 중요합니다. 인포메이션을 얻거나 팟 컨트롤을 위한 체크를 고려해보세요.',
        en: 'Position is important. Consider checking for information or pot control.'
      }
    }
  },
  advanced: {
    name: {
      ko: '고수',
      en: 'Advanced'
    },
    description: {
      ko: '레인지와 GTO 전략 기반 분석',
      en: 'Range and GTO strategy-based analysis'
    },
    icon: '🎓',
    tips: {
      fold: {
        ko: '상대의 3벳 레인지를 고려했을 때 여러분의 핸드가 어느 정도 에퀴티를 가지는지 분석해보세요.',
        en: 'Analyze how much equity your hand has against opponent\'s 3-bet range.'
      },
      call: {
        ko: '디펜딩 레인지와 블러프 캐쳐를 고려하세요. 상대의 밸류:블러프 비율을 추정해보세요.',
        en: 'Consider defending range and bluff catchers. Estimate opponent\'s value:bluff ratio.'
      },
      raise: {
        ko: '밸런스드 레인지를 유지하면서 상대를 익스플로잇할 수 있는 스팟인지 판단하세요.',
        en: 'Determine if this is a spot to exploit opponents while maintaining a balanced range.'
      },
      check: {
        ko: '체크-콜, 체크-레이즈, 체크-폴드 중 어떤 라인이 최적인지 보드 텍스처와 함께 고려하세요.',
        en: 'Consider which line is optimal: check-call, check-raise, or check-fold, along with board texture.'
      }
    }
  },
  master: {
    name: {
      ko: '마스터',
      en: 'Master'
    },
    description: {
      ko: '고급 수학적 분석과 심리 게임',
      en: 'Advanced mathematical analysis and psychological gameplay'
    },
    icon: '👑',
    tips: {
      fold: {
        ko: 'MDF(Minimum Defense Frequency)를 계산하고 상대의 익스플로잇 가능성을 분석했나요?',
        en: 'Have you calculated MDF (Minimum Defense Frequency) and analyzed opponent\'s exploit potential?'
      },
      call: {
        ko: '상대의 스택 깊이와 SPR을 고려한 플레이인지, 그리고 리버에서의 플레이어빌리티는 어떤지 판단하세요.',
        en: 'Consider opponent\'s stack depth and SPR, and assess river playability.'
      },
      raise: {
        ko: '상대의 텔과 베팅 사이징을 통해 핸드 레인지를 좁혔나요? 메타게임 요소도 고려하세요.',
        en: 'Have you narrowed hand range through opponent tells and bet sizing? Consider metagame elements.'
      },
      check: {
        ko: '레벨링과 상대방의 사고 과정을 역추적해보세요. 게임플로우와 이미지도 중요합니다.',
        en: 'Consider leveling and reverse-engineer opponent\'s thought process. Game flow and image matter.'
      }
    }
  }
};

// 덱 생성 및 셔플
const createDeck = () => {
  const deck = [];
  SUITS.forEach(suit => {
    RANKS.forEach((rank, index) => {
      deck.push({ suit, rank, value: index + 2, id: `${suit}${rank}` });
    });
  });
  return deck;
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
  if (cards.length < 5) return { rank: 0, description: 'Incomplete hand', value: 0 };
  
  const allCombinations = getCombinations(cards, 5);
  let bestHand = { rank: 0, description: 'High Card', value: 0 };
  
  allCombinations.forEach(combo => {
    const hand = analyzeHand(combo);
    if (hand.rank > bestHand.rank || (hand.rank === bestHand.rank && hand.value > bestHand.value)) {
      bestHand = hand;
      bestHand.cards = combo;
    }
  });
  
  return bestHand;
};

const getCombinations = (arr, k) => {
  if (k === 1) return arr.map(x => [x]);
  const combinations = [];
  for (let i = 0; i <= arr.length - k; i++) {
    const head = arr[i];
    const tailCombos = getCombinations(arr.slice(i + 1), k - 1);
    tailCombos.forEach(combo => combinations.push([head, ...combo]));
  }
  return combinations;
};

const analyzeHand = (cards) => {
  const sortedCards = [...cards].sort((a, b) => b.value - a.value);
  const suits = cards.map(c => c.suit);
  const values = cards.map(c => c.value);
  
  const isFlush = suits.every(suit => suit === suits[0]);
  const isStraight = checkStraight(values);
  const valueCounts = getValueCounts(values);
  
  if (isStraight && isFlush) {
    if (values.includes(14) && values.includes(13)) 
      return { rank: 9, description: 'Royal Flush', value: 9000000 };
    return { rank: 8, description: 'Straight Flush', value: 8000000 + Math.max(...values) };
  }
  
  if (valueCounts.four) 
    return { rank: 7, description: 'Four of a Kind', value: 7000000 + valueCounts.fourValue * 1000 };
  
  if (valueCounts.three && valueCounts.pair) 
    return { rank: 6, description: 'Full House', value: 6000000 + valueCounts.threeValue * 1000 + valueCounts.pairValue };
  
  if (isFlush) 
    return { rank: 5, description: 'Flush', value: 5000000 + values.reduce((a, b) => a + b, 0) };
  
  if (isStraight) 
    return { rank: 4, description: 'Straight', value: 4000000 + Math.max(...values) };
  
  if (valueCounts.three) 
    return { rank: 3, description: 'Three of a Kind', value: 3000000 + valueCounts.threeValue * 1000 };
  
  if (valueCounts.twoPair) 
    return { rank: 2, description: 'Two Pair', value: 2000000 + valueCounts.pairValues[0] * 100 + valueCounts.pairValues[1] };
  
  if (valueCounts.pair) 
    return { rank: 1, description: 'One Pair', value: 1000000 + valueCounts.pairValue * 1000 };
  
  return { rank: 0, description: 'High Card', value: values.reduce((a, b) => a + b, 0) };
};

const checkStraight = (values) => {
  const sorted = [...new Set(values)].sort((a, b) => a - b);
  if (sorted.length < 5) return false;
  
  for (let i = 0; i <= sorted.length - 5; i++) {
    let consecutive = true;
    for (let j = 1; j < 5; j++) {
      if (sorted[i + j] !== sorted[i] + j) {
        consecutive = false;
        break;
      }
    }
    if (consecutive) return true;
  }
  
  // A-2-3-4-5 straight
  if (sorted.includes(14) && sorted.includes(2) && sorted.includes(3) && sorted.includes(4) && sorted.includes(5)) {
    return true;
  }
  
  return false;
};

const getValueCounts = (values) => {
  const counts = {};
  values.forEach(value => counts[value] = (counts[value] || 0) + 1);
  const countEntries = Object.entries(counts).map(([val, count]) => ({ value: parseInt(val), count }));
  
  const result = {
    four: false, three: false, pair: false, twoPair: false,
    pairValues: [], fourValue: 0, threeValue: 0, pairValue: 0
  };
  
  countEntries.forEach(({ value, count }) => {
    if (count === 4) {
      result.four = true;
      result.fourValue = value;
    } else if (count === 3) {
      result.three = true;
      result.threeValue = value;
    } else if (count === 2) {
      if (result.pair) {
        result.twoPair = true;
        result.pairValues.push(value);
      } else {
        result.pair = true;
        result.pairValue = value;
        result.pairValues.push(value);
      }
    }
  });
  
  result.pairValues.sort((a, b) => b - a);
  return result;
};

// 아웃츠 및 확률 계산
const calculateOuts = (playerCards, communityCards) => {
  const allCards = [...playerCards, ...communityCards];
  const currentHand = evaluateHand(allCards);
  
  let outs = 0;
  const usedCards = new Set(allCards.map(c => c.id));
  const deck = createDeck().filter(c => !usedCards.has(c.id));
  
  deck.forEach(card => {
    const newHand = evaluateHand([...allCards, card]);
    if (newHand.rank > currentHand.rank || 
        (newHand.rank === currentHand.rank && newHand.value > currentHand.value)) {
      outs++;
    }
  });
  
  return Math.min(outs, 47);
};

const calculateWinProbability = (outs, street) => {
  const cardsLeft = street === 'flop' ? 2 : street === 'turn' ? 1 : 0;
  const unknownCards = 47;
  
  if (cardsLeft === 2) {
    return Math.round(((outs / unknownCards) + ((outs - 1) / (unknownCards - 1))) * 100 * 0.8);
  } else if (cardsLeft === 1) {
    return Math.round((outs / unknownCards) * 100);
  }
  
  return 0;
};

// AI 스타일 및 의사결정
const AI_STYLES = {
  tight: { 
    name: '타이트', 
    vpip: 0.18, pfr: 0.14, aggression: 0.35, bluffFreq: 0.15,
    color: 'bg-blue-500'
  },
  loose: { 
    name: '루즈', 
    vpip: 0.45, pfr: 0.28, aggression: 0.55, bluffFreq: 0.4,
    color: 'bg-red-500'
  },
  aggressive: { 
    name: '공격적', 
    vpip: 0.32, pfr: 0.25, aggression: 0.85, bluffFreq: 0.6,
    color: 'bg-orange-500'
  },
  pro: { 
    name: '프로', 
    vpip: 0.25, pfr: 0.18, aggression: 0.65, bluffFreq: 0.35,
    color: 'bg-purple-500'
  }
};

const getHandString = (cards) => {
  if (!cards || cards.length !== 2) return 'XX';
  
  const [c1, c2] = cards.sort((a, b) => b.value - a.value);
  const suited = c1.suit === c2.suit ? 's' : 'o';
  
  if (c1.value === c2.value) {
    return `${c1.rank}${c2.rank}`;
  }
  
  return `${c1.rank}${c2.rank}${suited}`;
};

const getAIAction = (player, gameState, communityCards) => {
  if (!player || !gameState || !player.aiStyle || !AI_STYLES[player.aiStyle]) {
    return { action: 'fold', amount: 0 };
  }

  const style = AI_STYLES[player.aiStyle];
  const handString = getHandString(player.cards);
  const allCards = [...player.cards, ...communityCards];
  const handStrength = allCards.length >= 5 ? evaluateHand(allCards).rank : 0;
  const callAmount = Math.max(0, gameState.currentBet - player.currentBet);
  
  if (player.chips <= 0) {
    return callAmount === 0 ? { action: 'check', amount: 0 } : { action: 'fold', amount: 0 };
  }
  
  // 프리플롭 결정
  if (gameState.gamePhase === 'preflop') {
    const cards = player.cards.sort((a, b) => b.value - a.value);
    const [high, low] = cards;
    const isPair = high.value === low.value;
    const isSuited = high.suit === low.suit;
    
    let handValue = 0;
    
    if (isPair) {
      if (high.value >= 14) handValue = 100; // AA
      else if (high.value >= 13) handValue = 95; // KK
      else if (high.value >= 12) handValue = 90; // QQ
      else if (high.value >= 11) handValue = 85; // JJ
      else if (high.value >= 10) handValue = 75; // TT
      else if (high.value >= 9) handValue = 65; // 99
      else if (high.value >= 8) handValue = 55; // 88
      else if (high.value >= 7) handValue = 45; // 77
      else handValue = 35; // 낮은 페어
    } else {
      if (high.value === 14 && low.value >= 13) handValue = isSuited ? 88 : 82; // AK
      else if (high.value === 14 && low.value >= 12) handValue = isSuited ? 78 : 70; // AQ
      else if (high.value === 14 && low.value >= 11) handValue = isSuited ? 72 : 62; // AJ
      else if (high.value === 14 && low.value >= 10) handValue = isSuited ? 65 : 55; // AT
      else if (high.value === 13 && low.value >= 12) handValue = isSuited ? 68 : 58; // KQ
      else if (high.value === 13 && low.value >= 11) handValue = isSuited ? 60 : 48; // KJ
      else if (high.value === 12 && low.value >= 11) handValue = isSuited ? 58 : 46; // QJ
      else if (isSuited && high.value - low.value <= 4 && low.value >= 6) handValue = 50;
      else if (high.value >= 10 && low.value >= 9) handValue = isSuited ? 45 : 35;
      else handValue = 20;
    }

    const playThreshold = {
      tight: 70,
      loose: 35,
      aggressive: 50,
      pro: 60
    }[player.aiStyle] || 60;

    if (handValue < playThreshold) {
      return { action: 'fold', amount: 0 };
    }

    if (handValue >= 85 || (handValue >= 70 && Math.random() < style.pfr)) {
      const raiseSize = gameState.currentBet === BLINDS.big ? 
        BLINDS.big * 3 : 
        Math.max(gameState.currentBet + BLINDS.big, gameState.currentBet * 1.5);
      
      if (raiseSize <= player.chips + player.currentBet) {
        return { action: 'raise', amount: raiseSize };
      }
    }

    if (callAmount <= player.chips) {
      return { action: 'call', amount: callAmount };
    }
    
    return { action: 'fold', amount: 0 };
  }
  
  // 포스트플롭 결정
  const random = Math.random();
  
  if (handStrength >= 6) {
    if (callAmount === 0) {
      const betSize = Math.min(Math.floor(gameState.pot * 0.8), player.chips + player.currentBet);
      return { action: 'raise', amount: betSize };
    } else {
      return { action: 'call', amount: Math.min(callAmount, player.chips) };
    }
  }
  
  if (handStrength >= 3) {
    if (callAmount <= gameState.pot * 0.5) {
      return { action: 'call', amount: Math.min(callAmount, player.chips) };
    } else if (random < style.aggression * 0.5) {
      const betSize = Math.min(Math.floor(gameState.pot * 0.6), player.chips + player.currentBet);
      return { action: 'raise', amount: betSize };
    }
    return { action: 'fold', amount: 0 };
  }
  
  if (handStrength >= 1) {
    if (callAmount === 0) {
      if (random < 0.7) {
        return { action: 'check', amount: 0 };
      } else {
        const betSize = Math.min(Math.floor(gameState.pot * 0.4), player.chips + player.currentBet);
        return { action: 'raise', amount: betSize };
      }
    } else if (callAmount <= gameState.pot * 0.3) {
      return { action: 'call', amount: Math.min(callAmount, player.chips) };
    }
    return { action: 'fold', amount: 0 };
  }
  
  if (callAmount === 0) {
    if (random < style.bluffFreq * 0.4) {
      const betSize = Math.min(Math.floor(gameState.pot * 0.5), player.chips + player.currentBet);
      return { action: 'raise', amount: betSize };
    }
    return { action: 'check', amount: 0 };
  }
  
  return { action: 'fold', amount: 0 };
};

// 🎯 칩 컴포넌트
const PokerChip = ({ value, size = 'medium', onClick, className = '', animate = false, style = {} }) => {
  const chipData = CHIP_DENOMINATIONS[value] || CHIP_DENOMINATIONS[1];
  const sizeMap = {
    small: { width: '30px', height: '30px', fontSize: '10px' },
    medium: { width: '50px', height: '50px', fontSize: '12px' },
    large: { width: '70px', height: '70px', fontSize: '14px' },
    xl: { width: '90px', height: '90px', fontSize: '16px' }
  };
  
  const chipSize = sizeMap[size];
  
  return (
    <div
      onClick={onClick}
      className={`poker-chip ${className} ${animate ? 'chip-animate' : ''} ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        ...chipSize,
        backgroundColor: chipData.color,
        border: `3px solid ${chipData.borderColor}`,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: chipData.textColor,
        fontWeight: 'bold',
        fontSize: chipSize.fontSize,
        boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)',
        position: 'relative',
        transition: 'all 0.3s ease',
        ...style
      }}
    >
      <div
        style={{
          width: '80%',
          height: '80%',
          border: `2px dashed ${chipData.borderColor}`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ${value}
      </div>
      
      <style jsx>{`
        .poker-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.4);
        }
        
        .chip-animate {
          animation: chipBounce 0.6s ease-out;
        }
        
        @keyframes chipBounce {
          0% { transform: scale(0) rotate(180deg); }
          50% { transform: scale(1.2) rotate(90deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        
        .chip-flying {
          animation: chipFly 0.8s ease-out forwards;
        }
        
        @keyframes chipFly {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-30px) scale(0.8); opacity: 0.8; }
          100% { transform: translateY(-60px) scale(0.6); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// 🎯 칩 스택 컴포넌트
const ChipStack = ({ chips, maxVisible = 5, onClick, label, animate = false }) => {
  const chipCounts = {};
  
  // 칩을 액면가별로 정리
  Object.keys(CHIP_DENOMINATIONS).forEach(denom => {
    chipCounts[denom] = 0;
  });
  
  let remainingChips = chips;
  const denominations = Object.keys(CHIP_DENOMINATIONS).map(Number).sort((a, b) => b - a);
  
  denominations.forEach(denom => {
    chipCounts[denom] = Math.floor(remainingChips / denom);
    remainingChips = remainingChips % denom;
  });
  
  return (
    <div className="chip-stack-container" onClick={onClick}>
      {label && (
        <div className="text-center text-sm font-bold text-white mb-2">
          {label}: ${chips.toLocaleString()}
        </div>
      )}
      
      <div className="flex flex-wrap justify-center gap-2">
        {denominations.map(denom => {
          const count = chipCounts[denom];
          if (count === 0) return null;
          
          return (
            <div key={denom} className="relative">
              <div className="flex flex-col items-center">
                {/* 스택 표시 */}
                <div className="relative">
                  {[...Array(Math.min(count, maxVisible))].map((_, index) => (
                    <PokerChip
                      key={index}
                      value={denom}
                      size="medium"
                      animate={animate && index === 0}
                      style={{
                        position: index === 0 ? 'relative' : 'absolute',
                        top: index === 0 ? 0 : `-${index * 4}px`,
                        left: index === 0 ? 0 : `${index * 2}px`,
                        zIndex: maxVisible - index
                      }}
                    />
                  ))}
                  
                  {/* 스택 개수 표시 */}
                  {count > maxVisible && (
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {count}
                    </div>
                  )}
                </div>
                
                {/* 개수 라벨 */}
                <div className="text-xs text-white mt-1">
                  {count}x
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        .chip-stack-container {
          transition: all 0.3s ease;
          padding: 10px;
          border-radius: 10px;
          background: rgba(0,0,0,0.2);
        }
        
        .chip-stack-container:hover {
          background: rgba(0,0,0,0.4);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

// 🎯 개선된 베팅 UI (칩 기반)
const EnhancedBettingControls = ({ player, gameState, onAction, mode, LANGUAGES, currentLanguage }) => {
  const [selectedChips, setSelectedChips] = useState([]);
  const [betAmount, setBetAmount] = useState(0);
  const [showChipSelector, setShowChipSelector] = useState(false);

  const callAmount = Math.max(0, gameState.currentBet - player.currentBet);
  const canCheck = callAmount === 0;
  const minRaise = Math.max(gameState.currentBet + 20, player.currentBet + 20); // 최소 레이즈
  const maxBet = player.chips + player.currentBet;

  // 사용 가능한 칩 데노미네이션 계산
  const availableChips = Object.keys(CHIP_DENOMINATIONS)
    .map(Number)
    .filter(denom => denom <= player.chips)
    .sort((a, b) => a - b);

  const addChipToBet = (chipValue) => {
    if (betAmount + chipValue <= player.chips) {
      setSelectedChips(prev => [...prev, chipValue]);
      setBetAmount(prev => prev + chipValue);
    }
  };

  const clearBet = () => {
    setSelectedChips([]);
    setBetAmount(0);
  };

  const handleAction = (action, amount = 0) => {
    setShowChipSelector(false);
    clearBet();
    onAction(action, amount);
  };

  return (
    <div className="bg-black/90 backdrop-blur-md rounded-xl p-6 border-2 border-yellow-500/50 shadow-2xl">
      
      {/* 팟 정보 */}
      <div className="text-center mb-4">
        <div className="text-white text-xl font-bold mb-2">{LANGUAGES[currentLanguage].ui.yourTurn}</div>
        <div className="text-yellow-400 text-sm">
          팟: ${gameState.pot.toLocaleString()} | 
          {callAmount > 0 ? ` 콜: $${callAmount.toLocaleString()}` : ' 체크 가능'} | 
          칩: ${player.chips.toLocaleString()}
        </div>
      </div>

      {/* 현재 칩 스택 표시 */}
      <div className="mb-4">
        <ChipStack 
          chips={player.chips} 
          label={LANGUAGES[currentLanguage].ui.holdingChips}
          maxVisible={4}
        />
      </div>

      {/* 베팅 금액 표시 */}
      {betAmount > 0 && (
        <div className="mb-4 p-3 bg-yellow-400/20 rounded-lg border border-yellow-400">
          <div className="text-center">
            <div className="text-yellow-400 font-bold text-lg mb-2">
              베팅: ${betAmount.toLocaleString()}
            </div>
            <div className="flex justify-center gap-1 mb-3">
              {selectedChips.map((chip, index) => (
                <PokerChip
                  key={index}
                  value={chip}
                  size="small"
                  animate={index === selectedChips.length - 1}
                />
              ))}
            </div>
            <button
              onClick={clearBet}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              {LANGUAGES[currentLanguage].ui.reset}
            </button>
          </div>
        </div>
      )}

      {/* 칩 선택기 */}
      {showChipSelector && (
        <div className="mb-4 p-4 bg-white/10 rounded-lg border border-white/20">
          <div className="text-white text-sm font-semibold mb-3 text-center">{LANGUAGES[currentLanguage].ui.selectChipsToBet}</div>
          <div className="grid grid-cols-5 gap-2">
            {availableChips.map(chipValue => (
              <PokerChip
                key={chipValue}
                value={chipValue}
                size="medium"
                onClick={() => addChipToBet(chipValue)}
                className="hover:scale-110 transition-transform"
              />
            ))}
          </div>
          
          {/* 빠른 베팅 버튼들 */}
          <div className="flex gap-2 mt-3">
            {[0.25, 0.5, 0.75, 1].map(ratio => {
              const amount = Math.floor(gameState.pot * ratio);
              return (
                <button
                  key={ratio}
                  onClick={() => setBetAmount(Math.min(amount, player.chips))}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-1 px-2 rounded text-xs transition-colors"
                >
                  {ratio === 1 ? '팟' : `${ratio * 100}%`}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 액션 버튼들 */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleAction('fold')}
          className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          폴드
        </button>
        
        {canCheck ? (
          <button
            onClick={() => handleAction('check')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            체크
          </button>
        ) : (
          <button
            onClick={() => handleAction('call', callAmount)}
            disabled={callAmount > player.chips}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none flex items-center justify-center gap-2"
          >
            <Coins className="w-4 h-4" />
            콜 ${callAmount.toLocaleString()}
          </button>
        )}
        
        <button
          onClick={() => setShowChipSelector(!showChipSelector)}
          disabled={minRaise > maxBet}
          className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none flex items-center justify-center gap-2"
        >
          <DollarSign className="w-4 h-4" />
          {showChipSelector ? '선택 취소' : '베팅'}
        </button>
        
        <button
          onClick={() => handleAction('allin', player.chips)}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          올인
        </button>
      </div>

      {/* 커스텀 베팅 */}
      {betAmount > 0 && (
        <button
          onClick={() => handleAction(betAmount >= gameState.currentBet ? 'raise' : 'call', betAmount)}
          disabled={betAmount > player.chips}
          className="w-full mt-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
        >
          <Banknote className="w-4 h-4" />
          ${betAmount.toLocaleString()} {betAmount >= gameState.currentBet ? '레이즈' : '베팅'}
        </button>
      )}
    </div>
  );
};

// 광고 배너 컴포넌트 (AdSense)
const AdBanner = ({ adSlot = "1234567890", className = "" }) => (
  <div className={`w-full ${className}`}>
    <AdSenseAd 
      adSlot={adSlot}
      adFormat="auto"
      style={{ minHeight: '100px' }}
      className="w-full"
    />
  </div>
);

// 닉네임 입력 컴포넌트 (uncontrolled)
const NicknameInput = React.memo(({ 
  playerNickname, 
  LANGUAGES, 
  currentLanguage, 
  onSave, 
  onClear 
}) => {
  const inputRef = useRef(null);
  const [currentValue, setCurrentValue] = useState(playerNickname);
  const hasNicknameChanged = currentValue !== playerNickname;
  
  const handleInputChange = (e) => {
    setCurrentValue(e.target.value);
  };
  
  const handleSave = () => {
    onSave(currentValue);
  };
  
  const handleClear = () => {
    setCurrentValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    onClear();
  };
  
  return (
    <div>
      <h3 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
        👤 {LANGUAGES[currentLanguage].ui.nickname}
      </h3>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          defaultValue={playerNickname}
          onChange={handleInputChange}
          placeholder={LANGUAGES[currentLanguage].ui.enterNickname || '닉네임을 입력하세요'}
          className="flex-1 px-4 py-2 bg-white/20 text-white placeholder-white/60 rounded-lg border border-white/30 focus:border-emerald-400 focus:outline-none"
          maxLength={20}
          autoComplete="off"
        />
        {hasNicknameChanged && (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            {LANGUAGES[currentLanguage].ui.save || '저장'}
          </button>
        )}
        {currentValue && (
          <button
            onClick={handleClear}
            className="px-3 py-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {playerNickname && (
        <p className="text-emerald-200 text-sm mt-2">
          {LANGUAGES[currentLanguage].ui.welcomeMessage.replace('{nickname}', playerNickname)}
        </p>
      )}
    </div>
  );
});

// 광고 리워드 비디오 컴포넌트
const RewardVideoAd = ({ onReward, onClose }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 max-w-md">
      <h3 className="text-lg font-bold mb-4">광고 시청으로 칩 충전</h3>
      <p className="text-gray-600 mb-4">30초 광고를 시청하면 2000 칩을 받을 수 있습니다.</p>
      <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center mb-4">
        <div className="text-gray-500">광고 영상 영역</div>
      </div>
      <div className="flex gap-2">
        <button onClick={onReward} className="flex-1 bg-green-600 text-white py-2 rounded font-bold">
          광고 시청 완료
        </button>
        <button onClick={onClose} className="px-4 py-2 border rounded">
          닫기
        </button>
      </div>
    </div>
  </div>
);

// 이론 팝업 컴포넌트
const TheoryPopup = ({ theory, onClose }) => {
  if (!theory) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">{theory.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-4 text-lg">{theory.content}</p>
          <div className="space-y-3">
            {theory.details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 학습 피드백 컴포넌트
const LearningFeedback = ({ action, gameState, playerCards, communityCards, mode }) => {
  const [feedback, setFeedback] = useState(null);
  
  useEffect(() => {
    if (!action || !gameState) return;
    
    const outs = calculateOuts(playerCards, communityCards);
    const winProb = calculateWinProbability(outs, gameState.gamePhase);
    const potOdds = gameState.currentBet > 0 ? (gameState.currentBet / (gameState.pot + gameState.currentBet)) * 100 : 0;
    
    let feedbackData = {
      type: 'neutral',
      title: '액션 분석',
      message: '',
      tips: [],
      score: 0
    };
    
    if (mode === 'probability') {
      if (action.action === 'call' && winProb < potOdds - 5) {
        feedbackData = {
          type: 'error',
          title: '확률적으로 불리한 콜',
          message: `승률 ${winProb}%로 팟 오즈 ${potOdds.toFixed(1)}%보다 낮습니다.`,
          tips: ['팟 오즈보다 승률이 낮으면 장기적으로 손해입니다', '아웃츠를 정확히 계산해보세요'],
          score: -10
        };
      } else if (action.action === 'fold' && winProb > potOdds + 10) {
        feedbackData = {
          type: 'warning',
          title: '너무 타이트한 플레이',
          message: `승률 ${winProb}%로 충분히 콜할 수 있었습니다.`,
          tips: ['좋은 팟 오즈일 때는 약간 약한 핸드도 콜할 수 있습니다'],
          score: -5
        };
      } else if (action.action === 'call' && winProb > potOdds + 5) {
        feedbackData = {
          type: 'success',
          title: '좋은 확률적 판단',
          message: `승률 ${winProb}%로 팟 오즈를 충족합니다.`,
          tips: ['올바른 수학적 접근입니다'],
          score: 10
        };
      }
    }
    
    setFeedback(feedbackData);
    setTimeout(() => setFeedback(null), 5000);
  }, [action, gameState, playerCards, communityCards, mode]);
  
  if (!feedback) return null;
  
  return (
    <div className={
      "fixed top-20 right-4 max-w-sm p-4 rounded-lg shadow-lg z-40 transition-all duration-300 " +
      (feedback.type === 'success' ? 'bg-green-600' : 
       feedback.type === 'error' ? 'bg-red-600' : 
       feedback.type === 'warning' ? 'bg-yellow-600' : 'bg-blue-600') +
      " text-white"
    }>
      <div className="flex items-center gap-2 mb-2">
        {feedback.type === 'success' && <CheckCircle className="w-5 h-5" />}
        {feedback.type === 'error' && <XCircle className="w-5 h-5" />}
        {feedback.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
        <div className="font-bold">{feedback.title}</div>
        <div className={
          "ml-auto text-sm px-2 py-1 rounded " +
          (feedback.score > 0 ? 'bg-green-700' : feedback.score < 0 ? 'bg-red-700' : 'bg-gray-700')
        }>
          {feedback.score > 0 ? '+' : ''}{feedback.score}
        </div>
      </div>
      <div className="text-sm mb-2">{feedback.message}</div>
      {feedback.tips.length > 0 && (
        <div className="text-xs">
          <div className="font-semibold mb-1">💡 팁:</div>
          {feedback.tips.map((tip, idx) => (
            <div key={idx} className="opacity-90">• {tip}</div>
          ))}
        </div>
      )}
    </div>
  );
};

// 베팅 컨트롤 컴포넌트
const BettingControls = ({ player, gameState, onAction, mode, LANGUAGES, currentLanguage }) => {
  const [betAmount, setBetAmount] = useState(0);
  const [showBetSlider, setShowBetSlider] = useState(false);

  const callAmount = Math.max(0, gameState.currentBet - player.currentBet);
  const canCheck = callAmount === 0;
  const minRaise = Math.max(gameState.currentBet + BLINDS.big, player.currentBet + BLINDS.big);
  const maxBet = player.chips + player.currentBet;

  useEffect(() => {
    setBetAmount(Math.min(minRaise, maxBet));
  }, [minRaise, maxBet]);

  const handleAction = (action, amount = 0) => {
    setShowBetSlider(false);
    onAction(action, amount);
  };

  return (
    <div className="bg-black/90 backdrop-blur-md rounded-xl p-6 border-2 border-yellow-500/50 shadow-2xl">
      <div className="text-center mb-4">
        <div className="text-white text-xl font-bold mb-2">{LANGUAGES[currentLanguage].ui.yourTurn}</div>
        <div className="text-yellow-400 text-sm">
          팟: ${gameState.pot} | 
          {callAmount > 0 ? ` 콜: ${callAmount}` : ' 체크 가능'} | 
          칩: ${player.chips}
        </div>
      </div>

      {mode && LEARNING_MODES[mode] && (
        <div className="mb-4 p-3 bg-blue-900/50 rounded-lg border border-blue-500/30">
          <div className="text-blue-300 text-sm font-semibold mb-1">
            📚 {LEARNING_MODES[mode].name} 모드
          </div>
          <div className="text-blue-200 text-xs">
            {LEARNING_MODES[mode].tips[Math.floor(Math.random() * LEARNING_MODES[mode].tips.length)]}
          </div>
        </div>
      )}

      {showBetSlider && (
        <div className="mb-4 p-4 bg-white/10 rounded-lg border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-sm font-semibold">베팅 금액:</span>
            <span className="text-yellow-400 font-bold text-lg">${betAmount.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={minRaise}
            max={maxBet}
            step={BLINDS.big}
            value={betAmount}
            onChange={(e) => setBetAmount(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>최소: ${minRaise.toLocaleString()}</span>
            <span>팟: ${gameState.pot}</span>
            <span>최대: ${maxBet.toLocaleString()}</span>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setBetAmount(Math.min(Math.floor(gameState.pot * 0.5), maxBet))}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-1 px-2 rounded text-sm transition-colors"
            >
              1/2 팟
            </button>
            <button
              onClick={() => setBetAmount(Math.min(Math.floor(gameState.pot * 0.75), maxBet))}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-1 px-2 rounded text-sm transition-colors"
            >
              3/4 팟
            </button>
            <button
              onClick={() => setBetAmount(Math.min(gameState.pot, maxBet))}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-1 px-2 rounded text-sm transition-colors"
            >
              팟 베팅
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleAction('fold')}
          className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          {LANGUAGES?.[currentLanguage]?.ui?.actions?.fold || '폴드'}
        </button>
        
        {canCheck ? (
          <button
            onClick={() => handleAction('check')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            {LANGUAGES?.[currentLanguage]?.ui?.actions?.check || '체크'}
          </button>
        ) : (
          <button
            onClick={() => handleAction('call', callAmount)}
            disabled={callAmount > player.chips}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none"
          >
            {LANGUAGES?.[currentLanguage]?.ui?.actions?.call || '콜'} ${callAmount}
          </button>
        )}
        
        <button
          onClick={() => setShowBetSlider(!showBetSlider)}
          disabled={minRaise > maxBet}
          className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none"
        >
          {showBetSlider ? (LANGUAGES?.[currentLanguage]?.ui?.cancel || '취소') : (LANGUAGES?.[currentLanguage]?.ui?.actions?.raise || '레이즈')}
        </button>
        
        <button
          onClick={() => handleAction('allin', player.chips)}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          {LANGUAGES?.[currentLanguage]?.ui?.actions?.allin || '올인'}
        </button>
      </div>

      {showBetSlider && (
        <button
          onClick={() => handleAction('raise', betAmount)}
          disabled={betAmount > maxBet}
          className="w-full mt-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          ${betAmount.toLocaleString()} {LANGUAGES?.[currentLanguage]?.ui?.bet || '베팅'}
        </button>
      )}

      {mode === 'probability' && (
        <div className="mt-4 p-3 bg-green-900/30 rounded-lg border border-green-500/30">
          <div className="text-green-300 text-xs">
            🎯 팟 오즈: {gameState.currentBet > 0 ? ((gameState.currentBet / (gameState.pot + gameState.currentBet)) * 100).toFixed(1) : 0}%
          </div>
        </div>
      )}
    </div>
  );
};

// 프로 도전 모달
const ProChallengeModal = ({ isOpen, onClose, onAccept, stats }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">프로 포커 플레이어 도전!</h2>
            <p className="text-gray-600">
              축하합니다! 당신의 포커 실력이 프로 수준에 도달했습니다.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-bold mb-3">현재 성과</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>총 수익: <span className="font-bold text-green-600">${stats.totalEarnings.toLocaleString()}</span></div>
              <div>승률: <span className="font-bold">{Math.round((stats.handsWon / stats.handsPlayed) * 100)}%</span></div>
              <div>학습 점수: <span className="font-bold text-blue-600">{stats.learningScore}</span></div>
              <div>연승: <span className="font-bold text-purple-600">{stats.currentStreak}</span></div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
            >
              계속 학습하기
            </button>
            <button
              onClick={onAccept}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              프로 도전하기!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 메인 게임 컴포넌트
const HoldemMaster = () => {
  // 🎯 기존 상태값들 모두 그대로 유지
  const [currentView, setCurrentView] = useState('menu');
  const [selectedMode, setSelectedMode] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [gameLog, setGameLog] = useState([]);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const [showTheoryPopup, setShowTheoryPopup] = useState(null);
  const [showRewardAd, setShowRewardAd] = useState(false);
  const [showProChallenge, setShowProChallenge] = useState(false);
  const [showVaultModal, setShowVaultModal] = useState(false); // 🚀 금고 모달 상태 추가
  const [lastAction, setLastAction] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [gameWatcherActive, setGameWatcherActive] = useState(false);
  const [highlightedCards, setHighlightedCards] = useState([]);
  const [currentHandText, setCurrentHandText] = useState('');
  const [feedbackLevel, setFeedbackLevel] = useState('beginner');
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  
  // 🚀 새로운 상태값들 추가
  const [puzzleStats, setPuzzleStats] = useState(() => {
    try {
      const saved = localStorage.getItem('holdemPuzzleStats');
      return saved ? JSON.parse(saved) : { total: 0, correct: 0, streak: 0 };
    } catch {
      return { total: 0, correct: 0, streak: 0 };
    }
  });
  
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('pokerMasterLanguage');
      return saved ? JSON.parse(saved) : 'ko';
    } catch (error) {
      console.warn('언어 설정 읽기 실패:', error);
      return 'ko';
    }
  });
  
  const [playerNickname, setPlayerNickname] = useState(() => {
    try {
      const saved = localStorage.getItem('pokerMasterNickname');
      return saved ? JSON.parse(saved) : '';
    } catch (error) {
      console.warn('닉네임 읽기 실패:', error);
      return '';
    }
  });
  
  const [autoRestart, setAutoRestart] = useState(false);
  const [restartCountdown, setRestartCountdown] = useState(0);
  
  const [aiChips, setAiChips] = useState({
    aiPro: 1000,
    aiShark: 1000, 
    aiRock: 1000
  });
  
  const [playerStats, setPlayerStats] = useState(() => {
    try {
      const saved = localStorage.getItem('pokerMasterStats');
      return saved ? JSON.parse(saved) : {
        handsPlayed: 0,
        handsWon: 0,
        totalEarnings: 0,
        currentStreak: 0,
        learningScore: 0,
        mistakesMade: 0,
        goodDecisions: 0,
        totalChips: 5000
      };
    } catch (error) {
      console.warn('localStorage 읽기 실패:', error);
      return {
        handsPlayed: 0,
        handsWon: 0,
        totalEarnings: 0,
        currentStreak: 0,
        learningScore: 0,
        mistakesMade: 0,
        goodDecisions: 0,
        totalChips: 5000
      };
    }
  });

  // 🎯 Educational Loading Tips State
  const [currentLoadingTip, setCurrentLoadingTip] = useState(null);
  const [loadingTipVisible, setLoadingTipVisible] = useState(false);
  const [tipRotationTimer, setTipRotationTimer] = useState(null);

  // 🎓 Function to get random tip based on difficulty level
  const getRandomTip = useCallback((difficulty = 'basic') => {
    const allTips = [
      ...POKER_LOADING_TIPS[difficulty] || POKER_LOADING_TIPS.basic,
      ...POKER_TERMINOLOGY_TIPS.map(term => ({
        title: term.term,
        tip: `${term.definition} - ${term.example}`,
        category: "용어",
        icon: term.icon
      }))
    ];
    return allTips[Math.floor(Math.random() * allTips.length)];
  }, []);

  // 🎯 Show loading tip during AI processing
  const showLoadingTip = useCallback((duration = 1500, difficulty = 'basic') => {
    const tip = getRandomTip(difficulty);
    setCurrentLoadingTip(tip);
    setLoadingTipVisible(true);
    
    // Clear any existing timer
    if (tipRotationTimer) {
      clearTimeout(tipRotationTimer);
    }
    
    // Hide tip after duration
    const timer = setTimeout(() => {
      setLoadingTipVisible(false);
      setCurrentLoadingTip(null);
    }, duration - 200); // Hide slightly before processing ends
    
    setTipRotationTimer(timer);
  }, [tipRotationTimer, getRandomTip]);

  // 🧹 Cleanup tip timer on unmount
  useEffect(() => {
    return () => {
      if (tipRotationTimer) {
        clearTimeout(tipRotationTimer);
      }
    };
  }, [tipRotationTimer]);

  // 💰 AdSense Auto Ads 초기화 (한 번만)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.adsbygoogle && !window.adsenseInitialized) {
      try {
        window.adsbygoogle.push({
          google_ad_client: "ca-pub-2478956041357030",
          enable_page_level_ads: true
        });
        window.adsenseInitialized = true;
      } catch (error) {
        console.warn('AdSense 초기화 오류:', error);
      }
    }
  }, []);

  // 🚀 칩 보상 처리 함수
  const handleChipReward = useCallback((amount) => {
    setPlayerStats(prev => ({
      ...prev,
      totalChips: prev.totalChips + amount,
      totalEarnings: prev.totalEarnings + amount,
      learningScore: prev.learningScore + Math.floor(amount / 100)
    }));
    
    // 레벨업 체크
    const newLevel = Math.floor((playerStats.totalEarnings + amount) / 10000) + 1;
    const currentLevel = Math.floor(playerStats.totalEarnings / 10000) + 1;
    
    if (newLevel > currentLevel) {
      // 레벨업 보너스
      setTimeout(() => {
        alert(`🎉 레벨 ${newLevel}로 승급! 보너스 5,000 칩을 받았습니다!`);
        setPlayerStats(prev => ({
          ...prev,
          totalChips: prev.totalChips + 5000
        }));
      }, 1000);
    }
  }, [playerStats.totalEarnings]);

  // 🔧 기존 함수들 모두 그대로 유지
  const updateHandHighlights = useCallback(() => {
    if (!gameState || !gameState.players || gameState.communityCards.length === 0) {
      setHighlightedCards([]);
      setCurrentHandText('');
      return;
    }
    
    const player = gameState.players[0];
    if (!player || !player.cards || player.cards.length !== 2) {
      setHighlightedCards([]);
      setCurrentHandText('');
      return;
    }
    
    const allCards = [...player.cards, ...gameState.communityCards];
    const bestHand = findBestHand(allCards);
    
    if (bestHand && bestHand.highlightCards) {
      console.log(`🌟 핸드 조합 발견: ${bestHand.type}`, bestHand.highlightCards);
      setHighlightedCards(bestHand.highlightCards);
      setCurrentHandText(bestHand.type);
    } else {
      setHighlightedCards([]);
      setCurrentHandText('하이카드');
    }
  }, [gameState]);
  
  useEffect(() => {
    updateHandHighlights();
  }, [gameState, updateHandHighlights]);
  
  useEffect(() => {
    try {
      localStorage.setItem('pokerMasterStats', JSON.stringify(playerStats));
      console.log('📊 통계 저장됨:', playerStats);
    } catch (error) {
      console.warn('localStorage 저장 실패:', error);
    }
  }, [playerStats]);

  useEffect(() => {
    try {
      localStorage.setItem('pokerMasterLanguage', JSON.stringify(currentLanguage));
      console.log('🌍 언어 설정 저장됨:', currentLanguage);
    } catch (error) {
      console.warn('언어 설정 저장 실패:', error);
    }
  }, [currentLanguage]);

  useEffect(() => {
    if (restartCountdown > 0) {
      addToLog(`🔄 ${restartCountdown}초 후 자동 재시작...`);
      
      const timer = setTimeout(() => {
        setRestartCountdown(prev => {
          if (prev <= 1) {
            addToLog('🔄 자동으로 새 게임을 시작합니다!');
            setTimeout(() => {
              initializeGame(selectedMode);
            }, 500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [restartCountdown, selectedMode]);

  const saveNickname = useCallback((nickname) => {
    try {
      setPlayerNickname(nickname);
      localStorage.setItem('pokerMasterNickname', JSON.stringify(nickname));
      console.log('👤 닉네임 저장됨:', nickname);
    } catch (error) {
      console.warn('닉네임 저장 실패:', error);
    }
  }, []);

  const clearNickname = useCallback(() => {
    setPlayerNickname('');
    localStorage.setItem('pokerMasterNickname', JSON.stringify(''));
  }, []);

  useEffect(() => {
    if (!gameState || currentView !== 'game' || gameState.gamePhase === 'showdown' || actionInProgress) {
      return;
    }
    
    if (gameWatcherActive) return;
    
    setGameWatcherActive(true);
    
    const gameWatcher = setInterval(() => {
      setGameState(currentGameState => {
        if (!currentGameState || currentGameState.gamePhase === 'showdown') {
          return currentGameState;
        }
        
        const activePlayer = currentGameState.players[currentGameState.activePlayer];
        
        if (!activePlayer || activePlayer.isHuman || activePlayer.folded || activePlayer.allIn) {
          return currentGameState;
        }
        
        console.log('⏰ 게임 감시기: AI 플레이어 무응답 감지', activePlayer.name);
        
        if (!activePlayer.isHuman) {
          console.log('⏰ 게임 감시기: AI 강제 폴드 실행', activePlayer.name);
          handlePlayerAction('fold', 0, true, activePlayer.id);
        }
        
        return currentGameState;
      });
    }, 30000);
    
    return () => {
      clearInterval(gameWatcher);
      setGameWatcherActive(false);
    };
  }, [gameState?.activePlayer, currentView, gameState?.gamePhase, actionInProgress]);

  const checkProChallenge = useCallback((stats) => {
    if (stats.totalChips >= 10000 && stats.learningScore >= 500 && stats.currentStreak >= 10) {
      setShowProChallenge(true);
    }
  }, []);

  const resetGameState = () => {
    console.log('🔄 게임 상태 완전 리셋');
    setGameState(null);
    setIsProcessingAction(false);
    setActionInProgress(false);
    setGameWatcherActive(false);
    setGameLog([]);
    setLastAction(null);
    addToLog('🔄 게임이 리셋되었습니다.');
  };

  const getRandomTheory = (level) => {
    const theories = POKER_THEORY[level]?.theories || [];
    return theories[Math.floor(Math.random() * theories.length)];
  };

  const generateLearningFeedback = useCallback((action, gameStateSnapshot) => {
    if (!gameStateSnapshot || !selectedMode) return [];
    
    const feedback = [];
    const currentLevel = FEEDBACK_LEVELS[feedbackLevel];
    const humanPlayer = gameStateSnapshot.players.find(p => p.isHuman);
    
    if (!humanPlayer) return feedback;
    
    if (currentLevel.tips[action]) {
      feedback.push({
        type: 'action',
        level: feedbackLevel,
        message: currentLevel.tips[action][currentLanguage],
        icon: currentLevel.icon
      });
    }
    
    if (humanPlayer.cards && gameStateSnapshot.communityCards.length > 0) {
      const allCards = [...humanPlayer.cards, ...gameStateSnapshot.communityCards];
      const bestHand = findBestHand(allCards);
      
      if (bestHand.type === '풀하우스' || bestHand.type === '포카드' || bestHand.type === '로얄 플러시') {
        if (action === 'fold') {
          feedback.push({
            type: 'mistake',
            level: 'high',
            message: `🚨 ${bestHand.type}를 폴드했습니다! 이는 매우 강한 핸드입니다.`,
            icon: '⚠️'
          });
        }
      }
    }
    
    const mode = LEARNING_MODES[selectedMode];
    if (mode && mode.tips) {
      const randomTip = mode.tips[Math.floor(Math.random() * mode.tips.length)];
      if (Math.random() < 0.3) {
        feedback.push({
          type: 'mode_tip',
          level: feedbackLevel,
          message: `💡 ${mode.name[currentLanguage]} 팁: ${mode.tips[currentLanguage][Math.floor(Math.random() * mode.tips[currentLanguage].length)]}`,
          icon: '🎯'
        });
      }
    }
    
    return feedback;
  }, [feedbackLevel, selectedMode]);

  // 🎯 게임 초기화 (퍼즐 모드 추가)
  const initializeGame = (mode) => {
    if (mode === 'puzzle') {
      setCurrentView('puzzle');
      return;
    }
    
    const minChipsNeeded = BLINDS.big * 2;
    if (playerStats.totalChips < minChipsNeeded) {
      alert(`💰 칩이 부족합니다! 최소 ${minChipsNeeded} 칩이 필요합니다. 금고에서 칩을 충전하거나 퍼즐 게임을 플레이하세요.`);
      setShowVaultModal(true);
      return;
    }

    resetGameState();
    
    setTimeout(() => {
      const deck = shuffleDeck(createDeck());
      
      const players = [
        {
          id: 0,
          name: playerNickname || (currentLanguage === 'ko' ? '플레이어' : 'Player'),
          chips: Math.floor(playerStats.totalChips * 1.0),
          cards: [deck[0], deck[1]],
          position: 'Button',
          isHuman: true,
          aiStyle: null,
          folded: false,
          allIn: false,
          currentBet: 0,
          lastAction: null
        },
        {
          id: 1,
          name: 'AI Pro',
          chips: Math.max(1000, Math.floor(aiChips.aiPro * 1.0)),
          cards: [deck[2], deck[3]],
          position: 'Small Blind',
          isHuman: false,
          aiStyle: 'pro',
          folded: false,
          allIn: false,
          currentBet: BLINDS.small,
          lastAction: 'blind'
        },
        {
          id: 2,
          name: 'AI Shark',
          chips: Math.max(1000, Math.floor(aiChips.aiShark * 1.0)),
          cards: [deck[4], deck[5]],
          position: 'Big Blind',
          isHuman: false,
          aiStyle: 'aggressive',
          folded: false,
          allIn: false,
          currentBet: BLINDS.big,
          lastAction: 'blind'
        },
        {
          id: 3,
          name: 'AI Rock',
          chips: Math.max(1000, Math.floor(aiChips.aiRock * 1.0)),
          cards: [deck[6], deck[7]],
          position: 'UTG',
          isHuman: false,
          aiStyle: 'tight',
          folded: false,
          allIn: false,
          currentBet: 0,
          lastAction: null
        }
      ];

      players.forEach(player => {
        if (player.position === 'Small Blind') {
          player.chips -= BLINDS.small;
        } else if (player.position === 'Big Blind') {
          player.chips -= BLINDS.big;
        }
      });

      const initialGameState = {
        players,
        communityCards: [],
        pot: BLINDS.small + BLINDS.big,
        currentBet: BLINDS.big,
        gamePhase: 'preflop',
        activePlayer: 3,
        dealerPosition: 0,
        deck: deck.slice(8),
        round: 1,
        winners: null,
        showdown: false,
        actionCount: 0,
        lastActionTime: Date.now()
      };

      setGameState(initialGameState);
      setSelectedMode(mode);
      setCurrentView('game');
      setIsProcessingAction(false);
      setActionInProgress(false);
      
      console.log('🎮 게임 초기화 완료', {
        mode: mode,
        activePlayer: initialGameState.activePlayer,
        players: players.map(p => ({ name: p.name, position: p.position, chips: p.chips }))
      });
      
      addToLog('🎯 새로운 학습 세션이 시작되었습니다!');
      addToLog(`📚 모드: ${LEARNING_MODES[mode]?.name[currentLanguage]}`);
      addToLog(`💰 스몰/빅 블라인드: ${BLINDS.small}/${BLINDS.big}`);
      addToLog(`🔰 피드백 수준: ${FEEDBACK_LEVELS[feedbackLevel]?.name[currentLanguage]}`);
      
      setTimeout(() => {
        addToLog(`👥 플레이어: ${players.map(p => p.name).join(', ')}`);
        addToLog(`🎴 당신의 핸드가 배급되었습니다!`);
      }, 1000);
      
      setPlayerStats(prev => ({ 
        ...prev, 
        handsPlayed: prev.handsPlayed + 1
      }));

      // 🎯 Show educational tip during AI thinking
      showLoadingTip(1500, feedbackLevel === 'master' ? 'advanced' : feedbackLevel === 'pro' ? 'intermediate' : 'basic');
      
      setTimeout(() => {
        const activePlayerObj = players[initialGameState.activePlayer];
        if (activePlayerObj && !activePlayerObj.isHuman) {
          const gameSnapshot = { ...initialGameState };
          processAIAction(gameSnapshot);
        }
      }, 1500);
    }, 500);
  };

  const addToLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    
    console.log('📝 게임 로그:', logMessage);
    
    setGameLog(prev => {
      const newLog = { 
        message: logMessage, 
        timestamp: Date.now(),
        id: Math.random()
      };
      const updatedLog = [...prev.slice(-20), newLog];
      console.log('📊 로그 업데이트:', updatedLog.length, '개 항목');
      return updatedLog;
    });
  };

  // 🎯 간단한 AI 액션 처리 (원래는 매우 복잡한 로직)
  const processAIAction = async (gameStateSnapshot, isForced = false) => {
    if (actionInProgress || isProcessingAction) {
      console.log('🚫 AI 액션 처리 중복 실행 방지');
      return;
    }
    
    const aiPlayer = gameStateSnapshot.players[gameStateSnapshot.activePlayer];
    
    if (!aiPlayer || aiPlayer.isHuman || aiPlayer.folded || aiPlayer.allIn) {
      console.log('❌ AI 액션 불가능');
      setIsProcessingAction(false);
      processNextAction(gameStateSnapshot);
      return;
    }
    
    let finalAction = 'fold';
    let finalAmount = 0;
    
    try {
      const aiDecision = getAIAction(aiPlayer, gameStateSnapshot, gameStateSnapshot.communityCards);
      console.log(`🤖 ${aiPlayer.name} AI 결정:`, aiDecision);
      
      if (aiDecision && aiDecision.action) {
        const callAmount = Math.max(0, gameStateSnapshot.currentBet - aiPlayer.currentBet);
        
        switch (aiDecision.action) {
          case 'fold':
            finalAction = 'fold';
            finalAmount = 0;
            break;
            
          case 'check':
            if (callAmount === 0) {
              finalAction = 'check';
              finalAmount = 0;
            } else {
              finalAction = 'fold';
              finalAmount = 0;
            }
            break;
            
          case 'call':
            if (callAmount === 0) {
              finalAction = 'check';
              finalAmount = 0;
            } else if (callAmount <= aiPlayer.chips) {
              finalAction = 'call';
              finalAmount = callAmount;
            } else {
              finalAction = 'allin';
              finalAmount = aiPlayer.chips;
            }
            break;
            
          case 'raise':
            if (aiDecision.amount > aiPlayer.chips + aiPlayer.currentBet) {
              finalAction = 'allin';
              finalAmount = aiPlayer.chips;
            } else if (aiDecision.amount <= gameStateSnapshot.currentBet) {
              if (callAmount <= aiPlayer.chips) {
                finalAction = 'call';
                finalAmount = callAmount;
              } else {
                finalAction = 'fold';
                finalAmount = 0;
              }
            } else {
              finalAction = 'raise';
              finalAmount = aiDecision.amount;
            }
            break;
            
          default:
            finalAction = 'fold';
            finalAmount = 0;
        }
      } else {
        const callAmount = Math.max(0, gameStateSnapshot.currentBet - aiPlayer.currentBet);
        if (callAmount === 0) {
          finalAction = 'check';
          finalAmount = 0;
        } else if (callAmount <= aiPlayer.chips * 0.2) {
          finalAction = 'call';
          finalAmount = callAmount;
        } else {
          finalAction = 'fold';
          finalAmount = 0;
        }
      }
    } catch (error) {
      console.error('❌ AI 액션 처리 중 오류:', error);
      finalAction = 'fold';
      finalAmount = 0;
    }
    
    console.log(`✅ ${aiPlayer.name} 최종 액션:`, { action: finalAction, amount: finalAmount });
    
    executeAction(gameStateSnapshot, aiPlayer.id, finalAction, finalAmount);
  };

  const executeAction = (currentGameState, playerId, action, amount) => {
    if (!currentGameState || !currentGameState.players) {
      console.log('❌ executeAction: 잘못된 게임 상태');
      return;
    }
    
    const player = currentGameState.players[playerId];
    if (!player) {
      console.log('❌ executeAction: 플레이어 없음', playerId);
      return;
    }
    
    console.log(`🎮 ${player.name} 액션 직접 실행:`, { action, amount });
    
    const newGameState = { ...currentGameState };
    let actionAmount = amount;
    
    switch (action) {
      case 'fold':
        newGameState.players = [...currentGameState.players];
        newGameState.players[playerId] = {
          ...player,
          folded: true,
          lastAction: 'fold'
        };
        addToLog(`${player.name}이 폴드했습니다.`);
        break;
        
      case 'check':
        newGameState.players = [...currentGameState.players];
        newGameState.players[playerId] = {
          ...player,
          lastAction: 'check'
        };
        addToLog(`${player.name}이 체크했습니다.`);
        break;
        
      case 'call':
        actionAmount = Math.min(amount, player.chips);
        newGameState.players = [...currentGameState.players];
        newGameState.players[playerId] = {
          ...player,
          chips: player.chips - actionAmount,
          currentBet: player.currentBet + actionAmount,
          lastAction: 'call'
        };
        newGameState.pot = (newGameState.pot || 0) + actionAmount;
        addToLog(`${player.name}이 ${actionAmount.toLocaleString()}를 콜했습니다.`);
        break;
        
      case 'raise':
        const betDifference = actionAmount - player.currentBet;
        const actualBet = Math.min(betDifference, player.chips);
        newGameState.players = [...currentGameState.players];
        newGameState.players[playerId] = {
          ...player,
          chips: player.chips - actualBet,
          currentBet: actionAmount,
          lastAction: 'raise'
        };
        newGameState.pot = (newGameState.pot || 0) + actualBet;
        newGameState.currentBet = actionAmount;
        addToLog(`${player.name}이 ${actionAmount.toLocaleString()}로 레이즈했습니다.`);
        break;
        
      default:
        console.log('❌ 알 수 없는 액션:', action);
        return;
    }
    
    newGameState.actionCount = (newGameState.actionCount || 0) + 1;
    newGameState.lastActionTime = Date.now();
    
    setGameState(newGameState);
    console.log(`✅ ${player.name} 액션 완료 - 다음 액션 처리`);
    
    setTimeout(() => {
      processNextAction(newGameState);
    }, 1000);
  };

  const handlePlayerAction = async (action, amount = 0, isForced = false, targetPlayerId = null) => {
    if (actionInProgress || isProcessingAction) {
      console.log('🚫 액션 이미 처리 중, 무시:', { action, amount, isForced });
      return;
    }
    
    if (!gameState || gameState.gamePhase === 'showdown') {
      console.log('🚫 게임 상태 없음 또는 쇼다운');
      return;
    }
    
    console.log('🔒 액션 처리 시작:', { action, amount, isForced, targetPlayerId });
    setActionInProgress(true);
    setIsProcessingAction(true);
    
    let targetPlayerIndex = targetPlayerId !== null ? targetPlayerId : gameState.activePlayer;
    const currentPlayer = gameState.players[targetPlayerIndex];
    
    if (!currentPlayer) {
      console.log('🚫 타겟 플레이어 없음:', { targetPlayerId, activePlayer: gameState.activePlayer });
      setActionInProgress(false);
      setIsProcessingAction(false);
      return;
    }
    
    console.log(`🎮 ${currentPlayer.name} 액션 처리:`, { 
      action, 
      amount, 
      chips: currentPlayer.chips, 
      currentBet: currentPlayer.currentBet,
      isForced 
    });
    
    let newGameState = { ...gameState };
    let actionAmount = amount;
    
    const actionData = { action, amount: actionAmount, player: currentPlayer };
    setLastAction(actionData);
    
    try {
      switch (action) {
        case 'fold':
          newGameState.players[targetPlayerIndex] = {
            ...currentPlayer,
            folded: true,
            lastAction: 'fold'
          };
          addToLog(`${currentPlayer.name}이 폴드했습니다.`);
          break;
          
        case 'check':
          newGameState.players[targetPlayerIndex] = {
            ...currentPlayer,
            lastAction: 'check'
          };
          addToLog(`${currentPlayer.name}이 체크했습니다.`);
          break;
          
        case 'call':
          actionAmount = Math.min(amount, currentPlayer.chips);
          newGameState.players[targetPlayerIndex] = {
            ...currentPlayer,
            chips: currentPlayer.chips - actionAmount,
            currentBet: currentPlayer.currentBet + actionAmount,
            lastAction: 'call'
          };
          newGameState.pot += actionAmount;
          addToLog(`${currentPlayer.name}이 ${actionAmount.toLocaleString()}를 콜했습니다.`);
          break;
          
        case 'raise':
          const betDifference = actionAmount - currentPlayer.currentBet;
          const actualBet = Math.min(betDifference, currentPlayer.chips);
          newGameState.players[targetPlayerIndex] = {
            ...currentPlayer,
            chips: currentPlayer.chips - actualBet,
            currentBet: actionAmount,
            lastAction: 'raise'
          };
          newGameState.pot += actualBet;
          newGameState.currentBet = actionAmount;
          addToLog(`${currentPlayer.name}이 ${actionAmount.toLocaleString()}로 레이즈했습니다.`);
          break;
          
        case 'allin':
          actionAmount = currentPlayer.chips;
          const newTotalBet = currentPlayer.currentBet + actionAmount;
          newGameState.players[targetPlayerIndex] = {
            ...currentPlayer,
            chips: 0,
            currentBet: newTotalBet,
            lastAction: 'allin',
            allIn: true
          };
          newGameState.pot += actionAmount;
          if (newTotalBet > newGameState.currentBet) {
            newGameState.currentBet = newTotalBet;
          }
          addToLog(`🔥 ${currentPlayer.name}이 올인했습니다! (${actionAmount.toLocaleString()})`);
          break;
          
        default:
          console.log('❌ 알 수 없는 액션:', action);
          setActionInProgress(false);
          setIsProcessingAction(false);
          return;
      }

      newGameState.actionCount = (newGameState.actionCount || 0) + 1;
      newGameState.lastActionTime = Date.now();
      setGameState(newGameState);
      
      console.log(`✅ ${currentPlayer.name} 액션 완료`);
      
      if (currentPlayer.isHuman) {
        const feedback = generateLearningFeedback(action, newGameState);
        
        if (feedback.length > 0) {
          setFeedbackMessages(prev => {
            const newFeedback = feedback.map(fb => ({
              ...fb,
              id: Math.random(),
              timestamp: Date.now()
            }));
            return [...prev, ...newFeedback].slice(-3);
          });
          
          feedback.forEach(fb => {
            setTimeout(() => {
              addToLog(`${fb.icon} ${fb.message}`);
            }, 1000 + Math.random() * 1000);
          });
          
          setTimeout(() => {
            setFeedbackMessages(prev => 
              prev.filter(msg => Date.now() - msg.timestamp > 5000)
            );
          }, 5000);
        }
        
        const isGoodDecision = feedback.some(fb => fb.type !== 'mistake');
        if (isGoodDecision) {
          setPlayerStats(prev => ({
            ...prev,
            goodDecisions: prev.goodDecisions + 1,
            learningScore: prev.learningScore + 5
          }));
        } else if (feedback.some(fb => fb.type === 'mistake')) {
          setPlayerStats(prev => ({
            ...prev,
            mistakesMade: prev.mistakesMade + 1
          }));
        }
      }
      
      setTimeout(() => {
        setActionInProgress(false);
        
        if (!newGameState || newGameState.gamePhase === 'showdown') {
          console.log('🚫 다음 액션 처리 취소: 게임 종료됨');
          return;
        }
        
        processNextAction(newGameState);
      }, 800);
      
    } catch (error) {
      console.error('❌ 액션 처리 중 오류:', error);
      setActionInProgress(false);
      setIsProcessingAction(false);
    }
  };

  const processNextAction = (currentGameState) => {
    console.log('🔄 다음 액션 처리 시작');

    const activePlayers = currentGameState.players.filter(p => !p.folded);
    
    if (activePlayers.length === 1) {
      console.log('🏆 한 명만 남음, 게임 종료');
      endHand(currentGameState, activePlayers[0]);
      return;
    }

    const playersCanAct = activePlayers.filter(p => !p.allIn && p.chips > 0);
    
    if (playersCanAct.length <= 1) {
      console.log('✅ 액션 가능한 플레이어가 1명 이하 - 쇼다운으로');
      showdown(currentGameState);
      return;
    }

    const maxBet = Math.max(...currentGameState.players.map(p => p.folded ? 0 : p.currentBet));
    
    const isPreflop = currentGameState.gamePhase === 'preflop';
    
    const playersNeedingCall = playersCanAct.filter(p => p.currentBet < maxBet);
    
    let playersNeedingFirstAction = [];
    
    if (isPreflop) {
      playersNeedingFirstAction = playersCanAct.filter(p => {
        if (p.lastAction === 'blind') return false;
        return !p.lastAction || p.lastAction === null;
      });
    } else {
      playersNeedingFirstAction = playersCanAct.filter(p => 
        !p.lastAction || p.lastAction === null
      );
    }

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

    if (!hasBettingDifferences && !hasPlayersNeedingAction) {
      console.log('✅ 베팅 라운드 완료, 다음 단계로');
      moveToNextPhase(currentGameState);
      return;
    }

    let nextPlayerIndex = (currentGameState.activePlayer + 1) % currentGameState.players.length;
    let attempts = 0;
    
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
      
      if (!nextPlayer.folded && !nextPlayer.allIn && nextPlayer.chips > 0) {
        if (nextPlayer.currentBet < maxBet || playersNeedingFirstAction.includes(nextPlayer)) {
          console.log(`✅ ${nextPlayer.name}이 다음 액션`);
          
          const newGameState = { ...currentGameState, activePlayer: nextPlayerIndex };
          setGameState(newGameState);

          if (!nextPlayer.isHuman) {
            // 🎯 Show educational tip during AI decision making
            showLoadingTip(1500, feedbackLevel === 'master' ? 'advanced' : feedbackLevel === 'pro' ? 'intermediate' : 'basic');
            
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

    console.log('⚠️ 액션할 플레이어를 찾을 수 없음, 다음 단계로 강제 이동');
    moveToNextPhase(currentGameState);
  };

  const moveToNextPhase = (currentGameState) => {
    const phases = ['preflop', 'flop', 'turn', 'river', 'showdown'];
    const currentPhaseIndex = phases.indexOf(currentGameState.gamePhase);
    
    if (currentPhaseIndex >= phases.length - 1) {
      showdown(currentGameState);
      return;
    }

    const nextPhase = phases[currentPhaseIndex + 1];
    let newCommunityCards = [...currentGameState.communityCards];
    
    if (nextPhase === 'flop') {
      newCommunityCards = currentGameState.deck.slice(0, 3);
      addToLog(`🃏 플롭: ${newCommunityCards.map(c => c.rank + c.suit).join(' ')}`);
    } else if (nextPhase === 'turn') {
      newCommunityCards.push(currentGameState.deck[3]);
      addToLog(`🃏 턴: ${currentGameState.deck[3].rank + currentGameState.deck[3].suit}`);
    } else if (nextPhase === 'river') {
      newCommunityCards.push(currentGameState.deck[4]);
      addToLog(`🃏 리버: ${currentGameState.deck[4].rank + currentGameState.deck[4].suit}`);
    }

    const resetPlayers = currentGameState.players.map(p => ({
      ...p,
      currentBet: 0,
      lastAction: null
    }));

    const activePlayers = resetPlayers.filter(p => !p.folded && !p.allIn);
    if (activePlayers.length === 0) {
      showdown({ ...currentGameState, players: resetPlayers, communityCards: newCommunityCards });
      return;
    }

    let firstActiveIndex;
    
    const smallBlindIndex = resetPlayers.findIndex(p => 
      p.position === 'Small Blind' || p.position.includes('SB')
    );
    
    if (smallBlindIndex >= 0 && !resetPlayers[smallBlindIndex].folded && !resetPlayers[smallBlindIndex].allIn) {
      firstActiveIndex = smallBlindIndex;
    } else {
      const dealerIndex = currentGameState.dealerPosition || 0;
      firstActiveIndex = (dealerIndex + 1) % resetPlayers.length;
      
      let attempts = 0;
      while (attempts < resetPlayers.length && 
             (resetPlayers[firstActiveIndex].folded || resetPlayers[firstActiveIndex].allIn)) {
        firstActiveIndex = (firstActiveIndex + 1) % resetPlayers.length;
        attempts++;
      }
    }

    if (firstActiveIndex >= resetPlayers.length || 
        resetPlayers.every(p => p.folded || p.allIn)) {
      showdown({ ...currentGameState, players: resetPlayers, communityCards: newCommunityCards });
      return;
    }

    const newGameState = {
      ...currentGameState,
      gamePhase: nextPhase,
      communityCards: newCommunityCards,
      currentBet: 0,
      activePlayer: firstActiveIndex,
      players: resetPlayers,
      actionCount: 0,
      lastActionTime: Date.now()
    };

    setGameState(newGameState);

    if (Math.random() < 0.3 && selectedMode) {
      const theoryLevel = LEARNING_MODES[selectedMode].theory;
      const randomTheory = getRandomTheory(theoryLevel);
      if (randomTheory) {
        setTimeout(() => setShowTheoryPopup(randomTheory), 2000);
      }
    }

    // 🎯 Show educational tip during phase transition AI thinking
    if (!newGameState.players[firstActiveIndex].isHuman) {
      showLoadingTip(1500, feedbackLevel === 'master' ? 'advanced' : feedbackLevel === 'pro' ? 'intermediate' : 'basic');
    }
    
    setTimeout(() => {
      if (!newGameState.players[firstActiveIndex].isHuman) {
        const gameSnapshot = { ...newGameState };
        processAIAction(gameSnapshot);
      } else {
        setIsProcessingAction(false);
      }
    }, 1500);
  };

  const showdown = (currentGameState) => {
    const activePlayers = currentGameState.players.filter(p => !p.folded);
    const playerHands = activePlayers.map(player => ({
      player,
      hand: evaluateHand([...player.cards, ...currentGameState.communityCards])
    }));

    playerHands.sort((a, b) => b.hand.value - a.hand.value);
    const winner = playerHands[0];

    addToLog(`🏆 쇼다운!`);
    playerHands.forEach(({ player, hand }) => {
      addToLog(`${player.name}: ${hand.description}`);
    });
    addToLog(`🎉 ${winner.player.name}이 ${currentGameState.pot.toLocaleString()}를 획득했습니다!`);

    if (winner.player.isHuman) {
      const newStats = {
        ...playerStats,
        handsPlayed: playerStats.handsPlayed + 1,
        handsWon: playerStats.handsWon + 1,
        totalEarnings: playerStats.totalEarnings + currentGameState.pot,
        currentStreak: playerStats.currentStreak + 1,
        learningScore: playerStats.learningScore + 15,
        totalChips: playerStats.totalChips + currentGameState.pot
      };
      console.log('🏆 플레이어 승리! 통계 업데이트:', newStats);
      setPlayerStats(newStats);
      checkProChallenge(newStats);
    } else {
      const humanPlayer = currentGameState.players.find(p => p.isHuman);
      const newStats = {
        ...playerStats,
        handsPlayed: playerStats.handsPlayed + 1,
        totalEarnings: playerStats.totalEarnings - (humanPlayer?.currentBet || 0),
        currentStreak: 0,
        totalChips: Math.max(0, playerStats.totalChips - (humanPlayer?.currentBet || 0))
      };
      console.log('😔 플레이어 패배! 통계 업데이트:', newStats);
      setPlayerStats(newStats);
    }

    endHand(currentGameState, winner.player, winner.hand);
  };

  const endHand = (currentGameState, winner, winningHand = null) => {
    const newPlayers = currentGameState.players.map(p => 
      p.id === winner.id 
        ? { ...p, chips: p.chips + currentGameState.pot }
        : p
    );

    const humanPlayer = newPlayers.find(p => p.isHuman);
    if (humanPlayer) {
      setPlayerStats(prev => ({
        ...prev,
        totalChips: humanPlayer.chips
      }));
      console.log('💰 플레이어 칩 동기화:', humanPlayer.chips);
    }

    const newGameState = {
      ...currentGameState,
      gamePhase: 'showdown',
      winners: [{ player: winner, hand: winningHand }],
      players: newPlayers,
      showdown: true
    };
    
    const aiPlayers = newPlayers.filter(p => !p.isHuman);
    const updatedAiChips = { ...aiChips };
    
    aiPlayers.forEach(aiPlayer => {
      const aiKey = aiPlayer.name === 'AI Pro' ? 'aiPro' : 
                   aiPlayer.name === 'AI Shark' ? 'aiShark' : 'aiRock';
      updatedAiChips[aiKey] = aiPlayer.chips;
    });
    
    setAiChips(updatedAiChips);
    console.log('🤖 AI 칩 상태 업데이트:', updatedAiChips);

    setGameState(newGameState);
    setIsProcessingAction(false);
    setActionInProgress(false);

    if (autoRestart) {
      addToLog('🔄 자동 재시작이 활성화되어 있습니다...');
      setRestartCountdown(5);
    }
    setTimeout(() => {
      addToLog('🎮 새 게임을 시작하려면 아래 버튼을 클릭하세요.');
    }, 3000);
  };

  const startNewHand = () => {
    addToLog('🔄 새로운 핸드를 시작합니다...');
    setTimeout(() => {
      initializeGame(selectedMode);
    }, 1000);
  };

  const handleRewardAd = () => {
    setPlayerStats(prev => ({
      ...prev,
      totalChips: prev.totalChips + 2000
    }));
    setShowRewardAd(false);
    addToLog('💰 광고 시청으로 2000 칩을 받았습니다!');
  };

  // 🎯 SEO 페이지별 메타데이터
  const getPageSEO = () => {
    switch (currentView) {
      case 'puzzle':
        return {
          title: '홀덤 퍼즐 게임 - 무료 칩 획득',
          description: '올인 vs 폴드 퍼즐로 포커 실력을 키우고 무료 칩을 획득하세요! 매일 새로운 퍼즐과 보상이 기다립니다.'
        };
      case 'blog':
        return {
          title: '포커 가이드 및 전략',
          description: '텍사스 홀덤 포커의 모든 것! 초보자부터 프로까지 체계적인 포커 학습 가이드와 실전 전략을 제공합니다.'
        };
      case 'faq':
        return {
          title: '자주 묻는 질문',
          description: '홀덤마스터 프로 사용법부터 포커 전략까지, 가장 많이 묻는 질문들에 대한 상세한 답변을 확인하세요.'
        };
      case 'glossary':
        return {
          title: '포커 용어사전',
          description: '텍사스 홀덤의 모든 용어를 한국어와 영어로 상세하게 설명합니다. 포커 용어를 쉽게 찾아보세요.'
        };
      case 'theory':
        return {
          title: '포커 이론 및 전략',
          description: '체계적인 포커 이론 학습! 초보자부터 마스터까지 단계별 포커 전략과 고급 기법을 배워보세요.'
        };
      case 'game':
        return {
          title: `${selectedMode ? LEARNING_MODES[selectedMode]?.name : '포커'} 학습`,
          description: 'AI와 함께하는 실시간 포커 학습! 체계적인 피드백과 함께 실전에서 포커 실력을 향상시키세요.'
        };
      default:
        return {
          title: '홀덤마스터 프로 - 포커 학습 & 퍼즐 게임',
          description: '무료 포커 학습 플랫폼! AI와 함께하는 체계적인 학습, 홀덤 퍼즐 게임, 무료 칩 시스템으로 재미있게 포커를 배워보세요.'
        };
    }
  };

  // 🎯 뷰 렌더링 함수들
  const renderMenuView = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 relative overflow-hidden">
      <div className="sticky top-0 z-30">
        <AdBanner />
      </div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-8xl">♠</div>
        <div className="absolute top-40 right-32 text-6xl">♥</div>
        <div className="absolute bottom-32 left-32 text-7xl">♦</div>
        <div className="absolute bottom-20 right-20 text-9xl">♣</div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-wide">
            🃏 {LANGUAGES[currentLanguage].ui.title}
          </h1>
          <p className="text-2xl text-emerald-200 mb-4">{LANGUAGES[currentLanguage].ui.subtitle}</p>
          <p className="text-emerald-300">{LANGUAGES[currentLanguage].ui.description}</p>
          
          {/* 🎯 Educational Disclaimer Section */}
          <div className="mt-8 bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-300/30">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="w-8 h-8 text-blue-300 mr-3" />
              <h2 className="text-xl font-bold text-blue-200">{LANGUAGES[currentLanguage].ui.educationalTitle}</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-400/30">
                <h3 className="text-green-300 font-semibold mb-2 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {LANGUAGES[currentLanguage].ui.appPurpose}
                </h3>
                <ul className="text-green-200 text-sm space-y-1">
                  {LANGUAGES[currentLanguage].ui.purposeList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-900/20 rounded-lg p-4 border border-red-400/30">
                <h3 className="text-red-300 font-semibold mb-2 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  {LANGUAGES[currentLanguage].ui.notGambling}
                </h3>
                <ul className="text-red-200 text-sm space-y-1">
                  {LANGUAGES[currentLanguage].ui.notGamblingList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-4 bg-yellow-900/20 rounded-lg p-4 border border-yellow-400/30">
              <h3 className="text-yellow-300 font-semibold mb-2 flex items-center">
                <Book className="w-5 h-5 mr-2" />
                {LANGUAGES[currentLanguage].ui.learningGoals}
              </h3>
              <p className="text-yellow-200 text-sm leading-relaxed">
                {LANGUAGES[currentLanguage].ui.goalDescription}
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-blue-200 text-xs">
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                {LANGUAGES[currentLanguage].ui.ageRestriction}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <AdBanner 
            adSlot="1111111111" 
            className="bg-white/5 backdrop-blur-sm rounded-xl p-2"
          />
        </div>

        <div className="mb-8">
          <div className="text-center mb-4">
            <h3 className="text-white text-lg font-bold mb-2">{LANGUAGES[currentLanguage].ui.feedbackLevel}</h3>
            <p className="text-emerald-200 text-sm">{LANGUAGES[currentLanguage].ui.feedbackDesc}</p>
          </div>
          <div className="flex justify-center gap-3 mb-6">
            {Object.entries(FEEDBACK_LEVELS).map(([key, level]) => (
              <button
                key={key}
                onClick={() => setFeedbackLevel(key)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                  feedbackLevel === key 
                    ? 'bg-yellow-500 text-yellow-900 shadow-lg scale-105' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span className="text-lg">{level.icon}</span>
                <span>{level.name[currentLanguage]}</span>
              </button>
            ))}
          </div>
          <div className="text-center">
            <p className="text-emerald-300 text-sm">
              {FEEDBACK_LEVELS[feedbackLevel].description[currentLanguage]}
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <h3 className="text-white text-lg font-bold mb-3 flex items-center gap-2">
                🌍 {LANGUAGES[currentLanguage].ui.language}
              </h3>
              <div className="flex gap-2">
                {Object.entries(LANGUAGES).map(([langCode, lang]) => (
                  <button
                    key={langCode}
                    onClick={() => setCurrentLanguage(langCode)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      currentLanguage === langCode 
                        ? 'bg-emerald-600 text-white shadow-lg scale-105' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <NicknameInput
              playerNickname={playerNickname}
              LANGUAGES={LANGUAGES}
              currentLanguage={currentLanguage}
              onSave={saveNickname}
              onClear={clearNickname}
            />

          </div>
        </div>

        {/* 🚀 칩 및 금고 상태 표시 (개선됨) - Educational Context */}
        <div className="mb-6">
          <div className="bg-amber-900/20 rounded-lg p-4 border border-amber-400/30 mb-4">
            <h3 className="text-amber-300 font-semibold mb-2 flex items-center">
              <Coins className="w-5 h-5 mr-2" />
              {LANGUAGES[currentLanguage].ui.virtualChipTitle}
            </h3>
            <p className="text-amber-200 text-sm">
              {LANGUAGES[currentLanguage].ui.virtualChipDesc}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          
          {/* 게임 칩 */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <Coins className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold">{playerStats.totalChips.toLocaleString()}</div>
            <div className="text-sm text-emerald-200">{LANGUAGES[currentLanguage].ui.virtualChipsLabel}</div>
          </div>
          
          {/* 금고 */}
          <div 
            onClick={() => setShowVaultModal(true)}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center cursor-pointer hover:bg-white/20 transition-all transform hover:scale-105"
          >
            <Lock className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold">{LANGUAGES[currentLanguage].ui.learningVault}</div>
            <div className="text-sm text-emerald-200">{LANGUAGES[currentLanguage].ui.virtualChipRecharge}</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold">{playerStats.handsWon}</div>
            <div className="text-sm text-emerald-200">{LANGUAGES[currentLanguage].ui.handsWon}</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold">{playerStats.learningScore}</div>
            <div className="text-sm text-emerald-200">{LANGUAGES[currentLanguage].ui.learningScore}</div>
          </div>
          
        </div>

        {/* 🚀 칩 부족 알림 */}
        {playerStats.totalChips <= 100 && (
          <div className="bg-red-600/90 border border-red-400 rounded-xl p-4 mb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-bold text-white">칩이 부족합니다!</h3>
            </div>
            <p className="text-red-100 mb-4">무료 금고에서 칩을 충전하거나 퍼즐 게임을 플레이하세요.</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowVaultModal(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 px-6 py-3 rounded-lg font-bold transition-colors"
              >
                💰 금고 열기
              </button>
              <button
                onClick={() => setCurrentView('puzzle')}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                🧩 퍼즐 플레이
              </button>
            </div>
          </div>
        )}

        {/* 🚀 학습 모드 선택 (퍼즐 게임 추가) */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white text-center mb-4">{LANGUAGES[currentLanguage].ui.gameMode}</h2>
          
          {/* Educational Context for Game Modes */}
          <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-400/30 mb-6">
            <h3 className="text-indigo-300 font-semibold mb-2 flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              {LANGUAGES[currentLanguage].ui.modeGoals}
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-indigo-200">
                {LANGUAGES[currentLanguage].ui.puzzleMode}
              </div>
              <div className="text-indigo-200">
                {LANGUAGES[currentLanguage].ui.basicMode}
              </div>
              <div className="text-indigo-200">
                {LANGUAGES[currentLanguage].ui.advancedMode}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 🚀 퍼즐 게임 (특별 강조) */}
            <div
              onClick={() => setCurrentView('puzzle')}
              className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 cursor-pointer hover:from-purple-700 hover:to-purple-900 transition-all duration-300 text-white group transform hover:scale-105 shadow-xl border-2 border-purple-400"
            >
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg mx-auto">
                <Puzzle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">홀덤 퍼즐 🔥</h3>
              <p className="text-purple-100 mb-4 text-center text-sm leading-relaxed">
                올인 vs 폴드 - 판단력을 테스트하고 학습용 가상 칩을 획득하세요!
              </p>
              <div className="text-center">
                <div className="inline-block bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded mb-3 font-bold">
                  {LANGUAGES[currentLanguage].ui.virtualChipEarn}
                </div>
              </div>
              <div className="flex items-center justify-center text-purple-200 group-hover:text-white transition-colors">
                <span className="font-semibold">퍼즐 시작</span>
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 기존 학습 모드들 */}
            {Object.entries(LEARNING_MODES).filter(([key]) => key !== 'puzzle').map(([key, mode]) => {
              const IconComponent = mode.icon;
              const isDisabled = playerStats.totalChips <= 0;
              return (
                <div
                  key={key}
                  onClick={() => !isDisabled && initializeGame(key)}
                  className={`bg-white/10 backdrop-blur-md rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 text-white group transform hover:scale-105 shadow-xl ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className={`w-16 h-16 ${mode.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg mx-auto`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{mode.name[currentLanguage]}</h3>
                  <p className="text-emerald-200 mb-4 text-center text-sm leading-relaxed">
                    {mode.description[currentLanguage]}
                  </p>
                  {!isDisabled && (
                    <div className="flex items-center justify-center text-emerald-300 group-hover:text-white transition-colors">
                      <span className="font-semibold">{currentLanguage === 'ko' ? '학습 시작' : 'Start Learning'}</span>
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>

        {/* 기존 통계 섹션 등... */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">🏆 학습 성과</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{playerStats.goodDecisions}</div>
              <div className="text-emerald-200">올바른 결정</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{puzzleStats.total}</div>
              <div className="text-emerald-200">퍼즐 플레이</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {puzzleStats.total > 0 ? Math.round((puzzleStats.correct / puzzleStats.total) * 100) : 0}%
              </div>
              <div className="text-emerald-200">퍼즐 정답률</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${playerStats.totalEarnings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${playerStats.totalEarnings.toLocaleString()}
              </div>
              <div className="text-emerald-200">총 수익</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTheoryView = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <BookOpen className="w-10 h-10" />
            포커 이론 & 전략
          </h1>
          <button
            onClick={() => setCurrentView('menu')}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg transition-colors"
          >
            메뉴로 돌아가기
          </button>
        </div>

        {Object.entries(POKER_THEORY).map(([level, data]) => (
          <div key={level} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <GraduationCap className="w-8 h-8" />
              {data.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.theories.map((theory, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 text-white"
                  onClick={() => setShowTheoryPopup(theory)}
                >
                  <h3 className="text-xl font-bold mb-3">{theory.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {theory.content}
                  </p>
                  <div className="flex items-center text-blue-300 text-sm">
                    <span>자세히 보기</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGameView = () => {
    if (!gameState) return null;

    const currentPlayer = gameState.players[gameState.activePlayer];
    const isPlayerTurn = currentPlayer?.isHuman && !isProcessingAction && gameState.gamePhase !== 'showdown';
    const humanPlayer = gameState.players.find(p => p.isHuman);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-800 to-emerald-900 p-4">
        <div className="max-w-7xl mx-auto">
          <LearningFeedback
            action={lastAction}
            gameState={gameState}
            playerCards={humanPlayer?.cards || []}
            communityCards={gameState.communityCards}
            mode={selectedMode}
          />

          <div className="bg-black/40 backdrop-blur-md rounded-lg p-4 mb-6 text-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentView('menu')}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                >
                  학습 종료
                </button>
                <button
                  onClick={() => {
                    resetGameState();
                    setTimeout(() => initializeGame(selectedMode), 500);
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors"
                >
                  🔄 재시작
                </button>
                
                <button
                  onClick={() => setAutoRestart(!autoRestart)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    autoRestart 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  {autoRestart ? '🔄 자동재시작 ON' : '⏸️ 자동재시작 OFF'}
                </button>
                
                {restartCountdown > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="bg-orange-600 px-4 py-2 rounded-lg text-white font-bold animate-pulse">
                      ⏱️ {restartCountdown}초 후 재시작
                    </div>
                    <button
                      onClick={() => {
                        setRestartCountdown(0);
                        addToLog('🛑 자동 재시작이 취소되었습니다.');
                      }}
                      className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-white font-bold transition-colors"
                    >
                      ❌ 취소
                    </button>
                  </div>
                )}
                
                <div className={"flex items-center gap-2 px-3 py-1 rounded-full " + (LEARNING_MODES[selectedMode] ? LEARNING_MODES[selectedMode].color : 'bg-gray-500')}>
                  {LEARNING_MODES[selectedMode] && (
                    <div className="w-4 h-4">
                      {selectedMode === 'probability' && <Calculator className="w-4 h-4" />}
                      {selectedMode === 'bluffing' && <Eye className="w-4 h-4" />}
                      {selectedMode === 'position' && <Target className="w-4 h-4" />}
                      {selectedMode === 'reading' && <Brain className="w-4 h-4" />}
                      {selectedMode === 'advanced' && <Database className="w-4 h-4" />}
                    </div>
                  )}
                  <span className="text-white text-sm font-semibold">
                    {LEARNING_MODES[selectedMode] ? LEARNING_MODES[selectedMode].name : 'Unknown Mode'}
                  </span>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">${gameState.pot.toLocaleString()}</div>
                <div className="text-sm opacity-80">{gameState.gamePhase.toUpperCase()}</div>
              </div>
              
              <div className="text-right">
                <div className="text-lg">현재 베팅: ${gameState.currentBet.toLocaleString()}</div>
                {isPlayerTurn && <div className="text-yellow-400 font-bold animate-pulse">{LANGUAGES[currentLanguage].ui.yourTurn}!</div>}
              </div>
            </div>
          </div>

          {feedbackMessages.length > 0 && (
            <div className="mb-6">
              <div className="space-y-3">
                {feedbackMessages.map((feedback) => (
                  <div
                    key={feedback.id}
                    className={`mx-auto max-w-4xl p-4 rounded-lg shadow-lg animate-pulse ${
                      feedback.type === 'mistake' 
                        ? 'bg-red-600/90 border-l-4 border-red-400' 
                        : feedback.type === 'action'
                        ? 'bg-blue-600/90 border-l-4 border-blue-400'
                        : 'bg-green-600/90 border-l-4 border-green-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{feedback.icon}</span>
                      <div className="text-white font-semibold">
                        {feedback.message}
                      </div>
                      <button
                        onClick={() => setFeedbackMessages(prev => prev.filter(msg => msg.id !== feedback.id))}
                        className="ml-auto text-white/70 hover:text-white transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 🎯 Educational Loading Tip Overlay */}
          {loadingTipVisible && currentLoadingTip && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 mx-4 max-w-2xl shadow-2xl border border-blue-300/30">
                <div className="text-center">
                  <div className="text-4xl mb-4">{currentLoadingTip.icon}</div>
                  <div className="flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-blue-200 mr-2" />
                    <span className="text-blue-200 text-sm font-medium">{currentLoadingTip.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{currentLoadingTip.title}</h3>
                  <p className="text-blue-100 text-lg leading-relaxed mb-6">{currentLoadingTip.tip}</p>
                  
                  {/* AI thinking indicator */}
                  <div className="flex items-center justify-center gap-3 text-blue-200">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></div>
                    </div>
                    <span className="text-sm">AI가 판단하는 동안 학습하세요</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3">
              <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-2xl p-8 mb-6 shadow-2xl border-4 border-yellow-600/30">
                <div className="text-center mb-8">
                  <h3 className="text-white text-xl font-bold mb-4">{LANGUAGES[currentLanguage].ui.communityCards}</h3>
                  <div className="flex justify-center gap-4">
                    {[...Array(5)].map((_, idx) => (
                      <Card 
                        key={idx} 
                        card={gameState.communityCards[idx]} 
                        isHighlighted={gameState.communityCards[idx] && highlightedCards.includes(gameState.communityCards[idx].id)}
                      />
                    ))}
                  </div>
                  
                  {currentHandText && (
                    <div className="text-center mt-4">
                      <div className="inline-block bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                        🎯 {currentHandText}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {gameState.players.map((player, idx) => (
                    <Player
                      key={player.id}
                      player={player}
                      isActive={idx === gameState.activePlayer}
                      isDealer={idx === gameState.dealerPosition}
                      isShowdown={gameState.showdown}
                      position={player.position}
                      bestHand={gameState.winners?.find(w => w.player.id === player.id)?.hand}
                      highlightedCards={highlightedCards}
                      LANGUAGES={LANGUAGES}
                      currentLanguage={currentLanguage}
                    />
                  ))}
                </div>

                {gameState.gamePhase === 'showdown' && (
                  <div className="text-center mt-6">
                    <button
                      onClick={startNewHand}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors"
                    >
                      🎮 새 게임 시작
                    </button>
                  </div>
                )}
              </div>

              {/* 🚀 개선된 베팅 컨트롤 사용 */}
              {isPlayerTurn && (
                <EnhancedBettingControls
                  player={currentPlayer}
                  gameState={gameState}
                  onAction={handlePlayerAction}
                  mode={selectedMode}
                  LANGUAGES={LANGUAGES}
                  currentLanguage={currentLanguage}
                />
              )}
            </div>

            <div className="space-y-6">
              
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-2">
                <AdBanner 
                  adSlot="3333333333" 
                  className="w-full"
                />
              </div>
              
              {humanPlayer && (
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    실시간 분석
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-center gap-2 mb-4">
                      {humanPlayer.cards.map((card, idx) => (
                        <Card 
                          key={idx} 
                          card={card} 
                          isHighlighted={highlightedCards.includes(card.id)}
                        />
                      ))}
                    </div>
                    
                    {gameState.communityCards.length > 0 && (
                      <div>
                        <div className="text-sm font-semibold text-blue-300 mb-2">{LANGUAGES[currentLanguage].ui.currentHand}</div>
                        <div className="text-sm bg-black/20 p-2 rounded">
                          {evaluateHand([...humanPlayer.cards, ...gameState.communityCards]).description}
                        </div>
                      </div>
                    )}
                    
                    {gameState.communityCards.length > 0 && gameState.communityCards.length < 5 && (
                      <div className="space-y-2">
                        <div className="text-sm">
                          <div className="flex justify-between">
                            <span>아웃츠:</span>
                            <span className="font-bold">{calculateOuts(humanPlayer.cards, gameState.communityCards)}</span>
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="flex justify-between">
                            <span>승률:</span>
                            <span className="font-bold">{calculateWinProbability(calculateOuts(humanPlayer.cards, gameState.communityCards), gameState.gamePhase)}%</span>
                          </div>
                        </div>
                        {gameState.currentBet > 0 && (
                          <div className="text-sm">
                            <div className="flex justify-between">
                              <span>팟 오즈:</span>
                              <span className="font-bold">{((gameState.currentBet / (gameState.pot + gameState.currentBet)) * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                  {LANGUAGES[currentLanguage].ui.gameLog} ({gameLog.length})
                </h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {gameLog.length > 0 ? (
                    gameLog.map((log) => (
                      <div key={log.id} className="text-sm p-2 bg-black/20 rounded text-white">
                        {log.message}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm p-2 bg-black/20 rounded text-gray-400 italic">
                      게임을 시작하면 로그가 여기에 표시됩니다...
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  학습 진행
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>이번 세션:</span>
                    <span className="font-bold">{playerStats.handsPlayed} 핸드</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>승률:</span>
                    <span className="font-bold">
                      {playerStats.handsPlayed > 0 ? Math.round((playerStats.handsWon / playerStats.handsPlayed) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>수익:</span>
                    <span className={"font-bold " + (playerStats.totalEarnings >= 0 ? 'text-green-400' : 'text-red-400')}>
                      ${playerStats.totalEarnings.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>학습 점수:</span>
                    <span className="font-bold text-yellow-400">
                      {playerStats.learningScore}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
{currentLanguage === 'ko' ? '학습 팁' : 'Learning Tips'}
                </h3>
                <div className="text-sm space-y-2">
                  {selectedMode && LEARNING_MODES[selectedMode] && LEARNING_MODES[selectedMode].tips && LEARNING_MODES[selectedMode].tips[currentLanguage] && LEARNING_MODES[selectedMode].tips[currentLanguage].map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  빠른 이론 학습
                </h3>
                <button
                  onClick={() => {
                    const theoryLevel = LEARNING_MODES[selectedMode]?.theory || 'beginner';
                    const randomTheory = getRandomTheory(theoryLevel);
                    if (randomTheory) setShowTheoryPopup(randomTheory);
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  랜덤 이론 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const pageData = getPageSEO();

  return (
    <div className="w-full">
      {/* 🚀 SEO Head */}
      <SEOHead {...pageData} />
      
      {/* 🚀 네비게이션 */}
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        isGameActive={currentView === 'game'}
      />

      {/* 🎯 메인 컨텐츠 */}
      {currentView === 'menu' && renderMenuView()}
      {currentView === 'theory' && renderTheoryView()}
      {currentView === 'game' && renderGameView()}
      {currentView === 'puzzle' && (
        <HoldemPuzzle 
          onClose={() => setCurrentView('menu')} 
          onChipReward={handleChipReward}
        />
      )}
      {currentView === 'blog' && <BlogSection />}
      {currentView === 'faq' && <FAQ />}
      {currentView === 'glossary' && <PokerGlossary />}
      {currentView === 'privacy' && <PrivacyPolicy />}
      {currentView === 'terms' && <TermsOfService />}
      {currentView === 'responsible' && <ResponsibleGaming />}
      
      {/* 🚀 금고 시스템 모달 */}
      <VaultSystem
        isOpen={showVaultModal}
        onClose={() => setShowVaultModal(false)}
        playerStats={playerStats}
        setPlayerStats={setPlayerStats}
      />
      
      {/* 🚀 기존 팝업들 */}
      {showTheoryPopup && (
        <TheoryPopup 
          theory={showTheoryPopup} 
          onClose={() => setShowTheoryPopup(null)} 
        />
      )}

      {showRewardAd && (
        <RewardVideoAd 
          onReward={handleRewardAd}
          onClose={() => setShowRewardAd(false)}
        />
      )}

      <ProChallengeModal
        isOpen={showProChallenge}
        onClose={() => setShowProChallenge(false)}
        onAccept={() => {
          setShowProChallenge(false);
          alert('축하합니다! 프로 포커 플레이어의 길에 도전하세요!\n\n추천 사이트:\n• PokerStars\n• 888poker\n• partypoker\n• GGPoker\n\n꾸준한 학습과 연습이 성공의 열쇠입니다!');
        }}
        stats={playerStats}
      />
      
      <Announcement LANGUAGES={LANGUAGES} currentLanguage={currentLanguage} />
    </div>
  );
};

export default HoldemMaster;