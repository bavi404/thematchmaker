export interface SentMatch {
  readonly id: string;
  readonly clientCustomerId: string;
  readonly candidateCustomerId: string;
  readonly compatibilityScore: number;
  readonly introduction: string;
  readonly sentAt: string;
}
