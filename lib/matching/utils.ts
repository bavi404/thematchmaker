import type { Customer } from "@/types";

/** Clamp score to 0–100 */
export function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function isOppositeGender(a: Customer, b: Customer): boolean {
  return a.gender !== b.gender;
}

export function isEligibleCandidate(
  customer: Customer,
  candidate: Customer
): boolean {
  return (
    candidate.id !== customer.id &&
    isOppositeGender(customer, candidate) &&
    candidate.status !== "SUCCESS"
  );
}
