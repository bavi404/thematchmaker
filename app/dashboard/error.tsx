"use client";

import { ErrorFallback } from "@/components/shared/error-fallback";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      title="Dashboard unavailable"
      description="We couldn't load the dashboard. Your data is safe — please try again."
      reset={reset}
    />
  );
}
