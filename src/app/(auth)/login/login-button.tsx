"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { FcGoogle } from "react-icons/fc";
import { LoaderCircle } from "lucide-react";

export function LoginButton() {
  const [loadingProvider, setLoadingProvider] = useState<
    "github" | "google" | null
  >(null);
  const handleSignIn = async (provider: "github" | "google") => {
    if (loadingProvider) return;

    setLoadingProvider(provider);

    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error(`${provider} sign-in failed:`, error);
      setLoadingProvider(null);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => handleSignIn("github")}
        disabled={loadingProvider !== null}
        className="group flex w-full items-center justify-center gap-3 rounded-xl border border-slate-900 bg-slate-950 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {loadingProvider === "github" ? (
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

      <button
        type="button"
        onClick={() => handleSignIn("google")}
        disabled={loadingProvider !== null}
        className="group mt-3 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loadingProvider === "google" ? (
          <>
            <LoaderCircle className="size-5 animate-spin" />
            Connecting to Google...
          </>
        ) : (
          <>
            <FcGoogle
              size={22}
              aria-hidden="true"
              className="shrink-0 transition-transform duration-200 group-hover:scale-110"
            />
            Continue with Google
          </>
        )}
      </button>
    </>
  );
}
