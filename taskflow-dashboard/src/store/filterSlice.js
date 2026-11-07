import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "all",       // "all" | "active" | "completed"
  priority: "all",     // "all" | "high" | "medium" | "low"
  sortBy: "createdAt", // "createdAt" | "title" | "priority"
  sortDir: "desc",     // "asc" | "desc"
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // action.payload = "all" | "active" | "completed"
    setStatusFilter: (state, action) => {
      state.status = action.payload;
    },

    // action.payload = "all" | "high" | "medium" | "low"
    setPriorityFilter: (state, action) => {
      state.priority = action.payload;
    },

    // action.payload = "createdAt" | "title" | "priority"
    setSortBy: (state, action) => {
      if (state.sortBy === action.payload) {
        // Same button dobara dabaya: direction palto
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        // Naya button: us field par jao, asc se shuru
        state.sortBy = action.payload;
        state.sortDir = "asc";
      }
    },
  },
});

export const { setStatusFilter, setPriorityFilter, setSortBy } =
  filterSlice.actions;

export default filterSlice.reducer;