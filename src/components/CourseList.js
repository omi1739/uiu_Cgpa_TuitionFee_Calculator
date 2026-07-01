"use client";

import { useMemo } from "react";
import { Button, Card, Separator } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, RefreshCw, Plus, Trash2, Calculator } from "lucide-react";
import { GRADE_SCALE, CREDIT_OPTIONS } from "./constants";

export default function CourseList({ courses, onUpdateCourse, onAddCourse, onDeleteCourse, onClearAll, onCalculate }) {
  const totalCredits = useMemo(
    () => courses.reduce((sum, c) => sum + (parseFloat(c.credits) || 0), 0),
    [courses]
  );

  return (
    <Card className="border border-border bg-surface shadow-sm">
      <Card.Header className="flex items-center gap-2 px-6  ">
        <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
          <Layers className="h-5 w-5 text-orange-500" />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">Courses</h2>
          <p className="text-xs text-muted">{courses.length} course{courses.length !== 1 ? "s" : ""} &middot; {totalCredits.toFixed(1)} total credits</p>
        </div>
      </Card.Header>
      <Separator className="my-0.5 bg-separator" />
      <Card.Content className="px-5 pt-1 pb-2 flex flex-col gap-3">
        <AnimatePresence initial={false}>
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-background-secondary border border-border/60 hover:border-orange-500/25 transition-all"
            >
              <span className="text-xs font-semibold text-muted min-w-[20px]">#{course.id}</span>
              <div className="flex items-center gap-2 flex-1">
                <select
                  autoComplete="off"
                  value={course.credits}
                  onChange={(e) => onUpdateCourse(course.id, "credits", e.target.value)}
                  className="px-3 py-2 bg-field border border-border rounded-lg text-sm text-foreground font-medium focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
                >
                  <option value="" disabled>Credits</option>
                  {CREDIT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <select
                  autoComplete="off"
                  value={course.grade}
                  onChange={(e) => onUpdateCourse(course.id, "grade", e.target.value)}
                  className="flex-1 px-3 py-2 bg-field border border-border rounded-lg text-sm text-foreground font-semibold focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
                >
                  <option value="" disabled>Grade</option>
                  {GRADE_SCALE.map((s) => (
                    <option key={s.grade} value={s.grade}>{s.grade} ({s.gpa.toFixed(2)})</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                disabled={courses.length <= 1}
                onClick={() => onDeleteCourse(course.id)}
                className="p-2 text-muted/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg disabled:opacity-20 transition-all"
                aria-label="Remove course"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        <Button
          variant="light"
          className="w-full border-2 border-dashed border-orange-300/40 dark:border-orange-500/30 hover:border-orange-500/60 text-orange-600 dark:text-orange-400 hover:text-orange-500 py-5 text-sm rounded-xl transition-all"
          onClick={onAddCourse}
        >
          <Plus className="h-5 w-5 text-green-500 stroke-[3]" />
          Add Course
        </Button>

        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-sm shadow-lg shadow-orange-500/20 py-5 hover:scale-[1.01] active:scale-[0.99] transition-transform rounded-xl border border-orange-400/25"
          startContent={<Calculator className="h-4 w-4 text-black stroke-[2.5]" />}
          onClick={onCalculate}
        >
          Calculate CGPA
        </Button>

        <button
          type="button"
          onClick={onClearAll}
          className="self-center text-xs text-muted hover:text-red-500 transition-colors flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" />
          Reset all fields
        </button>
      </Card.Content>
    </Card>
  );
}
