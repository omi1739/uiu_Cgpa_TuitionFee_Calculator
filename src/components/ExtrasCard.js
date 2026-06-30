"use client";

import { Card, Separator } from "@heroui/react";
import { PlusCircle } from "lucide-react";

export default function ExtrasCard({ fydp, lateFee, transportFee, gymFee, trimesterMode, onFydpChange, onLateFeeChange, onTransportChange, onGymChange, onTrimesterModeChange }) {
  return (
    <Card className="border border-border bg-surface/70 backdrop-blur-xl shadow-sm">
      <Card.Header className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-orange-500" />
          <div>
            <h2 className="text-lg font-bold text-foreground">Extras</h2>
            <p className="text-xs text-muted mt-0.5">Optional fees and trimester/semester mode.</p>
          </div>
        </div>
      </Card.Header>
      <Separator className="my-2 bg-separator" />
      <Card.Content className="px-6 py-4 flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CheckboxItem id="fydp" label="FYDP (Capstone)" desc="2 credits excluded from waiver" checked={fydp} onChange={onFydpChange} />
          <CheckboxItem id="late" label="Late Fee" desc="Tk 500 penalty" checked={lateFee} onChange={onLateFeeChange} />
          <CheckboxItem id="transport" label="Transportation (Bus)" desc={`Tk ${trimesterMode ? 4000 : 6000}/${trimesterMode ? "tri" : "sem"}ester`} checked={transportFee} onChange={onTransportChange} />
          <CheckboxItem id="gym" label="Gym" desc={`Tk ${trimesterMode ? 1500 : 2200}/${trimesterMode ? "tri" : "sem"}ester`} checked={gymFee} onChange={onGymChange} />
        </div>

        <div className="flex items-center gap-3 p-3 bg-background-tertiary border border-border rounded-xl">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">Mode:</span>
          <div className="flex overflow-hidden rounded-lg border border-border">
            <button
              type="button"
              onClick={() => onTrimesterModeChange(true)}
              className={`px-4 py-1.5 text-xs font-bold transition-colors ${
                trimesterMode
                  ? "bg-orange-500 text-white"
                  : "bg-surface-secondary text-muted hover:bg-surface-secondary"
              }`}
            >
              Trimester
            </button>
            <button
              type="button"
              onClick={() => onTrimesterModeChange(false)}
              className={`px-4 py-1.5 text-xs font-bold transition-colors ${
                !trimesterMode
                  ? "bg-orange-500 text-white"
                  : "bg-surface-secondary text-muted hover:bg-surface-secondary"
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

function CheckboxItem({ id, label, desc, checked, onChange }) {
  return (
    <div className="flex items-center gap-3 p-3.5 bg-background-secondary border border-border rounded-xl">
      <input
        type="checkbox"
        id={`extras-${id}`}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4.5 w-4.5 accent-orange-500 cursor-pointer rounded"
      />
      <div>
        <label htmlFor={`extras-${id}`} className="text-xs sm:text-sm text-foreground cursor-pointer select-none font-medium">
          {label}
        </label>
        <p className="text-[10px] text-muted">{desc}</p>
      </div>
    </div>
  );
}
