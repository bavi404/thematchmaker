"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { MatchmakerCard, MatchmakerCardContent } from "@/components/matchmaker";

export function MetricsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <MatchmakerCard key={i} variant="default" className="p-5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-3 h-8 w-16" />
          <Skeleton className="mt-2 h-3 w-20" />
        </MatchmakerCard>
      ))}
    </div>
  );
}

export function CustomerTableSkeleton() {
  return (
    <MatchmakerCard variant="elevated" className="overflow-hidden">
      <div className="space-y-4 border-b border-cupid-border/40 p-5">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-10 w-full max-w-xs rounded-xl" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-16 rounded-full" />
          ))}
        </div>
      </div>
      <MatchmakerCardContent className="space-y-3 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </MatchmakerCardContent>
    </MatchmakerCard>
  );
}

export function CustomerDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-cupid-border/60">
        <Skeleton className="h-24 w-full rounded-none" />
        <div className="px-6 pb-6">
          <Skeleton className="-mt-12 size-24 rounded-full ring-4 ring-white" />
          <Skeleton className="mt-4 h-7 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
      </div>
      <Skeleton className="h-20 w-full rounded-2xl" />
      <MatchmakerCard variant="elevated" className="p-6">
        <div className="flex gap-4 border-b border-cupid-border/40 pb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20" />
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      </MatchmakerCard>
    </div>
  );
}

export function AnalyticsSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Skeleton className="h-80 w-full rounded-2xl lg:col-span-2" />
      <Skeleton className="h-80 w-full rounded-2xl" />
      <Skeleton className="h-80 w-full rounded-2xl" />
    </div>
  );
}

export function DashboardPageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <MetricsSkeleton />
      <CustomerTableSkeleton />
    </div>
  );
}
