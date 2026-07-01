"use client";

import { Card, Separator } from "@heroui/react";
import { Crosshair, Target } from "lucide-react";

export default function TargetPlanner({ targetCGPA, remainingCredits, targetAdvice, onTargetCGPAChange, onRemainingCreditsChange }) {
  const isImpossible = targetAdvice?.startsWith("Mathematically impossible");
  const isAlreadyAchieved = targetAdvice?.startsWith("You have already secured");

  return (
    <Card className="border border-border bg-surface shadow-sm">
      <Card.Header className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Crosshair className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Target CGPA Planner</h2>
            <p className="text-xs text-muted">Plan your path to your desired CGPA.</p>
          </div>
        </div>
      </Card.Header>
      <Separator className="my-1 bg-separator" />
      <Card.Content className="px-5 py-4 flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted font-semibold">Target CGPA</label>
            <input
              autoComplete="off"
              type="number"
              min="0"
              max="4"
              step="0.01"
              placeholder="e.g. 3.5"
              value={targetCGPA}
              onChange={(e) => onTargetCGPAChange(e.target.value)}
              className="px-3 py-2 bg-field border border-border rounded-lg text-sm text-foreground font-medium focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted font-semibold">Remaining Credits</label>
            <input
              autoComplete="off"
              type="number"
              min="1"
              placeholder="e.g. 30"
              value={remainingCredits}
              onChange={(e) => onRemainingCreditsChange(e.target.value)}
              className="px-3 py-2 bg-field border border-border rounded-lg text-sm text-foreground font-medium focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {targetAdvice && (
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${
            isImpossible
              ? "bg-red-500/5 border-red-500/25"
              : isAlreadyAchieved
              ? "bg-green-500/5 border-green-500/25"
              : "bg-blue-500/5 border-blue-500/25"
          }`}>
            <Target className={`h-5 w-5 mt-0.5 shrink-0 ${
              isImpossible ? "text-red-500" : isAlreadyAchieved ? "text-green-500" : "text-blue-500"
            }`} />
            <p className="text-sm text-foreground leading-relaxed">{targetAdvice}</p>
          </div>
        )}
      </Card.Content>
    </Card>
  );
}
