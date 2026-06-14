"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  MatchmakerCard,
  MatchmakerCardHeader,
  MatchmakerCardTitle,
  MatchmakerCardContent,
  MatchmakerAvatar,
  StatusBadge,
} from "@/components/matchmaker";
import { customers, getCustomerFullName, getCustomerDisplayLocation } from "@/lib/data/customers";

export function ClientList() {
  return (
    <motion.div
      id="clients"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <MatchmakerCard variant="elevated" heartCorner>
        <MatchmakerCardHeader className="pb-2">
          <MatchmakerCardTitle className="text-base font-semibold">
            Client Portfolio
          </MatchmakerCardTitle>
          <p className="text-xs text-cupid-muted-foreground">
            Active members under your care
          </p>
        </MatchmakerCardHeader>
        <MatchmakerCardContent>
          <div className="divide-y divide-cupid-muted">
            {customers.map((customer) => (
              <Link
                key={customer.id}
                href={`/customers/${customer.id}`}
                className="-mx-2 flex items-center gap-4 rounded-xl px-2 py-3 transition-colors first:pt-0 last:pb-0 hover:bg-cupid-background/60"
              >
                <MatchmakerAvatar
                  initials={`${customer.firstName[0]}${customer.lastName[0]}`}
                  size="default"
                  status={customer.status}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-cupid-foreground">
                    {getCustomerFullName(customer)}
                  </p>
                  <p className="truncate text-xs text-cupid-muted-foreground">
                    {customer.designation} · {getCustomerDisplayLocation(customer)}
                  </p>
                </div>
                <StatusBadge status={customer.status} size="sm" />
                <ChevronRight className="h-4 w-4 shrink-0 text-cupid-secondary" />
              </Link>
            ))}
          </div>
        </MatchmakerCardContent>
      </MatchmakerCard>
    </motion.div>
  );
}
