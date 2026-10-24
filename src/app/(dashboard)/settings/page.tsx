import { Settings } from "lucide-react";
import { PageTransition } from "@/components/layout/page-transition";
import { SettingsForm } from "./settings-form";

export default function SettingsPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Settings className="size-4" />
            Account
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your profile and account information.
          </p>
        </div>

        <SettingsForm />
      </div>
    </PageTransition>
  );
}
