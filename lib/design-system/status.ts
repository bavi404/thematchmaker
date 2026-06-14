import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  BadgeCheck,
  Heart,
  Send,
  HeartHandshake,
  Trophy,
} from "lucide-react";

export type ClientPipelineStatus =
  | "NEW"
  | "VERIFIED"
  | "MATCHING"
  | "INTRO SENT"
  | "ACTIVE MATCH"
  | "SUCCESS";

/** @deprecated Use ClientPipelineStatus */
export type CupidClientStatus = ClientPipelineStatus;

export interface StatusConfig {
  label: string;
  background: string;
  foreground: string;
  border: string;
  dot: string;
  icon: LucideIcon;
}

export const clientStatusConfig: Record<ClientPipelineStatus, StatusConfig> = {
  NEW: {
    label: "New",
    background: "#EEF4FF",
    foreground: "#3B6FD9",
    border: "#C7D9F7",
    dot: "#3B6FD9",
    icon: Sparkles,
  },
  VERIFIED: {
    label: "Verified",
    background: "#E8F8F0",
    foreground: "#0D9F6E",
    border: "#B8EBD4",
    dot: "#0D9F6E",
    icon: BadgeCheck,
  },
  MATCHING: {
    label: "Matching",
    background: "#FFE8EF",
    foreground: "#FF4F81",
    border: "#FFC2D4",
    dot: "#FF4F81",
    icon: Heart,
  },
  "INTRO SENT": {
    label: "Intro Sent",
    background: "#FFF6E8",
    foreground: "#D97706",
    border: "#FDE0B0",
    dot: "#D97706",
    icon: Send,
  },
  "ACTIVE MATCH": {
    label: "Active Match",
    background: "#FFDCE8",
    foreground: "#E91E63",
    border: "#FF85A2",
    dot: "#FF85A2",
    icon: HeartHandshake,
  },
  SUCCESS: {
    label: "Success",
    background: "#E6FAF0",
    foreground: "#047857",
    border: "#A7F3D0",
    dot: "#047857",
    icon: Trophy,
  },
};

export function getStatusConfig(status: ClientPipelineStatus): StatusConfig {
  return clientStatusConfig[status];
}
