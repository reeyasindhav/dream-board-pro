import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { RequireAuth } from "@/components/RequireAuth";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Profile & settings — Dreamboard" },
      { name: "description", content: "Manage your Dreamboard profile, reminders and gentle-mode preferences." },
      { property: "og:title", content: "Profile & settings — Dreamboard" },
      { property: "og:description", content: "Tune Dreamboard to the pace that suits you." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <SettingsPage />
    </RequireAuth>
  ),
});

function SettingsPage() {
  const { state, signIn, signOut } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState(state.user?.name ?? "");
  const [email, setEmail] = useState(state.user?.email ?? "");
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState({ reminders: true, gentle: true, weekly: false });

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="animate-rise">
        <p className="eyebrow">Your space</p>
        <h1 className="display mt-3 text-5xl text-primary">Profile & preferences</h1>
      </header>

      <section className="surface animate-rise space-y-5 p-8">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-xl font-semibold text-accent-foreground">
            {name.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <p className="display text-2xl text-primary">{state.user?.name}</p>
            <p className="text-sm text-muted-foreground">
              {state.boards.length} boards · {state.goals.length} goals · {state.journal.length} entries
            </p>
          </div>
        </div>

        <label className="block">
          <span className="eyebrow">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <label className="block">
          <span className="eyebrow">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
        <button
          onClick={() => {
            signIn(name || "You", email);
            setSaved(true);
            setTimeout(() => setSaved(false), 1800);
          }}
          className="rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          {saved ? "Saved ✓" : "Save profile"}
        </button>
      </section>

      <section className="surface animate-rise divide-y divide-border p-8">
        {(
          [
            ["reminders", "Daily nudge", "One gentle reminder each morning."],
            ["gentle", "Gentle mode", "Hide streak pressure and overdue labels."],
            ["weekly", "Weekly reflection email", "A Sunday summary of your progress."],
          ] as const
        ).map(([key, label, desc]) => (
          <div key={key} className="flex items-center justify-between gap-6 py-5">
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <button
              onClick={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))}
              aria-label={`Toggle ${label}`}
              className={
                "relative h-7 w-12 rounded-full transition-colors duration-300 " +
                (prefs[key] ? "bg-primary" : "bg-secondary")
              }
            >
              <span
                className={
                  "absolute top-1 h-5 w-5 rounded-full bg-card transition-all duration-300 " +
                  (prefs[key] ? "left-6" : "left-1")
                }
              />
            </button>
          </div>
        ))}
      </section>

      <button
        onClick={() => {
          signOut();
          navigate({ to: "/login" });
        }}
        className="rounded-full border border-border px-6 py-3 text-sm text-clay transition-colors hover:bg-secondary"
      >
        Sign out
      </button>
    </div>
  );
}
