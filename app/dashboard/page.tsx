import { DashboardMetricsCards } from "@/components/dashboard/dashboard-metrics";
import { CustomerTable } from "@/components/dashboard/customer-table";
import { getDashboardMetrics } from "@/lib/data/dashboard-metrics";

export default function DashboardPage() {
  const metrics = getDashboardMetrics();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-cupid-foreground">
          Agency Overview
        </h2>
        <p className="mt-1 text-sm text-cupid-muted-foreground">
          Welcome back, Sarah. Monitor clients, matches, and introductions at a glance.
        </p>
      </div>

      <DashboardMetricsCards metrics={metrics} />

      <CustomerTable />
    </div>
  );
}
