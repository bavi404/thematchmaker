/** Shared Recharts pink palette for analytics */
export const CHART_COLORS = {
  primary: "#FF4F81",
  accent: "#FF85A2",
  secondary: "#FFB6C1",
  light: "#FFD5E0",
  pale: "#FFF0F5",
  grid: "#FCE7F3",
  tick: "#E8A0B8",
  tooltipBorder: "#FFC2D4",
} as const;

export const CHART_PINK_SCALE = [
  "#FF4F81",
  "#FF6B94",
  "#FF85A2",
  "#FFA0B8",
  "#FFB6C1",
  "#FFD0DC",
] as const;

export const chartTooltipStyle = {
  borderRadius: "12px",
  border: `1px solid ${CHART_COLORS.tooltipBorder}`,
  background: "rgba(255, 255, 255, 0.96)",
  fontSize: "12px",
  boxShadow: "0 8px 24px rgba(255, 79, 129, 0.12)",
} as const;

export const chartAxisTick = { fill: CHART_COLORS.tick, fontSize: 12 };
