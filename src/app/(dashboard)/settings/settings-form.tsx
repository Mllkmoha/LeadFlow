"use client";

import { useEffect, useState } from "react";
import { Save, UserRound } from "lucide-react";

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
    return <p className="text-sm text-muted-foreground">Loading settings...</p>;
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
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
              className="h-10 w-full rounded-md border bg-muted px-3 text-sm text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Your email is linked to your GitHub account and cannot be changed
              here.
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium">Member since</p>
            <p className="text-sm text-muted-foreground">
              {new Date(account.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        )}

        {success && (
          <p role="status" className="mt-4 text-sm text-green-600">
            {success}
          </p>
        )}

        <div className="mt-6 flex justify-end border-t pt-5">
          <button
            type="submit"
            disabled={
              saving || name.trim().length < 2 || name.trim().length > 80
            }
            className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="size-4" />
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </section>
    </form>
  );
}
