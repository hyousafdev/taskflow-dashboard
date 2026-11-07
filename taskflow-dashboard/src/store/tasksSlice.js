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
  },
});

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;