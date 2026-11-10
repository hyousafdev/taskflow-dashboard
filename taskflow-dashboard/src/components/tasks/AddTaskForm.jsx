import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Icons } from "@/components/ui/Icons";
import { useAppDispatch } from "@/hooks/useAppStore";
import { addTask } from "@/store/tasksSlice";

export function AddTaskForm() {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState(""); // NEW: "" = date nahi chuni

  const handleAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) return;

    dispatch(
      addTask({
        title: trimmed,
        priority,
        dueDate: dueDate || null, // NEW: khali string ko null bana do
      })
    );

    setTitle("");
    setPriority("medium");
    setDueDate(""); // NEW
  };

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4 mb-5 shadow-sm">
      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-3">
        New Task
      </p>

      <div className="flex flex-col gap-2">
        {/* Row 1: title */}
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="What needs to be done?"
        />

        {/* Row 2: priority + due date + add */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="sm:w-36"
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </Select>

          {/* NEW: date picker. color-scheme se browser ka calendar popup dark mode mein dark dikhta hai */}
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            aria-label="Due date"
            className="sm:flex-1 [color-scheme:light] dark:[color-scheme:dark]"
          />

          <Button onClick={handleAdd} className="gap-1.5 shrink-0">
            <Icons.Plus /> Add
          </Button>
        </div>
      </div>
    </div>
  );
}