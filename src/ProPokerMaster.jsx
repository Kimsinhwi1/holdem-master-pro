import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// HelmetProvider 제거됨 - main.jsx에서 간소화
import { Users, Brain, TrendingUp, Target, Settings, Play, BarChart3, Calculator, Eye, Zap, Trophy, Star, ChevronRight, ChevronLeft, BookOpen, PieChart, Clock, Award, Gift, HelpCircle, Database, Gamepad2, LineChart, Activity, Users2, Lightbulb, FileText, Video, MessageCircle, AlertTriangle, CheckCircle, XCircle, ArrowUp, ArrowDown, X, Menu, Tv, RefreshCw, GraduationCap, Coins, Book } from 'lucide-react';

// 🎯 기존 imports 그대로 유지
import { findBestHand } from './utils/cardUtils.js';
import Card from './components/Card.jsx';
import Player from './components/Player.jsx';
import AdSenseAd from './components/AdSenseAd.jsx';
import Announcement from './components/Announcement.jsx';

// 🚀 새로운 SEO 컴포넌트들 (패키지 설치 후 주석 해제)
import SEOHead from './components/SEOHead.jsx';
import Navigation from './components/Navigation.jsx';
import BlogSection from './components/BlogSection.jsx';
import FAQ from './components/FAQ.jsx';
import PokerGlossary from './components/PokerGlossary.jsx';

// 🎯 임시 SEO Head 컴포넌트 (react-helmet-async 없이도 작동)
const TempSEOHead = ({ title, description }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.content = description;
      }
    }
  }, [title, description]);
  
  return null;
};

// 🎯 임시 Navigation 컴포넌트
const TempNavigation = ({ currentView, onViewChange, isGameActive }) => {
  if (isGameActive) {
    return (
      <nav className="fixed top-4 left-4 z-50">
        <button
          onClick={() => onViewChange('menu')}
          className="bg-red-600/90 hover:bg-red-700 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors flex items-center gap-2 shadow-lg"
        >
          <BookOpen className="w-4 h-4" />
          메뉴로
        </button>
      </nav>
    );
  }

  if (currentView === 'menu') {
    return (
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 shadow-xl border border-white/20">
          <div className="flex items-center space-x-6 text-white">
            <span className="font-medium">🃏 홀덤마스터 프로</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-4 left-4 z-50">
      <button
        onClick={() => onViewChange('menu')}
        className="bg-blue-600/90 hover:bg-blue-700 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors flex items-center gap-2 shadow-lg"
      >
        <BookOpen className="w-4 h-4" />
        홈으로
      </button>
    </nav>
  );
};

// 🎯 임시 블로그 컴포넌트
const TempBlogSection = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">포커 가이드</h1>
        <p className="text-xl text-gray-600">체계적인 텍사스 홀덤 학습 자료</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-3">포커 기초 가이드</h3>
          <p className="text-gray-600 mb-4">텍사스 홀덤의 기본 규칙부터 핸드 랭킹까지 완벽 가이드</p>
          <div className="text-sm text-blue-600 font-medium">초보자 필수</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-3">고급 전략</h3>
          <p className="text-gray-600 mb-4">프로 플레이어들이 사용하는 고급 포커 전략과 기법</p>
          <div className="text-sm text-purple-600 font-medium">고급자 추천</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-3">포커 수학</h3>
          <p className="text-gray-600 mb-4">팟 오즈, 아웃츠 계산 등 포커에 필요한 수학 지식</p>
          <div className="text-sm text-green-600 font-medium">중급자 필수</div>
        </div>
      </div>
    </div>
  </div>
);

// 🎯 임시 FAQ 컴포넌트
const TempFAQ = () => (
  <div className="min-h-screen bg-gray-50 py-16">
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">자주 묻는 질문</h1>
        <p className="text-xl text-gray-600">홀덤마스터에 대한 모든 궁금증을 해결하세요</p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-3">📱 모바일에서도 사용할 수 있나요?</h3>
          <p className="text-gray-700">네! 홀덤마스터는 완전 반응형으로 설계되어 스마트폰과 태블릿에서 완벽하게 작동합니다.</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-3">🤖 AI는 얼마나 똑똑한가요?</h3>
          <p className="text-gray-700">6가지 AI 스타일을 제공하며, 각각 다른 플레이 패턴과 전략을 사용합니다. 실제 플레이어와 유사한 경험을 제공합니다.</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-3">📚 어떤 학습 모드가 있나요?</h3>
          <p className="text-gray-700">확률 훈련, 블러프 훈련, 포지션 훈련, 상대 읽기, 토너먼트 전략 등 8가지 전문 학습 모드를 제공합니다.</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-3">💰 칩이 떨어지면 어떻게 하나요?</h3>
          <p className="text-gray-700">광고 시청을 통해 무료로 칩을 충전할 수 있습니다. 또는 메뉴에서 칩을 리셋할 수 있습니다.</p>
        </div>
      </div>
    </div>
  </div>
);

// 🎯 임시 용어사전 컴포넌트
const TempGlossary = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">포커 용어사전</h1>
        <p className="text-xl text-gray-600">텍사스 홀덤의 모든 용어를 쉽게 찾아보세요</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-2">올인 (All-in)</h3>
          <p className="text-sm text-blue-600 mb-3">액션</p>
          <p className="text-gray-700">자신이 가진 모든 칩을 베팅하는 것</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-2">블러프 (Bluff)</h3>
          <p className="text-sm text-purple-600 mb-3">전략</p>
          <p className="text-gray-700">약한 핸드로 강한 핸드인 것처럼 베팅하는 전략</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-2">팟 오즈 (Pot Odds)</h3>
          <p className="text-sm text-green-600 mb-3">수학</p>
          <p className="text-gray-700">현재 팟의 크기와 콜해야 하는 베팅 금액의 비율</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-2">너츠 (Nuts)</h3>
          <p className="text-sm text-orange-600 mb-3">핸드</p>
          <p className="text-gray-700">주어진 보드에서 가능한 가장 강한 핸드</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-2">포지션 (Position)</h3>
          <p className="text-sm text-teal-600 mb-3">게임진행</p>
          <p className="text-gray-700">베팅 순서에서의 위치, 늦을수록 유리함</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-2">아웃츠 (Outs)</h3>
          <p className="text-sm text-red-600 mb-3">수학</p>
          <p className="text-gray-700">핸드를 개선시킬 수 있는 남은 카드의 수</p>
        </div>
      </div>
    </div>
  </div>
);

// 🎯 기존의 모든 상수들 그대로 유지
const SUITS = ['♠', '♥', '♦', '♣'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const SUIT_COLORS = { '♠': '#000', '♣': '#000', '♥': '#e53e3e', '♦': '#e53e3e' };
const BLINDS = { small: 10, big: 20 };

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
      psychology: '심리학'
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
      psychology: 'Psychology'
    }
  }
};

// 피드백 수준 정의
const FEEDBACK_LEVELS = {
  beginner: {
    name: '초보자',
    description: '기본적인 핸드 정보와 간단한 조언',
    icon: '🌱',
    tips: {
      fold: '폴드는 나쁜 핸드를 포기하는 것입니다. 손실을 줄이는 현명한 선택이에요!',
      call: '콜은 상대의 베팅에 맞춰 참여하는 것입니다. 괜찮은 핸드가 있을 때 사용하세요.',
      raise: '레이즈는 공격적인 플레이입니다. 강한 핸드가 있거나 블러프할 때 사용해보세요!',
      check: '체크는 베팅 없이 넘어가는 것입니다. 핸드가 애매할 때 안전한 선택이에요.'
    }
  },
  intermediate: {
    name: '중수',
    description: '포지션과 팟 오즈를 고려한 조언',
    icon: '🎯',
    tips: {
      fold: '현재 팟 오즈와 핸드 강도를 비교해보세요. 수학적으로 맞지 않다면 폴드가 정답입니다.',
      call: '상대의 베팅 패턴과 보드 텍스처를 분석해보세요. 드로우가 있다면 임플라이드 오즈도 고려하세요.',
      raise: '밸류 베팅인지 블러프인지 명확히 하세요. 상대의 레인지를 좁히는 효과도 있습니다.',
      check: '포지션이 중요합니다. 인포메이션을 얻거나 팟 컨트롤을 위한 체크를 고려해보세요.'
    }
  },
  advanced: {
    name: '고수',
    description: '레인지와 GTO 전략 기반 분석',
    icon: '🎓',
    tips: {
      fold: '상대의 3벳 레인지를 고려했을 때 여러분의 핸드가 어느 정도 에퀴티를 가지는지 분석해보세요.',
      call: '디펜딩 레인지와 블러프 캐쳐를 고려하세요. 상대의 밸류:블러프 비율을 추정해보세요.',
      raise: '밸런스드 레인지를 유지하면서 상대를 익스플로잇할 수 있는 스팟인지 판단하세요.',
      check: '체크-콜, 체크-레이즈, 체크-폴드 중 어떤 라인이 최적인지 보드 텍스처와 함께 고려하세요.'
    }
  },
  master: {
    name: '마스터',
    description: '고급 수학적 분석과 심리 게임',
    icon: '👑',
    tips: {
      fold: 'MDF(Minimum Defense Frequency)를 계산하고 상대의 익스플로잇 가능성을 분석했나요?',
      call: '상대의 스택 깊이와 SPR을 고려한 플레이인지, 그리고 리버에서의 플레이어빌리티는 어떤지 판단하세요.',
      raise: '상대의 텔과 베팅 사이징을 통해 핸드 레인지를 좁혔나요? 메타게임 요소도 고려하세요.',
      check: '레벨링과 상대방의 사고 과정을 역추적해보세요. 게임플로우와 이미지도 중요합니다.'
    }
  }
};

// 학습 모드 정의
const LEARNING_MODES = {
  probability: { 
    name: '확률 훈련', 
    icon: Calculator, 
    color: 'bg-blue-500',
    description: '팟 오즈, 아웃츠, 승률 계산을 마스터하세요',
    tips: ['아웃츠를 정확히 세는 연습을 하세요', '팟 오즈와 승률을 비교하는 습관을 기르세요'],
    theory: 'intermediate'
  },
  bluffing: { 
    name: '블러프 훈련', 
    icon: Eye, 
    color: 'bg-purple-500',
    description: '언제, 어떻게 블러프할지 배우세요',
    tips: ['상대방의 레인지를 고려하세요', '보드 텍스처에 따라 블러프 빈도를 조절하세요'],
    theory: 'advanced'
  },
  position: { 
    name: '포지션 훈련', 
    icon: Target, 
    color: 'bg-green-500',
    description: '포지션의 힘을 활용하는 법을 배우세요',
    tips: ['늦은 포지션에서 더 많은 핸드를 플레이하세요', '일찍 포지션에서는 강한 핸드만 플레이하세요'],
    theory: 'beginner'
  },
  reading: { 
    name: '상대 읽기', 
    icon: Brain, 
    color: 'bg-orange-500',
    description: '상대방의 패턴과 텔을 파악하세요',
    tips: ['베팅 패턴을 주의깊게 관찰하세요', '상대방의 행동 변화를 감지하세요'],
    theory: 'intermediate'
  },
  tournament: {
    name: '토너먼트 전략',
    icon: Trophy,
    color: 'bg-yellow-500',
    description: 'ICM과 스택 사이즈를 고려한 토너먼트 플레이',
    tips: ['블라인드 스틸을 적극 활용하세요', '버블 상황에서는 타이트하게 플레이하세요'],
    theory: 'expert'
  },
  headsup: {
    name: '헤즈업',
    icon: Users2,
    color: 'bg-red-500',
    description: '1대1 상황에서의 공격적 플레이',
    tips: ['더 넓은 레인지로 플레이하세요', '포지션을 최대한 활용하세요'],
    theory: 'expert'
  },
  multiway: {
    name: '멀티웨이 팟',
    icon: Users,
    color: 'bg-teal-500',
    description: '3명 이상이 참여하는 복잡한 상황 대처',
    tips: ['너트에 가까운 핸드만 플레이하세요', '블러프 빈도를 줄이세요'],
    theory: 'advanced'
  },
  advanced: {
    name: 'GTO 훈련',
    icon: Database,
    color: 'bg-indigo-500',
    description: '게임 이론적 최적 전략을 학습하세요',
    tips: ['밸런싱의 중요성을 이해하세요', '상대방의 실수를 익스플로잇하세요'],
    theory: 'master'
  },
  ai_battle: {
    name: 'AI 대전',
    icon: Gamepad2,
    color: 'bg-red-600',
    description: '다양한 AI 스타일과 실전 대결',
    tips: ['각 AI의 플레이 패턴을 파악하세요', '상황에 맞는 전략을 사용하세요'],
    theory: 'practice',
    isCompetitive: true
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
          placeholder={LANGUAGES[currentLanguage].ui.enterNickname}
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
        <div className="text-white text-xl font-bold mb-2">당신의 턴</div>
        <div className="text-yellow-400 text-sm">
          팟: ${gameState.pot} | 
          {callAmount > 0 ? ` 콜: $${callAmount}` : ' 체크 가능'} | 
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
  const [lastAction, setLastAction] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [gameWatcherActive, setGameWatcherActive] = useState(false);
  const [highlightedCards, setHighlightedCards] = useState([]);
  const [currentHandText, setCurrentHandText] = useState('');
  const [feedbackLevel, setFeedbackLevel] = useState('beginner');
  const [feedbackMessages, setFeedbackMessages] = useState([]);
  
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
        message: currentLevel.tips[action],
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
          message: `💡 ${mode.name} 팁: ${randomTip}`,
          icon: '🎯'
        });
      }
    }
    
    return feedback;
  }, [feedbackLevel, selectedMode]);

  // 🎯 간단한 게임 초기화 (원래는 복잡한 로직이 있지만 간소화)
  const initializeGame = (mode) => {
    const minChipsNeeded = BLINDS.big * 2;
    if (playerStats.totalChips < minChipsNeeded) {
      addToLog(`💰 칩이 부족합니다! 최소 ${minChipsNeeded} 칩이 필요합니다. 광고를 시청하거나 칩을 충전하세요.`);
      setCurrentView('menu');
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
      addToLog(`📚 모드: ${LEARNING_MODES[mode]?.name}`);
      addToLog(`💰 스몰/빅 블라인드: ${BLINDS.small}/${BLINDS.big}`);
      addToLog(`🔰 피드백 수준: ${FEEDBACK_LEVELS[feedbackLevel]?.name}`);
      
      setTimeout(() => {
        addToLog(`👥 플레이어: ${players.map(p => p.name).join(', ')}`);
        addToLog(`🎴 당신의 핸드가 배급되었습니다!`);
      }, 1000);
      
      setPlayerStats(prev => ({ 
        ...prev, 
        handsPlayed: prev.handsPlayed + 1
      }));

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
          title: null,
          description: null
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
                <span>{level.name}</span>
              </button>
            ))}
          </div>
          <div className="text-center">
            <p className="text-emerald-300 text-sm">
              {FEEDBACK_LEVELS[feedbackLevel].description}
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

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setCurrentView('theory')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            {LANGUAGES[currentLanguage].ui.theoryStudy}
          </button>
          {playerStats.totalChips <= 0 && (
            <button
              onClick={() => setShowRewardAd(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <Tv className="w-5 h-5" />
              칩 충전
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <Coins className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold">{playerStats.totalChips.toLocaleString()}</div>
            <div className="text-sm text-emerald-200">보유 칩</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold">{playerStats.handsWon}</div>
            <div className="text-sm text-emerald-200">승리한 핸드</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <div className="text-2xl font-bold">{playerStats.currentStreak}</div>
            <div className="text-sm text-emerald-200">현재 연승</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold">{playerStats.learningScore}</div>
            <div className="text-sm text-emerald-200">학습 점수</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <div className="text-2xl font-bold">{playerStats.handsPlayed}</div>
            <div className="text-sm text-emerald-200">플레이한 핸드</div>
          </div>
        </div>

        <div className="mb-8">
          <AdBanner 
            adSlot="2222222222" 
            className="bg-white/5 backdrop-blur-sm rounded-xl p-2"
          />
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white text-center mb-6 flex items-center justify-center gap-2">
            <Video className="w-6 h-6 text-red-500" />
            {LANGUAGES[currentLanguage].ui.youtubeResources}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <a
              href="https://www.youtube.com/results?search_query=poker+basics+tutorial"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg transition-colors flex flex-col items-center gap-2 hover:scale-105 transform duration-200"
            >
              <Video className="w-8 h-8" />
              <span className="font-bold">{LANGUAGES[currentLanguage].ui.pokerBasics}</span>
              <span className="text-sm text-red-100 text-center">기본 룰과 핸드 랭킹</span>
            </a>

            <a
              href="https://www.youtube.com/results?search_query=advanced+poker+strategy"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg transition-colors flex flex-col items-center gap-2 hover:scale-105 transform duration-200"
            >
              <Brain className="w-8 h-8" />
              <span className="font-bold">{LANGUAGES[currentLanguage].ui.advanced}</span>
              <span className="text-sm text-red-100 text-center">프로 전략과 기법</span>
            </a>

            <a
              href="https://www.youtube.com/results?search_query=poker+tournament+strategy"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg transition-colors flex flex-col items-center gap-2 hover:scale-105 transform duration-200"
            >
              <Trophy className="w-8 h-8" />
              <span className="font-bold">{LANGUAGES[currentLanguage].ui.tournaments}</span>
              <span className="text-sm text-red-100 text-center">토너먼트 전략</span>
            </a>

            <a
              href="https://www.youtube.com/results?search_query=poker+psychology+tells"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg transition-colors flex flex-col items-center gap-2 hover:scale-105 transform duration-200"
            >
              <Eye className="w-8 h-8" />
              <span className="font-bold">{LANGUAGES[currentLanguage].ui.psychology}</span>
              <span className="text-sm text-red-100 text-center">포커 심리와 텔</span>
            </a>

          </div>
          
          <div className="text-center mt-4">
            <p className="text-emerald-200 text-sm">
              {currentLanguage === 'ko' ? '유튜브에서 최신 포커 학습 자료를 확인하세요!' : 'Check out the latest poker learning content on YouTube!'}
            </p>
          </div>
        </div>

        {/* 🚀 새로운 SEO 페이지 링크 추가 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">학습 자료</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => setCurrentView('blog')}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all duration-300 text-white group transform hover:scale-105 shadow-xl"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg mx-auto">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">포커 가이드</h3>
              <p className="text-emerald-200 mb-4 text-center text-sm leading-relaxed">
                초보자부터 고급자까지 체계적인 포커 학습 가이드
              </p>
              <div className="flex items-center justify-center text-emerald-300 group-hover:text-white transition-colors">
                <span className="font-semibold">가이드 보기</span>
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => setCurrentView('faq')}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all duration-300 text-white group transform hover:scale-105 shadow-xl"
            >
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg mx-auto">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">자주 묻는 질문</h3>
              <p className="text-emerald-200 mb-4 text-center text-sm leading-relaxed">
                포커와 앱 사용법에 대한 모든 궁금증 해결
              </p>
              <div className="flex items-center justify-center text-emerald-300 group-hover:text-white transition-colors">
                <span className="font-semibold">FAQ 보기</span>
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => setCurrentView('glossary')}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-all duration-300 text-white group transform hover:scale-105 shadow-xl"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg mx-auto">
                <Book className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">포커 용어사전</h3>
              <p className="text-emerald-200 mb-4 text-center text-sm leading-relaxed">
                한국어와 영어로 배우는 모든 포커 용어
              </p>
              <div className="flex items-center justify-center text-emerald-300 group-hover:text-white transition-colors">
                <span className="font-semibold">용어사전 보기</span>
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">{LANGUAGES[currentLanguage].ui.learningModes}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(LEARNING_MODES).map(([key, mode]) => {
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
                  <h3 className="text-xl font-bold mb-3 text-center">{mode.name}</h3>
                  <p className="text-emerald-200 mb-4 text-center text-sm leading-relaxed">
                    {mode.description}
                  </p>
                  <div className="text-center">
                    <div className="inline-block bg-gray-600 text-xs px-2 py-1 rounded mb-3">
                      {POKER_THEORY[mode.theory]?.name} 레벨
                    </div>
                  </div>
                  {!isDisabled && (
                    <div className="flex items-center justify-center text-emerald-300 group-hover:text-white transition-colors">
                      <span className="font-semibold">학습 시작</span>
                      <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">학습 성과</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{playerStats.goodDecisions}</div>
              <div className="text-emerald-200">올바른 결정</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">{playerStats.mistakesMade}</div>
              <div className="text-emerald-200">실수 횟수</div>
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
                {isPlayerTurn && <div className="text-yellow-400 font-bold animate-pulse">당신의 턴!</div>}
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

              {isPlayerTurn && (
                <BettingControls
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
                  학습 팁
                </h3>
                <div className="text-sm space-y-2">
                  {selectedMode && LEARNING_MODES[selectedMode] && LEARNING_MODES[selectedMode].tips && LEARNING_MODES[selectedMode].tips.map((tip, idx) => (
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
      <TempNavigation
        currentView={currentView}
        onViewChange={setCurrentView}
        isGameActive={currentView === 'game'}
      />

      {/* 🎯 메인 컨텐츠 */}
      {currentView === 'menu' && renderMenuView()}
      {currentView === 'theory' && renderTheoryView()}
      {currentView === 'game' && renderGameView()}
      {currentView === 'blog' && <TempBlogSection />}
      {currentView === 'faq' && <TempFAQ />}
      {currentView === 'glossary' && <TempPokerGlossary />}
      
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

export default HoldemMaster