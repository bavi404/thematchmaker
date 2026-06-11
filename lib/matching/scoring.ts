import type { Customer, MatchCandidate } from "@/types";
import { customers } from "@/lib/data/customers";

function scoreAgeCompatibility(
  customer: Customer,
  candidate: Customer
): number {
  const [min, max] = customer.preferences.ageRange;
  if (candidate.age >= min && candidate.age <= max) return 100;
  const distance = Math.min(
    Math.abs(candidate.age - min),
    Math.abs(candidate.age - max)
  );
  return Math.max(0, 100 - distance * 15);
}

function scoreLocationCompatibility(
  customer: Customer,
  candidate: Customer
): number {
  const preferred = customer.preferences.location;
  const candidateCity = candidate.location.split(",")[0].trim();
  if (preferred.some((loc) => candidateCity.includes(loc) || loc.includes(candidateCity))) {
    return 100;
  }
  return 40;
}

function scoreEducationCompatibility(
  customer: Customer,
  candidate: Customer
): number {
  const levels = ["Graduate", "Postgraduate", "Doctorate"];
  const required = customer.preferences.education;
  const candidateLevel = levels.findIndex((l) =>
    candidate.education.includes(l)
  );
  const requiredLevel = levels.findIndex((l) => required.includes(l));
  if (candidateLevel >= requiredLevel) return 100;
  return 60;
}

function scoreProfessionCompatibility(
  customer: Customer,
  candidate: Customer
): number {
  const preferred = customer.preferences.profession;
  const match = preferred.some(
    (p) =>
      candidate.occupation.toLowerCase().includes(p.toLowerCase()) ||
      p.toLowerCase().includes(candidate.occupation.toLowerCase().split(" ")[0])
  );
  return match ? 100 : 50;
}

function scoreLifestyleOverlap(
  customer: Customer,
  candidate: Customer
): number {
  const overlap = customer.preferences.lifestyle.filter((l) =>
    candidate.preferences.lifestyle.some(
      (cl) => cl.toLowerCase() === l.toLowerCase()
    )
  );
  if (overlap.length === 0) return 40;
  return Math.min(100, 50 + overlap.length * 20);
}

export function calculateCompatibilityScore(
  customer: Customer,
  candidate: Customer
): number {
  const weights = {
    age: 0.25,
    location: 0.2,
    education: 0.2,
    profession: 0.2,
    lifestyle: 0.15,
  };

  const scores = {
    age: scoreAgeCompatibility(customer, candidate),
    location: scoreLocationCompatibility(customer, candidate),
    education: scoreEducationCompatibility(customer, candidate),
    profession: scoreProfessionCompatibility(customer, candidate),
    lifestyle: scoreLifestyleOverlap(customer, candidate),
  };

  const total = Object.entries(weights).reduce(
    (sum, [key, weight]) =>
      sum + scores[key as keyof typeof scores] * weight,
    0
  );

  return Math.round(total);
}

export function findMatchCandidates(
  customer: Customer,
  limit = 5
): MatchCandidate[] {
  return customers
    .filter((c) => c.id !== customer.id && c.status !== "archived")
    .map((candidate) => {
      const score = calculateCompatibilityScore(customer, candidate);
      const highlights: string[] = [];
      const concerns: string[] = [];

      if (scoreAgeCompatibility(customer, candidate) >= 80) {
        highlights.push("Age preferences aligned");
      } else {
        concerns.push("Age outside preferred range");
      }

      if (scoreLocationCompatibility(customer, candidate) >= 80) {
        highlights.push("Compatible location");
      } else {
        concerns.push("Location may require relocation");
      }

      if (scoreEducationCompatibility(customer, candidate) >= 80) {
        highlights.push("Education level compatible");
      }

      if (scoreLifestyleOverlap(customer, candidate) >= 60) {
        highlights.push("Shared lifestyle interests");
      }

      return {
        customerId: candidate.id,
        compatibilityScore: score,
        highlights,
        concerns,
      };
    })
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
    .slice(0, limit);
}
