"use client";

import React, { useState, useEffect } from "react";
import { 
  Button, 
  Card, 
  Chip,
  Separator
} from "@heroui/react";
import { 
  Plus, 
  Trash2, 
  Calculator, 
  RefreshCw, 
  GraduationCap, 
  Info, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  PlusCircle, 
  Lightbulb,
  X,
  Link as LinkIcon,
  Sun,
  Moon,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// UIU Grade to GPA scale mapping with Marks ranges
const GRADE_SCALE = [
  { grade: "A", gpa: 4.00, marks: "90-100", desc: "Outstanding" },
  { grade: "A-", gpa: 3.67, marks: "86-89", desc: "Excellent" },
  { grade: "B+", gpa: 3.33, marks: "82-85", desc: "Very Good" },
  { grade: "B", gpa: 3.00, marks: "78-81", desc: "Good" },
  { grade: "B-", gpa: 2.67, marks: "74-77", desc: "Satisfactory" },
  { grade: "C+", gpa: 2.33, marks: "70-73", desc: "Above Average" },
  { grade: "C", gpa: 2.00, marks: "66-69", desc: "Average" },
  { grade: "C-", gpa: 1.67, marks: "62-65", desc: "Below Average" },
  { grade: "D+", gpa: 1.33, marks: "58-61", desc: "Poor" },
  { grade: "D", gpa: 1.00, marks: "57", desc: "Very Poor" },
  { grade: "F", gpa: 0.00, marks: "Less than 57", desc: "Failed" },
];

const CREDIT_OPTIONS = [
  { label: "1.0 Credit (Lab)", value: "1.0" },
  { label: "1.5 Credits (Lab/Sessional)", value: "1.5" },
  { label: "2.0 Credits (Thesis/Project)", value: "2.0" },
  { label: "3.0 Credits (Standard Theory)", value: "3.0" },
  { label: "4.0 Credits (Sessional/Special)", value: "4.0" },
];

const IMPORTANT_LINKS = [
  { name: "UIU ELMS", url: "https://elms.uiu.ac.bd/login/index.php", desc: "Access class slides, uploaded assignments, and online learning modules.", category: "Academic" },
  { name: "UIU UCAM", url: "https://ucam.uiu.ac.bd/Security/LogIn.aspx", desc: "Official student portal for registration, grades, billing, and transcripts.", category: "Administrative" },
  { name: "Exam Routine Portal", url: "https://examcon.uiu.ac.bd/", desc: "Access official examination routines, mid & final schedules, and announcements.", category: "Updates" },
  { name: "UIU Library", url: "https://library.uiu.ac.bd/", desc: "Access online catalogues, digital books, theses, and research papers.", category: "Academic" },
  { name: "UIU Student Portal", url: "https://www.uiu.ac.bd/", desc: "Official university homepage featuring current news, announcements, and events.", category: "Administrative" },
];

export default function CGPACalculator() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState("calculator"); // 'calculator', 'links', 'guide'

  // Dark/Light Theme state
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Sync with HTML class
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Semester GPA State
  const [courses, setCourses] = useState([
    { id: 1, name: "Course 1", credits: "3.0", grade: "A" },
    { id: 2, name: "Course 2", credits: "3.0", grade: "A-" },
    { id: 3, name: "Course 3", credits: "3.0", grade: "B+" },
    { id: 4, name: "Course 4", credits: "1.0", grade: "A" },
  ]);

  // Cumulative GPA State
  const [prevCGPA, setPrevCGPA] = useState("");
  const [prevCredits, setPrevCredits] = useState("");
  
  // Results
  const [semesterGPA, setSemesterGPA] = useState(null);
  const [cumulativeCGPA, setCumulativeCGPA] = useState(null);
  const [totalCredits, setTotalCredits] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

  // Target Planner State
  const [targetCGPA, setTargetCGPA] = useState("3.5");
  const [remainingCredits, setRemainingCredits] = useState("30");
  const [targetAdvice, setTargetAdvice] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle course inputs changes
  const updateCourse = (id, field, value) => {
    setCourses(prev =>
      prev.map(course => (course.id === id ? { ...course, [field]: value } : course))
    );
    setIsCalculated(false);
  };

  // Add new course row
  const addCourse = () => {
    const nextId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    setCourses(prev => [
      ...prev,
      { id: nextId, name: `Course ${nextId}`, credits: "3.0", grade: "A" }
    ]);
    setIsCalculated(false);
  };

  // Delete course row
  const deleteCourse = (id) => {
    if (courses.length > 1) {
      setCourses(prev => prev.filter(c => c.id !== id));
      setIsCalculated(false);
    }
  };

  // Clear all course inputs
  const clearAll = () => {
    setCourses([
      { id: 1, name: "Course 1", credits: "3.0", grade: "A" }
    ]);
    setPrevCGPA("");
    setPrevCredits("");
    setSemesterGPA(null);
    setCumulativeCGPA(null);
    setTotalCredits(0);
    setIsCalculated(false);
    setTargetAdvice("");
  };

  // Calculate GPA & CGPA
  const calculateCGPA = () => {
    let totalGradePoints = 0;
    let totalSemCredits = 0;

    courses.forEach(course => {
      const creditVal = parseFloat(course.credits) || 0;
      const gradeObj = GRADE_SCALE.find(g => g.grade === course.grade);
      const gradePoint = gradeObj ? gradeObj.gpa : 0;
      
      totalGradePoints += (gradePoint * creditVal);
      totalSemCredits += creditVal;
    });

    if (totalSemCredits === 0) {
      setSemesterGPA(0);
      setTotalCredits(0);
      setIsCalculated(true);
      return;
    }

    const semGPA = totalGradePoints / totalSemCredits;
    setSemesterGPA(semGPA);
    setTotalCredits(totalSemCredits);

    // Calculate Cumulative if previous records exist
    const parsedPrevCGPA = parseFloat(prevCGPA);
    const parsedPrevCredits = parseFloat(prevCredits);

    if (!isNaN(parsedPrevCGPA) && !isNaN(parsedPrevCredits) && parsedPrevCredits > 0) {
      const overallGradePoints = (parsedPrevCGPA * parsedPrevCredits) + totalGradePoints;
      const overallCredits = parsedPrevCredits + totalSemCredits;
      setCumulativeCGPA(overallGradePoints / overallCredits);
    } else {
      setCumulativeCGPA(null);
    }

    setIsCalculated(true);
  };

  // Calculate target CGPA advice
  useEffect(() => {
    if (isCalculated && semesterGPA !== null) {
      const targetVal = parseFloat(targetCGPA);
      const remCreditsVal = parseFloat(remainingCredits);
      
      // Calculate current cumulative parameters
      const currentSemCredits = totalCredits;
      const currentSemGP = semesterGPA * currentSemCredits;
      
      const parsedPrevCGPA = parseFloat(prevCGPA) || 0;
      const parsedPrevCredits = parseFloat(prevCredits) || 0;
      
      const currentTotalGP = (parsedPrevCGPA * parsedPrevCredits) + currentSemGP;
      const currentTotalCredits = parsedPrevCredits + currentSemCredits;
      
      if (!isNaN(targetVal) && !isNaN(remCreditsVal) && remCreditsVal > 0) {
        const totalFutureCredits = currentTotalCredits + remCreditsVal;
        const requiredTotalGP = targetVal * totalFutureCredits;
        const neededGPForFuture = requiredTotalGP - currentTotalGP;
        const neededGPA = neededGPForFuture / remCreditsVal;
        
        if (neededGPA <= 0) {
          setTargetAdvice("You have already secured your target CGPA! Just maintain a passing grade.");
        } else if (neededGPA > 4.0) {
          setTargetAdvice(`Mathematically impossible. You would need a GPA of ${neededGPA.toFixed(2)} in the remaining credits to reach a CGPA of ${targetVal.toFixed(2)}.`);
        } else {
          setTargetAdvice(`To achieve a ${targetVal.toFixed(2)} CGPA, you must average a GPA of ${neededGPA.toFixed(2)} in your remaining ${remCreditsVal} credits.`);
        }
      } else {
        setTargetAdvice("");
      }
    }
  }, [targetCGPA, remainingCredits, isCalculated, semesterGPA, prevCGPA, prevCredits, totalCredits]);

  // Color dynamic ranges for GPA output
  const getGPABadgeColor = (gpa) => {
    if (gpa >= 3.67) return "success";
    if (gpa >= 3.0) return "primary";
    if (gpa >= 2.2) return "warning";
    return "danger";
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 pb-20 selection:bg-orange-500 selection:text-white">
      
      {/* Premium UIU Inspired Navigation Bar */}
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
                CGPA Calculator
              </span>
            </div>
          </div>

          {/* Navigation Tabs (Calculator vs Links vs Guide) */}
          <div className="hidden md:flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setActiveTab("calculator")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "calculator"
                  ? "bg-white dark:bg-zinc-800 text-orange-600 dark:text-white shadow-sm"
                  : "text-zinc-500 dark:text-zinc-450 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Calculator
            </button>
            <button
              onClick={() => setActiveTab("links")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "links"
                  ? "bg-white dark:bg-zinc-800 text-orange-600 dark:text-white shadow-sm"
                  : "text-zinc-500 dark:text-zinc-450 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Links for Students
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "guide"
                  ? "bg-white dark:bg-zinc-800 text-orange-600 dark:text-white shadow-sm"
                  : "text-zinc-500 dark:text-zinc-450 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              User Guide & About
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button (Comfortably & Visually Placed) */}
            <Button
              isIconOnly
              size="md"
              variant="flat"
              aria-label="Toggle Theme"
              className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-200 dark:hover:bg-zinc-800"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-amber-400 animate-pulse" />
              ) : (
                <Moon className="h-5 w-5 text-zinc-650" />
              )}
            </Button>

            <Button 
              size="sm" 
              variant="flat" 
              className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/20 font-semibold"
              startContent={<Info className="h-4 w-4" />}
              onPress={() => setIsModalOpen(true)}
            >
              Scale
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden mt-3 bg-zinc-150 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 w-[calc(100%-2rem)] mx-auto">
          <button
            onClick={() => setActiveTab("calculator")}
            className={`flex-1 py-2 text-center rounded-lg text-xs font-semibold transition-all ${
              activeTab === "calculator"
                ? "bg-white dark:bg-zinc-800 text-orange-600 dark:text-white shadow-sm"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            Calculator
          </button>
          <button
            onClick={() => setActiveTab("links")}
            className={`flex-1 py-2 text-center rounded-lg text-xs font-semibold transition-all ${
              activeTab === "links"
                ? "bg-white dark:bg-zinc-800 text-orange-600 dark:text-white shadow-sm"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            Student Links
          </button>
          <button
            onClick={() => setActiveTab("guide")}
            className={`flex-1 py-2 text-center rounded-lg text-xs font-semibold transition-all ${
              activeTab === "guide"
                ? "bg-white dark:bg-zinc-800 text-orange-600 dark:text-white shadow-sm"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            Guide
          </button>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden py-10 px-6 text-center max-w-4xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
        <Chip 
          variant="dot" 
          color="warning" 
          className="border-orange-500/20 bg-orange-500/10 text-orange-600 dark:text-orange-400 mb-4 px-3"
        >
          United International University Academic Standard
        </Chip>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
          Calculate Your GPA & <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 dark:from-orange-400 dark:via-orange-550 dark:to-amber-300 bg-clip-text text-transparent">CGPA Instantly</span>
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-450 text-sm md:text-base max-w-xl mx-auto">
          A dedicated GPA & CGPA computation dashboard built specifically for UIU students. Add your courses, enter grades, plan future semesters, and track your academic success.
        </p>
      </section>

      {/* Main Grid Content */}
      <AnimatePresence mode="wait">
        {activeTab === "calculator" && (
          <motion.main
            key="calculator-dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            
            {/* Left Panel: Course Entry Sheet (8 columns) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <Card className="border border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl shadow-sm">
                <Card.Header className="flex justify-between items-center px-6 pt-6 pb-2">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-orange-500" />
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Current Semester Courses</h2>
                  </div>
                  <Button
                    size="sm"
                    variant="flat"
                    className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50 text-zinc-650 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                    startContent={<RefreshCw className="h-3.5 w-3.5" />}
                    onClick={clearAll}
                  >
                    Reset All
                  </Button>
                </Card.Header>
                <Separator className="my-2 bg-zinc-200 dark:bg-zinc-850" />
                <Card.Content className="px-6 py-4 flex flex-col gap-4">
                  
                  {/* Dynamic Rows */}
                  <div className="flex flex-col gap-3">
                    <AnimatePresence initial={false}>
                      {courses.map((course, idx) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/50 hover:border-orange-500/20 dark:hover:border-zinc-700/50 transition-all shadow-sm dark:shadow-none"
                        >
                          {/* Course Identifier / Name */}
                          <div className="sm:col-span-4 flex flex-col gap-1">
                            <label className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold tracking-wider uppercase ml-1">Course Title</label>
                            <input
                              type="text"
                              value={course.name}
                              onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-orange-500 rounded-lg text-sm text-zinc-900 dark:text-white focus:outline-none transition-all"
                              placeholder="e.g. SPL"
                            />
                          </div>

                          {/* Credits Select (Supports up to 4.0 credits) */}
                          <div className="sm:col-span-4 flex flex-col gap-1">
                            <label className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold tracking-wider uppercase ml-1">Credits</label>
                            <select
                              value={course.credits}
                              onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-orange-500 rounded-lg text-sm text-zinc-900 dark:text-white focus:outline-none transition-all cursor-pointer"
                            >
                              {CREDIT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value} className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Grade Selector */}
                          <div className="sm:col-span-3 flex flex-col gap-1">
                            <label className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold tracking-wider uppercase ml-1">Grade</label>
                            <select
                              value={course.grade}
                              onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                              className="w-full px-3 py-2 bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-orange-500 rounded-lg text-sm text-zinc-900 dark:text-white focus:outline-none transition-all cursor-pointer"
                            >
                              {GRADE_SCALE.map((scale) => (
                                <option key={scale.grade} value={scale.grade} className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
                                  {scale.grade} ({scale.gpa.toFixed(2)})
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Delete Action */}
                          <div className="sm:col-span-1 flex justify-center pt-5 sm:pt-0">
                            <button
                              type="button"
                              disabled={courses.length <= 1}
                              onClick={() => deleteCourse(course.id)}
                              className="p-2 text-zinc-400 dark:text-zinc-500 hover:text-red-500 hover:bg-zinc-200 dark:hover:bg-zinc-800/40 rounded-lg disabled:opacity-30 transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Add Course trigger */}
                  <div className="mt-2 flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="dashed"
                      className="flex-1 border-2 border-dashed border-zinc-300 dark:border-zinc-800 hover:border-orange-500/50 hover:bg-orange-500/5 text-zinc-500 dark:text-zinc-400 hover:text-orange-500 py-6 transition-all duration-205"
                      startContent={<PlusCircle className="h-5 w-5" />}
                      onClick={addCourse}
                    >
                      Add Another Course
                    </Button>
                  </div>

                </Card.Content>
              </Card>

              {/* Cumulative CGPA Add-on Card */}
              <Card className="border border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl shadow-sm">
                <Card.Header className="px-6 pt-6 pb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white">Include Previous CGPA (Optional)</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Combine your current semester results with your cumulative academic history.</p>
                    </div>
                  </div>
                </Card.Header>
                <Separator className="my-2 bg-zinc-200 dark:bg-zinc-850" />
                <Card.Content className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Previous Cumulative CGPA</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      placeholder="e.g. 3.45"
                      value={prevCGPA}
                      onChange={(e) => {
                        setPrevCGPA(e.target.value);
                        setIsCalculated(false);
                      }}
                      className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-orange-500 rounded-lg text-sm text-zinc-900 dark:text-white focus:outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Previous Earned Credits</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      placeholder="e.g. 64"
                      value={prevCredits}
                      onChange={(e) => {
                        setPrevCredits(e.target.value);
                        setIsCalculated(false);
                      }}
                      className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-orange-500 rounded-lg text-sm text-zinc-900 dark:text-white focus:outline-none transition-all"
                    />
                  </div>
                </Card.Content>
              </Card>
            </div>

            {/* Right Panel: Results & Tools (4 columns) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Action Trigger Card */}
              <Card className="border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-gradient-to-b from-zinc-900 to-zinc-950 p-2 shadow-sm">
                <Card.Content className="flex flex-col gap-4 p-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-base shadow-lg shadow-orange-500/15 py-7 hover:scale-[1.01] active:scale-[0.99] transition-transform duration-105 animate-pulse hover:animate-none border border-orange-400/25"
                    startContent={<Calculator className="h-5 w-5 text-black stroke-[2.5]" />}
                    onClick={calculateCGPA}
                  >
                    Calculate CGPA
                  </Button>
                </Card.Content>
              </Card>

              {/* Results Analytics Panel */}
              <AnimatePresence mode="wait">
                {isCalculated ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Card className="border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900/60 backdrop-blur-xl relative overflow-hidden shadow-sm">
                      {/* Absolute subtle background glow */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
                      
                      <Card.Header className="px-6 pt-6">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
                          <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Your Results</h3>
                        </div>
                      </Card.Header>
                      <Separator className="my-2 bg-zinc-200 dark:bg-zinc-800" />
                      <Card.Content className="px-6 py-6 flex flex-col gap-6">
                        
                        {/* Circle/Gauge Semester GPA Display */}
                        <div className="flex flex-col items-center justify-center py-4 bg-zinc-50 dark:bg-zinc-950/50 rounded-2xl border border-zinc-200 dark:border-zinc-800/80">
                          <span className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">Semester GPA</span>
                          <span className="text-5xl font-black bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent my-1">
                            {semesterGPA !== null ? semesterGPA.toFixed(2) : "0.00"}
                          </span>
                          <Chip
                            size="sm"
                            color={getGPABadgeColor(semesterGPA)}
                            variant="flat"
                            className="font-bold mt-1 text-xs"
                          >
                            Grade {GRADE_SCALE.find(g => g.gpa <= (semesterGPA || 0))?.grade || "F"}
                          </Chip>
                        </div>

                        {/* Overall CGPA display if prev values supplied */}
                        {cumulativeCGPA !== null && (
                          <div className="flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-950/30 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                            <div>
                              <span className="text-zinc-500 dark:text-zinc-400 text-xs block font-semibold">Cumulative CGPA</span>
                              <span className="text-2xl font-black text-orange-500 dark:text-orange-400 mt-0.5 block">
                                {cumulativeCGPA.toFixed(2)}
                              </span>
                            </div>
                            <Chip size="sm" variant="dot" color="success" className="text-zinc-700 dark:text-zinc-300 border-zinc-250 dark:border-zinc-800">
                              Updated CGPA
                            </Chip>
                          </div>
                        )}

                        {/* Stats List */}
                        <div className="flex flex-col gap-3 text-sm border-t border-zinc-200 dark:border-zinc-850 pt-3">
                          <div className="flex justify-between">
                            <span className="text-zinc-550 dark:text-zinc-400">Semester Credits:</span>
                            <span className="font-bold text-zinc-800 dark:text-zinc-200">{totalCredits.toFixed(1)} Credits</span>
                          </div>
                          {prevCredits ? (
                            <div className="flex justify-between">
                              <span className="text-zinc-550 dark:text-zinc-400">Total Completed Credits:</span>
                              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                                {(parseFloat(prevCredits) + totalCredits).toFixed(1)} Credits
                              </span>
                            </div>
                          ) : null}
                        </div>

                      </Card.Content>
                    </Card>
                  </motion.div>
                ) : (
                  <Card className="border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-xl border-dashed shadow-sm">
                    <Card.Content className="p-8 text-center flex flex-col items-center justify-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-zinc-150 dark:bg-zinc-800/40 flex items-center justify-center text-zinc-500 dark:text-zinc-500 animate-bounce">
                        <Calculator className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-zinc-700 dark:text-zinc-300">Awaiting Calculation</h4>
                        <p className="text-xs text-zinc-500 mt-1 max-w-[200px] mx-auto">
                          Fill in your grades and click the button to see your GPA details.
                        </p>
                      </div>
                    </Card.Content>
                  </Card>
                )}
              </AnimatePresence>

              {/* Goal & Target Planner Tab */}
              <Card className="border border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl shadow-sm">
                <Card.Header className="px-6 pt-6 pb-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-500 animate-pulse" />
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white">Target CGPA Planner</h3>
                  </div>
                </Card.Header>
                <Separator className="my-2 bg-zinc-200 dark:bg-zinc-850" />
                <Card.Content className="px-6 py-4 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-zinc-550 dark:text-zinc-400 font-medium">Target CGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="4"
                        value={targetCGPA}
                        onChange={(e) => setTargetCGPA(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-orange-500 rounded-lg text-sm text-zinc-900 dark:text-white focus:outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-zinc-550 dark:text-zinc-400 font-medium">Remaining Credits</label>
                      <input
                        type="number"
                        step="1"
                        min="1"
                        value={remainingCredits}
                        onChange={(e) => setRemainingCredits(e.target.value)}
                        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-orange-500 rounded-lg text-sm text-zinc-900 dark:text-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {targetAdvice ? (
                    <div className="p-3.5 bg-zinc-100 dark:bg-zinc-950/60 rounded-xl border border-zinc-200 dark:border-zinc-800/60 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 flex gap-2">
                      <span className="text-orange-500">💡</span>
                      <p>{targetAdvice}</p>
                    </div>
                  ) : (
                    <p className="text-xs text-zinc-500 italic text-center py-2">
                      Enter target CGPA and remaining credits to see required grade trends.
                    </p>
                  )}
                </Card.Content>
              </Card>

            </div>

          </motion.main>
        )}

        {/* Links for Students (Dedicated View) */}
        {activeTab === "links" && (
          <motion.main
            key="links-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="max-w-4xl mx-auto px-6 flex flex-col gap-6"
          >
            <Card className="border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 backdrop-blur-xl shadow-sm">
              <Card.Header className="px-6 pt-6 pb-2">
                <div className="flex items-center gap-2.5">
                  <LinkIcon className="h-6 w-6 text-orange-500" />
                  <div>
                    <h2 className="text-xl font-black text-zinc-900 dark:text-white">Links for Students</h2>
                    <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-0.5">Quick references to critical university portals and resources.</p>
                  </div>
                </div>
              </Card.Header>
              <Separator className="my-2 bg-zinc-200 dark:bg-zinc-850" />
              <Card.Content className="px-6 py-6 flex flex-col gap-4">
                {IMPORTANT_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/20 hover:border-orange-500/50 dark:hover:border-orange-500/30 hover:bg-orange-500/5 dark:hover:bg-orange-500/5 transition-all duration-200"
                  >
                    <div className="flex flex-col gap-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base text-zinc-900 dark:text-white group-hover:text-orange-500 transition-colors">
                          {link.name}
                        </span>
                        <Chip size="sm" variant="flat" color="warning" className="text-[10px] h-5 px-1.5 font-bold uppercase">
                          {link.category}
                        </Chip>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-550 dark:text-zinc-400 leading-relaxed">
                        {link.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 mt-3 sm:mt-0 text-xs font-semibold text-orange-600 dark:text-orange-400 group-hover:underline">
                      Visit Portal
                      <ExternalLink className="h-3.5 w-3.5" />
                    </div>
                  </a>
                ))}
              </Card.Content>
            </Card>
          </motion.main>
        )}

        {/* User Guide & About Page */}
        {activeTab === "guide" && (
          <motion.main
            key="about-guide"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="max-w-4xl mx-auto px-6 flex flex-col gap-8"
          >
            {/* About Card */}
            <Card className="border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 backdrop-blur-xl shadow-sm">
              <Card.Header className="px-6 pt-6">
                <div className="flex items-center gap-2.5">
                  <BookOpen className="h-6 w-6 text-orange-500" />
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-white">About the Calculator</h2>
                </div>
              </Card.Header>
              <Separator className="my-2 bg-zinc-200 dark:bg-zinc-850" />
              <Card.Content className="px-6 py-6 flex flex-col gap-4 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm">
                <p>
                  The <strong>UIU CGPA Calculator</strong> is a premium academic planner built explicitly for students at <strong>United International University (UIU)</strong>. It helps students track their current semester Grade Point Average (GPA) and Cumulative Grade Point Average (CGPA) instantaneously according to UIU's official grading scheme.
                </p>
                <p>
                  The application is fully optimized for speed and works on any viewport (mobile or desktop). With built-in features like the Target CGPA Planner, UIU students can calculate their future grade requirements to meet scholarship requirements or graduation targets.
                </p>
                
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-4 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-orange-500" /> Calculation Formula
                </h3>
                <p>
                  Your GPA is calculated by taking the sum of the product of course credits and their corresponding grade points, divided by the total credits attempted:
                </p>
                <div className="bg-zinc-100 dark:bg-zinc-950/60 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-center text-xs sm:text-sm text-orange-600 dark:text-orange-400">
                  GPA = ∑ (Course Credits × Grade Points) / Total Attempted Credits
                </div>
                <p>
                  Cumulative CGPA is computed by taking the total cumulative grade points accumulated over all semesters, divided by the overall credits completed.
                </p>
              </Card.Content>
            </Card>

            {/* How to Use / Step-by-Step Guide */}
            <Card className="border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 backdrop-blur-xl shadow-sm">
              <Card.Header className="px-6 pt-6">
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="h-6 w-6 text-orange-500" />
                  <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Step-by-Step User Guide</h2>
                </div>
              </Card.Header>
              <Separator className="my-2 bg-zinc-200 dark:bg-zinc-850" />
              <Card.Content className="px-6 py-6 flex flex-col gap-6 text-zinc-700 dark:text-zinc-300 text-sm">
                
                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-base">Enter Current Semester Courses</h4>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-550 dark:text-zinc-400 font-medium">
                      Input your course name/code, select the credit value (usually 3.0 credits for theory, 1.0 or 1.5 credits for sessional/lab courses), and choose the letter grade you expect or have secured.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-base">Optional: Include Previous Academic History</h4>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-550 dark:text-zinc-400 font-medium">
                      If you want to calculate your cumulative CGPA, fill in your previous total completed credits and your cumulative CGPA before this semester in the "Include Previous CGPA" section.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-base">Click Calculate</h4>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-550 dark:text-zinc-400 font-medium">
                      Press the **Calculate CGPA** button to trigger computations. The dashboard will instantly display your semester GPA, expected letter grade, and updated cumulative CGPA.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-8 w-8 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white text-base">Use the Target Planner</h4>
                    <p className="mt-1 text-xs sm:text-sm text-zinc-550 dark:text-zinc-400 font-medium">
                      Input your target CGPA and the credits you have remaining in your degree. The calculator will estimate the average GPA required in the upcoming semesters to hit your target.
                    </p>
                  </div>
                </div>

              </Card.Content>
            </Card>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <footer className="w-full mt-20 border-t border-zinc-200 dark:border-zinc-900 py-8 px-6 text-center text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} UIU CGPA Calculator. Tailored for United International University students.</p>
          <div className="flex gap-4">
            <span className="hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer" onClick={() => setIsModalOpen(true)}>Grading Policy</span>
            <span>•</span>
            <a href="https://www.uiu.ac.bd" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-700 dark:hover:text-zinc-300">UIU Portal</a>
          </div>
        </div>
      </footer>

      {/* Grading Scale Info Modal (Built with custom Framer Motion for reliability) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            {/* Modal Dialog */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden z-10 text-zinc-900 dark:text-white"
            >
              <div className="flex justify-between items-start pb-4 border-b border-zinc-200 dark:border-zinc-900">
                <div>
                  <h3 className="text-zinc-900 dark:text-white text-lg font-bold">UIU Official Grading System</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">Adopted by United International University</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-150 dark:hover:bg-zinc-900 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="py-4 flex flex-col gap-2">
                <div className="grid grid-cols-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 pb-2 border-b border-zinc-200 dark:border-zinc-900 px-2">
                  <span>Grade</span>
                  <span>GPA Value</span>
                  <span>Marks %</span>
                  <span>Remarks</span>
                </div>
                <div className="flex flex-col max-h-[320px] overflow-y-auto pr-1 gap-1">
                  {GRADE_SCALE.map((scale, i) => (
                    <div 
                      key={scale.grade}
                      className={`grid grid-cols-4 text-sm py-2 px-2 rounded-lg transition-colors ${
                        i % 2 === 0 ? "bg-zinc-100/50 dark:bg-zinc-900/40" : "bg-transparent"
                      }`}
                    >
                      <span className="font-bold text-orange-500">{scale.grade}</span>
                      <span className="font-mono text-zinc-700 dark:text-zinc-200">{scale.gpa.toFixed(2)}</span>
                      <span className="text-zinc-605 dark:text-zinc-350 font-mono text-xs flex items-center">{scale.marks}</span>
                      <span className="text-zinc-500 dark:text-zinc-400 text-xs flex items-center">{scale.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end pt-3 border-t border-zinc-200 dark:border-zinc-900">
                <Button 
                  size="sm" 
                  className="bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 border border-zinc-250 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  onPress={() => setIsModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
