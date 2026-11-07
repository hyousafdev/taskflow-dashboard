import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dark: true, // app dark mode mein khulegi
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // true → false, false → true
    toggleDark: (state) => {
      state.dark = !state.dark;
    },
  },
});

export const { toggleDark } = uiSlice.actions;
export default uiSlice.reducer;