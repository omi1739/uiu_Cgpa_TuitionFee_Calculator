"use client";

import { Card, Separator } from "@heroui/react";
import { motion } from "framer-motion";
import { Trophy, BookOpen, TrendingUp } from "lucide-react";
import { GRADE_SCALE } from "./constants";

const RADIUS = 58;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getGradeInfo(gpa) {
  if (gpa === null || gpa === undefined) return { letter: "--", color: "var(--color-muted)", name: "N/A" };
  for (const s of GRADE_SCALE) {
    if (gpa >= s.gpa) return { letter: s.grade, color: s.color, name: s.desc };
  }
  return { letter: "F", color: "#ef4444", name: "Failed" };
}

export default function ResultsPanel({ semesterGPA, cumulativeCGPA, totalCredits, prevCredits, isCalculated }) {
  const hasPrev = isCalculated && cumulativeCGPA !== null;
  const overallGPA = hasPrev ? cumulativeCGPA : null;
  const semesterOnlyGPA = isCalculated && semesterGPA !== null ? semesterGPA : null;
  const displayGPA = overallGPA ?? semesterOnlyGPA;

  const overallGrade = overallGPA !== null ? getGradeInfo(overallGPA) : null;
  const semesterGrade = semesterOnlyGPA !== null ? getGradeInfo(semesterOnlyGPA) : null;
  const ringGrade = displayGPA !== null ? getGradeInfo(displayGPA) : null;

  const offset = displayGPA !== null ? CIRCUMFERENCE - (displayGPA / 4.0) * CIRCUMFERENCE : CIRCUMFERENCE;
  const totalGradePoints = semesterOnlyGPA !== null ? semesterOnlyGPA * totalCredits : null;

  return (
    <Card className="border border-border bg-surface shadow-sm">
      <Card.Header className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Trophy className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Results</h2>
            <p className="text-xs text-muted">Your calculated GPA and grade summary.</p>
          </div>
        </div>
      </Card.Header>
      <Separator className="my-1 bg-separator" />
      <Card.Content className="px-5 py-5">
        <div className="flex flex-col items-center gap-6">
          <div className="relative flex items-center justify-center">
            <svg width="140" height="140" className="-rotate-90">
              <circle cx="70" cy="70" r={RADIUS} fill="none" stroke="var(--color-separator)" strokeWidth="10" />
              <motion.circle
                cx="70" cy="70" r={RADIUS}
                fill="none"
                stroke={ringGrade ? ringGrade.color : "var(--color-separator)"}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold" style={{ color: ringGrade ? ringGrade.color : "var(--color-muted)" }}>
                {displayGPA !== null ? displayGPA.toFixed(2) : "—"}
              </span>
              <span className="text-xs font-bold text-muted">{isCalculated ? (hasPrev ? "Overall CGPA" : "Trimester GPA") : "Press Calculate"}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <Trophy className="h-5 w-5 text-orange-500" />
              <span className="text-lg font-extrabold text-foreground">{overallGPA !== null ? overallGPA.toFixed(2) : (semesterOnlyGPA !== null ? semesterOnlyGPA.toFixed(2) : "—")}</span>
              <span className="text-xs font-semibold text-muted">{isCalculated ? (hasPrev ? overallGrade.name : semesterGrade.name) : "Not calculated"}</span>
              <span className="text-xs text-muted mt-0.5">{hasPrev ? "Overall CGPA" : "Trimester GPA"}</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <span className="text-lg font-extrabold text-foreground">{semesterOnlyGPA !== null ? semesterOnlyGPA.toFixed(2) : "—"}</span>
              <span className="text-xs font-semibold text-muted">{semesterOnlyGPA !== null ? `${semesterGrade.letter} · ${totalCredits} credits` : "—"}</span>
              <span className="text-xs text-muted mt-0.5">Trimester GPA</span>
            </div>
          </div>

          {totalGradePoints !== null && (
            <div className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-background-secondary border border-border/60">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted" />
                <span className="text-sm text-muted">Grade Points</span>
              </div>
              <span className="text-sm font-bold text-foreground">{totalGradePoints.toFixed(2)}</span>
            </div>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
