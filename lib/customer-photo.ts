import type { Customer } from "@/types";

/** Deterministic portrait URL for mock customer profiles */
export function getCustomerPortraitUrl(customer: Customer): string {
  const seed = encodeURIComponent(`${customer.id}-${customer.firstName}`);
  const style = customer.gender === "female" ? "personas" : "personas";
  return `https://api.dicebear.com/9.x/${style}/png?seed=${seed}&backgroundColor=ffb6c1,ffd5e0,fff5f7`;
}
