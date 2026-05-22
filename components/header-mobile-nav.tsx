"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { CloverIcon } from "@/components/clover-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { HEADER_NAV_MENUS } from "@/lib/header-nav";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type HeaderMobileNavProps = {
  user: { username: string } | null;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onGeminiClick: () => void;
  onLogout: () => void;
};

export function HeaderMobileNav({
  user,
  onLoginClick,
  onSignUpClick,
  onGeminiClick,
  onLogout,
}: HeaderMobileNavProps) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const handleLogin = () => {
    close();
    onLoginClick();
  };

  const handleSignUp = () => {
    close();
    onSignUpClick();
  };

  const handleGemini = () => {
    close();
    onGeminiClick();
  };

  const handleLogout = () => {
    close();
    onLogout();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 md:hidden"
          aria-label="메뉴 열기"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-[min(100%,20rem)] flex-col gap-0 p-0 sm:max-w-xs">
        <SheetHeader className="border-b border-border px-4 py-4 text-left">
          <SheetTitle className="text-base">메뉴</SheetTitle>
        </SheetHeader>
        <nav className="flex-1 overflow-y-auto px-2 py-2" aria-label="모바일 주요 메뉴">
          <Accordion type="single" collapsible className="w-full">
            {HEADER_NAV_MENUS.map((menu) => (
              <AccordionItem key={menu.label} value={menu.label} className="border-border/60">
                <AccordionTrigger
                  className={cn(
                    "px-2 text-[0.9375rem] font-semibold hover:no-underline",
                    "[&[data-state=open]]:text-accent",
                  )}
                >
                  {menu.label}
                </AccordionTrigger>
                <AccordionContent className="pb-3 pt-0">
                  <ul className="space-y-0.5">
                    {menu.items.map((item) => (
                      <li key={`${menu.label}-${item.href}-${item.label}`}>
                        <Link
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          onClick={close}
                          className={cn(
                            "block rounded-lg px-3 py-2.5 transition-colors",
                            "hover:bg-accent/12 hover:text-accent",
                            "focus-visible:bg-accent/12 focus-visible:outline-none",
                          )}
                        >
                          <span className="block text-sm font-medium text-foreground">
                            {item.label}
                          </span>
                          {item.description ? (
                            <span className="mt-0.5 block text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </nav>
        <div className="mt-auto space-y-2 border-t border-border px-4 py-4">
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2">
            <span className="text-sm font-medium text-foreground">화면 테마</span>
            <ThemeToggle className="h-9 w-9 shadow-sm" />
          </div>
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full justify-start gap-2"
            onClick={handleGemini}
          >
            <CloverIcon className="h-4 w-4 text-accent" strokeWidth={1.85} />
            Gemini 채팅
          </Button>
          <Button variant="outline" className="h-10 w-full" asChild>
            <Link href="/lesson" onClick={close}>
              lesson
            </Link>
          </Button>
          {user ? (
            <>
              <p className="px-1 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{user.username}</span>님
              </p>
              <Button
                type="button"
                variant="outline"
                className="h-10 w-full"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Button type="button" variant="outline" className="h-10 w-full" onClick={handleLogin}>
                로그인
              </Button>
              <Button type="button" className="h-10 w-full" onClick={handleSignUp}>
                회원가입
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
