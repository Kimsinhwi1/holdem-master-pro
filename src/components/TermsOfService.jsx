import React from 'react';
import { FileText, Scale, AlertTriangle, CheckCircle, Shield, Users, BookOpen, Gamepad2, Globe, Mail } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Scale className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">서비스 이용약관</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            홀덤마스터 프로 교육용 포커 학습 플랫폼의 이용약관입니다. 
            본 서비스는 순수 교육 목적으로 운영되며, 실제 도박과는 전혀 관련이 없습니다.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            최종 업데이트: 2024년 1월 1일 | 시행일: 2024년 1월 1일
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-amber-800 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            ⚠️ 중요한 안내사항
          </h2>
          <div className="text-amber-700 space-y-2">
            <p><strong>• 교육 목적 전용:</strong> 본 서비스는 포커 이론과 전략을 학습하기 위한 교육용 플랫폼입니다.</p>
            <p><strong>• 실제 도박 금지:</strong> 실제 돈을 사용하지 않으며, 현금 지급이나 도박을 유도하지 않습니다.</p>
            <p><strong>• 가상 화폐:</strong> 모든 칩과 화폐는 가상이며 실제 가치가 없습니다.</p>
            <p><strong>• 연령 제한:</strong> 만 18세 이상만 이용 가능하며, 책임감 있는 학습을 권장합니다.</p>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* 1. 서비스 소개 및 목적 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-blue-600" />
              1. 서비스 소개 및 목적
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">1.1 서비스 개요</h3>
                <p className="text-gray-600 mb-4">
                  홀덤마스터 프로는 텍사스 홀덤 포커의 이론, 전략, 확률 계산을 학습할 수 있는 
                  교육용 웹 애플리케이션입니다. AI 기반 피드백 시스템을 통해 체계적인 포커 교육을 제공합니다.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">🎓 교육 목표</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• 포커 이론 및 전략 학습</li>
                      <li>• 확률 계산 능력 향상</li>
                      <li>• 논리적 사고력 개발</li>
                      <li>• 의사결정 능력 강화</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">🛠️ 주요 기능</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• AI 기반 개인맞춤 학습</li>
                      <li>• 실시간 확률 분석</li>
                      <li>• 다양한 학습 모드</li>
                      <li>• 포괄적인 포커 용어사전</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1.2 교육적 목적</h3>
                <p className="text-gray-600">
                  본 서비스는 순수하게 교육 목적으로 개발되었으며, 포커 게임의 수학적 원리와 
                  전략적 사고를 학습하는 것이 주목적입니다. 실제 도박이나 금전적 이익과는 
                  전혀 관련이 없음을 명시합니다.
                </p>
              </div>
            </div>
          </section>

          {/* 2. 이용자격 및 가입 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-green-600" />
              2. 이용자격 및 가입
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">2.1 이용자격</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>연령:</strong> 만 18세 이상</li>
                    <li>• <strong>목적:</strong> 순수한 교육 및 학습 목적</li>
                    <li>• <strong>동의:</strong> 본 약관에 동의하는 자</li>
                    <li>• <strong>법적 능력:</strong> 법적으로 계약을 체결할 수 있는 능력을 갖춘 자</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">2.2 가입 절차</h3>
                <p className="text-gray-600 mb-3">
                  홀덤마스터 프로는 간편한 가입 절차를 제공합니다:
                </p>
                <ol className="text-gray-600 space-y-1">
                  <li>1. 서비스 접속 및 약관 동의</li>
                  <li>2. 닉네임 설정 (실명 불필요)</li>
                  <li>3. 언어 및 학습 수준 선택</li>
                  <li>4. 서비스 이용 시작</li>
                </ol>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  이용 제한 대상
                </h3>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• 만 18세 미만의 미성년자</li>
                  <li>• 도박 목적으로 이용하려는 자</li>
                  <li>• 과거 서비스 이용 제재를 받은 자</li>
                  <li>• 허위 정보를 제공하는 자</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. 서비스 이용 규칙 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Gamepad2 className="w-6 h-6 mr-3 text-purple-600" />
              3. 서비스 이용 규칙
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">3.1 허용되는 이용</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">✅ 권장 활동</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• 포커 이론 학습</li>
                      <li>• 전략 연습 및 분석</li>
                      <li>• AI와의 교육적 대전</li>
                      <li>• 확률 계산 연습</li>
                      <li>• 용어사전 활용</li>
                      <li>• 학습 진도 추적</li>
                    </ul>
                  </div>
                  
                  <div className="border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">❌ 금지 활동</h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• 실제 금전 거래</li>
                      <li>• 도박 목적 이용</li>
                      <li>• 부정한 방법으로 시스템 조작</li>
                      <li>• 다른 사용자 방해</li>
                      <li>• 허위 정보 유포</li>
                      <li>• 상업적 목적 이용</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">3.2 가상 화폐 시스템</h3>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-yellow-800 mb-3">
                    <strong>🪙 중요한 안내:</strong> 게임 내 모든 칩과 화폐는 가상이며 다음과 같은 특징을 가집니다:
                  </p>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• 실제 가치 없음: 현금으로 환전 불가</li>
                    <li>• 교육 목적: 베팅 구조 학습용</li>
                    <li>• 무료 제공: 언제든 무료로 충전 가능</li>
                    <li>• 학습 도구: 자금 관리 연습용</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 4. 지적재산권 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-indigo-600" />
              4. 지적재산권
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">4.1 회사의 지적재산권</h3>
                <p className="text-gray-600 mb-4">
                  홀덤마스터 프로의 모든 콘텐츠, 기능, 디자인, 소스코드는 회사의 지적재산권으로 보호받습니다:
                </p>
                <ul className="text-gray-600 space-y-1">
                  <li>• AI 알고리즘 및 학습 시스템</li>
                  <li>• 사용자 인터페이스 디자인</li>
                  <li>• 교육 콘텐츠 및 이론 자료</li>
                  <li>• 포커 용어사전 및 가이드</li>
                  <li>• 브랜드명, 로고, 트레이드마크</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">4.2 이용자의 사용 권한</h3>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <p className="text-gray-600 mb-2">
                    이용자는 다음과 같은 제한된 범위에서 서비스를 이용할 수 있습니다:
                  </p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 개인적, 비상업적 교육 목적으로만 사용</li>
                    <li>• 내용을 복사, 수정, 배포하거나 역공학할 수 없음</li>
                    <li>• 서비스의 일부나 전체를 다른 곳에 재사용할 수 없음</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 5. 서비스 제공 및 변경 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Globe className="w-6 h-6 mr-3 text-cyan-600" />
              5. 서비스 제공 및 변경
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">5.1 서비스 제공</h3>
                <p className="text-gray-600 mb-4">
                  회사는 다음과 같은 방식으로 서비스를 제공합니다:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">🌐 제공 방식</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 웹 기반 온라인 서비스</li>
                      <li>• 24시간 365일 이용 가능</li>
                      <li>• 다양한 기기 지원</li>
                      <li>• 실시간 학습 피드백</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">🔧 서비스 범위</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• 포커 교육 콘텐츠</li>
                      <li>• AI 기반 학습 시스템</li>
                      <li>• 진도 추적 및 분석</li>
                      <li>• 커뮤니티 기능</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">5.2 서비스 변경 및 중단</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800 mb-3">
                    회사는 서비스 개선을 위해 다음과 같은 경우 서비스를 변경하거나 중단할 수 있습니다:
                  </p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• 기술적 개선 및 업데이트</li>
                    <li>• 새로운 기능 추가</li>
                    <li>• 시스템 점검 및 유지보수</li>
                    <li>• 법적 요구사항 준수</li>
                  </ul>
                  <p className="text-blue-700 text-sm mt-3">
                    중요한 변경사항은 사전에 공지하며, 이용자에게 불편을 최소화하도록 노력합니다.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. 이용제한 및 계정 관리 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">6. 이용제한 및 계정 관리</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">6.1 이용제한 사유</h3>
                <div className="border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 mb-3">다음과 같은 경우 서비스 이용이 제한될 수 있습니다:</p>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• 약관 위반 시</li>
                    <li>• 도박 목적으로 서비스 악용 시</li>
                    <li>• 다른 이용자에게 피해를 주는 행위</li>
                    <li>• 시스템 무단 조작 시도</li>
                    <li>• 허위 정보 제공 또는 사기 행위</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">6.2 계정 탈퇴</h3>
                <p className="text-gray-600 mb-3">
                  이용자는 언제든지 서비스 탈퇴를 요청할 수 있으며, 탈퇴 시 다음 사항이 적용됩니다:
                </p>
                <ul className="text-gray-600 space-y-1">
                  <li>• 모든 학습 데이터 삭제</li>
                  <li>• 가상 칩 및 진도 정보 삭제</li>
                  <li>• 개인정보 처리 정지</li>
                  <li>• 재가입 시 새로운 계정으로 시작</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 7. 면책조항 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. 면책조항</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">7.1 서비스 이용 책임</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• 이용자는 자신의 행위에 대해 책임을 집니다</li>
                  <li>• 교육 목적 외 사용으로 인한 문제는 회사가 책임지지 않습니다</li>
                  <li>• 타인의 권리 침해나 법 위반은 이용자 책임입니다</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  도박 관련 면책
                </h3>
                <p className="text-red-700 text-sm">
                  본 서비스는 교육 목적으로만 제공되며, 실제 도박이나 금전적 손실에 대해서는 
                  어떠한 책임도 지지 않습니다. 이용자가 본 서비스에서 학습한 내용을 
                  실제 도박에 사용하여 발생하는 모든 결과는 이용자 본인의 책임입니다.
                </p>
              </div>
            </div>
          </section>

          {/* 8. 분쟁해결 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Scale className="w-6 h-6 mr-3 text-purple-600" />
              8. 분쟁해결
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">8.1 준거법 및 관할법원</h3>
                <p className="text-gray-600 mb-4">
                  본 약관의 해석 및 적용, 서비스 이용과 관련된 분쟁은 대한민국 법률에 따르며, 
                  관할법원은 회사 소재지 법원으로 합니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">8.2 분쟁 조정</h3>
                <p className="text-gray-600">
                  분쟁 발생 시 상호 협의를 통한 원만한 해결을 우선으로 하며, 
                  필요시 관련 조정기관을 통한 조정을 진행할 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* 9. 연락처 및 문의 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Mail className="w-6 h-6 mr-3 text-blue-600" />
              9. 연락처 및 문의
            </h2>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">📧 고객센터</h3>
                  <p className="text-blue-700 text-sm">
                    이메일: support@holdemmaster.com<br />
                    응답시간: 평일 24시간 이내
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">🏢 운영정보</h3>
                  <p className="text-blue-700 text-sm">
                    서비스명: 홀덤마스터 프로<br />
                    분류: 교육용 포커 학습 플랫폼
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-600 mb-4">
              본 약관에 동의하시면 홀덤마스터 프로의 교육용 포커 학습 서비스를 이용하실 수 있습니다.
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
              <span>📚 교육 전용 서비스</span>
              <span>•</span>
              <span>🚫 도박 금지</span>
              <span>•</span>
              <span>🛡️ 안전한 학습 환경</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TermsOfService;