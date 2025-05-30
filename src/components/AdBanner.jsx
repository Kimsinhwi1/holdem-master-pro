import React from 'react';

// 광고 배너 컴포넌트
const AdBanner = ({ className = "" }) => (
  <div className={`w-full bg-gray-100 border border-gray-300 p-4 text-center ${className}`}>
    <div className="text-gray-600 text-sm font-medium">
      광고 배너 영역 - 실제 광고 코드로 교체하세요
    </div>
    <div className="text-xs text-gray-400 mt-1">
      예: Google AdSense, 네이버 애드포스트 등
    </div>
  </div>
);

export default AdBanner;