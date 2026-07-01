"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Link2, BookOpen, ArrowRight } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";

const FEATURES = [
  {
    icon: Calculator,
    title: "CGPA Calculator",
    desc: "Calculate semester GPA & cumulative CGPA with UIU's official grade scale.",
    href: "/calculator",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: DollarSign,
    title: "Tuition Fee Planner",
    desc: "Estimate costs with waivers, discounts, and installment schedules.",
    href: "/tuition",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Link2,
    title: "Student Links",
    desc: "One-click access to ELMS, UCAM, exam portal & library.",
    href: "/links",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: BookOpen,
    title: "User Guide",
    desc: "Learn how to use every feature with step-by-step instructions.",
    href: "/guide",
    color: "from-purple-500 to-pink-500",
  },
];

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col"
    >
      <HeroBanner />

      <section className="max-w-5xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map((feature) => (
          <Link key={feature.href} href={feature.href}>
            <div className="group relative p-5 rounded-2xl border border-border bg-surface hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-200 cursor-pointer h-full flex flex-col">
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-md mb-3`}>
                <feature.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-foreground text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted leading-relaxed flex-1">{feature.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-orange-600 dark:text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Open <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </Link>
        ))}
      </section>
    </motion.main>
  );
}
