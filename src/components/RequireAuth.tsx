import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useApp } from "@/lib/app-store";
import { AppShell } from "./AppShell";
import { Loading } from "./Loading";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { ready, state } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !state.user) navigate({ to: "/login", replace: true });
  }, [ready, state.user, navigate]);

  if (!ready || !state.user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading label="Opening your space…" />
      </div>
    );
  }

  return <AppShell>{children}</AppShell>;
}
