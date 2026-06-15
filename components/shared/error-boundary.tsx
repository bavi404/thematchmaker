"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { MatchmakerButton } from "@/components/matchmaker";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, info);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50/50 px-6 py-12 text-center"
        >
          <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-red-100">
            <AlertTriangle className="size-5 text-red-600" aria-hidden />
          </span>
          <h3 className="font-heading text-base font-semibold text-cupid-foreground">
            {this.props.fallbackTitle ?? "Something went wrong"}
          </h3>
          <p className="mt-1.5 max-w-sm text-sm text-cupid-muted-foreground">
            {this.props.fallbackDescription ??
              "We couldn't load this section. Please try again."}
          </p>
          <MatchmakerButton
            variant="outline"
            size="sm"
            className="mt-5"
            onClick={this.handleReset}
          >
            <RefreshCw />
            Try again
          </MatchmakerButton>
        </div>
      );
    }

    return this.props.children;
  }
}
