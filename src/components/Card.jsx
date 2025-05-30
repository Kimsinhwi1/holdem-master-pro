import React from 'react';

const Card = ({ card, isHidden = false, isHighlighted = false, showProbability = false }) => {
  if (isHidden) {
    return (
      <div className="w-20 h-28 bg-gradient-to-br from-blue-800 to-blue-900 border-2 border-blue-700 rounded-lg flex items-center justify-center shadow-xl">
        <div className="text-white text-lg">🎴</div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="w-20 h-28 bg-gray-300 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center shadow-lg">
        <div className="text-gray-500 text-lg">?</div>
      </div>
    );
  }

  const isRed = card.suit === '♥' || card.suit === '♦';
  
  return (
    <div className={`w-20 h-28 bg-white border-2 rounded-lg flex flex-col items-center justify-between p-1 shadow-lg transition-all duration-500 relative ${
      isRed ? 'text-red-600' : 'text-black'
    } ${
      isHighlighted 
        ? 'border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-2xl scale-110 z-10 ring-2 ring-yellow-300 ring-opacity-50' 
        : 'border-gray-300 hover:border-gray-400'
    }`}>
      <div className="text-xs font-bold">{card.rank}</div>
      <div className="text-xl">{card.suit}</div>
      <div className="text-xs font-bold transform rotate-180">{card.rank}</div>
      
      {isHighlighted && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-yellow-800">✨</span>
        </div>
      )}
      
      {showProbability && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
          {Math.floor(Math.random() * 20) + 10}%
        </div>
      )}
    </div>
  );
};

export default Card;