const STORAGE_KEY = "taskflow-state-v1";

// Valid values ki list: localStorage ka data kharab ho to app crash na ho
const VALID_STATUS = ["all", "active", "completed"];
const VALID_PRIORITY = ["all", "high", "medium", "low"];
const VALID_SORT_BY = ["createdAt", "dueDate", "title", "priority", "manual"];
const VALID_SORT_DIR = ["asc", "desc"];

function isValidFilter(f) {
  return (
    f &&
    VALID_STATUS.includes(f.status) &&
    VALID_PRIORITY.includes(f.priority) &&
    VALID_SORT_BY.includes(f.sortBy) &&
    VALID_SORT_DIR.includes(f.sortDir)
  );
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed?.tasks?.tasks)) return undefined;
    if (typeof parsed.tasks.nextId !== "number") return undefined;

    // NEW: filter kharab ya purane save mein nahi hai to sirf use hata do
    // (store apni default filter state khud use karega, tasks safe rahenge)
    if (!isValidFilter(parsed.filter)) delete parsed.filter;

    return parsed;
  } catch {
    return undefined;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full ya private mode: ignore
  }
}