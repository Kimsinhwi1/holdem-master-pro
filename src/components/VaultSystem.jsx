import React, { useState, useEffect } from 'react';
import { 
  X, Safe, Wallet, Coins, Gift, Tv, Users, Star, Clock, 
  ArrowDown, ArrowUp, CreditCard, Trophy, Zap, Target,
  CheckCircle, AlertCircle, Calendar, Share2
} from 'lucide-react';

// 🎯 무료 칩 소스 정의 (실제 돈 결제 없음!)
const FREE_CHIP_SOURCES = {
  daily: { 
    amount: 1000, 
    cooldown: 24 * 60 * 60 * 1000, // 24시간
    name: '일일 보너스',
    icon: Calendar,
    color: 'bg-blue-500',
    description: '매일 한 번 무료 칩을 받으세요!'
  },
  ad: { 
    amount: 2000, 
    cooldown: 30 * 60 * 1000, // 30분
    name: '광고 시청',
    icon: Tv,
    color: 'bg-green-500',
    description: '30초 광고를 보고 칩을 받으세요!'
  },
  share: { 
    amount: 3000, 
    cooldown: 12 * 60 * 60 * 1000, // 12시간
    name: '소셜 공유',
    icon: Share2,
    color: 'bg-purple-500',
    description: '게임을 공유하고 칩을 받으세요!'
  },
  streak: { 
    amount: 1500, 
    cooldown: 0, // 즉시
    name: '연속 정답',
    icon: Zap,
    color: 'bg-yellow-500',
    description: '퍼즐 게임에서 연속 정답시 자동 지급!'
  },
  level: { 
    amount: 5000, 
    cooldown: 0, // 즉시
    name: '레벨 업',
    icon: Trophy,
    color: 'bg-orange-500',
    description: '레벨업시 자동으로 칩이 지급됩니다!'
  }
};

// 🎯 무료 금고 시스템 컴포넌트
const VaultSystem = ({ isOpen, onClose, playerStats, setPlayerStats }) => {
  const [activeTab, setActiveTab] = useState('free');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [notification, setNotification] = useState(null);

  // 금고 잔액 (localStorage 저장)
  const [vaultBalance, setVaultBalance] = useState(() => {
    try {
      const saved = localStorage.getItem('holdemMasterVault');
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });

  // 마지막 클레임 시간 추적
  const [lastClaimed, setLastClaimed] = useState(() => {
    try {
      const saved = localStorage.getItem('holdemMasterLastClaimed');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 사용자 레벨 계산
  const getUserLevel = () => {
    const totalEarnings = Math.max(0, playerStats.totalEarnings || 0);
    return Math.floor(totalEarnings / 10000) + 1;
  };

  // localStorage 저장
  useEffect(() => {
    localStorage.setItem('holdemMasterVault', JSON.stringify(vaultBalance));
  }, [vaultBalance]);

  useEffect(() => {
    localStorage.setItem('holdemMasterLastClaimed', JSON.stringify(lastClaimed));
  }, [lastClaimed]);

  // 알림 표시
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // 클레임 가능 여부 확인
  const canClaim = (sourceKey) => {
    const source = FREE_CHIP_SOURCES[sourceKey];
    const lastTime = lastClaimed[sourceKey] || 0;
    const now = Date.now();
    return now - lastTime >= source.cooldown;
  };

  // 남은 시간 계산
  const getRemainingTime = (sourceKey) => {
    const source = FREE_CHIP_SOURCES[sourceKey];
    const lastTime = lastClaimed[sourceKey] || 0;
    const remaining = Math.max(0, source.cooldown - (Date.now() - lastTime));
    
    if (remaining === 0) return null;
    
    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    
    if (hours > 0) return `${hours}시간 ${minutes}분`;
    return `${minutes}분`;
  };

  // 무료 칩 클레임
  const claimFreeChips = async (sourceKey) => {
    if (!canClaim(sourceKey)) return;
    
    const source = FREE_CHIP_SOURCES[sourceKey];
    
    // 광고 시청 시뮬레이션
    if (sourceKey === 'ad') {
      showNotification('광고를 시청 중입니다...', 'info');
      
      // 실제로는 AdMob, Unity Ads 등과 연동
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    // 소셜 공유 시뮬레이션
    if (sourceKey === 'share') {
      try {
        if (navigator.share) {
          await navigator.share({
            title: '홀덤마스터 프로',
            text: '최고의 포커 학습 게임! 함께 플레이해요!',
            url: window.location.href
          });
        } else {
          // 폴백: 클립보드 복사
          await navigator.clipboard.writeText(window.location.href);
          showNotification('링크가 클립보드에 복사되었습니다!', 'info');
        }
      } catch (error) {
        showNotification('공유 링크가 클립보드에 복사되었습니다!', 'info');
      }
    }
    
    // 칩 지급
    setVaultBalance(prev => prev + source.amount);
    setLastClaimed(prev => ({ ...prev, [sourceKey]: Date.now() }));
    
    showNotification(
      `🎉 ${source.name}으로 ${source.amount.toLocaleString()}개 칩을 받았습니다!`,
      'success'
    );
  };

  // 인출 처리
  const handleWithdraw = () => {
    const amount = parseInt(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      showNotification('올바른 금액을 입력하세요.', 'error');
      return;
    }
    
    if (amount > vaultBalance) {
      showNotification('금고 잔액이 부족합니다.', 'error');
      return;
    }
    
    setVaultBalance(prev => prev - amount);
    setPlayerStats(prev => ({ 
      ...prev, 
      totalChips: prev.totalChips + amount 
    }));
    setWithdrawAmount('');
    
    showNotification(`💰 ${amount.toLocaleString()}개 칩을 인출했습니다!`, 'success');
  };

  // 예금 처리
  const handleDeposit = () => {
    const amount = parseInt(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      showNotification('올바른 금액을 입력하세요.', 'error');
      return;
    }
    
    if (amount > playerStats.totalChips) {
      showNotification('보유 칩이 부족합니다.', 'error');
      return;
    }
    
    setVaultBalance(prev => prev + amount);
    setPlayerStats(prev => ({ 
      ...prev, 
      totalChips: prev.totalChips - amount 
    }));
    setDepositAmount('');
    
    showNotification(`🏦 ${amount.toLocaleString()}개 칩을 예금했습니다!`, 'success');
  };

  // 빠른 금액 설정
  const setQuickAmount = (amount, type) => {
    const maxAmount = type === 'withdraw' ? vaultBalance : playerStats.totalChips;
    const actualAmount = amount === 'all' ? maxAmount : Math.min(amount, maxAmount);
    
    if (type === 'withdraw') {
      setWithdrawAmount(actualAmount.toString());
    } else {
      setDepositAmount(actualAmount.toString());
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-600">
        
        {/* 알림 */}
        {notification && (
          <div className={`fixed top-4 right-4 z-60 p-4 rounded-lg shadow-lg text-white font-medium ${
            notification.type === 'success' ? 'bg-green-600' : 
            notification.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
          }`}>
            <div className="flex items-center gap-2">
              {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
              {notification.type === 'error' && <AlertCircle className="w-5 h-5" />}
              {notification.type === 'info' && <Clock className="w-5 h-5" />}
              {notification.message}
            </div>
          </div>
        )}
        
        {/* 헤더 */}
        <div className="sticky top-0 bg-slate-800/95 backdrop-blur-sm border-b border-slate-600 px-8 py-6 flex justify-between items-center">
          <h2 className="text-4xl font-bold text-white flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Safe className="w-7 h-7 text-white" />
            </div>
            무료 칩 금고
          </h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700 rounded-lg"
          >
            <X className="w-8 h-8" />
          </button>
        </div>
        
        {/* 잔액 대시보드 */}
        <div className="px-8 py-6 bg-gradient-to-r from-slate-700/50 to-slate-800/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 게임 칩 */}
            <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur-sm border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">게임 칩</h3>
              <div className="text-3xl font-bold text-blue-400 mb-1">
                {playerStats.totalChips.toLocaleString()}
              </div>
              <div className="text-sm text-slate-300">현재 보유중</div>
            </div>
            
            {/* 금고 잔액 */}
            <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur-sm border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">금고 잔액</h3>
              <div className="text-3xl font-bold text-green-400 mb-1">
                {vaultBalance.toLocaleString()}
              </div>
              <div className="text-sm text-slate-300">안전하게 보관중</div>
            </div>
            
            {/* 사용자 레벨 */}
            <div className="bg-white/10 rounded-xl p-6 text-center backdrop-blur-sm border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">플레이어 레벨</h3>
              <div className="text-3xl font-bold text-purple-400 mb-1">
                {getUserLevel()}
              </div>
              <div className="text-sm text-slate-300">경험치 기반</div>
            </div>
            
          </div>
        </div>
        
        {/* 탭 네비게이션 */}
        <div className="px-8 py-4 border-b border-slate-600">
          <div className="flex gap-4">
            {[
              { id: 'free', label: '💰 무료 칩', icon: Gift },
              { id: 'transfer', label: '🏦 입출금', icon: CreditCard }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="px-8 py-6">
          
          {/* 무료 칩 탭 */}
          {activeTab === 'free' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">💎 무료 칩 받기</h3>
                <p className="text-slate-300">다양한 방법으로 무료 칩을 획득하세요! (실제 돈 결제 없음)</p>
              </div>
              
              <div className="grid gap-6">
                {Object.entries(FREE_CHIP_SOURCES).map(([key, source]) => {
                  const IconComponent = source.icon;
                  const canClaimNow = canClaim(key);
                  const remainingTime = getRemainingTime(key);
                  
                  return (
                    <div key={key} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 ${source.color} rounded-xl flex items-center justify-center`}>
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-white mb-1">{source.name}</h4>
                            <p className="text-slate-300 mb-2">{source.description}</p>
                            <div className="flex items-center gap-4">
                              <span className="text-yellow-400 font-bold">
                                +{source.amount.toLocaleString()} 칩
                              </span>
                              {!canClaimNow && remainingTime && (
                                <span className="text-orange-400 text-sm flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {remainingTime} 후
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => claimFreeChips(key)}
                          disabled={!canClaimNow}
                          className={`px-8 py-3 rounded-xl font-bold transition-all ${
                            canClaimNow
                              ? `${source.color} hover:opacity-90 text-white shadow-lg transform hover:scale-105`
                              : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {canClaimNow ? '받기' : '대기중'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* 추가 보너스 정보 */}
              <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-6 border border-purple-500/30">
                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  보너스 팁
                </h4>
                <ul className="text-slate-300 space-y-2">
                  <li>• 퍼즐 게임에서 5연속 정답시 추가 보너스!</li>
                  <li>• 레벨업할 때마다 자동으로 칩이 지급됩니다</li>
                  <li>• 매일 접속하여 일일 보너스를 놓치지 마세요</li>
                  <li>• 친구들과 공유하여 더 많은 칩을 받으세요</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* 입출금 탭 */}
          {activeTab === 'transfer' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">🏦 칩 입출금</h3>
                <p className="text-slate-300">게임 칩과 금고 간 자유로운 이동</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* 인출 (금고 → 게임) */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <ArrowDown className="w-5 h-5 text-white" />
                    </div>
                    금고에서 인출
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-slate-300 text-sm block mb-2">인출 금액</label>
                      <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="인출할 칩 수량"
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-green-400 focus:outline-none"
                        max={vaultBalance}
                      />
                      <div className="text-sm text-slate-400 mt-1">
                        최대 인출: {vaultBalance.toLocaleString()}개
                      </div>
                    </div>
                    
                    {/* 빠른 선택 버튼 */}
                    <div className="grid grid-cols-4 gap-2">
                      {[1000, 5000, 10000, 'all'].map(amount => (
                        <button
                          key={amount}
                          onClick={() => setQuickAmount(amount, 'withdraw')}
                          className="bg-slate-600 hover:bg-slate-500 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                        >
                          {amount === 'all' ? '전체' : `${amount.toLocaleString()}`}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={handleWithdraw}
                      disabled={!withdrawAmount || parseInt(withdrawAmount) > vaultBalance || parseInt(withdrawAmount) <= 0}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold transition-colors"
                    >
                      💰 인출하기
                    </button>
                  </div>
                </div>
                
                {/* 예금 (게임 → 금고) */}
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <ArrowUp className="w-5 h-5 text-white" />
                    </div>
                    금고에 예금
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-slate-300 text-sm block mb-2">예금 금액</label>
                      <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="예금할 칩 수량"
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-400 focus:outline-none"
                        max={playerStats.totalChips}
                      />
                      <div className="text-sm text-slate-400 mt-1">
                        최대 예금: {playerStats.totalChips.toLocaleString()}개
                      </div>
                    </div>
                    
                    {/* 빠른 선택 버튼 */}
                    <div className="grid grid-cols-4 gap-2">
                      {[1000, 5000, 10000, 'all'].map(amount => (
                        <button
                          key={amount}
                          onClick={() => setQuickAmount(amount, 'deposit')}
                          className="bg-slate-600 hover:bg-slate-500 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                        >
                          {amount === 'all' ? '전체' : `${amount.toLocaleString()}`}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={handleDeposit}
                      disabled={!depositAmount || parseInt(depositAmount) > playerStats.totalChips || parseInt(depositAmount) <= 0}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold transition-colors"
                    >
                      🏦 예금하기
                    </button>
                  </div>
                </div>
                
              </div>
              
              {/* 입출금 안내 */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600">
                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Safe className="w-5 h-5 text-blue-400" />
                  금고 시스템 안내
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-slate-300 text-sm">
                  <div>
                    <h5 className="font-semibold text-white mb-2">💡 금고의 장점</h5>
                    <ul className="space-y-1">
                      <li>• 칩을 안전하게 보관</li>
                      <li>• 게임에서 잃을 위험 없음</li>
                      <li>• 언제든 자유로운 입출금</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">🎯 사용 팁</h5>
                    <ul className="space-y-1">
                      <li>• 큰 금액은 금고에 보관</li>
                      <li>• 게임용으로만 필요한 만큼 인출</li>
                      <li>• 무료 칩을 꾸준히 모아보세요</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default VaultSystem;