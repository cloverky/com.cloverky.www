"use client";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            시스템 아키텍처
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            확장 가능하고 안정적인
            <br />
            멀티 에이전트 아키텍처로 설계되었습니다.
          </p>
        </div>

        <div className="mt-16">
          <div className="rounded-xl border border-border bg-card p-8">
            {/* Architecture diagram */}
            <div className="flex flex-col items-center gap-8">
              {/* User layer */}
              <div className="w-full max-w-md">
                <div className="rounded-lg border border-border bg-secondary p-4 text-center">
                  <span className="text-sm font-medium text-foreground">사용자 인터페이스</span>
                  <p className="mt-1 text-xs text-muted-foreground">웹 / 모바일 앱</p>
                </div>
              </div>

              <div className="h-8 w-px bg-border" />

              {/* API Gateway */}
              <div className="w-full max-w-lg">
                <div className="rounded-lg border border-accent/50 bg-accent/10 p-4 text-center">
                  <span className="text-sm font-medium text-foreground">API Gateway</span>
                  <p className="mt-1 text-xs text-muted-foreground">인증 / 라우팅 / 로드밸런싱</p>
                </div>
              </div>

              <div className="h-8 w-px bg-border" />

              {/* Agent Orchestrator */}
              <div className="w-full max-w-2xl">
                <div className="rounded-lg border border-border bg-background p-4 text-center">
                  <span className="text-sm font-medium text-foreground">에이전트 오케스트레이터</span>
                  <p className="mt-1 text-xs text-muted-foreground">에이전트 조정 및 태스크 분배</p>
                </div>
              </div>

              <div className="flex w-full max-w-4xl items-center justify-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <div className="h-px flex-1 bg-border" />
                <div className="h-px flex-1 bg-border" />
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Agents */}
              <div className="grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
                {["재고 에이전트", "레시피 에이전트", "분석 에이전트", "알림 에이전트"].map((agent, index) => (
                  <div key={index} className="rounded-lg border border-border bg-secondary p-3 text-center">
                    <span className="text-xs font-medium text-foreground">{agent}</span>
                  </div>
                ))}
              </div>

              <div className="flex w-full max-w-4xl items-center justify-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Data layer */}
              <div className="grid w-full max-w-2xl grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-card p-3 text-center">
                  <span className="text-xs font-medium text-foreground">Vector DB</span>
                  <p className="mt-1 text-xs text-muted-foreground">레시피 임베딩</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-3 text-center">
                  <span className="text-xs font-medium text-foreground">PostgreSQL</span>
                  <p className="mt-1 text-xs text-muted-foreground">사용자 / 재고 데이터</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">기술 스택</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
            {["Next.js", "LangChain", "OpenAI", "PostgreSQL", "Pinecone", "Vercel"].map((tech) => (
              <span key={tech} className="text-sm font-medium text-foreground/60">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
