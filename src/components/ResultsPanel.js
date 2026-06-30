"use client";

import { Card, Chip, Separator } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calculator } from "lucide-react";
import { GRADE_SCALE } from "./constants";

export default function ResultsPanel({ semesterGPA, cumulativeCGPA, totalCredits, prevCredits, isCalculated }) {
  const getGPABadgeColor = (gpa) => {
    if (gpa >= 3.67) return "success";
    if (gpa >= 3.0) return "primary";
    if (gpa >= 2.2) return "warning";
    return "danger";
  };

  return (
    <AnimatePresence mode="wait">
      {isCalculated ? (
        <motion.div
          key="results"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Card className="border border-border bg-surface/60 backdrop-blur-xl relative overflow-hidden shadow-sm">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

            <Card.Header className="px-6 pt-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
                <h3 className="font-bold text-lg text-foreground">Your Results</h3>
              </div>
            </Card.Header>
            <Separator className="my-2 bg-separator" />
            <Card.Content className="px-6 py-6 flex flex-col gap-6" aria-live="polite">
              <div className="flex flex-col items-center justify-center py-4 bg-background-secondary rounded-2xl border border-border/80">
                <span className="text-muted text-xs font-semibold uppercase tracking-wider">
                  Semester GPA
                </span>
                <span className="text-5xl font-black bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-300 bg-clip-text text-transparent my-1">
                  {semesterGPA !== null ? semesterGPA.toFixed(2) : "0.00"}
                </span>
                <Chip size="sm" color={getGPABadgeColor(semesterGPA)} variant="flat" className="font-bold mt-1 text-xs">
                  Grade {GRADE_SCALE.find((g) => g.gpa <= (semesterGPA || 0))?.grade || "F"}
                </Chip>
              </div>

              {cumulativeCGPA !== null && (
                <div className="flex justify-between items-center p-4 bg-background-secondary border border-border rounded-xl">
                  <div>
                    <span className="text-muted text-xs block font-semibold">Cumulative CGPA</span>
                    <span className="text-2xl font-black text-orange-500 mt-0.5 block">
                      {cumulativeCGPA.toFixed(2)}
                    </span>
                  </div>
                  <Chip size="sm" variant="dot" color="success" className="text-foreground border-border">
                    Updated CGPA
                  </Chip>
                </div>
              )}

              <div className="flex flex-col gap-3 text-sm border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="text-muted">Semester Credits:</span>
                  <span className="font-bold text-foreground">{totalCredits.toFixed(1)} Credits</span>
                </div>
                {prevCredits ? (
                  <div className="flex justify-between">
                    <span className="text-muted">Total Completed Credits:</span>
                    <span className="font-bold text-foreground">
                      {(parseFloat(prevCredits) + totalCredits).toFixed(1)} Credits
                    </span>
                  </div>
                ) : null}
              </div>
            </Card.Content>
          </Card>
        </motion.div>
      ) : (
        <Card className="border border-border bg-surface/50 backdrop-blur-xl border-dashed shadow-sm">
          <Card.Content className="p-8 text-center flex flex-col items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-full bg-surface-secondary flex items-center justify-center text-muted animate-bounce">
              <Calculator className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Awaiting Calculation</h4>
              <p className="text-xs text-zinc-500 mt-1 max-w-[200px] mx-auto">
                Enter your courses and grades, then click Calculate CGPA to see your semester GPA and cumulative CGPA.
              </p>
            </div>
          </Card.Content>
        </Card>
      )}
    </AnimatePresence>
  );
}
