"use client";

import { motion } from "framer-motion";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartCard } from "./chart-card";
import type { StatusCount } from "@/lib/data/analytics";
import { CHART_COLORS, chartTooltipStyle } from "@/lib/chart-theme";

interface CustomerStatusChartProps {
  data: StatusCount[];
}

export function CustomerStatusChart({ data }: CustomerStatusChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.16 }}
    >
      <ChartCard
        title="Customer Status Distribution"
        description={`${total} clients across the matchmaking pipeline`}
      >
        <div className="h-[280px] min-h-[280px] w-full min-w-0" role="img" aria-label="Donut chart showing customer status distribution">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <PieChart>
              <defs>
                {data.map((entry) => (
                  <linearGradient
                    key={entry.status}
                    id={`status-${entry.status.replace(/\s/g, "")}`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                    <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={data}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={96}
                paddingAngle={3}
                stroke={CHART_COLORS.pale}
                strokeWidth={2}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.status}
                    fill={`url(#status-${entry.status.replace(/\s/g, "")})`}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={chartTooltipStyle}
                formatter={(value, _name, props) => {
                  const count = Number(value);
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  const label =
                    props && typeof props === "object" && "payload" in props
                      ? (props.payload as StatusCount).label
                      : "Clients";
                  return [`${count} (${pct}%)`, label];
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-xs text-cupid-muted-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </motion.div>
  );
}
