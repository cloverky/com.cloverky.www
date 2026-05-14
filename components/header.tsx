"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Refrigerator } from "lucide-react";

interface HeaderProps {
  onSignUpClick: () => void;
}

export function Header({ onSignUpClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Refrigerator className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold text-foreground">FridgeAI</span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            기능
          </a>
          <a href="#agents" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            에이전트
          </a>
          <a href="#architecture" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            아키텍처
          </a>
          <a href="#contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            문의
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
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
          <Button
            variant="outline"
            className="hidden border-border bg-transparent text-foreground hover:bg-secondary sm:inline-flex"
          >
            로그인
          </Button>
        </div>
      </div>
    </header>
  );
}
