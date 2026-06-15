"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNavbar } from "@/components/dashboard/top-navbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { AuthGuard } from "@/components/providers/auth-guard";
import { pageTransition } from "@/lib/motion";

interface DashboardShellProps {
  children: React.ReactNode;
  title?: string;
}

function resolveTitle(pathname: string, fallback?: string): string {
  if (pathname.startsWith("/dashboard/analytics")) return "Analytics";
  if (pathname.startsWith("/customers/")) return "Client Profile";
  if (pathname === "/dashboard") return "Dashboard";
  return fallback ?? "Dashboard";
}

export function DashboardShell({ children, title }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const pageTitle = resolveTitle(pathname, title);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gradient-to-br from-rose-50/80 via-white to-amber-50/30">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-cupid-primary focus:shadow-lg focus:ring-2 focus:ring-cupid-primary/30"
        >
          Skip to main content
        </a>

        <aside
          className="hidden w-64 shrink-0 border-r border-rose-100/60 bg-white/60 backdrop-blur-sm lg:block"
          aria-label="Main navigation"
        >
          <Sidebar />
        </aside>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-64 border-rose-100 p-0">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 flex-col">
          <TopNavbar title={pageTitle} onMenuClick={() => setMobileOpen(true)} />
          <main
            id="main-content"
            className="flex-1 overflow-auto p-4 lg:p-6"
            tabIndex={-1}
          >
            <motion.div
              key={pathname}
              initial={pageTransition.initial}
              animate={pageTransition.animate}
              transition={pageTransition.transition}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
