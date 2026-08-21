import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plus, Target } from "lucide-react";
import { RequireAuth } from "@/components/RequireAuth";
import { ProgressBar } from "@/components/Progress";
import { useApp, useOverallMomentum } from "@/lib/app-store";
import { toast } from "sonner";

export const Route = createFileRoute("/goals")({
  head: () => ({
    meta: [
      { title: "Goals & milestones — Dreamboard" },
      {
        name: "description",
        content: "Track life goals through gentle milestones and watch momentum build day by day.",
      },
      { property: "og:title", content: "Goals & milestones — Dreamboard" },
      { property: "og:description", content: "Small steps make big visions believable." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <GoalsPage />
    </RequireAuth>
  ),
});

function GoalsPage() {
  const { state, toggleMilestone, addMilestone, addGoal } = useApp();
  const momentum = useOverallMomentum();
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [newGoal, setNewGoal] = useState("");

  return (
    <div className="space-y-10">
      <header className="animate-rise grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <div>
          <p className="eyebrow">The path in progress</p>
          <h1 className="display mt-3 text-5xl text-primary sm:text-6xl">
            Small steps make
            <span className="block">big visions believable.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm text-muted-foreground">
            Goals are not a test to pass. They are gentle invitations to practice the life you are
            creating.
          </p>
        </div>
        <div className="animate-soft-in rounded-3xl bg-primary p-8 text-primary-foreground">
          <Target className="h-6 w-6 text-accent" />
          <p className="mt-6 text-sm text-primary-foreground/70">Overall momentum</p>
          <p className="display text-6xl">{momentum}%</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-primary-foreground/20">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-700"
              style={{ width: `${momentum}%` }}
            />
          </div>
          <p className="mt-4 text-xs text-primary-foreground/70">
            You are showing up {state.streak} days in a row.
          </p>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {state.goals.map((goal, i) => (
          <section
            key={goal.id}
            style={{ animationDelay: `${i * 80}ms` }}
            className="surface lift animate-rise flex flex-col p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow">{goal.area}</p>
              <p className="display text-2xl text-primary">{goal.progress}%</p>
            </div>
            <h2 className="display mt-2 text-3xl text-primary">{goal.title}</h2>
            <Link
              to="/goals/$goalId"
              params={{ goalId: goal.id }}
              className="mt-1 inline-flex items-center gap-1 text-xs text-clay hover:text-primary"
            >
              View milestones →
            </Link>
            <div className="mt-5">
              <ProgressBar value={goal.progress} />
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {goal.milestones.map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => toggleMilestone(goal.id, m.id)}
                    className="flex w-full items-center gap-3 text-left"
                  >
                    <span
                      className={
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 " +
                        (m.done
                          ? "border-primary bg-primary text-primary-foreground scale-105"
                          : "border-border bg-secondary")
                      }
                    >
                      {m.done && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span
                      className={"text-sm " + (m.done ? "text-muted-foreground line-through" : "")}
                    >
                      {m.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <form
              className="mt-6 flex items-center gap-2 border-t border-border pt-4"
              onSubmit={(e) => {
                e.preventDefault();
                const v = (drafts[goal.id] ?? "").trim();
                if (!v) return;
                addMilestone(goal.id, v);
                toast.success("New milestone added.");
                setDrafts((d) => ({ ...d, [goal.id]: "" }));
              }}
            >
              <Plus className="h-4 w-4 text-clay" />
              <input
                value={drafts[goal.id] ?? ""}
                onChange={(e) => setDrafts((d) => ({ ...d, [goal.id]: e.target.value }))}
                placeholder="Add milestone"
                className="w-full bg-transparent text-sm outline-none placeholder:text-clay"
              />
            </form>
          </section>
        ))}
      </div>

      <section className="animate-rise flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-accent p-8 text-accent-foreground">
        <div>
          <p className="eyebrow">A note for today</p>
          <p className="display mt-2 text-3xl">
            You do not have to do everything. Just the next kind thing.
          </p>
        </div>
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!newGoal.trim()) return;
            addGoal(newGoal.trim(), "Personal");
            toast.success("New goal added.");
            setNewGoal("");
          }}
        >
          <input
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Name a new goal"
            className="rounded-full border border-accent-foreground/25 bg-card/70 px-5 py-3 text-sm outline-none"
          />
          <button className="rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-transform hover:scale-[1.03]">
            Add goal
          </button>
        </form>
      </section>
    </div>
  );
}
