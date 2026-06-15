import type { Customer } from "@/types";
import type { CompatibilityExplanation } from "@/types/compatibility-explanation";
import { getCompatibilityLabel } from "@/types/compatibility-explanation";
import { calculateCompatibilityScore } from "../engine";
import {
  femaleCustomerRules,
  maleCustomerRules,
  type ExplanationRule,
} from "./rules";

function collectReasons(
  customer: Customer,
  suggestedMatch: Customer,
  rules: readonly ExplanationRule[]
): string[] {
  return rules
    .map((rule) => ({
      priority: rule.priority,
      reason: rule.evaluate(customer, suggestedMatch),
    }))
    .filter((entry): entry is { priority: number; reason: string } =>
      entry.reason !== null
    )
    .sort((a, b) => a.priority - b.priority)
    .map((entry) => entry.reason);
}

function fallbackReasons(
  score: number,
  label: CompatibilityExplanation["label"]
): string[] {
  if (score >= 90) {
    return ["Strong alignment across multiple preference dimensions"];
  }
  if (score >= 75) {
    return ["Several key preferences align well"];
  }
  if (score >= 60) {
    return ["Some shared preferences worth exploring further"];
  }
  return [`${label} — limited overlap on stated preferences`];
}

export function generateCompatibilityExplanation(
  customer: Customer,
  suggestedMatch: Customer
): CompatibilityExplanation {
  const score = calculateCompatibilityScore(customer, suggestedMatch);
  const label = getCompatibilityLabel(score);
  const rules =
    customer.gender === "male" ? maleCustomerRules : femaleCustomerRules;

  const reasons = collectReasons(customer, suggestedMatch, rules);

  return {
    score,
    label,
    reasons: reasons.length > 0 ? reasons : fallbackReasons(score, label),
  };
}
