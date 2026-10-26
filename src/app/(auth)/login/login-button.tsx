"use client";

import { signIn } from "next-auth/react";
import { SiGithub } from "@icons-pack/react-simple-icons";

export function LoginButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      className="group flex w-full items-center justify-center gap-3 rounded-xl border border-slate-900 bg-slate-950 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 active:translate-y-0"
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
