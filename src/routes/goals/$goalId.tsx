import { useState } from "react";
import { ArrowLeft, Check, Plus } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { RequireAuth } from "@/components/RequireAuth";
import { ProgressBar } from "@/components/Progress";
import { useApp, useOverallMomentum } from "@/lib/app-store";

export const Route = createFileRoute("/goals/$goalId")({
  head: () => ({
    meta: [
      { title: "Goal details — Dreamboard" },
      { name: "description", content: "Drill into one goal and follow its milestones." },
      { property: "og:title", content: "Goal details — Dreamboard" },
      { property: "og:description", content: "Small steps make big visions believable." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <GoalDetail />
    </RequireAuth>
  ),
});

function GoalDetail() {
  const { goalId } = Route.useParams();
  const { state, toggleMilestone, addMilestone } = useApp();
  const momentum = useOverallMomentum();
  const goal = state.goals.find((g) => g.id === goalId);
  const [draft, setDraft] = useState("");

  if (!goal) {
    return (
      <div className="animate-rise space-y-6">
        <Link
          to="/goals"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to goals
        </Link>
        <p className="text-xl text-muted-foreground">That goal doesn't exist yet.</p>
      </div>
    );
  }

  const completed = goal.milestones.filter((m) => m.done).length;

  return (
    <div className="space-y-10 animate-fadeIn">
      <header className="animate-rise flex items-start justify-between gap-4">
        <Link
          to="/goals"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to goals
        </Link>
        <div className="text-right">
          <p className="display text-2xl text-primary">{goal.progress}%</p>
          <p className="text-xs text-muted-foreground">
            {completed}/{goal.milestones.length} milestones
          </p>
        </div>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div>
          <p className="eyebrow">{goal.area}</p>
          <h1 className="display mt-3 text-4xl text-primary">{goal.title}</h1>
          <div className="mt-6">
            <ProgressBar value={goal.progress} />
          </div>
        </div>
        <div className="surface flex flex-col justify-center p-7">
          <p className="eyebrow text-xs text-muted-foreground">Overall momentum</p>
          <p className="display mt-2 text-5xl text-primary">{momentum}%</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-700"
              style={{ width: `${momentum}%` }}
            />
          </div>
        </div>
      </section>

      <section className="surface p-7">
        <h2 className="display mt-1 text-3xl text-primary">Milestones</h2>
        <ul className="mt-6 space-y-3">
          {goal.milestones.map((m) => (
            <li key={m.id}>
              <button
                onClick={() => {
                  toggleMilestone(goal.id, m.id);
                  toast.success(
                    m.done ? "Milestone marked incomplete." : "Milestone complete — nice.",
                  );
                }}
                className="group flex w-full items-center gap-3 text-left"
              >
                <span
                  className={
                    "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 " +
                    (m.done
                      ? "border-primary bg-primary text-primary-foreground scale-105 animate-bounce-in"
                      : "border-border bg-secondary group-hover:scale-105")
                  }
                >
                  {m.done && <Check className="h-4 w-4" />}
                </span>
                <span className={"text-sm " + (m.done ? "text-muted-foreground line-through" : "")}>
                  {m.title}
                </span>
                <span className="ml-auto text-xs text-muted-foreground">{m.when}</span>
              </button>
            </li>
          ))}
        </ul>

        <form
          className="mt-6 flex items-center gap-2 border-t border-border pt-4"
          onSubmit={(e) => {
            e.preventDefault();
            const v = draft.trim();
            if (!v) return;
            addMilestone(goal.id, v);
            toast.success("New milestone added.");
            setDraft("");
          }}
        >
          <Plus className="h-4 w-4 text-clay" />
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Add a milestone"
            className="w-full bg-transparent text-sm outline-none placeholder:text-clay"
          />
        </form>
      </section>
    </div>
  );
}
