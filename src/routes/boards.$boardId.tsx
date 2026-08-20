import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, GripVertical, Quote as QuoteIcon, StickyNote, Trash2 } from "lucide-react";
import { RequireAuth } from "@/components/RequireAuth";
import { useApp } from "@/lib/app-store";
import type { BoardItem } from "@/lib/mock-data";

export const Route = createFileRoute("/boards/$boardId")({
  head: () => ({
    meta: [
      { title: "Board builder — Dreamboard" },
      { name: "description", content: "Arrange images, quotes and notes with drag and drop to shape your vision board." },
      { property: "og:title", content: "Board builder — Dreamboard" },
      { property: "og:description", content: "Drag, drop and rearrange the pieces of the life you're building." },
    ],
  }),
  component: () => (
    <RequireAuth>
      <BoardDetail />
    </RequireAuth>
  ),
});

const suggestions = [
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=80",
];

function BoardDetail() {
  const { boardId } = useParams({ from: "/boards/$boardId" });
  const { state, addBoardItem, removeBoardItem, reorderBoardItems } = useApp();
  const board = state.boards.find((b) => b.id === boardId);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [kind, setKind] = useState<BoardItem["type"]>("quote");

  if (!board) {
    return (
      <div className="py-24 text-center">
        <h1 className="display text-4xl text-primary">That board has moved on.</h1>
        <Link to="/boards" className="mt-4 inline-block text-sm underline">
          Back to your boards
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link to="/boards" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> All boards
      </Link>

      <header className="animate-rise grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
        <div>
          <p className="eyebrow">{board.category} / {board.items.length} pieces</p>
          <h1 className="display mt-3 text-5xl text-primary sm:text-6xl">{board.title}</h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground">{board.description}</p>
        </div>
        <div className="rounded-2xl bg-accent p-6 text-accent-foreground">
          <p className="eyebrow">How to build</p>
          <p className="mt-2 text-sm">
            Drag any piece by its handle to rearrange the collage. Add a quote, note or image below — your
            arrangement saves itself.
          </p>
        </div>
      </header>

      <section className="surface animate-rise flex flex-wrap items-end gap-3 p-5">
        <div className="flex gap-2">
          {(["quote", "note", "image"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setKind(k)}
              className={
                "rounded-full px-4 py-2 text-xs capitalize transition-colors " +
                (kind === k ? "bg-primary text-primary-foreground" : "bg-secondary text-primary")
              }
            >
              {k}
            </button>
          ))}
        </div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={kind === "image" ? "Paste an image URL…" : "Write the words that keep you going…"}
          className="min-w-[14rem] flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={() => {
            if (!text.trim()) return;
            addBoardItem(board.id, { type: kind, content: text.trim(), caption: "Added by you" });
            setText("");
          }}
          className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Add piece
        </button>
      </section>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {board.items.map((item, i) => (
          <article
            key={item.id}
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => {
              e.preventDefault();
              setOverIndex(i);
            }}
            onDragEnd={() => {
              setDragIndex(null);
              setOverIndex(null);
            }}
            onDrop={() => {
              if (dragIndex !== null && dragIndex !== i) reorderBoardItems(board.id, dragIndex, i);
              setDragIndex(null);
              setOverIndex(null);
            }}
            className={
              "group relative break-inside-avoid overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 " +
              (dragIndex === i ? "opacity-40 rotate-1 " : "") +
              (overIndex === i && dragIndex !== i ? "ring-2 ring-clay " : "") +
              "animate-soft-in cursor-grab active:cursor-grabbing"
            }
          >
            <div className="absolute right-3 top-3 z-10 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-primary">
                <GripVertical className="h-4 w-4" />
              </span>
              <button
                onClick={() => removeBoardItem(board.id, item.id)}
                aria-label="Remove piece"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {item.type === "image" ? (
              <>
                <img src={item.content} alt={item.caption ?? "Board piece"} loading="lazy" className="w-full object-cover" />
                <p className="px-4 py-3 text-xs text-muted-foreground">{item.caption}</p>
              </>
            ) : item.type === "quote" ? (
              <div className="bg-accent p-6 text-accent-foreground">
                <QuoteIcon className="h-5 w-5 opacity-60" />
                <p className="display mt-3 text-2xl">“{item.content}”</p>
                <p className="eyebrow mt-3">{item.caption}</p>
              </div>
            ) : (
              <div className="p-6">
                <StickyNote className="h-5 w-5 text-clay" />
                <p className="mt-3 text-base">{item.content}</p>
                <p className="eyebrow mt-3">{item.caption}</p>
              </div>
            )}
          </article>
        ))}
      </div>

      <section>
        <p className="eyebrow">Add from the inspiration shelf</p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => addBoardItem(board.id, { type: "image", content: s, caption: "From the shelf" })}
              className="lift h-32 overflow-hidden rounded-xl"
            >
              <img src={s} alt="Inspiration suggestion" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
