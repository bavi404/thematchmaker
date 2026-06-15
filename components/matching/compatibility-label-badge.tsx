import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CompatibilityLabel } from "@/types";
import { cn } from "@/lib/utils";

const labelStyles: Record<
  CompatibilityLabel,
  { bg: string; text: string; border: string }
> = {
  "High Potential Match": {
    bg: "bg-gradient-to-r from-emerald-50 to-cupid-background",
    text: "text-emerald-700",
    border: "border-emerald-200/80",
  },
  "Strong Match": {
    bg: "bg-gradient-to-r from-cupid-primary/15 to-cupid-accent/15",
    text: "text-cupid-primary",
    border: "border-cupid-primary/30",
  },
  "Moderate Match": {
    bg: "bg-cupid-secondary/50",
    text: "text-cupid-foreground/90",
    border: "border-cupid-secondary",
  },
  "Low Match": {
    bg: "bg-cupid-muted/80",
    text: "text-cupid-muted-foreground",
    border: "border-cupid-border",
  },
};

interface CompatibilityLabelBadgeProps {
  label: CompatibilityLabel;
  className?: string;
}

export function CompatibilityLabelBadge({
  label,
  className,
}: CompatibilityLabelBadgeProps) {
  const styles = labelStyles[label];

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold shadow-sm backdrop-blur-sm",
        styles.bg,
        styles.text,
        styles.border,
        className
      )}
    >
      {label === "High Potential Match" && (
        <Sparkles className="size-3 shrink-0 fill-current" />
      )}
      {label}
    </Badge>
  );
}
