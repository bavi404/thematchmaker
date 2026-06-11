export type { Customer, CustomerStatus, CustomerTier, CustomerPreferences } from "./customer";
export type { Match, MatchStatus, MatchCandidate } from "./match";

export interface DashboardStat {
  label: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "neutral";
}

export interface ActivityDataPoint {
  month: string;
  introductions: number;
  matches: number;
  consultations: number;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
}
