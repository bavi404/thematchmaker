"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { customers, getCustomerFullName } from "@/lib/data/customers";

const tierStyles: Record<string, string> = {
  platinum: "bg-gradient-to-r from-rose-100 to-amber-100 text-rose-800 border-rose-200",
  gold: "bg-amber-50 text-amber-800 border-amber-200",
  silver: "bg-rose-50 text-rose-600 border-rose-100",
};

const statusStyles: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700",
  screening: "bg-sky-50 text-sky-700",
  matched: "bg-rose-50 text-rose-700",
  "on-hold": "bg-amber-50 text-amber-700",
  archived: "bg-neutral-50 text-neutral-500",
};

export function ClientList() {
  return (
    <motion.div
      id="clients"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      <Card className="rounded-2xl border-rose-100/80 bg-white/80 shadow-sm shadow-rose-100/50">
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-base font-semibold text-rose-950">
            Client Portfolio
          </CardTitle>
          <p className="text-xs text-rose-400">Active members under your care</p>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-rose-50">
            {customers.map((customer) => (
              <Link
                key={customer.id}
                href={`/customers/${customer.id}`}
                className="flex items-center gap-4 py-3 transition-colors first:pt-0 last:pb-0 hover:bg-rose-50/30 -mx-2 px-2 rounded-xl"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-rose-200 to-amber-100 text-xs font-medium text-rose-800">
                    {customer.firstName[0]}
                    {customer.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-rose-950">
                      {getCustomerFullName(customer)}
                    </p>
                    <Badge variant="outline" className={tierStyles[customer.tier]}>
                      {customer.tier}
                    </Badge>
                  </div>
                  <p className="truncate text-xs text-rose-400">
                    {customer.occupation} · {customer.location}
                  </p>
                </div>
                <Badge className={statusStyles[customer.status]}>
                  {customer.status}
                </Badge>
                <ChevronRight className="h-4 w-4 shrink-0 text-rose-300" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
