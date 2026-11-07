import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import tasksReducer from "./tasksSlice"; // NEW

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    tasks: tasksReducer, // NEW: s.tasks.tasks se access hoga
  },
});