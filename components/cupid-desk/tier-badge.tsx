import { Crown, Heart, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type CupidTier = "platinum" | "gold" | "silver";

const tierConfig: Record<
  CupidTier,
  { label: string; icon: typeof Crown; className: string }
> = {
  platinum: {
    label: "Platinum",
    icon: Crown,
    className:
      "border-cupid-primary/30 bg-gradient-to-r from-cupid-primary/10 to-cupid-accent/10 text-cupid-primary",
  },
  gold: {
    label: "Gold",
    icon: Sparkles,
    className:
      "border-amber-300/60 bg-gradient-to-r from-amber-50 to-amber-100/80 text-amber-800",
  },
  silver: {
    label: "Silver",
    icon: Heart,
    className:
      "border-cupid-secondary bg-cupid-secondary/40 text-cupid-foreground/80",
  },
};

interface TierBadgeProps {
  tier: CupidTier;
  showIcon?: boolean;
  size?: "sm" | "default";
  className?: string;
}

export function TierBadge({
  tier,
  showIcon = true,
  size = "default",
  className,
}: TierBadgeProps) {
  const config = tierConfig[tier];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full font-medium capitalize",
        size === "sm" ? "h-5 px-2 text-[10px]" : "h-6 px-2.5 text-xs",
        config.className,
        className
      )}
    >
      {showIcon && <Icon className="size-3 shrink-0" />}
      {config.label}
    </Badge>
  );
}
