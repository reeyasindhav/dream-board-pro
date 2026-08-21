import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Quote as QuoteIcon, Shuffle } from "lucide-react";
import { RequireAuth } from "@/components/RequireAuth";
import { useApp } from "@/lib/app-store";
import { quotes } from "@/lib/mock-data";

export const Route = createFileRoute("/inspiration")({
  head: () => ({
    meta: [
      { title: "Inspiration cards — Dreamboard" },
      {
        name: "description",
        content: "A shelf of motivational quote cards you can save straight onto any vision board.",
      },
      { property: "og:title", content: "Inspiration cards — Dreamboard" },
      {
        property: "og:description",
        content: "Words for the middle of the journey, ready to pin to your boards.",
      },
    ],
  }),
  component: () => (
    <RequireAuth>
      <InspirationPage />
    </RequireAuth>
  ),
});

function InspirationPage() {
  const { state, addBoardItem } = useApp();
  const [q, setQ] = useState("");
  const [featured, setFeatured] = useState(0);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [target, setTarget] = useState(state.boards[0]?.id ?? "");

  const list = quotes.filter((item) =>
    (item.text + item.author + item.theme).toLowerCase().includes(q.toLowerCase()),
  );
  const hero = quotes[featured]!;

  return (
    <div className="space-y-10">
      <header className="animate-rise">
        <p className="eyebrow">Words that carry you</p>
        <h1 className="display mt-3 text-5xl text-primary sm:text-6xl">
          Keep something kind
          <span className="block text-clay">within reach.</span>
        </h1>
      </header>

      <section className="animate-soft-in relative overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground sm:p-14">
        <div className="absolute -left-20 -bottom-20 h-64 w-64 animate-float rounded-full bg-accent/15" />
        <QuoteIcon className="h-7 w-7 text-accent" />
        <p className="display mt-6 max-w-3xl text-4xl sm:text-5xl">“{hero.text}”</p>
        <p className="eyebrow mt-6 text-primary-foreground/70">
          {hero.author} — {hero.theme}
        </p>
        <button
          onClick={() => setFeatured((f) => (f + 1) % quotes.length)}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm text-accent-foreground transition-transform hover:scale-[1.03]"
        >
          <Shuffle className="h-4 w-4" /> Another one
        </button>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by theme or words"
          className="flex-1 rounded-full border border-border bg-card px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="rounded-full border border-border bg-card px-5 py-3 text-sm outline-none"
        >
          {state.boards.map((b) => (
            <option key={b.id} value={b.id}>
              Save to: {b.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item, i) => (
          <article
            key={item.id}
            style={{ animationDelay: `${i * 60}ms` }}
            className={
              "lift animate-rise flex flex-col justify-between rounded-2xl p-7 " +
              (i % 3 === 1 ? "bg-accent text-accent-foreground" : "surface")
            }
          >
            <div>
              <p className="eyebrow">{item.theme}</p>
              <p className="display mt-3 text-2xl">“{item.text}”</p>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{item.author}</span>
              <button
                onClick={() => {
                  if (!target) return;
                  addBoardItem(target, { type: "quote", content: item.text, caption: item.theme });
                  setSavedId(item.id);
                  setTimeout(() => setSavedId(null), 1800);
                }}
                className="rounded-full bg-primary px-4 py-2 text-xs text-primary-foreground transition-transform hover:scale-105"
              >
                {savedId === item.id ? "Saved ✓" : "Pin to board"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
