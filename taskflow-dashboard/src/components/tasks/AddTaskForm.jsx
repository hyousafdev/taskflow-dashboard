import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Icons } from "@/components/ui/Icons";
import { useAppDispatch } from "@/hooks/useAppStore";
import { addTask } from "@/store/tasksSlice";

export function AddTaskForm() {
  const dispatch = useAppDispatch();

  // Local state: sirf is form ke liye, store mein nahi jaati
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleAdd = () => {
    const trimmed = title.trim(); // aage-peeche ke spaces hatao
    if (!trimmed) return;         // khali ho to kuch mat karo

    // Store ko action bhejo
    dispatch(addTask({ title: trimmed, priority }));

    // Form reset
    setTitle("");
    setPriority("medium");
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4 mb-5 shadow-sm">
      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3">
        New Task
      </p>

      {/* Mobile: upar neeche, Desktop: ek line mein */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="What needs to be done?"
          className="flex-1"
        />

        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="sm:w-36"
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </Select>

        <Button onClick={handleAdd} className="gap-1.5 shrink-0">
          <Icons.Plus /> Add
        </Button>
      </div>
    </div>
  );
}