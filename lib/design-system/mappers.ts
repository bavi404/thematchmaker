import type { CustomerStatus, MatchStatus } from "@/types";

/** Maps legacy CRM statuses to pipeline statuses — identity for new Customer model */
export function mapCustomerStatusToPipeline(status: CustomerStatus): CustomerStatus {
  return status;
}

const matchStatusMap: Record<MatchStatus, CustomerStatus> = {
  proposed: "MATCHING",
  introduced: "INTRO SENT",
  "in-progress": "ACTIVE MATCH",
  successful: "SUCCESS",
  declined: "VERIFIED",
};

export function mapMatchStatusToPipeline(status: MatchStatus): CustomerStatus {
  return matchStatusMap[status];
}

export const mapCustomerStatusToCupid = mapCustomerStatusToPipeline;
export const mapMatchStatusToCupid = mapMatchStatusToPipeline;
