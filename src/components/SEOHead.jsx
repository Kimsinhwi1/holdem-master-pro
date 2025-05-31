import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO 최적화된 Head 컴포넌트
 * 페이지별 동적 메타 태그 관리
 */

const SEOHead = ({ 
  title, 
  description, 
  keywords = [],
  ogImage = "https://holdem-master.com/og-image.jpg",
  url = "https://holdem-master.com",
  type = "website",
  structuredData = null
}) => {
  const fullTitle = title ? `${title} | 홀덤마스터 프로` : '프로 텍사스 홀덤 마스터 | AI와 함께 배우는 무료 포커 학습';
  const metaDescription = description || '최고의 텍사스 홀덤 학습 앱! AI 트레이너와 함께 프리플롭부터 고급 전략까지 체계적으로 학습하세요. 무료 플레이 가능!';
  const keywordString = keywords.length > 0 ? keywords.join(', ') : '텍사스 홀덤, 포커 게임, 포커 학습, 포커 앱, 홀덤 마스터, AI 포커, 무료 포커, 포커 교육';

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywordString} />
      <meta name="author" content="홀덤마스터 팀" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph 태그 */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="홀덤마스터 프로" />
      <meta property="og:locale" content="ko_KR" />
      
      {/* Twitter Card 태그 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* 모바일 최적화 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* 구조화된 데이터 */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* 페이지별 특별 태그 */}
      {title?.includes('블로그') && (
        <>
          <meta property="article:section" content="포커 가이드" />
          <meta property="article:tag" content="텍사스 홀덤" />
          <meta property="article:tag" content="포커 전략" />
        </>
      )}
      
      {title?.includes('FAQ') && (
        <meta name="robots" content="index, follow, max-snippet:300" />
      )}
      
      {title?.includes('용어사전') && (
        <>
          <meta name="robots" content="index, follow, max-snippet:150" />
          <meta property="og:type" content="article" />
        </>
      )}
    </Helmet>
  );
};

export default SEOHead;