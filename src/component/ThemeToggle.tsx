"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const previousTheme = localStorage.getItem("theme") || "light";
      const rootClass = document.documentElement.classList;
      rootClass.add(previousTheme);
      setTheme(previousTheme as "light" | "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const rootClass = document.documentElement.classList;
    rootClass.remove(theme);
    rootClass.add(newTheme);
    localStorage.setItem("theme", newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-md font-semibold px-4 py-2 border-2  border-gray-600 rounded-md bg-gray-800  dark:bg-gray-600 text-gray-600 dark:text-white"
    >
      {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
