"use client";

import { useState } from "react";
import { Card, Separator } from "@heroui/react";
import { Coins } from "lucide-react";
import { CREDIT_FEE_PRESETS, REGISTRATION_FEE_PRESETS, WAIVER_PRESETS } from "./constants";

export default function UnitFeesCard({ creditFee, registrationFee, waiverPercent, onCreditFeeChange, onRegistrationFeeChange, onWaiverPercentChange }) {
  const presetCredit = CREDIT_FEE_PRESETS.map(String);
  const presetReg = REGISTRATION_FEE_PRESETS.map(String);
  const presetWaiver = WAIVER_PRESETS.map(String);

  const [isCustomCredit, setIsCustomCredit] = useState(!presetCredit.includes(creditFee));
  const [isCustomReg, setIsCustomReg] = useState(!presetReg.includes(registrationFee));
  const [isCustomWaiver, setIsCustomWaiver] = useState(!presetWaiver.includes(String(waiverPercent)));

  return (
    <Card className="border border-border bg-surface/70 backdrop-blur-xl shadow-sm">
      <Card.Header className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-orange-500" />
          <div>
            <h2 className="text-lg font-bold text-foreground">Unit Fees</h2>
            <p className="text-xs text-muted mt-0.5">Set per-credit fee, registration fee, and tuition waiver percentage.</p>
          </div>
        </div>
      </Card.Header>
      <Separator className="my-2 bg-separator" />
      <Card.Content className="px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <DropdownField
            id="credit-fee"
            label="Credit Fee (Tk)"
            value={creditFee}
            presets={presetCredit}
            isCustom={isCustomCredit}
            onPresetSelect={(val) => { setIsCustomCredit(false); onCreditFeeChange(val); }}
            onCustomSelect={() => { setIsCustomCredit(true); onCreditFeeChange(""); }}
            onCustomChange={onCreditFeeChange}
            formatOption={(v) => `Tk ${Number(v).toLocaleString()}`}
          />
          <DropdownField
            id="registration-fee"
            label="Registration Fee (Tk)"
            value={registrationFee}
            presets={presetReg}
            isCustom={isCustomReg}
            onPresetSelect={(val) => { setIsCustomReg(false); onRegistrationFeeChange(val); }}
            onCustomSelect={() => { setIsCustomReg(true); onRegistrationFeeChange(""); }}
            onCustomChange={onRegistrationFeeChange}
            formatOption={(v) => `Tk ${Number(v).toLocaleString()}`}
          />
          <DropdownField
            id="tuition-waiver"
            label="Tuition Waiver %"
            value={String(waiverPercent)}
            presets={presetWaiver}
            isCustom={isCustomWaiver}
            onPresetSelect={(val) => { setIsCustomWaiver(false); onWaiverPercentChange(val); }}
            onCustomSelect={() => { setIsCustomWaiver(true); onWaiverPercentChange(""); }}
            onCustomChange={onWaiverPercentChange}
            formatOption={(v) => `${v}%`}
          />
        </div>
      </Card.Content>
    </Card>
  );
}

function DropdownField({ id, label, value, presets, isCustom, onPresetSelect, onCustomSelect, onCustomChange, formatOption }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs text-muted font-bold uppercase tracking-wider">{label}</label>
      {isCustom ? (
        <div className="flex gap-2">
          <input autoComplete="off"
            id={id}
            type="number"
            min="0"
            placeholder="Enter amount"
            value={value}
            onChange={(e) => onCustomChange(e.target.value)}
            className="flex-1 px-3 py-2 bg-field border border-border hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-orange-500 rounded-lg text-sm text-foreground focus:outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => onPresetSelect(presets[0])}
            className="px-3 py-2 text-xs font-bold whitespace-nowrap rounded-lg bg-surface-secondary text-muted hover:text-foreground hover:bg-background-secondary border border-border"
          >
            Presets
          </button>
        </div>
      ) : null}
      <select autoComplete="off"
        id={isCustom ? undefined : id}
        value={isCustom ? "custom" : value}
        onChange={(e) => {
          if (e.target.value === "custom") {
            onCustomSelect();
          } else {
            onPresetSelect(e.target.value);
          }
        }}
        className={`w-full px-3 py-2 bg-field border border-border hover:border-zinc-300 dark:hover:border-zinc-700 focus:border-orange-500 rounded-lg text-sm text-foreground focus:outline-none transition-all cursor-pointer ${isCustom ? "mt-2" : ""}`}
      >
        {presets.map((p) => (
          <option key={p} value={p}>
            {formatOption(p)}
          </option>
        ))}
        <option value="custom">Custom...</option>
      </select>
    </div>
  );
}
