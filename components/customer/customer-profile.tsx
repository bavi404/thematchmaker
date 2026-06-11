"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MatchCard } from "@/components/matching/match-card";
import type { Customer } from "@/types";
import type { MatchCandidate } from "@/types";
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
          <Card className="rounded-2xl border-rose-100/80 bg-white/80 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 font-heading text-base text-rose-950">
                <Heart className="h-4 w-4 text-rose-400" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-rose-300">
                  Age Range
                </p>
                <p className="text-rose-800">
                  {customer.preferences.ageRange[0]} – {customer.preferences.ageRange[1]} years
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-rose-300">
                  Preferred Locations
                </p>
                <p className="text-rose-800">
                  {customer.preferences.location.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-rose-300">
                  Education
                </p>
                <p className="text-rose-800">{customer.preferences.education}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-rose-300">
                  Professions
                </p>
                <p className="text-rose-800">
                  {customer.preferences.profession.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-rose-300">
                  Lifestyle
                </p>
                <p className="text-rose-800">
                  {customer.preferences.lifestyle.join(", ")}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 rounded-2xl border-rose-100/80 bg-white/80 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 font-heading text-base text-rose-950">
                <Sparkles className="h-4 w-4 text-amber-400" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className="rounded-xl border border-rose-50 bg-gradient-to-r from-rose-50/50 to-amber-50/30 p-3"
                >
                  <p className="text-xs font-medium text-rose-900">
                    {insight.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-rose-600/80">
                    {insight.description}
                  </p>
                  <p className="mt-1.5 text-[10px] text-rose-400">
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
          <h3 className="mb-4 font-heading text-lg font-semibold text-rose-950">
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
