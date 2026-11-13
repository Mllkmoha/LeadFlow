import { PageTransition } from "@/components/layout/page-transition";
import { SettingsForm } from "./settings-form";

export default function SettingsPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
        <p className="text-sm text-muted-foreground sm:text-base">
          Manage your profile and account information.
        </p>

        <SettingsForm />
      </div>
    </PageTransition>
  );
}
