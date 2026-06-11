"use client";

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardStat } from "@/types";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  stats: DashboardStat[];
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => {
        const TrendIcon = trendIcons[stat.trend];
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <Card className="overflow-hidden rounded-2xl border-rose-100/80 bg-white/80 shadow-sm shadow-rose-100/50 backdrop-blur-sm">
              <CardContent className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-rose-400">
                  {stat.label}
                </p>
                <div className="mt-2 flex items-end justify-between">
                  <p className="font-heading text-3xl font-semibold text-rose-950">
                    {stat.value}
                  </p>
                  <div
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                      stat.trend === "up" && "bg-emerald-50 text-emerald-700",
                      stat.trend === "down" && "bg-rose-50 text-rose-600",
                      stat.trend === "neutral" && "bg-rose-50 text-rose-500"
                    )}
                  >
                    <TrendIcon className="h-3 w-3" />
                    {Math.abs(stat.change)}%
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
