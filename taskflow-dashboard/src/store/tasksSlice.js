import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "Design new dashboard wireframes",
      priority: "high",
      completed: false,
      createdAt: Date.now() - 86400000 * 2,
    },
    {
      id: 2,
      title: "Write unit tests for auth module",
      priority: "medium",
      completed: false,
      createdAt: Date.now() - 86400000,
    },
    {
      id: 3,
      title: "Update README documentation",
      priority: "low",
      completed: true,
      createdAt: Date.now() - 43200000,
    },
    {
      id: 4,
      title: "Fix payment gateway bug",
      priority: "high",
      completed: false,
      createdAt: Date.now() - 3600000,
    },
    {
      id: 5,
      title: "Schedule team retrospective",
      priority: "medium",
      completed: true,
      createdAt: Date.now() - 7200000,
    },
  ],
  nextId: 6,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.unshift({
        id: state.nextId++,
        title: action.payload.title,
        priority: action.payload.priority,
        dueDate: action.payload.dueDate ?? null, // NEW
        completed: false,
        createdAt: Date.now(),
      });
    },

    toggleTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },

    editTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) Object.assign(task, action.payload.updates);
    },

    // NEW: payload = { activeId, overId }
    // activeId = jo task utha kar rakha, overId = jis task ki jagah par chhoda
    reorderTasks: (state, action) => {
      const { activeId, overId } = action.payload;

      // Poore array mein dono ki position dhoondo
      const from = state.tasks.findIndex((t) => t.id === activeId);
      const to = state.tasks.findIndex((t) => t.id === overId);

      if (from === -1 || to === -1 || from === to) return;

      // Pehle nikalo, phir nayi jagah par daalo
      const [moved] = state.tasks.splice(from, 1);
      state.tasks.splice(to, 0, moved);
    },

    // NEW: koi payload nahi chahiye
    // Sirf wahi tasks rakho jo completed NAHI hain
    clearCompleted: (state) => {
      state.tasks = state.tasks.filter((t) => !t.completed);
    },
  },
});

// NEW: clearCompleted export mein add
export const {
  addTask,
  toggleTask,
  deleteTask,
  editTask,
  clearCompleted,
  reorderTasks, // NEW
} = tasksSlice.actions;

export default tasksSlice.reducer;
