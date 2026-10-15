import Link from "next/link";
import {
  Activity,
  KanbanSquare,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

import Image from "next/image";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Contacts",
    href: "/contacts",
    icon: Users,
  },
  {
    label: "Pipeline",
    href: "/pipeline",
    icon: KanbanSquare,
  },
  {
    label: "Activities",
    href: "/activities",
    icon: Activity,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 border-r bg-background md:flex md:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Image
          src="/leadFlow-icon-color.png"
          alt="LeadFlow"
          width={40}
          height={40}
          className="object-contain"
        />

        <Link href="/" className="text-xl font-semibold">
          LeadFlow
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground">LeadFlow CRM</p>
      </div>
    </aside>
  );
}
