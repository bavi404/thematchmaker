"use client";

import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "./chart-card";
import type { MonthlyMatchCount } from "@/lib/data/analytics";
import {
  CHART_COLORS,
  chartAxisTick,
  chartTooltipStyle,
} from "@/lib/chart-theme";

interface MatchesSentChartProps {
  data: MonthlyMatchCount[];
}

export function MatchesSentChart({ data }: MatchesSentChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <ChartCard
        title="Matches Sent Per Month"
        description="Curated introductions delivered to clients"
      >
        <div className="h-[280px] min-h-[280px] w-full min-w-0" role="img" aria-label="Bar chart showing matches sent per month">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="matchBarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.95} />
                  <stop offset="100%" stopColor={CHART_COLORS.accent} stopOpacity={0.75} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={CHART_COLORS.grid}
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={chartAxisTick}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={chartAxisTick}
              />
              <Tooltip
                cursor={{ fill: CHART_COLORS.pale, opacity: 0.6 }}
                contentStyle={chartTooltipStyle}
                formatter={(value) => [value, "Matches sent"]}
              />
              <Bar
                dataKey="count"
                radius={[8, 8, 0, 0]}
                maxBarSize={48}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`bar-${index}`}
                    fill={
                      index === data.length - 1
                        ? CHART_COLORS.primary
                        : "url(#matchBarGradient)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </motion.div>
  );
}
