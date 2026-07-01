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
    <Card className="border border-border bg-surface shadow-sm">
      <Card.Header className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Coins className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Fee Settings</h2>
            <p className="text-xs text-muted">Per-credit fee, registration fee, and waiver percentage.</p>
          </div>
        </div>
      </Card.Header>
      <Separator className="my-1 bg-separator" />
      <Card.Content className="px-5 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted font-semibold uppercase tracking-wider">Credit Fee (Tk)</label>
            <FeeDropdown
              presets={presetCredit}
              value={creditFee}
              isCustom={isCustomCredit}
              onPresetSelect={(v) => { setIsCustomCredit(false); onCreditFeeChange(v); }}
              onCustomSelect={() => { setIsCustomCredit(true); onCreditFeeChange(""); }}
              onCustomChange={onCreditFeeChange}
              formatOption={(v) => `Tk ${Number(v).toLocaleString()}`}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted font-semibold uppercase tracking-wider">Registration Fee (Tk)</label>
            <FeeDropdown
              presets={presetReg}
              value={registrationFee}
              isCustom={isCustomReg}
              onPresetSelect={(v) => { setIsCustomReg(false); onRegistrationFeeChange(v); }}
              onCustomSelect={() => { setIsCustomReg(true); onRegistrationFeeChange(""); }}
              onCustomChange={onRegistrationFeeChange}
              formatOption={(v) => `Tk ${Number(v).toLocaleString()}`}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-muted font-semibold uppercase tracking-wider">Tuition Waiver</label>
            <FeeDropdown
              presets={presetWaiver}
              value={String(waiverPercent)}
              isCustom={isCustomWaiver}
              onPresetSelect={(v) => { setIsCustomWaiver(false); onWaiverPercentChange(v); }}
              onCustomSelect={() => { setIsCustomWaiver(true); onWaiverPercentChange(""); }}
              onCustomChange={onWaiverPercentChange}
              formatOption={(v) => `${v}%`}
            />
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}

function FeeDropdown({ presets, value, isCustom, onPresetSelect, onCustomSelect, onCustomChange, formatOption }) {
  return (
    <div className="flex flex-col gap-1.5">
      {isCustom && (
        <input
          autoComplete="off"
          type="number"
          min="0"
          placeholder="Enter amount"
          value={value}
          onChange={(e) => onCustomChange(e.target.value)}
          className="w-full px-3 py-2 bg-field border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-orange-500 transition-colors"
        />
      )}
      <select
        autoComplete="off"
        value={isCustom ? "custom" : value}
        onChange={(e) => {
          if (e.target.value === "custom") {
            onCustomSelect();
          } else {
            onPresetSelect(e.target.value);
          }
        }}
        className="w-full px-3 py-2 bg-field border border-border rounded-lg text-sm text-foreground font-medium focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
      >
        {presets.map((p) => (
          <option key={p} value={p}>{formatOption(p)}</option>
        ))}
        <option value="custom">Custom...</option>
      </select>
    </div>
  );
}
