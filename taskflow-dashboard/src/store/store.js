import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import tasksReducer from "./tasksSlice";
import filterReducer from "./filterSlice"; // NEW

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    tasks: tasksReducer,
    filter: filterReducer, // NEW: s.filter.status se access hoga
  },
});