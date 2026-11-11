import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import tasksReducer from "./tasksSlice";
import filterReducer from "./filterSlice";
import { loadState, saveState } from "@/lib/storage";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    tasks: tasksReducer,
    filter: filterReducer,
  },
  preloadedState: loadState(),
});

let prevTasks = store.getState().tasks;
let prevUi = store.getState().ui;
let prevFilter = store.getState().filter; // NEW

store.subscribe(() => {
  const { tasks, ui, filter } = store.getState();

  // Teeno mein se kuch bhi na badla ho to save skip
  if (tasks === prevTasks && ui === prevUi && filter === prevFilter) return;

  prevTasks = tasks;
  prevUi = ui;
  prevFilter = filter;

  saveState({ tasks, ui, filter }); // NEW: filter bhi save
});