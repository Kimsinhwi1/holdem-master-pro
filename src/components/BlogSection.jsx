import React from 'react';
import { Clock, User, ArrowRight, TrendingUp, Target, Brain } from 'lucide-react';

/**
 * 홀덤마스터 프로 - 블로그/가이드 섹션 컴포넌트
 * SEO 최적화된 포커 학습 콘텐츠
 */

const blogPosts = [
  {
    id: 1,
    title: "텍사스 홀덤 기초: 초보자를 위한 완벽 가이드",
    excerpt: "포커를 처음 시작하는 분들을 위한 기본 규칙부터 핸드 랭킹까지 상세히 설명합니다. 프리플롭 전략과 포지션의 중요성도 함께 배워보세요.",
    content: "텍사스 홀덤은 세계에서 가장 인기 있는 포커 게임입니다. 2장의 개인 카드와 5장의 커뮤니티 카드로 최고의 5장 조합을 만드는 게임이죠...",
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
    content: "프리플롭에서의 올바른 핸드 선택은 포커 수익성의 기초입니다. 포지션에 따른 핸드 레인지를 정확히 이해하고 적용하는 것이 중요합니다...",
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
    content: "포스트플롭에서 상대방의 베팅 패턴을 읽는 능력은 고급 플레이어로 성장하는 핵심 스킬입니다. 베팅 사이즈, 타이밍, 보드 텍스처를 종합적으로...",
    author: "전략 분석팀",
    readTime: "15분",
    publishDate: "2024-12-05",
    category: "고급 전략",
    tags: ["포스트플롭", "베팅패턴", "상대읽기"],
    icon: TrendingUp
  },
  {
    id: 4,
    title: "뱅크롤 관리의 기술: 장기적 수익을 위한 자금 관리",
    excerpt: "성공적인 포커 플레이어가 되기 위한 필수 요소인 뱅크롤 관리. 적절한 바이인 레벨과 위험 관리 전략을 알아보세요.",
    content: "뱅크롤 관리는 포커에서 가장 중요하지만 간과되기 쉬운 요소입니다. 아무리 실력이 좋아도 잘못된 자금 관리로 인해 파산할 수 있습니다...",
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

const BlogSection = () => {
  // 구조화된 데이터 (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "홀덤마스터 프로 포커 가이드",
    "description": "텍사스 홀덤 학습을 위한 전문 가이드와 전략 팁",
    "url": "https://holdem-master.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "홀덤마스터",
      "url": "https://holdem-master.com"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.publishDate,
      "url": `https://holdem-master.com/blog/${post.id}`,
      "keywords": post.tags.join(", ")
    }))
  };

  return (
    <>
      {/* SEO 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
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
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 
                    ${index === 0 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                    }`}
                  aria-pressed={index === 0}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </nav>

          {/* 블로그 포스트 그리드 */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {blogPosts.map((post, index) => {
              const IconComponent = post.icon;
              return (
                <article
                  key={post.id}
                  className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group
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
                    <button className="flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group-hover:translate-x-1 transform transition-transform">
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
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                지금 게임 시작하기
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                더 많은 가이드 보기
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSection;