"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
      className="fixed right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/60 text-lg shadow-[0_6px_20px_-10px_rgba(160,70,90,0.5)] backdrop-blur-md transition hover:bg-white/80 dark:border-white/10 dark:bg-white/[0.08] dark:hover:bg-white/15"
    >
      {dark === null ? "　" : dark ? "☀️" : "🌙"}
    </button>
  );
}
