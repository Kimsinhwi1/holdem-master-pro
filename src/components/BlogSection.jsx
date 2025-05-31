import React, { useState } from 'react';
import { Clock, User, ArrowRight, Target, Brain, X, BookOpen } from 'lucide-react';

/**
 * 홀덤마스터 프로 - 블로그/가이드 섹션 컴포넌트
 * 안전한 아이콘만 사용하여 검은화면 방지
 */

const blogPosts = [
  {
    id: 1,
    title: "텍사스 홀덤 기초: 초보자를 위한 완벽 가이드",
    excerpt: "포커를 처음 시작하는 분들을 위한 기본 규칙부터 핸드 랭킹까지 상세히 설명합니다. 프리플롭 전략과 포지션의 중요성도 함께 배워보세요.",
    content: `텍사스 홀덤은 세계에서 가장 인기 있는 포커 게임입니다. 2장의 개인 카드와 5장의 커뮤니티 카드로 최고의 5장 조합을 만드는 게임이죠.

🎯 기본 규칙:
1. 각 플레이어는 2장의 홀카드를 받습니다
2. 5장의 커뮤니티 카드가 단계별로 공개됩니다
3. 프리플롭 → 플롭(3장) → 턴(1장) → 리버(1장)
4. 각 단계마다 베팅 라운드가 있습니다
5. 최고의 5장 조합을 만든 플레이어가 승리합니다

🃏 핸드 랭킹 (강한 순서):
1. 로얄 플러시: A-K-Q-J-10 (같은 무늬)
2. 스트레이트 플러시: 연속된 5장 (같은 무늬)
3. 포카드: 같은 숫자 4장
4. 풀하우스: 트리플 + 페어
5. 플러시: 같은 무늬 5장
6. 스트레이트: 연속된 5장
7. 트리플: 같은 숫자 3장
8. 투페어: 페어 2개
9. 원페어: 같은 숫자 2장
10. 하이카드: 위 조합이 없을 때

💡 초보자 팁:
• 처음에는 타이트하게 플레이하세요 (좋은 핸드만)
• 포지션의 중요성을 이해하세요
• 감정적으로 플레이하지 마세요
• 뱅크롤 관리를 철저히 하세요`,
    author: "홀덤마스터 팀",
    readTime: "8분",
    publishDate: "2024-12-15",
    category: "기초 가이드",
    tags: ["초보자", "기본규칙", "핸드랭킹"],
    icon: Target,
    featured: true
  },
  {
    id: 2,
    title: "프리플롭 차트 완벽 마스터: 포지션별 핸드 선택",
    excerpt: "프로 플레이어들이 사용하는 프리플롭 차트를 포지션별로 상세 분석. UTG부터 버튼까지 각 포지션에서 플레이해야 할 핸드를 알아보세요.",
    content: `프리플롭에서의 올바른 핸드 선택은 포커 수익성의 기초입니다. 포지션에 따른 핸드 레인지를 정확히 이해하고 적용하는 것이 중요합니다.

🎯 포지션별 오픈 레인지:

UTG (언더 더 건) - 10-12%:
• AA-TT, AK-AJ, KQ
• 가장 타이트하게 플레이
• 9명이 뒤에 있어 매우 불리

미들 포지션 - 15-18%:
• 99-22, ATo, KJs, QJs, JTs
• 조금 더 넓은 레인지
• 상황에 따라 조절

컷오프 - 25-30%:
• 수트 커넥터, 작은 페어 추가
• 스틸링 기회 증가
• 블라인드 어택 준비

버튼 - 40-50%:
• 거의 모든 핸드 플레이 가능
• 포지션 어드밴티지 최대
• 가장 공격적으로

💰 베팅 사이징:
• 프리플롭: 2.5-3x BB
• 3bet: 9-12x 오리지널 레이즈
• 4bet: 2.2-2.5x 3bet 사이즈

🧠 고급 팁:
• 상대방의 3bet 빈도를 관찰하세요
• 스택 크기에 따라 레인지를 조절하세요
• 테이블 이미지를 고려하세요`,
    author: "프로 코치진",
    readTime: "12분",
    publishDate: "2024-12-10",
    category: "전략",
    tags: ["프리플롭", "포지션", "핸드선택"],
    icon: Brain
  },
  {
    id: 3,
    title: "포스트플롭 베팅 패턴 읽기: 상대방 심리 분석법",
    excerpt: "상대방의 베팅 패턴을 통해 핸드 강도를 파악하는 방법을 배워보세요. 블러프와 밸류벳을 구분하는 핵심 포인트를 제공합니다.",
    content: `포스트플롭에서 상대방의 베팅 패턴을 읽는 능력은 고급 플레이어로 성장하는 핵심 스킬입니다. 베팅 사이즈, 타이밍, 보드 텍스처를 종합적으로 분석해야 합니다.

🔍 베팅 패턴 분석:

빠른 베팅:
• 보통 강한 핸드나 명확한 블러프
• 고민할 필요가 없는 상황
• c-bet이나 너츠급 핸드

느린 베팅:
• 어려운 결정 상황
• 미들 스트렝스 핸드
• 블러프를 고려 중

베팅 사이징:
• 작은 베팅: 약한 밸류 또는 블러프
• 큰 베팅: 강한 밸류 또는 큰 블러프
• 팟 베팅: 표준적인 밸류

🧠 상대 리딩 팁:
• 이전 핸드들의 패턴을 기억하세요
• 보드 텍스처와 베팅의 일관성을 확인하세요
• 플레이어별 텐던시를 파악하세요`,
    author: "전략 분석팀",
    readTime: "15분",
    publishDate: "2024-12-05",
    category: "고급 전략",
    tags: ["포스트플롭", "베팅패턴", "상대읽기"],
    icon: Brain
  },
  {
    id: 4,
    title: "뱅크롤 관리의 기술: 장기적 수익을 위한 자금 관리",
    excerpt: "성공적인 포커 플레이어가 되기 위한 필수 요소인 뱅크롤 관리. 적절한 바이인 레벨과 위험 관리 전략을 알아보세요.",
    content: `뱅크롤 관리는 포커에서 가장 중요하지만 간과되기 쉬운 요소입니다. 아무리 실력이 좋아도 잘못된 자금 관리로 인해 파산할 수 있습니다.

💰 기본 가이드라인:

캐시 게임:
• 풀링: 바이인의 20-30배
• 예시: NL100 → $2,000-3,000 뱅크롤
• 쇼트스택: 바이인의 15-20배

토너먼트:
• MTT: 바이인의 50-100배
• SNG: 바이인의 30-50배
• 분산이 크므로 더 보수적으로

🚨 위험 관리:
• 하루 손실 한도: 뱅크롤의 2-3%
• 연속 손실 시 레벨 다운
• 틸트 관리가 필수

📈 레벨업 기준:
• 현재 레벨에서 안정적 수익
• 상위 레벨 기준의 30-40배 도달
• 기술적/정신적 준비 완료`,
    author: "재무 전문가",
    readTime: "10분",
    publishDate: "2024-11-28",
    category: "자금 관리",
    tags: ["뱅크롤", "자금관리", "리스크"],
    icon: Target
  }
];

const categories = [
  { name: "전체", count: 24 },
  { name: "기초 가이드", count: 8 },
  { name: "전략", count: 12 },
  { name: "고급 전략", count: 6 },
  { name: "자금 관리", count: 4 }
];

const BlogSection = ({ onViewChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedPost, setSelectedPost] = useState(null);

  // 필터링된 포스트
  const filteredPosts = selectedCategory === "전체" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  // 포스트 상세 보기 모달
  const PostModal = ({ post, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {post.category}
                </span>
                {post.featured && (
                  <span className="text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full">
                    추천 글
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} 읽기</span>
                </div>
                <time dateTime={post.publishDate}>
                  {new Date(post.publishDate).toLocaleDateString('ko-KR')}
                </time>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 ml-4"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50" role="main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 헤더 섹션 */}
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              포커 마스터 가이드
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              초보자부터 프로까지, 체계적인 텍사스 홀덤 학습을 위한 
              <strong className="text-blue-600"> 전문 가이드와 실전 전략</strong>을 제공합니다
            </p>
          </header>

          {/* 카테고리 필터 */}
          <nav className="mb-12" aria-label="블로그 카테고리">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 
                    ${selectedCategory === category.name
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                    }`}
                  aria-pressed={selectedCategory === category.name}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </nav>

          {/* 블로그 포스트 그리드 */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {filteredPosts.map((post, index) => {
              const IconComponent = post.icon;
              return (
                <article
                  key={post.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer
                    ${post.featured ? 'lg:col-span-2 border-2 border-blue-200' : ''}`}
                >
                  {/* 카테고리 및 아이콘 */}
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      {post.featured && (
                        <span className="text-xs font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full">
                          추천 글
                        </span>
                      )}
                    </div>

                    {/* 제목 */}
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>

                    {/* 요약 */}
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* 메타 정보 */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime} 읽기</span>
                        </div>
                      </div>
                      <time dateTime={post.publishDate}>
                        {new Date(post.publishDate).toLocaleDateString('ko-KR')}
                      </time>
                    </div>

                    {/* 태그 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* 읽기 버튼 */}
                    <button 
                      onClick={() => setSelectedPost(post)}
                      className="flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group-hover:translate-x-1 transform transition-transform"
                    >
                      <span>자세히 읽기</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* CTA 섹션 */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              이론과 실전을 함께 배워보세요
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              가이드를 읽은 후 AI 트레이너와 함께 실제 게임에서 연습해보세요. 
              체계적인 학습으로 포커 실력을 빠르게 향상시킬 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onViewChange && onViewChange('menu')}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                지금 게임 시작하기
              </button>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                더 많은 가이드 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 포스트 상세 보기 모달 */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </>
  );
};

export default BlogSection;