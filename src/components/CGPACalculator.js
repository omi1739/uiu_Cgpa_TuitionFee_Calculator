"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { GRADE_SCALE } from "./constants";
import CourseList from "./CourseList";
import PreviousCGPAInput from "./PreviousCGPAInput";
import ResultsPanel from "./ResultsPanel";
import TargetPlanner from "./TargetPlanner";

export default function CGPACalculator() {
  const [courses, setCourses] = useState([
    { id: 1, name: "Course 1", credits: "3.0", grade: "A" },
    { id: 2, name: "Course 2", credits: "3.0", grade: "B+" },
  ]);

  const [prevCGPA, setPrevCGPA] = useState("");
  const [prevCredits, setPrevCredits] = useState("");

  const [semesterGPA, setSemesterGPA] = useState(null);
  const [cumulativeCGPA, setCumulativeCGPA] = useState(null);
  const [totalCredits, setTotalCredits] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

  const [targetCGPA, setTargetCGPA] = useState("3.5");
  const [remainingCredits, setRemainingCredits] = useState("30");

  const updateCourse = (id, field, value) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
    setIsCalculated(false);
  };

  const addCourse = () => {
    const nextId = courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
    setCourses((prev) => [...prev, { id: nextId, name: `Course ${nextId}`, credits: "3.0", grade: "A" }]);
    setIsCalculated(false);
  };

  const deleteCourse = (id) => {
    if (courses.length > 1) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
      setIsCalculated(false);
    }
  };

  const clearAll = () => {
    setCourses([{ id: 1, name: "Course 1", credits: "3.0", grade: "A" }]);
    setPrevCGPA("");
    setPrevCredits("");
    setSemesterGPA(null);
    setCumulativeCGPA(null);
    setTotalCredits(0);
    setIsCalculated(false);
  };

  const calculateCGPA = () => {
    let totalGradePoints = 0;
    let totalSemCredits = 0;

    courses.forEach((course) => {
      const creditVal = parseFloat(course.credits) || 0;
      const gradeObj = GRADE_SCALE.find((g) => g.grade === course.grade);
      const gradePoint = gradeObj ? gradeObj.gpa : 0;
      totalGradePoints += gradePoint * creditVal;
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

    const parsedPrevCGPA = parseFloat(prevCGPA);
    const parsedPrevCredits = parseFloat(prevCredits);

    if (!isNaN(parsedPrevCGPA) && !isNaN(parsedPrevCredits) && parsedPrevCredits > 0) {
      const overallGradePoints = parsedPrevCGPA * parsedPrevCredits + totalGradePoints;
      const overallCredits = parsedPrevCredits + totalSemCredits;
      setCumulativeCGPA(overallGradePoints / overallCredits);
    } else {
      setCumulativeCGPA(null);
    }

    setIsCalculated(true);
  };

  const targetAdvice = useMemo(() => {
    if (!isCalculated || semesterGPA === null) return "";

    const targetVal = parseFloat(targetCGPA);
    const remCreditsVal = parseFloat(remainingCredits);

    const currentSemGP = semesterGPA * totalCredits;
    const parsedPrevCGPA = parseFloat(prevCGPA) || 0;
    const parsedPrevCredits = parseFloat(prevCredits) || 0;

    const currentTotalGP = parsedPrevCGPA * parsedPrevCredits + currentSemGP;
    const currentTotalCredits = parsedPrevCredits + totalCredits;

    if (isNaN(targetVal) || isNaN(remCreditsVal) || remCreditsVal <= 0) return "";

    const totalFutureCredits = currentTotalCredits + remCreditsVal;
    const requiredTotalGP = targetVal * totalFutureCredits;
    const neededGPForFuture = requiredTotalGP - currentTotalGP;
    const neededGPA = neededGPForFuture / remCreditsVal;

    if (neededGPA <= 0) {
      return "You have already secured your target CGPA! Just maintain a passing grade.";
    } else if (neededGPA > 4.0) {
      return `Mathematically impossible. You would need a GPA of ${neededGPA.toFixed(2)} in the remaining credits to reach a CGPA of ${targetVal.toFixed(2)}.`;
    }
    return `To achieve a ${targetVal.toFixed(2)} CGPA, you must average a GPA of ${neededGPA.toFixed(2)} in your remaining ${remCreditsVal} credits.`;
  }, [targetCGPA, remainingCredits, isCalculated, semesterGPA, prevCGPA, prevCredits, totalCredits]);

  return (
    <motion.main
      key="calculator-dashboard"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
      className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8"
    >
      <div className="lg:col-span-8 flex flex-col gap-6">
        <CourseList
          courses={courses}
          onUpdateCourse={updateCourse}
          onAddCourse={addCourse}
          onDeleteCourse={deleteCourse}
          onClearAll={clearAll}
          onCalculate={calculateCGPA}
        />
        <PreviousCGPAInput
          prevCGPA={prevCGPA}
          prevCredits={prevCredits}
          onPrevCGPAChange={(v) => { setPrevCGPA(v); setIsCalculated(false); }}
          onPrevCreditsChange={(v) => { setPrevCredits(v); setIsCalculated(false); }}
        />
      </div>

      <div className="lg:col-span-4 flex flex-col gap-6">

        <ResultsPanel
          semesterGPA={semesterGPA}
          cumulativeCGPA={cumulativeCGPA}
          totalCredits={totalCredits}
          prevCredits={prevCredits}
          isCalculated={isCalculated}
        />

        <TargetPlanner
          targetCGPA={targetCGPA}
          remainingCredits={remainingCredits}
          targetAdvice={targetAdvice}
          onTargetCGPAChange={setTargetCGPA}
          onRemainingCreditsChange={setRemainingCredits}
        />
      </div>
    </motion.main>
  );
}
