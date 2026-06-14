import type { CompatibilityBreakdown } from "./compatibility";

export type MatchSuggestionStatus =
  | "pending"
  | "reviewed"
  | "proposed"
  | "accepted"
  | "declined"
  | "expired";

export interface MatchSuggestion {
  readonly id: string;
  readonly customerId: string;
  readonly suggestedCustomerId: string;
  readonly compatibilityScore: number;
  readonly breakdown: CompatibilityBreakdown;
  readonly status: MatchSuggestionStatus;
  readonly highlights: readonly string[];
  readonly concerns: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
}

/** @deprecated Use MatchSuggestion */
export type MatchCandidate = Pick<
  MatchSuggestion,
  "compatibilityScore" | "highlights" | "concerns"
> & { customerId: string };
