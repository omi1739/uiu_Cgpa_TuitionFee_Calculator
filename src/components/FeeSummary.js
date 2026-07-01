"use client";

import { Card, Separator } from "@heroui/react";
import { Receipt, CreditCard, BadgePercent, ShieldCheck, PiggyBank, Minus, Equal } from "lucide-react";

export default function FeeSummary({ feeBreakdown }) {
  const {
    cf: creditFee = 0, rf: registrationFee = 0, waiverPercent = 0,
    regCred: regularCredits = 0, frCred: firstRetakeCredits = 0, retCred: retakeCredits = 0,
    lateAmt, transportAmt, gymAmt, waiverDeduction, retakeDiscount, netTuition,
    totalTuition: grossTuition, trimesterMode
  } = feeBreakdown || {};

  const totalCredits = (parseFloat(regularCredits) || 0) + (parseFloat(firstRetakeCredits) || 0) + (parseFloat(retakeCredits) || 0);

  const items = [
    { label: "Tuition (Gross)", amount: grossTuition || 0, icon: CreditCard, color: "text-foreground" },
    { label: "Waiver", amount: -(waiverDeduction || 0) - (retakeDiscount || 0), icon: BadgePercent, color: "text-green-600 dark:text-green-400" },
    { label: "Registration Fee", amount: registrationFee || 0, icon: ShieldCheck, color: "text-foreground" },
    { label: "Transportation", amount: transportAmt || 0, icon: PiggyBank, color: "text-blue-600 dark:text-blue-400" },
    { label: "Gym", amount: gymAmt || 0, icon: PiggyBank, color: "text-green-600 dark:text-green-400" },
    { label: "Late Fee", amount: lateAmt || 0, icon: Minus, color: "text-red-600 dark:text-red-400" },
  ].filter((i) => i.amount !== 0);

  const totalFees = (netTuition || 0) + (registrationFee || 0) + (transportAmt || 0) + (gymAmt || 0) + (lateAmt || 0);

  return (
    <Card className="border border-border bg-surface shadow-sm lg:sticky lg:top-24">
      <Card.Header className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Receipt className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Fee Summary</h2>
            <p className="text-xs text-muted">{totalCredits.toFixed(1)} credits</p>
          </div>
        </div>
      </Card.Header>
      <Separator className="my-1 bg-separator" />
      <Card.Content className="px-5 py-4">
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-muted shrink-0" />
                <span className="text-sm text-foreground">{item.label}</span>
              </div>
              <span className={`text-sm font-bold ${item.color}`}>
                {item.amount < 0 ? "-" : "+"}Tk {Math.abs(item.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
        <Separator className="my-3 bg-separator" />
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2">
            <Equal className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-extrabold text-foreground">Total Due</span>
          </div>
          <span className="text-xl font-extrabold text-orange-600 dark:text-orange-400">
            Tk {totalFees.toLocaleString()}
          </span>
        </div>
      </Card.Content>
    </Card>
  );
}
