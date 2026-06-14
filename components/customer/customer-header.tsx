import { MapPin, Mail, Phone, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  MatchmakerAvatar,
  StatusBadge,
} from "@/components/matchmaker";
import type { Customer } from "@/types";
import { getCustomerDisplayLocation, getCustomerFullName } from "@/types";

interface CustomerHeaderProps {
  customer: Customer;
}

export function CustomerHeader({ customer }: CustomerHeaderProps) {
  return (
    <div className="rounded-2xl border border-cupid-border/80 bg-gradient-to-br from-white via-cupid-background/30 to-cupid-secondary/10 p-6 shadow-sm shadow-cupid-primary/5">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <MatchmakerAvatar
          initials={`${customer.firstName[0]}${customer.lastName[0]}`}
          size="xl"
          status={customer.status}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-heading text-2xl font-semibold text-cupid-foreground">
              {getCustomerFullName(customer)}
            </h2>
            <StatusBadge status={customer.status} />
          </div>

          <p className="mt-1 text-sm text-cupid-muted-foreground">
            {customer.designation} · {customer.degree}, {customer.college}
          </p>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cupid-foreground/80">
            {customer.hobbies.join(" · ")} · {customer.motherTongue} speaker ·{" "}
            {customer.maritalStatus.replace("-", " ")}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-cupid-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {getCustomerDisplayLocation(customer)}
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
              <Briefcase className="h-3.5 w-3.5" />
              {customer.company}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge variant="outline" className="border-cupid-border text-[10px] text-cupid-muted-foreground">
              {customer.religion}
            </Badge>
            <Badge variant="outline" className="border-cupid-border text-[10px] text-cupid-muted-foreground">
              {customer.dietPreference}
            </Badge>
            {customer.openToRelocate && (
              <Badge variant="outline" className="border-cupid-border text-[10px] text-cupid-muted-foreground">
                Open to relocate
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
