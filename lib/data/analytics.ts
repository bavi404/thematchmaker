import { customers } from "@/lib/data/customers";
import { matches } from "@/lib/data/matches";
import { allCustomerStatuses } from "@/lib/data/dashboard-metrics";
import { calculateCompatibilityScore } from "@/lib/matching";
import { isEligibleCandidate } from "@/lib/matching/utils";
import { clientStatusConfig } from "@/lib/design-system/status";
import type { CustomerStatus } from "@/types";

export interface MonthlyMatchCount {
  readonly month: string;
  readonly count: number;
}

export interface ScoreBucket {
  readonly range: string;
  readonly count: number;
}

export interface StatusCount {
  readonly status: CustomerStatus;
  readonly label: string;
  readonly count: number;
  readonly color: string;
}

const REPORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
] as const;

/** Matches sent per month — agency data seeded with live match records */
export function getMatchesSentPerMonth(): MonthlyMatchCount[] {
  const counts = new Map<string, number>([
    ["Jan", 4],
    ["Feb", 6],
    ["Mar", 5],
    ["Apr", 8],
    ["May", 10],
    ["Jun", 7],
  ]);

  for (const match of matches) {
    const month = new Date(match.proposedAt).toLocaleDateString("en-US", {
      month: "short",
    });
    counts.set(month, (counts.get(month) ?? 0) + 1);
  }

  return REPORT_MONTHS.map((month) => ({
    month,
    count: counts.get(month) ?? 0,
  }));
}

/** Compatibility score distribution across eligible client pairs */
export function getCompatibilityScoreDistribution(): ScoreBucket[] {
  const buckets = [
    { range: "90–100", min: 90, max: 100, count: 0 },
    { range: "75–89", min: 75, max: 89, count: 0 },
    { range: "60–74", min: 60, max: 74, count: 0 },
    { range: "Below 60", min: 0, max: 59, count: 0 },
  ];

  for (const client of customers) {
    for (const candidate of customers) {
      if (!isEligibleCandidate(client, candidate)) continue;
      const score = calculateCompatibilityScore(client, candidate);
      const bucket = buckets.find((b) => score >= b.min && score <= b.max);
      if (bucket) bucket.count += 1;
    }
  }

  return buckets.map(({ range, count }) => ({ range, count }));
}

/** Customer count by pipeline status */
export function getCustomerStatusDistribution(): StatusCount[] {
  const pinkStatusColors: Record<CustomerStatus, string> = {
    NEW: "#FFA0B8",
    VERIFIED: "#FF85A2",
    MATCHING: "#FF4F81",
    "INTRO SENT": "#FF6B94",
    "ACTIVE MATCH": "#E91E63",
    SUCCESS: "#FFB6C1",
  };

  return allCustomerStatuses
    .map((status) => ({
      status,
      label: clientStatusConfig[status].label,
      count: customers.filter((c) => c.status === status).length,
      color: pinkStatusColors[status],
    }))
    .filter((entry) => entry.count > 0);
}

export interface AnalyticsData {
  matchesPerMonth: MonthlyMatchCount[];
  scoreDistribution: ScoreBucket[];
  statusDistribution: StatusCount[];
}

export function getAnalyticsData(): AnalyticsData {
  return {
    matchesPerMonth: getMatchesSentPerMonth(),
    scoreDistribution: getCompatibilityScoreDistribution(),
    statusDistribution: getCustomerStatusDistribution(),
  };
}
