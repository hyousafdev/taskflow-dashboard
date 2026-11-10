import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatDueDate, getDueStatus } from "@/lib/dates";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/Icons";
import { useAppDispatch } from "@/hooks/useAppStore";
import { toggleTask, deleteTask, editTask } from "@/store/tasksSlice";
import { PRIORITY_DOT, PRIORITY_ICONS } from "@/constants/priority";

// Due chip ke colors
const DUE_STYLES = {
  overdue: "text-red-600 dark:text-red-400",
  today: "text-amber-600 dark:text-amber-400",
  upcoming: "text-zinc-500 dark:text-zinc-400",
};

// task = task ka data, dragHandle = drag ka button (sirf manual mode mein aata hai)
export function TaskItem({ task, dragHandle }) {
  const dispatch = useAppDispatch();

  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState(task.priority);
  // ?? "" kyunke purane tasks mein dueDate hota hi nahi (undefined)
  const [editDueDate, setEditDueDate] = useState(task.dueDate ?? "");

  // Due date ka status
  const rawStatus = task.dueDate ? getDueStatus(task.dueDate) : null;
  // Completed task ko laal/peela mat dikhao: wo to ho chuka
  const dueStatus = task.completed && rawStatus ? "upcoming" : rawStatus;

  let dueLabel = null;
  if (task.dueDate) {
    if (dueStatus === "overdue")
      dueLabel = `Overdue · ${formatDueDate(task.dueDate)}`;
    else if (dueStatus === "today") dueLabel = "Due today";
    else dueLabel = `Due ${formatDueDate(task.dueDate)}`;
  }

  const saveEdit = () => {
    const trimmed = editTitle.trim();
    if (!trimmed) return;
    dispatch(
      editTask({
        id: task.id,
        updates: {
          title: trimmed,
          priority: editPriority,
          dueDate: editDueDate || null, // khali = date hata do
        },
      })
    );
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate ?? "");
    setEditing(false);
  };

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 p-4 rounded-xl border transition-all duration-200",
        task.completed
          ? "bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/50 opacity-70"
          : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md"
      )}
    >
      {/* Drag handle: manual mode mein hi aata hai, warna kuch render nahi hota */}
      {dragHandle}

      {/* Priority dot */}
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

      {/* Content */}
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
            {/* flex-wrap: chhoti screen par neeche wrap ho jaye */}
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="text-xs"
              >
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </Select>

              {/* Edit mode mein date picker */}
              <Input
                type="date"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                aria-label="Due date"
                className="w-auto text-xs [color-scheme:light] dark:[color-scheme:dark]"
              />

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

            {/* flex-wrap: badge + created date + due chip ek line mein na samayein to neeche */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5">
              <Badge variant={task.priority}>
                {PRIORITY_ICONS[task.priority]}{" "}
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>

              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {new Date(task.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>

              {/* Due chip: sirf tab jab dueDate set ho */}
              {dueLabel && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium [&_svg]:w-3 [&_svg]:h-3",
                    DUE_STYLES[dueStatus]
                  )}
                >
                  <Icons.Calendar />
                  {dueLabel}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Hover buttons */}
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