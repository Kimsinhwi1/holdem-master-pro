import React, { useState } from 'react';
import { Menu, X, Home, BookOpen, HelpCircle, Book, Gamepad2, GraduationCap, ChevronDown, Shield, Scale, Heart } from 'lucide-react';

/**
 * 메인 네비게이션 컴포넌트
 * SEO 최적화된 메뉴 구조
 */

const Navigation = ({ 
  currentView, 
  onViewChange, 
  currentLanguage = 'ko',
  LANGUAGES = {},
  isGameActive = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigationItems = [
    {
      id: 'home',
      label: currentLanguage === 'ko' ? '홈' : 'Home',
      icon: Home,
      view: 'menu'
    },
    {
      id: 'learning',
      label: currentLanguage === 'ko' ? '학습하기' : 'Learn',
      icon: GraduationCap,
      hasDropdown: true,
      dropdownItems: [
        {
          id: 'game',
          label: currentLanguage === 'ko' ? '게임 플레이' : 'Play Game',
          icon: Gamepad2,
          view: 'menu', // 메뉴에서 학습 모드 선택
          description: currentLanguage === 'ko' ? 'AI와 함께 실전 연습' : 'Practice with AI'
        },
        {
          id: 'theory',
          label: currentLanguage === 'ko' ? '포커 이론' : 'Poker Theory',
          icon: BookOpen,
          view: 'theory',
          description: currentLanguage === 'ko' ? '체계적인 이론 학습' : 'Systematic theory learning'
        }
      ]
    },
    {
      id: 'blog',
      label: currentLanguage === 'ko' ? '포커 가이드' : 'Poker Guide',
      icon: Book,
      view: 'blog'
    },
    {
      id: 'faq',
      label: currentLanguage === 'ko' ? '자주 묻는 질문' : 'FAQ',
      icon: HelpCircle,
      view: 'faq'
    },
    {
      id: 'glossary',
      label: currentLanguage === 'ko' ? '용어사전' : 'Glossary',
      icon: BookOpen,
      view: 'glossary'
    },
    {
      id: 'legal',
      label: currentLanguage === 'ko' ? '법적 정보' : 'Legal',
      icon: Scale,
      hasDropdown: true,
      dropdownItems: [
        {
          id: 'privacy',
          label: currentLanguage === 'ko' ? '개인정보 보호정책' : 'Privacy Policy',
          icon: Shield,
          view: 'privacy',
          description: currentLanguage === 'ko' ? '개인정보 처리 방침' : 'How we handle your data'
        },
        {
          id: 'terms',
          label: currentLanguage === 'ko' ? '서비스 이용약관' : 'Terms of Service',
          icon: Scale,
          view: 'terms',
          description: currentLanguage === 'ko' ? '서비스 이용 규칙' : 'Service usage rules'
        },
        {
          id: 'responsible',
          label: currentLanguage === 'ko' ? '책임감 있는 학습' : 'Responsible Learning',
          icon: Heart,
          view: 'responsible',
          description: currentLanguage === 'ko' ? '건전한 학습 가이드' : 'Safe learning guidelines'
        }
      ]
    }
  ];

  const handleNavClick = (view, item) => {
    if (item.hasDropdown) {
      setActiveDropdown(activeDropdown === item.id ? null : item.id);
      return;
    }
    
    // 게임 플레이 클릭 시 기본 모드로 게임 시작
    if (item.id === 'game' && onStartGame) {
      onStartGame('probability'); // 기본 모드
      setIsOpen(false);
      setActiveDropdown(null);
      return;
    }
    
    setIsOpen(false);
    setActiveDropdown(null);
    onViewChange(view);
  };

  // 게임 중일 때는 간단한 네비게이션만 표시
  if (isGameActive) {
    return (
      <nav className="fixed top-4 left-4 z-50">
        <button
          onClick={() => onViewChange('menu')}
          className="bg-red-600/90 hover:bg-red-700 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors flex items-center gap-2 shadow-lg"
        >
          <Home className="w-4 h-4" />
          {currentLanguage === 'ko' ? '메뉴로' : 'Menu'}
        </button>
      </nav>
    );
  }

  return (
    <>
      {/* 모바일 햄버거 메뉴 */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/10 backdrop-blur-md text-white p-3 rounded-lg hover:bg-white/20 transition-colors"
          aria-label="메뉴 열기"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 데스크톱 네비게이션 */}
      <nav className="hidden md:block fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 shadow-xl border border-white/20">
          <ul className="flex items-center space-x-6">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentView === item.view || 
                (item.hasDropdown && ['menu', 'theory'].includes(currentView));
              
              return (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => handleNavClick(item.view, item)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                      isActive 
                        ? 'bg-white text-gray-900 shadow-lg' 
                        : 'text-white hover:bg-white/20'
                    }`}
                    aria-expanded={item.hasDropdown ? showLearningDropdown : undefined}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        showLearningDropdown ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                  
                  {/* 드롭다운 메뉴 */}
                  {item.hasDropdown && showLearningDropdown && (
                    <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl py-2 min-w-64 border border-gray-200">
                      {item.dropdownItems.map((dropdownItem) => {
                        const DropdownIcon = dropdownItem.icon;
                        return (
                          <button
                            key={dropdownItem.id}
                            onClick={() => handleNavClick(dropdownItem.view, dropdownItem)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3"
                          >
                            <DropdownIcon className="w-5 h-5 text-gray-600" />
                            <div>
                              <div className="font-medium text-gray-900">{dropdownItem.label}</div>
                              <div className="text-sm text-gray-500">{dropdownItem.description}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* 모바일 사이드 메뉴 */}
      {isOpen && (
        <>
          {/* 오버레이 */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* 사이드 메뉴 */}
          <div className="fixed top-0 left-0 w-80 h-full bg-white z-50 md:hidden overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">메뉴</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <ul className="space-y-2">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = currentView === item.view || 
                    (item.hasDropdown && ['menu', 'theory'].includes(currentView));
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavClick(item.view, item)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.hasDropdown && (
                          <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${
                            showLearningDropdown ? 'rotate-180' : ''
                          }`} />
                        )}
                      </button>
                      
                      {/* 모바일 드롭다운 */}
                      {item.hasDropdown && showLearningDropdown && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.dropdownItems.map((dropdownItem) => {
                            const DropdownIcon = dropdownItem.icon;
                            return (
                              <button
                                key={dropdownItem.id}
                                onClick={() => handleNavClick(dropdownItem.view, dropdownItem)}
                                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                <DropdownIcon className="w-4 h-4" />
                                <div className="text-left">
                                  <div className="font-medium">{dropdownItem.label}</div>
                                  <div className="text-xs text-gray-500">{dropdownItem.description}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
              
              {/* 모바일 추가 정보 */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl mb-2">🃏</div>
                  <div className="text-sm text-gray-600">
                    {currentLanguage === 'ko' 
                      ? 'AI와 함께 포커 마스터가 되어보세요!' 
                      : 'Become a poker master with AI!'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;