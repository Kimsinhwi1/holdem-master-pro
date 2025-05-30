import React from 'react';
import { Calculator, X } from 'lucide-react';

const OutsCalculator = ({ 
  showOutsCalculator, 
  setShowOutsCalculator, 
  currentOuts, 
  drawOdds, 
  gameStage,
  potOdds 
}) => {
  if (!showOutsCalculator) return null;

  const getRecommendation = () => {
    if (drawOdds.count === 0) return "드로우가 없습니다.";
    
    if (potOdds > 0) {
      if (drawOdds.odds > potOdds) {
        return "🟢 콜 추천! 드로우 오즈가 팟 오즈보다 좋습니다.";
      } else {
        return "🔴 폴드 고려. 팟 오즈가 드로우 오즈보다 나쁩니다.";
      }
    }
    
    if (drawOdds.count >= 12) return "🟢 매우 강한 드로우! 적극적인 플레이 추천";
    if (drawOdds.count >= 8) return "🟡 괜찮은 드로우. 상황에 따라 판단";
    if (drawOdds.count >= 4) return "🟡 약한 드로우. 신중한 플레이 필요";
    return "🔴 드로우가 약함. 폴드 고려";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
            <Calculator size={28} />
            🧮 프로 아웃츠 계산기
          </h2>
          <button
            onClick={() => setShowOutsCalculator(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* 현재 상황 요약 */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4">
            <h3 className="font-bold text-purple-800 mb-3">📊 현재 상황</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>게임 스테이지: <span className="font-bold uppercase">{gameStage}</span></div>
              <div>총 아웃츠: <span className="font-bold text-green-600">{drawOdds.count}장</span></div>
              <div>완성 확률: <span className="font-bold text-blue-600">{drawOdds.odds?.toFixed(1)}%</span></div>
              {potOdds > 0 && <div>팟 오즈: <span className="font-bold text-orange-600">{potOdds.toFixed(1)}%</span></div>}
            </div>
          </div>

          {/* 아웃츠 상세 */}
          {currentOuts.length > 0 ? (
            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">🎯 아웃츠 상세</h3>
              <div className="space-y-3">
                {currentOuts.map((out, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {out.type === '플러시' ? '🌊' : 
                         out.type === '스트레이트' ? '📏' :
                         out.type === '트리플' ? '🎯' : '👥'}
                      </span>
                      <span className="font-semibold">{out.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{out.count}장</div>
                      <div className="text-xs text-gray-500">
                        {gameStage === 'turn' ? (out.count * 2).toFixed(1) : (out.count * 4).toFixed(1)}% 확률
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-600">현재 드로우할 수 있는 핸드가 없습니다.</p>
              <p className="text-sm text-gray-500 mt-2">커뮤니티 카드가 3장 이상 공개되어야 아웃츠를 계산할 수 있습니다.</p>
            </div>
          )}

          {/* 추천 사항 */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-4">
            <h3 className="font-bold text-yellow-800 mb-2">💡 AI 추천</h3>
            <p className="text-yellow-700 font-medium">{getRecommendation()}</p>
          </div>

          {/* 아웃츠 학습 정보 */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 mb-3">📚 아웃츠 기본 지식</h3>
            <div className="text-sm text-green-700 space-y-2">
              <div>• <strong>룰 오브 4:</strong> 플롭에서 아웃츠 × 4 = 리버까지의 대략적인 확률</div>
              <div>• <strong>룰 오브 2:</strong> 턴에서 아웃츠 × 2 = 리버에서의 대략적인 확률</div>
              <div>• <strong>강한 드로우:</strong> 12+ 아웃츠 (몬스터 드로우)</div>
              <div>• <strong>보통 드로우:</strong> 8-11 아웃츠 (괜찮은 드로우)</div>
              <div>• <strong>약한 드로우:</strong> 4-7 아웃츠 (주의 필요)</div>
            </div>
          </div>

          {/* 팟 오즈 vs 드로우 오즈 설명 */}
          {potOdds > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-800 mb-3">🎲 팟 오즈 vs 드로우 오즈</h3>
              <div className="text-sm text-blue-700 space-y-2">
                <div>• <strong>팟 오즈:</strong> 콜하기 위해 필요한 확률 ({potOdds.toFixed(1)}%)</div>
                <div>• <strong>드로우 오즈:</strong> 핸드가 완성될 확률 ({drawOdds.odds?.toFixed(1)}%)</div>
                <div className="font-medium">
                  {drawOdds.odds > potOdds ? 
                    "✅ 드로우 오즈가 더 좋아서 수학적으로 콜이 유리합니다!" :
                    "❌ 팟 오즈가 더 나빠서 수학적으로 폴드가 유리합니다."
                  }
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowOutsCalculator(false)}
          className="w-full mt-6 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default OutsCalculator;