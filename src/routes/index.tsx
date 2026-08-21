import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Feather, LayoutGrid, Quote, Target } from "lucide-react";
import { Brand } from "@/components/Brand";
import { quotes } from "@/lib/mock-data";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dreamboard — Vision boards that turn into progress" },
      {
        name: "description",
        content:
          "Dreamboard blends drag-and-drop vision boards, milestone tracking and a mood journal into one calm space for personal growth.",
      },
      { property: "og:title", content: "Dreamboard — Vision boards that turn into progress" },
      {
        property: "og:description",
        content:
          "Creative visualisation meets structured execution: boards, milestones, mood journal, inspiration.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
      },
      {
        name: "twitter:image",
        content:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: LayoutGrid,
    title: "Drag-and-drop boards",
    body: "Arrange images, notes and quotes into a collage that actually looks like your life.",
  },
  {
    icon: Target,
    title: "Milestone tracker",
    body: "Every board turns into small, checkable steps — momentum you can see.",
  },
  {
    icon: Feather,
    title: "Mood journal",
    body: "Log how the work felt, not just whether it got done.",
  },
  {
    icon: Quote,
    title: "Inspiration cards",
    body: "A shelf of gentle words you can pin straight onto any board.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <Brand />
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

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-14 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="animate-rise">
          <p className="eyebrow">A studio for becoming</p>
          <h1 className="display mt-4 text-6xl text-primary sm:text-7xl">
            Make it feel
            <span className="block text-clay">possible.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base text-muted-foreground">
            Physical vision boards go quiet on the wall. Task apps forget why you started.
            Dreamboard keeps the picture and the progress in one place — boards you can move,
            milestones you can tick, and a journal that remembers how it felt.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
            >
              Build my first board <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-border px-7 py-3.5 text-sm transition-colors hover:bg-secondary"
            >
              See the demo space
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Loaded with a full example account — boards, goals and journal entries ready to explore.
          </p>
        </div>

        <div className="relative animate-soft-in">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80"
            alt="A calm, light-filled studio space"
            className="h-[30rem] w-full rounded-3xl object-cover"
            loading="lazy"
          />
          <div className="absolute -bottom-8 -left-6 hidden w-64 animate-float rounded-2xl bg-accent p-5 text-accent-foreground shadow-lg sm:block">
            <p className="eyebrow">Overall momentum</p>
            <p className="display text-4xl">64%</p>
            <p className="mt-1 text-xs opacity-75">12 days in a row — gently.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="eyebrow">What lives inside</p>
        <h2 className="display mt-3 text-4xl text-primary sm:text-5xl">
          Visualisation and execution, finally in one space.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <article
              key={f.title}
              style={{ animationDelay: `${i * 80}ms` }}
              className="surface lift animate-rise p-7"
            >
              <f.icon className="h-6 w-6 text-clay" />
              <h3 className="display mt-5 text-2xl text-primary">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {quotes.slice(0, 3).map((q, i) => (
            <blockquote
              key={q.id}
              className={
                "animate-rise rounded-2xl p-8 " +
                (i === 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground")
              }
            >
              <p className="display text-2xl">“{q.text}”</p>
              <footer className="eyebrow mt-4 opacity-70">{q.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="animate-rise flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-primary p-12 text-primary-foreground">
          <div>
            <p className="eyebrow text-primary-foreground/70">Ready when you are</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">
              Give your next chapter a place to land.
            </h2>
          </div>
          <Link
            to="/signup"
            className="rounded-full bg-accent px-8 py-4 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03]"
          >
            Create your Dreamboard
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
