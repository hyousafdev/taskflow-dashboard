import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import tasksReducer from "./tasksSlice";
import filterReducer from "./filterSlice";
import { loadState, saveState } from "@/lib/storage"; // NEW

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    tasks: tasksReducer,
    filter: filterReducer,
  },
  // NEW: saved data ho to usse shuru karo, warna undefined (default state)
  preloadedState: loadState(),
});

// NEW: store mein jab bhi koi action chale, ye function chalta hai
let prevTasks = store.getState().tasks;
let prevUi = store.getState().ui;

store.subscribe(() => {
  const { tasks, ui } = store.getState();

  // Sirf tab save karo jab tasks ya ui sach mein badle
  // (filter badalne par save karne ki zaroorat nahi)
  if (tasks === prevTasks && ui === prevUi) return;

  prevTasks = tasks;
  prevUi = ui;

  // filter save nahi kar rahe: har baar app saaf filters se khule
  saveState({ tasks, ui });
});