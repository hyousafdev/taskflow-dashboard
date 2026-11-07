// Sorting ke liye: chhota number = pehle (high sabse upar)
export const PRIORITY_ORDER = {
  high: 0,
  medium: 1,
  low: 2,
};

// Priority dot ka color (Step 5 mein)
export const PRIORITY_DOT = {
  high: "bg-red-500",
  medium: "bg-amber-400",
  low: "bg-emerald-500",
};

export const PRIORITY_ICONS = {
  high: "🔴",
  medium: "🟡",
  low: "🟢",
};

// Badge ke colors (Step 5 mein)
export const PRIORITY_BADGE_VARIANTS = {
  high: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 border border-red-200 dark:border-red-800",
  medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
};