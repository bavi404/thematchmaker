import { MapPin, Calendar, Mail, Phone } from "lucide-react";
import { MatchmakerAvatar, StatusBadge } from "@/components/matchmaker";
import type { Customer } from "@/types";
import { getCustomerDisplayLocation, getCustomerFullName } from "@/types";
import { formatDate } from "@/lib/formatters";

interface CustomerProfileHeaderProps {
  customer: Customer;
}

export function CustomerProfileHeader({ customer }: CustomerProfileHeaderProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-cupid-border/80 bg-gradient-to-br from-white via-cupid-background/40 to-cupid-secondary/15 shadow-md shadow-cupid-primary/5">
      <div className="h-24 bg-gradient-to-r from-cupid-primary/20 via-cupid-accent/15 to-cupid-secondary/30 sm:h-28" />
      <div className="relative px-4 pb-6 sm:px-6">
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:gap-6">
          <div className="relative shrink-0">
            <MatchmakerAvatar
              initials={`${customer.firstName[0]}${customer.lastName[0]}`}
              size="xl"
              status={customer.status}
              className="ring-4 ring-white shadow-lg"
            />
          </div>

          <div className="min-w-0 flex-1 pb-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-heading text-2xl font-semibold text-cupid-foreground sm:text-3xl">
                {getCustomerFullName(customer)}
              </h1>
              <StatusBadge status={customer.status} />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-cupid-muted-foreground">
              <span className="font-medium text-cupid-foreground">
                {customer.age} years
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-cupid-accent" />
                {getCustomerDisplayLocation(customer)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-cupid-accent" />
                DOB {formatDate(customer.dob)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 border-t border-cupid-border/40 pt-4 text-xs text-cupid-muted-foreground">
          <a
            href={`mailto:${customer.email}`}
            className="flex items-center gap-1.5 transition-colors hover:text-cupid-primary"
          >
            <Mail className="h-3.5 w-3.5" />
            {customer.email}
          </a>
          <a
            href={`tel:${customer.phone}`}
            className="flex items-center gap-1.5 transition-colors hover:text-cupid-primary"
          >
            <Phone className="h-3.5 w-3.5" />
            {customer.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
