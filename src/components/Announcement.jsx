import React, { useState } from 'react';
import { Bell, X, ChevronDown, ChevronUp, Calendar, Info } from 'lucide-react';

const Announcement = ({ LANGUAGES, currentLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  // 공지사항 데이터
  const announcements = [
    {
      id: 1,
      type: 'update',
      title: {
        ko: '🎉 학습 모드 업데이트',
        en: '🎉 Learning Mode Update'
      },
      content: {
        ko: '새로운 학습 모드가 추가되었습니다! 포지션별 훈련, 블러프 연습, 토너먼트 시뮬레이션 등 다양한 학습 옵션을 체험해보세요.',
        en: 'New learning modes have been added! Experience various learning options including position training, bluff practice, and tournament simulation.'
      },
      date: '2025-01-31',
      isNew: true
    },
    {
      id: 2,
      type: 'feature',
      title: {
        ko: '🃏 진짜 헤즈업 시스템 도입',
        en: '🃏 Real Heads-up System Introduced'
      },
      content: {
        ko: '이제 헤즈업 모드에서 4명으로 시작해서 자연스럽게 1:1 상황이 만들어집니다. 실제 포커와 동일한 헤즈업 경험을 제공합니다.',
        en: 'Heads-up mode now starts with 4 players and naturally creates 1:1 situations. Provides the same heads-up experience as real poker.'
      },
      date: '2025-01-31',
      isNew: true
    },
    {
      id: 3,
      type: 'improvement',
      title: {
        ko: '💰 칩 시스템 개선',
        en: '💰 Chip System Improvement'
      },
      content: {
        ko: '칩 저장 시스템이 개선되어 새로고침 후에도 보유 칩이 유지됩니다. 시작 칩이 5000개로 증가하고, 광고 시청 보상이 2000개로 증가했습니다.',
        en: 'Chip saving system improved to maintain chips after refresh. Starting chips increased to 5000, and ad viewing rewards increased to 2000.'
      },
      date: '2025-01-31',
      isNew: false
    },
    {
      id: 4,
      type: 'info',
      title: {
        ko: '📱 모바일 최적화',
        en: '📱 Mobile Optimization'
      },
      content: {
        ko: '모바일 환경에서의 사용성이 개선되었습니다. 터치 인터페이스와 반응형 디자인이 최적화되어 더 편리하게 이용하실 수 있습니다.',
        en: 'Usability in mobile environments has been improved. Touch interface and responsive design have been optimized for more convenient use.'
      },
      date: '2025-01-30',
      isNew: false
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'update': return '🎉';
      case 'feature': return '✨';
      case 'improvement': return '🔧';
      case 'info': return '📢';
      default: return '📝';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'update': return 'bg-blue-500';
      case 'feature': return 'bg-green-500';
      case 'improvement': return 'bg-yellow-500';
      case 'info': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-slate-800 to-slate-900 border-t border-slate-700">
      {/* 공지사항 헤더 */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-blue-400" />
          <span className="text-white font-semibold">
            {currentLanguage === 'ko' ? '📢 공지사항' : '📢 Announcements'}
          </span>
          {announcements.some(a => a.isNew) && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              NEW
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </div>

      {/* 공지사항 내용 */}
      {isOpen && (
        <div className="border-t border-slate-700">
          <div className="max-h-64 overflow-y-auto">
            {announcements.map((announcement) => (
              <div 
                key={announcement.id}
                className="p-4 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer"
                onClick={() => setSelectedNotice(announcement)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full ${getTypeColor(announcement.type)} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {getTypeIcon(announcement.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-medium text-sm truncate">
                        {announcement.title[currentLanguage]}
                      </h4>
                      {announcement.isNew && (
                        <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 text-xs line-clamp-2">
                      {announcement.content[currentLanguage]}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span className="text-slate-500 text-xs">{announcement.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 공지사항 상세 모달 */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${getTypeColor(selectedNotice.type)} flex items-center justify-center text-white text-sm font-bold`}>
                  {getTypeIcon(selectedNotice.type)}
                </div>
                <h3 className="text-white font-bold">
                  {selectedNotice.title[currentLanguage]}
                </h3>
                {selectedNotice.isNew && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    NEW
                  </span>
                )}
              </div>
              <button 
                onClick={() => setSelectedNotice(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-400 text-sm">{selectedNotice.date}</span>
              </div>
              
              <div className="text-slate-200 text-sm leading-relaxed">
                {selectedNotice.content[currentLanguage]}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcement;