// localStorage mein ye naam (key) se save hoga
// "v1" isliye: kal data ka shape badle to "v2" kar do, purana data ignore ho jayega
const STORAGE_KEY = "taskflow-state-v1";

// App shuru hone par chalta hai: saved data wapas do
export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined; // pehli baar: kuch saved nahi

    const parsed = JSON.parse(raw); // text -> object

    // Safety check: data kharab ya purane shape ka ho to use mat karo
    // Warna app crash ho sakti hai
    if (!Array.isArray(parsed?.tasks?.tasks)) return undefined;
    if (typeof parsed.tasks.nextId !== "number") return undefined;

    return parsed;
  } catch {
    // JSON toota hua ho, ya browser ne localStorage block kiya ho
    return undefined; // undefined = store apni initialState use karega
  }
}

// Store badalne par chalta hai: state save karo
export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); // object -> text
  } catch {
    // Storage full ya private mode: chup chap ignore, app chalti rahe
  }
}