import {
  Activity,
  KanbanSquare,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

export const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Contacts", href: "/contacts", icon: Users },
  { label: "Pipeline", href: "/pipeline", icon: KanbanSquare },
  { label: "Activities", href: "/activities", icon: Activity },
  { label: "Settings", href: "/settings", icon: Settings },
];