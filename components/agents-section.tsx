"use client";

const agents = [
  {
    name: "재고 관리 에이전트",
    description: "냉장고 내부의 식재료를 인식하고 수량, 유통기한을 추적합니다.",
    responsibilities: [
      "식재료 자동 인식 및 분류",
      "재고 수량 실시간 업데이트",
      "유통기한 모니터링",
    ],
  },
  {
    name: "레시피 추천 에이전트",
    description: "현재 보유한 식재료와 사용자 취향을 기반으로 레시피를 추천합니다.",
    responsibilities: [
      "보유 식재료 기반 레시피 매칭",
      "영양 균형 고려 추천",
      "난이도별 레시피 필터링",
    ],
  },
  {
    name: "분석 에이전트",
    description: "소비 패턴을 분석하고 효율적인 식재료 구매를 돕습니다.",
    responsibilities: [
      "주간/월간 소비 리포트",
      "장보기 리스트 자동 생성",
      "비용 절감 인사이트 제공",
    ],
  },
  {
    name: "알림 에이전트",
    description: "중요한 정보를 적시에 사용자에게 전달합니다.",
    responsibilities: [
      "유통기한 임박 알림",
      "재고 부족 알림",
      "레시피 추천 알림",
    ],
  },
];

export function AgentsSection() {
  return (
    <section id="agents" className="border-t border-border bg-card/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            멀티 에이전트 시스템
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            4개의 전문화된 AI 에이전트가 협업하여
            <br />
            최적의 냉장고 관리 경험을 제공합니다.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {agents.map((agent, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-background p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {agent.name}
                </h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {agent.description}
              </p>
              <ul className="mt-4 space-y-2">
                {agent.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
