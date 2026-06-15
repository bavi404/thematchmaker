import type { Customer } from "@/types";
import type { CompatibilityBreakdown, CompatibilityDimension } from "@/types";
import {
  scorePreferYounger,
  scorePreferShorter,
  scorePreferLowerIncome,
  scoreChildrenPreference,
  scoreReligion,
  scoreLocation,
  scoreProfession,
  scoreEducation,
  scoreLifestyle,
  scoreRelocationPreference,
  scorePetPreference,
} from "./scorers";
import { clampScore } from "./utils";

interface WeightedDimension {
  key: CompatibilityDimension["key"];
  label: string;
  weight: number;
  score: number;
}

function buildBreakdown(
  dimensions: WeightedDimension[]
): CompatibilityBreakdown {
  const enriched: CompatibilityDimension[] = dimensions.map((d) => ({
    ...d,
    summary:
      d.score >= 85
        ? `Strong alignment on ${d.label.toLowerCase()}`
        : d.score >= 65
          ? `Moderate ${d.label.toLowerCase()} compatibility`
          : `${d.label} may need discussion`,
  }));

  const overallScore = clampScore(
    enriched.reduce((sum, d) => sum + d.score * d.weight, 0)
  );

  return {
    overallScore,
    dimensions: enriched,
    highlights: enriched.filter((d) => d.score >= 80).map((d) => d.summary),
    concerns: enriched.filter((d) => d.score < 60).map((d) => d.summary),
  };
}

/** Male customers: prefer younger, shorter, lower-income women with matching child preferences */
export function scoreMaleCustomerPair(
  male: Customer,
  candidate: Customer
): CompatibilityBreakdown {
  const dimensions: WeightedDimension[] = [
    {
      key: "age",
      label: "Age",
      weight: 0.3,
      score: scorePreferYounger(male, candidate),
    },
    {
      key: "values",
      label: "Height",
      weight: 0.25,
      score: scorePreferShorter(male, candidate),
    },
    {
      key: "profession",
      label: "Income",
      weight: 0.25,
      score: scorePreferLowerIncome(male, candidate),
    },
    {
      key: "lifestyle",
      label: "Children",
      weight: 0.2,
      score: scoreChildrenPreference(male, candidate),
    },
  ];

  return buildBreakdown(dimensions);
}

/** Female customers: religion, location, profession, education, lifestyle, children, relocation, pets */
export function scoreFemaleCustomerPair(
  female: Customer,
  candidate: Customer
): CompatibilityBreakdown {
  const dimensions: WeightedDimension[] = [
    {
      key: "religion",
      label: "Religion",
      weight: 0.15,
      score: scoreReligion(female, candidate),
    },
    {
      key: "location",
      label: "Location",
      weight: 0.15,
      score: scoreLocation(female, candidate),
    },
    {
      key: "profession",
      label: "Profession",
      weight: 0.12,
      score: scoreProfession(female, candidate),
    },
    {
      key: "education",
      label: "Education",
      weight: 0.12,
      score: scoreEducation(female, candidate),
    },
    {
      key: "lifestyle",
      label: "Lifestyle",
      weight: 0.14,
      score: scoreLifestyle(female, candidate),
    },
    {
      key: "values",
      label: "Children",
      weight: 0.14,
      score: scoreChildrenPreference(female, candidate),
    },
    {
      key: "family",
      label: "Relocation",
      weight: 0.09,
      score: scoreRelocationPreference(female, candidate),
    },
    {
      key: "age",
      label: "Pets",
      weight: 0.09,
      score: scorePetPreference(female, candidate),
    },
  ];

  return buildBreakdown(dimensions);
}

export function scoreCompatibilityPair(
  customer: Customer,
  candidate: Customer
): CompatibilityBreakdown {
  if (customer.gender === "male") {
    return scoreMaleCustomerPair(customer, candidate);
  }
  return scoreFemaleCustomerPair(customer, candidate);
}

export function calculateCompatibilityScore(
  customer: Customer,
  candidate: Customer
): number {
  return scoreCompatibilityPair(customer, candidate).overallScore;
}
