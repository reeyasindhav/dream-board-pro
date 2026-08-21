import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useApp } from "@/lib/app-store";
import { AuthLayout } from "@/components/AuthLayout";
import { Field } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your Dreamboard" },
      {
        name: "description",
        content:
          "Start a free Dreamboard: visual boards, milestone tracking and a mood journal in one calm space.",
      },
      { property: "og:title", content: "Create your Dreamboard" },
      {
        property: "og:description",
        content: "Turn your vision into gentle, trackable daily progress.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { signIn } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("Alex Rivera");
  const [email, setEmail] = useState("alex@dreamboard.app");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <AuthLayout
      eyebrow="Begin gently"
      title="Give your dreams a place to land."
      subtitle="Three minutes to set up, a lifetime of small steps. No pressure, no streak shaming."
      footer={
        <p className="text-sm text-muted-foreground">
          Already here?{" "}
          <Link to="/login" className="font-medium text-primary underline underline-offset-4">
            Sign in
          </Link>
        </p>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim() || !email.includes("@") || password.length < 6) {
            setError("Add your name, a valid email, and 6+ characters for a password.");
            return;
          }
          signIn(name.trim(), email);
          navigate({ to: "/dashboard" });
        }}
      >
        <Field label="Your name" value={name} onChange={setName} placeholder="Alex Rivera" />
        <Field
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
          placeholder="you@example.com"
        />
        <Field
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
          placeholder="At least 6 characters"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.02]"
        >
          Create my space
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Your boards stay on this device. Nothing is shared.
        </p>
      </form>
    </AuthLayout>
  );
}
