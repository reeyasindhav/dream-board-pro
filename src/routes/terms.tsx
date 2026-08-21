import { createFileRoute, Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Brand } from "@/components/Brand";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Dreamboard" },
      {
        name: "description",
        content:
          "Terms of use for Dreamboard. Your vision boards and journal stay yours; read how to use the space responsibly.",
      },
      { property: "og:title", content: "Terms of Use — Dreamboard" },
      {
        property: "og:description",
        content: "The simple rules for using Dreamboard's vision boards and mood journal.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
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
        <p className="eyebrow">The ground rules</p>
        <h1 className="display mt-4 text-5xl text-primary sm:text-6xl">
          Terms of <span className="text-clay">use.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground">
          Dreamboard is a calm space for personal growth — vision boards, goal tracking and a mood
          journal. These terms keep that space safe and fair for everyone.
        </p>

        <div className="mt-12 grid gap-10">
          <Section
            title="Accounts"
            body={
              <>
                <Para>
                  You're 13 or older (or the age of digital consent where you live) to use
                  Dreamboard. Your account is for your use only — don't share it, and keep your
                  login details safe.
                </Para>
                <Para>
                  The demo space uses a placeholder email and works in your browser only; nothing
                  you create in the demo leaves your device. It's meant to be explored, not to be
                  your forever home.
                </Para>
              </>
            }
          />

          <Section
            title="Your content stays yours"
            body={
              <Para>
                Boards, goals, journal entries and quotes you add are yours. We don't scan your
                journals for ads, we don't sell your content, and we don't train models on your
                personal boards. You own the picture and we only help you keep it.
              </Para>
            }
          />

          <Section
            title="What you can't do"
            body={
              <Para>
                Don't post anything unlawful, impersonate others, scrape the service, or try to
                break it. Treat other people's boards and journals (where shared intentionally) with
                the same respect you'd give a physical journal.
              </Para>
            }
          />

          <Section
            title="Our software"
            body={
              <Para>
                Dreamboard is provided "as is" and "as available". We aim for calm, not guarantees:
                we can't promise uninterrupted, secure, or error-free service, and we won't be
                liable for any loss connected to your use.
              </Para>
            }
          />

          <Section
            title="Ending these terms"
            body={
              <Para>
                You can delete your account and data at any time from Settings. We may suspend or
                remove access if these terms are broken. Sections that should survive termination
                (ownership, disclaimers, limits on liability) remain in effect.
              </Para>
            }
          />

          <Section
            title="Changes"
            body={
              <Para>
                We may update these terms — significant changes get a notice in the app before they
                take effect. Your continued use after an update means you agree to the new terms.
              </Para>
            }
          />
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-accent/40 p-6 text-sm text-muted-foreground">
          <p>
            Questions? Write to{" "}
            <a
              className="font-medium text-primary underline underline-offset-4"
              href="mailto:hello@dreamboard.app"
            >
              hello@dreamboard.app
            </a>{" "}
            . These terms were last updated August 2026.
          </p>
        </div>
      </main>

      <Footer className="max-w-4xl" />
    </div>
  );
}

function Section({ title, body }: { title: string; body: ReactNode }) {
  return (
    <section className="surface lift animate-rise rounded-2xl p-7">
      <h2 className="display text-2xl text-primary">{title}</h2>
      <div className="mt-3 space-y-3 text-sm text-muted-foreground">{body}</div>
    </section>
  );
}

function Para({ children }: { children: ReactNode }) {
  return <p className="leading-relaxed">{children}</p>;
}
