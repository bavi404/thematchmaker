import { MapPin, Mail, Phone, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Customer } from "@/types";
import { getCustomerFullName } from "@/lib/data/customers";

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

interface CustomerHeaderProps {
  customer: Customer;
}

export function CustomerHeader({ customer }: CustomerHeaderProps) {
  return (
    <div className="rounded-2xl border border-rose-100/80 bg-gradient-to-br from-white via-rose-50/30 to-amber-50/20 p-6 shadow-sm shadow-rose-100/50">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <Avatar className="h-20 w-20 border-4 border-white shadow-md shadow-rose-100">
          <AvatarFallback className="bg-gradient-to-br from-rose-300 to-amber-200 text-xl font-semibold text-rose-900">
            {customer.firstName[0]}
            {customer.lastName[0]}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-heading text-2xl font-semibold text-rose-950">
              {getCustomerFullName(customer)}
            </h2>
            <Badge variant="outline" className={tierStyles[customer.tier]}>
              {customer.tier}
            </Badge>
            <Badge className={statusStyles[customer.status]}>
              {customer.status}
            </Badge>
          </div>

          <p className="mt-1 text-sm text-rose-600">
            {customer.occupation} · {customer.education}
          </p>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-rose-700/80">
            {customer.bio}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-rose-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {customer.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {customer.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              {customer.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Member since {new Date(customer.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          </div>

          {customer.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {customer.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-rose-200 bg-white/60 text-[10px] text-rose-600"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
