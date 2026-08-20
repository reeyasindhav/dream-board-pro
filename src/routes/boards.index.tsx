import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ImagePlus, Search } from "lucide-react";
import { RequireAuth } from "@/components/RequireAuth";
import { useApp } from "@/lib/app-store";

export const Route = createFileRoute("/boards/")({
  head: () => ({
    meta: [
      { title: "My boards — Dreamboard" },
      { name: "description", content: "Your visual library of vision boards: images, words and tiny sparks for what's next." },
      { property: "og:title", content: "My boards — Dreamboard" },
      { property: "og:description", content: "Collect what calls you forward in a living visual library." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <BoardsPage />
    </RequireAuth>
  ),
});

function BoardsPage() {
  const { state } = useApp();
  const [q, setQ] = useState("");
  const boards = state.boards.filter((b) =>
    (b.title + b.category + b.description).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-10">
      <header className="animate-rise grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
        <div>
          <p className="eyebrow">The visual library</p>
          <h1 className="display mt-3 text-5xl text-primary sm:text-6xl">
            Collect what
            <span className="block text-clay">calls you forward.</span>
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          A place for the images, words, and tiny sparks that make your next chapter feel real.
        </p>
      </header>

      <div className="animate-rise flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search your boards"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <Link
          to="/boards/new"
          className="rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          + New board
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {boards.map((b, i) => (
          <Link
            key={b.id}
            to="/boards/$boardId"
            params={{ boardId: b.id }}
            style={{ animationDelay: `${i * 70}ms` }}
            className={
              "lift animate-rise group relative block overflow-hidden rounded-2xl " +
              (i % 3 === 1 ? "h-[26rem] md:mt-10" : "h-96")
            }
          >
            <img
              src={b.cover}
              alt={b.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-primary-foreground">
              <p className="eyebrow text-primary-foreground/70">{b.items.length} pieces</p>
              <p className="display mt-1 text-3xl">{b.title}</p>
              <p className="mt-2 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Open collage ↗
              </p>
            </div>
          </Link>
        ))}

        <Link
          to="/boards/new"
          className="flex h-96 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-clay/40 bg-accent/40 text-center transition-colors hover:bg-accent/70"
        >
          <ImagePlus className="h-7 w-7 text-clay" />
          <span className="text-sm font-medium text-primary">Start another visual story</span>
        </Link>
      </div>
    </div>
  );
}
