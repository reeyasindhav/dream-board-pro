import { createFileRoute, Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Brand } from "@/components/Brand";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Dreamboard" },
      {
        name: "description",
        content:
          "How Dreamboard handles your vision boards, goals and journal. We keep your boards in your browser and never sell your data.",
      },
      { property: "og:title", content: "Privacy — Dreamboard" },
      {
        property: "og:description",
        content: "Your vision stays yours. Read how Dreamboard collects and uses your data.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
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
        <p className="eyebrow">Our approach</p>
        <h1 className="display mt-4 text-5xl text-primary sm:text-6xl">
          Your vision stays <span className="text-clay">yours.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground">
          Dreamboard is built around one idea: your boards, goals and journal are for you. We keep
          them in your browser, they stay private by default, and we don't sell your attention or
          your data.
        </p>

        <div className="mt-12 grid gap-10">
          <Section
            title="The information we touch"
            body={
              <>
                <Para>
                  We only ask for an email when you create an account, and we use it to keep you
                  signed in. The content of your boards, the steps in your goals and every journal
                  entry live in your browser.
                </Para>
                <Para>
                  In our demo space, nothing you create ever leaves your device. There is no
                  tracking pixel, behavioural advertising profile, or hidden analytics about your
                  moods, goals or journals.
                </Para>
              </>
            }
          />

          <Section
            title="How your data is stored"
            body={
              <>
                <Para>
                  Your vision board layout — including the images, notes and quotes you pin — is
                  stored locally in your browser's storage. Clearing your site data removes it.
                  Treat this like a physical vision board: the picture and the progress stay
                  together.
                </Para>
                <Para>
                  If you choose to sync across devices, we encrypt the data in transit and store the
                  minimum needed to reconnect you to your boards. We can't read your journals or
                  reset your passwords for you.
                </Para>
              </>
            }
          />

          <Section
            title="Cookies and similar technology"
            body={
              <Para>
                We use cookies only to keep you signed in and to remember your theme. We don't use
                third-party advertising cookies. You can clear them anytime from your browser, but
                you'll need to sign in again.
              </Para>
            }
          />

          <Section
            title="Third parties we work with"
            body={
              <Para>
                We work with unsplash.com for the placeholder imagery on the demo boards, and with a
                payment provider if you ever upgrade. Neither receives your journals, boards or
                goals.
              </Para>
            }
          />

          <Section
            title="Your rights"
            body={
              <Para>
                You can export or delete your data at any time from Settings. Because your boards
                live in your browser, that export is literally everything we have on you. Under the
                GDPR and similar laws, you also have the right to access, correct, restrict or
                delete your personal data.
              </Para>
            }
          />

          <Section
            title="Children"
            body={
              <Para>
                Dreamboard is not directed at children under 13 and we don't knowingly collect data
                from them.
              </Para>
            }
          />

          <Section
            title="Changes to this policy"
            body={
              <Para>
                If we change this policy, the updated date at the top of the page will tell you. For
                material changes we'll show a notice in the app before it takes effect.
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
            or open a thread from Settings. This policy was last updated August 2026.
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
