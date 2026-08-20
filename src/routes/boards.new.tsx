import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { RequireAuth } from "@/components/RequireAuth";
import { useApp } from "@/lib/app-store";

const covers = [
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80",
];

export const Route = createFileRoute("/boards/new")({
  head: () => ({
    meta: [
      { title: "New board — Dreamboard" },
      { name: "description", content: "Start a new vision board: name the chapter, choose a cover and begin collecting." },
      { property: "og:title", content: "New board — Dreamboard" },
      { property: "og:description", content: "Give a new chapter of your life a place to live." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <NewBoard />
    </RequireAuth>
  ),
});

function NewBoard() {
  const { addBoard } = useApp();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("2026");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState(covers[0]!);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="animate-rise">
        <p className="eyebrow">A new chapter</p>
        <h1 className="display mt-3 text-5xl text-primary">Name what you're moving toward.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          You can change everything later. Boards are meant to grow with you.
        </p>
      </header>

      <form
        className="surface animate-rise space-y-6 p-8"
        onSubmit={(e) => {
          e.preventDefault();
          const id = addBoard(
            title.trim() || "Untitled chapter",
            category.trim() || "Personal",
            cover,
            description.trim() || "A collection in progress.",
          );
          navigate({ to: "/boards/$boardId", params: { boardId: id } });
        }}
      >
        <label className="block">
          <span className="eyebrow">Board title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="A year of becoming"
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <label className="block">
          <span className="eyebrow">Category</span>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <label className="block">
          <span className="eyebrow">What is this board about?</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="The rooms, rhythms and rituals of the person I am growing into."
            className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <div>
          <span className="eyebrow">Choose a cover</span>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {covers.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setCover(c)}
                className={
                  "h-24 overflow-hidden rounded-xl border-2 transition-all duration-300 " +
                  (cover === c ? "border-primary scale-[1.02]" : "border-transparent opacity-75 hover:opacity-100")
                }
              >
                <img src={c} alt="Board cover option" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          Create board
        </button>
      </form>
    </div>
  );
}
