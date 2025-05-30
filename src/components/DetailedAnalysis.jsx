import React from 'react';
import { BarChart3, X, Brain, Target, TrendingUp, Eye, Calculator, Lightbulb } from 'lucide-react';

const DetailedAnalysis = ({ 
  showHistory, 
  setShowHistory, 
  gameHistory,
  gamesPlayed,
  gamesWon,
  maxStreak,
  totalChipsWon,
  learningProgress,
  handStrength,
  currentWinRate,
  preflopWinRate,
  currentOuts,
  aiPersonality,
  learningMode
}) => {
  if (!showHistory) return null;

  // 최근 게임 성과 분석
  const recentGames = gameHistory.slice(0, 10);
  const recentWins = recentGames.filter(game => game.winner === 'player').length;
  const recentWinRate = recentGames.length > 0 ? (recentWins / recentGames.length) * 100 : 0;

  // 핸드 타입별 통계
  const handTypeStats = {};
  gameHistory.forEach(game => {
    if (game.playerHand) {
      const handType = game.playerHand.type;
      if (!handTypeStats[handType]) {
        handTypeStats[handType] = { total: 0, wins: 0 };
      }
      handTypeStats[handType].total++;
      if (game.winner === 'player') {
        handTypeStats[handType].wins++;
      }
    }
  });

  // 현재 핸드 분석
  const getCurrentHandAnalysis = () => {
    if (!currentWinRate) return null;

    const analysis = [];
    
    if (currentWinRate >= 80) {
      analysis.push({
        type: 'strength',
        message: '🔥 매우 강한 핸드입니다! 적극적인 플레이를 고려하세요.',
        color: 'text-green-600'
      });
    } else if (currentWinRate >= 60) {
      analysis.push({
        type: 'strength',
        message: '💪 괜찮은 핸드입니다. 상황에 따라 베팅을 고려하세요.',
        color: 'text-blue-600'
      });
    } else if (currentWinRate >= 40) {
      analysis.push({
        type: 'strength',
        message: '⚠️ 보통 핸드입니다. 신중한 플레이가 필요합니다.',
        color: 'text-yellow-600'
      });
    } else {
      analysis.push({
        type: 'strength',
        message: '🚨 약한 핸드입니다. 블러프가 아니라면 폴드를 고려하세요.',
        color: 'text-red-600'
      });
    }

    // 프리플롭 vs 현재 승률 비교
    if (preflopWinRate && currentWinRate) {
      const improvement = currentWinRate - preflopWinRate;
      if (improvement > 20) {
        analysis.push({
          type: 'improvement',
          message: `📈 핸드가 크게 개선되었습니다! (+${improvement.toFixed(1)}%)`,
          color: 'text-green-600'
        });
      } else if (improvement < -20) {
        analysis.push({
          type: 'improvement',
          message: `📉 핸드가 약해졌습니다. (${improvement.toFixed(1)}%)`,
          color: 'text-red-600'
        });
      }
    }

    // 아웃츠 분석
    if (currentOuts.length > 0) {
      const totalOuts = currentOuts.reduce((sum, out) => sum + out.count, 0);
      if (totalOuts >= 12) {
        analysis.push({
          type: 'outs',
          message: `🎯 몬스터 드로우! ${totalOuts}개의 아웃츠가 있습니다.`,
          color: 'text-purple-600'
        });
      } else if (totalOuts >= 8) {
        analysis.push({
          type: 'outs',
          message: `🎲 좋은 드로우입니다. ${totalOuts}개의 아웃츠가 있습니다.`,
          color: 'text-blue-600'
        });
      }
    }

    return analysis;
  };

  // AI 상대 분석
  const getAIAnalysis = () => {
    const aiAnalysis = {
      tight: {
        description: '타이트한 플레이어',
        strategy: '강한 핸드로만 베팅합니다. 블러프를 시도해볼 수 있습니다.',
        weakness: '약한 핸드로는 거의 콜하지 않습니다.'
      },
      loose: {
        description: '루즈한 플레이어',
        strategy: '많은 핸드로 콜합니다. 밸류 베팅에 집중하세요.',
        weakness: '블러프에 자주 당할 수 있습니다.'
      },
      aggressive: {
        description: '공격적인 플레이어',
        strategy: '자주 레이즈합니다. 강한 핸드로 트랩을 시도해보세요.',
        weakness: '블러프 빈도가 높아 콜다운할 기회가 많습니다.'
      },
      passive: {
        description: '수동적인 플레이어',
        strategy: '베팅보다는 콜을 선호합니다. 밸류 베팅을 많이 하세요.',
        weakness: '압박에 약하므로 블러프가 효과적입니다.'
      },
      balanced: {
        description: '밸런스드 플레이어',
        strategy: '예측하기 어려운 상대입니다. 상황별 판단이 중요합니다.',
        weakness: '특별한 약점이 없어 실력으로 승부해야 합니다.'
      },
      pro: {
        description: '프로 수준 플레이어',
        strategy: '매우 어려운 상대입니다. 완벽한 플레이가 필요합니다.',
        weakness: '고급 전략을 사용하므로 기본기가 중요합니다.'
      }
    };

    return aiAnalysis[aiPersonality] || aiAnalysis.balanced;
  };

  const currentHandAnalysis = getCurrentHandAnalysis();
  const aiAnalysis = getAIAnalysis();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-6xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-800 flex items-center gap-2">
            <BarChart3 size={28} />
            📊 프로급 상세 분석
          </h2>
          <button
            onClick={() => setShowHistory(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 현재 핸드 실시간 분석 */}
          {currentHandAnalysis && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                <Brain size={20} />
                🧠 현재 핸드 AI 분석
              </h3>
              <div className="space-y-3">
                {currentHandAnalysis.map((analysis, i) => (
                  <div key={i} className={`p-3 bg-white rounded-lg border-l-4 ${
                    analysis.type === 'strength' ? 'border-blue-500' :
                    analysis.type === 'improvement' ? 'border-green-500' : 'border-purple-500'
                  }`}>
                    <p className={`font-medium ${analysis.color}`}>
                      {analysis.message}
                    </p>
                  </div>
                ))}
                
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-1">
                    <Lightbulb size={16} />
                    추천 액션
                  </h4>
                  <p className="text-yellow-700 text-sm">
                    {handStrength >= 70 ? '🟢 적극적인 베팅 또는 레이즈' :
                     handStrength >= 50 ? '🟡 상황에 따라 콜 또는 체크' :
                     handStrength >= 30 ? '🟡 신중한 플레이, 블러프 고려' :
                     '🔴 폴드 고려, 또는 블러프 시도'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* AI 상대 분석 */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-lg p-4">
            <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
              <Eye size={20} />
              🤖 AI 상대 분석
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg">
                <h4 className="font-bold text-red-700 mb-1">상대 특성</h4>
                <p className="text-red-600 text-sm">{aiAnalysis.description}</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <h4 className="font-bold text-blue-700 mb-1">추천 전략</h4>
                <p className="text-blue-600 text-sm">{aiAnalysis.strategy}</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <h4 className="font-bold text-orange-700 mb-1">약점 공략</h4>
                <p className="text-orange-600 text-sm">{aiAnalysis.weakness}</p>
              </div>
            </div>
          </div>

          {/* 종합 성과 분석 */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
              <TrendingUp size={20} />
              📈 종합 성과
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-2 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600">{gamesPlayed}</div>
                <div className="text-xs text-green-500">총 게임</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {gamesPlayed > 0 ? ((gamesWon / gamesPlayed) * 100).toFixed(1) : 0}%
                </div>
                <div className="text-xs text-blue-500">전체 승률</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{recentWinRate.toFixed(1)}%</div>
                <div className="text-xs text-purple-500">최근 승률</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg">
                <div className="text-2xl font-bold text-red-600">{maxStreak}</div>
                <div className="text-xs text-red-500">최고 연승</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-white rounded-lg">
              <div className="flex justify-between text-sm mb-1">
                <span>총 수익</span>
                <span className="font-bold text-yellow-600">{totalChipsWon.toLocaleString()} 칩</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>게임당 평균 수익</span>
                <span className="font-bold">
                  {gamesPlayed > 0 ? (totalChipsWon / gamesPlayed).toFixed(0) : 0} 칩
                </span>
              </div>
            </div>
          </div>

          {/* 핸드 타입별 성과 */}
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-200 rounded-lg p-4">
            <h3 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
              <Target size={20} />
              🎯 핸드별 성과
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {Object.entries(handTypeStats).map(([handType, stats]) => (
                <div key={handType} className="flex justify-between items-center p-2 bg-white rounded text-sm">
                  <span className="font-medium">{handType}</span>
                  <div className="text-right">
                    <div className="font-bold text-purple-600">
                      {stats.total > 0 ? ((stats.wins / stats.total) * 100).toFixed(0) : 0}%
                    </div>
                    <div className="text-xs text-gray-500">
                      {stats.wins}/{stats.total}
                    </div>
                  </div>
                </div>
              ))}
              {Object.keys(handTypeStats).length === 0 && (
                <p className="text-gray-500 text-center py-4">게임을 더 플레이하면 통계가 표시됩니다.</p>
              )}
            </div>
          </div>

          {/* 학습 진도 */}
          <div className="lg:col-span-2 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-lg p-4">
            <h3 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
              <Calculator size={20} />
              📚 학습 진도 ({learningMode.toUpperCase()} 모드)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(learningProgress.skillPoints).map(([skill, points]) => (
                <div key={skill} className="text-center">
                  <div className="mb-2">
                    <div className="text-lg font-bold text-yellow-700">{points}/100</div>
                    <div className="text-xs text-yellow-600 capitalize">{skill}</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(points, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-2 bg-white rounded-lg">
                <div className="font-bold text-green-600">{learningProgress.goodDecisions}</div>
                <div className="text-green-500">좋은 결정</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg">
                <div className="font-bold text-red-600">{learningProgress.badDecisions}</div>
                <div className="text-red-500">나쁜 결정</div>
              </div>
              <div className="text-center p-2 bg-white rounded-lg">
                <div className="font-bold text-blue-600">{learningProgress.totalAnalyzed}</div>
                <div className="text-blue-500">분석된 핸드</div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowHistory(false)}
          className="w-full mt-6 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default DetailedAnalysis;