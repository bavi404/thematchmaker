import { notFound } from "next/navigation";
import { CustomerDetail } from "@/components/customer/customer-detail";
import { getCustomerById } from "@/lib/data/customers";
import { getMatchPreferencesByCustomerId } from "@/lib/data/match-preferences";
import { getMeetingNotesByCustomerId } from "@/lib/data/meeting-notes";
import { buildEnrichedMatches } from "@/lib/matching/build-enriched-matches";

interface CustomerPageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerPage({ params }: CustomerPageProps) {
  const { id } = await params;
  const customer = getCustomerById(id);

  if (!customer) {
    notFound();
  }

  const enrichedMatches = buildEnrichedMatches(customer);
  const preferences = getMatchPreferencesByCustomerId(id) ?? null;
  const notes = getMeetingNotesByCustomerId(id);

  return (
    <CustomerDetail
      customer={customer}
      enrichedMatches={enrichedMatches}
      preferences={preferences}
      notes={notes}
    />
  );
}
