import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, BookOpen } from 'lucide-react';

/**
 * 홀덤마스터 프로 - 안전한 FAQ 컴포넌트
 */

const faqData = [
  {
    id: 1,
    question: "텍사스 홀덤의 기본 규칙이 무엇인가요?",
    answer: "텍사스 홀덤은 각 플레이어가 2장의 개인 카드를 받고, 5장의 커뮤니티 카드와 조합하여 최고의 포커 핸드를 만드는 게임입니다.\n\n게임 진행: 프리플롭 → 플롭 → 턴 → 리버 → 쇼다운",
    category: "게임 기본"
  },
  {
    id: 2,
    question: "AI 트레이너는 어떻게 작동하나요?",
    answer: "홀덤마스터의 AI는 6가지 스타일(타이트, 루즈, 공격적, 수동적, 밸런스드, 프로)을 제공합니다. 각 AI는 실제 플레이어의 패턴을 분석하여 만들어졌습니다.",
    category: "앱 사용법"
  },
  {
    id: 3,
    question: "포커 핸드 랭킹 순서를 알려주세요",
    answer: "1. 로얄 플러시\n2. 스트레이트 플러시\n3. 포카드\n4. 풀하우스\n5. 플러시\n6. 스트레이트\n7. 트리플\n8. 투페어\n9. 원페어\n10. 하이카드",
    category: "게임 기본"
  },
  {
    id: 4,
    question: "팟 오즈를 어떻게 계산하나요?",
    answer: "팟 오즈 = (현재 팟 크기) : (콜해야 할 금액)\n\n예시: 팟 $100, 콜 $50 → 팟 오즈 3:1\n필요 승률: 25%",
    category: "수학과 확률"
  },
  {
    id: 5,
    question: "블러프를 언제 해야 하나요?",
    answer: "효과적인 블러프 상황:\n• 드라이한 보드\n• 타이트한 상대\n• 좋은 포지션\n• 1-2명의 적은 상대",
    category: "전략"
  },
  {
    id: 6,
    question: "앱이 느리거나 멈추면 어떻게 하나요?",
    answer: "해결 방법:\n1. 브라우저 새로고침 (F5)\n2. 캐시 삭제\n3. 다른 브라우저 시도\n4. 인터넷 연결 확인",
    category: "기술 지원"
  }
];

const FAQ = () => {
  const [activeItems, setActiveItems] = useState(new Set([1]));
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = faqData.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (id) => {
    const newActiveItems = new Set(activeItems);
    if (newActiveItems.has(id)) {
      newActiveItems.delete(id);
    } else {
      newActiveItems.add(id);
    }
    setActiveItems(newActiveItems);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-500 rounded-2xl">
              <HelpCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">자주 묻는 질문</h1>
          <p className="text-xl text-gray-600">홀덤마스터에 대한 모든 궁금증을 해결하세요</p>
        </div>

        {/* 검색 */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="질문을 검색하세요..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ 목록 */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => {
            const isActive = activeItems.has(faq.id);
            
            return (
              <div key={faq.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {faq.category}
                      </span>
                    </div>
                    {isActive ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 ml-4" />
                    )}
                  </div>
                </button>

                {isActive && (
                  <div className="px-6 pb-6">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-blue-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">더 궁금한 것이 있으신가요?</h2>
          <p className="mb-6">포커 전문가들이 친절하게 답변해드립니다.</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            문의하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;