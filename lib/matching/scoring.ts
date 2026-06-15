export {
  findTopMatches,
  findMatchCandidates,
  calculateCompatibilityScore,
  scoreCompatibilityPair,
  scoreMaleCustomerPair,
  scoreFemaleCustomerPair,
  isEligibleCandidate,
} from "./index";

export type { MatchEngineOptions } from "./index";

export { generateCompatibilityExplanation } from "./explanation/generator";
