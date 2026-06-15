"use client";

import { useCallback, useRef, KeyboardEvent } from "react";
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
  const tabRefs = useRef<Map<CustomerTab, HTMLButtonElement>>(new Map());

  const counts: Record<CustomerTab, number | null> = {
    profile: null,
    matches: matchCount,
    notes: noteCount,
  };

  const focusTab = useCallback((tabId: CustomerTab) => {
    tabRefs.current.get(tabId)?.focus();
  }, []);

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    const nextTab = tabs[nextIndex]!.id;
    onTabChange(nextTab);
    focusTab(nextTab);
  }

  return (
    <div className="border-b border-cupid-border/60">
      <div
        role="tablist"
        aria-label="Customer sections"
        className="-mb-px flex gap-1 overflow-x-auto"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const count = counts[tab.id];

          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabRefs.current.set(tab.id, el);
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "relative shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cupid-primary/40 focus-visible:ring-offset-2",
                isActive
                  ? "border-cupid-primary text-cupid-primary"
                  : "border-transparent text-cupid-muted-foreground hover:border-cupid-secondary hover:text-cupid-foreground"
              )}
            >
              {tab.label}
              {count !== null && count > 0 && (
                <span
                  className={cn(
                    "ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold",
                    isActive
                      ? "bg-cupid-primary/15 text-cupid-primary"
                      : "bg-cupid-muted text-cupid-muted-foreground"
                  )}
                  aria-label={`${count} ${tab.label.toLowerCase()}`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
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
  const isActive = activeTab === tab;

  return (
    <div
      role="tabpanel"
      id={`panel-${tab}`}
      aria-labelledby={`tab-${tab}`}
      hidden={!isActive}
      className={cn("pt-6", !isActive && "hidden")}
    >
      {isActive ? children : null}
    </div>
  );
}
