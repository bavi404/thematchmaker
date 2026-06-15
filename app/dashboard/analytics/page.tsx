import { unstable_cache } from "next/cache";
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard";
import { getAnalyticsData } from "@/lib/data/analytics";

const getCachedAnalytics = unstable_cache(
  async () => getAnalyticsData(),
  ["analytics-data"],
  { revalidate: 300 }
);

export default async function AnalyticsPage() {
  const data = await getCachedAnalytics();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-cupid-foreground">
          Analytics
        </h2>
        <p className="mt-1 text-sm text-cupid-muted-foreground">
          Match performance, compatibility insights, and client pipeline health.
        </p>
      </div>

      <AnalyticsDashboard data={data} />
    </div>
  );
}
