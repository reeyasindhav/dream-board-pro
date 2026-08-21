import { ArrowLeft, Calendar, Feather } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RequireAuth } from "@/components/RequireAuth";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/journal/$entryId")({
  head: () => ({
    meta: [
      { title: "Journal entry — Dreamboard" },
      { name: "description", content: "Read a mood journal reflection." },
      { property: "og:title", content: "Journal entry — Dreamboard" },
      {
        property: "og:description",
        content: "Reflection is part of the work, not a reward for it.",
      },
    ],
  }),
  component: () => (
    <RequireAuth>
      <EntryDetail />
    </RequireAuth>
  ),
});

const moodTone: Record<string, string> = {
  Radiant: "bg-accent text-accent-foreground",
  Good: "bg-secondary text-primary",
  Okay: "bg-muted text-muted-foreground",
  Low: "bg-primary text-primary-foreground",
};

function EntryDetail() {
  const { entryId } = Route.useParams();
  const { state } = useApp();
  const entry = state.journal.find((e) => e.id === entryId);

  if (!entry) {
    return (
      <div className="animate-rise space-y-6">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to journal
        </Link>
        <p className="text-xl text-muted-foreground">That reflection doesn't exist yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fadeIn">
      <header className="animate-rise flex items-start justify-between gap-4">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to journal
        </Link>
        <span
          className={"rounded-full px-3 py-1 text-xs " + (moodTone[entry.mood] ?? "bg-secondary")}
        >
          {entry.mood}
        </span>
      </header>

      <article className="surface p-7">
        <div className="flex items-center gap-2 text-xs text-clay">
          <Calendar className="h-4 w-4" />
          <time dateTime={entry.date}>
            {new Date(entry.date).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>
        <h1 className="display mt-2 text-4xl text-primary">{entry.title}</h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">{entry.body}</p>
        <Link
          to="/journal"
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <Feather className="h-4 w-4" /> Write another reflection
        </Link>
      </article>
    </div>
  );
}
