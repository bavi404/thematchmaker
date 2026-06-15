"use client";

import Image from "next/image";
import { Sparkles, Send, MapPin, Briefcase } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { MatchmakerButton, MatchScoreRing } from "@/components/matchmaker";
import { CompatibilityLabelBadge } from "./compatibility-label-badge";
import { generateMatchIntroduction } from "@/lib/ai/generate-match-introduction";
import { getCustomerPortraitUrl } from "@/lib/customer-photo";
import { saveSentMatch } from "@/lib/match-sent";
import { useToast } from "@/components/providers/toast-provider";
import type { Customer } from "@/types";
import type { CompatibilityExplanation } from "@/types/compatibility-explanation";
import { getCustomerFullName } from "@/types";

interface SendMatchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientCustomer: Customer;
  candidateCustomer: Customer;
  explanation: CompatibilityExplanation;
  onSent: () => void;
}

export function SendMatchModal({
  open,
  onOpenChange,
  clientCustomer,
  candidateCustomer,
  explanation,
  onSent,
}: SendMatchModalProps) {
  const { showToast } = useToast();
  const introduction = generateMatchIntroduction(
    clientCustomer,
    candidateCustomer,
    explanation
  );
  const portraitUrl = getCustomerPortraitUrl(candidateCustomer);

  function handleSend() {
    saveSentMatch({
      clientCustomerId: clientCustomer.id,
      candidateCustomerId: candidateCustomer.id,
      compatibilityScore: explanation.score,
      introduction,
    });

    onSent();
    onOpenChange(false);
    showToast("❤️ Match Sent Successfully");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Send Match</DialogTitle>
          <DialogDescription>
            Review the introduction before sending to {clientCustomer.firstName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 px-5 py-1">
          {/* Suggested match */}
          <section>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-cupid-muted-foreground">
              Suggested Match
            </p>
            <div className="flex items-center gap-3 rounded-xl border border-cupid-border/50 bg-cupid-background/50 p-3">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl ring-2 ring-white shadow-sm">
                <Image
                  src={portraitUrl}
                  alt={getCustomerFullName(candidateCustomer)}
                  fill
                  className="object-cover object-top"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-cupid-foreground">
                  {getCustomerFullName(candidateCustomer)}
                </p>
                <p className="text-xs text-cupid-muted-foreground">
                  {candidateCustomer.age} years
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-cupid-muted-foreground">
                  <Briefcase className="size-3 shrink-0 text-cupid-accent" />
                  <span className="truncate">{candidateCustomer.designation}</span>
                </p>
                <p className="flex items-center gap-1 text-xs text-cupid-muted-foreground">
                  <MapPin className="size-3 shrink-0 text-cupid-accent" />
                  {candidateCustomer.city}
                </p>
              </div>
            </div>
          </section>

          {/* Compatibility score */}
          <section>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-cupid-muted-foreground">
              Compatibility Score
            </p>
            <div className="flex items-center gap-4 rounded-xl border border-cupid-border/50 bg-white p-3">
              <MatchScoreRing score={explanation.score} size={60} />
              <div className="space-y-1.5">
                <CompatibilityLabelBadge label={explanation.label} />
                <p className="text-xs text-cupid-muted-foreground">
                  {explanation.score}% alignment with {clientCustomer.firstName}&apos;s
                  preferences
                </p>
              </div>
            </div>
          </section>

          {/* AI introduction */}
          <section>
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cupid-muted-foreground">
              <Sparkles className="size-3.5 text-cupid-primary" />
              AI Generated Introduction
            </p>
            <div className="rounded-xl border border-cupid-primary/15 bg-gradient-to-br from-cupid-background/80 via-white to-cupid-secondary/10 p-4">
              <p className="whitespace-pre-line text-sm leading-relaxed text-cupid-foreground/90">
                {introduction}
              </p>
            </div>
          </section>
        </div>

        <DialogFooter>
          <MatchmakerButton
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </MatchmakerButton>
          <MatchmakerButton variant="gradient" size="sm" onClick={handleSend}>
            <Send />
            Send Match
          </MatchmakerButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
