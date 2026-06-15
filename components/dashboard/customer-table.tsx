"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  ArrowUpDown,
  ChevronRight,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import {
  MatchmakerCard,
  MatchmakerCardHeader,
  MatchmakerCardTitle,
  MatchmakerCardContent,
  MatchmakerAvatar,
  StatusBadge,
} from "@/components/matchmaker";
import { customers } from "@/lib/data/customers";
import { allCustomerStatuses } from "@/lib/data/dashboard-metrics";
import type { Customer, CustomerStatus } from "@/types";
import { getCustomerFullName } from "@/types";
import { formatMaritalStatus } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type SortField = "age" | "city" | "none";
type SortDirection = "asc" | "desc";

export function CustomerTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "ALL">("ALL");
  const [sortField, setSortField] = useState<SortField>("none");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (c) =>
          getCustomerFullName(c).toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "ALL") {
      result = result.filter((c) => c.status === statusFilter);
    }

    if (sortField === "age") {
      result.sort((a, b) =>
        sortDirection === "asc" ? a.age - b.age : b.age - a.age
      );
    } else if (sortField === "city") {
      result.sort((a, b) => {
        const cmp = a.city.localeCompare(b.city);
        return sortDirection === "asc" ? cmp : -cmp;
      });
    }

    return result;
  }, [search, statusFilter, sortField, sortDirection]);

  function toggleSort(field: "age" | "city") {
    if (sortField === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <MatchmakerCard variant="elevated" heartCorner className="overflow-hidden">
        <MatchmakerCardHeader className="border-b border-cupid-border/40 pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <MatchmakerCardTitle className="text-lg font-semibold">
                Customer Directory
              </MatchmakerCardTitle>
              <p className="mt-1 text-xs text-cupid-muted-foreground">
                {filteredCustomers.length} of {customers.length} clients
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <label htmlFor="customer-search" className="sr-only">
                Search customers
              </label>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cupid-secondary" aria-hidden />
              <Input
                id="customer-search"
                placeholder="Search by name, city, email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 rounded-xl border-cupid-border bg-white pl-9 focus-visible:border-cupid-accent focus-visible:ring-cupid-accent/30"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-cupid-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filter
            </span>
            <FilterChip
              active={statusFilter === "ALL"}
              onClick={() => setStatusFilter("ALL")}
              label="All"
            />
            {allCustomerStatuses.map((status) => (
              <FilterChip
                key={status}
                active={statusFilter === status}
                onClick={() => setStatusFilter(status)}
                label={status}
              />
            ))}

            <span className="mx-1 hidden h-4 w-px bg-cupid-border sm:inline" />

            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 rounded-lg border-cupid-border text-xs",
                sortField === "age" && "border-cupid-primary bg-cupid-primary/5 text-cupid-primary"
              )}
              aria-pressed={sortField === "age"}
              aria-label={`Sort by age${sortField === "age" ? `, ${sortDirection === "asc" ? "ascending" : "descending"}` : ""}`}
              onClick={() => toggleSort("age")}
            >
              <ArrowUpDown className="mr-1 h-3 w-3" aria-hidden />
              Age {sortField === "age" && (sortDirection === "asc" ? "↑" : "↓")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 rounded-lg border-cupid-border text-xs",
                sortField === "city" && "border-cupid-primary bg-cupid-primary/5 text-cupid-primary"
              )}
              aria-pressed={sortField === "city"}
              aria-label={`Sort by city${sortField === "city" ? `, ${sortDirection === "asc" ? "ascending" : "descending"}` : ""}`}
              onClick={() => toggleSort("city")}
            >
              <ArrowUpDown className="mr-1 h-3 w-3" aria-hidden />
              City {sortField === "city" && (sortDirection === "asc" ? "↑" : "↓")}
            </Button>
          </div>
        </MatchmakerCardHeader>

        <MatchmakerCardContent className="p-0">
          {filteredCustomers.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={Users}
                title="No clients found"
                description="Try adjusting your search or filters to find clients in your directory."
              />
            </div>
          ) : (
            <>
              {/* Mobile card list */}
              <div className="divide-y divide-cupid-muted/80 md:hidden">
                {filteredCustomers.map((customer, index) => (
                  <CustomerMobileCard
                    key={customer.id}
                    customer={customer}
                    index={index}
                  />
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="border-b border-cupid-border/60 bg-cupid-background/50">
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-cupid-muted-foreground">
                        Name
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-cupid-muted-foreground">
                        Age
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-cupid-muted-foreground">
                        City
                      </th>
                      <th scope="col" className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-cupid-muted-foreground md:table-cell">
                        Marital Status
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-cupid-muted-foreground">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-cupid-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cupid-muted/80">
                    {filteredCustomers.map((customer, index) => (
                      <CustomerRow key={customer.id} customer={customer} index={index} />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </MatchmakerCardContent>
      </MatchmakerCard>
    </motion.div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cupid-primary/40",
        active
          ? "border-cupid-primary bg-cupid-primary/10 text-cupid-primary"
          : "border-cupid-border bg-white text-cupid-muted-foreground hover:border-cupid-accent hover:text-cupid-foreground"
      )}
    >
      {label}
    </button>
  );
}

function CustomerMobileCard({
  customer,
  index,
}: {
  customer: Customer;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="p-4"
    >
      <Link href={`/customers/${customer.id}`} className="flex items-start gap-3">
        <MatchmakerAvatar
          initials={`${customer.firstName[0]}${customer.lastName[0]}`}
          size="default"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium text-cupid-foreground">
                {getCustomerFullName(customer)}
              </p>
              <p className="text-xs text-cupid-muted-foreground">
                {customer.age} · {customer.city}
              </p>
            </div>
            <StatusBadge status={customer.status} size="sm" />
          </div>
          <p className="mt-1 text-xs text-cupid-muted-foreground">
            {customer.designation}
          </p>
        </div>
        <ChevronRight className="mt-1 size-4 shrink-0 text-cupid-accent" aria-hidden />
      </Link>
    </motion.div>
  );
}

function CustomerRow({
  customer,
  index,
}: {
  customer: Customer;
  index: number;
}) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="group transition-colors hover:bg-cupid-background/40"
    >
      <td className="px-4 py-3">
        <Link
          href={`/customers/${customer.id}`}
          className="flex items-center gap-3"
        >
          <MatchmakerAvatar
            initials={`${customer.firstName[0]}${customer.lastName[0]}`}
            size="sm"
          />
          <div>
            <p className="font-medium text-cupid-foreground group-hover:text-cupid-primary">
              {getCustomerFullName(customer)}
            </p>
            <p className="text-xs text-cupid-muted-foreground">
              {customer.designation}
            </p>
          </div>
        </Link>
      </td>
      <td className="px-4 py-3 text-cupid-foreground">{customer.age}</td>
      <td className="px-4 py-3 text-cupid-foreground">{customer.city}</td>
      <td className="hidden px-4 py-3 text-cupid-muted-foreground md:table-cell">
        {formatMaritalStatus(customer.maritalStatus)}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={customer.status} size="sm" />
      </td>
      <td className="px-4 py-3 text-right">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1 rounded-lg text-cupid-primary hover:bg-cupid-primary/10 hover:text-cupid-primary"
          render={<Link href={`/customers/${customer.id}`} />}
        >
          View
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </td>
    </motion.tr>
  );
}
