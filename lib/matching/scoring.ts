import type { Customer, MatchCandidate, CompatibilityBreakdown } from "@/types";
import { customers } from "@/lib/data/customers";

function scoreAgeProximity(customer: Customer, candidate: Customer): number {
  const diff = Math.abs(customer.age - candidate.age);
  if (diff <= 2) return 100;
  if (diff <= 5) return 85;
  if (diff <= 8) return 65;
  return Math.max(30, 100 - diff * 10);
}

function scoreLocation(customer: Customer, candidate: Customer): number {
  if (customer.city === candidate.city) return 100;
  if (customer.country === candidate.country) return 75;
  if (customer.openToRelocate || candidate.openToRelocate) return 60;
  return 35;
}

function scoreEducation(customer: Customer, candidate: Customer): number {
  const levels = ["Bachelor", "Master", "M.", "MD", "MBA", "PhD", "MS"];
  const customerLevel = levels.findIndex((l) => customer.degree.includes(l.split(".")[0]));
  const candidateLevel = levels.findIndex((l) => candidate.degree.includes(l.split(".")[0]));
  if (customerLevel === -1 || candidateLevel === -1) return 70;
  return candidateLevel >= customerLevel - 1 ? 100 : 65;
}

function scoreProfession(customer: Customer, candidate: Customer): number {
  const fields = [customer.designation, customer.company, candidate.designation, candidate.company];
  const professional = fields.some((f) =>
    /architect|doctor|engineer|director|entrepreneur|educator/i.test(f)
  );
  return professional ? 85 : 70;
}

function scoreLifestyle(customer: Customer, candidate: Customer): number {
  const overlap = customer.hobbies.filter((h) =>
    candidate.hobbies.some((c) => c.toLowerCase() === h.toLowerCase())
  );
  if (overlap.length === 0) return 45;
  return Math.min(100, 50 + overlap.length * 18);
}

function scoreValues(customer: Customer, candidate: Customer): number {
  let score = 70;
  if (customer.wantsKids === candidate.wantsKids) score += 15;
  if (customer.openToPets === candidate.openToPets) score += 10;
  if (customer.dietPreference === candidate.dietPreference) score += 5;
  return Math.min(100, score);
}

function scoreFamily(customer: Customer, candidate: Customer): number {
  if (customer.familyType === candidate.familyType) return 90;
  return 70;
}

function scoreReligion(customer: Customer, candidate: Customer): number {
  return customer.religion === candidate.religion ? 100 : 50;
}

export function buildCompatibilityBreakdown(
  customer: Customer,
  candidate: Customer
): CompatibilityBreakdown {
  const dimensions = [
    { key: "age" as const, label: "Age", weight: 0.15, score: scoreAgeProximity(customer, candidate) },
    { key: "location" as const, label: "Location", weight: 0.15, score: scoreLocation(customer, candidate) },
    { key: "education" as const, label: "Education", weight: 0.15, score: scoreEducation(customer, candidate) },
    { key: "profession" as const, label: "Profession", weight: 0.15, score: scoreProfession(customer, candidate) },
    { key: "lifestyle" as const, label: "Lifestyle", weight: 0.15, score: scoreLifestyle(customer, candidate) },
    { key: "values" as const, label: "Values", weight: 0.1, score: scoreValues(customer, candidate) },
    { key: "family" as const, label: "Family", weight: 0.08, score: scoreFamily(customer, candidate) },
    { key: "religion" as const, label: "Religion", weight: 0.07, score: scoreReligion(customer, candidate) },
  ].map((d) => ({
    ...d,
    summary:
      d.score >= 85
        ? `Strong alignment on ${d.label.toLowerCase()}`
        : d.score >= 65
          ? `Moderate ${d.label.toLowerCase()} compatibility`
          : `${d.label} may need discussion`,
  }));

  const overallScore = Math.round(
    dimensions.reduce((sum, d) => sum + d.score * d.weight, 0)
  );

  const highlights = dimensions
    .filter((d) => d.score >= 80)
    .map((d) => d.summary);

  const concerns = dimensions
    .filter((d) => d.score < 65)
    .map((d) => d.summary);

  return {
    overallScore,
    dimensions,
    highlights,
    concerns,
  };
}

export function calculateCompatibilityScore(
  customer: Customer,
  candidate: Customer
): number {
  return buildCompatibilityBreakdown(customer, candidate).overallScore;
}

export function findMatchCandidates(
  customer: Customer,
  limit = 5
): MatchCandidate[] {
  return customers
    .filter((c) => c.id !== customer.id && c.status !== "SUCCESS")
    .map((candidate) => {
      const breakdown = buildCompatibilityBreakdown(customer, candidate);
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
