"use client";

import { Card, Separator } from "@heroui/react";
import { TrendingUp } from "lucide-react";

export default function PreviousCGPAInput({ prevCGPA, prevCredits, onPrevCGPAChange, onPrevCreditsChange }) {
  return (
    <Card className="border border-border bg-surface/70 backdrop-blur-xl shadow-sm">
      <Card.Header className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          <div>
            <h3 className="text-base font-bold text-foreground">Include Previous CGPA (Optional)</h3>
            <p className="text-xs text-muted">
              Combine your current semester results with your cumulative academic history to calculate your overall CGPA.
            </p>
          </div>
        </div>
      </Card.Header>
      <Separator className="my-2 bg-separator" />
      <Card.Content className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="prev-cgpa" className="text-xs text-muted font-medium">Previous Cumulative CGPA</label>
          <input
            id="prev-cgpa"
            type="number"
            step="0.01"
            min="0"
            max="4"
            placeholder="e.g. 3.45"
            value={prevCGPA}
            onChange={(e) => onPrevCGPAChange(e.target.value)}
            className="w-full px-3 py-2 bg-field border border-border hover:border-zinc-300 focus:border-orange-500 rounded-lg text-sm text-foreground focus:outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="prev-credits" className="text-xs text-muted font-medium">Previous Earned Credits</label>
          <input
            id="prev-credits"
            type="number"
            step="0.5"
            min="0"
            placeholder="e.g. 64"
            value={prevCredits}
            onChange={(e) => onPrevCreditsChange(e.target.value)}
            className="w-full px-3 py-2 bg-field border border-border hover:border-zinc-300 focus:border-orange-500 rounded-lg text-sm text-foreground focus:outline-none transition-all"
          />
        </div>
      </Card.Content>
    </Card>
  );
}
