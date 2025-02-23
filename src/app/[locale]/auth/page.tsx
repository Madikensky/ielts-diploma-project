"use client";

import { SignIn } from "@/features/auth/ui/SignIn";
import { SignUp } from "@/features/auth/ui/SignUp";
import { Header } from "@/shared/ui/Header";
import { useState } from "react";

const Auth = () => {
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

export default Auth;
