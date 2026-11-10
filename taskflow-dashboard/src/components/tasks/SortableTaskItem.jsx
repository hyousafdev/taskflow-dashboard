import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icons } from "@/components/ui/Icons";
import { TaskItem } from "./TaskItem";

export function SortableTaskItem({ task }) {
  const {
    attributes,          // accessibility attributes (role, tabIndex...)
    listeners,           // mouse / touch / keyboard events
    setNodeRef,          // "ye element sortable hai"
    setActivatorNodeRef, // "drag sirf is handle se shuru hoga"
    transform,           // drag ke dauran kitna khiska
    transition,          // smooth animation
    isDragging,          // abhi isi ko pakda hua hai?
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Ye button TaskItem ke left par dikhega
  const handle = (
    <button
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      aria-label="Drag to reorder"
      className="mt-0.5 flex-shrink-0 cursor-grab touch-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 active:cursor-grabbing"
    >
      <Icons.Grip />
    </button>
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      // Jo card utha rakha hai wo upar aaye aur halka transparent dikhe
      className={isDragging ? "relative z-10 rounded-xl opacity-80 shadow-xl" : ""}
    >
      <TaskItem task={task} dragHandle={handle} />
    </div>
  );
}