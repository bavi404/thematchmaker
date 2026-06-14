import type React from "react";
import { cn } from "@/lib/utils";

function HeartIcon({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
      aria-hidden
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

interface HeartPatternProps {
  className?: string;
  opacity?: number;
}

/** Subtle repeating heart watermark for backgrounds */
export function HeartPattern({ className, opacity = 0.04 }: HeartPatternProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="cupid-heart-pattern"
            x="0"
            y="0"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="#FF4F81"
              opacity={opacity}
              transform="translate(18, 18) scale(0.5)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cupid-heart-pattern)" />
      </svg>
    </div>
  );
}

interface FloatingHeartsProps {
  className?: string;
}

/** Ambient floating hearts for hero / login surfaces */
export function FloatingHearts({ className }: FloatingHeartsProps) {
  const hearts = [
    { top: "8%", left: "6%", size: 14, opacity: 0.12, rotate: -15 },
    { top: "18%", right: "10%", size: 20, opacity: 0.08, rotate: 12 },
    { top: "55%", left: "4%", size: 10, opacity: 0.1, rotate: 8 },
    { top: "70%", right: "6%", size: 16, opacity: 0.09, rotate: -8 },
    { top: "40%", right: "18%", size: 8, opacity: 0.14, rotate: 20 },
  ];

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {hearts.map((heart, i) => (
        <HeartIcon
          key={i}
          className="absolute text-cupid-secondary"
          style={{
            top: heart.top,
            left: heart.left,
            right: heart.right,
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
            transform: `rotate(${heart.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

interface HeartCornerProps {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

/** Single decorative heart tucked in a card corner */
export function HeartCorner({
  className,
  position = "top-right",
}: HeartCornerProps) {
  const positionClasses = {
    "top-left": "top-3 left-3",
    "top-right": "top-3 right-3",
    "bottom-left": "bottom-3 left-3",
    "bottom-right": "bottom-3 right-3",
  };

  return (
    <HeartIcon
      className={cn(
        "pointer-events-none absolute text-cupid-secondary/30",
        positionClasses[position],
        className
      )}
      style={{ width: 16, height: 16 }}
    />
  );
}

interface HeartDividerProps {
  className?: string;
}

/** Section divider with a centered heart */
export function HeartDivider({ className }: HeartDividerProps) {
  return (
    <div
      className={cn("flex items-center gap-3", className)}
      role="separator"
      aria-hidden
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cupid-border to-transparent" />
      <HeartIcon className="h-3 w-3 text-cupid-accent/60" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cupid-border to-transparent" />
    </div>
  );
}

interface CupidSurfaceProps {
  children: React.ReactNode;
  className?: string;
  pattern?: boolean;
  floatingHearts?: boolean;
}

/** Branded surface wrapper with optional heart decorations */
export function CupidSurface({
  children,
  className,
  pattern = false,
  floatingHearts = false,
}: CupidSurfaceProps) {
  return (
    <div
      className={cn(
        "relative bg-cupid-background",
        className
      )}
    >
      {pattern && <HeartPattern />}
      {floatingHearts && <FloatingHearts />}
      <div className="relative">{children}</div>
    </div>
  );
}
