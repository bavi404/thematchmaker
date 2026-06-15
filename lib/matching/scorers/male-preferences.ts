import type { Customer } from "@/types";
import { clampScore } from "../utils";

/** Higher score when candidate is younger than the male customer */
export function scorePreferYounger(male: Customer, candidate: Customer): number {
  const gap = male.age - candidate.age;
  if (gap <= 0) return clampScore(40 - Math.abs(gap) * 8);
  if (gap >= 1 && gap <= 3) return 100;
  if (gap <= 5) return 90;
  if (gap <= 8) return 75;
  if (gap <= 12) return 55;
  return clampScore(50 - (gap - 12) * 3);
}

/** Higher score when candidate is shorter than the male customer */
export function scorePreferShorter(male: Customer, candidate: Customer): number {
  const diff = male.height - candidate.height;
  if (diff <= 0) return clampScore(45 - Math.abs(diff) * 2);
  if (diff >= 5 && diff <= 15) return 100;
  if (diff <= 25) return 85;
  if (diff <= 35) return 65;
  return 55;
}

/** Higher score when candidate earns less than the male customer */
export function scorePreferLowerIncome(male: Customer, candidate: Customer): number {
  if (male.income <= 0) return 70;
  const ratio = candidate.income / male.income;
  if (ratio < 0.5) return 100;
  if (ratio < 0.75) return 90;
  if (ratio < 1) return 80;
  if (ratio <= 1.1) return 50;
  return clampScore(35 - (ratio - 1.1) * 20);
}
