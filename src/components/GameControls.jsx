import React from 'react';
import { Shuffle, Play, RefreshCw, Activity } from 'lucide-react';

const GameControls = ({ 
  autoPlay, 
  startNewGame, 
  startAutoPlay, 
  stopAutoPlay, 
  timeToNextGame,
  playerChips,
  blinds
}) => {
  return (
    <div className="mt-6 pt-4 border-t-2 border-green-200">
      {/* 자동 진행 상태 표시 */}
      {autoPlay && (
        <div className="text-center mb-4 p-3 bg-gradient-to-r from-blue-100 to-blue-200 border-2 border-blue-300 rounded-xl">
          <div className="flex items-center justify-center gap-2 text-blue-800 font-bold">
            <Activity className="animate-pulse" size={20} />
            <span>🤖 자동 연속 게임 진행 중</span>
          </div>
          {timeToNextGame > 0 && (
            <div className="text-sm text-blue-600 mt-1">
              다음 게임까지: <span className="font-bold text-lg">{timeToNextGame}</span>초
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-center gap-3 flex-wrap">
        {!autoPlay ? (
          <>
            <button
              onClick={startNewGame}
              className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 transition-all duration-300 shadow-xl text-lg font-bold flex items-center gap-3"
            >
              <Shuffle size={24} />
              새 게임 시작
            </button>
            
            <button
              onClick={startAutoPlay}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-xl font-bold flex items-center gap-2"
              disabled={playerChips < blinds.big}
            >
              <Play size={20} />
              연속 게임
            </button>
          </>
        ) : (
          <button
            onClick={stopAutoPlay}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-xl text-lg font-bold flex items-center gap-3"
          >
            <RefreshCw size={24} />
            게임 중단
          </button>
        )}
      </div>
    </div>
  );
};

export default GameControls;