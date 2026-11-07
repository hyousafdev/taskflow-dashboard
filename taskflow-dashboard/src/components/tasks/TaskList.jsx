import { useFilteredTasks } from "@/hooks/useFilteredTasks";
import { TaskItem } from "./TaskItem"; // same folder -> ./

export function TaskList() {
  // Filter + sort ho kar tasks aate hain
  const tasks = useFilteredTasks();

  // Koi task nahi: empty state
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-3">✅</p>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium">
          No tasks here
        </p>
        <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
          Add a task above or adjust your filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        // key zaroori hai: React ko pata chale kaunsa item kaunsa hai
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}