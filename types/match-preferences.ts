export interface MatchPreferences {
  readonly customerId: string;
  readonly ageRange: readonly [number, number];
  readonly preferredCities: readonly string[];
  readonly preferredReligion: string;
  readonly minEducation: string;
  readonly preferredProfessions: readonly string[];
  readonly minIncome: number;
  readonly wantsKids: boolean;
  readonly openToRelocate: boolean;
  readonly openToPets: boolean;
  readonly notes: string;
}
