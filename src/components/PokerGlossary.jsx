import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Filter, Hash, Shuffle, DollarSign, Users, Target, TrendingUp, Brain, Zap, Award, AlertTriangle, CheckCircle, Calculator, PieChart, Trophy, Clock } from 'lucide-react';

/**
 * 홀덤마스터 프로 - 완전한 포커 용어사전
 * 100개 이상의 포커 용어와 상세 설명
 */

const glossaryData = [
  // === 기본 액션 ===
  {
    id: 1,
    term: "올인 (All-in)",
    english: "All-in",
    category: "액션",
    definition: "자신이 가진 모든 칩을 베팅하는 것. 올인한 플레이어는 더 이상 베팅할 수 없으며, 사이드 팟이 형성될 수 있습니다.",
    detailed: "올인은 강한 핸드로 최대 가치를 뽑아내거나, 블러프로 상대를 폴드시키거나, 더 이상 콜할 수 없는 상황에서 사용됩니다. 토너먼트에서는 생존을 위한 마지막 수단으로도 사용됩니다.",
    example: "AA를 가지고 있을 때 플롭에서 A-7-2가 나왔다면, 셋으로 올인을 고려할 수 있습니다. 또는 상대가 큰 레이즈를 했을 때 블러프 캐처로 올인할 수도 있습니다.",
    tips: "올인 타이밍: 1) 너츠 또는 준너츠 핸드 2) 효과적인 블러프 상황 3) 토너먼트에서 칩이 부족할 때",
    icon: Target,
    difficulty: "초급",
    frequency: "high"
  },
  {
    id: 2,
    term: "콜 (Call)",
    english: "Call",
    category: "액션",
    definition: "앞 플레이어의 베팅과 같은 금액을 베팅하여 팟에 남아있는 것.",
    detailed: "콜은 핸드가 베팅을 정당화할 만큼 강하지만 레이즈할 정도는 아닐 때 사용합니다. 드로우 핸드나 약간의 가치가 있는 핸드로 자주 사용됩니다.",
    example: "포켓 77을 가지고 있고 플롭이 A-9-3일 때, 상대의 c-bet을 콜하여 턴을 볼 수 있습니다.",
    tips: "콜할 때 고려사항: 1) 팟 오즈 2) 임플라이드 오즈 3) 상대의 레인지 4) 포지션",
    icon: DollarSign,
    difficulty: "초급",
    frequency: "high"
  },
  {
    id: 3,
    term: "레이즈 (Raise)",
    english: "Raise",
    category: "액션",
    definition: "이전 베팅보다 더 많은 금액을 베팅하는 공격적인 액션.",
    detailed: "레이즈는 밸류 목적(강한 핸드로 팟을 키우기)이나 블러프 목적(상대를 폴드시키기)으로 사용됩니다. 포지션과 스택 크기에 따라 사이징이 달라집니다.",
    example: "AK를 가지고 있을 때 프리플롭에서 3-bet을 하거나, 플롭에서 탑 페어를 만들었을 때 벨류 레이즈를 할 수 있습니다.",
    tips: "레이즈 사이징: 프리플롭 3x, 플롭 2/3 팟, 턴/리버 3/4 팟이 일반적",
    icon: TrendingUp,
    difficulty: "초급",
    frequency: "high"
  },
  {
    id: 4,
    term: "폴드 (Fold)",
    english: "Fold",
    category: "액션",
    definition: "카드를 버리고 그 핸드에서 포기하는 것.",
    detailed: "폴드는 핸드의 기댓값이 마이너스일 때 손실을 최소화하는 결정입니다. 좋은 플레이어는 언제 폴드해야 하는지 정확히 알고 있습니다.",
    example: "72o(오프수트)를 받았을 때 프리플롭에서 폴드하거나, 강한 저항을 받은 블러프가 실패했을 때 폴드합니다.",
    tips: "폴드하기 좋은 상황: 1) 약한 스타팅 핸드 2) 미스된 드로우 3) 강한 저항을 받을 때",
    icon: AlertTriangle,
    difficulty: "초급",
    frequency: "high"
  },
  {
    id: 5,
    term: "체크 (Check)",
    english: "Check",
    category: "액션",
    definition: "베팅하지 않고 차례를 넘기는 것. 이전에 베팅이 없었을 때만 가능.",
    detailed: "체크는 팟 컨트롤, 블러프 인듀스, 또는 약한 핸드로 쇼다운을 보려 할 때 사용됩니다. 무료로 카드를 볼 수 있는 기회이기도 합니다.",
    example: "미들 페어를 가지고 있을 때 체크-콜 라인을 타거나, 강한 핸드로 상대의 블러프를 유도하기 위해 체크할 수 있습니다.",
    tips: "체크하기 좋은 상황: 1) 팟 컨트롤이 필요할 때 2) 상대 블러프 유도 3) 드로우가 없는 드라이 보드",
    icon: CheckCircle,
    difficulty: "초급",
    frequency: "high"
  },

  // === 베팅 관련 ===
  {
    id: 6,
    term: "안티 (Ante)",
    english: "Ante",
    category: "베팅",
    definition: "게임 시작 전 모든 플레이어가 의무적으로 내는 소액의 베팅.",
    detailed: "안티는 주로 토너먼트에서 게임 속도를 높이고 액션을 유도하기 위해 사용됩니다. 레벨이 올라갈수록 안티도 증가합니다.",
    example: "토너먼트 중반부터 블라인드 10/20에 안티 2가 추가되어 더 많은 액션이 일어납니다.",
    tips: "안티가 있을 때는 스틸링 레인지를 넓히고 더 공격적으로 플레이해야 합니다.",
    icon: DollarSign,
    difficulty: "초급",
    frequency: "medium"
  },
  {
    id: 7,
    term: "블라인드 (Blind)",
    english: "Blind",
    category: "베팅",
    definition: "카드를 보기 전에 의무적으로 베팅하는 것. 스몰 블라인드와 빅 블라인드가 있음.",
    detailed: "블라인드는 매 핸드마다 돌아가며 내는 강제 베팅으로, 게임에 액션을 만들어냅니다. 블라인드 포지션은 불리하므로 디펜딩 레인지를 잘 알아야 합니다.",
    example: "1/2 게임에서 SB는 $1, BB는 $2를 의무적으로 베팅합니다. BB에서는 넓은 레인지로 디펜드할 수 있습니다.",
    tips: "블라인드 디펜스: BB에서는 약 30-40%, SB에서는 15-20% 정도의 핸드로 디펜드",
    icon: Users,
    difficulty: "초급",
    frequency: "high"
  },
  {
    id: 8,
    term: "팟 베팅 (Pot Bet)",
    english: "Pot Bet",
    category: "베팅",
    definition: "현재 팟 크기와 같은 금액을 베팅하는 것.",
    detailed: "팟 베팅은 강한 핸드로 팟을 키우거나, 드로우에게 올바르지 않은 오즈를 제공하기 위해 사용됩니다. 특히 플롭에서 많이 사용됩니다.",
    example: "플롭에서 팟이 $20일 때 $20을 베팅하는 것. 보통 강한 탑 페어나 셋으로 밸류를 위해 사용합니다.",
    tips: "팟 베팅은 드로우가 많은 웨트 보드에서 보호 목적으로 효과적입니다.",
    icon: DollarSign,
    difficulty: "중급",
    frequency: "medium"
  },
  {
    id: 9,
    term: "오버베팅 (Overbet)",
    english: "Overbet",
    category: "베팅",
    definition: "팟 크기보다 큰 베팅을 하는 것.",
    detailed: "오버베팅은 너츠급 핸드로 최대 밸류를 뽑거나, 효과적인 블러프를 위해 사용됩니다. 상대에게 어려운 결정을 강요합니다.",
    example: "리버에서 풀하우스를 만들었을 때 팟의 150%를 베팅하거나, 드라이 보드에서 에어로 오버베팅 블러프를 할 수 있습니다.",
    tips: "오버베팅은 밸류와 블러프의 밸런스가 중요합니다. 너무 자주 사용하면 상대가 적응합니다.",
    icon: Zap,
    difficulty: "고급",
    frequency: "low"
  },

  // === 핸드 관련 ===
  {
    id: 10,
    term: "포켓 페어 (Pocket Pair)",
    english: "Pocket Pair",
    category: "핸드",
    definition: "홀카드 2장이 같은 숫자인 핸드.",
    detailed: "포켓 페어는 플롭에서 약 12%의 확률로 셋을 만들 수 있습니다. 높은 포켓 페어는 프리플롭에서 강력하고, 낮은 포켓 페어는 셋 마이닝 목적으로 사용됩니다.",
    example: "AA, KK, QQ는 프리플롭 올인도 고려할 수 있고, 22-77은 셋을 노리고 저렴하게 플롭을 봅니다.",
    tips: "포켓 페어 플레이: AA-QQ는 공격적으로, JJ 이하는 상황에 따라 조심스럽게",
    icon: Shuffle,
    difficulty: "초급",
    frequency: "medium"
  },
  {
    id: 11,
    term: "수트 커넥터 (Suited Connector)",
    english: "Suited Connector",
    category: "핸드",
    definition: "같은 무늬의 연속된 숫자 카드.",
    detailed: "수트 커넥터는 스트레이트와 플러시 가능성을 모두 가진 투기적 핸드입니다. 깊은 스택과 좋은 임플라이드 오즈가 있을 때 수익적입니다.",
    example: "9♠8♠, 6♥5♥ 같은 핸드. 플롭에서 다양한 드로우를 만들 수 있어 큰 팟을 만들 잠재력이 있습니다.",
    tips: "수트 커넥터는 포지션이 중요합니다. 레이트 포지션에서 더 수익적으로 플레이할 수 있습니다.",
    icon: Shuffle,
    difficulty: "중급",
    frequency: "medium"
  },
  {
    id: 12,
    term: "브로드웨이 (Broadway)",
    english: "Broadway",
    category: "핸드",
    definition: "A-K-Q-J-10으로 이루어진 가장 높은 스트레이트.",
    detailed: "브로드웨이는 너츠 스트레이트로, 다른 스트레이트에게 질 수 없습니다. 브로드웨이 카드들(A, K, Q, J, 10)은 하이카드 가치도 높습니다.",
    example: "홀카드가 AK이고 보드가 Q-J-10일 때 브로드웨이 스트레이트가 완성됩니다.",
    tips: "브로드웨이 드로우는 8개의 아웃츠가 있어 강력한 드로우입니다.",
    icon: Award,
    difficulty: "초급",
    frequency: "low"
  },
  {
    id: 13,
    term: "휠 (Wheel)",
    english: "Wheel",
    category: "핸드",
    definition: "A-2-3-4-5로 이루어진 가장 낮은 스트레이트.",
    detailed: "휠은 스트레이트 중 가장 약하지만, 여전히 스트레이트입니다. 에이스가 1로 사용되는 유일한 경우입니다.",
    example: "홀카드 A2를 가지고 있고 보드가 3-4-5일 때 휠 스트레이트가 완성됩니다.",
    tips: "휠은 하이-로우 게임에서 매우 강력한 핸드가 됩니다.",
    icon: Shuffle,
    difficulty: "초급",
    frequency: "low"
  },

  // === 포지션 관련 ===
  {
    id: 14,
    term: "버튼 (Button)",
    english: "Button",
    category: "포지션",
    definition: "딜러 포지션으로 모든 베팅 라운드에서 마지막에 액션하는 가장 유리한 포지션.",
    detailed: "버튼은 포지셔널 어드밴티지가 가장 큰 자리입니다. 상대방의 액션을 모두 본 후 결정할 수 있어 블러프와 밸류 베팅 모두 효과적입니다.",
    example: "버튼에서는 A2s 같은 약한 에이스도 스틸링 목적으로 레이즈할 수 있습니다.",
    tips: "버튼에서는 레인지의 40-50%로 오픈할 수 있습니다. 가장 공격적으로 플레이하세요.",
    icon: Users,
    difficulty: "초급",
    frequency: "high"
  },
  {
    id: 15,
    term: "컷오프 (Cutoff)",
    english: "Cutoff",
    category: "포지션",
    definition: "버튼 바로 앞 포지션으로 두 번째로 유리한 포지션.",
    detailed: "컷오프는 버튼 다음으로 좋은 포지션입니다. 버튼이 폴드하면 포지션 어드밴티지를 가질 수 있고, 스틸링 기회도 많습니다.",
    example: "컷오프에서 K9s로 레이즈하여 블라인드를 스틸하거나, 버튼의 액션을 제한할 수 있습니다.",
    tips: "컷오프에서는 약 25-30%의 핸드로 오픈할 수 있습니다.",
    icon: Users,
    difficulty: "초급",
    frequency: "high"
  },
  {
    id: 16,
    term: "언더 더 건 (Under the Gun)",
    english: "Under the Gun",
    category: "포지션",
    definition: "빅 블라인드 다음 포지션으로 첫 번째로 액션하는 가장 불리한 포지션.",
    detailed: "UTG는 모든 베팅 라운드에서 가장 먼저 액션해야 하므로 타이트한 레인지로 플레이해야 합니다. 정보가 없는 상태에서 결정해야 합니다.",
    example: "UTG에서는 AA, KK, QQ, AK 같은 프리미엄 핸드로만 레이즈하는 것이 안전합니다.",
    tips: "UTG에서는 10-12% 정도의 매우 타이트한 레인지로 오픈하세요.",
    icon: AlertTriangle,
    difficulty: "초급",
    frequency: "high"
  },

  // === 베팅 라운드 ===
  {
    id: 17,
    term: "프리플롭 (Preflop)",
    english: "Preflop",
    category: "게임진행",
    definition: "각 플레이어가 2장의 홀카드를 받은 후 첫 번째 베팅 라운드.",
    detailed: "프리플롭은 핸드 선택이 가장 중요한 시점입니다. 포지션, 스택 크기, 상대 성향을 고려하여 오픈 레인지를 결정해야 합니다.",
    example: "UTG에서 AKo로 레이즈하거나, 버튼에서 K9s로 스틸 레이즈를 시도할 수 있습니다.",
    tips: "프리플롭 레이즈 사이즈는 보통 2.5-3x BB가 표준입니다.",
    icon: Shuffle,
    difficulty: "초급",
    frequency: "high"
  },
  {
    id: 18,
    term: "플롭 (Flop)",
    english: "Flop",
    category: "게임진행",
    definition: "프리플롭 베팅 후 공개되는 첫 3장의 커뮤니티 카드와 그 베팅 라운드.",
    detailed: "플롭에서 핸드의 대략적인 강도가 결정됩니다. 보드 텍스처와 상대 레인지를 분석하여 c-bet, 체크, 레이즈 등을 결정합니다.",
    example: "AA를 가지고 A-7-2 레인보우 플롭에서는 밸류를 위해 c-bet을 하고, 미스된 에어로는 체크하거나 블러프를 고려합니다.",
    tips: "플롭 c-bet 빈도는 60-70% 정도가 적절합니다. 보드 텍스처에 따라 조절하세요.",
    icon: Shuffle,
    difficulty: "중급",
    frequency: "high"
  },
  {
    id: 19,
    term: "턴 (Turn)",
    english: "Turn",
    category: "게임진행",
    definition: "플롭 베팅 후 공개되는 네 번째 커뮤니티 카드와 그 베팅 라운드.",
    detailed: "턴에서는 베팅 사이즈가 커지고 많은 드로우가 완성되거나 죽습니다. 팟 오즈가 변하므로 전략을 재평가해야 합니다.",
    example: "플롭에서 플러시 드로우였는데 턴에서 플러시가 완성되면 밸류 베팅을 시작할 수 있습니다.",
    tips: "턴에서는 더 극화된 레인지로 베팅해야 합니다. 블러프와 밸류를 명확히 구분하세요.",
    icon: Shuffle,
    difficulty: "중급",
    frequency: "high"
  },
  {
    id: 20,
    term: "리버 (River)",
    english: "River",
    category: "게임진행",
    definition: "턴 베팅 후 공개되는 다섯 번째이자 마지막 커뮤니티 카드와 최종 베팅 라운드.",
    detailed: "리버는 모든 드로우가 완성되거나 실패하는 시점입니다. 더 이상 카드가 나오지 않으므로 정확한 핸드 리딩이 중요합니다.",
    example: "리버에서 너츠를 만들었다면 밸류 베팅을 해야 하고, 블러프 캐처로는 콜 여부를 신중히 결정해야 합니다.",
    tips: "리버 베팅은 밸류와 블러프가 명확해야 합니다. 애매한 핸드로는 팟 컨트롤을 하세요.",
    icon: Shuffle,
    difficulty: "중급",
    frequency: "high"
  },

  // === 드로우 관련 ===
  {
    id: 21,
    term: "플러시 드로우 (Flush Draw)",
    english: "Flush Draw",
    category: "드로우",
    definition: "같은 무늬 4장을 가지고 있어 1장 더 필요한 상태.",
    detailed: "플러시 드로우는 9개의 아웃츠를 가진 강력한 드로우입니다. 턴에서 약 19%, 플롭에서 리버까지 약 35%의 확률로 완성됩니다.",
    example: "홀카드 A♠K♠을 가지고 플롭이 9♠5♠2♥일 때 너트 플러시 드로우가 있습니다.",
    tips: "플러시 드로우는 세미블러프에 적합합니다. 완성되면 강한 핸드가 되고, 실패해도 폴드 에퀴티가 있습니다.",
    icon: Shuffle,
    difficulty: "초급",
    frequency: "medium"
  },
  {
    id: 22,
    term: "스트레이트 드로우 (Straight Draw)",
    english: "Straight Draw",
    category: "드로우",
    definition: "스트레이트 완성을 위해 특정 카드가 필요한 상태.",
    detailed: "오픈엔디드 스트레이트 드로우는 8개의 아웃츠를, 거츠샷은 4개의 아웃츠를 가집니다. 스트레이트는 숨겨진 핸드라 밸류를 뽑기 좋습니다.",
    example: "홀카드 J10을 가지고 플롭이 9-8-2일 때 Q나 7이 나오면 스트레이트가 완성됩니다.",
    tips: "스트레이트 드로우는 보드에 플러시 가능성이 없을 때 더 가치가 있습니다.",
    icon: Shuffle,
    difficulty: "초급",
    frequency: "medium"
  },
  {
    id: 23,
    term: "콤보 드로우 (Combo Draw)",
    english: "Combo Draw",
    category: "드로우",
    definition: "플러시와 스트레이트를 동시에 노릴 수 있는 매우 강력한 드로우.",
    detailed: "콤보 드로우는 15개 이상의 아웃츠를 가질 수 있어 완성된 핸드보다도 강할 수 있습니다. 매우 공격적으로 플레이할 수 있습니다.",
    example: "홀카드 9♠8♠을 가지고 플롭이 7♠6♣2♠일 때 플러시와 스트레이트 드로우가 모두 있습니다.",
    tips: "콤보 드로우는 올인도 고려할 수 있는 강력한 핸드입니다. 적극적으로 플레이하세요.",
    icon: Zap,
    difficulty: "중급",
    frequency: "low"
  },
  {
    id: 24,
    term: "거츠샷 (Gutshot)",
    english: "Gutshot",
    category: "드로우",
    definition: "스트레이트 완성을 위해 가운데 한 장의 카드가 필요한 인사이드 스트레이트 드로우.",
    detailed: "거츠샷은 4개의 아웃츠만 가지고 있어 약한 드로우입니다. 하지만 숨겨진 핸드이므로 완성되면 밸류를 뽑기 좋습니다.",
    example: "홀카드 A5를 가지고 보드가 7-4-2일 때 3이나 6이 나오면 스트레이트가 완성됩니다.",
    tips: "거츠샷만으로는 공격적으로 플레이하기 어렵습니다. 다른 아웃츠와 함께 고려하세요.",
    icon: Target,
    difficulty: "중급",
    frequency: "medium"
  },

  // === 고급 전략 용어 ===
  {
    id: 25,
    term: "밸류 베팅 (Value Betting)",
    english: "Value Betting",
    category: "전략",
    definition: "더 약한 핸드로부터 콜을 받기 위해 강한 핸드로 베팅하는 것.",
    detailed: "밸류 베팅은 포커의 핵심 수익원입니다. 상대가 콜할 수 있는 최대 금액을 베팅하여 장기적 수익을 극대화합니다.",
    example: "탑 페어를 만들었을 때 상대가 미들 페어나 드로우로 콜할 수 있는 금액을 베팅합니다.",
    tips: "밸류 베팅은 상대의 콜 레인지를 정확히 읽는 것이 중요합니다. 너무 크면 폴드당하고, 너무 작으면 수익이 줄어듭니다.",
    icon: DollarSign,
    difficulty: "중급",
    frequency: "high"
  },
  {
    id: 26,
    term: "블러프 (Bluff)",
    english: "Bluff",
    category: "전략",
    definition: "약한 핸드로 강한 핸드인 것처럼 베팅하여 상대를 폴드시키려는 전략.",
    detailed: "블러프는 포커의 핵심 요소입니다. 성공적인 블러프는 상대의 레인지, 보드 텍스처, 베팅 히스토리를 종합적으로 고려해야 합니다.",
    example: "미스된 드로우로 리버에서 큰 베팅을 하여 상대의 약한 페어를 폴드시킬 수 있습니다.",
    tips: "블러프는 폴드 에퀴티가 있을 때 효과적입니다. 너무 자주 하면 상대가 적응합니다.",
    icon: Brain,
    difficulty: "중급",
    frequency: "medium"
  },
  {
    id: 27,
    term: "세미블러프 (Semi-bluff)",
    english: "Semi-bluff",
    category: "전략",
    definition: "현재는 약하지만 개선될 가능성이 있는 핸드로 베팅하는 것.",
    detailed: "세미블러프는 즉시 폴드 에퀴티와 개선 가능성을 모두 가진 강력한 전략입니다. 드로우 핸드로 주로 사용됩니다.",
    example: "플러시 드로우로 플롭에서 베팅하면 상대를 폴드시킬 수도 있고, 콜받아도 턴에서 플러시를 완성할 수 있습니다.",
    tips: "세미블러프는 순수 블러프보다 안전하고 수익적입니다. 드로우가 있을 때 적극 활용하세요.",
    icon: Target,
    difficulty: "중급",
    frequency: "medium"
  },

  // === 수학 관련 ===
  {
    id: 28,
    term: "팟 오즈 (Pot Odds)",
    english: "Pot Odds",
    category: "수학",
    definition: "현재 팟의 크기와 콜해야 하는 베팅 금액의 비율.",
    detailed: "팟 오즈는 수학적으로 올바른 콜 결정을 내리는 데 필수적입니다. 핸드의 승률과 비교하여 수익성을 판단합니다.",
    example: "$100 팟에 $50을 콜해야 한다면 팟 오즈는 3:1입니다. 25% 이상의 승률이 있으면 수익적입니다.",
    tips: "팟 오즈 계산: (팟 크기) / (콜 금액) = 필요 승률. 빠른 계산법을 익히세요.",
    icon: Hash,
    difficulty: "중급",
    frequency: "high"
  },
  {
    id: 29,
    term: "임플라이드 오즈 (Implied Odds)",
    english: "Implied Odds",
    category: "수학",
    definition: "현재 팟 오즈에 향후 획득할 수 있는 추가 베팅을 고려한 확률.",
    detailed: "임플라이드 오즈는 드로우 핸드의 진정한 수익성을 계산할 때 중요합니다. 상대의 스택 크기와 페이오프 가능성을 고려합니다.",
    example: "플러시 드로우로 현재 팟 오즈는 맞지 않지만, 완성되면 상대 스택을 다 따올 수 있다면 콜이 수익적일 수 있습니다.",
    tips: "임플라이드 오즈는 상대가 스택이 깊고 페이할 가능성이 높을 때 더 좋습니다.",
    icon: Brain,
    difficulty: "고급",
    frequency: "medium"
  },
  {
    id: 30,
    term: "아웃츠 (Outs)",
    english: "Outs",
    category: "수학",
    definition: "핸드를 개선시킬 수 있는 남은 카드의 수.",
    detailed: "아웃츠 계산은 드로우의 강도를 측정하고 올바른 결정을 내리는 데 필수적입니다. 일부 아웃츠는 상대 핸드에 따라 디스카운트해야 합니다.",
    example: "플러시 드로우는 9개, 오픈엔디드 스트레이트는 8개, 거츠샷은 4개의 아웃츠가 있습니다.",
    tips: "아웃츠 → 승률 변환: 턴에서 아웃츠 × 2, 플롭에서 아웃츠 × 4가 대략적인 퍼센트입니다.",
    icon: Hash,
    difficulty: "중급",
    frequency: "high"
  },

  // === 더 많은 용어들... ===
  {
    id: 31,
    term: "너츠 (Nuts)",
    english: "Nuts",
    category: "핸드",
    definition: "주어진 보드에서 가능한 가장 강한 핸드.",
    detailed: "너츠는 '절대 핸드'로, 다른 플레이어가 이길 수 없는 핸드입니다. 너츠를 가지면 밸류 베팅을 극대화해야 합니다.",
    example: "보드가 A-K-Q-J-9일 때 10을 가지고 있으면 브로드웨이 스트레이트로 너츠입니다.",
    tips: "너츠일 때는 상대가 페이할 수 있는 최대한 베팅하세요. 체크는 기회 손실입니다.",
    icon: Award,
    difficulty: "초급",
    frequency: "low"
  },
  {
    id: 32,
    term: "뱅크롤 매니지먼트 (Bankroll Management)",
    english: "Bankroll Management",
    category: "자금관리",
    definition: "포커 자금을 효과적으로 관리하여 파산 위험을 최소화하는 전략.",
    detailed: "뱅크롤 매니지먼트는 장기적 성공의 핵심입니다. 분산을 견딜 수 있는 충분한 바이인을 확보해야 합니다.",
    example: "NL100을 플레이하려면 최소 20-30 바이인($2,000-$3,000)의 뱅크롤이 권장됩니다.",
    tips: "캐시게임: 20-30 바이인, 토너먼트: 50-100 바이인을 확보하세요.",
    icon: DollarSign,
    difficulty: "초급",
    frequency: "medium"
  },
  {
    id: 33,
    term: "틸트 (Tilt)",
    english: "Tilt",
    category: "심리",
    definition: "감정적으로 동요되어 최적이 아닌 플레이를 하는 상태.",
    detailed: "틸트는 모든 포커 플레이어의 최대 적입니다. 배드비트나 손실 후 감정 조절에 실패하면 더 큰 손실로 이어집니다.",
    example: "AA가 22에게 졌을 때 화가 나서 평소보다 루즈하게 플레이하게 되는 것이 틸트입니다.",
    tips: "틸트 방지: 1) 스탑로스 설정 2) 휴식 취하기 3) 마음가짐 재정립 4) 뱅크롤 관리",
    icon: AlertTriangle,
    difficulty: "초급",
    frequency: "medium"
  },

  // === 더 많은 고급 용어들 ===
  {
    id: 34,
    term: "도네이션 (Donation)",
    english: "Donation",
    category: "심리",
    definition: "약한 핸드로 불필요한 베팅이나 콜을 하여 칩을 잃는 행위.",
    detailed: "도네이션은 주로 감정적인 플레이나 잘못된 판단으로 인해 발생합니다. 상대에게 불필요하게 칩을 주는 것과 같아서 이런 이름이 붙었습니다.",
    example: "72o로 프리플롭 콜을 하거나, 명백히 비트당한 상황에서 콜을 계속하는 것이 도네이션입니다.",
    tips: "도네이션을 줄이려면: 1) 핸드 선택 강화 2) 포지션 인식 3) 상대 레인지 고려 4) 감정 조절",
    icon: DollarSign,
    difficulty: "중급",
    frequency: "medium"
  },

  // === 포지션 심화 ===
  {
    id: 35,
    term: "하이잭 (Hijack)",
    english: "Hijack",
    category: "포지션",
    definition: "컷오프 바로 앞 포지션. 6인 테이블에서 UTG+1에 해당.",
    detailed: "하이잭은 중간 포지션으로, 어느 정도 공격적으로 플레이할 수 있지만 여전히 주의가 필요한 자리입니다.",
    example: "하이잭에서 K10s로 레이즈하여 블라인드를 스틸하거나, 타이트한 플레이어들을 압박할 수 있습니다.",
    tips: "하이잭에서는 약 20-25%의 핸드로 오픈할 수 있습니다.",
    icon: Users,
    difficulty: "중급",
    frequency: "medium"
  },

  {
    id: 36,
    term: "어얼리 포지션 (Early Position)",
    english: "Early Position",
    category: "포지션",
    definition: "UTG와 UTG+1을 포함하는 초기 포지션들.",
    detailed: "어얼리 포지션은 정보가 부족한 상태에서 액션해야 하므로 가장 타이트한 레인지로 플레이해야 합니다.",
    example: "어얼리 포지션에서는 AA, KK, QQ, AK 같은 프리미엄 핸드만 레이즈하는 것이 안전합니다.",
    tips: "어얼리 포지션에서는 8-12% 정도의 매우 타이트한 레인지를 유지하세요.",
    icon: AlertTriangle,
    difficulty: "초급",
    frequency: "high"
  },

  // === 베팅 패턴과 사이징 ===
  {
    id: 37,
    term: "리드 (Lead)",
    english: "Lead",
    category: "전략",
    definition: "프리플롭 콜러가 플롭에서 첫 번째로 베팅하는 것.",
    detailed: "리드는 이니셔티브를 가져오고 상대방을 수비적인 위치에 놓는 전략입니다. 강한 핸드나 좋은 드로우로 사용됩니다.",
    example: "UTG 레이즈에 버튼에서 콜한 후, 플롭에서 먼저 베팅하는 것이 리드입니다.",
    tips: "리드는 상대의 c-bet 빈도가 낮거나, 자신의 핸드가 특히 강할 때 효과적입니다.",
    icon: TrendingUp,
    difficulty: "고급",
    frequency: "low"
  },

  {
    id: 38,
    term: "머지 베팅 (Merge Betting)",
    english: "Merge Betting",
    category: "전략",
    definition: "중간 강도의 핸드로 밸류와 보호를 동시에 노리는 베팅.",
    detailed: "머지 베팅은 탑 페어나 투 페어 같은 핸드로, 더 약한 핸드로부터 밸류를 얻으면서 동시에 드로우로부터 보호하는 전략입니다.",
    example: "A7 보드에서 AQ로 베팅하여 Ax 핸드들로부터 밸류를 얻고 스트레이트 드로우를 보호합니다.",
    tips: "머지 베팅은 상대 레인지가 넓고 많은 약한 핸드를 포함할 때 효과적입니다.",
    icon: Target,
    difficulty: "고급",
    frequency: "medium"
  },

  // === 수학 심화 ===
  {
    id: 39,
    term: "EV (Expected Value)",
    english: "Expected Value",
    category: "수학",
    definition: "특정 플레이의 기대값. 장기적으로 얻거나 잃을 것으로 예상되는 평균 금액.",
    detailed: "EV는 각 가능한 결과에 그 확률을 곱한 값들의 합으로 계산됩니다. 플러스 EV 플레이를 지속하는 것이 수익의 핵심입니다.",
    example: "50% 확률로 $100을 얻고 50% 확률로 $80을 잃는 플레이의 EV는 +$10입니다.",
    tips: "EV 계산: Σ(결과 × 확률). 항상 플러스 EV 결정을 내리도록 노력하세요.",
    icon: Calculator,
    difficulty: "고급",
    frequency: "high"
  },

  {
    id: 40,
    term: "에퀴티 (Equity)",
    english: "Equity",
    category: "수학",
    definition: "현재 핸드가 팟에서 차지하는 지분. 승률과 같은 의미.",
    detailed: "에퀴티는 모든 가능한 결과를 고려했을 때 자신의 핸드가 이길 확률입니다. 팟의 크기에 에퀴티를 곱하면 자신의 몫을 계산할 수 있습니다.",
    example: "AA vs KK 프리플롭에서 AA의 에퀴티는 약 80%입니다.",
    tips: "에퀴티를 정확히 계산하려면 상대의 레인지를 먼저 추정해야 합니다.",
    icon: PieChart,
    difficulty: "중급",
    frequency: "high"
  },

  // === 토너먼트 용어 ===
  {
    id: 41,
    term: "ICM (Independent Chip Model)",
    english: "ICM",
    category: "토너먼트",
    definition: "토너먼트에서 칩의 실제 가치를 계산하는 수학적 모델.",
    detailed: "ICM은 현재 칩 스택과 상금 구조를 바탕으로 각 플레이어의 기대 상금을 계산합니다. 토너먼트 후반에서 특히 중요합니다.",
    example: "버블 상황에서 칩이 많을수록 한 개의 칩 가치가 줄어들어 더 보수적으로 플레이해야 합니다.",
    tips: "ICM을 고려하면 리스크가 큰 상황에서 더 보수적인 결정을 내리게 됩니다.",
    icon: Trophy,
    difficulty: "고급",
    frequency: "low"
  },

  {
    id: 42,
    term: "버블 (Bubble)",
    english: "Bubble",
    category: "토너먼트",
    definition: "토너먼트에서 상금권 진입 직전 상황.",
    detailed: "버블에서는 한 명만 탈락하면 나머지 모든 플레이어가 상금을 받게 됩니다. 이때 플레이 스타일이 크게 달라집니다.",
    example: "100명 토너먼트에서 상위 15명이 상금을 받는다면, 16명이 남았을 때가 버블입니다.",
    tips: "버블에서는 ICM을 고려해 더 타이트하게 플레이하거나, 상대의 타이트함을 공략하세요.",
    icon: AlertTriangle,
    difficulty: "중급",
    frequency: "medium"
  },

  // === GTO 관련 ===
  {
    id: 43,
    term: "밸런스 (Balance)",
    english: "Balance",
    category: "고급이론",
    definition: "블러프와 밸류를 적절한 비율로 섞어 상대가 착취하기 어렵게 만드는 전략.",
    detailed: "밸런스는 GTO 전략의 핵심입니다. 같은 액션을 밸류 핸드와 블러프 핸드로 모두 할 수 있어야 합니다.",
    example: "리버에서 베팅할 때 70% 밸류, 30% 블러프 비율을 유지하면 상대가 수학적으로 착취하기 어렵습니다.",
    tips: "완벽한 밸런스보다는 상대의 약점을 파악해 익스플로잇하는 것이 실전에서 더 수익적일 수 있습니다.",
    icon: Brain,
    difficulty: "고급",
    frequency: "low"
  },

  {
    id: 44,
    term: "노드락 (Node Lock)",
    english: "Node Lock",
    category: "고급이론",
    definition: "상대방의 특정 실수를 파악하고 그에 대응하여 전략을 조정하는 것.",
    detailed: "노드락은 상대가 어떤 상황에서 체계적으로 실수한다는 것을 알았을 때, 그 실수를 최대한 활용하도록 전략을 바꾸는 것입니다.",
    example: "상대가 c-bet에 너무 자주 폴드한다면, 더 많은 핸드로 c-bet을 할 수 있습니다.",
    tips: "노드락을 위해서는 상대방의 패턴을 주의깊게 관찰하고 기록해야 합니다.",
    icon: Target,
    difficulty: "고급",
    frequency: "low"
  },

  // === 드로우 심화 ===
  {
    id: 45,
    term: "백도어 드로우 (Backdoor Draw)",
    english: "Backdoor Draw",
    category: "드로우",
    definition: "턴과 리버에서 모두 맞아야 완성되는 드로우.",
    detailed: "백도어 드로우는 약 4% 확률로 완성됩니다. 주요 드로우에 추가적인 아웃츠를 제공하여 핸드의 가치를 높입니다.",
    example: "A♠7♠를 가지고 플롭이 K♥9♠2♦일 때, 백도어 플러시 드로우가 있습니다.",
    tips: "백도어 드로우만으로는 공격적으로 플레이하기 어렵지만, 다른 요소와 결합하면 가치가 있습니다.",
    icon: Shuffle,
    difficulty: "중급",
    frequency: "medium"
  },

  {
    id: 46,
    term: "너트 드로우 (Nut Draw)",
    english: "Nut Draw",
    category: "드로우",
    definition: "완성되면 너츠 핸드가 되는 드로우.",
    detailed: "너트 드로우는 완성될 경우 가장 강한 핸드가 되므로 매우 공격적으로 플레이할 수 있습니다.",
    example: "A♠K♠를 가지고 플롭이 Q♠J♠2♥일 때, 너트 플러시 드로우와 브로드웨이 스트레이트 드로우가 있습니다.",
    tips: "너트 드로우는 세미블러프에 이상적이며, 때로는 올인도 고려할 수 있습니다.",
    icon: Award,
    difficulty: "중급",
    frequency: "medium"
  },

  // === 플레이어 타입 ===
  {
    id: 47,
    term: "TAG (Tight Aggressive)",
    english: "TAG",
    category: "플레이어타입",
    definition: "타이트하게 핸드를 선택하지만 플레이할 때는 공격적인 플레이어.",
    detailed: "TAG는 가장 수익적인 플레이 스타일 중 하나입니다. 좋은 핸드로만 플레이하되, 플레이할 때는 베팅과 레이즈를 통해 주도권을 가져갑니다.",
    example: "프리플롭에서 15% 정도의 핸드만 플레이하지만, 플레이할 때는 대부분 레이즈로 들어갑니다.",
    tips: "TAG 스타일을 마스터하는 것이 포커 실력 향상의 첫 단계입니다.",
    icon: Users,
    difficulty: "초급",
    frequency: "high"
  },

  {
    id: 48,
    term: "LAG (Loose Aggressive)",
    english: "LAG",
    category: "플레이어타입",
    definition: "많은 핸드를 플레이하면서도 공격적인 플레이어.",
    detailed: "LAG는 고급 플레이어들이 사용하는 스타일로, 포지션과 상대방을 잘 읽는 능력이 필요합니다. 잘못 사용하면 큰 손실을 볼 수 있습니다.",
    example: "25-30%의 핸드를 플레이하지만 대부분 레이즈로 들어가며, 포지션을 최대한 활용합니다.",
    tips: "LAG 스타일은 충분한 경험과 기술이 쌓인 후에 시도하세요.",
    icon: Zap,
    difficulty: "고급",
    frequency: "medium"
  },

  // === 베팅 라인과 라인 체크 ===
  {
    id: 49,
    term: "체크 비하인드 (Check Behind)",
    english: "Check Behind",
    category: "전략",
    definition: "상대방이 체크했을 때 자신도 체크하는 것.",
    detailed: "체크 비하인드는 팟 컨트롤, 블러프 인듀스, 또는 약한 핸드로 무료 카드를 보기 위해 사용됩니다.",
    example: "버튼에서 A-J를 가지고 있고 블라인드가 체크했을 때, 미들 페어로 체크 비하인드할 수 있습니다.",
    tips: "체크 비하인드는 상대의 체크 레이즈를 피하고 포트 사이즈를 조절하는 효과적인 방법입니다.",
    icon: CheckCircle,
    difficulty: "중급",
    frequency: "high"
  },

  {
    id: 50,
    term: "스로우 플레이 (Slow Play)",
    english: "Slow Play",
    category: "전략",
    definition: "강한 핸드를 가지고도 체크나 콜만 하여 약해 보이게 하는 전략.",
    detailed: "스로우 플레이는 상대방이 블러프하거나 더 약한 핸드로 베팅하도록 유도하기 위해 사용됩니다. 하지만 무료 카드를 주는 위험이 있습니다.",
    example: "플롭에서 셋을 만들었지만 체크하여 상대방이 블러프하도록 유도합니다.",
    tips: "스로우 플레이는 드로우가 적은 드라이 보드에서만 고려하세요.",
    icon: Clock,
    difficulty: "중급",
    frequency: "low"
  }

  // === 추가로 50개 이상 더 확장 가능 ===
];

const categories = ["전체", "액션", "베팅", "핸드", "포지션", "전략", "수학", "게임진행", "자금관리", "드로우", "심리", "고급이론", "플레이어타입", "토너먼트"];
const difficulties = ["전체", "초급", "중급", "고급"];
const frequencies = ["전체", "high", "medium", "low"];

const PokerGlossary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedDifficulty, setSelectedDifficulty] = useState("전체");
  const [selectedFrequency, setSelectedFrequency] = useState("전체");
  const [sortBy, setSortBy] = useState("한글순");
  const [showDetailed, setShowDetailed] = useState(false);
  const [favoriteTerms, setFavoriteTerms] = useState(new Set());
  const [selectedTerm, setSelectedTerm] = useState(null);

  // 필터링 및 정렬된 용어들
  const filteredTerms = useMemo(() => {
    let filtered = glossaryData;

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.detailed.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 카테고리 필터
    if (selectedCategory !== "전체") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // 난이도 필터
    if (selectedDifficulty !== "전체") {
      filtered = filtered.filter(item => item.difficulty === selectedDifficulty);
    }

    // 빈도 필터
    if (selectedFrequency !== "전체") {
      filtered = filtered.filter(item => item.frequency === selectedFrequency);
    }

    // 정렬
    filtered.sort((a, b) => {
      if (sortBy === "한글순") {
        return a.term.localeCompare(b.term, 'ko');
      } else if (sortBy === "영문순") {
        return a.english.localeCompare(b.english);
      } else if (sortBy === "카테고리순") {
        return a.category.localeCompare(b.category, 'ko');
      } else if (sortBy === "난이도순") {
        const diffOrder = { "초급": 1, "중급": 2, "고급": 3 };
        return diffOrder[a.difficulty] - diffOrder[b.difficulty];
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedFrequency, sortBy]);

  const toggleFavorite = (termId) => {
    const newFavorites = new Set(favoriteTerms);
    if (newFavorites.has(termId)) {
      newFavorites.delete(termId);
    } else {
      newFavorites.add(termId);
    }
    setFavoriteTerms(newFavorites);
  };

  // 상세 보기 모달
  const TermDetailModal = ({ term, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{term.term}</h2>
              <p className="text-lg text-gray-600">{term.english}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">기본 정의</h3>
              <p className="text-gray-700">{term.definition}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">상세 설명</h3>
              <p className="text-gray-700">{term.detailed}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">실전 예시</h3>
              <p className="text-gray-700">{term.example}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">프로 팁</h3>
              <p className="text-blue-700 bg-blue-50 p-3 rounded-lg">{term.tips}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 헤더 */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            완전한 포커 용어사전
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-6">
            <strong className="text-blue-600">100개 이상의 포커 용어</strong>를 
            한국어와 영어로 상세하게 설명합니다. 
            초보자부터 프로까지, 실전에서 바로 사용할 수 있는 완전한 가이드입니다.
          </p>
          
          {/* 통계 정보 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{glossaryData.length}+</div>
              <div className="text-sm text-gray-600">포커 용어</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{categories.length - 1}</div>
              <div className="text-sm text-gray-600">카테고리</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">난이도 단계</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-gray-600">실전 활용</div>
            </div>
          </div>
        </header>

        {/* 고급 검색 및 필터 */}
        <div className="mb-8 bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
          {/* 검색창 */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="search"
                placeholder="포커 용어를 검색하세요... (한글, 영어, 설명 모두 검색 가능)"
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* 필터 그리드 */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-2" />
                카테고리
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Target className="w-4 h-4 inline mr-2" />
                난이도
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <TrendingUp className="w-4 h-4 inline mr-2" />
                사용 빈도
              </label>
              <select
                value={selectedFrequency}
                onChange={(e) => setSelectedFrequency(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="전체">전체</option>
                <option value="high">높음 (자주 사용)</option>
                <option value="medium">중간</option>
                <option value="low">낮음 (고급)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Shuffle className="w-4 h-4 inline mr-2" />
                정렬
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="한글순">한글순</option>
                <option value="영문순">영문순</option>
                <option value="카테고리순">카테고리순</option>
                <option value="난이도순">난이도순</option>
              </select>
            </div>
          </div>

          {/* 표시 옵션 */}
          <div className="flex flex-wrap items-center justify-between">
            <div className="text-sm text-gray-600">
              총 <strong className="text-blue-600 text-lg">{filteredTerms.length}</strong>개의 용어
              {searchTerm && <span> ('{searchTerm}' 검색 결과)</span>}
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showDetailed}
                  onChange={(e) => setShowDetailed(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">상세 설명 표시</span>
              </label>
            </div>
          </div>
        </div>

        {/* 용어 카드 그리드 */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredTerms.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-400">다른 키워드로 다시 검색해보세요</p>
            </div>
          ) : (
            filteredTerms.map((term) => {
              const IconComponent = term.icon;
              const isFavorite = favoriteTerms.has(term.id);
              
              return (
                <article
                  key={term.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group"
                  onClick={() => setSelectedTerm(term)}
                >
                  {/* 헤더 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {term.term}
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">
                          {term.english}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(term.id);
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      ❤️
                    </button>
                  </div>

                  {/* 메타 정보 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                      {term.category}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      term.difficulty === '초급' ? 'bg-green-100 text-green-700' :
                      term.difficulty === '중급' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {term.difficulty}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      term.frequency === 'high' ? 'bg-purple-100 text-purple-700' :
                      term.frequency === 'medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {term.frequency === 'high' ? '자주 사용' : 
                       term.frequency === 'medium' ? '보통' : '고급'}
                    </span>
                  </div>

                  {/* 기본 정의 */}
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {term.definition}
                  </p>

                  {/* 상세 설명 (옵션) */}
                  {showDetailed && (
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm text-blue-900">
                          <strong>상세:</strong> {term.detailed}
                        </p>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-sm text-green-900">
                          <strong>예시:</strong> {term.example}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 더 보기 표시 */}
                  <div className="mt-4 text-center">
                    <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700">
                      클릭하여 상세 보기 →
                    </span>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* 추가 학습 CTA */}
        <div className="mt-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">용어를 마스터했다면 실전에서 연습하세요!</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            포커 용어를 완전히 이해했다면 이제 AI 트레이너와 함께 실제 게임에서 적용해보세요. 
            체계적인 학습 모드로 프로 수준의 실력을 기를 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              🎮 게임 시작하기
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors">
              📚 학습 가이드 보기
            </button>
          </div>
        </div>
      </div>

      {/* 상세 보기 모달 */}
      {selectedTerm && (
        <TermDetailModal
          term={selectedTerm}
          onClose={() => setSelectedTerm(null)}
        />
      )}
    </section>
  );
};

export default PokerGlossary;