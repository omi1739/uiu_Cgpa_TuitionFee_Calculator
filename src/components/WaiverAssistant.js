"use client";

import { Card, Separator } from "@heroui/react";
import { BadgePercent, CheckCircle, AlertCircle } from "lucide-react";

export default function WaiverAssistant({ sscGpa, hscGpa, suggestedWaiver, onSscGpaChange, onHscGpaChange }) {
  return (
    <Card className="border border-border bg-surface/70 backdrop-blur-xl shadow-sm">
      <Card.Header className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <BadgePercent className="h-5 w-5 text-orange-500" />
          <div>
            <h3 className="text-base font-bold text-foreground">Admission Waiver Assistant</h3>
            <p className="text-xs text-muted">Input your SSC & HSC GPAs to see if you qualify for official UIU admission scholarships.</p>
          </div>
        </div>
      </Card.Header>
      <Separator className="my-2 bg-separator" />
      <Card.Content className="px-6 py-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="ssc-gpa" className="text-xs text-muted font-medium">SSC GPA (With 4th subject)</label>
            <input autoComplete="off"
              id="ssc-gpa"
              type="number"
              step="0.01"
              min="0"
              max="5"
              placeholder="e.g. 5.00"
              value={sscGpa}
              onChange={(e) => onSscGpaChange(e.target.value)}
              className="w-full px-3 py-2 bg-field border border-border hover:border-zinc-300 focus:border-orange-500 rounded-lg text-sm text-foreground focus:outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="hsc-gpa" className="text-xs text-muted font-medium">HSC GPA (Without 4th subject)</label>
            <input autoComplete="off"
              id="hsc-gpa"
              type="number"
              step="0.01"
              min="0"
              max="5"
              placeholder="e.g. 5.00"
              value={hscGpa}
              onChange={(e) => onHscGpaChange(e.target.value)}
              className="w-full px-3 py-2 bg-field border border-border hover:border-zinc-300 focus:border-orange-500 rounded-lg text-sm text-foreground focus:outline-none transition-all"
            />
          </div>
        </div>

        {suggestedWaiver !== null && (
          <div className={`p-4 rounded-xl border flex gap-3 items-start transition-colors duration-200 ${
            suggestedWaiver > 0
              ? "bg-green-500/5 border-green-500/20 text-green-700"
              : "bg-amber-500/5 border-amber-500/20 text-amber-700"
          }`} role="status" aria-live="polite">
            {suggestedWaiver > 0 ? (
              <>
                <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-sm block">Waiver Found!</span>
                  <p className="text-xs leading-relaxed mt-0.5">
                    Based on your results, you qualify for a **{suggestedWaiver}% Tuition Fee Waiver** under UIU&apos;s academic policy (re-applied automatically below).
                  </p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sm block">No Automatic Academic Waiver</span>
                  <p className="text-xs leading-relaxed mt-0.5">
                    Your GPA details do not meet the minimum criteria for academic results waivers. However, you can still secure waivers via top trimester results (merit list) or sibling discounts.
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        <div className="p-3 bg-surface-secondary border border-border rounded-xl text-xs text-muted flex flex-col gap-1.5">
          <span className="font-semibold text-foreground">UIU General Admission Waiver Rules (Spring 2025 onwards):</span>
          <span>&bull; **50% Waiver (National Curriculum)**: SSC GPA 5.00 (with 4th) & HSC GPA 5.00 (without 4th subject)</span>
          <span>&bull; **25% Waiver (National Curriculum)**: SSC GPA 4.50 (with 4th) & HSC GPA 5.00 (with 4th subject)</span>
          <span className="border-t border-border pt-1.5 font-semibold text-foreground">English Medium (O/A Level):</span>
          <span>&bull; **50% Waiver**: 5 A&apos;s in O-Level (in one sitting) & 2 A&apos;s in A-Level</span>
          <span>&bull; **25% Waiver**: 5 A&apos;s in O-Level (in one sitting) & 1 A in A-Level</span>
        </div>
      </Card.Content>
    </Card>
  );
}
