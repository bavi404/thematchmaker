import { Suspense } from "react";
import { LoginForm } from "@/components/login/login-form";
import { Skeleton } from "@/components/ui/skeleton";

function LoginSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cupid-background px-6">
      <div className="w-full max-w-md space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-11 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}
