"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  CUSTOMER_JOURNEY_STAGES,
  getJourneyStageIndex,
  getStepState,
} from "@/types/customer-journey";
import type { Customer } from "@/types";
import { MatchmakerCard, MatchmakerCardContent } from "@/components/matchmaker";
import { cn } from "@/lib/utils";

interface CustomerJourneyProps {
  customer: Customer;
  className?: string;
}

export function CustomerJourney({ customer, className }: CustomerJourneyProps) {
  const currentIndex = getJourneyStageIndex(customer.id, customer.status);
  const currentStage = CUSTOMER_JOURNEY_STAGES[currentIndex];

  return (
    <MatchmakerCard
      variant="gradient"
      heartCorner
      className={cn("overflow-hidden", className)}
    >
      <MatchmakerCardContent className="p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-heading text-base font-semibold text-cupid-foreground">
              Customer Journey
            </h3>
            <p className="text-xs text-cupid-muted-foreground">
              Track progress through the matchmaking pipeline
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2 inline-flex items-center gap-2 rounded-full border border-cupid-primary/30 bg-cupid-primary/10 px-3 py-1 sm:mt-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cupid-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cupid-primary" />
            </span>
            <span className="text-xs font-medium text-cupid-primary">
              Current: {currentStage.label}
            </span>
          </motion.div>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-[720px] items-start justify-between px-1">
            {CUSTOMER_JOURNEY_STAGES.map((stage, index) => {
              const state = getStepState(index, currentIndex);
              const isLast = index === CUSTOMER_JOURNEY_STAGES.length - 1;

              return (
                <div key={stage.id} className="flex flex-1 items-start">
                  <JourneyStep
                    stage={stage}
                    state={state}
                    index={index}
                  />
                  {!isLast && (
                    <ConnectorLine
                      completed={index < currentIndex}
                      index={index}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 border-t border-cupid-border/40 pt-4 text-[10px] uppercase tracking-wider text-cupid-muted-foreground">
          <LegendItem color="bg-cupid-primary" label="Completed" />
          <LegendItem color="bg-cupid-primary ring-4 ring-cupid-primary/25" label="Current" pulse />
          <LegendItem color="bg-cupid-muted border border-cupid-border" label="Upcoming" />
        </div>
      </MatchmakerCardContent>
    </MatchmakerCard>
  );
}

function JourneyStep({
  stage,
  state,
  index,
}: {
  stage: (typeof CUSTOMER_JOURNEY_STAGES)[number];
  state: "completed" | "current" | "future";
  index: number;
}) {
  const Icon = stage.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="flex w-16 shrink-0 flex-col items-center sm:w-20"
    >
      <div className="relative">
        {state === "current" && (
          <motion.span
            className="absolute inset-0 rounded-full bg-cupid-primary/30"
            animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <motion.div
          className={cn(
            "relative flex size-10 items-center justify-center rounded-full border-2 transition-colors sm:size-11",
            state === "completed" &&
              "border-cupid-primary bg-cupid-primary text-white shadow-md shadow-cupid-primary/30",
            state === "current" &&
              "border-cupid-primary bg-white text-cupid-primary shadow-lg shadow-cupid-primary/25 ring-4 ring-cupid-primary/20",
            state === "future" &&
              "border-cupid-border bg-cupid-muted/50 text-cupid-muted-foreground"
          )}
          animate={
            state === "current"
              ? { scale: [1, 1.06, 1] }
              : undefined
          }
          transition={
            state === "current"
              ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        >
          {state === "completed" ? (
            <Check className="size-4 sm:size-5" strokeWidth={2.5} />
          ) : (
            <Icon className="size-4 sm:size-4.5" />
          )}
        </motion.div>
      </div>
      <p
        className={cn(
          "mt-2 max-w-[4.5rem] text-center text-[10px] font-medium leading-tight sm:max-w-none sm:text-xs",
          state === "completed" && "text-cupid-primary",
          state === "current" && "font-semibold text-cupid-primary",
          state === "future" && "text-cupid-muted-foreground"
        )}
      >
        <span className="hidden sm:inline">{stage.label}</span>
        <span className="sm:hidden">{stage.shortLabel}</span>
      </p>
    </motion.div>
  );
}

function ConnectorLine({
  completed,
  index,
}: {
  completed: boolean;
  index: number;
}) {
  return (
    <div className="relative mx-0.5 mt-5 h-0.5 flex-1 min-w-[12px] overflow-hidden rounded-full bg-cupid-border/60 sm:mx-1">
      <motion.div
        className={cn(
          "absolute inset-y-0 left-0 rounded-full",
          completed
            ? "bg-gradient-to-r from-cupid-primary to-cupid-accent"
            : "bg-transparent"
        )}
        initial={{ width: "0%" }}
        animate={{ width: completed ? "100%" : "0%" }}
        transition={{ duration: 0.5, delay: index * 0.08 + 0.2, ease: "easeOut" }}
      />
    </div>
  );
}

function LegendItem({
  color,
  label,
  pulse,
}: {
  color: string;
  label: string;
  pulse?: boolean;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="relative flex size-2.5">
        {pulse && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cupid-primary/40" />
        )}
        <span className={cn("relative inline-flex size-2.5 rounded-full", color)} />
      </span>
      {label}
    </span>
  );
}
