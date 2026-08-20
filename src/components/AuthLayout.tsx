import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Brand } from "./Brand";

export function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-between px-6 py-8 sm:px-12">
        <Brand tagline="A gentler way forward" />
        <div className="mx-auto w-full max-w-md animate-rise py-12">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-3 text-4xl text-primary sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
        <div className="flex items-center justify-between gap-3">
          {footer}
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            Back home
          </Link>
        </div>
      </div>

      <div className="relative hidden overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80"
          alt="Golden light over layered mountains"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary/35" />
        <blockquote className="absolute bottom-12 left-10 right-10 animate-rise rounded-2xl bg-background/85 p-6 backdrop-blur">
          <p className="display text-2xl text-primary">
            “Your dreams don't need to be perfect. They just need a place to land.”
          </p>
          <p className="eyebrow mt-3">A note for the middle of the journey</p>
        </blockquote>
      </div>
    </div>
  );
}
