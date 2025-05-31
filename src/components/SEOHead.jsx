import React, { useEffect } from 'react';

/**
 * SEO 최적화된 Head 컴포넌트
 * React 19 호환 - 패키지 의존성 없는 순수 React 버전
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

  useEffect(() => {
    // 페이지 제목 업데이트
    document.title = fullTitle;
    
    // 메타 태그 업데이트 함수
    const updateMetaTag = (name, content, attribute = 'name') => {
      let metaTag = document.querySelector(`meta[${attribute}="${name}"]`);
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        metaTag = document.createElement('meta');
        metaTag.setAttribute(attribute, name);
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };

    // 링크 태그 업데이트 함수
    const updateLinkTag = (rel, href) => {
      let linkTag = document.querySelector(`link[rel="${rel}"]`);
      if (linkTag) {
        linkTag.setAttribute('href', href);
      } else {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', rel);
        linkTag.setAttribute('href', href);
        document.head.appendChild(linkTag);
      }
    };
    
    // 기본 메타 태그들
    updateMetaTag('description', metaDescription);
    updateMetaTag('keywords', keywordString);
    updateMetaTag('author', '홀덤마스터 팀');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'ko');
    updateMetaTag('revisit-after', '7 days');
    
    // Open Graph 메타 태그들
    updateMetaTag('og:title', fullTitle, 'property');
    updateMetaTag('og:description', metaDescription, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:url', url, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:site_name', '홀덤마스터 프로', 'property');
    updateMetaTag('og:locale', 'ko_KR', 'property');
    
    // Twitter Card 메타 태그들
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', metaDescription);
    updateMetaTag('twitter:image', ogImage);
    
    // 모바일 최적화
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    updateMetaTag('format-detection', 'telephone=no');
    
    // Canonical URL
    updateLinkTag('canonical', url);
    
    // 구조화된 데이터 추가
    if (structuredData) {
      const existingScript = document.querySelector('#structured-data');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
    
    // 페이지별 특별 태그
    if (title?.includes('블로그')) {
      updateMetaTag('article:section', '포커 가이드', 'property');
      updateMetaTag('article:tag', '텍사스 홀덤', 'property');
    }
    
    if (title?.includes('FAQ')) {
      updateMetaTag('robots', 'index, follow, max-snippet:300');
    }
    
    if (title?.includes('용어사전')) {
      updateMetaTag('robots', 'index, follow, max-snippet:150');
      updateMetaTag('og:type', 'article', 'property');
    }

    // 기본 구조화된 데이터 (웹앱)
    if (!structuredData) {
      const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "홀덤마스터 프로",
        "description": metaDescription,
        "url": url,
        "image": ogImage,
        "applicationCategory": "GameApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "KRW"
        },
        "author": {
          "@type": "Organization", 
          "name": "홀덤마스터 프로"
        },
        "gameGenre": "Card Game",
        "keywords": keywordString,
        "inLanguage": "ko-KR"
      };
      
      const existingScript = document.querySelector('#default-structured-data');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.id = 'default-structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(defaultStructuredData);
      document.head.appendChild(script);
    }
    
  }, [fullTitle, metaDescription, keywordString, ogImage, url, type, structuredData, title]);

  // 이 컴포넌트는 DOM을 직접 조작하므로 렌더링할 것이 없음
  return null;
};

export default SEOHead;