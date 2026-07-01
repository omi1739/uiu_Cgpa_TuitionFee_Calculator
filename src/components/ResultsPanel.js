"use client";

import { useMemo } from "react";
import { Card, Separator } from "@heroui/react";
import { motion } from "framer-motion";
import { Trophy, Target, TrendingUp } from "lucide-react";
import { GRADE_SCALE } from "./constants";

const RADIUS = 58;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ResultsPanel({ semesterGPA, cumulativeCGPA, totalCredits, prevCredits, isCalculated }) {
  const displayGPA = isCalculated ? (cumulativeCGPA !== null ? cumulativeCGPA : semesterGPA) : null;

  const gradeInfo = useMemo(() => {
    if (displayGPA === null) return { letter: "--", color: "var(--color-muted)", name: "N/A" };
    for (const s of GRADE_SCALE) {
      if (displayGPA >= s.gpa) return { letter: s.grade, color: s.color, name: s.desc };
    }
    return { letter: "F", color: "#ef4444", name: "Failed" };
  }, [displayGPA]);

  const offset = CIRCUMFERENCE - ((displayGPA ?? 0) / 4.0) * CIRCUMFERENCE;

  const totalGradePoints = isCalculated && semesterGPA !== null ? semesterGPA * totalCredits : null;

  const stats = useMemo(() => [
    { label: "GPA", value: displayGPA !== null ? displayGPA.toFixed(2) : "—", icon: Trophy, sub: isCalculated ? gradeInfo.name : "Not calculated" },
    { label: "Grade", value: gradeInfo.letter, icon: Target, sub: isCalculated ? `on ${totalCredits} credits` : "—" },
    { label: "Total", value: totalGradePoints !== null ? totalGradePoints.toFixed(2) : "—", icon: TrendingUp, sub: isCalculated ? "grade points" : "—" },
  ], [displayGPA, gradeInfo, totalCredits, totalGradePoints, isCalculated]);

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
                stroke={gradeInfo.color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-foreground" style={{ color: gradeInfo.color }}>{displayGPA !== null ? displayGPA.toFixed(2) : "—"}</span>
              <span className="text-xs font-bold text-muted">{isCalculated ? "out of 4.00" : "Press Calculate"}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-background-secondary border border-border/60">
                <stat.icon className="h-5 w-5 text-orange-500" />
                <span className="text-lg font-extrabold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
