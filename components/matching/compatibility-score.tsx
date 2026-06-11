import { cn } from "@/lib/utils";

interface CompatibilityScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

function getScoreColor(score: number): string {
  if (score >= 90) return "text-emerald-600";
  if (score >= 75) return "text-rose-600";
  if (score >= 60) return "text-amber-600";
  return "text-neutral-500";
}

function getScoreRing(score: number): string {
  if (score >= 90) return "stroke-emerald-400";
  if (score >= 75) return "stroke-rose-400";
  if (score >= 60) return "stroke-amber-400";
  return "stroke-neutral-300";
}

const sizeMap = {
  sm: { dimension: 36, stroke: 3, text: "text-[10px]" },
  md: { dimension: 48, stroke: 3.5, text: "text-xs" },
  lg: { dimension: 64, stroke: 4, text: "text-sm" },
};

export function CompatibilityScore({
  score,
  size = "md",
  showLabel = false,
}: CompatibilityScoreProps) {
  const { dimension, stroke, text } = sizeMap[size];
  const radius = (dimension - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-2">
      <div className="relative" style={{ width: dimension, height: dimension }}>
        <svg
          width={dimension}
          height={dimension}
          className="-rotate-90"
          aria-hidden
        >
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            className="stroke-rose-100"
          />
          <circle
            cx={dimension / 2}
            cy={dimension / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={cn("transition-all duration-700", getScoreRing(score))}
          />
        </svg>
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center font-semibold",
            text,
            getScoreColor(score)
          )}
        >
          {score}
        </span>
      </div>
      {showLabel && (
        <span className="text-xs text-rose-400">Compatibility</span>
      )}
    </div>
  );
}
