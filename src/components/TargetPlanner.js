"use client";

import { Card, Separator } from "@heroui/react";
import { Lightbulb } from "lucide-react";

export default function TargetPlanner({ targetCGPA, remainingCredits, targetAdvice, onTargetCGPAChange, onRemainingCreditsChange }) {
  return (
    <Card className="border border-border bg-surface/70 backdrop-blur-xl shadow-sm">
      <Card.Header className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500 animate-pulse" />
          <h3 className="text-base font-bold text-foreground">Target CGPA Planner</h3>
        </div>
      </Card.Header>
      <Separator className="my-2 bg-separator" />
      <Card.Content className="px-6 py-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="target-cgpa" className="text-xs text-muted font-medium">Target CGPA</label>
            <input autoComplete="off"
              id="target-cgpa"
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={targetCGPA}
              onChange={(e) => onTargetCGPAChange(e.target.value)}
              className="w-full px-3 py-2 bg-field border border-border hover:border-zinc-300 focus:border-orange-500 rounded-lg text-sm text-foreground focus:outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="remaining-credits" className="text-xs text-muted font-medium">Remaining Credits</label>
            <input autoComplete="off"
              id="remaining-credits"
              type="number"
              step="1"
              min="1"
              value={remainingCredits}
              onChange={(e) => onRemainingCreditsChange(e.target.value)}
              className="w-full px-3 py-2 bg-field border border-border hover:border-zinc-300 focus:border-orange-500 rounded-lg text-sm text-foreground focus:outline-none transition-all"
            />
          </div>
        </div>

        {targetAdvice ? (
          <div className="p-3.5 bg-surface-secondary rounded-xl border border-border/60 text-xs leading-relaxed text-foreground flex gap-2" role="status" aria-live="polite">
            <span className="text-orange-500">&bull;</span>
            <p>{targetAdvice}</p>
          </div>
        ) : (
          <p className="text-xs text-muted italic text-center py-2">
            Enter your target CGPA and remaining credits to calculate the GPA needed to reach your academic goals.
          </p>
        )}
      </Card.Content>
    </Card>
  );
}
