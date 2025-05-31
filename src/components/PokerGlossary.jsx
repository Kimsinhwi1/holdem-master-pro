import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Filter, Hash, Shuffle, DollarSign, Users, Target } from 'lucide-react';

/**
 * 홀덤마스터 프로 - 포커 용어사전 컴포넌트
 * SEO 최적화된 포커 용어 사전
 */

const glossaryData = [
  // 기본 용어 (한글)
  {
    id: 1,
    term: "올인 (All-in)",
    english: "All-in",
    category: "액션",
    definition: "자신이 가진 모든 칩을 베팅하는 것. 올인한 플레이어는 더 이상 베팅할 수 없으며, 사이드 팟이 형성될 수 있습니다.",
    example: "상대가 큰 베팅을 했을 때, 강한 핸드로 올인을 선택할 수 있습니다.",
    icon: Target,
    difficulty: "초급"
  },
  {
    id: 2,
    term: "안티 (Ante)",
    english: "Ante",
    category: "베팅",
    definition: "게임 시작 전 모든 플레이어가 의무적으로 내는 소액의 베팅. 주로 토너먼트에서 사용됩니다.",
    example: "토너먼트 후반부에는 안티가 추가되어 액션이 더욱 활발해집니다.",
    icon: DollarSign,
    difficulty: "초급"
  },
  {
    id: 3,
    term: "백도어 (Backdoor)",
    english: "Backdoor",
    category: "핸드",
    definition: "턴과 리버에서 연속으로 필요한 카드가 나와야 완성되는 드로우. 확률이 낮아 일반적으로 메인 드로우로 고려하지 않습니다.",
    example: "플롭에서 스페이드 2장을 가지고 있을 때, 백도어 플러시 드로우가 있습니다.",
    icon: Shuffle,
    difficulty: "중급"
  },
  {
    id: 4,
    term: "뱅크롤 (Bankroll)",
    english: "Bankroll",
    category: "자금관리",
    definition: "포커를 위해 따로 마련한 자금. 생활비와 분리하여 관리해야 하며, 적절한 뱅크롤 관리는 장기적 성공의 핵심입니다.",
    example: "NL100을 플레이하려면 최소 2,000달러의 뱅크롤이 권장됩니다.",
    icon: DollarSign,
    difficulty: "초급"
  },
  {
    id: 5,
    term: "블라인드 (Blind)",
    english: "Blind",
    category: "베팅",
    definition: "카드를 보기 전에 의무적으로 베팅하는 것. 스몰 블라인드와 빅 블라인드가 있으며, 게임의 액션을 만들어내는 역할을 합니다.",
    example: "1/2 게임에서 스몰 블라인드는 1달러, 빅 블라인드는 2달러입니다.",
    icon: Users,
    difficulty: "초급"
  },
  {
    id: 6,
    term: "블러프 (Bluff)",
    english: "Bluff",
    category: "전략",
    definition: "약한 핸드로 강한 핸드인 것처럼 베팅하여 상대를 폴드시키려는 전략. 포커의 핵심 요소 중 하나입니다.",
    example: "보드가 A-K-Q일 때 낮은 페어로 큰 베팅을 하여 상대가 폴드하도록 유도할 수 있습니다.",
    icon: Target,
    difficulty: "중급"
  },
  {
    id: 7,
    term: "버튼 (Button)",
    english: "Button",
    category: "포지션",
    definition: "딜러 버튼의 위치에 있는 플레이어. 모든 베팅 라운드에서 마지막에 액션하므로 가장 유리한 포지션입니다.",
    example: "버튼에서는 더 넓은 핸드 레인지로 플레이할 수 있습니다.",
    icon: Users,
    difficulty: "초급"
  },
  {
    id: 8,
    term: "콜 (Call)",
    english: "Call",
    category: "액션",
    definition: "앞 플레이어의 베팅과 같은 금액을 베팅하는 것. 팟에 남아있으면서 다음 카드를 보겠다는 의미입니다.",
    example: "상대가 100달러를 베팅했을 때, 100달러를 콜할 수 있습니다.",
    icon: DollarSign,
    difficulty: "초급"
  },
  {
    id: 9,
    term: "체크 (Check)",
    english: "Check",
    category: "액션",
    definition: "베팅하지 않고 차례를 넘기는 것. 이전에 베팅이 없었을 때만 가능하며, 팟에 머물면서 다음 액션을 기다립니다.",
    example: "플롭에서 모든 플레이어가 체크하면 턴 카드가 공개됩니다.",
    icon: Target,
    difficulty: "초급"
  },
  {
    id: 10,
    term: "드로우 (Draw)",
    english: "Draw",
    category: "핸드",
    definition: "완성되면 강한 핸드가 될 수 있는 미완성 핸드. 스트레이트 드로우, 플러시 드로우 등이 있습니다.",
    example: "9-10을 가지고 있고 보드가 J-Q일 때 스트레이트 드로우입니다.",
    icon: Shuffle,
    difficulty: "초급"
  },
  {
    id: 11,
    term: "플롭 (Flop)",
    english: "Flop",
    category: "게임진행",
    definition: "프리플롭 베팅 라운드 후 공개되는 첫 3장의 커뮤니티 카드. 플레이어의 핸드 강도가 크게 결정되는 순간입니다.",
    example: "A-A를 가지고 있을 때 플롭이 A-7-2라면 셋을 만들게 됩니다.",
    icon: Shuffle,
    difficulty: "초급"
  },
  {
    id: 12,
    term: "폴드 (Fold)",
    english: "Fold",
    category: "액션",
    definition: "카드를 버리고 그 핸드에서 포기하는 것. 더 이상 팟을 획득할 수 없지만 추가 손실도 없습니다.",
    example: "약한 핸드로 큰 베팅을 받았을 때 폴드하는 것이 현명합니다.",
    icon: Target,
    difficulty: "초급"
  },
  {
    id: 13,
    term: "임플라이드 오즈 (Implied Odds)",
    english: "Implied Odds",
    category: "수학",
    definition: "현재 팟 오즈에 향후 획득할 수 있는 추가 베팅을 고려한 확률. 드로우 핸드의 수익성을 계산할 때 중요합니다.",
    example: "플러시 드로우를 가지고 있을 때, 완성되면 상대로부터 더 많은 베팅을 받을 수 있다면 콜이 수익적일 수 있습니다.",
    icon: Hash,
    difficulty: "고급"
  },
  {
    id: 14,
    term: "킥커 (Kicker)",
    english: "Kicker",
    category: "핸드",
    definition: "같은 족보의 핸드에서 승부를 결정하는 보조 카드. 예를 들어 원 페어에서 페어가 아닌 가장 높은 카드가 킥커입니다.",
    example: "A-K vs A-Q에서 둘 다 에이스 페어를 만들었다면, 킹 킥커가 있는 쪽이 승리합니다.",
    icon: Shuffle,
    difficulty: "초급"
  },
  {
    id: 15,
    term: "너츠 (Nuts)",
    english: "Nuts",
    category: "핸드",
    definition: "주어진 보드에서 가능한 가장 강한 핸드. '절대 핸드'라고도 불리며, 다른 플레이어가 이길 수 없는 핸드입니다.",
    example: "보드가 A-K-Q-J-10일 때 스트레이트 플러시는 너츠입니다.",
    icon: Target,
    difficulty: "중급"
  },
  {
    id: 16,
    term: "아웃츠 (Outs)",
    english: "Outs",
    category: "수학",
    definition: "핸드를 개선시킬 수 있는 남은 카드의 수. 드로우의 강도를 측정하고 올바른 결정을 내리는 데 중요합니다.",
    example: "플러시 드로우는 9개의 아웃츠가 있습니다 (13장 중 4장을 봤으므로).",
    icon: Hash,
    difficulty: "중급"
  },
  {
    id: 17,
    term: "팟 오즈 (Pot Odds)",
    english: "Pot Odds",
    category: "수학",
    definition: "현재 팟의 크기와 콜해야 하는 베팅 금액의 비율. 수학적으로 올바른 결정을 내리는 데 필수적인 개념입니다.",
    example: "100달러 팟에 50달러를 콜해야 한다면 팟 오즈는 3:1입니다.",
    icon: Hash,
    difficulty: "중급"
  },
  {
    id: 18,
    term: "레이즈 (Raise)",
    english: "Raise",
    category: "액션",
    definition: "이전 베팅보다 더 많은 금액을 베팅하는 것. 공격적인 플레이로 상대에게 압박을 가하거나 팟을 키우는 목적으로 사용됩니다.",
    example: "상대가 50달러를 베팅했을 때 100달러로 레이즈할 수 있습니다.",
    icon: DollarSign,
    difficulty: "초급"
  },
  {
    id: 19,
    term: "리버 (River)",
    english: "River",
    category: "게임진행",
    definition: "턴 베팅 라운드 후 공개되는 다섯 번째이자 마지막 커뮤니티 카드. 모든 핸드가 완성되는 시점입니다.",
    example: "리버에서 플러시가 완성되었다면 강하게 베팅할 수 있습니다.",
    icon: Shuffle,
    difficulty: "초급"
  },
  {
    id: 20,
    term: "턴 (Turn)",
    english: "Turn",
    category: "게임진행",
    definition: "플롭 베팅 라운드 후 공개되는 네 번째 커뮤니티 카드. 많은 드로우가 결정되는 중요한 시점입니다.",
    example: "턴에서 스트레이트가 완성되었다면 밸류 베팅을 고려해야 합니다.",
    icon: Shuffle,
    difficulty: "초급"
  }
];

const categories = ["전체", "액션", "베팅", "핸드", "포지션", "전략", "수학", "게임진행", "자금관리"];
const difficulties = ["전체", "초급", "중급", "고급"];

const PokerGlossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedDifficulty, setSelectedDifficulty] = useState("전체");
  const [sortBy, setSortBy] = useState("한글순");

  // 필터링 및 정렬된 용어들
  const filteredTerms = useMemo(() => {
    let filtered = glossaryData;

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 카테고리 필터
    if (selectedCategory !== "전체") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // 난이도 필터
    if (selectedDifficulty !== "전체") {
      filtered = filtered.filter(item => item.difficulty === selectedDifficulty);
    }

    // 정렬
    filtered.sort((a, b) => {
      if (sortBy === "한글순") {
        return a.term.localeCompare(b.term, 'ko');
      } else if (sortBy === "영문순") {
        return a.english.localeCompare(b.english);
      } else if (sortBy === "카테고리순") {
        return a.category.localeCompare(b.category, 'ko');
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedDifficulty, sortBy]);

  // 구조화된 데이터 (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "포커 용어사전",
    "description": "텍사스 홀덤 포커의 모든 용어를 한국어와 영어로 설명하는 종합 사전",
    "url": "https://holdem-master.com/glossary",
    "hasDefinedTerm": glossaryData.map(term => ({
      "@type": "DefinedTerm",
      "name": term.term,
      "alternateName": term.english,
      "description": term.definition,
      "inDefinedTermSet": "https://holdem-master.com/glossary"
    }))
  };

  return (
    <>
      {/* SEO 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50" role="main">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 헤더 */}
          <header className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <BookOpen className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              포커 용어사전
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              텍사스 홀덤의 모든 용어를 
              <strong className="text-blue-600"> 한국어와 영어로 상세하게 설명</strong>합니다. 
              초보자부터 고급자까지 필요한 포커 용어를 한 곳에서 찾아보세요.
            </p>
          </header>

          {/* 검색 및 필터 섹션 */}
          <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
            {/* 검색창 */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="search"
                  placeholder="용어를 검색해보세요... (예: 블러프, bluff)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="포커 용어 검색"
                />
              </div>
            </div>

            {/* 필터 옵션들 */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* 카테고리 필터 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-1" />
                  카테고리
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* 난이도 필터 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Target className="w-4 h-4 inline mr-1" />
                  난이도
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>

              {/* 정렬 옵션 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Shuffle className="w-4 h-4 inline mr-1" />
                  정렬
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="한글순">한글순</option>
                  <option value="영문순">영문순</option>
                  <option value="카테고리순">카테고리순</option>
                </select>
              </div>
            </div>

            {/* 검색 결과 수 */}
            <div className="mt-4 text-sm text-gray-600">
              총 <strong className="text-blue-600">{filteredTerms.length}</strong>개의 용어가 있습니다.
            </div>
          </div>

          {/* 용어 목록 */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTerms.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
                <p className="text-gray-400">다른 키워드로 다시 검색해보세요.</p>
              </div>
            ) : (
              filteredTerms.map((term) => {
                const IconComponent = term.icon;
                return (
                  <article
                    key={term.id}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100"
                  >
                    {/* 헤더 */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900">
                            {term.term}
                          </h2>
                          <p className="text-sm text-gray-500 font-medium">
                            {term.english}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 메타 정보 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                        {term.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium
                        ${term.difficulty === '초급' ? 'bg-green-100 text-green-700' :
                          term.difficulty === '중급' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'}`}>
                        {term.difficulty}
                      </span>
                    </div>

                    {/* 정의 */}
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {term.definition}
                    </p>

                    {/* 예시 */}
                    {term.example && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">
                          <strong className="text-blue-600">예시:</strong> {term.example}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>

          {/* 추가 학습 섹션 */}
          <div className="mt-16 text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">용어를 익혔다면 실전에서 연습해보세요!</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              포커 용어를 이해했다면 AI 트레이너와 함께 실제 게임에서 사용해보세요. 
              체계적인 학습 모드로 실력을 향상시킬 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                게임 시작하기
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                학습 가이드 보기
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PokerGlossary;