"use client";

import { Bot, ChefHat, Package, Bell, BarChart3, Sparkles } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "실시간 재고 관리",
    description:
      "냉장고 내 식재료를 자동으로 인식하고\n추적하여 재고 현황을 실시간으로 파악합니다.",
  },
  {
    icon: ChefHat,
    title: "맞춤형 레시피 추천",
    description:
      "보유 식재료와 개인 취향을 분석하여\n최적의 레시피를 AI가 추천합니다.",
  },
  {
    icon: Bell,
    title: "스마트 알림",
    description:
      "유통기한 임박, 재고 부족 등을 미리 알려주어\n음식물 낭비를 줄입니다.",
  },
  {
    icon: BarChart3,
    title: "소비 패턴 분석",
    description:
      "식재료 소비 패턴을 분석하여\n효율적인 장보기 리스트를 제안합니다.",
  },
  {
    icon: Bot,
    title: "멀티 에이전트 협업",
    description:
      "각 전문 에이전트가 협업하여\n더 정확하고 빠른 서비스를 제공합니다.",
  },
  {
    icon: Sparkles,
    title: "개인화 학습",
    description:
      "사용할수록 더 정확해지는 AI가\n당신의 취향을 학습합니다.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            주요 기능
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            FridgeAI의 멀티 에이전트 시스템이 제공하는
            <br />
            스마트한 기능들을 만나보세요.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:bg-card/80"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                <feature.icon className="h-6 w-6 text-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
