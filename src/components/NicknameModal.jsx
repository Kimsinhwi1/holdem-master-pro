import React from 'react';
import { User } from 'lucide-react';

const NicknameModal = ({ 
  showNicknameModal, 
  tempNickname, 
  setTempNickname, 
  saveNickname 
}) => {
  if (!showNicknameModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md mx-4 shadow-2xl">
        <div className="text-center">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-blue-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2">프로 포커 마스터에 오신 것을 환영합니다!</h2>
          <p className="text-gray-600 mb-6">게임을 시작하기 전에 닉네임을 설정해주세요.</p>
          
          <input
            type="text"
            value={tempNickname}
            onChange={(e) => setTempNickname(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && saveNickname()}
            placeholder="닉네임 입력 (2글자 이상)"
            className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 mb-4 text-center text-lg font-semibold focus:border-blue-500 focus:outline-none"
            maxLength={12}
            autoFocus
          />
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                setTempNickname('포커마스터' + Math.floor(Math.random() * 1000));
              }}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
              랜덤 생성
            </button>
            <button
              onClick={saveNickname}
              disabled={tempNickname.trim().length < 2}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              시작하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NicknameModal;