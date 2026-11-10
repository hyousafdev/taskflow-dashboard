import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icons";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { useTaskStats } from "@/hooks/useTaskStats";
import { useFilteredTasks } from "@/hooks/useFilteredTasks";
import { clearCompleted } from "@/store/tasksSlice";

export function ListToolbar() {
  const dispatch = useAppDispatch();

  const { total, completed } = useTaskStats();
  const visible = useFilteredTasks().length;
  const sortBy = useAppSelector((s) => s.filter.sortBy); // NEW

  const handleClear = () => {
    if (window.confirm(`Delete ${completed} completed task(s)?`)) {
      dispatch(clearCompleted());
    }
  };

  return (
    <div className="flex items-center justify-between mb-3 px-1">
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Showing {visible} of {total} tasks
        {/* NEW: hint sirf manual mode mein */}
        {sortBy === "manual" && " · Drag ⠿ to reorder"}
      </p>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleClear}
        disabled={completed === 0}
        className="gap-1.5 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        <Icons.Trash />
        Clear completed ({completed})
      </Button>
    </div>
  );
}