/**
 * The MatchMaker Design System — brand tokens
 */

export const brandColors = {
  primary: "#FF4F81",
  secondary: "#FFB6C1",
  accent: "#FF85A2",
  background: "#FFF5F7",
  foreground: "#3D1F2B",
  muted: "#F9E8ED",
  mutedForeground: "#9B6B7D",
  border: "#F5D0DC",
  ring: "#FF85A2",
} as const;

export const cupidColors = brandColors;

export const brandGradients = {
  primary: "linear-gradient(135deg, #FF4F81 0%, #FF85A2 100%)",
  soft: "linear-gradient(135deg, #FFF5F7 0%, #FFE8EF 50%, #FFF9FA 100%)",
  card: "linear-gradient(160deg, #FFFFFF 0%, #FFF5F7 100%)",
  glow: "radial-gradient(ellipse at top, #FFB6C133 0%, transparent 70%)",
} as const;

export const cupidGradients = brandGradients;

export const brandRadius = {
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

export const cupidRadius = brandRadius;

export const brandShadows = {
  sm: "0 1px 3px 0 #FF4F8114",
  md: "0 4px 12px -2px #FF4F8120",
  lg: "0 8px 24px -4px #FF4F8128",
  glow: "0 0 24px -4px #FF85A240",
} as const;

export const cupidShadows = brandShadows;

export type MatchScoreTier = "exceptional" | "strong" | "moderate" | "low";

export function getMatchScoreTier(score: number): MatchScoreTier {
  if (score >= 90) return "exceptional";
  if (score >= 75) return "strong";
  if (score >= 60) return "moderate";
  return "low";
}
