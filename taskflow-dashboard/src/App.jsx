import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppStore";
import { Header } from "@/components/layout/Header";

export default function App() {
  const dark = useAppSelector((s) => s.ui.dark);

  // dark badalte hi <html> par "dark" class add/remove karo
  // Tailwind ke saare dark: classes isi class par depend karte hain
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    // Light: bg-zinc-100  |  Dark: bg-zinc-900
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Header />

        {/* Aage ke steps ke components yahan aayenge */}
      </div>
    </div>
  );
}