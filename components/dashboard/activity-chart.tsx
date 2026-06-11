"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActivityDataPoint } from "@/types";

interface ActivityChartProps {
  data: ActivityDataPoint[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="rounded-2xl border-rose-100/80 bg-white/80 shadow-sm shadow-rose-100/50">
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-base font-semibold text-rose-950">
            Agency Activity
          </CardTitle>
          <p className="text-xs text-rose-400">
            Introductions, matches, and consultations over time
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] min-h-[280px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="introGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="matchGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4a574" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#d4a574" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#f9a8d4", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#f9a8d4", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #fce7f3",
                    background: "rgba(255,255,255,0.95)",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="introductions"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  fill="url(#introGradient)"
                  name="Introductions"
                />
                <Area
                  type="monotone"
                  dataKey="matches"
                  stroke="#d4a574"
                  strokeWidth={2}
                  fill="url(#matchGradient)"
                  name="Matches"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
