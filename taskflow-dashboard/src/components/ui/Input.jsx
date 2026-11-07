import { cn } from "@/lib/utils";

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-zinc-300 dark:border-zinc-600",
        "bg-white dark:bg-zinc-800",
        "px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
        "transition-all",
        className
      )}
      {...props} // value, onChange, onKeyDown, placeholder sab yahin se
    />
  );
}