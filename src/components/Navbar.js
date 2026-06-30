"use client";

import { Button } from "@heroui/react";
import { GraduationCap, Info, Sun, Moon } from "lucide-react";

const TABS = [
  { key: "calculator", label: "CGPA Calculator", short: "GPA" },
  { key: "tuition", label: "Tuition Fee Calculator", short: "Tuition" },
  { key: "links", label: "Links for Students", short: "Links" },
  { key: "guide", label: "User Guide & About", short: "Guide" },
];

export default function Navbar({ activeTab, onTabChange, theme, onThemeToggle, onScaleOpen }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/25 dark:shadow-orange-500/10">
            <GraduationCap className="h-6 w-6 text-black stroke-[2.5]" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 dark:from-orange-400 dark:via-amber-300 dark:to-white bg-clip-text text-transparent">
              UIU
            </span>
            <span className="text-xs block text-zinc-500 dark:text-zinc-400 font-medium tracking-wide uppercase">
              CGPA & Tuition Planner
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-white dark:bg-zinc-800 text-orange-600 dark:text-white shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            isIconOnly
            size="md"
            variant="flat"
            aria-label="Toggle Theme"
            className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onClick={onThemeToggle}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-amber-400 animate-pulse" />
            ) : (
              <Moon className="h-5 w-5 text-zinc-500" />
            )}
          </Button>

          <Button
            size="sm"
            variant="flat"
            className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/20 font-semibold"
            startContent={<Info className="h-4 w-4" />}
            onPress={onScaleOpen}
          >
            Scale
          </Button>
        </div>
      </div>

      <div className="flex md:hidden mt-3 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 w-[calc(100%-2rem)] mx-auto overflow-x-auto gap-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex-1 min-w-[70px] py-2 text-center rounded-lg text-[10px] font-bold uppercase transition-all ${
              activeTab === tab.key
                ? "bg-white dark:bg-zinc-800 text-orange-600 dark:text-white shadow-sm"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            {tab.short}
          </button>
        ))}
      </div>
    </header>
  );
}
