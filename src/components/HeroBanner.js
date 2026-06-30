"use client";

import { useState, useEffect } from "react";

export default function HeroBanner() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <section className="relative overflow-hidden py-10 px-6 text-center max-w-4xl mx-auto">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono mb-3 tracking-wide">
        {formattedDate} &mdash; {formattedTime}
      </p>
      <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-semibold mb-4">
        United International University Student Dashboard
      </p>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
        UIU CGPA Calculator &amp;{" "}
        <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 dark:from-orange-400 dark:via-orange-500 dark:to-amber-300 bg-clip-text text-transparent">
          Tuition Fee Planner
        </span>
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">
        Calculate your semester GPA, cumulative CGPA, and tuition fees with UIU&apos;s official grading scale,
        scholarship waivers, and fee breakdowns. A complete academic planner for United International University students.
      </p>
    </section>
  );
}
