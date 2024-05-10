"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export const ThemeSwitch = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  return (
    <div>
      <label className="flex items-center gap-2 text-primary-dark-gray dark:text-background-light-gray cursor-pointer">
        <Sun className="size-[18px]" />
        <input
          onChange={(e) => {
            setTheme(e.target.checked ? "dark" : "light")
          }}
          checked={resolvedTheme === "dark"}
          type="checkbox"
          className="peer sr-only"
        ></input>
        <div className="peer-checked:after:border-backgroundbg-background-light-gray peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-background-light-gray after:transition-all after:content-[''] peer-checked:bg-highlight-dark peer-checked:after:translate-x-full peer-focus:outline-none"></div>

        <Moon className="size-[18px]" />
      </label>
    </div>
  );
};
