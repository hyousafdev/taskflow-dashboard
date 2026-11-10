import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icons";
import { useAppDispatch } from "@/hooks/useAppStore";
import { useTaskStats } from "@/hooks/useTaskStats";
import { useFilteredTasks } from "@/hooks/useFilteredTasks";
import { clearCompleted } from "@/store/tasksSlice";

export function ListToolbar() {
  const dispatch = useAppDispatch();

  // Purane hooks dobara use ho rahe hain: koi naya logic nahi likha
  const { total, completed } = useTaskStats(); // sab tasks ke counts
  const visible = useFilteredTasks().length;   // filter ke baad kitne dikh rahe hain

  return (
    <div className="flex items-center justify-between mb-3 px-1">
      {/* Left: filter ke baad kitne dikh rahe hain */}
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Showing {visible} of {total} tasks
      </p>

      {/* Right: completed tasks ek saath hatao */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => dispatch(clearCompleted())}
        disabled={completed === 0} // koi completed nahi to button band
        className="gap-1.5 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        <Icons.Trash />
        Clear completed ({completed})
      </Button>
    </div>
  );
}