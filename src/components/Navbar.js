"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import { Info, Sun, Moon } from "lucide-react";

const TABS = [
  { key: "calculator", label: "CGPA Calculator", short: "GPA", path: "/calculator" },
  { key: "tuition", label: "Tuition Fee Calculator", short: "Tuition", path: "/tuition" },
  { key: "links", label: "Links for Students", short: "Links", path: "/links" },
  { key: "guide", label: "User Guide & About", short: "Guide", path: "/guide" },
];

export default function Navbar({ theme, onThemeToggle, onScaleOpen }) {
  const pathname = usePathname();
  const activeTab = pathname === "/" ? "home" : pathname.slice(1) || "home";

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-zinc-950/70 border-b border-zinc-200 dark:border-zinc-800 px-6 py-3 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <img
            src="/logo.svg"
            alt="UIU CGPA Calculator"
            width="40"
            height="40"
            className="rounded-xl shadow-lg shadow-orange-500/25 dark:shadow-orange-500/10 group-hover:shadow-orange-500/40 transition-shadow"
          />
          <div className="hidden sm:block">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 dark:from-orange-400 dark:via-amber-300 dark:to-white bg-clip-text text-transparent">
              UIU
            </span>
            <span className="text-[10px] block text-zinc-500 dark:text-zinc-400 font-medium tracking-wide uppercase leading-tight">
              CGPA & Tuition Planner
            </span>
          </div>
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
          {TABS.map((tab) => (
            <Link
              key={tab.key}
              href={tab.path}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-white dark:bg-zinc-800 text-orange-600 dark:text-white shadow-sm"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
              aria-current={activeTab === tab.key ? "page" : undefined}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            onPress={onThemeToggle}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-zinc-500" />
            )}
          </Button>

          <Button
            size="sm"
            variant="flat"
            aria-label="View UIU grading scale"
            className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/20 font-semibold"
            startContent={<Info className="h-3.5 w-3.5" />}
            onPress={onScaleOpen}
          >
            Scale
          </Button>
        </div>
      </div>

      <nav aria-label="Main navigation" className="flex md:hidden mt-2 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-x-auto gap-1">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={tab.path}
            className={`flex-1 min-w-[70px] py-2 text-center rounded-lg text-[10px] font-bold uppercase transition-all ${
              activeTab === tab.key
                ? "bg-white dark:bg-zinc-800 text-orange-600 dark:text-white shadow-sm"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
            aria-current={activeTab === tab.key ? "page" : undefined}
          >
            {tab.short}
          </Link>
        ))}
      </nav>
    </header>
  );
}
