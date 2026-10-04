import { ChartNoAxesCombined, Users } from "lucide-react";
import { LoginButton } from "./login-button";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12 text-foreground">
      <div className="pointer-events-none absolute -left-40 -top-40 size-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl lg:grid-cols-2">
        <section className="flex flex-col justify-between p-8 sm:p-12">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Image
                  src="/leadFlow-icon-color.png"
                  alt="LeadFlow"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                LeadFlow
              </span>
            </div>

            <div className="mt-20 max-w-md">
              <p className="text-sm font-medium text-muted-foreground">
                CUSTOMER RELATIONSHIP MANAGEMENT
              </p>

              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Build better
                <br />
                customer relationships.
              </h1>

              <p className="mt-6 max-w-sm leading-7 text-muted-foreground">
                Keep your contacts organized, follow every opportunity, and
                manage your sales pipeline in one place.
              </p>

              <div className="mt-10 space-y-5">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Users className="size-5 text-foreground" />
                  Manage your contacts
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <ChartNoAxesCombined className="size-5 text-foreground" />
                  Track your sales pipeline
                </div>
              </div>
            </div>
          </div>

          <p className="mt-16 text-xs text-muted-foreground">
            LeadFlow · Your work, organized.
          </p>
        </section>

        <section className="flex items-center justify-center border-t border-border bg-muted/30 p-8 sm:p-12 lg:border-l lg:border-t-0">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <p className="text-sm font-medium text-muted-foreground">
                GET STARTED
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Sign in securely with your GitHub account to access your
                workspace.
              </p>
            </div>

            <LoginButton />

            <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
              By continuing, you’ll be redirected to GitHub to authorize your
              sign-in.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
