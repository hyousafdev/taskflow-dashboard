import { cn } from "@/lib/utils";
import { useTaskStats } from "@/hooks/useTaskStats";

// Har card ki config: kaunsa count, kya label, kaunsa color
const statConfig = [
  { key: "total",     label: "Total",     color: "text-zinc-700 dark:text-zinc-200" },
  { key: "active",    label: "Active",    color: "text-indigo-600 dark:text-indigo-400" },
  { key: "completed", label: "Done",      color: "text-emerald-600 dark:text-emerald-400" },
  { key: "urgent",    label: "🔴 Urgent", color: "text-red-600 dark:text-red-400" },
];

export function StatsBar() {
  const stats = useTaskStats(); // { total, active, completed, urgent }

  return (
    <div className="grid grid-cols-4 gap-3 mb-6">
      {statConfig.map(({ key, label, color }) => (
        <div
          key={key}
          className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-3 text-center shadow-sm"
        >
          {/* stats[key] = stats.total / stats.active / ... */}
          <div className={cn("text-2xl font-bold", color)}>{stats[key]}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}