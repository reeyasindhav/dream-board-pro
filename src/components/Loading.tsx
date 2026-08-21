import { Loader2 } from "lucide-react";

export function Loading({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-muted-foreground">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}
