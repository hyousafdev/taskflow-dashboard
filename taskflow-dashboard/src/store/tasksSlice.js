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
        completed: false,
        createdAt: Date.now(),
      });
    },

    // NEW: action.payload = task ka id
    toggleTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed; // true <-> false
    },

    // NEW: action.payload = task ka id
    deleteTask: (state, action) => {
      // jis id ka task hatana hai, usko chhod kar baaki rakho
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },

    // NEW: action.payload = { id, updates: { title, priority } }
    editTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      // Object.assign sirf wahi fields badalta hai jo updates mein hain
      // completed aur createdAt waise hi rehte hain
      if (task) Object.assign(task, action.payload.updates);
    },
  },
});

export const { addTask, toggleTask, deleteTask, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;