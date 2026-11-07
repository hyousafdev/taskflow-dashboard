import { cn } from "@/lib/utils";
import { PRIORITY_BADGE_VARIANTS } from "@/constants/priority";

export function Badge({ variant, children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold",
        // variant = "high" | "medium" | "low" -> color classes
        PRIORITY_BADGE_VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}