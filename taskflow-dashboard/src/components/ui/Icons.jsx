const base = "w-4 h-4";

export const Icons = {
  // ☀ Dark mode ON ho to ye dikhega (light mode par jaane ke liye)
  Sun: () => (
    <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="5" strokeWidth={2} />
      <path
        strokeLinecap="round"
        strokeWidth={2}
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      />
    </svg>
  ),

  // 🌙 Light mode ON ho to ye dikhega (dark mode par jaane ke liye)
  Moon: () => (
    <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      />
    </svg>
  ),

    // + Add button ke liye
  Plus: () => (
    <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  ),

    // ↕ "Sort by:" ke saath
  Sort: () => (
    <svg className={base} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
      />
    </svg>
  ),
};