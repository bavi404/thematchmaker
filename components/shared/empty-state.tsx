import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-cupid-border/60 bg-cupid-background/30 px-6 py-12 text-center",
        className
      )}
    >
      <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-cupid-primary/10">
        <Icon className="size-5 text-cupid-primary" aria-hidden />
      </span>
      <h3 className="font-heading text-base font-semibold text-cupid-foreground">
        {title}
      </h3>
      <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-cupid-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
