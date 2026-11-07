import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/Icons";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import {
  setStatusFilter,
  setPriorityFilter,
  setSortBy,
} from "@/store/filterSlice";
import { PRIORITY_ICONS } from "@/constants/priority";

// Buttons ka data array mein: JSX baar baar nahi likhna padta
const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

const PRIORITY_OPTIONS = [
  { value: "all", label: "All Priorities" },
  { value: "high", label: `${PRIORITY_ICONS.high} High` },
  { value: "medium", label: `${PRIORITY_ICONS.medium} Medium` },
  { value: "low", label: `${PRIORITY_ICONS.low} Low` },
];

const SORT_OPTIONS = [
  { key: "createdAt", label: "Date" },
  { key: "title", label: "A → Z" },
  { key: "priority", label: "Priority" },
];

// Pill ke styles
const pillBase =
  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize";
const pillActive = "bg-indigo-600 text-white shadow";
const pillInactive =
  "bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600";

export function FilterBar() {
  const dispatch = useAppDispatch();

  // Store se current filter settings padho
  const { status, priority, sortBy, sortDir } = useAppSelector(
    (s) => s.filter
  );

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4 mb-5 shadow-sm space-y-3">
      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
        Filters &amp; Sort
      </p>

      {/* Status + Priority pills */}
      <div className="flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => dispatch(setStatusFilter(opt.value))}
            // Jo store mein selected hai, wahi highlight
            className={cn(
              pillBase,
              status === opt.value ? pillActive : pillInactive
            )}
          >
            {opt.label}
          </button>
        ))}

        {/* Beech ki vertical line */}
        <div className="w-px bg-zinc-200 dark:bg-zinc-600 mx-1" />

        {PRIORITY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => dispatch(setPriorityFilter(opt.value))}
            className={cn(
              pillBase,
              priority === opt.value ? pillActive : pillInactive
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Sort buttons */}
      <div className="flex flex-wrap gap-2 items-center pt-1 border-t border-zinc-100 dark:border-zinc-700">
        <span className="text-xs text-zinc-400 flex items-center gap-1">
          <Icons.Sort /> Sort by:
        </span>

        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => dispatch(setSortBy(opt.key))}
            className={cn(
              pillBase,
              "flex items-center gap-1",
              sortBy === opt.key
                ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700"
                : pillInactive
            )}
          >
            {opt.label}
            {/* Arrow sirf active sort button par */}
            {sortBy === opt.key && (
              <span className="text-base leading-none">
                {sortDir === "asc" ? "↑" : "↓"}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}