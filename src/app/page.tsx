"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  KanbanSquare,
  Users,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  Check,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold tracking-tight"
          >
            <Image
              src="/leadFlow-icon-color.png"
              alt="LeadFlow"
              width={40}
              height={40}
              className="object-contain"
            />
            LeadFlow
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </Link>

            <Link
              href="/login"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute left-1/2 -top-45 h-115 w-190 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
          <div className="absolute left-[10%] top-95 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_78%)]" />
        </div>

        <div className="mx-auto max-w-350 px-5 pb-20 pt-20 sm:px-8 sm:pt-28 lg:pb-28 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border bg-background/70 px-4 py-2 text-sm shadow-sm backdrop-blur"
            >
              <Sparkles className="size-4 text-primary" />
              <span className="text-muted-foreground">
                Meet your new favorite CRM
              </span>
              <ArrowRight className="size-3.5 text-primary" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-5xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-6xl lg:text-8xl"
            >
              Every lead has
              <br />
              <span className="bg-linear-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                a next step.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
            >
              Keep your contacts, sales pipeline, and follow-ups in one focused
              workspace. Spend less time organizing and more time building
              relationships.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
            >
              <Link
                href="/login"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
              >
                Get started
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border bg-background/70 px-6 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Explore LeadFlow
                <ArrowUpRight className="size-4" />
              </Link>
            </motion.div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" />
                Contacts in one place
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" />
                Visual sales pipeline
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-primary" />
                Activity tracking
              </span>
            </div>
          </div>

          {/* Product preview */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mx-auto mt-16 max-w-6xl sm:mt-20"
          >
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />

            <div className="overflow-hidden rounded-2xl border bg-card shadow-2xl shadow-black/10 ring-1 ring-black/5 dark:ring-white/10">
              <div className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="size-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold">LeadFlow</span>
                  <span className="hidden rounded-md border px-2 py-0.5 text-[10px] text-muted-foreground sm:inline-flex">
                    WORKSPACE
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  Dashboard preview
                </span>
              </div>

              <div className="grid min-h-75 sm:grid-cols-[180px_1fr]">
                <aside className="hidden border-r bg-muted/20 p-4 sm:block">
                  <p className="mb-4 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Workspace
                  </p>
                  {["Dashboard", "Contacts", "Pipeline", "Activities"].map(
                    (item, index) => (
                      <div
                        key={item}
                        className={`mb-1 rounded-lg px-3 py-2.5 text-xs font-medium ${
                          index === 0
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item}
                      </div>
                    ),
                  )}
                </aside>

                <div className="min-w-0 p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold tracking-tight">
                        Overview
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Your customer relationships at a glance.
                      </p>
                    </div>
                    <span className="rounded-lg border px-3 py-2 text-xs text-muted-foreground">
                      All contacts
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {[
                      {
                        label: "Total contacts",
                        value: "1,284",
                        color: "bg-blue-500",
                      },
                      {
                        label: "New leads",
                        value: "186",
                        color: "bg-violet-500",
                      },
                      {
                        label: "Interested",
                        value: "64",
                        color: "bg-amber-500",
                      },
                      {
                        label: "Converted",
                        value: "32",
                        color: "bg-emerald-500",
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border p-3 sm:p-4"
                      >
                        <div
                          className={`mb-3 size-2 rounded-full ${stat.color}`}
                        />
                        <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-xl border p-4 sm:p-5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold">Sales pipeline</p>
                        <TrendingUp className="size-4 text-muted-foreground" />
                      </div>
                      <div className="mt-5 space-y-4">
                        {[
                          { label: "New", value: 78, color: "bg-blue-500" },
                          {
                            label: "Contacted",
                            value: 56,
                            color: "bg-violet-500",
                          },
                          {
                            label: "Interested",
                            value: 34,
                            color: "bg-amber-500",
                          },
                          {
                            label: "Converted",
                            value: 22,
                            color: "bg-emerald-500",
                          },
                        ].map((stage) => (
                          <div
                            key={stage.label}
                            className="flex items-center gap-3"
                          >
                            <span className="w-20 text-xs text-muted-foreground">
                              {stage.label}
                            </span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                              <div
                                className={`h-full rounded-full ${stage.color}`}
                                style={{ width: `${stage.value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl border p-4 sm:p-5">
                      <p className="text-sm font-semibold">Recent activity</p>
                      <div className="mt-4 space-y-4">
                        {[
                          {
                            initials: "JD",
                            name: "Jordan Davis",
                            action: "Contact added",
                            color: "bg-blue-500/10 text-blue-600",
                          },
                          {
                            initials: "AM",
                            name: "Alex Morgan",
                            action: "Follow-up completed",
                            color: "bg-violet-500/10 text-violet-600",
                          },
                          {
                            initials: "SK",
                            name: "Sam Kim",
                            action: "Status updated",
                            color: "bg-emerald-500/10 text-emerald-600",
                          },
                        ].map((activity) => (
                          <div
                            key={activity.initials}
                            className="flex items-center gap-3"
                          >
                            <div
                              className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${activity.color}`}
                            >
                              {activity.initials}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-xs font-medium">
                                {activity.name}
                              </p>
                              <p className="mt-1 truncate text-[10px] text-muted-foreground">
                                {activity.action}
                              </p>
                            </div>
                            <Check className="ml-auto size-3.5 shrink-0 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              A preview of the LeadFlow workspace
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-semibold tracking-tight">
              Everything you need to manage leads
            </h2>
            <p className="mt-3 text-muted-foreground">
              Keep your customer relationships organized from first contact to
              conversion.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={Users}
              title="Contact management"
              description="Keep customer information organized and accessible in one place."
            />

            <FeatureCard
              icon={KanbanSquare}
              title="Sales pipeline"
              description="Track leads through every stage of your sales process."
            />

            <FeatureCard
              icon={BarChart3}
              title="Insights"
              description="Understand your pipeline and monitor your customer activity."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border bg-card px-6 py-16 text-center shadow-sm"
        >
          <h2 className="text-3xl font-semibold tracking-tight">
            Ready to organize your leads?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Start managing your customer relationships with LeadFlow.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get started
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-sm text-muted-foreground"
        >
          <span>© 2026 LeadFlow</span>
          <span>Customer relationship management, simplified.</span>
        </motion.div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Users;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border bg-card p-6"
    >
      <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" />
      </div>

      <h3 className="font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}
