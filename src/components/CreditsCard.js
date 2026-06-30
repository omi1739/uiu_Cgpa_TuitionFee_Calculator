"use client";

import { Card, Separator } from "@heroui/react";
import { Layers } from "lucide-react";

export default function CreditsCard({ regularCredits, firstRetakeCredits, retakeCredits, onRegularChange, onFirstRetakeChange, onRetakeChange }) {
  return (
    <Card className="border border-border bg-surface/70 backdrop-blur-xl shadow-sm">
      <Card.Header className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-orange-500" />
          <div>
            <h2 className="text-lg font-bold text-foreground">Credits</h2>
            <p className="text-xs text-muted mt-0.5">Break down your enrolled credits by type.</p>
          </div>
        </div>
      </Card.Header>
      <Separator className="my-2 bg-separator" />
      <Card.Content className="px-6 py-4 flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted font-bold uppercase tracking-wider">Regular Credits</label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 14"
              value={regularCredits}
              onChange={(e) => onRegularChange(e.target.value)}
              className="w-full px-3 py-2 bg-field border border-border hover:border-zinc-300 focus:border-orange-500 rounded-lg text-sm text-foreground focus:outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted font-bold uppercase tracking-wider">1st Retake Credits</label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 3"
              value={firstRetakeCredits}
              onChange={(e) => onFirstRetakeChange(e.target.value)}
              className="w-full px-3 py-2 bg-field border border-border hover:border-zinc-300 focus:border-orange-500 rounded-lg text-sm text-foreground focus:outline-none transition-all"
            />
            <span className="text-[10px] text-muted ml-1">50% waiver discount applies</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted font-bold uppercase tracking-wider">Retake Credits</label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 3"
              value={retakeCredits}
              onChange={(e) => onRetakeChange(e.target.value)}
              className="w-full px-3 py-2 bg-field border border-border hover:border-zinc-300 focus:border-orange-500 rounded-lg text-sm text-foreground focus:outline-none transition-all"
            />
            <span className="text-[10px] text-muted ml-1">No waiver applied</span>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
