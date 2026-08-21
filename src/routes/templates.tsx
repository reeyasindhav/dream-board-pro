import { ArrowLeft, Plus } from "lucide-react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { RequireAuth } from "@/components/RequireAuth";
import { useApp } from "@/lib/app-store";
import type { BoardItem } from "@/lib/mock-data";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Board templates — Dreamboard" },
      { name: "description", content: "Start from a curated vision board and make it your own." },
      { property: "og:title", content: "Board templates — Dreamboard" },
      { property: "og:description", content: "Small steps make big visions believable." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <TemplatesPage />
    </RequireAuth>
  ),
});

type Template = {
  id: string;
  title: string;
  category: string;
  cover: string;
  description: string;
  presetItems: Array<{ type: BoardItem["type"]; content: string; caption: string }>;
};

const templates: Template[] = [
  {
    id: "t-creative",
    title: "Creative energy",
    category: "Practice",
    cover:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=80",
    description: "Making something imperfect, often, and out loud.",
    presetItems: [
      { type: "quote", content: "Done is a kind of courage.", caption: "Studio wall" },
      {
        type: "note",
        content: "Share work with a friend every Sunday.",
        caption: "Accountability",
      },
    ],
  },
  {
    id: "t-wellbeing",
    title: "Feel at home in my body",
    category: "Wellbeing",
    cover:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
    description: "Movement as kindness, not punishment.",
    presetItems: [
      { type: "note", content: "Walk without headphones twice a week.", caption: "Quiet" },
      {
        type: "quote",
        content: "Your body is the only home you never leave.",
        caption: "Reminder",
      },
    ],
  },
  {
    id: "t-soft",
    title: "The good life",
    category: "Soft life",
    cover:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
    description: "Golden hours, long dinners, and the courage to slow all the way down.",
    presetItems: [
      {
        type: "quote",
        content: "You do not have to do everything. Just the next kind thing.",
        caption: "A note for today",
      },
      { type: "note", content: "One unhurried weekend every month.", caption: "Promise" },
    ],
  },
];

function TemplatesPage() {
  const { addBoard, addBoardItem } = useApp();
  const navigate = useNavigate();

  const createFrom = (t: Template) => {
    const boardId = addBoard(t.title, t.category, t.cover, t.description);
    t.presetItems.forEach((it) =>
      addBoardItem(boardId, { type: it.type, content: it.content, caption: it.caption }),
    );
    toast.success(`Created "${t.title}" board.`);
    navigate({ to: "/boards/$boardId", params: { boardId }, replace: true });
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      <header className="animate-rise flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Starter boards</p>
          <h1 className="display mt-3 text-5xl text-primary">Templates to begin with.</h1>
          <p className="mt-5 max-w-md text-sm text-muted-foreground">
            Pick a template, then make it yours. Every board can hold images, quotes and notes.
          </p>
        </div>
        <Link
          to="/boards"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to boards
        </Link>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => (
          <article
            key={t.id}
            className="surface lift animate-rise flex flex-col overflow-hidden p-0"
            style={{ animationDelay: `${templates.indexOf(t) * 80}ms` }}
          >
            <img src={t.cover} alt={t.title} className="h-40 w-full object-cover" loading="lazy" />
            <div className="p-6">
              <p className="eyebrow">{t.category}</p>
              <h2 className="display mt-2 text-2xl text-primary">{t.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{t.description}</p>
              <button
                onClick={() => createFrom(t)}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                <Plus className="h-4 w-4" /> Use this template
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
