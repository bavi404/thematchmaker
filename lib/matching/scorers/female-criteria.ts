import type { Customer } from "@/types";
import { clampScore } from "../utils";

export function scoreReligion(a: Customer, b: Customer): number {
  if (a.religion.toLowerCase() === b.religion.toLowerCase()) return 100;
  return 40;
}

export function scoreLocation(a: Customer, b: Customer): number {
  if (a.city.toLowerCase() === b.city.toLowerCase()) return 100;
  if (a.country.toLowerCase() === b.country.toLowerCase()) return 75;
  if (a.openToRelocate || b.openToRelocate) return 60;
  return 35;
}

export function scoreProfession(a: Customer, b: Customer): number {
  const fieldsA = [a.designation, a.company].join(" ").toLowerCase();
  const fieldsB = [b.designation, b.company].join(" ").toLowerCase();

  const categories = [
    ["doctor", "physician", "cardiologist", "medicine", "medical"],
    ["architect", "design"],
    ["engineer", "technology", "tech", "entrepreneur"],
    ["director", "finance", "investment", "capital"],
    ["educator", "teacher", "education", "dancer"],
  ];

  for (const group of categories) {
    const aMatch = group.some((k) => fieldsA.includes(k));
    const bMatch = group.some((k) => fieldsB.includes(k));
    if (aMatch && bMatch) return 95;
  }

  if (fieldsA.split(" ").some((w) => fieldsB.includes(w) && w.length > 4)) return 80;
  return 65;
}

export function scoreEducation(a: Customer, b: Customer): number {
  const levels = [
    { keywords: ["phd", "doctorate"], rank: 5 },
    { keywords: ["md", "m.arch", "mba", "ms "], rank: 4 },
    { keywords: ["master", "m.", "ma "], rank: 3 },
    { keywords: ["bachelor", "b.", "ba ", "bs "], rank: 2 },
  ];

  function rank(degree: string): number {
    const d = degree.toLowerCase();
    for (const level of levels) {
      if (level.keywords.some((k) => d.includes(k))) return level.rank;
    }
    return 2;
  }

  const diff = Math.abs(rank(a.degree) - rank(b.degree));
  if (diff === 0) return 100;
  if (diff === 1) return 85;
  if (diff === 2) return 65;
  return 45;
}

export function scoreLifestyle(a: Customer, b: Customer): number {
  const overlap = a.hobbies.filter((h) =>
    b.hobbies.some((c) => c.toLowerCase() === h.toLowerCase())
  );
  if (overlap.length === 0) return 40;
  return clampScore(55 + overlap.length * 15);
}

export function scoreChildrenPreference(a: Customer, b: Customer): number {
  return a.wantsKids === b.wantsKids ? 100 : 25;
}

export function scoreRelocationPreference(a: Customer, b: Customer): number {
  if (a.city.toLowerCase() === b.city.toLowerCase()) return 100;
  if (a.openToRelocate && b.openToRelocate) return 90;
  if (a.openToRelocate || b.openToRelocate) return 75;
  return 40;
}

export function scorePetPreference(a: Customer, b: Customer): number {
  if (a.openToPets === b.openToPets) return 100;
  if (a.openToPets || b.openToPets) return 60;
  return 30;
}
