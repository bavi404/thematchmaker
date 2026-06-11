"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { customers, getCustomerFullName } from "@/lib/data/customers";
import { matches } from "@/lib/data/matches";
import { CompatibilityScore } from "@/components/matching/compatibility-score";

const statusStyles: Record<string, string> = {
  proposed: "bg-amber-50 text-amber-700 border-amber-200",
  introduced: "bg-sky-50 text-sky-700 border-sky-200",
  "in-progress": "bg-rose-50 text-rose-700 border-rose-200",
  successful: "bg-emerald-50 text-emerald-700 border-emerald-200",
  declined: "bg-neutral-50 text-neutral-500 border-neutral-200",
};

export function RecentMatches() {
  const recentMatches = matches.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="rounded-2xl border-rose-100/80 bg-white/80 shadow-sm shadow-rose-100/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="font-heading text-base font-semibold text-rose-950">
              Recent Matches
            </CardTitle>
            <p className="text-xs text-rose-400">Latest introductions and pairings</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentMatches.map((match) => {
            const customerA = customers.find((c) => c.id === match.customerAId);
            const customerB = customers.find((c) => c.id === match.customerBId);
            if (!customerA || !customerB) return null;

            return (
              <div
                key={match.id}
                className="flex items-center gap-3 rounded-xl border border-rose-50 bg-gradient-to-r from-white to-rose-50/30 p-3 transition-colors hover:border-rose-100"
              >
                <div className="flex -space-x-2">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarFallback className="bg-rose-200 text-[10px] text-rose-800">
                      {customerA.firstName[0]}
                      {customerA.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarFallback className="bg-amber-200 text-[10px] text-amber-800">
                      {customerB.firstName[0]}
                      {customerB.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-rose-950">
                    {getCustomerFullName(customerA)} & {getCustomerFullName(customerB)}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <CompatibilityScore score={match.compatibilityScore} size="sm" />
                    <Badge
                      variant="outline"
                      className={statusStyles[match.status]}
                    >
                      {match.status}
                    </Badge>
                  </div>
                </div>
                <Link
                  href={`/customers/${customerA.id}`}
                  className="shrink-0 text-rose-400 transition-colors hover:text-rose-600"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}
