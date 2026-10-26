"use client";

import { ChartNoAxesCombined, Users, Check } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { LoginButton } from "./login-button";

const benefits = [
  "Keep every contact organized",
  "Track opportunities in one place",
  "Know what needs your attention next",
];

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8f9ff] px-4 py-3 text-slate-950 lg:h-screen lg:min-h-0 lg:p-4">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 -top-40 size-112 rounded-full bg-violet-300/30 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-120 rounded-full bg-blue-300/30 blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/80 bg-white shadow-[0_24px_70px_-35px_rgba(67,56,202,0.25)] lg:max-h-full lg:grid-cols-[1.05fr_0.95fr]"
      >
        {/* Left: brand and product introduction */}
        <section className="relative flex flex-col justify-between overflow-hidden bg-linear-to-br from-[#17152f] via-[#28205a] to-[#303b85] p-5 text-white sm:p-7 lg:p-8">
          <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-violet-500/25 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 size-80 rounded-full bg-blue-400/20 blur-[90px]" />

          {/* Brand */}
          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur">
                <Image
                  src="/leadFlow-icon-color.png"
                  alt="LeadFlow"
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>

              <span className="text-xl font-semibold tracking-tight">
                LeadFlow
              </span>

              <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/80">
                CRM
              </span>
            </Link>
          </div>

          {/* Introduction */}
          <div className="relative mt-6 max-w-lg lg:mt-0 lg:py-2">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-white/[0.07] px-3.5 py-2 text-xs font-medium text-violet-100 backdrop-blur">
              <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              YOUR WORKSPACE, REIMAGINED
            </div>

            <h1 className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Turn every lead
              <br />
              into your next
              <span className="block bg-linear-to-r from-violet-300 via-indigo-200 to-blue-300 bg-clip-text pb-2 text-transparent">
                opportunity.
              </span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-6 text-indigo-100/75">
              Less time managing spreadsheets. More time building relationships
              and growing your business.
            </p>

            {/* Benefits */}
            <div className="mt-5 space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/10 text-emerald-300">
                    <Check className="size-3.5" />
                  </span>

                  <span className="text-sm text-indigo-50/90">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Product highlights */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-2 text-xs text-indigo-100/90">
                <Users className="size-3.5 text-violet-300" />
                Organized contacts
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-2 text-xs text-indigo-100/90">
                <ChartNoAxesCombined className="size-3.5 text-blue-300" />
                Clear sales pipeline
              </span>
            </div>
          </div>

          {/* Footer */}
          <p className="relative mt-5 text-xs text-indigo-100/50">
            © {new Date().getFullYear()} LeadFlow. Built to keep you moving.
          </p>
        </section>

        {/* Right: sign in */}
        <section className="relative flex items-center justify-center bg-white px-6 py-5 sm:px-8 lg:px-9 lg:py-3">
          <div className="pointer-events-none absolute right-0 top-0 size-64 bg-linear-to-bl from-violet-50 to-transparent" />

          <div className="relative w-full max-w-sm">
            {/* Mobile brand */}
            <div className="mb-4 lg:hidden">
              <Link href="/" className="inline-flex items-center gap-2">
                <Image
                  src="/leadFlow-icon-color.png"
                  alt="LeadFlow"
                  width={34}
                  height={34}
                  className="object-contain"
                />

                <span className="text-lg font-semibold tracking-tight">
                  LeadFlow
                </span>
              </Link>
            </div>

            {/* Welcome */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-violet-100 bg-linear-to-br from-violet-50 to-blue-50 shadow-sm">
                <Image
                  src="/leadFlow-icon-color.png"
                  alt=""
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
                Welcome to LeadFlow
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Welcome back.
              </h2>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                Sign in to pick up where you left off. Your workspace is waiting
                for you.
              </p>
            </motion.div>

            {/* Authentication */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="mt-5"
            >
              <div className="mb-3">
                <p className="text-sm font-semibold text-slate-800">
                  Continue to your account
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Use your GitHub account to securely sign in.
                </p>
              </div>

              <LoginButton />

              {/* Security divider */}
              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />

                <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                  Secure authentication
                </span>

                <div className="h-px flex-1 bg-slate-100" />
              </div>

              {/* Security notice */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-white text-emerald-600 shadow-sm">
                    <Check className="size-4" />
                  </span>

                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      Your account stays yours
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      GitHub handles the sign-in authorization. LeadFlow never
                      asks for your GitHub password.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Authorization note */}
            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              By continuing, you agree to authorize LeadFlow through GitHub.
            </p>

            {/* Home link */}
            <div className="mt-3 text-center">
              <Link
                href="/"
                className="text-xs font-medium text-slate-500 transition-colors hover:text-violet-600"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </section>
      </motion.div>
    </main>
  );
}
