import React, { useEffect } from 'react';

/**
 * SEO 최적화된 Head 컴포넌트 - 안전한 버전
 * React 19 호환 - 최소한의 DOM 조작으로 안정성 확보
 */
const SEOHead = ({ 
  title, 
  description
}) => {
  const fullTitle = title ? `${title} | 홀덤마스터 프로` : '프로 텍사스 홀덤 마스터 | AI와 함께 배우는 무료 포커 학습';
  const metaDescription = description || '최고의 텍사스 홀덤 학습 앱! AI 트레이너와 함께 프리플롭부터 고급 전략까지 체계적으로 학습하세요. 무료 플레이 가능!';

  useEffect(() => {
    // 안전한 제목 업데이트만
    try {
      document.title = fullTitle;
      
      // 기본 description만 안전하게 업데이트
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.content = metaDescription;
      }
    } catch (error) {
      console.warn('SEO 업데이트 중 오류:', error);
    }
  }, [fullTitle, metaDescription]);

  return null;
};

export default SEOHead;