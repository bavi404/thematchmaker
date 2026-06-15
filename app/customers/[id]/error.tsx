"use client";

import { ErrorFallback } from "@/components/shared/error-fallback";

export default function CustomerError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorFallback
      title="Couldn't load client profile"
      description="There was a problem loading this profile. Please try again."
      reset={reset}
    />
  );
}
