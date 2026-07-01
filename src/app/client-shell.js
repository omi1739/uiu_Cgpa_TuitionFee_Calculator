"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GradeScaleModal from "@/components/GradeScaleModal";

export default function ClientShell({ children }) {
  const [theme, setTheme] = useState("light");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    document.querySelectorAll("input, select").forEach((el) =>
      el.setAttribute("autocomplete", "off")
    );
  });

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  return (
    <>
      <Navbar
        theme={theme}
        onThemeToggle={toggleTheme}
        onScaleOpen={() => setIsModalOpen(true)}
      />
      <main className="flex-1 flex flex-col pt-6 pb-12">
        {children}
      </main>
      <Footer onScaleOpen={() => setIsModalOpen(true)} />
      <GradeScaleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
