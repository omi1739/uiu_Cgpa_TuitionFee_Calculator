"use client";

import { Card, Separator } from "@heroui/react";
import { BookOpen, RotateCcw, RefreshCw } from "lucide-react";

export default function CreditsCard({ regularCredits, firstRetakeCredits, retakeCredits, onRegularChange, onFirstRetakeChange, onRetakeChange }) {
  const reg = parseFloat(regularCredits) || 0;
  const fr = parseFloat(firstRetakeCredits) || 0;
  const ret = parseFloat(retakeCredits) || 0;
  const total = reg + fr + ret;

  return (
    <Card className="border border-border bg-surface shadow-sm">
      <Card.Header className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Enrolled Credits</h2>
            <p className="text-xs text-muted">{total > 0 ? `${total.toFixed(1)} total credits` : "Break down your credits by type"}</p>
          </div>
        </div>
      </Card.Header>
      <Separator className="my-1 bg-separator" />
      <Card.Content className="px-5 py-4">
        <div className="flex flex-col gap-3">
          <CreditRow
            icon={BookOpen}
            label="Regular"
            value={regularCredits}
            onChange={onRegularChange}
            hint=""
            color="bg-orange-500/10 text-orange-500"
          />
          <CreditRow
            icon={RotateCcw}
            label="1st Retake"
            value={firstRetakeCredits}
            onChange={onFirstRetakeChange}
            hint="50% discount"
            color="bg-blue-500/10 text-blue-500"
          />
          <CreditRow
            icon={RefreshCw}
            label="Retake"
            value={retakeCredits}
            onChange={onRetakeChange}
            hint="No discount"
            color="bg-purple-500/10 text-purple-500"
          />
        </div>
      </Card.Content>
    </Card>
  );
}

function CreditRow({ icon: Icon, label, value, onChange, hint, color }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-background-secondary border border-border/60">
      <div className={`h-9 w-9 rounded-lg ${color} flex items-center justify-center shrink-0`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <label className="text-sm font-semibold text-foreground">{label}</label>
        {hint && <p className="text-xs text-muted">{hint}</p>}
      </div>
      <input
        autoComplete="off"
        type="number"
        min="0"
        step="0.5"
        placeholder="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-24 px-3 py-2 bg-field border border-border rounded-lg text-sm text-foreground font-medium text-right focus:outline-none focus:border-orange-500 transition-colors"
      />
    </div>
  );
}
