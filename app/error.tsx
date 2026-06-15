"use client";

import { ErrorFallback } from "@/components/shared/error-fallback";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cupid-background font-sans antialiased">
        <ErrorFallback
          title="Application error"
          description={error.message || "Something went wrong loading the app."}
          reset={reset}
          showHomeLink
        />
      </body>
    </html>
  );
}
