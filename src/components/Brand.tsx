import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Brand({ tagline = "A studio for becoming", to = "/" }: { tagline?: string; to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-3 group">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-12">
        <Sparkles className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <span className="block display text-2xl text-primary">Dreamboard</span>
        <span className="block eyebrow">{tagline}</span>
      </span>
    </Link>
  );
}
