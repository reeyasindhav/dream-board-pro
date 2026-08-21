import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  const year = new Date().getFullYear();
  return (
    <footer
      className={cn(
        "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-border/70 px-5 py-6 text-sm text-muted-foreground",
        className,
      )}
    >
      <span>© {year} Dreamboard</span>
      <div className="flex flex-wrap gap-4">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <Link to="/about" className="hover:text-primary">
          About
        </Link>
        <Link to="/templates" className="hover:text-primary">
          Templates
        </Link>
        <Link to="/privacy" className="hover:text-primary">
          Privacy
        </Link>
        <Link to="/terms" className="hover:text-primary">
          Terms
        </Link>
        <Link to="/help" className="hover:text-primary">
          Help
        </Link>
        <Link to="/contact" className="hover:text-primary">
          Contact
        </Link>
        <Link to="/login" className="hover:text-primary">
          Sign in
        </Link>
        <Link to="/signup" className="hover:text-primary">
          Create account
        </Link>
      </div>
    </footer>
  );
}
