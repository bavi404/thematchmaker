import type { ActivityDataPoint, DashboardStat } from "@/types";

export const dashboardStats: DashboardStat[] = [
  {
    label: "Active Clients",
    value: 248,
    change: 12,
    trend: "up",
  },
  {
    label: "Introductions This Month",
    value: 34,
    change: 8,
    trend: "up",
  },
  {
    label: "Successful Matches",
    value: 18,
    change: 3,
    trend: "up",
  },
  {
    label: "Pending Consultations",
    value: 12,
    change: -2,
    trend: "down",
  },
];

export const activityData: ActivityDataPoint[] = [
  { month: "Jan", introductions: 22, matches: 8, consultations: 45 },
  { month: "Feb", introductions: 28, matches: 11, consultations: 52 },
  { month: "Mar", introductions: 25, matches: 9, consultations: 48 },
  { month: "Apr", introductions: 31, matches: 14, consultations: 55 },
  { month: "May", introductions: 29, matches: 12, consultations: 51 },
  { month: "Jun", introductions: 34, matches: 18, consultations: 58 },
];
