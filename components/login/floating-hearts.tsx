"use client";

import { motion } from "framer-motion";

const hearts = [
  { id: 1, size: 28, left: "10%", top: "15%", delay: 0, duration: 6, opacity: 0.18, rotate: -12 },
  { id: 2, size: 16, left: "82%", top: "10%", delay: 0.8, duration: 7, opacity: 0.12, rotate: 18 },
  { id: 3, size: 22, left: "70%", top: "58%", delay: 1.2, duration: 5.5, opacity: 0.15, rotate: 8 },
  { id: 4, size: 12, left: "6%", top: "65%", delay: 0.4, duration: 8, opacity: 0.1, rotate: -20 },
  { id: 5, size: 20, left: "45%", top: "6%", delay: 1.6, duration: 6.5, opacity: 0.14, rotate: 14 },
  { id: 6, size: 14, left: "90%", top: "75%", delay: 2, duration: 7.5, opacity: 0.11, rotate: -8 },
  { id: 7, size: 10, left: "28%", top: "80%", delay: 0.6, duration: 5, opacity: 0.16, rotate: 22 },
  { id: 8, size: 18, left: "55%", top: "40%", delay: 1, duration: 6.8, opacity: 0.09, rotate: -15 },
];

function HeartShape({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function FloatingHearts({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-cupid-primary"
          style={{ left: heart.left, top: heart.top }}
          initial={{ y: 0, rotate: heart.rotate, scale: 0.8, opacity: 0 }}
          animate={{
            y: [-14, 14, -14],
            rotate: [heart.rotate, heart.rotate + 10, heart.rotate - 6, heart.rotate],
            scale: [0.9, 1.05, 0.95, 0.9],
            opacity: [
              heart.opacity * 0.5,
              heart.opacity,
              heart.opacity * 0.75,
              heart.opacity * 0.5,
            ],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <HeartShape size={heart.size} />
        </motion.div>
      ))}
    </div>
  );
}
