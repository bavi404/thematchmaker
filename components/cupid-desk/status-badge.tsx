import { Badge } from "@/components/ui/badge";
import {
  getStatusConfig,
  type CupidClientStatus,
} from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: CupidClientStatus;
  showIcon?: boolean;
  showDot?: boolean;
  size?: "sm" | "default";
  className?: string;
}

export function StatusBadge({
  status,
  showIcon = true,
  showDot = false,
  size = "default",
  className,
}: StatusBadgeProps) {
  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full border font-medium",
        size === "sm" ? "h-5 px-2 text-[10px]" : "h-6 px-2.5 text-xs",
        className
      )}
      style={{
        backgroundColor: config.background,
        color: config.foreground,
        borderColor: config.border,
      }}
    >
      {showDot && (
        <span
          className="size-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: config.dot }}
        />
      )}
      {showIcon && <Icon className="size-3 shrink-0" />}
      {config.label}
    </Badge>
  );
}

interface StatusDotProps {
  status: CupidClientStatus;
  className?: string;
  pulse?: boolean;
}

/** Compact status indicator for tables and lists */
export function StatusDot({ status, className, pulse = false }: StatusDotProps) {
  const config = getStatusConfig(status);

  return (
    <span className={cn("relative inline-flex", className)}>
      <span
        className="size-2 rounded-full"
        style={{ backgroundColor: config.dot }}
      />
      {pulse && (
        <span
          className="absolute inset-0 animate-ping rounded-full opacity-40"
          style={{ backgroundColor: config.dot }}
        />
      )}
    </span>
  );
}
