const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // action.payload = { title: "...", priority: "high" }
    addTask: (state, action) => {
      // unshift = array ke SHURU mein add (nai task upar dikhegi)
      state.tasks.unshift({
        id: state.nextId++,        // current id lo, phir nextId +1
        title: action.payload.title,
        priority: action.payload.priority,
        completed: false,          // nai task hamesha incomplete
        createdAt: Date.now(),     // abhi ka timestamp
      });
    },
  },
});

// Action creator export: components isse dispatch karenge
export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;