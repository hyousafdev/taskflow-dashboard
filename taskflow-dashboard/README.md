# TaskFlow

A clean and fast task management app built with **React**, **Redux Toolkit** and **Tailwind CSS**. Add tasks, set priorities, filter and sort them, and switch between dark and light mode.

![TaskFlow Screenshot](./screenshot.png)

## Features

- **Add tasks** with a title and priority (High / Medium / Low)
- **Complete / uncomplete** tasks with a checkbox
- **Edit tasks inline** (Enter to save, Esc to cancel)
- **Delete tasks** (edit and delete buttons appear on hover)
- **Filter by status**: All / Active / Completed
- **Filter by priority**: All / High / Medium / Low
- **Sort by** Date, Title (A to Z) or Priority. Click the same button again to reverse the order
- **Live stats**: Total, Active, Done and Urgent (high priority and not completed)
- **Dark / light mode** toggle
- Responsive layout

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI library |
| Vite | Dev server and build tool |
| Redux Toolkit | Global state management |
| React Redux | Connects React to the store |
| Tailwind CSS 3 | Styling and dark mode |
| clsx + tailwind-merge | Conditional and conflict-free class names |

## Getting Started

### Prerequisites

- Node.js 18 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/hyousafdev/taskflow-dashboard.git

# Go to the project folder
cd taskflow-dashboard

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Other commands

```bash
npm run build     # Create a production build
npm run preview   # Preview the production build locally
```

## Project Structure

```
src/
├── App.jsx                  # Root component, syncs dark mode to <html>
├── main.jsx                 # Entry point, wraps app in Redux Provider
├── index.css                # Tailwind directives
├── lib/
│   └── utils.js             # cn() class merge helper
├── constants/
│   └── priority.js          # Priority order, colors and icons
├── store/
│   ├── store.js             # Redux store configuration
│   ├── tasksSlice.js        # Tasks state and reducers
│   ├── filterSlice.js       # Filter and sort state
│   └── uiSlice.js           # Dark mode state
├── hooks/
│   ├── useAppStore.js       # useAppDispatch and useAppSelector
│   ├── useTaskStats.js      # Derived counts for the stats bar
│   └── useFilteredTasks.js  # Filter and sort logic
└── components/
    ├── ui/                  # Button, Input, Select, Badge, Icons
    ├── layout/              # Header, StatsBar
    └── tasks/               # AddTaskForm, FilterBar, TaskList, TaskItem
```

## How It Works

The app uses three Redux slices:

- **tasks**: the list of tasks (add, toggle, edit, delete)
- **filter**: selected status, priority and sort settings
- **ui**: dark mode flag

Components read data with `useAppSelector` and update it with `dispatch`. Derived data (stats, filtered and sorted list) is computed in custom hooks with `useMemo`, so it is never stored twice and always stays in sync.

```
User action -> dispatch(action) -> reducer updates store -> subscribed components re-render
```

## Notes

- Tasks are stored in memory only, so they reset on page refresh.

## Roadmap

- [ ] Persist tasks in `localStorage`
- [ ] "Clear completed" button
- [ ] Due dates
- [ ] Drag and drop reordering