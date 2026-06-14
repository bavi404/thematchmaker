import type { MatchPreferences } from "@/types/match-preferences";

export const matchPreferences: MatchPreferences[] = [
  {
    customerId: "cust-001",
    ageRange: [30, 36],
    preferredCities: ["Mumbai", "Pune", "Bangalore"],
    preferredReligion: "Hindu",
    minEducation: "Postgraduate",
    preferredProfessions: ["Finance", "Technology", "Medicine"],
    minIncome: 2000000,
    wantsKids: true,
    openToRelocate: true,
    openToPets: false,
    notes: "Prefers professionally driven partners who value family traditions.",
  },
  {
    customerId: "cust-002",
    ageRange: [27, 32],
    preferredCities: ["Delhi NCR", "Chandigarh"],
    preferredReligion: "Hindu",
    minEducation: "Postgraduate",
    preferredProfessions: ["Architecture", "Design", "Law"],
    minIncome: 1500000,
    wantsKids: true,
    openToRelocate: false,
    openToPets: true,
    notes: "Looking for someone family-oriented with strong communication skills.",
  },
  {
    customerId: "cust-003",
    ageRange: [32, 38],
    preferredCities: ["Bangalore", "Chennai", "Hyderabad"],
    preferredReligion: "Hindu",
    minEducation: "Postgraduate",
    preferredProfessions: ["Medicine", "Research", "Academia"],
    minIncome: 2500000,
    wantsKids: true,
    openToRelocate: true,
    openToPets: true,
    notes: "Values intellectual depth and understanding of a medical career.",
  },
  {
    customerId: "cust-004",
    ageRange: [28, 34],
    preferredCities: ["Hyderabad", "Bangalore", "Mumbai"],
    preferredReligion: "Hindu",
    minEducation: "Postgraduate",
    preferredProfessions: ["Medicine", "Design", "Entrepreneurship"],
    minIncome: 1800000,
    wantsKids: true,
    openToRelocate: true,
    openToPets: false,
    notes: "Seeks an intellectually curious partner with global outlook.",
  },
  {
    customerId: "cust-005",
    ageRange: [29, 35],
    preferredCities: ["Chennai", "Bangalore"],
    preferredReligion: "Hindu",
    minEducation: "Graduate",
    preferredProfessions: ["Arts", "Education", "Business"],
    minIncome: 1000000,
    wantsKids: false,
    openToRelocate: false,
    openToPets: true,
    notes: "Appreciates tradition with a modern outlook; culture is important.",
  },
];

export function getMatchPreferencesByCustomerId(
  customerId: string
): MatchPreferences | undefined {
  return matchPreferences.find((p) => p.customerId === customerId);
}
