import { type ReactNode } from "react";
import { BookOpen, LayoutGrid, Sparkles, TrendingUp } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RequireAuth } from "@/components/RequireAuth";
import { ProgressBar } from "@/components/Progress";
import { useApp, useOverallMomentum } from "@/lib/app-store";
import { moods } from "@/lib/mock-data";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Stats — Dreamboard" },
      {
        name: "description",
        content: "Gentle progress, your streak, and mood rhythm at a glance.",
      },
      { property: "og:title", content: "Stats — Dreamboard" },
      { property: "og:description", content: "Numbers that cheer you on, not weigh you down." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <StatsPage />
    </RequireAuth>
  ),
});

const moodTone: Record<string, string> = {
  Radiant: "bg-accent text-accent-foreground",
  Good: "bg-secondary text-primary",
  Okay: "bg-muted text-muted-foreground",
  Low: "bg-primary text-primary-foreground",
};

function StatsPage() {
  const { state } = useApp();
  const momentum = useOverallMomentum();
  const completedGoals = state.goals.filter((g) => g.progress === 100).length;
  const avgProgress =
    state.goals.length === 0
      ? 0
      : Math.round(state.goals.reduce((a, g) => a + g.progress, 0) / state.goals.length);
  const counts = moods.map((m) => ({ m, n: state.journal.filter((e) => e.mood === m).length }));
  const max = Math.max(1, ...counts.map((c) => c.n));
  const topMood = counts.reduce((a, c) => (c.n >= a.n ? c : a));

  return (
    <div className="space-y-10 animate-fadeIn">
      <header className="animate-rise">
        <p className="eyebrow">Your rhythm</p>
        <h1 className="display mt-3 text-5xl text-primary">Progress, gently tracked.</h1>
        <p className="mt-4 max-w-lg text-sm text-muted-foreground">
          Numbers that cheer you on, not weigh you down.
        </p>
      </header>

      <section className="animate-rise grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          label="Overall momentum"
          value={`${momentum}%`}
          icon={<TrendingUp className="h-5 w-5 text-clay" />}
        >
          <ProgressBar value={momentum} tone="accent" />
        </StatCard>
        <StatCard
          label="Active streak"
          value={`${state.streak} days`}
          icon={<Sparkles className="h-5 w-5 text-clay" />}
        />
        <StatCard
          label="Vision boards"
          value={String(state.boards.length)}
          icon={<LayoutGrid className="h-5 w-5 text-clay" />}
        />
        <StatCard
          label="Active goals"
          value={String(state.goals.length)}
          icon={<TrendingUp className="h-5 w-5 text-clay" />}
        />
        <StatCard
          label="Journal entries"
          value={String(state.journal.length)}
          icon={<BookOpen className="h-5 w-5 text-clay" />}
        />
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="animate-rise surface p-7">
          <h2 className="display mt-1 text-3xl text-primary">Goal progress</h2>
          {state.goals.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No goals yet — add one from Goals.</p>
          ) : (
            <ul className="mt-6 space-y-5">
              {state.goals.map((g) => (
                <li key={g.id}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{g.area}</span>
                    <Link
                      to="/goals/$goalId"
                      params={{ goalId: g.id }}
                      className="text-xs text-primary hover:underline"
                    >
                      {g.title}
                    </Link>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <ProgressBar value={g.progress} />
                    <span className="text-xs text-muted-foreground">{g.progress}%</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-5 text-xs text-muted-foreground">
            {completedGoals} goal{completedGoals === 1 ? "" : "s"} fully complete · average{" "}
            {avgProgress}%
          </p>
        </div>

        <div className="animate-rise surface p-7">
          <h2 className="display mt-1 text-3xl text-primary">Mood rhythm</h2>
          <div className="mt-5 flex h-36 items-end gap-4">
            {counts.map(({ m, n }) => (
              <div key={m} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={
                    "w-full rounded-t-lg text-[10px] font-medium opacity-70 transition-[height] duration-700 " +
                    (moodTone[m] ?? "bg-secondary")
                  }
                  style={{ height: `${(n / max) * 100}%`, minHeight: "6px" }}
                />
                <span className="text-[0.65rem] text-muted-foreground">{m}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            {state.journal.length} reflections · your most common mood is {topMood.m}.
          </p>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  children,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="surface flex flex-col items-center gap-3 p-7 text-center">
      {icon}
      <p className="display text-3xl text-primary">{value}</p>
      <p className="eyebrow text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}
