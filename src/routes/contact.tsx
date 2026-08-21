import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Brand } from "@/components/Brand";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dreamboard" },
      {
        name: "description",
        content:
          "Reach out to Dreamboard. Share feedback, report an issue, or say hello — we'd love to hear from you.",
      },
      { property: "og:title", content: "Contact — Dreamboard" },
      {
        property: "og:description",
        content: "Have a question about Dreamboard? Send us a note and we'll get back to you.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || !message.trim()) return;
    setSent(true);
  }

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
        <p className="eyebrow">We're listening</p>
        <h1 className="display mt-4 text-5xl text-primary sm:text-6xl">
          Say <span className="text-clay">hello.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground">
          Have a thought about Dreamboard, a bug to report, or a feature that would make your boards
          feel more like you? Drop us a line and we'll get back to you.
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div className="surface lift animate-rise rounded-2xl p-7">
            <p className="eyebrow">Email us</p>
            <p className="mt-2 text-sm text-muted-foreground">
              For anything else, write directly to{" "}
              <a
                className="font-medium text-primary underline underline-offset-4"
                href="mailto:hello@dreamboard.app"
              >
                hello@dreamboard.app
              </a>
              {""}. We read every message.
            </p>
          </div>

          <div
            className="surface lift animate-rise rounded-2xl p-7"
            style={{ animationDelay: "80ms" }}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="eyebrow" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="eyebrow" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="eyebrow" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 h-32 w-full resize-y rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  placeholder="What's on your mind?"
                />
              </div>
              {sent ? (
                <p className="text-sm text-primary">Thanks, Jane. We'll be in touch soon.</p>
              ) : (
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.02]"
                >
                  Send message
                </button>
              )}
            </form>
          </div>
        </div>
      </main>

      <Footer className="max-w-4xl" />
    </div>
  );
}
