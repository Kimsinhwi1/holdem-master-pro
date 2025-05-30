import React from 'react';

// 광고 리워드 비디오 컴포넌트
const RewardVideoAd = ({ onReward, onClose, isOpen = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md">
        <h3 className="text-lg font-bold mb-4">광고 시청으로 칩 충전</h3>
        <p className="text-gray-600 mb-4">30초 광고를 시청하면 1000 칩을 받을 수 있습니다.</p>
        <div className="bg-gray-200 h-40 rounded-lg flex items-center justify-center mb-4">
          <div className="text-gray-500">광고 영상 영역</div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onReward} 
            className="flex-1 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 transition-colors"
          >
            광고 시청 완료
          </button>
          <button 
            onClick={onClose} 
            className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardVideoAd;