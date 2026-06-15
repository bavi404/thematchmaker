import type { Customer } from "@/types";
import type { CompatibilityExplanation } from "@/types/compatibility-explanation";
import { getCustomerFullName } from "@/types";

function formatReasons(reasons: readonly string[]): string {
  if (reasons.length === 0) return "";
  if (reasons.length === 1) return reasons[0]!;
  if (reasons.length === 2) {
    return `${reasons[0]} and ${reasons[1].toLowerCase()}`;
  }
  const last = reasons[reasons.length - 1]!;
  const rest = reasons.slice(0, -1).join(", ");
  return `${rest}, and ${last.toLowerCase()}`;
}

/** Rule-based warm introduction copy for match proposals */
export function generateMatchIntroduction(
  client: Customer,
  candidate: Customer,
  explanation: CompatibilityExplanation
): string {
  const candidateName = getCustomerFullName(candidate);
  const topReasons = explanation.reasons.slice(0, 3);
  const alignmentNote =
    topReasons.length > 0
      ? `Our analysis highlights meaningful alignment: ${formatReasons(topReasons)}.`
      : `This introduction reflects a ${explanation.label.toLowerCase()} based on your shared profile preferences.`;

  return `Dear ${client.firstName},

We are pleased to introduce ${candidateName}, ${candidate.age}, a ${candidate.designation} at ${candidate.company} based in ${candidate.city}. With a compatibility score of ${explanation.score}% (${explanation.label}), this curated match reflects thoughtful consideration of your preferences and values.

${alignmentNote}

We believe this introduction offers genuine potential for connection. When you are ready, we would be delighted to arrange a private meeting at your convenience.

Warm regards,
The MatchMaker Team`;
}
