import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Check, Flag, Heart, ImagePlus, Plus, Target } from "lucide-react";
import { RequireAuth } from "@/components/RequireAuth";
import { ProgressBar } from "@/components/Progress";
import { useApp, useOverallMomentum } from "@/lib/app-store";
import { moods, quotes } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Overview — Dreamboard" },
      { name: "description", content: "Your daily Dreamboard overview: north star, mood check-in, tiny steps and vision boards." },
      { property: "og:title", content: "Overview — Dreamboard" },
      { property: "og:description", content: "One calm screen for your vision, your mood and your next small step." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  ),
});

function Dashboard() {
  const { state, toggleMilestone, addEntry } = useApp();
  const momentum = useOverallMomentum();
  const [mood, setMood] = useState<(typeof moods)[number]>("Good");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const focus = state.goals[0];
  const tinySteps = state.goals.flatMap((g) =>
    g.milestones.slice(0, 1).map((m) => ({ ...m, goalId: g.id, area: g.area })),
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <section className="animate-rise relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12">
          <div className="absolute -right-16 -top-16 h-56 w-56 animate-float rounded-full bg-accent/20" />
          <p className="eyebrow text-primary-foreground/70">
            {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 className="display mt-4 text-4xl sm:text-6xl">
            Good morning, {state.user?.name.split(" ")[0]}.
            <span className="block text-primary-foreground/60">Let's make it visible.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm text-primary-foreground/75">
            Your dreams don't need to be perfect. They just need a place to land, and one small step to begin.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/boards/new"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-transform duration-300 hover:scale-[1.03]"
            >
              <ImagePlus className="h-4 w-4" /> Add to your vision
            </Link>
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm transition-colors hover:bg-primary-foreground/10"
            >
              <BookOpen className="h-4 w-4" /> Write a reflection
            </Link>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="surface animate-rise p-7">
            <div className="flex items-start justify-between">
              <p className="eyebrow">Your north star</p>
              <Heart className="h-6 w-6 text-clay" />
            </div>
            <h2 className="display mt-3 text-3xl text-primary">Create a life that feels like you.</h2>
            <div className="mt-8 flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Monthly focus</p>
                <p className="text-lg">{focus?.title ?? "Add your first goal"}</p>
              </div>
              <div className="text-right">
                <p className="display text-3xl text-primary">{focus?.progress ?? 0}%</p>
                <p className="text-xs text-muted-foreground">in motion</p>
              </div>
            </div>
            <div className="mt-3">
              <ProgressBar value={focus?.progress ?? 0} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {state.streak} days in a row — keep going gently.
            </p>
          </section>

          <section className="animate-rise rounded-2xl border border-border bg-accent p-7 text-accent-foreground">
            <p className="eyebrow">Today's check-in</p>
            <h2 className="display mt-3 text-3xl">How are you?</h2>
            <div className="mt-6 grid grid-cols-4 gap-2">
              {moods.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={
                    "rounded-xl px-2 py-3 text-xs transition-all duration-300 " +
                    (mood === m ? "bg-card shadow-md scale-105 font-medium" : "hover:bg-card/50")
                  }
                >
                  {m}
                </button>
              ))}
            </div>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note…"
              className="mt-5 w-full rounded-xl border border-accent-foreground/20 bg-card/60 px-4 py-2.5 text-sm outline-none"
            />
            <button
              onClick={() => {
                addEntry({
                  date: new Date().toISOString().slice(0, 10),
                  mood,
                  title: `Feeling ${mood.toLowerCase()}`,
                  body: note || "Checked in without words today.",
                });
                setNote("");
                setSaved(true);
                setTimeout(() => setSaved(false), 2200);
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              {saved ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {saved ? "Saved to journal" : "Save check-in"}
            </button>
          </section>
        </div>

        <section className="animate-rise">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow">Visualize what's next</p>
              <h2 className="display mt-2 text-3xl text-primary">Your dreamboards</h2>
            </div>
            <Link to="/boards" className="text-sm text-muted-foreground hover:text-primary">
              See all →
            </Link>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {state.boards.slice(0, 2).map((b) => (
              <Link
                key={b.id}
                to="/boards/$boardId"
                params={{ boardId: b.id }}
                className="lift group relative block h-64 overflow-hidden rounded-2xl"
              >
                <img
                  src={b.cover}
                  alt={b.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
                <div className="absolute bottom-5 left-5 text-primary-foreground">
                  <p className="eyebrow text-primary-foreground/70">
                    {b.category} / {b.items.length} pieces
                  </p>
                  <p className="display mt-1 text-3xl">{b.title}</p>
                  <p className="mt-1 text-sm">Open board →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow">Your rhythm</p>
            <h2 className="display mt-1 text-3xl text-primary">Tiny steps</h2>
          </div>
          <Target className="h-6 w-6 text-clay" />
        </div>

        <div className="surface animate-rise divide-y divide-border p-5">
          {tinySteps.map((m) => (
            <button
              key={m.id}
              onClick={() => toggleMilestone(m.goalId, m.id)}
              className="flex w-full items-start gap-3 py-4 text-left"
            >
              <span
                className={
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300 " +
                  (m.done ? "border-primary bg-primary text-primary-foreground" : "border-border")
                }
              >
                {m.done && <Check className="h-3 w-3" />}
              </span>
              <span className="flex-1">
                <span className={"block text-sm " + (m.done ? "text-muted-foreground line-through" : "")}>
                  {m.title}
                </span>
                <span className="block text-xs text-muted-foreground">{m.area}</span>
              </span>
              <span className="text-xs text-muted-foreground">{m.when}</span>
            </button>
          ))}
          <Link
            to="/goals"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-sm text-primary"
          >
            <Plus className="h-4 w-4" /> Add milestone
          </Link>
        </div>

        <div className="animate-rise relative overflow-hidden rounded-2xl bg-accent p-6 text-accent-foreground">
          <Flag className="h-5 w-5" />
          <p className="display mt-4 text-2xl">“{quotes[1]!.text}”</p>
          <p className="mt-4 text-xs opacity-70">A note for the middle of the journey.</p>
        </div>

        <div className="surface p-6">
          <p className="eyebrow">Overall momentum</p>
          <p className="display mt-2 text-5xl text-primary">{momentum}%</p>
          <div className="mt-3">
            <ProgressBar value={momentum} tone="accent" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            You are showing up {state.streak} days in a row.
          </p>
        </div>
      </aside>
    </div>
  );
}
