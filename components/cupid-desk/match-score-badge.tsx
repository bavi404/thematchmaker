import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getMatchScoreTier, type MatchScoreTier } from "@/lib/design-system";
import { cn } from "@/lib/utils";

const tierStyles: Record<
  MatchScoreTier,
  { bg: string; text: string; border: string; label: string }
> = {
  exceptional: {
    bg: "bg-gradient-to-r from-cupid-primary/15 to-cupid-accent/15",
    text: "text-cupid-primary",
    border: "border-cupid-primary/30",
    label: "Exceptional",
  },
  strong: {
    bg: "bg-cupid-accent/15",
    text: "text-[#E91E63]",
    border: "border-cupid-accent/40",
    label: "Strong",
  },
  moderate: {
    bg: "bg-cupid-secondary/40",
    text: "text-cupid-foreground/80",
    border: "border-cupid-secondary",
    label: "Moderate",
  },
  low: {
    bg: "bg-cupid-muted",
    text: "text-cupid-muted-foreground",
    border: "border-cupid-border",
    label: "Low",
  },
};

interface MatchScoreBadgeProps {
  score: number;
  showLabel?: boolean;
  showHeart?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function MatchScoreBadge({
  score,
  showLabel = false,
  showHeart = true,
  size = "md",
  className,
}: MatchScoreBadgeProps) {
  const tier = getMatchScoreTier(score);
  const styles = tierStyles[tier];

  const sizeClasses = {
    sm: "h-5 gap-1 px-2 text-[10px]",
    md: "h-6 gap-1 px-2.5 text-xs",
    lg: "h-8 gap-1.5 px-3 text-sm font-semibold",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full font-medium",
        styles.bg,
        styles.text,
        styles.border,
        sizeClasses[size],
        className
      )}
    >
      {showHeart && (
        <Heart
          className={cn(
            "shrink-0 fill-current",
            size === "sm" && "size-2.5",
            size === "md" && "size-3",
            size === "lg" && "size-3.5"
          )}
        />
      )}
      <span>{score}%</span>
      {showLabel && (
        <span className="opacity-70">· {styles.label}</span>
      )}
    </Badge>
  );
}

interface MatchScoreRingProps {
  score: number;
  size?: number;
  className?: string;
}

/** Circular match score indicator with heart-tier coloring */
export function MatchScoreRing({
  score,
  size = 52,
  className,
}: MatchScoreRingProps) {
  const tier = getMatchScoreTier(score);
  const strokeColor =
    tier === "exceptional"
      ? "#FF4F81"
      : tier === "strong"
        ? "#FF85A2"
        : tier === "moderate"
          ? "#FFB6C1"
          : "#D4A0B0";

  const stroke = 3.5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Match score ${score} percent`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#FFE8EF"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <span
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ color: strokeColor }}
      >
        <Heart className="mb-0.5 size-2.5 fill-current opacity-60" />
        <span className="text-xs font-bold leading-none">{score}</span>
      </span>
    </div>
  );
}
