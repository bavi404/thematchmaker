"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { FloatingHearts } from "./floating-hearts";

export function LoginIllustration() {
  return (
    <div className="relative hidden min-h-screen w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-cupid-primary via-[#FF6B94] to-cupid-accent p-10 text-white lg:flex xl:p-14">
      <FloatingHearts />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,182,193,0.2),transparent_45%)]" />

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center gap-3"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
          <Sparkles className="h-5 w-5" />
        </div>
        <span className="text-sm font-medium tracking-wide text-white/90">
          Premium Matchmaking CRM
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center py-12"
      >
        <div className="relative mx-auto flex h-64 w-64 items-center justify-center">
          <motion.div
            className="absolute h-56 w-56 rounded-full border border-white/20"
            animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute h-44 w-44 rounded-full border border-white/15"
            animate={{ scale: [1.06, 1, 1.06], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          <motion.div
            className="absolute left-4 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 shadow-lg backdrop-blur-sm"
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-lg font-semibold">A</span>
          </motion.div>

          <motion.div
            className="absolute right-4 top-1/2 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 shadow-lg backdrop-blur-sm"
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            <span className="text-lg font-semibold">B</span>
          </motion.div>

          <motion.div
            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="h-9 w-9 fill-cupid-primary text-cupid-primary" />
          </motion.div>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 256 256" aria-hidden>
            <motion.path
              d="M 72 128 Q 128 88 184 128"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
          </svg>
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 max-w-md text-center"
        >
          <p className="font-heading text-2xl font-medium leading-snug">
            &ldquo;Every great love story begins with a thoughtful introduction.&rdquo;
          </p>
          <p className="mt-3 text-sm text-white/70">
            Curate meaningful connections with elegance and care.
          </p>
        </motion.blockquote>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 text-xs text-white/50"
      >
        Trusted by premium matrimonial agencies worldwide
      </motion.p>
    </div>
  );
}
