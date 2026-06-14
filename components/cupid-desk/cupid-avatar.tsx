import { Heart } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import type { CupidClientStatus } from "@/lib/design-system";
import { getStatusConfig } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import { StatusDot } from "./status-badge";

type CupidAvatarSize = "sm" | "default" | "lg" | "xl";

const sizeMap: Record<CupidAvatarSize, string> = {
  sm: "size-8",
  default: "size-10",
  lg: "size-14",
  xl: "size-20",
};

const fallbackText: Record<CupidAvatarSize, string> = {
  sm: "text-[10px]",
  default: "text-xs",
  lg: "text-sm",
  xl: "text-xl",
};

interface CupidAvatarProps {
  src?: string;
  alt?: string;
  initials: string;
  size?: CupidAvatarSize;
  status?: CupidClientStatus;
  tier?: "platinum" | "gold" | "silver";
  className?: string;
}

const tierRing: Record<NonNullable<CupidAvatarProps["tier"]>, string> = {
  platinum: "ring-2 ring-cupid-primary ring-offset-2",
  gold: "ring-2 ring-amber-400 ring-offset-2",
  silver: "ring-2 ring-cupid-secondary ring-offset-1",
};

export function CupidAvatar({
  src,
  alt,
  initials,
  size = "default",
  status,
  tier,
  className,
}: CupidAvatarProps) {
  const shadcnSize = size === "xl" ? "lg" : size === "default" ? "default" : size;

  return (
    <div className={cn("relative inline-flex", className)}>
      <Avatar
        size={shadcnSize}
        className={cn(
          sizeMap[size],
          tier && tierRing[tier],
          "after:border-cupid-border/60"
        )}
      >
        {src && <AvatarImage src={src} alt={alt ?? initials} />}
        <AvatarFallback
          className={cn(
            fallbackText[size],
            "bg-gradient-to-br from-cupid-secondary to-cupid-accent/60 font-semibold text-cupid-foreground"
          )}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      {status && (
        <span
          className={cn(
            "absolute rounded-full ring-2 ring-white",
            size === "sm" && "-bottom-0 -right-0",
            size === "default" && "-bottom-0.5 -right-0.5",
            (size === "lg" || size === "xl") && "-bottom-1 -right-1"
          )}
        >
          <StatusDot status={status} />
        </span>
      )}
      {tier === "platinum" && !status && (
        <AvatarBadge className="bg-cupid-primary">
          <Heart className="size-2 fill-white text-white" />
        </AvatarBadge>
      )}
    </div>
  );
}

interface CupidCoupleAvatarProps {
  initialsA: string;
  initialsB: string;
  srcA?: string;
  srcB?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}

/** Side-by-side avatars for match pairs */
export function CupidCoupleAvatar({
  initialsA,
  initialsB,
  srcA,
  srcB,
  size = "default",
  className,
}: CupidCoupleAvatarProps) {
  const avatarSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "default";

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <div className="flex -space-x-3">
        <CupidAvatar src={srcA} initials={initialsA} size={avatarSize} />
        <CupidAvatar src={srcB} initials={initialsB} size={avatarSize} />
      </div>
      <span className="absolute -bottom-1 left-1/2 flex size-5 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-cupid-border">
        <Heart className="size-2.5 fill-cupid-primary text-cupid-primary" />
      </span>
    </div>
  );
}

interface CupidAvatarStackProps {
  initials: string[];
  max?: number;
  size?: "sm" | "default";
  className?: string;
}

/** Stacked avatar group for client lists */
export function CupidAvatarStack({
  initials,
  max = 4,
  size = "sm",
  className,
}: CupidAvatarStackProps) {
  const visible = initials.slice(0, max);
  const overflow = initials.length - max;

  return (
    <AvatarGroup className={className}>
      {visible.map((init, i) => (
        <CupidAvatar key={i} initials={init} size={size} />
      ))}
      {overflow > 0 && (
        <AvatarGroupCount className="bg-cupid-secondary/60 text-cupid-foreground text-xs">
          +{overflow}
        </AvatarGroupCount>
      )}
    </AvatarGroup>
  );
}

export function CupidAvatarWithStatusLabel({
  status,
  ...props
}: CupidAvatarProps & { status: CupidClientStatus }) {
  const config = getStatusConfig(status);
  return (
    <div className="flex flex-col items-center gap-1.5">
      <CupidAvatar {...props} status={status} />
      <span
        className="text-[10px] font-medium"
        style={{ color: config.foreground }}
      >
        {config.label}
      </span>
    </div>
  );
}
