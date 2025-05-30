import React from 'react';

// 프로 도전 모달
const ProChallengeModal = ({ isOpen, onClose, onAccept, stats }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">프로 포커 플레이어 도전!</h2>
            <p className="text-gray-600">
              축하합니다! 당신의 포커 실력이 프로 수준에 도달했습니다.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-bold mb-3">현재 성과</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>총 수익: <span className="font-bold text-green-600">${stats?.totalEarnings?.toLocaleString() || 0}</span></div>
              <div>승률: <span className="font-bold">{stats?.handsPlayed > 0 ? Math.round((stats.handsWon / stats.handsPlayed) * 100) : 0}%</span></div>
              <div>학습 점수: <span className="font-bold text-blue-600">{stats?.learningScore || 0}</span></div>
              <div>연승: <span className="font-bold text-purple-600">{stats?.currentStreak || 0}</span></div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
            >
              계속 학습하기
            </button>
            <button
              onClick={onAccept}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              프로 도전하기!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProChallengeModal;