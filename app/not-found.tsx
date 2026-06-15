import Link from "next/link";
import { Heart, Home } from "lucide-react";
import { MatchmakerButton } from "@/components/matchmaker";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-rose-50/80 via-white to-amber-50/30 px-4 text-center">
      <span className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cupid-primary to-cupid-accent shadow-lg shadow-cupid-primary/20">
        <Heart className="size-8 text-white" aria-hidden />
      </span>
      <p className="text-sm font-medium uppercase tracking-widest text-cupid-accent">
        404
      </p>
      <h1 className="mt-2 font-heading text-2xl font-semibold text-cupid-foreground">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-sm text-cupid-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-8 flex gap-3">
        <MatchmakerButton
          variant="gradient"
          render={<Link href="/dashboard" />}
        >
          <Home />
          Go to dashboard
        </MatchmakerButton>
        <MatchmakerButton variant="outline" render={<Link href="/login" />}>
          Sign in
        </MatchmakerButton>
      </div>
    </div>
  );
}
