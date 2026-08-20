import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, Plus, Search, X } from "lucide-react";
import { Brand } from "./Brand";
import { useApp } from "@/lib/app-store";

const nav = [
  { to: "/dashboard", label: "Overview" },
  { to: "/boards", label: "My boards" },
  { to: "/goals", label: "Goals" },
  { to: "/journal", label: "Journal" },
  { to: "/inspiration", label: "Inspiration" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { state, signOut } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const initials = (state.user?.name ?? "You")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Brand to="/dashboard" />

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "bg-secondary text-primary" }}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/inspiration"
              aria-label="Search inspiration"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-secondary sm:flex"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              to="/boards/new"
              className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03] sm:flex"
            >
              <Plus className="h-4 w-4" /> New board
            </Link>
            <Link
              to="/settings"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground"
            >
              {initials}
            </Link>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-primary lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="animate-soft-in border-t border-border/70 px-5 pb-4 lg:hidden">
            <div className="flex flex-col gap-1 pt-3">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  signOut();
                  navigate({ to: "/login" });
                }}
                className="mt-1 rounded-lg px-3 py-2 text-left text-sm text-clay"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10">{children}</main>

      <footer className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-border/70 px-5 py-6 text-sm text-muted-foreground">
        <span>Dreamboard / personal space</span>
        <div className="flex items-center gap-4">
          <Link to="/settings" className="hover:text-primary">
            Settings
          </Link>
          <button
            onClick={() => {
              signOut();
              navigate({ to: "/login" });
            }}
            className="hover:text-primary"
          >
            Sign out
          </button>
        </div>
      </footer>
    </div>
  );
}
