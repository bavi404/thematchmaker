import { notFound } from "next/navigation";
import { CustomerHeader } from "@/components/customer/customer-header";
import { CustomerProfile } from "@/components/customer/customer-profile";
import { getCustomerById } from "@/lib/data/customers";
import { findMatchCandidates } from "@/lib/matching";
import { generateCustomerInsights } from "@/lib/ai/insights";

interface CustomerPageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerPage({ params }: CustomerPageProps) {
  const { id } = await params;
  const customer = getCustomerById(id);

  if (!customer) {
    notFound();
  }

  const matchCandidates = findMatchCandidates(customer);
  const insights = generateCustomerInsights(customer);

  return (
    <div className="space-y-6">
      <CustomerHeader customer={customer} />
      <CustomerProfile
        customer={customer}
        matchCandidates={matchCandidates}
        insights={insights}
      />
    </div>
  );
}
