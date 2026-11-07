import { useMemo } from "react";
import { useAppSelector } from "./useAppStore";
import { PRIORITY_ORDER } from "@/constants/priority";

export function useFilteredTasks() {
  // Store se tasks aur filter settings dono padho
  const tasks = useAppSelector((s) => s.tasks.tasks);
  const { status, priority, sortBy, sortDir } = useAppSelector(
    (s) => s.filter
  );

  return useMemo(() => {
    // Copy banao: original state ko sort/mutate nahi karna
    let result = [...tasks];

    // 1) Status filter
    if (status !== "all") {
      result = result.filter((t) =>
        status === "active" ? !t.completed : t.completed
      );
    }

    // 2) Priority filter
    if (priority !== "all") {
      result = result.filter((t) => t.priority === priority);
    }

    // 3) Sort
    result.sort((a, b) => {
      let cmp = 0;

      if (sortBy === "title") {
        cmp = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      } else if (sortBy === "priority") {
        // high=0, medium=1, low=2
        cmp = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      } else {
        // createdAt: bada number = zyada recent
        cmp = a.createdAt - b.createdAt;
      }

      // asc mein jaisa hai waisa, desc mein ulta
      return sortDir === "asc" ? cmp : -cmp;
    });

    return result;
  }, [tasks, status, priority, sortBy, sortDir]);
}