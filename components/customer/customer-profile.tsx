"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MatchCard } from "@/components/matching/match-card";
import type { Customer, MatchCandidate } from "@/types";
import type { AIInsight } from "@/lib/ai/insights";
import { getCustomerById } from "@/lib/data/customers";

interface CustomerProfileProps {
  customer: Customer;
  matchCandidates: MatchCandidate[];
  insights: AIInsight[];
}

export function CustomerProfile({
  customer,
  matchCandidates,
  insights,
}: CustomerProfileProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="rounded-2xl border-cupid-border/80 bg-white/80 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 font-heading text-base text-cupid-foreground">
                <Heart className="h-4 w-4 text-cupid-accent" />
                Profile Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <DetailRow label="Age" value={`${customer.age} years`} />
              <DetailRow label="Height" value={`${customer.height} cm`} />
              <DetailRow label="Location" value={`${customer.city}, ${customer.country}`} />
              <DetailRow label="Languages" value={customer.languages.join(", ")} />
              <DetailRow label="Family Type" value={customer.familyType} />
              <DetailRow label="Siblings" value={String(customer.siblings)} />
              <DetailRow label="Wants Kids" value={customer.wantsKids ? "Yes" : "No"} />
              <DetailRow label="Open to Pets" value={customer.openToPets ? "Yes" : "No"} />
              <DetailRow label="Income" value={`₹${(customer.income / 100000).toFixed(1)}L`} />
            </CardContent>
          </Card>

          <Card className="mt-4 rounded-2xl border-cupid-border/80 bg-white/80 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 font-heading text-base text-cupid-foreground">
                <Sparkles className="h-4 w-4 text-amber-400" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className="rounded-xl border border-cupid-muted bg-gradient-to-r from-cupid-background/50 to-cupid-secondary/10 p-3"
                >
                  <p className="text-xs font-medium text-cupid-foreground">
                    {insight.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-cupid-muted-foreground">
                    {insight.description}
                  </p>
                  <p className="mt-1.5 text-[10px] text-cupid-accent">
                    {Math.round(insight.confidence * 100)}% confidence
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-2"
          id="matching"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="mb-4 font-heading text-lg font-semibold text-cupid-foreground">
            Recommended Matches
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {matchCandidates.map((candidate, index) => {
              const candidateCustomer = getCustomerById(candidate.customerId);
              if (!candidateCustomer) return null;
              return (
                <MatchCard
                  key={candidate.customerId}
                  candidate={candidate}
                  candidateCustomer={candidateCustomer}
                  clientName={customer.firstName}
                  index={index}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-cupid-accent">
        {label}
      </p>
      <p className="text-cupid-foreground">{value}</p>
    </div>
  );
}
