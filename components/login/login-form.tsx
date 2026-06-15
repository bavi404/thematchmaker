"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MatchmakerButton } from "@/components/matchmaker";
import { LoginIllustration } from "@/components/login/login-illustration";
import { FloatingHearts } from "@/components/login/floating-hearts";
import { useToast } from "@/components/providers/toast-provider";
import {
  getRememberedUsername,
  isAuthenticated,
  login,
} from "@/lib/auth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace("/dashboard");
      return;
    }
    const remembered = getRememberedUsername();
    if (remembered) {
      setUsername(remembered);
      setRememberMe(true);
    }
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = login(username, password, rememberMe);

    if (!result.success) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    const redirectTo = searchParams.get("from") || "/dashboard";
    showToast("Welcome back!");
    router.push(redirectTo);
  }

  return (
    <div className="flex min-h-screen">
      <LoginIllustration />

      <div className="relative flex w-full flex-col justify-center bg-cupid-background px-6 py-12 sm:px-10 lg:w-1/2 lg:px-16 xl:px-20">
        <FloatingHearts />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto w-full max-w-md"
        >
          <div className="mb-10 lg:mb-12">
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-cupid-foreground lg:text-4xl">
              Matchmaker <span aria-hidden>❤️</span>
            </h1>
            <p className="mt-3 text-sm text-cupid-muted-foreground lg:text-base">
              Helping Matchmakers Create Meaningful Connections
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-cupid-foreground">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-cupid-muted-foreground">
              Sign in to access your consultant dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-xs font-medium uppercase tracking-wider text-cupid-muted-foreground"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cupid-secondary" />
                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 rounded-xl border-cupid-border bg-white pl-10 focus-visible:border-cupid-accent focus-visible:ring-cupid-accent/30"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs font-medium uppercase tracking-wider text-cupid-muted-foreground"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cupid-secondary" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border-cupid-border bg-white pl-10 focus-visible:border-cupid-accent focus-visible:ring-cupid-accent/30"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-cupid-border accent-[#FF4F81]"
              />
              <label
                htmlFor="remember-me"
                className="cursor-pointer text-sm text-cupid-foreground"
              >
                Remember me
              </label>
            </div>

            <MatchmakerButton
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing in…" : "Sign in"}
            </MatchmakerButton>
          </form>

          <p className="mt-8 text-center text-[11px] text-cupid-muted-foreground">
            Demo: <span className="font-mono">admin</span> /{" "}
            <span className="font-mono">cupid123</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
