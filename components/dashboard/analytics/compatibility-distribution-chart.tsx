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
import type { ScoreBucket } from "@/lib/data/analytics";
import {
  CHART_COLORS,
  CHART_PINK_SCALE,
  chartAxisTick,
  chartTooltipStyle,
} from "@/lib/chart-theme";

interface CompatibilityDistributionChartProps {
  data: ScoreBucket[];
}

export function CompatibilityDistributionChart({
  data,
}: CompatibilityDistributionChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08 }}
    >
      <ChartCard
        title="Compatibility Score Distribution"
        description="Score spread across eligible client pairings"
      >
        <div className="h-[280px] min-h-[280px] w-full min-w-0" role="img" aria-label="Bar chart showing compatibility score distribution">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={CHART_COLORS.grid}
                vertical={false}
              />
              <XAxis
                dataKey="range"
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
                formatter={(value) => [value, "Pairings"]}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={56}>
                {data.map((_, index) => (
                  <Cell
                    key={`score-${index}`}
                    fill={CHART_PINK_SCALE[index % CHART_PINK_SCALE.length]}
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
