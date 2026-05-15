"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, Refrigerator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GeminiChatDialog } from "@/components/gemini-chat-dialog";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onSignUpClick: () => void;
}

export function Header({ onSignUpClick }: HeaderProps) {
  const [geminiOpen, setGeminiOpen] = useState(false);

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Refrigerator className="h-6 w-6 text-accent" />
            <span className="text-xl font-bold text-foreground">FridgeAI</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            기능
          </Link>
          <Link href="/#agents" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            에이전트
          </Link>
          <Link href="/#architecture" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            아키텍처
          </Link>
          <Link href="/#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            문의
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setGeminiOpen(true)}
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
              "border border-border bg-card text-accent shadow-sm",
              "ring-1 ring-inset ring-white/[0.04]",
              "transition hover:border-accent/35 hover:bg-accent/10 hover:text-accent",
              "focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:outline-none",
            )}
            aria-label="Gemini 채팅 열기"
          >
            <Bot className="h-5 w-5" strokeWidth={1.85} aria-hidden />
          </button>
          <Button
            onClick={onSignUpClick}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            회원가입
          </Button>
          <Button
            variant="outline"
            className="border-border bg-transparent text-foreground hover:bg-secondary"
            asChild
          >
            <Link href="/titanic">[타이타닉]</Link>
          </Button>
          <Button variant="outline" className="border-border bg-transparent text-foreground hover:bg-secondary">
            로그인
          </Button>
        </div>
      </div>
    </header>
    <GeminiChatDialog open={geminiOpen} onOpenChange={setGeminiOpen} />
    </>
  );
}
