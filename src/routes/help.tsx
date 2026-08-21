import { createFileRoute, Link } from "@tanstack/react-router";
import { HelpCircle, LifeBuoy } from "lucide-react";
import { Brand } from "@/components/Brand";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help — Dreamboard" },
      {
        name: "description",
        content: "Quick answers for using Dreamboard's vision boards, goals and journal.",
      },
      { property: "og:title", content: "Help — Dreamboard" },
      { property: "og:description", content: "Tips and answers for Dreamboard." },
    ],
  }),
  component: HelpPage,
});

const faqs = [
  {
    q: "Where is my data stored?",
    a: "In your browser, using localStorage. Signing out never deletes it, and nothing you create in the demo leaves your device.",
  },
  {
    q: "How do I build a vision board?",
    a: "From the dashboard choose Add to your vision, or browse Templates. Drag images, quotes and notes onto the board, then reorder by dragging.",
  },
  {
    q: "Are goals a test to pass?",
    a: "Not at all. Goals are gentle invitations to practice the life you are creating. Toggle milestones as you go — progress, not perfection.",
  },
  {
    q: "Can I edit a journal entry?",
    a: "Open any entry from the Journal page to read it in full. New reflections are added from the journal or dashboard check-in.",
  },
  {
    q: "How do I reset my space?",
    a: "From Settings you can export your boards and data, or clear everything for a clean start.",
  },
];

function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-4xl items-center justify-between px-5 py-6">
        <Brand to="/" />
        <nav className="flex items-center gap-2">
          <Link
            to="/login"
            className="rounded-full px-5 py-2.5 text-sm text-primary hover:bg-secondary"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Start free
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-24">
        <div className="animate-rise flex items-center gap-3">
          <LifeBuoy className="h-7 w-7 text-primary" />
          <p className="eyebrow">Guides</p>
        </div>
        <h1 className="display mt-4 text-5xl text-primary sm:text-6xl">
          How can we <span className="text-clay">help?</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground">
          Quick answers for making the most of your calm, creative space.
        </p>

        <section className="mt-12 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="surface lift animate-rise list-none rounded-2xl p-6 open:bg-accent/5"
            >
              <summary className="flex items-center gap-2 cursor-pointer font-medium text-primary">
                <HelpCircle className="h-5 w-5 text-clay" />
                {f.q}
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </section>

        <section className="animate-rise mt-16 rounded-3xl bg-primary p-8 text-primary-foreground">
          <p className="eyebrow text-primary-foreground/70">Still stuck?</p>
          <p className="display mt-2 text-3xl">
            Write to{" "}
            <a className="underline" href="mailto:hello@dreamboard.app">
              hello@dreamboard.app
            </a>
            .
          </p>
          <p className="mt-2 text-xs opacity-75">We read every message and reply gently.</p>
        </section>
      </main>

      <Footer className="max-w-4xl" />
    </div>
  );
}
