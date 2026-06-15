export interface CompatibilityExplanation {
  readonly score: number;
  readonly label: CompatibilityLabel;
  readonly reasons: readonly string[];
}

export type CompatibilityLabel =
  | "High Potential Match"
  | "Strong Match"
  | "Moderate Match"
  | "Low Match";

export function getCompatibilityLabel(score: number): CompatibilityLabel {
  if (score >= 90) return "High Potential Match";
  if (score >= 75) return "Strong Match";
  if (score >= 60) return "Moderate Match";
  return "Low Match";
}
