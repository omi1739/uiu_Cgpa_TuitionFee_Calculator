"use client";

import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { GRADE_SCALE } from "./constants";

export default function GradeScaleModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden z-10 text-zinc-900 dark:text-white"
          >
            <div className="flex justify-between items-start pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <h3 className="text-zinc-900 dark:text-white text-lg font-bold">UIU Official Grading System</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                  Adopted by United International University
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
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
                    <span className="text-zinc-500 dark:text-zinc-400 font-mono text-xs flex items-center">{scale.marks}</span>
                    <span className="text-zinc-500 dark:text-zinc-400 text-xs flex items-center">{scale.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end pt-3 border-t border-zinc-200 dark:border-zinc-900">
              <Button
                size="sm"
                className="bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                onPress={onClose}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
