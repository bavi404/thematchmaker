"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { MatchmakerButton } from "@/components/matchmaker";

interface ErrorFallbackProps {
  title?: string;
  description?: string;
  reset?: () => void;
  showHomeLink?: boolean;
}

export function ErrorFallback({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again or return to the dashboard.",
  reset,
  showHomeLink = true,
}: ErrorFallbackProps) {
  return (
    <div
      role="alert"
      className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center"
    >
      <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-red-50">
        <AlertTriangle className="size-7 text-red-500" aria-hidden />
      </span>
      <h1 className="font-heading text-xl font-semibold text-cupid-foreground">
        {title}
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-cupid-muted-foreground">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {reset && (
          <MatchmakerButton variant="gradient" size="sm" onClick={reset}>
            <RefreshCw />
            Try again
          </MatchmakerButton>
        )}
        {showHomeLink && (
          <MatchmakerButton
            variant="outline"
            size="sm"
            render={<Link href="/dashboard" />}
          >
            <Home />
            Back to dashboard
          </MatchmakerButton>
        )}
      </div>
    </div>
  );
}
