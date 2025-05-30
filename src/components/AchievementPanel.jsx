import React from 'react';
import { Medal, X, Trophy, Star, Target, Brain, Flame, Crown } from 'lucide-react';

const AchievementPanel = ({ 
  showAchievements, 
  setShowAchievements, 
  achievements,
  gamesPlayed,
  gamesWon,
  currentStreak,
  maxStreak,
  totalChipsWon,
  playerLevel 
}) => {
  if (!showAchievements) return null;

  // 잠금 해제 가능한 성취 목록
  const availableAchievements = [
    {
      id: 'first_win',
      title: '첫 승리',
      description: '첫 번째 게임에서 승리하기',
      icon: '🎉',
      unlocked: gamesWon >= 1,
      progress: Math.min(gamesWon, 1),
      max: 1
    },
    {
      id: 'games_10',
      title: '게임 중독자',
      description: '10게임 플레이하기',
      icon: '🎮',
      unlocked: gamesPlayed >= 10,
      progress: Math.min(gamesPlayed, 10),
      max: 10
    },
    {
      id: 'games_50',
      title: '포커 애호가',
      description: '50게임 플레이하기',
      icon: '🃏',
      unlocked: gamesPlayed >= 50,
      progress: Math.min(gamesPlayed, 50),
      max: 50
    },
    {
      id: 'streak_5',
      title: '연승 스타터',
      description: '5연승 달성하기',
      icon: '🔥',
      unlocked: maxStreak >= 5,
      progress: Math.min(maxStreak, 5),
      max: 5
    },
    {
      id: 'streak_10',
      title: '연승 마스터',
      description: '10연승 달성하기',
      icon: '⚡',
      unlocked: maxStreak >= 10,
      progress: Math.min(maxStreak, 10),
      max: 10
    },
    {
      id: 'chips_10k',
      title: '칩 수집가',
      description: '총 10,000칩 획득하기',
      icon: '💰',
      unlocked: totalChipsWon >= 10000,
      progress: Math.min(totalChipsWon, 10000),
      max: 10000
    },
    {
      id: 'level_5',
      title: '레벨업 마스터',
      description: '레벨 5 달성하기',
      icon: '⭐',
      unlocked: playerLevel >= 5,
      progress: Math.min(playerLevel, 5),
      max: 5
    },
    {
      id: 'winrate_70',
      title: '프로 플레이어',
      description: '승률 70% 달성하기 (10게임 이상)',
      icon: '👑',
      unlocked: gamesPlayed >= 10 && (gamesWon / gamesPlayed) >= 0.7,
      progress: gamesPlayed >= 10 ? Math.min((gamesWon / gamesPlayed) * 100, 70) : 0,
      max: 70
    }
  ];

  // 실제 달성한 성취들 (특별한 것들)
  const specialAchievements = achievements.map((achievement, index) => ({
    id: `special_${index}`,
    title: achievement,
    description: '게임 중 달성한 특별 성취',
    icon: '🏆',
    unlocked: true,
    special: true
  }));

  const allAchievements = [...availableAchievements, ...specialAchievements];
  const unlockedCount = allAchievements.filter(a => a.unlocked).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-4xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-800 flex items-center gap-2">
            <Medal size={28} />
            🏆 성취 시스템
          </h2>
          <button
            onClick={() => setShowAchievements(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* 성취 요약 */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-pink-800 mb-2">📊 성취 현황</h3>
              <p className="text-pink-700">
                <span className="font-bold text-xl">{unlockedCount}</span> / {allAchievements.length} 달성
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-pink-600">
                {Math.round((unlockedCount / allAchievements.length) * 100)}%
              </div>
              <div className="text-sm text-pink-500">완료율</div>
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(unlockedCount / allAchievements.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* 성취 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allAchievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`border-2 rounded-lg p-4 transition-all duration-300 ${
                achievement.unlocked 
                  ? achievement.special
                    ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-yellow-100'
                    : 'border-green-400 bg-gradient-to-r from-green-50 to-green-100'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`text-2xl ${achievement.unlocked ? '' : 'filter grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold mb-1 ${
                    achievement.unlocked 
                      ? achievement.special ? 'text-yellow-800' : 'text-green-800'
                      : 'text-gray-500'
                  }`}>
                    {achievement.title}
                    {achievement.unlocked && <span className="ml-2 text-xs">✓</span>}
                  </h4>
                  <p className={`text-sm mb-2 ${
                    achievement.unlocked 
                      ? achievement.special ? 'text-yellow-700' : 'text-green-700'
                      : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                  
                  {!achievement.special && achievement.max && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>진행도</span>
                        <span>{achievement.progress} / {achievement.max}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            achievement.unlocked 
                              ? 'bg-gradient-to-r from-green-400 to-green-600'
                              : 'bg-gradient-to-r from-blue-400 to-blue-600'
                          }`}
                          style={{ width: `${Math.min((achievement.progress / achievement.max) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 특별 메시지 */}
        <div className="mt-6 text-center">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-4">
            <p className="text-purple-700 font-medium">
              🎯 더 많은 성취를 달성하여 포커 마스터가 되어보세요!
            </p>
            <p className="text-sm text-purple-600 mt-1">
              각 성취는 여러분의 실력 향상을 보여주는 지표입니다.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAchievements(false)}
          className="w-full mt-6 bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors font-semibold"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default AchievementPanel;