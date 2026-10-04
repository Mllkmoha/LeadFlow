import { StatCard } from "@/components/dashboard/stat-card";
import { RecentContacts } from "@/components/dashboard/recent-contacts";
import { PipelineOverview } from "@/components/dashboard/pipeline-overview";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your customer relationships.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Contacts" value="0" description="All contacts" />

        <StatCard title="New Leads" value="0" description="Added this month" />

        <StatCard
          title="Interested"
          value="0"
          description="Potential customers"
        />

        <StatCard
          title="Converted"
          value="0"
          description="Successful conversions"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentContacts />
        <PipelineOverview />
      </div>
    </div>
  );
}
