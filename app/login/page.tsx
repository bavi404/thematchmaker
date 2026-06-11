"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50/40 p-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-amber-200/25 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-rose-100/40 blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 shadow-lg shadow-rose-200/50"
          >
            <Sparkles className="h-6 w-6 text-white" />
          </motion.div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-rose-950">
            The MatchMaker
          </h1>
          <p className="mt-2 text-sm text-rose-500">
            Premium matrimonial agency portal
          </p>
        </div>

        <Card className="rounded-2xl border-rose-100/80 bg-white/80 shadow-xl shadow-rose-100/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-wider text-rose-400"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-300" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="consultant@matchmaker.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-xl border-rose-100 bg-rose-50/30 pl-10 focus-visible:border-rose-200 focus-visible:ring-rose-200/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-xs font-medium uppercase tracking-wider text-rose-400"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-300" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 rounded-xl border-rose-100 bg-rose-50/30 pl-10 focus-visible:border-rose-200 focus-visible:ring-rose-200/50"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="mt-2 h-11 w-full rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-sm font-medium text-white shadow-md shadow-rose-200/50 hover:from-rose-600 hover:to-rose-700"
              >
                Sign in to Dashboard
              </Button>
            </form>

            <p className="mt-6 text-center text-[11px] text-rose-400">
              Confidential portal for authorized consultants only
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
