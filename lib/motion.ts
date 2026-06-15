"use client";

import type { Transition, Variants } from "framer-motion";

/** Respect user motion preferences in Framer Motion configs */
export function usePrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getMotionTransition(
  reducedMotion: boolean,
  transition?: Transition
): Transition {
  if (reducedMotion) {
    return { duration: 0 };
  }
  return transition ?? { duration: 0.35, ease: [0.22, 1, 0.36, 1] };
}

export function getFadeUpVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0 },
    };
  }
  return {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };
}

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
} as const;
