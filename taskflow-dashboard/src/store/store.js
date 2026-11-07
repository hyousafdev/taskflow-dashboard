import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer, // state shape: { ui: { dark: true } }
  },
});