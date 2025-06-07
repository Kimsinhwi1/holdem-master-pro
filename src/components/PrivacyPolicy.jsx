import React from 'react';
import { Shield, Eye, Database, Cookie, Mail, AlertTriangle, CheckCircle, Lock, Globe, Users } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">개인정보 보호정책</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            홀덤마스터 프로는 사용자의 개인정보 보호를 매우 중요하게 생각합니다. 
            본 정책은 교육용 포커 학습 플랫폼에서 개인정보가 어떻게 수집, 사용, 보호되는지 설명합니다.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            최종 업데이트: 2024년 1월 1일
          </div>
        </div>

        {/* Quick Overview */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            🛡️ 개인정보 보호 요약
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-green-700">
            <div>
              <strong>✅ 우리가 하는 것:</strong>
              <ul className="text-sm mt-1 space-y-1">
                <li>• 교육 목적으로만 데이터 사용</li>
                <li>• 최소한의 정보만 수집</li>
                <li>• 강력한 보안 시스템 운영</li>
                <li>• 투명한 정보 제공</li>
              </ul>
            </div>
            <div>
              <strong>❌ 우리가 하지 않는 것:</strong>
              <ul className="text-sm mt-1 space-y-1">
                <li>• 개인정보 판매나 공유</li>
                <li>• 불필요한 정보 수집</li>
                <li>• 스팸 메일 발송</li>
                <li>• 제3자에게 무단 제공</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* 1. 수집하는 정보 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Database className="w-6 h-6 mr-3 text-blue-600" />
              1. 수집하는 개인정보
            </h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1.1 필수 정보</h3>
                <p className="text-gray-600 mb-3">
                  홀덤마스터 프로는 교육 서비스 제공을 위해 최소한의 정보만을 수집합니다:
                </p>
                <ul className="text-gray-600 space-y-1">
                  <li>• <strong>닉네임:</strong> 게임 내 식별용 (실명 불필요)</li>
                  <li>• <strong>학습 진도:</strong> 개인맞춤 교육 제공용</li>
                  <li>• <strong>게임 통계:</strong> 실력 향상 분석용</li>
                  <li>• <strong>언어 설정:</strong> 최적화된 사용자 경험 제공</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1.2 자동 수집 정보</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• <strong>접속 로그:</strong> 서비스 안정성 확보</li>
                  <li>• <strong>기기 정보:</strong> 호환성 최적화</li>
                  <li>• <strong>브라우저 정보:</strong> 기술 지원용</li>
                  <li>• <strong>쿠키:</strong> 사용자 설정 저장</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>💡 중요:</strong> 실제 이메일, 전화번호, 주소 등의 개인 식별 정보는 
                  수집하지 않습니다. 모든 데이터는 교육 목적으로만 사용됩니다.
                </p>
              </div>
            </div>
          </section>

          {/* 2. 정보 사용 목적 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-3 text-green-600" />
              2. 개인정보 사용 목적
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">🎓 교육 서비스</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• 개인맞춤 학습 진도 관리</li>
                  <li>• AI 피드백 시스템 최적화</li>
                  <li>• 학습 성과 분석 및 리포트</li>
                  <li>• 난이도 조절 및 추천</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">🔧 서비스 개선</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• 사용자 경험 개선</li>
                  <li>• 기술적 문제 해결</li>
                  <li>• 새로운 기능 개발</li>
                  <li>• 서비스 안정성 확보</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-green-50 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                <strong>✅ 약속:</strong> 수집된 모든 정보는 오직 교육 서비스 개선과 
                사용자 경험 향상을 위해서만 사용됩니다. 마케팅이나 광고 목적으로는 
                절대 사용하지 않습니다.
              </p>
            </div>
          </section>

          {/* 3. 쿠키 및 추적 기술 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Cookie className="w-6 h-6 mr-3 text-orange-600" />
              3. 쿠키 및 추적 기술
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">3.1 쿠키 사용</h3>
                <p className="text-gray-600 mb-4">
                  더 나은 사용자 경험을 위해 다음과 같은 쿠키를 사용합니다:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">🔧 기능적 쿠키</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 언어 설정 저장</li>
                      <li>• 닉네임 기억</li>
                      <li>• 게임 설정 유지</li>
                      <li>• 학습 진도 저장</li>
                    </ul>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">📊 분석 쿠키</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 서비스 사용 패턴 분석</li>
                      <li>• 성능 최적화</li>
                      <li>• 오류 진단</li>
                      <li>• 기능 개선 데이터</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">🍪 쿠키 관리</h4>
                <p className="text-orange-700 text-sm">
                  브라우저 설정에서 쿠키를 비활성화할 수 있지만, 일부 기능이 
                  제한될 수 있습니다. 대부분의 브라우저에서 쿠키 설정을 관리할 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* 4. 정보 보안 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Lock className="w-6 h-6 mr-3 text-red-600" />
              4. 개인정보 보안
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">4.1 보안 조치</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <strong className="text-gray-800">암호화 저장</strong>
                        <p className="text-sm text-gray-600">모든 데이터는 암호화되어 저장</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <strong className="text-gray-800">HTTPS 연결</strong>
                        <p className="text-sm text-gray-600">안전한 데이터 전송 보장</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <strong className="text-gray-800">접근 제한</strong>
                        <p className="text-sm text-gray-600">권한이 있는 인원만 접근 가능</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <strong className="text-gray-800">정기 보안 점검</strong>
                        <p className="text-sm text-gray-600">지속적인 보안 시스템 업데이트</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  보안 사고 대응
                </h4>
                <p className="text-red-700 text-sm">
                  만약 보안 사고가 발생할 경우, 즉시 사용자에게 알리고 
                  필요한 조치를 취하겠습니다. 의심스러운 활동을 발견하시면 
                  즉시 신고해 주세요.
                </p>
              </div>
            </div>
          </section>

          {/* 5. 제3자 서비스 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Globe className="w-6 h-6 mr-3 text-purple-600" />
              5. 제3자 서비스
            </h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">🔗 연동 서비스</h3>
                <p className="text-gray-600 mb-3">
                  서비스 품질 향상을 위해 다음과 같은 제3자 서비스를 사용합니다:
                </p>
                <ul className="text-gray-600 space-y-1">
                  <li>• <strong>Google AdSense:</strong> 교육적 광고 표시</li>
                  <li>• <strong>클라우드 호스팅:</strong> 서비스 안정성 확보</li>
                  <li>• <strong>CDN 서비스:</strong> 빠른 로딩 속도 제공</li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-purple-800 text-sm">
                  <strong>📋 투명성:</strong> 제3자 서비스 제공업체들은 각자의 
                  개인정보 보호정책을 가지고 있으며, 해당 정책을 확인하실 것을 권장합니다.
                </p>
              </div>
            </div>
          </section>

          {/* 6. 사용자 권리 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-indigo-600" />
              6. 사용자 권리
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">📋 정보 권리</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• 개인정보 처리 현황 조회</li>
                  <li>• 수집된 정보의 수정·삭제 요청</li>
                  <li>• 정보 처리 정지 요청</li>
                  <li>• 손해 발생 시 구제 요청</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">🔧 행사 방법</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• 게임 내 설정 메뉴 이용</li>
                  <li>• 고객센터 문의</li>
                  <li>• 서면 요청서 제출</li>
                  <li>• 법정대리인을 통한 요청</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 7. 연락처 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Mail className="w-6 h-6 mr-3 text-blue-600" />
              7. 문의 및 연락처
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                개인정보 보호와 관련된 문의사항이 있으시면 언제든지 연락해 주세요:
              </p>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">📧 개인정보 보호책임자</h3>
                    <p className="text-blue-700 text-sm">
                      이메일: privacy@holdemmaster.com<br />
                      응답시간: 평일 24시간 이내
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">🏢 운영팀</h3>
                    <p className="text-blue-700 text-sm">
                      홀덤마스터 프로 개발팀<br />
                      교육용 포커 플랫폼 운영
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 8. 정책 변경 */}
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">8. 개인정보 보호정책 변경</h2>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                본 개인정보 보호정책은 관련 법령의 변경이나 서비스 개선에 따라 
                수정될 수 있습니다. 중요한 변경사항이 있을 경우 사전에 공지하겠습니다.
              </p>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-800 mb-2">변경 공지 방법</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• 웹사이트 내 공지사항 게시</li>
                  <li>• 게임 내 알림 표시</li>
                  <li>• 중요 변경시 별도 안내</li>
                </ul>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-gray-600 mb-4">
              홀덤마스터 프로는 사용자의 개인정보 보호를 위해 최선을 다하고 있습니다.
            </p>
            <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
              <span>🔒 안전한 교육 플랫폼</span>
              <span>•</span>
              <span>📚 학습 목적 전용</span>
              <span>•</span>
              <span>🛡️ 개인정보 보호</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;