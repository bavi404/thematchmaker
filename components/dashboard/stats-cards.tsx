"use client";

import { Users, Heart, Send, Calendar } from "lucide-react";
import { MetricCard, MetricCardGrid } from "@/components/matchmaker";
import type { DashboardStat } from "@/types";

interface StatsCardsProps {
  stats: DashboardStat[];
}

const statIcons = [Users, Send, Heart, Calendar];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <MetricCardGrid>
      {stats.map((stat, index) => {
        const Icon = statIcons[index % statIcons.length];
        return (
          <MetricCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={Icon}
            heartCorner={index === 0}
            index={index}
          />
        );
      })}
    </MetricCardGrid>
  );
}
