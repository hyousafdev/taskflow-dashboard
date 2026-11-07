import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "Design new dashboard wireframes",
      priority: "high",
      completed: false,
      createdAt: Date.now() - 86400000 * 2, // 2 din pehle
    },
    {
      id: 2,
      title: "Write unit tests for auth module",
      priority: "medium",
      completed: false,
      createdAt: Date.now() - 86400000, // 1 din pehle
    },
    {
      id: 3,
      title: "Update README documentation",
      priority: "low",
      completed: true,
      createdAt: Date.now() - 43200000, // 12 ghante pehle
    },
    {
      id: 4,
      title: "Fix payment gateway bug",
      priority: "high",
      completed: false,
      createdAt: Date.now() - 3600000, // 1 ghanta pehle
    },
    {
      id: 5,
      title: "Schedule team retrospective",
      priority: "medium",
      completed: true,
      createdAt: Date.now() - 7200000, // 2 ghante pehle
    },
  ],
  nextId: 6, // agli task ka id (add karte waqt use hoga)
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {}, // abhi khali, aage add honge
});

export default tasksSlice.reducer;