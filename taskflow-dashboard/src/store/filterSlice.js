import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "all",
  priority: "all",
  sortBy: "createdAt", // "createdAt" | "title" | "priority" | "manual"
  sortDir: "desc",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.status = action.payload;
    },

    setPriorityFilter: (state, action) => {
      state.priority = action.payload;
    },

    setSortBy: (state, action) => {
      // NEW: manual mode mein direction ka koi matlab nahi
      if (action.payload === "manual") {
        state.sortBy = "manual";
        return;
      }

      if (state.sortBy === action.payload) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortBy = action.payload;
        state.sortDir = "asc";
      }
    },
  },
});

export const { setStatusFilter, setPriorityFilter, setSortBy } =
  filterSlice.actions;

export default filterSlice.reducer;