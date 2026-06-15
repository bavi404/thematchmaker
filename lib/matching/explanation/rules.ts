import type { Customer } from "@/types";
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
} from "../scorers";

export interface ExplanationRule {
  readonly priority: number;
  readonly evaluate: (customer: Customer, match: Customer) => string | null;
}

function sharedHobbies(a: Customer, b: Customer): string[] {
  return a.hobbies.filter((hobby) =>
    b.hobbies.some((other) => other.toLowerCase() === hobby.toLowerCase())
  );
}

export const childrenRule: ExplanationRule = {
  priority: 10,
  evaluate(customer, match) {
    if (scoreChildrenPreference(customer, match) < 100) return null;
    return customer.wantsKids
      ? "Both want children"
      : "Both prefer not having children";
  },
};

export const educationRule: ExplanationRule = {
  priority: 20,
  evaluate(customer, match) {
    if (scoreEducation(customer, match) < 85) return null;
    return "Similar education backgrounds";
  },
};

export const professionRule: ExplanationRule = {
  priority: 30,
  evaluate(customer, match) {
    if (scoreProfession(customer, match) < 80) return null;
    return "Compatible career goals";
  },
};

export const relocationRule: ExplanationRule = {
  priority: 40,
  evaluate(customer, match) {
    if (scoreRelocationPreference(customer, match) < 75) return null;
    if (customer.city.toLowerCase() === match.city.toLowerCase()) {
      return `Both based in ${customer.city}`;
    }
    if (customer.openToRelocate && match.openToRelocate) {
      return "Shared relocation preferences";
    }
    if (customer.openToRelocate || match.openToRelocate) {
      return "Flexible relocation outlook";
    }
    return null;
  },
};

export const religionRule: ExplanationRule = {
  priority: 50,
  evaluate(customer, match) {
    if (scoreReligion(customer, match) < 100) return null;
    return `Shared ${customer.religion} background`;
  },
};

export const locationRule: ExplanationRule = {
  priority: 60,
  evaluate(customer, match) {
    const score = scoreLocation(customer, match);
    if (score < 75) return null;
    if (customer.city.toLowerCase() === match.city.toLowerCase()) {
      return `Both live in ${customer.city}`;
    }
    if (customer.country.toLowerCase() === match.country.toLowerCase()) {
      return `Both based in ${customer.country}`;
    }
    return null;
  },
};

export const lifestyleRule: ExplanationRule = {
  priority: 70,
  evaluate(customer, match) {
    const overlap = sharedHobbies(customer, match);
    if (overlap.length === 0 || scoreLifestyle(customer, match) < 70) return null;
    if (overlap.length === 1) {
      return `Shared interest in ${overlap[0]}`;
    }
    return "Shared lifestyle interests";
  },
};

export const petsRule: ExplanationRule = {
  priority: 80,
  evaluate(customer, match) {
    if (scorePetPreference(customer, match) < 100) return null;
    return customer.openToPets
      ? "Both open to having pets"
      : "Both prefer a pet-free home";
  },
};

export const favorableAgeGapRule: ExplanationRule = {
  priority: 10,
  evaluate(customer, match) {
    if (customer.gender !== "male") return null;
    const score = scorePreferYounger(customer, match);
    if (score < 75) return null;
    const gap = customer.age - match.age;
    if (gap >= 1 && gap <= 3) return "Ideal age gap";
    if (gap > 3) return "Favorable age gap";
    return null;
  },
};

export const heightAlignmentRule: ExplanationRule = {
  priority: 20,
  evaluate(customer, match) {
    if (customer.gender !== "male") return null;
    if (scorePreferShorter(customer, match) < 80) return null;
    return "Complementary height profile";
  },
};

export const incomeAlignmentRule: ExplanationRule = {
  priority: 30,
  evaluate(customer, match) {
    if (customer.gender !== "male") return null;
    if (scorePreferLowerIncome(customer, match) < 80) return null;
    return "Aligned income expectations";
  },
};

export const maleCustomerRules: readonly ExplanationRule[] = [
  childrenRule,
  favorableAgeGapRule,
  heightAlignmentRule,
  incomeAlignmentRule,
];

export const femaleCustomerRules: readonly ExplanationRule[] = [
  childrenRule,
  educationRule,
  professionRule,
  relocationRule,
  religionRule,
  locationRule,
  lifestyleRule,
  petsRule,
];
