"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <div>
      <label className="flex items-center gap-2 text-primary-dark-gray dark:text-background-light-gray cursor-pointer">
        <Sun className="size-[18px]" />
        <input
          onChange={(e) => {
            setTheme(resolvedTheme === "light" ? "dark" : "light")
          }}
          type="checkbox"
          className="peer sr-only"
        ></input>
        <div className="dark:after:border-backgroundbg-background-light-gray peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-background-light-gray after:transition-all after:content-[''] dark:bg-highlight-dark dark:after:translate-x-full peer-focus:outline-none"></div>

        <Moon className="size-[18px]" />
      </label>
    </div>
  );
};
