"use client";

import { Card, Chip, Separator } from "@heroui/react";
import { Coins } from "lucide-react";

export default function FeeSummary({ feeBreakdown }) {
  const {
    feeTotal, installments, totalTuition, registrationFee: rf,
    waiverDeduction, retakeDiscount, netTuition,
    lateAmt, transportAmt, gymAmt,
    waiverPercent, trimesterMode, regCred, frCred, retCred, fydp, cf
  } = feeBreakdown;

  return (
    <Card className="border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 backdrop-blur-xl relative overflow-hidden shadow-sm">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
      <Card.Header className="px-6 pt-6">
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-orange-500" />
          <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Fee Summary</h3>
        </div>
      </Card.Header>
      <Separator className="my-2 bg-zinc-200 dark:bg-zinc-800" />
      <Card.Content className="px-6 py-6 flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center py-5 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl border border-zinc-200 dark:border-zinc-700">
          <span className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold uppercase tracking-wider">
            {trimesterMode ? "Trimester" : "Semester"} Total
          </span>
          <span className="text-3xl sm:text-4xl font-black text-orange-600 dark:text-orange-400 my-1 font-mono">
            Tk {Math.round(feeTotal).toLocaleString()}
          </span>
          <Chip size="sm" variant="flat" color="warning" className="font-extrabold mt-1 text-[10px]">
            {regCred + frCred + retCred} Credits &bull; {waiverPercent}% Waiver
          </Chip>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Installment Schedule</span>
          <div className="flex flex-col gap-2">
            {[
              { label: "1st Installment", pct: "40%", amt: installments[0] },
              { label: "2nd Installment", pct: "30%", amt: installments[1] },
              { label: "3rd Installment", pct: "30%", amt: installments[2] },
            ].map((inst, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-800/60"
              >
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{inst.label}</span>
                    <span className="text-[10px] text-zinc-400 block">({inst.pct})</span>
                  </div>
                </div>
                <span className="font-bold font-mono text-sm text-zinc-800 dark:text-zinc-200">
                  Tk {Math.round(inst.amt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 border-t border-zinc-200 dark:border-zinc-800 pt-4">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Detailed Breakdown</span>

          <BreakdownRow label={`Tuition (${(regCred + frCred + retCred).toFixed(1)} &times; Tk ${cf})`} value={totalTuition} />
          <BreakdownRow label="Registration Fee" value={rf} />

          {waiverPercent > 0 && (
            <BreakdownRow label={`Waiver Discount (${waiverPercent}% on ${Math.max(0, regCred - (fydp ? 2 : 0))} credits)`} value={-waiverDeduction} color="green" />
          )}
          {retakeDiscount > 0 && (
            <BreakdownRow label={`1st Retake Discount (50% of ${frCred} credits)`} value={-retakeDiscount} color="green" />
          )}

          <div className="flex justify-between border-t border-zinc-200 dark:border-zinc-800 pt-2 text-xs sm:text-sm">
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">Net Tuition</span>
            <span className="font-bold font-mono text-zinc-800 dark:text-zinc-100">Tk {Math.round(netTuition).toLocaleString()}</span>
          </div>

          {lateAmt > 0 && <BreakdownRow label="Late Fee" value={lateAmt} />}
          {transportAmt > 0 && <BreakdownRow label="Transportation" value={transportAmt} />}
          {gymAmt > 0 && <BreakdownRow label="Gym" value={gymAmt} />}

          <div className="flex justify-between border-t border-orange-500/30 pt-2 text-sm">
            <span className="font-bold text-zinc-800 dark:text-zinc-100">Total Payable</span>
            <span className="font-black font-mono text-orange-600 dark:text-orange-400">Tk {Math.round(feeTotal).toLocaleString()}</span>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}

function BreakdownRow({ label, value, color }) {
  const isNegative = value < 0;
  const displayValue = Math.abs(Math.round(value));
  const textColor = color === "green"
    ? "text-green-600 dark:text-green-400"
    : "text-zinc-600 dark:text-zinc-400";

  return (
    <div className={`flex justify-between text-xs sm:text-sm ${textColor}`}>
      <span>{label}</span>
      <span className="font-semibold font-mono">
        {isNegative ? "- " : ""}Tk {displayValue.toLocaleString()}
      </span>
    </div>
  );
}
