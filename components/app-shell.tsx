"use client";

import { useCallback, useState } from "react";
import { GeminiChatProvider } from "@/components/gemini-chat-context";
import { Header } from "@/components/header";
import { OpenSignUpProvider } from "@/components/sign-up-dialog-context";
import { SignUpDialog } from "@/components/signup-dialog";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const openSignUp = useCallback(() => setSignUpOpen(true), []);

  return (
    <OpenSignUpProvider open={openSignUp}>
      <GeminiChatProvider>
        <Header onSignUpClick={openSignUp} />
        {children}
        <SignUpDialog open={signUpOpen} onOpenChange={setSignUpOpen} />
      </GeminiChatProvider>
    </OpenSignUpProvider>
  );
}
