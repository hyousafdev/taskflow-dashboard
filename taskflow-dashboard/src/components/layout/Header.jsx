import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icons";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { toggleDark } from "@/store/uiSlice";

export function Header() {
  const dispatch = useAppDispatch();

  // Store se padho: abhi dark mode on hai ya off?
  const dark = useAppSelector((s) => s.ui.dark);

  return (
    <div className="flex items-center justify-between mb-8">
      {/* LEFT: Title + subtitle */}
      <div>
        <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
          Task<span className="text-indigo-500">Flow</span>
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          Stay organized. Get things done.
        </p>
      </div>

      {/* RIGHT: Toggle button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => dispatch(toggleDark())}
        className="rounded-xl"
        aria-label="Toggle dark mode"
      >
        {/* dark ON → Sun dikhao, dark OFF → Moon dikhao */}
        {dark ? <Icons.Sun /> : <Icons.Moon />}
      </Button>
    </div>
  );
}