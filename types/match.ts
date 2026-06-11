export type MatchStatus =
  | "proposed"
  | "introduced"
  | "in-progress"
  | "successful"
  | "declined";

export interface Match {
  id: string;
  customerAId: string;
  customerBId: string;
  compatibilityScore: number;
  status: MatchStatus;
  proposedAt: string;
  notes: string;
  highlights: string[];
  concerns: string[];
}

export interface MatchCandidate {
  customerId: string;
  compatibilityScore: number;
  highlights: string[];
  concerns: string[];
}
