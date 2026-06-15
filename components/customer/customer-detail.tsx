"use client";

import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  Users,
  Heart,
} from "lucide-react";
import {
  MatchmakerCard,
  MatchmakerCardHeader,
  MatchmakerCardTitle,
  MatchmakerCardContent,
} from "@/components/matchmaker";
import { CustomerTabs, CustomerTabPanel, type CustomerTab } from "./customer-tabs";
import { CustomerProfileHeader } from "./customer-profile-header";
import { CustomerJourney } from "./customer-journey";
import { MeetingNotesSection } from "./meeting-notes-section";
import { MatchRecommendationCard } from "@/components/matching/match-recommendation-card";
import type { Customer, MatchCandidate, MeetingNote } from "@/types";
import type { MatchPreferences } from "@/types/match-preferences";
import { getCustomerById } from "@/lib/data/customers";
import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";
import { getSentCandidateIds } from "@/lib/match-sent";

interface CustomerDetailProps {
  customer: Customer;
  matchCandidates: MatchCandidate[];
  preferences: MatchPreferences | null;
  notes: MeetingNote[];
}

export function CustomerDetail({
  customer,
  matchCandidates,
  preferences,
  notes,
}: CustomerDetailProps) {
  const [activeTab, setActiveTab] = useState<CustomerTab>("profile");
  const [noteCount, setNoteCount] = useState(notes.length);

  return (
    <div className="space-y-6">
      <CustomerProfileHeader customer={customer} />

      <CustomerJourney customer={customer} />

      <MatchmakerCard variant="elevated" className="overflow-hidden">
        <CustomerTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          matchCount={matchCandidates.length}
          noteCount={noteCount}
        />

        <div className="px-4 pb-6 sm:px-6">
          <CustomerTabPanel activeTab={activeTab} tab="profile">
            <ProfileSections customer={customer} preferences={preferences} />
          </CustomerTabPanel>

          <CustomerTabPanel activeTab={activeTab} tab="matches">
            <RecommendedMatchesSection
              customer={customer}
              matchCandidates={matchCandidates}
            />
          </CustomerTabPanel>

          <CustomerTabPanel activeTab={activeTab} tab="notes">
            <MeetingNotesSection
              customer={customer}
              initialNotes={notes}
              onNoteCountChange={setNoteCount}
            />
          </CustomerTabPanel>
        </div>
      </MatchmakerCard>
    </div>
  );
}

function ProfileSections({
  customer,
  preferences,
}: {
  customer: Customer;
  preferences: MatchPreferences | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid gap-4 md:grid-cols-2"
    >
      <InfoSection
        icon={User}
        title="Personal Information"
        rows={[
          { label: "Gender", value: capitalize(customer.gender) },
          { label: "Date of Birth", value: customer.dob },
          { label: "Age", value: `${customer.age} years` },
          { label: "Height", value: `${customer.height} cm` },
          { label: "City", value: customer.city },
          { label: "Country", value: customer.country },
          { label: "Religion", value: customer.religion },
          { label: "Mother Tongue", value: customer.motherTongue },
          { label: "Languages", value: customer.languages.join(", ") },
          { label: "Diet", value: formatLabel(customer.dietPreference) },
          { label: "Hobbies", value: customer.hobbies.join(", ") },
        ]}
      />

      <InfoSection
        icon={GraduationCap}
        title="Education & Career"
        rows={[
          { label: "Degree", value: customer.degree },
          { label: "College", value: customer.college },
          { label: "Designation", value: customer.designation },
          { label: "Company", value: customer.company },
          {
            label: "Annual Income",
            value: `₹${(customer.income / 100000).toFixed(1)} Lakhs`,
          },
        ]}
      />

      <InfoSection
        icon={Users}
        title="Family Details"
        rows={[
          { label: "Marital Status", value: formatLabel(customer.maritalStatus) },
          { label: "Family Type", value: capitalize(customer.familyType) },
          { label: "Siblings", value: String(customer.siblings) },
          { label: "Wants Children", value: customer.wantsKids ? "Yes" : "No" },
          { label: "Open to Pets", value: customer.openToPets ? "Yes" : "No" },
          {
            label: "Open to Relocate",
            value: customer.openToRelocate ? "Yes" : "No",
          },
        ]}
      />

      <InfoSection
        icon={Heart}
        title="Match Preferences"
        className="md:col-span-2 lg:col-span-1"
        rows={
          preferences
            ? [
                {
                  label: "Age Range",
                  value: `${preferences.ageRange[0]} – ${preferences.ageRange[1]} years`,
                },
                {
                  label: "Preferred Cities",
                  value: preferences.preferredCities.join(", "),
                },
                { label: "Religion", value: preferences.preferredReligion },
                { label: "Min. Education", value: preferences.minEducation },
                {
                  label: "Professions",
                  value: preferences.preferredProfessions.join(", "),
                },
                {
                  label: "Min. Income",
                  value: `₹${(preferences.minIncome / 100000).toFixed(1)} Lakhs`,
                },
                {
                  label: "Wants Children",
                  value: preferences.wantsKids ? "Yes" : "No",
                },
                {
                  label: "Open to Relocate",
                  value: preferences.openToRelocate ? "Yes" : "No",
                },
                {
                  label: "Open to Pets",
                  value: preferences.openToPets ? "Yes" : "No",
                },
              ]
            : [{ label: "Notes", value: "Preferences not yet recorded." }]
        }
        footer={preferences?.notes}
      />
    </motion.div>
  );
}

function InfoSection({
  icon: Icon,
  title,
  rows,
  footer,
  className,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  rows: { label: string; value: string }[];
  footer?: string;
  className?: string;
}) {
  return (
    <MatchmakerCard variant="default" className={cn("h-full", className)}>
      <MatchmakerCardHeader className="pb-2">
        <MatchmakerCardTitle className="flex items-center gap-2 text-base">
          <span className="flex size-8 items-center justify-center rounded-lg bg-cupid-primary/10">
            <Icon className="size-4 text-cupid-primary" />
          </span>
          {title}
        </MatchmakerCardTitle>
      </MatchmakerCardHeader>
      <MatchmakerCardContent>
        <dl className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-0.5 border-b border-cupid-muted/60 pb-3 last:border-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-4"
            >
              <dt className="text-xs font-medium uppercase tracking-wider text-cupid-muted-foreground">
                {row.label}
              </dt>
              <dd className="text-sm font-medium text-cupid-foreground sm:text-right">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
        {footer && (
          <p className="mt-4 rounded-xl bg-cupid-background/80 p-3 text-xs leading-relaxed text-cupid-muted-foreground">
            {footer}
          </p>
        )}
      </MatchmakerCardContent>
    </MatchmakerCard>
  );
}

function RecommendedMatchesSection({
  customer,
  matchCandidates,
}: {
  customer: Customer;
  matchCandidates: MatchCandidate[];
}) {
  const [sentCandidateIds, setSentCandidateIds] = useState<Set<string>>(
    () => new Set()
  );

  useEffect(() => {
    setSentCandidateIds(new Set(getSentCandidateIds(customer.id)));
  }, [customer.id]);

  const handleMatchSent = useCallback((candidateId: string) => {
    setSentCandidateIds((prev) => new Set([...prev, candidateId]));
  }, []);
  if (matchCandidates.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-cupid-muted-foreground">
        No recommended matches at this time.
      </p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="mb-5 text-sm text-cupid-muted-foreground">
        Curated introductions for {customer.firstName}, ranked by compatibility
        score and alignment on key preferences.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {matchCandidates.map((candidate, index) => {
          const candidateCustomer = getCustomerById(candidate.customerId);
          if (!candidateCustomer) return null;
          return (
            <MatchRecommendationCard
              key={candidate.customerId}
              candidate={candidate}
              candidateCustomer={candidateCustomer}
              clientCustomer={customer}
              isSent={sentCandidateIds.has(candidate.customerId)}
              onMatchSent={() => handleMatchSent(candidate.customerId)}
              index={index}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatLabel(value: string): string {
  return value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
