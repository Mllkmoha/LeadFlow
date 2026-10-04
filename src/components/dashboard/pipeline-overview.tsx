import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stages = [
  { label: "New", value: 12 },
  { label: "Contacted", value: 8 },
  { label: "Interested", value: 5 },
  { label: "Converted", value: 3 },
];

export function PipelineOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline Overview</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {stages.map((stage) => (
            <div key={stage.label} className="flex items-center gap-4">
              <div className="w-24 text-sm text-muted-foreground">
                {stage.label}
              </div>

              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${stage.value * 5}%` }}
                />
              </div>

              <span className="w-8 text-right text-sm font-medium">
                {stage.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
