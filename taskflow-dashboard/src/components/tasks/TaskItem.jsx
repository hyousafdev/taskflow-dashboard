import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/Icons";
import { useAppDispatch } from "@/hooks/useAppStore";
import { toggleTask, deleteTask, editTask } from "@/store/tasksSlice";
import { PRIORITY_DOT, PRIORITY_ICONS } from "@/constants/priority";

// task = { id, title, priority, completed, createdAt } (parent se aata hai)
export function TaskItem({ task }) {
  const dispatch = useAppDispatch();

  // Local state: edit mode ke liye
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.priority);

  const saveEdit = () => {
    const trimmed = editTitle.trim();
    if (!trimmed) return; // khali title save nahi hoga
    dispatch(
      editTask({
        id: task.id,
        updates: { title: trimmed, priority: editPriority },
      })
    );
    setEditing(false); // wapas view mode
  };

  const cancelEdit = () => {
    // purani values wapas, kuch save nahi
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditing(false);
  };

  return (
    // "group" lagane se andar ke elements "group-hover:" use kar sakte hain
    <div
      className={cn(
        "group relative flex items-start gap-3 p-4 rounded-xl border transition-all duration-200",
        task.completed
          ? "bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/50 opacity-70"
          : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md"
      )}
    >
      {/* Priority dot: red / amber / green */}
      <div
        className={cn(
          "mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-zinc-800 opacity-70",
          PRIORITY_DOT[task.priority]
        )}
      />

      {/* Checkbox */}
      <button
        onClick={() => dispatch(toggleTask(task.id))}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        className={cn(
          "flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 transition-all duration-150",
          task.completed
            ? "bg-indigo-500 border-indigo-500 text-white"
            : "border-zinc-300 dark:border-zinc-600 hover:border-indigo-400"
        )}
      >
        {task.completed && <Icons.Check />}
      </button>

      {/* Content: editing true/false ke hisaab se alag UI */}
      <div className="flex-1 min-w-0">
        {editing ? (
          // ---------- EDIT MODE ----------
          <div className="space-y-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit();
                if (e.key === "Escape") cancelEdit();
              }}
              autoFocus
            />
            <div className="flex items-center gap-2">
              <Select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="text-xs"
              >
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </Select>
              <Button size="sm" variant="success" onClick={saveEdit}>
                <Icons.Save />
                <span className="ml-1">Save</span>
              </Button>
              <Button size="sm" variant="ghost" onClick={cancelEdit}>
                <Icons.X />
              </Button>
            </div>
          </div>
        ) : (
          // ---------- VIEW MODE ----------
          <>
            <p
              className={cn(
                "text-sm font-medium leading-snug break-words",
                task.completed
                  ? "line-through text-zinc-400 dark:text-zinc-500"
                  : "text-zinc-800 dark:text-zinc-100"
              )}
            >
              {task.title}
            </p>

            <div className="flex items-center gap-2 mt-1.5">
              <Badge variant={task.priority}>
                {PRIORITY_ICONS[task.priority]}{" "}
                {/* "high" -> "High" */}
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {new Date(task.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Edit + Delete buttons: sirf hover par dikhte hain */}
      {!editing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setEditing(true)}
            aria-label="Edit task"
            className="h-7 w-7"
          >
            <Icons.Edit />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => dispatch(deleteTask(task.id))}
            aria-label="Delete task"
            className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Icons.Trash />
          </Button>
        </div>
      )}
    </div>
  );
}