"use client";

import { Users, Send, TrendingUp, Clock } from "lucide-react";
import { MetricCard, MetricCardGrid } from "@/components/matchmaker";
import type { DashboardMetrics } from "@/lib/data/dashboard-metrics";

interface DashboardMetricsCardsProps {
  metrics: DashboardMetrics;
}

export function DashboardMetricsCards({ metrics }: DashboardMetricsCardsProps) {
  return (
    <MetricCardGrid>
      <MetricCard
        label="Total Customers"
        value={metrics.totalCustomers}
        icon={Users}
        heartCorner
        variant="elevated"
        index={0}
        description="Active client profiles in your portfolio"
      />
      <MetricCard
        label="Matches Sent"
        value={metrics.matchesSent}
        icon={Send}
        variant="gradient"
        index={1}
        description="Introductions and proposals delivered"
      />
      <MetricCard
        label="Success Rate"
        value={`${metrics.successRate}%`}
        icon={TrendingUp}
        variant="accent"
        index={2}
        description="Successful matches vs. total pairings"
      />
      <MetricCard
        label="Pending Introductions"
        value={metrics.pendingIntroductions}
        icon={Clock}
        variant="default"
        index={3}
        description="Awaiting consultant action"
      />
    </MetricCardGrid>
  );
}
