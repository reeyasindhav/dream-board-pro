export function ProgressBar({
  value,
  tone = "primary",
}: {
  value: number;
  tone?: "primary" | "accent";
}) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className={
          "h-full rounded-full transition-[width] duration-700 ease-out " +
          (tone === "accent" ? "bg-accent" : "bg-primary")
        }
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
