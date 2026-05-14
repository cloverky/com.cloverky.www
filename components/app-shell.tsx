"use client";

import { useCallback, useState } from "react";
import { Header } from "@/components/header";
import { OpenSignUpProvider } from "@/components/sign-up-dialog-context";
import { SignUpDialog } from "@/components/signup-dialog";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const openSignUp = useCallback(() => setSignUpOpen(true), []);

  return (
    <OpenSignUpProvider open={openSignUp}>
      <Header onSignUpClick={openSignUp} />
      {children}
      <SignUpDialog open={signUpOpen} onOpenChange={setSignUpOpen} />
    </OpenSignUpProvider>
  );
}
