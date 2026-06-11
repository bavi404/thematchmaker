import type { Customer } from "@/types";
import type { MatchCandidate } from "@/types";

export interface AIInsight {
  id: string;
  type: "recommendation" | "observation" | "action";
  title: string;
  description: string;
  confidence: number;
}

export function generateCustomerInsights(customer: Customer): AIInsight[] {
  const insights: AIInsight[] = [];

  if (customer.status === "active") {
    insights.push({
      id: "insight-1",
      type: "action",
      title: "Schedule follow-up consultation",
      description: `It has been ${daysSince(customer.lastContactAt)} days since last contact with ${customer.firstName}. A personal check-in may strengthen rapport.`,
      confidence: 0.89,
    });
  }

  if (customer.tier === "platinum") {
    insights.push({
      id: "insight-2",
      type: "observation",
      title: "Premium client engagement",
      description: `${customer.firstName} is a ${customer.tier} tier member. Consider prioritizing curated introductions and exclusive events.`,
      confidence: 0.95,
    });
  }

  if (customer.tags.includes("Referral")) {
    insights.push({
      id: "insight-3",
      type: "recommendation",
      title: "Referral network opportunity",
      description: "This client came through referral. Maintain exceptional service to encourage word-of-mouth growth.",
      confidence: 0.82,
    });
  }

  return insights;
}

export function generateMatchInsight(
  customer: Customer,
  candidate: MatchCandidate
): string {
  if (candidate.compatibilityScore >= 90) {
    return `Exceptional match potential for ${customer.firstName}. Compatibility indicators suggest strong alignment across key preference dimensions. Recommend expedited introduction.`;
  }
  if (candidate.compatibilityScore >= 75) {
    return `Promising compatibility with notable strengths. A facilitated introduction would allow both parties to assess personal chemistry beyond profile metrics.`;
  }
  return `Moderate compatibility score. Consider as a secondary option or revisit after preference refinement during next consultation.`;
}

function daysSince(dateStr: string): number {
  const date = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
}
