"use client";

import { Header } from "@/shared/ui/Header";
import { SignIn } from "./ui/SignIn";
import { SignUp } from "./ui/SignUp";
import { useState } from "react";

export const AuthContent = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      {isSignIn ? (
        <SignIn onSwitch={() => setIsSignIn(false)} />
      ) : (
        <SignUp onSwitch={() => setIsSignIn(true)} />
      )}
    </div>
  );
};
