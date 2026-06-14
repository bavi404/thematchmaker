"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type CustomerTab = "profile" | "matches" | "notes";

interface CustomerTabsProps {
  activeTab: CustomerTab;
  onTabChange: (tab: CustomerTab) => void;
  matchCount: number;
  noteCount: number;
}

const tabs: { id: CustomerTab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "matches", label: "Matches" },
  { id: "notes", label: "Notes" },
];

export function CustomerTabs({
  activeTab,
  onTabChange,
  matchCount,
  noteCount,
}: CustomerTabsProps) {
  const counts: Record<CustomerTab, number | null> = {
    profile: null,
    matches: matchCount,
    notes: noteCount,
  };

  return (
    <div className="border-b border-cupid-border/60">
      <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Customer sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "border-cupid-primary text-cupid-primary"
                : "border-transparent text-cupid-muted-foreground hover:border-cupid-secondary hover:text-cupid-foreground"
            )}
          >
            {tab.label}
            {counts[tab.id] !== null && counts[tab.id]! > 0 && (
              <span
                className={cn(
                  "ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold",
                  activeTab === tab.id
                    ? "bg-cupid-primary/15 text-cupid-primary"
                    : "bg-cupid-muted text-cupid-muted-foreground"
                )}
              >
                {counts[tab.id]}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}

interface CustomerTabPanelProps {
  activeTab: CustomerTab;
  tab: CustomerTab;
  children: React.ReactNode;
}

export function CustomerTabPanel({
  activeTab,
  tab,
  children,
}: CustomerTabPanelProps) {
  if (activeTab !== tab) return null;
  return <div className="pt-6">{children}</div>;
}
