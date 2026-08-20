import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Feather } from "lucide-react";
import { RequireAuth } from "@/components/RequireAuth";
import { useApp } from "@/lib/app-store";
import { moods } from "@/lib/mock-data";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Mood journal — Dreamboard" },
      { name: "description", content: "A gentle mood journal: log how you feel, notice patterns and reflect on your progress." },
      { property: "og:title", content: "Mood journal — Dreamboard" },
      { property: "og:description", content: "Reflection is part of the work, not a reward for it." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <JournalPage />
    </RequireAuth>
  ),
});

const moodTone: Record<string, string> = {
  Radiant: "bg-accent text-accent-foreground",
  Good: "bg-secondary text-primary",
  Okay: "bg-muted text-muted-foreground",
  Low: "bg-primary text-primary-foreground",
};

function JournalPage() {
  const { state, addEntry } = useApp();
  const [mood, setMood] = useState<(typeof moods)[number]>("Good");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const entries = state.journal.filter((e) => filter === "All" || e.mood === filter);
  const counts = moods.map((m) => ({ m, n: state.journal.filter((e) => e.mood === m).length }));
  const max = Math.max(1, ...counts.map((c) => c.n));

  return (
    <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
      <div className="space-y-6">
        <header className="animate-rise">
          <p className="eyebrow">The mood journal</p>
          <h1 className="display mt-3 text-5xl text-primary">Notice how it actually felt.</h1>
        </header>

        <form
          className="surface animate-rise space-y-4 p-7"
          onSubmit={(e) => {
            e.preventDefault();
            if (!body.trim()) return;
            addEntry({
              date: new Date().toISOString().slice(0, 10),
              mood,
              title: title.trim() || `Feeling ${mood.toLowerCase()}`,
              body: body.trim(),
            });
            setTitle("");
            setBody("");
          }}
        >
          <div className="flex items-center justify-between">
            <p className="eyebrow">Today's entry</p>
            <Feather className="h-5 w-5 text-clay" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {moods.map((m) => (
              <button
                type="button"
                key={m}
                onClick={() => setMood(m)}
                className={
                  "rounded-xl px-2 py-2.5 text-xs transition-all duration-300 " +
                  (mood === m ? "bg-primary text-primary-foreground scale-105" : "bg-secondary text-primary")
                }
              >
                {m}
              </button>
            ))}
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give the day a title"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            placeholder="What happened, and how did it land?"
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button className="w-full rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground transition-transform hover:scale-[1.02]">
            Save reflection
          </button>
        </form>

        <div className="surface p-7">
          <p className="eyebrow">Mood rhythm</p>
          <div className="mt-5 flex h-32 items-end gap-4">
            {counts.map(({ m, n }) => (
              <div key={m} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-clay/80 transition-[height] duration-700"
                  style={{ height: `${(n / max) * 100}%`, minHeight: "6px" }}
                />
                <span className="text-[0.65rem] text-muted-foreground">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {["All", ...moods].map((m) => (
            <button
              key={m}
              onClick={() => setFilter(m)}
              className={
                "rounded-full px-4 py-2 text-xs transition-colors " +
                (filter === m ? "bg-primary text-primary-foreground" : "bg-secondary text-primary")
              }
            >
              {m}
            </button>
          ))}
        </div>

        {entries.map((e, i) => (
          <article
            key={e.id}
            style={{ animationDelay: `${i * 60}ms` }}
            className="surface lift animate-rise p-7"
          >
            <div className="flex items-center justify-between">
              <p className="eyebrow">
                {new Date(e.date).toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <span className={"rounded-full px-3 py-1 text-xs " + (moodTone[e.mood] ?? "bg-secondary")}>
                {e.mood}
              </span>
            </div>
            <h2 className="display mt-3 text-3xl text-primary">{e.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.body}</p>
          </article>
        ))}

        {entries.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No entries with this mood yet.
          </p>
        )}
      </div>
    </div>
  );
}
