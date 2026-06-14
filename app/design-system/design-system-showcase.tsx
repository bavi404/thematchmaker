"use client";

import {
  Users,
  Heart,
  Send,
  TrendingUp,
} from "lucide-react";
import {
  MatchmakerButton,
  MatchmakerCard,
  MatchmakerCardHeader,
  MatchmakerCardTitle,
  MatchmakerCardDescription,
  MatchmakerCardContent,
  StatusBadge,
  MatchScoreBadge,
  MatchScoreRing,
  MatchmakerAvatar,
  CoupleAvatar,
  AvatarStack,
  MetricCard,
  MetricCardGrid,
  HeartDivider,
  MatchmakerSurface,
  TierBadge,
} from "@/components/matchmaker";
import type { ClientPipelineStatus } from "@/lib/design-system";
import { clientStatusConfig, brandColors } from "@/lib/design-system";

const allStatuses: ClientPipelineStatus[] = [
  "NEW",
  "VERIFIED",
  "MATCHING",
  "INTRO SENT",
  "ACTIVE MATCH",
  "SUCCESS",
];

export function DesignSystemShowcase() {
  return (
    <MatchmakerSurface pattern floatingHearts className="min-h-screen py-12">
      <div className="mx-auto max-w-6xl space-y-12 px-4">
        <header className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-cupid-accent">
            The MatchMaker
          </p>
          <h1 className="mt-2 font-heading text-4xl font-semibold text-cupid-foreground">
            Design System
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-cupid-muted-foreground">
            Premium matchmaking CRM components — pink & rose-gold palette with
            subtle heart accents.
          </p>
        </header>

        <HeartDivider />

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-cupid-foreground">
            Brand Colors
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Object.entries(brandColors).map(([name, hex]) => (
              <div
                key={name}
                className="overflow-hidden rounded-2xl border border-cupid-border shadow-sm"
              >
                <div className="h-16" style={{ backgroundColor: hex }} />
                <div className="bg-white p-3">
                  <p className="text-xs font-medium capitalize text-cupid-foreground">
                    {name}
                  </p>
                  <p className="font-mono text-[10px] text-cupid-muted-foreground">
                    {hex}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-cupid-foreground">
            Buttons
          </h2>
          <MatchmakerCard variant="gradient" className="p-6">
            <div className="flex flex-wrap gap-3">
              <MatchmakerButton variant="primary">Primary</MatchmakerButton>
              <MatchmakerButton variant="secondary">Secondary</MatchmakerButton>
              <MatchmakerButton variant="accent">Accent</MatchmakerButton>
              <MatchmakerButton variant="gradient">Gradient</MatchmakerButton>
              <MatchmakerButton variant="outline">Outline</MatchmakerButton>
              <MatchmakerButton variant="ghost">Ghost</MatchmakerButton>
              <MatchmakerButton variant="soft">Soft</MatchmakerButton>
              <MatchmakerButton variant="destructive">Destructive</MatchmakerButton>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <MatchmakerButton size="sm">Small</MatchmakerButton>
              <MatchmakerButton size="default">Default</MatchmakerButton>
              <MatchmakerButton size="lg">Large</MatchmakerButton>
              <MatchmakerButton size="icon-sm" variant="primary">
                <Heart className="size-4" />
              </MatchmakerButton>
            </div>
          </MatchmakerCard>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-cupid-foreground">
            Cards
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(["default", "elevated", "gradient", "accent"] as const).map(
              (variant) => (
                <MatchmakerCard
                  key={variant}
                  variant={variant}
                  heartCorner={variant === "elevated"}
                >
                  <MatchmakerCardHeader>
                    <MatchmakerCardTitle className="capitalize">
                      {variant}
                    </MatchmakerCardTitle>
                    <MatchmakerCardDescription>
                      Matchmaker card variant
                    </MatchmakerCardDescription>
                  </MatchmakerCardHeader>
                  <MatchmakerCardContent>
                    <p className="text-xs text-cupid-muted-foreground">
                      Rounded, soft shadows, matrimonial CRM aesthetic.
                    </p>
                  </MatchmakerCardContent>
                </MatchmakerCard>
              )
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-cupid-foreground">
            Client Pipeline Statuses
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {allStatuses.map((status) => {
              const config = clientStatusConfig[status];
              return (
                <div
                  key={status}
                  className="flex items-center gap-3 rounded-2xl border border-cupid-border p-4"
                  style={{ backgroundColor: config.background }}
                >
                  <config.icon
                    className="size-5 shrink-0"
                    style={{ color: config.foreground }}
                  />
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: config.foreground }}
                    >
                      {status}
                    </p>
                    <p className="font-mono text-[10px] opacity-70" style={{ color: config.foreground }}>
                      {config.foreground}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-cupid-foreground">
            Status Badges
          </h2>
          <MatchmakerCard variant="default" className="p-6">
            <div className="flex flex-wrap gap-3">
              {allStatuses.map((status) => (
                <StatusBadge key={status} status={status} />
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {allStatuses.map((status) => (
                <StatusBadge
                  key={status}
                  status={status}
                  showIcon={false}
                  showDot
                  size="sm"
                />
              ))}
            </div>
          </MatchmakerCard>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-cupid-foreground">
            Match Score Badges
          </h2>
          <MatchmakerCard variant="default" className="p-6">
            <div className="flex flex-wrap items-center gap-6">
              <MatchScoreBadge score={94} showLabel />
              <MatchScoreBadge score={82} showLabel />
              <MatchScoreBadge score={68} showLabel />
              <MatchScoreBadge score={45} showLabel />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-8">
              <MatchScoreRing score={94} />
              <MatchScoreRing score={82} size={64} />
              <MatchScoreRing score={45} size={44} />
            </div>
          </MatchmakerCard>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-cupid-foreground">
            Tier Badges
          </h2>
          <MatchmakerCard variant="default" className="p-6">
            <div className="flex flex-wrap gap-3">
              <TierBadge tier="platinum" />
              <TierBadge tier="gold" />
              <TierBadge tier="silver" />
            </div>
          </MatchmakerCard>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-cupid-foreground">
            Avatars
          </h2>
          <MatchmakerCard variant="gradient" className="p-6">
            <div className="flex flex-wrap items-end gap-8">
              <MatchmakerAvatar initials="AS" size="sm" status="NEW" />
              <MatchmakerAvatar initials="RK" size="default" status="MATCHING" tier="platinum" />
              <MatchmakerAvatar initials="PM" size="lg" status="VERIFIED" tier="gold" />
              <MatchmakerAvatar initials="VI" size="xl" status="SUCCESS" tier="silver" />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-10">
              <CoupleAvatar initialsA="AS" initialsB="RK" size="lg" />
              <AvatarStack initials={["AS", "RK", "PM", "VI", "MI"]} />
            </div>
          </MatchmakerCard>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-xl font-semibold text-cupid-foreground">
            Dashboard Metrics
          </h2>
          <MetricCardGrid>
            <MetricCard
              label="Active Clients"
              value={248}
              change={12}
              trend="up"
              icon={Users}
              heartCorner
              index={0}
            />
            <MetricCard
              label="Introductions"
              value={34}
              change={8}
              trend="up"
              icon={Send}
              variant="gradient"
              index={1}
            />
            <MetricCard
              label="Successful Matches"
              value={18}
              change={3}
              trend="up"
              icon={Heart}
              variant="accent"
              index={2}
            />
            <MetricCard
              label="Pending"
              value={12}
              change={2}
              trend="down"
              icon={TrendingUp}
              description="Consultations awaiting schedule"
              index={3}
            />
          </MetricCardGrid>
        </section>
      </div>
    </MatchmakerSurface>
  );
}
