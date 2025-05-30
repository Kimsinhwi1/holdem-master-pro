import React from 'react';
import Card from './Card.jsx';
import { AI_STYLES } from '../constants/gameConstants.js';

// 플레이어 컴포넌트
const Player = ({ 
  player, 
  isActive = false, 
  isDealer = false, 
  isShowdown = false, 
  position = '', 
  bestHand = null,
  highlightedCards = [],
  LANGUAGES = null,
  currentLanguage = 'ko'
}) => {
  if (!player) return null;

  return (
    <div className={
      "relative bg-white rounded-xl p-4 shadow-lg border-2 transition-all duration-300 " +
      (isActive ? 'border-yellow-400 shadow-yellow-400/50 scale-105' : 'border-gray-300') +
      (player.folded ? ' opacity-50 grayscale' : '')
    }>
      {isDealer && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
          D
        </div>
      )}

      <div className="text-center mb-3">
        <div className="font-bold text-lg">{player.name}</div>
        <div className="text-sm text-gray-600">{position}</div>
        <div className="text-green-600 font-bold">${player.chips?.toLocaleString() || 0}</div>
        {!player.isHuman && player.aiStyle && AI_STYLES[player.aiStyle] && (
          <div className={`inline-block text-xs text-white px-2 py-1 rounded mt-1 ${AI_STYLES[player.aiStyle].color}`}>
            {AI_STYLES[player.aiStyle].name}
          </div>
        )}
      </div>

      <div className="flex justify-center gap-1 mb-3">
        {player.cards?.map((card, idx) => (
          <Card 
            key={idx} 
            card={card} 
            isHidden={!player.isHuman && !isShowdown && !player.folded}
            isHighlighted={player.isHuman && highlightedCards.includes(card?.id)}
          />
        ))}
      </div>

      {player.currentBet > 0 && (
        <div className="text-center mb-2">
          <div className="bg-blue-100 px-3 py-1 rounded-full text-sm font-bold text-blue-800">
            ${player.currentBet?.toLocaleString() || 0}
          </div>
        </div>
      )}

      {player.lastAction && (
        <div className="text-center">
          <div className={`inline-block text-xs px-2 py-1 rounded-full font-semibold ${
            player.lastAction === 'fold' ? 'bg-red-100 text-red-700' :
            player.lastAction === 'raise' ? 'bg-orange-100 text-orange-700' :
            player.lastAction === 'call' ? 'bg-green-100 text-green-700' :
            player.lastAction === 'allin' ? 'bg-purple-100 text-purple-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {LANGUAGES && LANGUAGES[currentLanguage]?.ui?.actions?.[player.lastAction] || 
             (player.lastAction === 'allin' ? '올인' :
              player.lastAction === 'fold' ? '폴드' :
              player.lastAction === 'call' ? '콜' :
              player.lastAction === 'raise' ? '레이즈' :
              player.lastAction === 'check' ? '체크' : player.lastAction)}
          </div>
        </div>
      )}

      {isShowdown && bestHand && (
        <div className="text-center mt-2">
          <div className="text-xs bg-gray-100 px-2 py-1 rounded font-semibold">
            {bestHand.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;