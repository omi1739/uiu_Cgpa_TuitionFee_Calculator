"use client";

import { Card, Separator } from "@heroui/react";
import { Puzzle, Ban, Bus, Dumbbell, GitBranch } from "lucide-react";

export default function ExtrasCard({ fydp, lateFee, transportFee, gymFee, trimesterMode, onFydpChange, onLateFeeChange, onTransportChange, onGymChange, onTrimesterModeChange }) {
  return (
    <Card className="border border-border bg-surface shadow-sm">
      <Card.Header className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Puzzle className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Extras & Mode</h2>
            <p className="text-xs text-muted">Optional fees and trimester/semester selection.</p>
          </div>
        </div>
      </Card.Header>
      <Separator className="my-1 bg-separator" />
      <Card.Content className="px-5 py-4 flex flex-col gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ToggleItem
            icon={GitBranch}
            label="FYDP (Capstone)"
            desc="2 credits excluded from waiver"
            checked={fydp}
            onChange={onFydpChange}
            color="bg-orange-500/10 text-orange-500"
          />
          <ToggleItem
            icon={Ban}
            label="Late Fee"
            desc="Tk 500 penalty"
            checked={lateFee}
            onChange={onLateFeeChange}
            color="bg-red-500/10 text-red-500"
          />
          <ToggleItem
            icon={Bus}
            label="Transportation"
            desc={trimesterMode ? "Tk 4,000/trimester" : "Tk 6,000/semester"}
            checked={transportFee}
            onChange={onTransportChange}
            color="bg-blue-500/10 text-blue-500"
          />
          <ToggleItem
            icon={Dumbbell}
            label="Gym"
            desc={trimesterMode ? "Tk 1,500/trimester" : "Tk 2,200/semester"}
            checked={gymFee}
            onChange={onGymChange}
            color="bg-green-500/10 text-green-500"
          />
        </div>

        <div className="flex items-center gap-3 p-3 bg-background-secondary rounded-xl border border-border/60">
          <span className="text-xs text-muted font-bold uppercase tracking-wider shrink-0">Academic Mode</span>
          <div className="flex bg-background-tertiary rounded-lg p-0.5 border border-border/60 flex-1">
            <button
              type="button"
              onClick={() => onTrimesterModeChange(true)}
              className={`flex-1 py-1.5 text-sm font-bold rounded-md transition-all ${
                trimesterMode
                  ? "bg-white dark:bg-zinc-800 text-orange-600 dark:text-orange-400 shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Trimester
            </button>
            <button
              type="button"
              onClick={() => onTrimesterModeChange(false)}
              className={`flex-1 py-1.5 text-sm font-bold rounded-md transition-all ${
                !trimesterMode
                  ? "bg-white dark:bg-zinc-800 text-orange-600 dark:text-orange-400 shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Semester
            </button>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}

function ToggleItem({ icon: Icon, label, desc, checked, onChange, color }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
        checked
          ? "bg-orange-500/5 border-orange-500/30"
          : "bg-background-secondary border-border/60 hover:border-orange-500/20"
      }`}
    >
      <div className={`h-9 w-9 rounded-lg ${color} flex items-center justify-center shrink-0`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">{label}</span>
          <div className={`h-5 w-8 rounded-full transition-colors ${
            checked ? "bg-orange-500" : "bg-border"
          } relative`}>
            <div className={`h-4 w-4 rounded-full bg-white absolute top-0.5 transition-all ${
              checked ? "left-3.5" : "left-0.5"
            }`} />
          </div>
        </div>
        <p className="text-xs text-muted">{desc}</p>
      </div>
    </button>
  );
}
