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
  {
    key: "NEW",
    label: "New",
    color: "bg-[var(--stage-new)]",
    textColor: "text-[var(--stage-new)]",
  },
  {
    key: "CONTACTED",
    label: "Contacted",
    color: "bg-[var(--stage-contacted)]",
    textColor: "text-[var(--stage-contacted)]",
  },
  {
    key: "INTERESTED",
    label: "Interested",
    color: "bg-[var(--stage-interested)]",
    textColor: "text-[var(--stage-interested)]",
  },
  {
    key: "CONVERTED",
    label: "Converted",
    color: "bg-[var(--stage-converted)]",
    textColor: "text-[var(--stage-converted)]",
  },
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
              <div key={stage.key} className="flex items-center gap-3 sm:gap-4">
                <div className="w-20 shrink-0 text-sm text-muted-foreground sm:w-24">
                  {stage.label}
                </div>

                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${stage.color}`}
                    style={{ width: `${width}%` }}
                  />
                </div>

                <span
                  className={`w-8 text-right text-sm font-semibold tabular-nums ${stage.textColor}`}
                >
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
