"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Refrigerator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useOpenSignUp } from "@/components/sign-up-dialog-context";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const router = useRouter();
  const openSignUp = useOpenSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (password.length < 8) {
        setError("비밀번호는 8자 이상이어야 합니다.");
        return;
      }
      // TODO: 백엔드 로그인 API 연동
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.push("/");
    } catch {
      setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-border/70 bg-card p-8 shadow-lg",
        "ring-1 ring-inset ring-white/[0.04] dark:ring-white/[0.06]",
      )}
    >
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
          <Refrigerator className="h-6 w-6 text-accent" />
        </div>
        <h1 className="text-xl font-semibold text-foreground">FridgeAI 로그인</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          계정으로 로그인하고 스마트 냉장고 서비스를 이용하세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email">이메일</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-border bg-background"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">비밀번호</Label>
            <button
              type="button"
              className="text-xs text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
            >
              비밀번호 찾기
            </button>
          </div>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="border-border bg-background"
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={remember}
            onCheckedChange={(checked) => setRemember(checked === true)}
            className="border-border data-[state=checked]:border-accent data-[state=checked]:bg-accent"
          />
          <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
            로그인 상태 유지
          </Label>
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full bg-foreground text-background hover:bg-foreground/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              로그인 중…
            </>
          ) : (
            "로그인"
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          아직 계정이 없으신가요?{" "}
          <button
            type="button"
            className="font-medium text-foreground underline-offset-4 hover:text-accent hover:underline"
            onClick={() => {
              router.push("/");
              openSignUp();
            }}
          >
            회원가입
          </button>
        </p>

        <p className="text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            홈으로 돌아가기
          </Link>
        </p>
      </form>
    </div>
  );
}
