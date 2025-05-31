import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, BookOpen, Gamepad2, Settings, Shield } from 'lucide-react';

/**
 * 홀덤마스터 프로 - FAQ 컴포넌트
 * SEO 최적화된 자주 묻는 질문 섹션
 */

const faqData = [
  // 게임 기본 사항
  {
    id: 1,
    category: "게임 기본",
    question: "텍사스 홀덤의 기본 규칙이 무엇인가요?",
    answer: "텍사스 홀덤은 각 플레이어가 2장의 개인 카드를 받고, 5장의 커뮤니티 카드(플롭 3장, 턴 1장, 리버 1장)와 조합하여 최고의 5장 포커 핸드를 만드는 게임입니다. 프리플롭, 플롭, 턴, 리버 총 4번의 베팅 라운드가 있으며, 각 라운드에서 콜, 레이즈, 폴드 중 선택할 수 있습니다.",
    icon: BookOpen,
    featured: true
  },
  {
    id: 2,
    category: "게임 기본",
    question: "포커 핸드 랭킹 순서를 알려주세요",
    answer: "포커 핸드는 다음 순서로 강합니다: 1) 로얄 플러시 2) 스트레이트 플러시 3) 포 오브 어 카인드 4) 풀 하우스 5) 플러시 6) 스트레이트 7) 쓰리 오브 어 카인드 8) 투 페어 9) 원 페어 10) 하이 카드. 앱 내 핸드 랭킹 가이드에서 더 자세한 설명을 확인하실 수 있습니다.",
    icon: BookOpen
  },
  {
    id: 3,
    category: "게임 기본",
    question: "포지션이 왜 중요한가요?",
    answer: "포지션은 포커에서 가장 중요한 요소 중 하나입니다. 늦은 포지션(버튼, 컷오프)일수록 상대방의 액션을 먼저 보고 결정할 수 있어 유리합니다. 또한 포지션에 따라 플레이할 수 있는 핸드 레인지가 달라지며, 포스트플롭에서도 전략적 우위를 가질 수 있습니다.",
    icon: Gamepad2
  },
  
  // 앱 사용법
  {
    id: 4,
    category: "앱 사용법",
    question: "AI 트레이너는 어떻게 작동하나요?",
    answer: "홀덤마스터의 AI 트레이너는 6가지 플레이 스타일(타이트, 루즈, 공격적, 수동적, 밸런스드, 프로)로 설정할 수 있으며, 실시간으로 상황을 분석하여 동적으로 전략을 조정합니다. AI의 사고 과정을 시각화하여 보여주므로, 왜 특정 액션을 선택했는지 학습할 수 있습니다.",
    icon: Settings,
    featured: true
  },
  {
    id: 5,
    category: "앱 사용법",
    question: "학습 모드에서 어떤 것들을 배울 수 있나요?",
    answer: "5가지 전문 학습 모드를 제공합니다: 1) 프리플롭 - 핸드 선택과 포지션별 전략 2) 포스트플롭 - 플롭, 턴, 리버에서의 플레이 3) 블러핑 - 효과적인 블러프 타이밍과 기법 4) 상대 읽기 - 베팅 패턴과 텔 분석 5) 수학 - 팟 오즈, 임플라이드 오즈, 아웃츠 계산. 각 모드는 초급부터 프로까지 4단계로 나뉩니다.",
    icon: BookOpen
  },
  {
    id: 6,
    category: "앱 사용법",
    question: "실시간 분석 도구는 무엇을 보여주나요?",
    answer: "실시간 분석 도구는 현재 상황에서 중요한 정보들을 자동으로 계산해 보여줍니다: 아웃츠 계산, 승률 분석, 팟 오즈/임플라이드 오즈, 핸드 강도(0-100%), 프리플롭 승률 등. 이 정보들은 올바른 의사결정을 내리는 데 도움을 줍니다.",
    icon: Gamepad2
  },
  
  // 전략 및 팁
  {
    id: 7,
    category: "전략 및 팁",
    question: "초보자가 가장 먼저 배워야 할 것은 무엇인가요?",
    answer: "초보자는 다음 순서로 학습하는 것을 권장합니다: 1) 기본 규칙과 핸드 랭킹 숙지 2) 프리플롭 핸드 선택 기준 학습 3) 포지션의 중요성 이해 4) 기본적인 팟 오즈 계산 5) 간단한 베팅 패턴 읽기. 앱의 초급자 모드에서 체계적으로 학습할 수 있습니다.",
    icon: HelpCircle,
    featured: true
  },
  {
    id: 8,
    category: "전략 및 팁",
    question: "언제 블러프를 해야 하나요?",
    answer: "효과적인 블러프 타이밍: 1) 상대가 약한 핸드를 가진 것 같을 때 2) 보드가 드라이한 텍스처일 때 3) 상대 수가 적을 때 4) 포지션 우위가 있을 때 5) 상대가 타이트한 플레이어일 때. 블러프는 전체 플레이의 20-30% 정도가 적절하며, 무작정 하는 것보다는 상황을 신중히 판단해야 합니다.",
    icon: Gamepad2
  },
  {
    id: 9,
    category: "전략 및 팁",
    question: "뱅크롤 관리는 어떻게 해야 하나요?",
    answer: "건전한 뱅크롤 관리 원칙: 1) 캐시 게임의 경우 바이인의 20-25배 뱅크롤 보유 2) 토너먼트의 경우 바이인의 50-100배 보유 3) 전체 뱅크롤의 5% 이상을 한 게임에 투자하지 않기 4) 연속 손실 시 레벨을 낮추기 5) 감정적 베팅 피하기. 장기적 관점에서 꾸준한 수익을 목표로 해야 합니다.",
    icon: Shield
  },
  
  // 기술적 문제
  {
    id: 10,
    category: "기술적 문제",
    question: "앱이 느리게 작동하거나 멈추는 경우 어떻게 해야 하나요?",
    answer: "기술적 문제 해결 방법: 1) 브라우저 새로고침 (F5 또는 Ctrl+R) 2) 브라우저 캐시 및 쿠키 삭제 3) 다른 브라우저에서 시도 4) 안정적인 인터넷 연결 확인 5) 브라우저가 최신 버전인지 확인. 문제가 지속되면 설정 페이지의 '문제 신고' 기능을 이용해 주세요.",
    icon: Settings
  },
  {
    id: 11,
    category: "기술적 문제",
    question: "모바일에서도 사용할 수 있나요?",
    answer: "네, 홀덤마스터는 모바일 완전 최적화되어 있습니다. 반응형 디자인으로 스마트폰과 태블릿에서 편리하게 사용할 수 있으며, PWA(Progressive Web App) 기능으로 홈 화면에 추가하여 앱처럼 사용할 수 있습니다. iOS와 안드로이드 모두 지원됩니다.",
    icon: Settings
  },
  {
    id: 12,
    category: "기술적 문제",
    question: "게임 데이터가 저장되나요?",
    answer: "네, 모든 게임 데이터는 자동으로 저장됩니다. 진행 상황, 레벨, 성취, 통계 등이 브라우저에 로컬 저장되며, 같은 기기에서는 언제든 이어서 플레이할 수 있습니다. 다른 기기에서 사용하려면 설정에서 데이터 내보내기/가져오기 기능을 이용하세요.",
    icon: Shield
  }
];

const categories = ["전체", "게임 기본", "앱 사용법", "전략 및 팁", "기술적 문제"];

const FAQ = () => {
  const [activeItems, setActiveItems] = useState(new Set([1, 4, 7])); // 추천 질문들 기본 열림
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");

  // 필터링된 FAQ 항목들
  const filteredFAQs = useMemo(() => {
    let filtered = faqData;
    
    if (selectedCategory !== "전체") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [selectedCategory, searchTerm]);

  const toggleItem = (id) => {
    const newActiveItems = new Set(activeItems);
    if (newActiveItems.has(id)) {
      newActiveItems.delete(id);
    } else {
      newActiveItems.add(id);
    }
    setActiveItems(newActiveItems);
  };

  // FAQ 구조화된 데이터 (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* SEO 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <section className="py-16 bg-gray-50" role="main">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 헤더 */}
          <header className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <HelpCircle className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              자주 묻는 질문
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              홀덤마스터 프로 사용법부터 포커 전략까지, 
              <strong className="text-blue-600"> 가장 많이 묻는 질문들</strong>에 대한 답변을 확인하세요
            </p>
          </header>

          {/* 검색 및 필터 */}
          <div className="mb-8 space-y-4">
            {/* 검색창 */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="search"
                placeholder="질문을 검색해보세요..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="FAQ 검색"
              />
            </div>

            {/* 카테고리 필터 */}
            <nav className="flex flex-wrap gap-2" aria-label="FAQ 카테고리">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors
                    ${selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  aria-pressed={selectedCategory === category}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>

          {/* FAQ 목록 */}
          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
                <p className="text-gray-400">다른 키워드로 다시 검색해보세요.</p>
              </div>
            ) : (
              filteredFAQs.map((faq) => {
                const IconComponent = faq.icon;
                const isActive = activeItems.has(faq.id);
                
                return (
                  <article
                    key={faq.id}
                    className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200
                      ${faq.featured ? 'border-l-4 border-blue-500' : ''}`}
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-2xl"
                      aria-expanded={isActive}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                              {faq.question}
                            </h2>
                            <span className="text-sm text-blue-600 font-medium">
                              {faq.category}
                            </span>
                            {faq.featured && (
                              <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                추천
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          {isActive ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* 답변 */}
                    <div
                      id={`faq-answer-${faq.id}`}
                      className={`px-6 pb-6 transition-all duration-200 ${
                        isActive ? 'block' : 'hidden'
                      }`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                    >
                      <div className="ml-14 pt-2 border-l-2 border-gray-100 pl-4">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* 추가 도움말 섹션 */}
          <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">답변을 찾지 못하셨나요?</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              더 자세한 도움이 필요하시면 언제든지 문의해 주세요. 
              빠른 시간 내에 친절하게 답변해드리겠습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                문의하기
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                사용 가이드 보기
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;