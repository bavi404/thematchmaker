"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CompatibilityScore } from "@/components/matching/compatibility-score";
import type { Customer, MatchCandidate } from "@/types";
import { getCustomerFullName } from "@/lib/data/customers";

interface MatchCardProps {
  candidate: MatchCandidate;
  candidateCustomer: Customer;
  clientName: string;
  index?: number;
}

export function MatchCard({
  candidate,
  candidateCustomer,
  clientName,
  index = 0,
}: MatchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
    >
      <Card className="overflow-hidden rounded-2xl border-rose-100/80 bg-white/90 shadow-sm transition-shadow hover:shadow-md hover:shadow-rose-100/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <CompatibilityScore score={candidate.compatibilityScore} size="lg" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-rose-100 text-xs text-rose-700">
                    {candidateCustomer.firstName[0]}
                    {candidateCustomer.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-rose-950">
                    {getCustomerFullName(candidateCustomer)}
                  </p>
                  <p className="text-xs text-rose-400">
                    Match for {clientName}
                  </p>
                </div>
              </div>

              <div className="mt-2 space-y-1">
                <p className="flex items-center gap-1.5 text-xs text-rose-500">
                  <Briefcase className="h-3 w-3" />
                  {candidateCustomer.occupation}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-rose-500">
                  <MapPin className="h-3 w-3" />
                  {candidateCustomer.location}
                </p>
              </div>

              {candidate.highlights.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {candidate.highlights.map((h) => (
                    <Badge
                      key={h}
                      variant="outline"
                      className="border-emerald-200 bg-emerald-50 text-[10px] text-emerald-700"
                    >
                      {h}
                    </Badge>
                  ))}
                </div>
              )}

              {candidate.concerns.length > 0 && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {candidate.concerns.map((c) => (
                    <Badge
                      key={c}
                      variant="outline"
                      className="border-amber-200 bg-amber-50 text-[10px] text-amber-700"
                    >
                      {c}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              size="sm"
              className="flex-1 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700"
              render={<Link href={`/customers/${candidate.customerId}`} />}
            >
              View Profile
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl border-rose-200 text-rose-700 hover:bg-rose-50"
            >
              Propose Match
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
