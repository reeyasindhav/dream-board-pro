import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useApp } from "@/lib/app-store";
import { AppShell } from "./AppShell";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { ready, state } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !state.user) navigate({ to: "/login", replace: true });
  }, [ready, state.user, navigate]);

  if (!ready || !state.user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="eyebrow animate-pulse">Opening your space…</p>
      </div>
    );
  }

  return <AppShell>{children}</AppShell>;
}
