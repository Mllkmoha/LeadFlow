"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  Download,
  Laptop,
  Moon,
  Palette,
  Save,
  Sun,
  UserRound,
} from "lucide-react";

type AccountSettings = {
  name: string | null;
  email: string;
  createdAt: string;
};

export function SettingsForm() {
  const [account, setAccount] = useState<AccountSettings | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch("/api/settings");

        if (!response.ok) {
          throw new Error("Failed to load account settings.");
        }

        const data: AccountSettings = await response.json();
        setAccount(data);
        setName(data.name ?? "");
      } catch {
        setError("Could not load your account settings.");
      } finally {
        setLoading(false);
      }
    }

    void loadSettings();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (saving) return;

    setSaving(true);

    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to save changes.");
      }

      setAccount(data);
      setName(data.name ?? "");
      setSuccess("Your name has been updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div
        className="animate-pulse space-y-4 sm:space-y-6"
        role="status"
        aria-label="Loading settings"
      >
        <div className="space-y-5 rounded-xl border bg-muted-foreground/5 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-muted-foreground/15" />
            <div className="space-y-2">
              <div className="h-4 w-20 rounded bg-muted-foreground/15" />
              <div className="h-3 w-48 rounded bg-muted-foreground/15" />
            </div>
          </div>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3.5 w-24 rounded bg-muted-foreground/15" />
              <div className="h-11 rounded-lg bg-muted-foreground/15" />
            </div>
          ))}
          <div className="h-11 rounded-lg bg-muted-foreground/15" />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (!account) {
    return (
      <p role="alert" className="text-sm text-destructive">
        {error || "Account settings are unavailable."}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-xl border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <UserRound className="size-5" />
          </div>
          <div>
            <h2 className="font-semibold">Profile</h2>
            <p className="text-sm text-muted-foreground">
              Manage your account information.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full name
            </label>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              minLength={2}
              maxLength={80}
              required
              autoComplete="name"
              className="h-11 w-full rounded-lg border bg-background px-3 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 sm:h-10 sm:text-sm"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email address
            </label>
            <input
              id="email"
              name="email"
              value={account.email}
              readOnly
              className="h-11 w-full rounded-lg border bg-muted px-3 text-base text-muted-foreground sm:h-10 sm:text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Your email comes from your sign-in provider and cannot be changed
              here.
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium">Member since</p>
            <p className="text-sm text-muted-foreground">
              {new Date(account.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        )}

        {success && (
          <p
            role="status"
            className="mt-4 text-sm text-emerald-600 dark:text-emerald-400"
          >
            {success}
          </p>
        )}

        <div className="mt-6 flex border-t pt-5 sm:justify-end">
          <button
            type="submit"
            disabled={
              saving || name.trim().length < 2 || name.trim().length > 80
            }
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-auto"
          >
            <Save className="size-4" />
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </section>

      {/* Appearance */}
      <section className="rounded-xl border bg-card p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Palette className="size-5" />
          </div>
          <div>
            <h2 className="font-semibold">Appearance</h2>
            <p className="text-sm text-muted-foreground">
              Customize how LeadFlow looks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { value: "light", label: "Light", icon: Sun },
            { value: "dark", label: "Dark", icon: Moon },
            { value: "system", label: "System", icon: Laptop },
          ].map((option) => {
            const Icon = option.icon;
            const selected = theme === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTheme(option.value)}
                aria-pressed={selected}
                className={`flex flex-col items-center gap-2 rounded-lg border p-3 text-sm transition-colors sm:flex-row sm:gap-3 sm:p-4 ${
                  selected ? "border-primary bg-primary/5" : "hover:bg-muted"
                }`}
              >
                <Icon className="size-5" />
                <span className="font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Data */}
      <section className="rounded-xl border bg-card p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-3 sm:mb-6">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Download className="size-5" />
          </div>
          <div>
            <h2 className="font-semibold">Your data</h2>
            <p className="text-sm text-muted-foreground">
              Download everything you stored in LeadFlow.
            </p>
          </div>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          Export all your contacts and activities as a CSV file that opens in
          Excel or Google Sheets. You own your data.
        </p>

        <a
          href="/api/export"
          download
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted sm:h-10 sm:w-auto"
        >
          <Download className="size-4" />
          Export my data (CSV)
        </a>
      </section>
    </form>
  );
}
