export type CustomerStatus =
  | "active"
  | "screening"
  | "matched"
  | "on-hold"
  | "archived";

export type CustomerTier = "platinum" | "gold" | "silver";

export interface CustomerPreferences {
  ageRange: [number, number];
  location: string[];
  education: string;
  profession: string[];
  religion?: string;
  lifestyle: string[];
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  occupation: string;
  education: string;
  status: CustomerStatus;
  tier: CustomerTier;
  avatarUrl?: string;
  bio: string;
  preferences: CustomerPreferences;
  joinedAt: string;
  lastContactAt: string;
  consultantId: string;
  tags: string[];
}
