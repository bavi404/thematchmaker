"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Heart,
  Calendar,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const mainNav = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Clients", href: "/dashboard#clients", icon: Users },
  { title: "Matching", href: "/dashboard#matching", icon: Heart },
  { title: "Consultations", href: "/dashboard#consultations", icon: Calendar },
  { title: "Analytics", href: "/dashboard#analytics", icon: BarChart3 },
];

const secondaryNav = [
  { title: "Settings", href: "/dashboard#settings", icon: Settings },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href.split("#")[0]) && href !== "/dashboard";
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-3 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-rose-400 to-rose-600 shadow-md shadow-rose-200">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="font-heading text-sm font-semibold tracking-wide text-rose-950">
            The MatchMaker
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-rose-400">
            Premium CRM
          </p>
        </div>
      </div>

      <Separator className="bg-rose-100/60" />

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-widest text-rose-300">
            Main
          </p>
          {mainNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-gradient-to-r from-rose-50 to-rose-100/80 text-rose-900 shadow-sm"
                    : "text-rose-700/70 hover:bg-rose-50/60 hover:text-rose-900"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    active ? "text-rose-600" : "text-rose-400"
                  )}
                />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <nav className="mt-6 space-y-1">
          <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-widest text-rose-300">
            System
          </p>
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-700/70 transition-all duration-200 hover:bg-rose-50/60 hover:text-rose-900"
              >
                <Icon className="h-4 w-4 shrink-0 text-rose-400" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="border-t border-rose-100/60 p-4">
        <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50/50 p-4">
          <p className="text-xs font-medium text-rose-900">Concierge Support</p>
          <p className="mt-1 text-[11px] leading-relaxed text-rose-600/80">
            Your dedicated team is available for premium client assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
