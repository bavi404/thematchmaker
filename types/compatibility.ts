export type CompatibilityDimensionKey =
  | "age"
  | "location"
  | "education"
  | "profession"
  | "lifestyle"
  | "values"
  | "family"
  | "religion";

export interface CompatibilityDimension {
  readonly key: CompatibilityDimensionKey;
  readonly label: string;
  readonly score: number;
  readonly weight: number;
  readonly summary: string;
}

export interface CompatibilityBreakdown {
  readonly overallScore: number;
  readonly dimensions: readonly CompatibilityDimension[];
  readonly highlights: readonly string[];
  readonly concerns: readonly string[];
}

export type MatchScoreTier = "exceptional" | "strong" | "moderate" | "low";

export function getMatchScoreTier(score: number): MatchScoreTier {
  if (score >= 90) return "exceptional";
  if (score >= 75) return "strong";
  if (score >= 60) return "moderate";
  return "low";
}
