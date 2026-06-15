import type { Customer, MatchCandidate } from "@/types";
import { customers } from "@/lib/data/customers";
import {
  calculateCompatibilityScore,
  scoreCompatibilityPair,
} from "./engine";
import { isEligibleCandidate } from "./utils";

export interface MatchEngineOptions {
  limit?: number;
  pool?: Customer[];
}

const DEFAULT_LIMIT = 10;

export function findTopMatches(
  customer: Customer,
  options: MatchEngineOptions = {}
): MatchCandidate[] {
  const { limit = DEFAULT_LIMIT, pool = customers } = options;

  return pool
    .filter((candidate) => isEligibleCandidate(customer, candidate))
    .map((candidate) => {
      const breakdown = scoreCompatibilityPair(customer, candidate);
      return {
        customerId: candidate.id,
        compatibilityScore: breakdown.overallScore,
        highlights: [...breakdown.highlights],
        concerns: [...breakdown.concerns],
      };
    })
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
    .slice(0, limit);
}

/** @deprecated Use findTopMatches */
export const findMatchCandidates = findTopMatches;

export {
  calculateCompatibilityScore,
  scoreCompatibilityPair,
  scoreMaleCustomerPair,
  scoreFemaleCustomerPair,
} from "./engine";

export { isEligibleCandidate } from "./utils";

export { generateCompatibilityExplanation } from "./explanation/generator";
