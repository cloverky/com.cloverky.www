"use client";



import { useRef, useState } from "react";

import Link from "next/link";

import { Refrigerator } from "lucide-react";

import { CloverIcon } from "@/components/clover-icon";

import { Button } from "@/components/ui/button";

import { GeminiChatDialog } from "@/components/gemini-chat-dialog";

import { useAuth } from "@/components/auth-context";

import { ThemeToggle } from "@/components/theme-toggle";

import { HeaderMobileNav } from "@/components/header-mobile-nav";

import { HeaderNavMenu } from "@/components/header-nav-menu";

import { cn } from "@/lib/utils";



interface HeaderProps {

  onSignUpClick: () => void;

  onLoginClick: () => void;

}



export function Header({ onSignUpClick, onLoginClick }: HeaderProps) {

  const { user, logout } = useAuth();

  const [geminiOpen, setGeminiOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);



  return (

    <>

      <header

        ref={headerRef}

        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md"

      >

        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">

          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">

            <HeaderMobileNav

              user={user}

              onLoginClick={onLoginClick}

              onSignUpClick={onSignUpClick}

              onGeminiClick={() => setGeminiOpen(true)}

              onLogout={logout}

            />

            <Link href="/" className="flex min-w-0 items-center gap-2">

              <Refrigerator className="h-5 w-5 shrink-0 text-accent sm:h-6 sm:w-6" />

              <span className="truncate text-lg font-bold text-foreground max-md:max-w-[7.5rem] sm:max-w-none sm:text-xl">

                FridgeAI

              </span>

            </Link>

          </div>



          <div

            className={cn(

              "absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2",

              "md:block",

            )}

          >

            <HeaderNavMenu headerRef={headerRef} />

          </div>



          {/* 모바일: Gemini만 / 테마·계정 등은 햄버거 메뉴 */}

          <div className="flex shrink-0 items-center md:hidden">

            <button

              type="button"

              onClick={() => setGeminiOpen(true)}

              className={cn(

                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",

                "border border-border bg-card text-accent shadow-sm",

                "ring-1 ring-inset ring-white/[0.04]",

                "transition hover:border-accent/35 hover:bg-accent/10",

                "focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:outline-none",

              )}

              aria-label="Gemini 채팅 열기"

            >

              <CloverIcon className="h-4 w-4" strokeWidth={1.85} />

            </button>

          </div>



          {/* 태블릿·데스크톱 */}

          <div className="hidden shrink-0 items-center gap-2 md:flex">

            <button

              type="button"

              onClick={() => setGeminiOpen(true)}

              className={cn(

                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10",

                "border border-border bg-card text-accent shadow-sm",

                "ring-1 ring-inset ring-white/[0.04]",

                "transition hover:border-accent/35 hover:bg-accent/10 hover:text-accent",

                "focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:outline-none",

              )}

              aria-label="Gemini 채팅 열기"

            >

              <CloverIcon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.85} />

            </button>

            <Button

              variant="outline"

              size="sm"

              className="h-9 border-border bg-transparent px-3 text-sm text-foreground hover:bg-secondary"

              asChild

            >

              <Link href="/lesson">lesson</Link>

            </Button>

            {user ? (

              <div className="flex items-center gap-2">

                <span className="max-w-[10rem] truncate text-sm font-medium text-foreground">

                  {user.username}님

                </span>

                <Button

                  type="button"

                  variant="outline"

                  size="sm"

                  className="h-9 border-border bg-transparent px-4 text-sm text-foreground hover:bg-secondary"

                  onClick={logout}

                >

                  로그아웃

                </Button>

              </div>

            ) : (

              <>

                <form

                  className="inline"

                  onSubmit={(e) => {

                    e.preventDefault();

                    onLoginClick();

                  }}

                >

                  <Button

                    type="submit"

                    variant="outline"

                    size="sm"

                    className="h-9 border-border bg-transparent px-4 text-sm text-foreground hover:bg-secondary"

                  >

                    로그인

                  </Button>

                </form>

                <form

                  className="inline"

                  onSubmit={(e) => {

                    e.preventDefault();

                    onSignUpClick();

                  }}

                >

                  <Button

                    type="submit"

                    size="sm"

                    className="h-9 bg-foreground px-4 text-sm text-background hover:bg-foreground/90"

                  >

                    회원가입

                  </Button>

                </form>

              </>

            )}

            <ThemeToggle className="h-9 w-9 shadow-sm" />

          </div>

        </div>

      </header>

      <GeminiChatDialog open={geminiOpen} onOpenChange={setGeminiOpen} />

    </>

  );

}


