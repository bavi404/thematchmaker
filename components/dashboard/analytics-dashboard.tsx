"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import type { AnalyticsData } from "@/lib/data/analytics";

const MatchesSentChart = dynamic(
  () =>
    import("./analytics/matches-sent-chart").then((m) => m.MatchesSentChart),
  {
    loading: () => <Skeleton className="h-80 w-full rounded-2xl" />,
    ssr: false,
  }
);

const CompatibilityDistributionChart = dynamic(
  () =>
    import("./analytics/compatibility-distribution-chart").then(
      (m) => m.CompatibilityDistributionChart
    ),
  {
    loading: () => <Skeleton className="h-80 w-full rounded-2xl" />,
    ssr: false,
  }
);

const CustomerStatusChart = dynamic(
  () =>
    import("./analytics/customer-status-chart").then(
      (m) => m.CustomerStatusChart
    ),
  {
    loading: () => <Skeleton className="h-80 w-full rounded-2xl" />,
    ssr: false,
  }
);

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <ErrorBoundary fallbackTitle="Couldn't load matches chart">
          <MatchesSentChart data={data.matchesPerMonth} />
        </ErrorBoundary>
      </div>
      <ErrorBoundary fallbackTitle="Couldn't load compatibility chart">
        <CompatibilityDistributionChart data={data.scoreDistribution} />
      </ErrorBoundary>
      <ErrorBoundary fallbackTitle="Couldn't load status chart">
        <CustomerStatusChart data={data.statusDistribution} />
      </ErrorBoundary>
    </div>
  );
}
