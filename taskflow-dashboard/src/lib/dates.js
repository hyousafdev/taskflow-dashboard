// 1 digit ko 2 digit banao: 5 -> "05"
const pad = (n) => String(n).padStart(2, "0");

// Aaj ki date, user ke LOCAL time ke hisaab se: "2026-11-10"
export function todayString() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// "2026-11-12" -> "Nov 12"
export function formatDueDate(dueDate) {
  const [y, m, d] = dueDate.split("-").map(Number);
  // new Date(y, m-1, d): month 0 se shuru hota hai, isliye m-1
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// "overdue" | "today" | "upcoming"
export function getDueStatus(dueDate) {
  const today = todayString();
  // YYYY-MM-DD format mein string compare bilkul sahi chalta hai
  if (dueDate < today) return "overdue";
  if (dueDate === today) return "today";
  return "upcoming";
}