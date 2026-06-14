"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { CupidCard, CupidCardContent } from "./cupid-card";
import { cn } from "@/lib/utils";

type Trend = "up" | "down" | "neutral";

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  trend?: Trend;
  icon?: LucideIcon;
  description?: string;
  variant?: "default" | "elevated" | "gradient" | "accent";
  heartCorner?: boolean;
  index?: number;
  className?: string;
}

const trendConfig: Record<
  Trend,
  { icon: LucideIcon; className: string }
> = {
  up: {
    icon: TrendingUp,
    className: "bg-emerald-50 text-emerald-700",
  },
  down: {
    icon: TrendingDown,
    className: "bg-red-50 text-red-600",
  },
  neutral: {
    icon: Minus,
    className: "bg-cupid-muted text-cupid-muted-foreground",
  },
};

export function MetricCard({
  label,
  value,
  change,
  trend = "neutral",
  icon: Icon,
  description,
  variant = "elevated",
  heartCorner = false,
  index = 0,
  className,
}: MetricCardProps) {
  const TrendIcon = trendConfig[trend].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <CupidCard
        variant={variant}
        heartCorner={heartCorner}
        className={cn("overflow-hidden", className)}
      >
        <CupidCardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-wider text-cupid-muted-foreground">
              {label}
            </p>
            {Icon && (
              <span className="flex size-8 items-center justify-center rounded-xl bg-cupid-primary/10">
                <Icon className="size-4 text-cupid-primary" />
              </span>
            )}
          </div>

          <div className="mt-3 flex items-end justify-between gap-2">
            <p className="font-heading text-3xl font-semibold text-cupid-foreground">
              {value}
            </p>
            {change !== undefined && (
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                  trendConfig[trend].className
                )}
              >
                <TrendIcon className="size-3" />
                {Math.abs(change)}%
              </div>
            )}
          </div>

          {description && (
            <p className="mt-2 text-xs text-cupid-muted-foreground">
              {description}
            </p>
          )}
        </CupidCardContent>
      </CupidCard>
    </motion.div>
  );
}

interface MetricCardGridProps {
  children: React.ReactNode;
  className?: string;
}

export function MetricCardGrid({ children, className }: MetricCardGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
}
