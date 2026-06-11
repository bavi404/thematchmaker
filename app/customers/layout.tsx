import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell title="Client Profile">{children}</DashboardShell>;
}
