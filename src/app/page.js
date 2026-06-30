"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import Footer from "@/components/Footer";
import GradeScaleModal from "@/components/GradeScaleModal";
import CGPACalculator from "@/components/CGPACalculator";
import TuitionCalculator from "@/components/TuitionCalculator";
import LinksView from "@/components/LinksView";
import GuideView from "@/components/GuideView";

export default function Home() {
  const [activeTab, setActiveTab] = useState("calculator");
  const [theme, setTheme] = useState("dark");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [theme]);

  useEffect(() => {
    document.querySelectorAll("input, select").forEach((el) => el.setAttribute("autocomplete", "off"));
  });

  useEffect(() => {
    const handleBeforeUnload = () => { };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 pb-20 selection:bg-orange-500 selection:text-white">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        theme={theme}
        onThemeToggle={toggleTheme}
        onScaleOpen={() => setIsModalOpen(true)}
      />

      <HeroBanner />

      <AnimatePresence mode="wait">
        {activeTab === "calculator" && <CGPACalculator key="calculator" />}
        {activeTab === "tuition" && <TuitionCalculator key="tuition" />}
        {activeTab === "links" && <LinksView key="links" />}
        {activeTab === "guide" && <GuideView key="guide" />}
      </AnimatePresence>

      <Footer onScaleOpen={() => setIsModalOpen(true)} />
      <GradeScaleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
