import { useMemo } from "react";
import { useAppSelector } from "@/useAppStore";

export function useTaskStats() {
  // Store se saari tasks padho
  const tasks = useAppSelector((s) => s.tasks.tasks);

  // useMemo: sirf tab dobara calculate karo jab "tasks" badle
  return useMemo(
    () => ({
      total: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
      // urgent = high priority AUR abhi complete nahi hui
      urgent: tasks.filter((t) => t.priority === "high" && !t.completed)
        .length,
    }),
    [tasks]
  );
}