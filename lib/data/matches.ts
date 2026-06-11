import type { Match } from "@/types";

export const matches: Match[] = [
  {
    id: "match-001",
    customerAId: "cust-001",
    customerBId: "cust-002",
    compatibilityScore: 92,
    status: "in-progress",
    proposedAt: "2026-05-15",
    notes: "Strong alignment on values, education, and family expectations.",
    highlights: ["Shared professional ambition", "Compatible lifestyle", "Family approval received"],
    concerns: ["Geographic distance between cities"],
  },
  {
    id: "match-002",
    customerAId: "cust-003",
    customerBId: "cust-004",
    compatibilityScore: 87,
    status: "proposed",
    proposedAt: "2026-06-01",
    notes: "Excellent intellectual compatibility; both value career dedication.",
    highlights: ["Similar education level", "Aligned life goals", "Mutual interests in travel"],
    concerns: ["Scheduling availability for meetings"],
  },
  {
    id: "match-003",
    customerAId: "cust-001",
    customerBId: "cust-004",
    compatibilityScore: 78,
    status: "introduced",
    proposedAt: "2026-04-20",
    notes: "Good potential; awaiting second meeting feedback.",
    highlights: ["Strong communication", "Complementary personalities"],
    concerns: ["Age preference marginally outside range"],
  },
];

export function getMatchesForCustomer(customerId: string): Match[] {
  return matches.filter(
    (m) => m.customerAId === customerId || m.customerBId === customerId
  );
}
