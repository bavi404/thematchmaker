import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  BadgeCheck,
  FileSearch,
  Heart,
  Send,
  Phone,
  HeartHandshake,
  Trophy,
} from "lucide-react";
import type { CustomerStatus } from "./customer";

export type CustomerJourneyStage =
  | "NEW LEAD"
  | "VERIFIED"
  | "PROFILE REVIEW"
  | "MATCHING"
  | "INTRO SENT"
  | "CALL SCHEDULED"
  | "ACTIVE MATCH"
  | "SUCCESS";

export interface JourneyStageConfig {
  readonly id: CustomerJourneyStage;
  readonly label: string;
  readonly shortLabel: string;
  readonly icon: LucideIcon;
}

export const CUSTOMER_JOURNEY_STAGES: readonly JourneyStageConfig[] = [
  { id: "NEW LEAD", label: "New Lead", shortLabel: "Lead", icon: Sparkles },
  { id: "VERIFIED", label: "Verified", shortLabel: "Verified", icon: BadgeCheck },
  { id: "PROFILE REVIEW", label: "Profile Review", shortLabel: "Review", icon: FileSearch },
  { id: "MATCHING", label: "Matching", shortLabel: "Matching", icon: Heart },
  { id: "INTRO SENT", label: "Intro Sent", shortLabel: "Intro", icon: Send },
  { id: "CALL SCHEDULED", label: "Call Scheduled", shortLabel: "Call", icon: Phone },
  { id: "ACTIVE MATCH", label: "Active Match", shortLabel: "Active", icon: HeartHandshake },
  { id: "SUCCESS", label: "Success", shortLabel: "Success", icon: Trophy },
] as const;

const STATUS_TO_STAGE_INDEX: Record<CustomerStatus, number> = {
  NEW: 0,
  VERIFIED: 1,
  MATCHING: 3,
  "INTRO SENT": 4,
  "ACTIVE MATCH": 6,
  SUCCESS: 7,
};

/** Per-customer overrides for demo variety */
const STAGE_OVERRIDES: Record<string, number> = {
  "cust-003": 2,
  "cust-005": 1,
};

export function getJourneyStageIndex(customerId: string, status: CustomerStatus): number {
  if (customerId in STAGE_OVERRIDES) {
    return STAGE_OVERRIDES[customerId];
  }
  return STATUS_TO_STAGE_INDEX[status];
}

export type JourneyStepState = "completed" | "current" | "future";

export function getStepState(
  stepIndex: number,
  currentIndex: number
): JourneyStepState {
  if (stepIndex < currentIndex) return "completed";
  if (stepIndex === currentIndex) return "current";
  return "future";
}
