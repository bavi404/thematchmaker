import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { RecentMatches } from "@/components/dashboard/recent-matches";
import { ClientList } from "@/components/dashboard/client-list";
import { dashboardStats, activityData } from "@/lib/data/stats";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-rose-500">
          Welcome back, Sarah. Here is your agency overview.
        </p>
      </div>

      <StatsCards stats={dashboardStats} />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ActivityChart data={activityData} />
        </div>
        <div className="lg:col-span-2">
          <RecentMatches />
        </div>
      </div>

      <ClientList />
    </div>
  );
}
