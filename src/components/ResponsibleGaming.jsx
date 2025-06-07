import React from 'react';
import { Heart, AlertTriangle, Shield, Clock, BookOpen, Users, Phone, HelpCircle, CheckCircle, XCircle, Brain, Lightbulb } from 'lucide-react';

const ResponsibleGaming = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">책임감 있는 학습</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            홀덤마스터 프로는 건전하고 책임감 있는 교육 환경을 조성하기 위해 노력합니다. 
            포커 학습을 통해 얻는 지식이 올바른 방향으로 활용되기를 바랍니다.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            🚨 중요한 안내
          </h2>
          <div className="text-red-700 space-y-2">
            <p><strong>• 교육 목적 한정:</strong> 본 서비스에서 학습한 내용을 실제 도박에 사용하지 마세요.</p>
            <p><strong>• 도박 중독 위험:</strong> 실제 돈을 건 도박은 중독성이 있으며 심각한 문제를 일으킬 수 있습니다.</p>
            <p><strong>• 법적 주의사항:</strong> 많은 국가에서 온라인 도박이 불법입니다.</p>
            <p><strong>• 경제적 손실:</strong> 도박으로 인한 경제적 손실은 돌이킬 수 없습니다.</p>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* 1. 교육 vs 도박 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
              1. 교육적 학습 vs 실제 도박
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  ✅ 건전한 교육적 학습
                </h3>
                <ul className="text-green-700 space-y-2">
                  <li>• <strong>수학적 이해:</strong> 확률과 통계 학습</li>
                  <li>• <strong>논리적 사고:</strong> 의사결정 능력 향상</li>
                  <li>• <strong>전략적 분석:</strong> 게임 이론 이해</li>
                  <li>• <strong>심리학 연구:</strong> 인간 행동 패턴 학습</li>
                  <li>• <strong>가상 환경:</strong> 안전한 학습 공간</li>
                  <li>• <strong>무료 학습:</strong> 금전적 위험 없음</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  ❌ 위험한 실제 도박
                </h3>
                <ul className="text-red-700 space-y-2">
                  <li>• <strong>금전적 손실:</strong> 실제 돈의 상실</li>
                  <li>• <strong>중독 위험:</strong> 도박 중독 가능성</li>
                  <li>• <strong>법적 문제:</strong> 불법 도박의 위험</li>
                  <li>• <strong>관계 파괴:</strong> 가족과 사회 관계 악화</li>
                  <li>• <strong>정신 건강:</strong> 스트레스와 우울증</li>
                  <li>• <strong>경제적 파탄:</strong> 생계 위협</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800 text-center">
                <strong>💡 기억하세요:</strong> 홀덤마스터 프로는 순수한 교육 도구입니다. 
                실제 도박과는 완전히 다른 목적으로 설계되었습니다.
              </p>
            </div>
          </section>

          {/* 2. 건전한 학습 습관 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Brain className="w-6 h-6 mr-3 text-purple-600" />
              2. 건전한 학습 습관
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">2.1 학습 시간 관리</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <Clock className="w-8 h-8 text-green-600 mb-2" />
                    <h4 className="font-semibold text-green-800 mb-2">적절한 학습 시간</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• 일일 1-2시간 권장</li>
                      <li>• 주당 5-10시간 이내</li>
                      <li>• 규칙적인 휴식</li>
                      <li>• 다른 활동과 균형</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <AlertTriangle className="w-8 h-8 text-yellow-600 mb-2" />
                    <h4 className="font-semibold text-yellow-800 mb-2">주의 신호</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• 3시간 이상 연속 플레이</li>
                      <li>• 다른 활동 소홀</li>
                      <li>• 학습보다 게임에 집중</li>
                      <li>• 실제 도박 욕구 증가</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4">
                    <XCircle className="w-8 h-8 text-red-600 mb-2" />
                    <h4 className="font-semibold text-red-800 mb-2">즉시 중단 신호</h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• 하루 4시간 이상</li>
                      <li>• 실제 도박 충동</li>
                      <li>• 일상생활 지장</li>
                      <li>• 강박적 사용</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">2.2 학습 목표 설정</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-3">📚 건전한 학습 목표</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• 확률 계산 능력 향상</li>
                      <li>• 논리적 사고력 개발</li>
                      <li>• 게임 이론 이해</li>
                      <li>• 의사결정 기술 향상</li>
                    </ul>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• 수학적 분석 능력</li>
                      <li>• 패턴 인식 기술</li>
                      <li>• 위험 관리 개념</li>
                      <li>• 심리학적 통찰</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. 도박 중독 예방 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-green-600" />
              3. 도박 중독 예방
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">3.1 위험 신호 인식</h3>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-red-800 mb-3">
                    다음과 같은 증상이 나타나면 즉시 전문가의 도움을 받으세요:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-red-800 mb-2">🧠 심리적 증상</h4>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>• 실제 도박에 대한 강한 욕구</li>
                        <li>• 포커 외에 다른 것에 관심 없음</li>
                        <li>• 돈을 걸고 싶은 충동</li>
                        <li>• 베팅 규모를 키우고 싶은 욕구</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-800 mb-2">🏃 행동적 증상</h4>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>• 실제 도박 사이트 검색</li>
                        <li>• 도박 관련 정보 탐색</li>
                        <li>• 가족/친구에게 거짓말</li>
                        <li>• 도박 자금 마련 시도</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">3.2 예방 전략</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">✅ 실천 방법</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• 학습 시간 엄격히 제한</li>
                      <li>• 다양한 취미 활동 유지</li>
                      <li>• 정기적인 자기 점검</li>
                      <li>• 가족/친구와 소통</li>
                      <li>• 전문가 상담 고려</li>
                    </ul>
                  </div>
                  
                  <div className="border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🛡️ 보호 장치</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• 도박 사이트 차단 프로그램</li>
                      <li>• 금융 계좌 접근 제한</li>
                      <li>• 신뢰할 수 있는 사람과 약속</li>
                      <li>• 정기적인 상담 예약</li>
                      <li>• 위기 상황 대응 계획</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. 도움 받을 수 있는 곳 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <HelpCircle className="w-6 h-6 mr-3 text-blue-600" />
              4. 도움 받을 수 있는 곳
            </h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">🆘 긴급 상담 및 지원</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">📞 전화 상담</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• <strong>한국도박문제관리센터:</strong> 1336</li>
                      <li>• <strong>생명의전화:</strong> 1588-9191</li>
                      <li>• <strong>청소년전화:</strong> 1388</li>
                      <li>• 24시간 상담 가능</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-800 mb-2">🌐 온라인 지원</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• 한국도박문제관리센터 홈페이지</li>
                      <li>• 온라인 자가진단 도구</li>
                      <li>• 이메일 상담 서비스</li>
                      <li>• 온라인 회복 프로그램</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">4.2 전문 치료 기관</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">🏥 의료 기관</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• 정신건강의학과</li>
                      <li>• 중독 전문 병원</li>
                      <li>• 정신건강복지센터</li>
                      <li>• 대학병원 중독센터</li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">👥 자조 모임</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• 도박중독자 익명모임(GA)</li>
                      <li>• 가족 지원 그룹</li>
                      <li>• 온라인 커뮤니티</li>
                      <li>• 회복 워크샵</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. 자가 진단 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Lightbulb className="w-6 h-6 mr-3 text-yellow-600" />
              5. 자가 진단 체크리스트
            </h2>
            
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                📝 다음 질문에 솔직하게 답해보세요
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-3" />
                  <label className="text-yellow-700 text-sm">실제 돈을 걸고 포커를 하고 싶다는 생각이 자주 든다</label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-3" />
                  <label className="text-yellow-700 text-sm">온라인 도박 사이트를 검색해본 적이 있다</label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-3" />
                  <label className="text-yellow-700 text-sm">하루에 3시간 이상 포커 관련 활동을 한다</label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-3" />
                  <label className="text-yellow-700 text-sm">포커 외에 다른 활동에 흥미를 잃었다</label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-3" />
                  <label className="text-yellow-700 text-sm">가족이나 친구들이 내 포커 활동을 걱정한다</label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" className="mt-1 mr-3" />
                  <label className="text-yellow-700 text-sm">포커를 그만두려고 해도 계속 하게 된다</label>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-100 rounded-lg">
                <p className="text-red-800 text-sm">
                  <strong>⚠️ 중요:</strong> 위 항목 중 2개 이상에 해당한다면 전문가와 상담하시기 바랍니다.
                  도박 중독은 조기 발견과 치료가 매우 중요합니다.
                </p>
              </div>
            </div>
          </section>

          {/* 6. 우리의 약속 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Heart className="w-6 h-6 mr-3 text-red-500" />
              6. 홀덤마스터 프로의 약속
            </h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">🤝 우리의 책임</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-green-700 space-y-2">
                    <li>• 순수한 교육 목적으로만 서비스 운영</li>
                    <li>• 실제 도박으로 이어질 수 있는 요소 배제</li>
                    <li>• 건전한 학습 환경 조성</li>
                    <li>• 위험 신호 감지 시 안내 제공</li>
                  </ul>
                  <ul className="text-green-700 space-y-2">
                    <li>• 정기적인 책임감 있는 학습 안내</li>
                    <li>• 전문 기관과의 연계 지원</li>
                    <li>• 사용자 보호를 위한 지속적 개선</li>
                    <li>• 투명한 서비스 운영</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 text-center">
                  <strong>💙 함께 만들어가는 건전한 학습 문화</strong><br />
                  사용자 여러분과 함께 안전하고 건전한 포커 교육 환경을 만들어가겠습니다.
                </p>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-600 mb-4">
              도움이 필요하시면 언제든지 전문 상담기관에 연락하세요. 혼자 해결하려 하지 마시고 도움을 요청하는 것이 용기입니다.
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
              <span>🆘 한국도박문제관리센터: 1336</span>
              <span>•</span>
              <span>💚 24시간 상담 가능</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ResponsibleGaming;