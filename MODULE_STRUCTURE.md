# 포커 마스터 프로 - 모듈 구조

## 📁 프로젝트 구조

```
src/
├── ProPokerMaster.jsx              # 기존 메인 컴포넌트
├── ProPokerMaster_Modular.jsx      # 모듈화된 메인 컴포넌트
├── main.jsx                        # 진입점
├── constants/                      # 상수 및 설정
│   └── gameConstants.js
├── utils/                          # 유틸리티 함수들
│   ├── cardUtils.js               # 카드 관련 함수
│   └── handAnalysis.js            # 핸드 분석 함수
├── ai/                            # AI 로직
│   └── aiLogic.js
├── game/                          # 게임 로직
│   └── gameLogic.js
└── components/                    # UI 컴포넌트들
    ├── Card.jsx
    ├── NicknameModal.jsx
    └── GameControls.jsx
```

## 🔧 모듈별 설명

### 📋 constants/gameConstants.js
- 게임에서 사용하는 모든 상수값들
- SUITS, RANKS, BLINDS, HAND_STRENGTHS
- AI 스타일 설정, 학습 모드 등

### 🎴 utils/cardUtils.js
- 카드 관련 핵심 함수들
- `createDeck()`: 덱 생성 및 셔플
- `findBestHand()`: 최고 핸드 찾기
- `compareHands()`: 핸드 비교
- `getRankValue()`: 카드 랭크 값 계산

### 📊 utils/handAnalysis.js
- 핸드 분석 관련 함수들
- `calculateHandStrength()`: 핸드 강도 계산
- `calculateOuts()`: 아웃츠 계산
- `getPreflopStrength()`: 프리플롭 핸드 강도

### 🤖 ai/aiLogic.js
- AI 플레이어 로직
- `getAIAction()`: AI 액션 결정
- `getTrainingFeedback()`: 학습 모드별 피드백

### 🎮 game/gameLogic.js
- 게임 진행 관련 로직
- `checkAchievements()`: 성취 시스템
- `saveStats()`: 통계 저장
- `createGameResult()`: 게임 결과 생성

### 🎨 components/
- 재사용 가능한 UI 컴포넌트들
- `Card.jsx`: 카드 컴포넌트 (강조 효과 포함)
- `NicknameModal.jsx`: 닉네임 설정 모달
- `GameControls.jsx`: 게임 컨트롤 버튼들

## 💡 모듈화의 장점

1. **유지보수성**: 기능별로 파일이 분리되어 수정이 용이
2. **재사용성**: 컴포넌트와 함수를 다른 프로젝트에서 재사용 가능
3. **테스트 용이성**: 각 모듈을 독립적으로 테스트 가능
4. **협업 효율성**: 팀원들이 서로 다른 모듈을 동시에 작업 가능
5. **코드 가독성**: 관련 기능들이 한 곳에 모여 있어 이해하기 쉬움

## 🚀 사용 방법

모듈화된 버전을 사용하려면 `main.jsx`에서 import를 변경하면 됩니다:

```javascript
// 기존 버전
import ProPokerMaster from './ProPokerMaster.jsx'

// 모듈화된 버전  
import ProPokerMaster from './ProPokerMaster_Modular.jsx'
```

## 🔄 마이그레이션 가이드

기존 코드에서 모듈화된 버전으로 점진적으로 마이그레이션할 수 있습니다:

1. 상수들을 `constants/gameConstants.js`로 이동
2. 유틸리티 함수들을 `utils/` 폴더로 분리
3. UI 컴포넌트들을 `components/` 폴더로 분리
4. AI와 게임 로직을 각각의 모듈로 분리

이렇게 하면 코드의 관리가 훨씬 쉬워지고, 새로운 기능 추가나 버그 수정이 더 효율적으로 가능합니다!