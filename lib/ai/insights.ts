import type { Customer } from "@/types";

export interface AIInsight {
  id: string;
  type: "recommendation" | "observation" | "action";
  title: string;
  description: string;
  confidence: number;
}

export function generateCustomerInsights(customer: Customer): AIInsight[] {
  const insights: AIInsight[] = [];

  if (customer.status === "MATCHING" || customer.status === "NEW") {
    insights.push({
      id: "insight-1",
      type: "action",
      title: "Schedule follow-up consultation",
      description: `${customer.firstName} is in ${customer.status.toLowerCase()} status. A personal check-in may strengthen rapport and refine preferences.`,
      confidence: 0.89,
    });
  }

  if (customer.income >= 3000000) {
    insights.push({
      id: "insight-2",
      type: "observation",
      title: "Premium client profile",
      description: `${customer.firstName} holds a senior ${customer.designation} role. Consider prioritizing curated introductions and exclusive events.`,
      confidence: 0.95,
    });
  }

  if (customer.openToRelocate) {
    insights.push({
      id: "insight-3",
      type: "recommendation",
      title: "Expanded location matching",
      description: "Client is open to relocation — broaden geographic search beyond current city.",
      confidence: 0.82,
    });
  }

  return insights;
}

export function generateMatchInsight(
  customer: Customer,
  score: number
): string {
  if (score >= 90) {
    return `Exceptional match potential for ${customer.firstName}. Compatibility indicators suggest strong alignment across key preference dimensions. Recommend expedited introduction.`;
  }
  if (score >= 75) {
    return `Promising compatibility with notable strengths. A facilitated introduction would allow both parties to assess personal chemistry beyond profile metrics.`;
  }
  return `Moderate compatibility score. Consider as a secondary option or revisit after preference refinement during next consultation.`;
}
