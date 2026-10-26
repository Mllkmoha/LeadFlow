"use client";

import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r bg-background md:flex md:flex-col">
      <div className="flex h-19 items-center gap-3 border-b px-5">
        <Link
          href="/dashboard"
          className="flex min-w-0 items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="LeadFlow dashboard"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15">
            <Image
              src="/leadFlow-icon-color.png"
              alt=""
              width={32}
              height={32}
              className="object-contain"
            />
          </div>

          <div className="min-w-0">
            <span className="block text-lg font-bold tracking-tight">
              LeadFlow
            </span>
            <span className="block text-xs text-muted-foreground">
              Customer relationships
            </span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                pathname === item.href ||
                (item.href !== "/dashboard" &&
                  pathname.startsWith(`${item.href}/`))
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon
                className={`size-5 shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(`${item.href}/`))
                    ? "text-primary"
                    : ""
                }`}
              />
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
