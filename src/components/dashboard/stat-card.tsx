import Link from "next/link";

import {
  Users,
  UserPlus,
  Heart,
  CheckCircle2,
  Clock,
  CalendarCheck,
  CalendarDays,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  href?: string;
  highlight?: boolean;
  actionLabel?: string;
};

const statStyles = {
  "Total Contacts": {
    icon: Users,
    color: "text-ink",
    background: "bg-rule/10",
  },
  "New Leads": {
    icon: UserPlus,
    color: "text-[var(--stage-new)]",
    background: "bg-[var(--stage-new-tint)]",
  },
  Interested: {
    icon: Heart,
    color: "text-[var(--stage-interested)]",
    background: "bg-[var(--stage-interested-tint)]",
  },
  Converted: {
    icon: CheckCircle2,
    color: "text-[var(--stage-converted)]",
    background: "bg-[var(--stage-converted-tint)]",
  },
  Overdue: {
    icon: Clock,
    color: "text-[var(--activity-overdue)]",
    background: "bg-[var(--activity-overdue-tint)]",
  },
  "Due Today": {
    icon: CalendarCheck,
    color: "text-[var(--activity-due-today)]",
    background: "bg-[var(--activity-due-today-tint)]",
  },
  Upcoming: {
    icon: CalendarDays,
    color: "text-[var(--activity-upcoming)]",
    background: "bg-[var(--activity-upcoming-tint)]",
  },
};

export function StatCard({
  title,
  value,
  description,
  href,
  highlight = false,
  actionLabel,
}: StatCardProps) {
  const style = statStyles[title as keyof typeof statStyles];
  const Icon = style?.icon;
  const card = (
    <Card
      className={`h-full ${highlight ? "bg-[var(--danger-tint)] ring-[var(--danger)]/40" : ""}`}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-1 sm:pb-3">
        <CardTitle className="min-w-0 text-xs font-medium text-muted-foreground sm:text-sm">
          {title}
        </CardTitle>

        {Icon && style && (
          <span
            className={`hidden size-10 shrink-0 items-center justify-center rounded-xl sm:flex ${style.background}`}
          >
            <Icon className={`size-5 ${style.color}`} aria-hidden="true" />
          </span>
        )}
      </CardHeader>

      <CardContent>
        <p className="text-2xl font-bold tracking-tight tabular-nums sm:text-3xl">
          {value}
        </p>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground sm:mt-1 sm:text-sm">
          {description}
        </p>
        {actionLabel && (
          <p className="mt-2 text-xs font-medium text-primary">
            {actionLabel} →
          </p>
        )}
      </CardContent>
    </Card>
  );

  if (!href) {
    return card;
  }

  return (
    <Link
      href={href}
      className="block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {card}
    </Link>
  );
}
