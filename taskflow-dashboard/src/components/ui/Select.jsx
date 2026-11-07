import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        "rounded-lg border border-zinc-300 dark:border-zinc-600",
        "bg-white dark:bg-zinc-800",
        "px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
        "transition-all cursor-pointer",
        className
      )}
      {...props}
    >
      {children} {/* yahan <option> tags aayenge */}
    </select>
  );
}