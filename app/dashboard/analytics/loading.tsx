import { AnalyticsSkeleton } from "@/components/shared/loading-skeletons";

export default function AnalyticsLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-cupid-secondary/40" />
        <div className="h-4 w-64 animate-pulse rounded-lg bg-cupid-secondary/30" />
      </div>
      <AnalyticsSkeleton />
    </div>
  );
}
