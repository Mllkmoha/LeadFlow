"use client";

import { signIn } from "next-auth/react";
import { SiGithub } from "@icons-pack/react-simple-icons";

export function LoginButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      className="group flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-0"
    >
      <span aria-hidden="true" className="text-lg font-bold">
        <SiGithub
          size={20}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:scale-110"
        />
      </span>
      Continue with GitHub
    </button>
  );
}
