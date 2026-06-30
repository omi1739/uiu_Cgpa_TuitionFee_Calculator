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
    <Card className="border border-border bg-surface/70 backdrop-blur-xl relative overflow-hidden shadow-sm">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
      <Card.Header className="px-6 pt-6">
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-orange-500" />
          <h3 className="font-bold text-lg text-foreground">Fee Summary</h3>
        </div>
      </Card.Header>
      <Separator className="my-2 bg-separator" />
      <Card.Content className="px-6 py-6 flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center py-5 bg-background-secondary border border-border rounded-2xl">
          <span className="text-muted text-xs font-semibold uppercase tracking-wider">
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
          <span className="text-xs font-bold uppercase tracking-wider text-muted">Installment Schedule</span>
          <div className="flex flex-col gap-2">
            {[
              { label: "1st Installment", pct: "40%", amt: installments[0] },
              { label: "2nd Installment", pct: "30%", amt: installments[1] },
              { label: "3rd Installment", pct: "30%", amt: installments[2] },
            ].map((inst, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 rounded-xl bg-background-secondary border border-border/60"
              >
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground">{inst.label}</span>
                    <span className="text-[10px] text-muted block">({inst.pct})</span>
                  </div>
                </div>
                <span className="font-bold font-mono text-sm text-foreground">
                  Tk {Math.round(inst.amt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 border-t border-separator pt-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted">Detailed Breakdown</span>

          <BreakdownRow label={`Tuition (${(regCred + frCred + retCred).toFixed(1)} &times; Tk ${cf})`} value={totalTuition} />
          <BreakdownRow label="Registration Fee" value={rf} />

          {waiverPercent > 0 && (
            <BreakdownRow label={`Waiver Discount (${waiverPercent}% on ${Math.max(0, regCred - (fydp ? 2 : 0))} credits)`} value={-waiverDeduction} color="green" />
          )}
          {retakeDiscount > 0 && (
            <BreakdownRow label={`1st Retake Discount (50% of ${frCred} credits)`} value={-retakeDiscount} color="green" />
          )}

          <div className="flex justify-between border-t border-separator pt-2 text-xs sm:text-sm">
            <span className="font-semibold text-foreground">Net Tuition</span>
            <span className="font-bold font-mono text-foreground">Tk {Math.round(netTuition).toLocaleString()}</span>
          </div>

          {lateAmt > 0 && <BreakdownRow label="Late Fee" value={lateAmt} />}
          {transportAmt > 0 && <BreakdownRow label="Transportation" value={transportAmt} />}
          {gymAmt > 0 && <BreakdownRow label="Gym" value={gymAmt} />}

          <div className="flex justify-between border-t border-orange-500/30 pt-2 text-sm">
            <span className="font-bold text-foreground">Total Payable</span>
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
    : "text-muted";

  return (
    <div className={`flex justify-between text-xs sm:text-sm ${textColor}`}>
      <span>{label}</span>
      <span className="font-semibold font-mono">
        {isNegative ? "- " : ""}Tk {displayValue.toLocaleString()}
      </span>
    </div>
  );
}
