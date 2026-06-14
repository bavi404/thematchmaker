import { customers } from "@/lib/data/customers";
import { matches } from "@/lib/data/matches";
import type { CustomerStatus } from "@/types";

export interface DashboardMetrics {
  totalCustomers: number;
  matchesSent: number;
  successRate: number;
  pendingIntroductions: number;
}

export function getDashboardMetrics(): DashboardMetrics {
  const totalCustomers = customers.length;

  const matchesSent = matches.filter((m) => m.status !== "declined").length;

  const successful = matches.filter((m) => m.status === "successful").length;
  const successRate =
    matches.length > 0 ? Math.round((successful / matches.length) * 100) : 0;

  const pendingFromMatches = matches.filter((m) => m.status === "proposed").length;
  const pendingFromCustomers = customers.filter(
    (c) => c.status === "MATCHING" || c.status === "VERIFIED"
  ).length;
  const pendingIntroductions = pendingFromMatches + pendingFromCustomers;

  return {
    totalCustomers,
    matchesSent,
    successRate,
    pendingIntroductions,
  };
}

export const allCustomerStatuses: CustomerStatus[] = [
  "NEW",
  "VERIFIED",
  "MATCHING",
  "INTRO SENT",
  "ACTIVE MATCH",
  "SUCCESS",
];
