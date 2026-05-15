"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchWeather, weatherIconUrl, type WeatherData } from "@/lib/weather-api";
import { cn } from "@/lib/utils";

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchWeather("Seoul", "KR");
        if (!cancelled) setWeather(data);
      } catch {
        if (!cancelled) {
          setWeather(null);
          setError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <aside
      className={cn(
        "pointer-events-auto self-end",
        "flex items-center gap-2 rounded-full border border-border/60 bg-card/75 px-3 py-1.5",
        "text-xs text-muted-foreground shadow-sm backdrop-blur-md",
      )}
      aria-label="서울 날씨"
    >
      {loading && (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" aria-hidden />
          <span>날씨</span>
        </>
      )}

      {!loading && error && <span className="text-destructive/80">날씨 불가</span>}

      {!loading && weather && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={weatherIconUrl(weather.icon)}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 object-contain"
          />
          <span className="font-medium text-foreground tabular-nums">
            {Math.round(weather.temp_c)}°
          </span>
          <span className="text-foreground/80">{weather.description}</span>
          <span className="text-muted-foreground/80">· 서울</span>
        </>
      )}
    </aside>
  );
}
