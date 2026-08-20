import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useApp } from "@/lib/app-store";
import { AuthLayout } from "@/components/AuthLayout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Dreamboard" },
      { name: "description", content: "Sign in to your Dreamboard vision boards, goals and mood journal." },
      { property: "og:title", content: "Sign in — Dreamboard" },
      { property: "og:description", content: "Return to your vision boards and gentle goal tracking." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn, state, ready } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("alex@dreamboard.app");
  const [password, setPassword] = useState("dreamboard");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && state.user) navigate({ to: "/dashboard", replace: true });
  }, [ready, state.user, navigate]);

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Your vision is still here, waiting."
      subtitle="Pick up where you left off — the boards, the milestones, the quiet wins."
      footer={
        <p className="text-sm text-muted-foreground">
          New to Dreamboard?{" "}
          <Link to="/signup" className="font-medium text-primary underline underline-offset-4">
            Create an account
          </Link>
        </p>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.includes("@") || password.length < 6) {
            setError("Use a valid email and a password of at least 6 characters.");
            return;
          }
          signIn(state.user?.name ?? "Alex Rivera", email);
          navigate({ to: "/dashboard" });
        }}
      >
        <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
        <Field label="Password" value={password} onChange={setPassword} type="password" placeholder="••••••••" />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.02]"
        >
          Sign in
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Demo space — any email works, nothing leaves your browser.
        </p>
      </form>
    </AuthLayout>
  );
}

export function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}
