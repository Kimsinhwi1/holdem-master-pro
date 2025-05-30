import React, { useEffect } from 'react';

const AdSenseAd = ({ 
  adSlot, 
  adFormat = "auto", 
  fullWidthResponsive = true,
  style = {},
  className = ""
}) => {
  useEffect(() => {
    try {
      // AdSense 광고 푸시 (브라우저 환경에서만)
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.warn('AdSense 로드 오류:', error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-2478956041357030"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  );
};

export default AdSenseAd;