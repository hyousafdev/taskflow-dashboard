import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppStore";
import { Header } from "@/components/layout/Header";
import { StatsBar } from "@/components/layout/StatsBar"; // NEW
import { AddTaskForm } from "@/components/tasks/AddTaskForm"; // NEW import
import { FilterBar } from "@/components/tasks/FilterBar"; // NEW

export default function App() {
  const dark = useAppSelector((s) => s.ui.dark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Header />
        <StatsBar />
        <AddTaskForm />
        <FilterBar /> {/* NEW */}
      </div>
    </div>
  );
}
