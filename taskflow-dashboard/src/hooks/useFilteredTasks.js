import { useMemo } from "react";
import { useAppSelector } from "./useAppStore";
import { PRIORITY_ORDER } from "@/constants/priority";

export function useFilteredTasks() {
  const tasks = useAppSelector((s) => s.tasks.tasks);
  const { status, priority, sortBy, sortDir } = useAppSelector(
    (s) => s.filter
  );

  return useMemo(() => {
    let result = [...tasks];

    if (status !== "all") {
      result = result.filter((t) =>
        status === "active" ? !t.completed : t.completed
      );
    }

    if (priority !== "all") {
      result = result.filter((t) => t.priority === priority);
    }

    // Manual mode mein sort skip: store ka order hi order hai
    if (sortBy !== "manual") {
      result.sort((a, b) => {
        // NEW: due date sort
        if (sortBy === "dueDate") {
          // Bina date wale HAMESHA neeche (direction se farq nahi)
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;

          // "2026-11-05" format mein string compare sahi chalta hai
          const cmp = a.dueDate.localeCompare(b.dueDate);
          return sortDir === "asc" ? cmp : -cmp;
        }

        let cmp = 0;

        if (sortBy === "title") {
          cmp = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        } else if (sortBy === "priority") {
          cmp = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        } else {
          cmp = a.createdAt - b.createdAt;
        }

        return sortDir === "asc" ? cmp : -cmp;
      });
    }

    return result;
  }, [tasks, status, priority, sortBy, sortDir]);
}