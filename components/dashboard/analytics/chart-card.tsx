import type { ReactNode } from "react";
import { MatchmakerCard, MatchmakerCardContent } from "@/components/matchmaker";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  description,
  children,
  className,
}: ChartCardProps) {
  return (
    <MatchmakerCard
      variant="elevated"
      className={cn("overflow-hidden", className)}
    >
      <div className="border-b border-cupid-border/40 px-5 py-4">
        <h3 className="font-heading text-base font-semibold text-cupid-foreground">
          {title}
        </h3>
        {description && (
          <p className="mt-0.5 text-xs text-cupid-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <MatchmakerCardContent className="p-4 pt-3 sm:p-5">{children}</MatchmakerCardContent>
    </MatchmakerCard>
  );
}
