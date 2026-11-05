"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";

type Provider = "github" | "google";

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="size-5 shrink-0"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.29-5.27-5.73 0-1.27.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.16 1.19a10.98 10.98 0 0 1 5.76 0c2.2-1.5 3.16-1.19 3.16-1.19.63 1.59.23 2.77.12 3.06.74.81 1.18 1.84 1.18 3.11 0 4.45-2.7 5.43-5.28 5.72.42.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="size-5 shrink-0">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.93c-.58 2.96-2.26 5.48-4.73 7.18l7.3 5.66c4.26-3.93 6.48-9.72 6.48-17.31Z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.95 23.95 0 0 0 0 21.56l7.98-6.19Z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.47 0 11.92-2.13 15.9-5.8l-7.3-5.66c-2.03 1.36-4.63 2.16-8.6 2.16-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
      />
    </svg>
  );
}

export function LoginButton() {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  async function handleSignIn(provider: Provider) {
    if (loadingProvider !== null) return;

    setLoadingProvider(provider);

    try {
      await signIn(provider, {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error(`${provider} sign-in failed:`, error);
      setLoadingProvider(null);
    }
  }

  const isLoading = loadingProvider !== null;

  return (
    <div className="space-y-3" aria-busy={isLoading}>
      <button
        type="button"
        onClick={() => handleSignIn("github")}
        disabled={isLoading}
        className="group flex h-12 w-full touch-manipulation items-center justify-center gap-3 rounded-xl border border-slate-900 bg-slate-950 px-5 text-base font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transform-none motion-reduce:transition-none sm:text-sm sm:hover:-translate-y-0.5 sm:hover:shadow-xl sm:hover:shadow-slate-900/15"
      >
        {loadingProvider === "github" ? (
          <>
            <LoaderCircle
              className="size-5 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
            <span>Connecting with GitHub...</span>
          </>
        ) : (
          <>
            <GithubIcon />
            <span>Continue with GitHub</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={() => handleSignIn("google")}
        disabled={isLoading}
        className="group flex h-12 w-full touch-manipulation items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 text-base font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transform-none motion-reduce:transition-none sm:text-sm sm:hover:-translate-y-0.5 sm:hover:shadow-md"
      >
        {loadingProvider === "google" ? (
          <>
            <LoaderCircle
              className="size-5 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
            <span>Connecting with Google...</span>
          </>
        ) : (
          <>
            <GoogleIcon />
            <span>Continue with Google</span>
          </>
        )}
      </button>

      <p className="sr-only" role="status" aria-live="polite">
        {loadingProvider
          ? `Connecting with ${loadingProvider === "github" ? "GitHub" : "Google"}`
          : ""}
      </p>
    </div>
  );
}