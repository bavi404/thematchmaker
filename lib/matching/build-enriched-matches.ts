import type { Customer } from "@/types";
import type { EnrichedMatch } from "@/types/enriched-match";
import { getCustomerById } from "@/lib/data/customers";
import { findTopMatches } from "./index";
import { generateCompatibilityExplanation } from "./explanation/generator";
import type { MatchEngineOptions } from "./index";

/** Build enriched matches on the server — avoids client-side engine + customer lookups */
export function buildEnrichedMatches(
  customer: Customer,
  options?: MatchEngineOptions
): EnrichedMatch[] {
  return findTopMatches(customer, options)
    .map((match) => {
      const candidateCustomer = getCustomerById(match.customerId);
      if (!candidateCustomer) return null;

      return {
        ...match,
        candidateCustomer,
        explanation: generateCompatibilityExplanation(customer, candidateCustomer),
      };
    })
    .filter((match): match is EnrichedMatch => match !== null);
}
