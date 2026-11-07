import { cn } from "@/lib/utils";

const variantStyles = {
  default:
    "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm",
  outline:
    "border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:ring-indigo-400",
  ghost:
    "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:ring-indigo-400",
  destructive:
    "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-sm",
  success:
    "bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400 shadow-sm",
};

const sizeStyles = {
  default: "px-4 py-2 text-sm",
  sm: "px-3 py-1.5 text-xs",
  lg: "px-5 py-2.5 text-base",
  icon: "p-2", // sirf icon wale square button ke liye
};

export function Button({
  children,
  variant = "default",
  size = "default",
  className,
  ...props // onClick, aria-label, disabled sab yahin se aayenge
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-lg",
        "transition-all duration-150",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-40 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}