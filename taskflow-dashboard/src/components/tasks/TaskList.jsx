import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { useFilteredTasks } from "@/hooks/useFilteredTasks";
import { reorderTasks } from "@/store/tasksSlice";
import { TaskItem } from "./TaskItem";
import { SortableTaskItem } from "./SortableTaskItem";

export function TaskList() {
  const dispatch = useAppDispatch();
  const tasks = useFilteredTasks();
  const sortBy = useAppSelector((s) => s.filter.sortBy);

  // Sensors: drag kaise shuru ho
  const sensors = useSensors(
    // Mouse/touch: 5px khiskao tab drag shuru (seedhe click se drag na ho)
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    // Keyboard: Space se utha, arrow keys se hilao, Space se chhodo
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Drag khatam: active = jo utha tha, over = jis par chhoda
  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return; // kahin nahi chhoda ya wahi jagah
    dispatch(reorderTasks({ activeId: active.id, overId: over.id }));
  };

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

  // Automatic sort modes: simple list, drag nahi
  if (sortBy !== "manual") {
    return (
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    );
  }

  // Manual mode: drag and drop chalu
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {tasks.map((task) => (
            <SortableTaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}