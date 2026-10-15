"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  KanbanSquare,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b">
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
      <section className="mx-auto max-w-7xl px-6 py-24 text-center lg:py-32">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-sm text-muted-foreground"
          >
            <CheckCircle2 className="size-4" />
            Simple CRM for growing teams
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Turn leads into <span className="text-primary">relationships.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
          >
            LeadFlow helps you organize contacts, manage your sales pipeline,
            track activities, and build stronger customer relationships.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/login"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              Start using LeadFlow
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg border px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted"
            >
              View dashboard
            </Link>
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
           className="mx-auto max-w-2xl text-center">
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
