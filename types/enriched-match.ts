import type { Customer } from "@/types";
import type { CompatibilityExplanation } from "@/types/compatibility-explanation";
import type { MatchCandidate } from "@/types";

/** Server-computed match with full candidate data and explanation */
export interface EnrichedMatch extends MatchCandidate {
  readonly candidateCustomer: Customer;
  readonly explanation: CompatibilityExplanation;
}
