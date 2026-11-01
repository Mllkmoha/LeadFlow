"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LoaderCircle } from "lucide-react";

export function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      await signIn("github", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("GitHub sign-in failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignIn}
      disabled={isLoading}
      className="group flex w-full items-center justify-center gap-3 rounded-xl border border-slate-900 bg-slate-950 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
    >
      {isLoading ? (
        <>
          <LoaderCircle className="size-5 animate-spin" />
          Connecting to GitHub...
        </>
      ) : (
        <>
          <SiGithub
            size={20}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:scale-110"
          />
          Continue with GitHub
        </>
      )}
    </button>
  );
}
