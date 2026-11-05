import { ChartNoAxesCombined, Check, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LoginButton } from "./login-button";

const benefits = [
  "Keep every contact organized",
  "Track opportunities in one place",
  "Know what needs your attention next",
];

function BrandLogo() {
  return (
    <div className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 shadow-lg sm:size-11 sm:rounded-2xl">
      <Image
        src="/leadFlow-icon-color.png"
        alt=""
        width={34}
        height={34}
        priority
        className="size-7 object-contain sm:size-[34px]"
      />
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-x-hidden bg-background px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] text-foreground sm:px-6 sm:py-8">
      {/* Background decoration (hidden on small phones for performance) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 hidden size-96 rounded-full bg-violet-300/20 blur-[100px] sm:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 hidden size-96 rounded-full bg-blue-300/20 blur-[110px] sm:block"
      />

      <div className="relative grid w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_70px_-35px_rgba(67,56,202,0.25)] sm:max-w-xl sm:rounded-3xl lg:max-w-5xl lg:grid-cols-[1.05fr_0.95fr]">
        {/* Brand panel */}
        <section className="relative flex flex-col justify-between gap-6 overflow-hidden bg-linear-to-br from-[#17152f] via-[#28205a] to-[#303b85] p-5 text-white sm:gap-8 sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-violet-500/20 blur-[90px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-20 size-80 rounded-full bg-blue-400/15 blur-[90px]"
          />

          {/* Brand */}
          <div className="relative">
            <Link
              href="/"
              aria-label="LeadFlow home"
              className="inline-flex min-h-11 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#17152f]"
            >
              <BrandLogo />
              <span className="text-lg font-semibold tracking-tight sm:text-xl">
                LeadFlow
              </span>
              <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium tracking-wide text-white/85">
                CRM
              </span>
            </Link>
          </div>

          {/* Introduction */}
          <div className="relative max-w-lg">
            <div className="mb-4 hidden items-center gap-2 rounded-full border border-violet-300/25 bg-white/[0.07] px-3.5 py-2 text-xs font-medium uppercase tracking-wide text-violet-100 sm:inline-flex">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
              />
              Your workspace, reimagined
            </div>

            <h1 className="text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              Turn every lead into your next{" "}
              <span className="bg-linear-to-r from-violet-300 via-indigo-200 to-blue-300 bg-clip-text text-transparent">
                opportunity.
              </span>
            </h1>

            <p className="mt-3 hidden max-w-md text-sm leading-6 text-indigo-100/90 sm:block">
              Less time managing spreadsheets. More time building relationships
              and growing your business.
            </p>

            {/* Benefits (tablet and up) */}
            <ul className="mt-6 hidden space-y-3 sm:block">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-400/10 text-emerald-300">
                    <Check aria-hidden="true" className="size-3.5" />
                  </span>
                  <span className="text-sm text-indigo-50/95">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Product highlights (desktop only) */}
            <div className="mt-6 hidden flex-wrap gap-2 lg:flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-2 text-xs text-indigo-100">
                <Users
                  aria-hidden="true"
                  className="size-3.5 text-violet-300"
                />
                Organized contacts
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-2 text-xs text-indigo-100">
                <ChartNoAxesCombined
                  aria-hidden="true"
                  className="size-3.5 text-blue-300"
                />
                Clear sales pipeline
              </span>
            </div>
          </div>

          {/* Footer */}
          <p className="relative hidden text-xs text-indigo-100/75 sm:block">
            © {new Date().getFullYear()} LeadFlow. Built to keep you moving.
          </p>
        </section>

        {/* Authentication panel */}
        <section className="relative flex items-center justify-center bg-card px-5 py-7 sm:px-10 sm:py-10 lg:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 size-64 bg-linear-to-bl from-violet-50/80 to-transparent dark:from-violet-500/10"
          />

          <div className="relative w-full max-w-sm">
            {/* Welcome */}
            <div>
              <div className="mb-5 hidden size-12 items-center justify-center rounded-2xl border border-violet-100 bg-linear-to-br from-violet-50 to-blue-50 shadow-sm lg:flex">
                <Image
                  src="/leadFlow-icon-color.png"
                  alt=""
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
                Welcome to LeadFlow
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Welcome back.
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Sign in to pick up where you left off. Your workspace is waiting
                for you.
              </p>
            </div>

            {/* Authentication */}
            <div className="mt-6 sm:mt-7">
              <div className="mb-4">
                <p className="text-sm font-semibold text-foreground">
                  Continue to your account
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Choose your preferred way to securely sign in.
                </p>
              </div>

              <LoginButton />

              {/* Security divider */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Secure authentication
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Security notice */}
              <div className="rounded-xl border border-border bg-muted/50 p-3.5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-card text-emerald-700 shadow-sm dark:border-emerald-400/20 dark:text-emerald-300">
                    <Check aria-hidden="true" className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Your account stays yours
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Google and GitHub handle sign-in securely. LeadFlow never
                      asks for your account password.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Authorization */}
            <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:hover:text-violet-300"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:hover:text-violet-300"
              >
                Privacy Policy
              </Link>
              .
            </p>

            {/* Home link */}
            <div className="mt-2 text-center">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:hover:text-violet-300"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
