export type {
  Customer,
  Gender,
  CustomerStatus,
  MaritalStatus,
  DietPreference,
  FamilyType,
  ISODateString,
} from "./customer";

export { getCustomerDisplayLocation, getCustomerFullName } from "./customer";

export type {
  MatchSuggestion,
  MatchSuggestionStatus,
  MatchCandidate,
} from "./match-suggestion";

export type { MeetingNote, MeetingNoteType } from "./meeting-note";
export type { MeetingNoteSummary } from "./meeting-note-summary";
export type { SentMatch } from "./sent-match";
export type {
  CustomerJourneyStage,
  JourneyStageConfig,
  JourneyStepState,
} from "./customer-journey";
export {
  CUSTOMER_JOURNEY_STAGES,
  getJourneyStageIndex,
  getStepState,
} from "./customer-journey";

export type {
  CompatibilityBreakdown,
  CompatibilityDimension,
  CompatibilityDimensionKey,
  MatchScoreTier,
} from "./compatibility";

export { getMatchScoreTier } from "./compatibility";

export type {
  CompatibilityExplanation,
  CompatibilityLabel,
} from "./compatibility-explanation";

export { getCompatibilityLabel } from "./compatibility-explanation";

export type { Match, MatchStatus } from "./match";

export interface DashboardStat {
  label: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "neutral";
}

export interface ActivityDataPoint {
  month: string;
  introductions: number;
  matches: number;
  consultations: number;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
}
