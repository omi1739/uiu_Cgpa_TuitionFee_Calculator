"use client";

import { Button, Card, Separator } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, RefreshCw, PlusCircle, Trash2, Calculator } from "lucide-react";
import { GRADE_SCALE, CREDIT_OPTIONS } from "./constants";

export default function CourseList({ courses, onUpdateCourse, onAddCourse, onDeleteCourse, onClearAll, onCalculate }) {
  return (
    <Card className="border border-border bg-surface/70 backdrop-blur-xl shadow-sm">
      <Card.Header className="flex justify-between items-center px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-orange-500" />
          <h2 className="text-lg font-bold text-foreground">Current Semester Courses</h2>
        </div>
        <Button
          size="sm"
          variant="flat"
          className="bg-surface-secondary border border-border/50 text-muted hover:text-foreground"
          startContent={<RefreshCw className="h-3.5 w-3.5" />}
          onClick={onClearAll}
        >
          Reset All
        </Button>
      </Card.Header>
      <Separator className="my-2 bg-separator" />
      <Card.Content className="px-6 py-4 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {courses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 rounded-xl bg-background-secondary border border-border/50 hover:border-orange-500/20 transition-all shadow-sm"
              >
                <div className="sm:col-span-4 flex flex-col gap-1">
                  <label htmlFor={`course-name-${course.id}`} className="text-[11px] text-muted font-semibold tracking-wider uppercase ml-1">
                    Course Title
                  </label>
                  <input
                    id={`course-name-${course.id}`}
                    type="text"
                    value={course.name}
                    onChange={(e) => onUpdateCourse(course.id, "name", e.target.value)}
                    className="w-full px-3 py-2 bg-field border border-border hover:border-zinc-300 focus:border-orange-500 rounded-lg text-sm text-foreground focus:outline-none transition-all"
                    placeholder="e.g. SPL"
                  />
                </div>

                <div className="sm:col-span-4 flex flex-col gap-1">
                  <label htmlFor={`course-credits-${course.id}`} className="text-[11px] text-muted font-semibold tracking-wider uppercase ml-1">
                    Credits
                  </label>
                  <select
                    id={`course-credits-${course.id}`}
                    value={course.credits}
                    onChange={(e) => onUpdateCourse(course.id, "credits", e.target.value)}
                    className="w-full px-3 py-2 bg-field border border-border hover:border-zinc-300 focus:border-orange-500 rounded-lg text-sm text-foreground focus:outline-none transition-all cursor-pointer"
                  >
                    {CREDIT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-field text-foreground">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3 flex flex-col gap-1">
                  <label htmlFor={`course-grade-${course.id}`} className="text-[11px] text-muted font-semibold tracking-wider uppercase ml-1">
                    Grade
                  </label>
                  <select
                    id={`course-grade-${course.id}`}
                    value={course.grade}
                    onChange={(e) => onUpdateCourse(course.id, "grade", e.target.value)}
                    className="w-full px-3 py-2 bg-field border border-border hover:border-zinc-300 focus:border-orange-500 rounded-lg text-sm text-foreground focus:outline-none transition-all cursor-pointer"
                  >
                    {GRADE_SCALE.map((scale) => (
                      <option key={scale.grade} value={scale.grade} className="bg-field text-foreground">
                        {scale.grade} ({scale.gpa.toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-1 flex justify-center pt-5 sm:pt-0">
                  <button
                    type="button"
                    disabled={courses.length <= 1}
                    onClick={() => onDeleteCourse(course.id)}
                    className="p-2 text-muted hover:text-red-500 hover:bg-surface-secondary rounded-lg disabled:opacity-30 transition-colors"
                    aria-label={`Remove ${course.name}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-2 flex flex-col sm:flex-row gap-3">
          <Button
            variant="dashed"
            className="flex-1 border-2 border-dashed border-border hover:border-orange-500/50 hover:bg-orange-500/5 text-muted hover:text-orange-500 py-6 transition-all"
            startContent={<PlusCircle className="h-5 w-5" />}
            onClick={onAddCourse}
          >
            Add Another Course
          </Button>
        </div>

        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-base shadow-lg shadow-orange-500/15 py-6 hover:scale-[1.01] active:scale-[0.99] transition-transform border border-orange-400/25"
          startContent={<Calculator className="h-5 w-5 text-black stroke-[2.5]" />}
          onClick={onCalculate}
        >
          Calculate CGPA
        </Button>

      </Card.Content>
    </Card>
  );
}
