import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PipelineCounts = {
  NEW: number;
  CONTACTED: number;
  INTERESTED: number;
  CONVERTED: number;
};

type PipelineOverviewProps = {
  counts: PipelineCounts;
};

const stages = [
  { key: "NEW", label: "New" },
  { key: "CONTACTED", label: "Contacted" },
  { key: "INTERESTED", label: "Interested" },
  { key: "CONVERTED", label: "Converted" },
] as const;

export function PipelineOverview({ counts }: PipelineOverviewProps) {
  const maxValue = Math.max(...stages.map((stage) => counts[stage.key]), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline Overview</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {stages.map((stage) => {
            const value = counts[stage.key];
            const width = (value / maxValue) * 100;

            return (
              <div
                key={stage.key}
                className="flex items-center gap-4"
              >
                <div className="w-24 text-sm text-muted-foreground">
                  {stage.label}
                </div>

                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${width}%` }}
                  />
                </div>

                <span className="w-8 text-right text-sm font-medium">
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}