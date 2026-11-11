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
};

const statStyles = {
  "Total Contacts": {
    icon: Users,
    color: "text-blue-600 dark:text-blue-400",
    background: "bg-blue-500/10",
  },
  "New Leads": {
    icon: UserPlus,
    color: "text-violet-600 dark:text-violet-400",
    background: "bg-violet-500/10",
  },
  Interested: {
    icon: Heart,
    color: "text-amber-600 dark:text-amber-400",
    background: "bg-amber-500/10",
  },
  Converted: {
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
    background: "bg-emerald-500/10",
  },
  Overdue: {
    icon: Clock,
    color: "text-rose-600 dark:text-rose-400",
    background: "bg-rose-500/10",
  },
  "Due Today": {
    icon: CalendarCheck,
    color: "text-orange-600 dark:text-orange-400",
    background: "bg-orange-500/10",
  },
  Upcoming: {
    icon: CalendarDays,
    color: "text-sky-600 dark:text-sky-400",
    background: "bg-sky-500/10",
  },
};

export function StatCard({
  title,
  value,
  description,
  href,
  highlight = false,
}: StatCardProps) {
  const style = statStyles[title as keyof typeof statStyles];
  const Icon = style?.icon;
  const card = (
    <Card
      className={`h-full ${highlight ? "bg-rose-500/5 ring-rose-500/40" : ""}`}
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
