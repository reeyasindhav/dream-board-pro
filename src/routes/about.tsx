import { createFileRoute, Link } from "@tanstack/react-router";
import { Brand } from "@/components/Brand";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dreamboard" },
      {
        name: "description",
        content:
          "Dreamboard started from a simple idea: vision boards and daily progress shouldn't live in separate places. Meet the thinking behind the calm.",
      },
      { property: "og:title", content: "About — Dreamboard" },
      {
        property: "og:description",
        content: "The story behind Dreamboard's vision boards and gentle goal tracking.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
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
        <p className="eyebrow">The thinking</p>
        <h1 className="display mt-4 text-5xl text-primary sm:text-6xl">
          Vision <span className="text-clay">boards should move.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground">
          Physical vision boards go quiet on the wall. Task apps forget why you started. Dreamboard
          keeps the picture and the progress in one place — boards you can move, milestones you can
          tick, and a journal that remembers how it felt.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="animate-rise">
            <p className="eyebrow">Our story</p>
            <h2 className="display mt-3 text-3xl text-primary">
              From a sticky note to something gentler
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Dreamboard began as a sticky note on a studio wall — a sketch of a life worth leaning
              toward. It stayed there long after other projects moved on, quietly reminding us that
              the best work starts with a clear picture of where you're headed, not a list of
              everything you should do.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              We built Dreamboard for that moment: when you stop trying to be productive and start
              trying to become.
            </p>
          </div>

          <div className="animate-soft-in">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80"
              alt="A calm, light-filled workspace"
              className="h-full w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Principle
            title="Start with the end in mind"
            body="Every board begins with the feeling you're working toward, not the task you're checking off."
          />
          <Principle
            title="Keep it soft"
            body="Growth is gentle. The space stays calm, the nudges stay small, the wins stay visible."
          />
          <Principle
            title="Your data, your space"
            body="What you create stays in your browser unless you choose to sync it. We don't sell a thing."
          />
          <Principle
            title="Progress over perfection"
            body="Milestone tracking is built around streaks and momentum, not all-or-nothing goals."
          />
          <Principle
            title="Design for feeling"
            body="Typography, color and motion are here to make work feel like yours, not like everyone else's."
          />
        </div>
      </main>

      <Footer className="max-w-4xl" />
    </div>
  );
}

function Principle({ title, body }: { title: string; body: string }) {
  return (
    <article className="surface lift animate-rise rounded-2xl p-7">
      <h3 className="display text-xl text-primary">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </article>
  );
}
