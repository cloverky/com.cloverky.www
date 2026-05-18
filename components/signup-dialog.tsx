"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Refrigerator } from "lucide-react";

interface SignUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignUpDialog({ open, onOpenChange }: SignUpDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    onOpenChange(false);
    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-border bg-card sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <Refrigerator className="h-6 w-6 text-accent" />
          </div>
          <DialogTitle className="text-xl text-foreground">FridgeAI 회원가입</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            AI 기반 스마트 냉장고 관리 서비스를 시작하세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">이름</Label>
            <Input
              id="name"
              placeholder="홍길동"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="border-border bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="border-border bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="8자 이상 입력"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={8}
              className="border-border bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="비밀번호 재입력"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              className="border-border bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, agreeTerms: checked as boolean })
              }
              required
              className="mt-1 border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent"
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed text-muted-foreground">
              <a href="#" className="text-foreground underline hover:text-accent">서비스 이용약관</a> 및{" "}
              <a href="#" className="text-foreground underline hover:text-accent">개인정보 처리방침</a>에 동의합니다.
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-foreground text-background hover:bg-foreground/90"
            disabled={isLoading || !formData.agreeTerms}
          >
            {isLoading ? "처리 중..." : "가입하기"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            이미 계정이 있으신가요?{" "}
            <Link
              href="/login"
              className="text-foreground underline hover:text-accent"
              onClick={() => onOpenChange(false)}
            >
              로그인
            </Link>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
