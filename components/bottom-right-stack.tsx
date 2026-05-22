"use client";

import { WeatherWidget } from "@/components/weather-widget";
import { cn } from "@/lib/utils";

type BottomRightStackProps = {
  className?: string;
};

/** 홈·기능 페이지: 날씨 우하단 고정 (Gemini는 헤더 클로버 버튼 → 다이얼로그) */
export function BottomRightStack({ className }: BottomRightStackProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed z-40 flex flex-col items-end",
        "bottom-4 right-4",
        "pb-[env(safe-area-inset-bottom,0px)] pr-[env(safe-area-inset-right,0px)]",
        "sm:bottom-6 sm:right-6",
        className,
      )}
    >
      <WeatherWidget />
    </div>
  );
}
