import { Chip } from "@heroui/react";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden py-10 px-6 text-center max-w-4xl mx-auto">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      <Chip
        variant="dot"
        color="warning"
        className="border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400 mb-4 px-3"
      >
        United International University Student Dashboard
      </Chip>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
        Calculate Your GPA &{" "}
        <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 dark:from-orange-400 dark:via-orange-500 dark:to-amber-300 bg-clip-text text-transparent">
          Academic Costs
        </span>
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
        Calculate course GPAs, dynamic tuition discounts, and overall graduation costs based on UIU&apos;s official
        scholarship schemes and per-credit fees.
      </p>
    </section>
  );
}
