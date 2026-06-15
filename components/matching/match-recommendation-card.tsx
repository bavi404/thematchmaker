"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Baby,
  Ruler,
  Check,
  Send,
  UserRound,
} from "lucide-react";
import {
  MatchmakerCard,
  MatchmakerCardContent,
  MatchmakerButton,
  MatchScoreRing,
} from "@/components/matchmaker";
import { CompatibilityLabelBadge } from "./compatibility-label-badge";
import { SendMatchModal } from "./send-match-modal";
import { getCustomerPortraitUrl } from "@/lib/customer-photo";
import type { Customer, EnrichedMatch } from "@/types";
import { getCustomerFullName } from "@/types";
import { cn } from "@/lib/utils";

interface MatchRecommendationCardProps {
  match: EnrichedMatch;
  clientCustomer: Customer;
  isSent?: boolean;
  onMatchSent?: () => void;
  index?: number;
  className?: string;
}

const MAX_REASONS = 3;

export function MatchRecommendationCard({
  match,
  clientCustomer,
  isSent = false,
  onMatchSent,
  index = 0,
  className,
}: MatchRecommendationCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { candidateCustomer, explanation } = match;
  const topReasons = explanation.reasons.slice(0, MAX_REASONS);
  const portraitUrl = getCustomerPortraitUrl(candidateCustomer);

  const quickStats = [
    { icon: MapPin, label: candidateCustomer.city },
    { icon: GraduationCap, label: candidateCustomer.degree },
    { icon: Ruler, label: `${candidateCustomer.height} cm` },
    {
      icon: Baby,
      label: candidateCustomer.wantsKids ? "Wants children" : "No children",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <MatchmakerCard
        variant="elevated"
        heartCorner
        className="group overflow-hidden border-cupid-border/50 bg-white p-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cupid-primary/15"
      >
        <div className="relative h-52 overflow-hidden">
          <Image
            src={portraitUrl}
            alt={`Portrait of ${getCustomerFullName(candidateCustomer)}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent" />

          <div className="absolute left-3 top-3">
            <CompatibilityLabelBadge label={explanation.label} />
          </div>

          <div className="absolute bottom-3 right-3 rounded-full bg-white/95 p-0.5 shadow-lg shadow-black/10 ring-1 ring-white/80 backdrop-blur-sm">
            <MatchScoreRing score={explanation.score} size={56} />
          </div>

          <div className="absolute bottom-3 left-3 right-20">
            <p className="font-heading text-lg font-semibold leading-tight text-white drop-shadow-sm">
              {getCustomerFullName(candidateCustomer)}
            </p>
            <p className="mt-0.5 text-sm font-medium text-white/90">
              {candidateCustomer.age} years
            </p>
          </div>
        </div>

        <MatchmakerCardContent className="space-y-4 p-4 pt-3.5 sm:p-5">
          <div className="flex items-start gap-2.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-cupid-primary/10">
              <Briefcase className="size-3.5 text-cupid-primary" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-cupid-foreground">
                {candidateCustomer.designation}
              </p>
              <p className="truncate text-xs text-cupid-muted-foreground">
                {candidateCustomer.company}
              </p>
            </div>
          </div>

          {topReasons.length > 0 && (
            <div className="rounded-xl border border-cupid-border/40 bg-gradient-to-br from-cupid-background/80 to-white p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-cupid-muted-foreground">
                Top compatibility
              </p>
              <ul className="space-y-1.5">
                {topReasons.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-start gap-2 text-xs leading-snug text-cupid-foreground"
                  >
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <Check className="size-2.5 text-emerald-600" strokeWidth={3} />
                    </span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            {quickStats.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-lg border border-cupid-border/30 bg-cupid-background/50 px-2.5 py-2"
              >
                <Icon className="size-3.5 shrink-0 text-cupid-accent" />
                <span className="truncate text-[11px] font-medium text-cupid-foreground/90">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-0.5">
            <MatchmakerButton
              variant="outline"
              size="sm"
              className="flex-1"
              render={<Link href={`/customers/${match.customerId}`} />}
            >
              <UserRound />
              View Profile
            </MatchmakerButton>
            <MatchmakerButton
              variant={isSent ? "soft" : "gradient"}
              size="sm"
              className={cn("flex-1", isSent && "pointer-events-none")}
              disabled={isSent}
              onClick={() => setModalOpen(true)}
            >
              <Send className={cn(isSent && "opacity-60")} />
              {isSent ? "Match Sent" : "Send Match"}
            </MatchmakerButton>
          </div>
        </MatchmakerCardContent>
      </MatchmakerCard>

      <SendMatchModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        clientCustomer={clientCustomer}
        candidateCustomer={candidateCustomer}
        explanation={explanation}
        onSent={() => onMatchSent?.()}
      />
    </motion.div>
  );
}
