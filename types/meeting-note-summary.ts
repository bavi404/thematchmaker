export interface MeetingNoteSummary {
  readonly summary: string;
  readonly keyPreferences: readonly string[];
  readonly potentialConcerns: readonly string[];
  readonly relationshipGoals: readonly string[];
}
